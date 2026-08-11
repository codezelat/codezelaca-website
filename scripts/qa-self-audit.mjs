import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.SELF_AUDIT_QA_URL ?? "http://localhost:3000";
const route = "/personal-skills-self-audit/";
const outputDirectory = "output/playwright/self-audit";
const errors = [];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: baseUrl });
const page = await context.newPage();

page.on("console", (message) => {
  if (message.type() === "error" || message.type() === "warning") errors.push(`console-${message.type()}: ${message.text()}`);
});
page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
page.on("requestfailed", (request) => {
  if (request.failure()?.errorText !== "net::ERR_ABORTED") errors.push(`request: ${request.url()} - ${request.failure()?.errorText}`);
});

const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
await page.getByRole("heading", { level: 1, name: "Personal Skills Self-Audit" }).waitFor();

const intro = await page.evaluate(() => ({
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  h1Count: document.querySelectorAll("h1").length,
  jsonLdValid: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).every((script) => {
    try { JSON.parse(script.textContent ?? "{}"); return true; } catch { return false; }
  }),
  overflow: document.documentElement.scrollWidth > window.innerWidth,
}));

await page.screenshot({ path: `${outputDirectory}/intro-desktop.png`, fullPage: true, animations: "disabled" });
await page.getByRole("button", { name: "Start your audit" }).click();
await page.locator("label", { hasText: "Preparing for an internship" }).click();
await page.getByRole("button", { name: "Begin reflection" }).click();

const ratings = [5, 4, 3, 2, "not-yet"];
for (let index = 0; index < 25; index += 1) {
  const rating = ratings[index % ratings.length];
  await page.locator(`label:has(input[type="radio"][value="${rating}"])`).click();
  await page.getByRole("button", { name: index === 24 ? "See my results" : "Continue" }).click();
}

await page.getByRole("heading", { level: 1, name: "Your skills picture" }).waitFor();
await page.getByRole("heading", { name: "Your 30-day action plan" }).waitFor();
await page.getByRole("button", { name: "Copy summary" }).click();
const clipboard = await page.evaluate(() => navigator.clipboard.readText());
const persisted = await page.evaluate(() => {
  const value = window.localStorage.getItem("cca-personal-skills-self-audit-v1");
  return value ? JSON.parse(value) : null;
});

await page.screenshot({ path: `${outputDirectory}/results-desktop.png`, fullPage: true, animations: "disabled" });
await page.reload({ waitUntil: "domcontentloaded" });
await page.getByRole("heading", { level: 1, name: "Your skills picture" }).waitFor();
const restoredResults = await page.getByText("Your skill profile", { exact: true }).isVisible();

const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const mobile = await mobileContext.newPage();
const mobileErrors = [];
mobile.on("console", (message) => {
  if (message.type() === "error" || message.type() === "warning") mobileErrors.push(`console-${message.type()}: ${message.text()}`);
});
mobile.on("pageerror", (error) => mobileErrors.push(`page: ${error.message}`));
await mobile.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
await mobile.addStyleTag({ content: "nextjs-portal{display:none!important}" });
await mobile.getByRole("button", { name: "Start your audit" }).click();
await mobile.locator("label", { hasText: "Exploring careers" }).click();
await mobile.getByRole("button", { name: "Begin reflection" }).click();
await mobile.getByRole("heading", { name: "Communication and Teamwork" }).waitFor();
const mobileState = await mobile.evaluate(() => ({
  overflow: document.documentElement.scrollWidth > window.innerWidth,
  h1Count: document.querySelectorAll("h1").length,
  progressVisible: Boolean(Array.from(document.querySelectorAll("span")).find((element) => element.textContent === "1 of 25")),
}));
await mobile.screenshot({ path: `${outputDirectory}/assessment-mobile.png`, fullPage: true, animations: "disabled" });

const sitemapResponse = await page.request.get(`${baseUrl}/sitemap.xml`);
const sitemapBody = await sitemapResponse.text();

const report = {
  baseUrl,
  httpStatus: response?.status(),
  intro,
  assessment: {
    persistedPhase: persisted?.phase,
    answerCount: persisted ? Object.keys(persisted.answers ?? {}).length : 0,
    clipboardIncludesPlan: clipboard.includes("30-day focus:") && clipboard.includes("Evidence:"),
    restoredResults,
  },
  mobile: mobileState,
  sitemap: {
    status: sitemapResponse.status(),
    routePresent: sitemapBody.includes("https://cca.it.com/personal-skills-self-audit/"),
  },
  errors: [...errors, ...mobileErrors],
};

await writeFile(`${outputDirectory}/report.json`, `${JSON.stringify(report, null, 2)}\n`);
await mobileContext.close();
await context.close();
await browser.close();

const failures = [];
if (report.httpStatus !== 200) failures.push(`HTTP ${report.httpStatus}`);
if (intro.title !== "Personal Skills Self-Audit - Build Your 30-Day Career Plan") failures.push("title metadata");
if (intro.description !== "Reflect on 25 practical career skills, identify your strengths and growth areas, and create a private 30-day action plan with the CCA Personal Skills Self-Audit.") failures.push("description metadata");
if (intro.canonical !== "https://cca.it.com/personal-skills-self-audit/") failures.push("canonical metadata");
if (intro.h1Count !== 1 || !intro.jsonLdValid || intro.overflow) failures.push("intro document contract");
if (report.assessment.persistedPhase !== "results" || report.assessment.answerCount !== 25) failures.push("completion persistence");
if (!report.assessment.clipboardIncludesPlan || !report.assessment.restoredResults) failures.push("results export or restore");
if (mobileState.overflow || mobileState.h1Count !== 1 || !mobileState.progressVisible) failures.push("mobile assessment layout");
if (report.sitemap.status !== 200 || !report.sitemap.routePresent) failures.push("sitemap");
if (report.errors.length) failures.push(`browser errors: ${report.errors.join(" | ")}`);

if (failures.length) throw new Error(`Self-audit QA failed:\n- ${failures.join("\n- ")}\nInspect ${outputDirectory}/report.json.`);

console.log(JSON.stringify({ result: "passed", route, answers: 25, desktop: true, mobile: true, persistence: true, copyExport: true }, null, 2));
