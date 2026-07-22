import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const baseUrl = process.env.CCA_QA_BASE_URL || "http://localhost:3000";

const divisionSlugs = [
  "school-of-software-and-development",
  "school-of-ai-and-data-science",
  "school-of-systems-engineering",
  "school-of-creative-media-and-design",
  "school-of-marketing-and-business",
];

const programmeSlugs = [
  "software-engineer",
  "mobile-app-developer",
  "front-end-developer",
  "back-end-developer",
  "full-stack-developer",
  "data-scientist",
  "data-engineer",
  "data-analyst",
  "ai-ml-engineer",
  "qa-engineer",
  "devops-engineer",
  "cyber-security-engineer",
  "ui-ux-designer",
  "graphic-designer",
  "seo-aeo-specialist",
  "project-manager",
  "digital-marketing-specialist",
  "business-analyst",
];

const routes = [
  ...divisionSlugs.map((slug) => ({ pathname: `/divisions/${slug}/`, type: "division" })),
  ...programmeSlugs.map((slug) => ({ pathname: `/programs/${slug}/`, type: "programme" })),
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const consoleProblems = [];
page.on("console", (message) => {
  if (["error", "warning"].includes(message.type())) consoleProblems.push(`${message.type()}: ${message.text()}`);
});
page.on("pageerror", (error) => consoleProblems.push(`pageerror: ${error.message}`));

const results = [];

try {
  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route.pathname}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(120);

    const audit = await page.evaluate(({ pathname, type }) => {
      const selfDomainLinks = [...document.querySelectorAll('a[href*="cca.it.com"]')]
        .map((anchor) => anchor.getAttribute("href"))
        .filter(Boolean);
      const brokenImages = [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.getAttribute("src"));
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
      const expectedCanonical = `https://cca.it.com${pathname}`;
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => script.textContent || "");

      return {
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        h1: document.querySelector("h1")?.textContent?.trim(),
        canonical,
        expectedCanonical,
        canonicalMatches: canonical === expectedCanonical,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
        jsonLdCount: jsonLd.length,
        expectedSchemaPresent: jsonLd.some((value) => value.includes(type === "programme" ? '"Course"' : '"CollectionPage"')),
        brokenImages,
        selfDomainLinks,
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
        programmeLinks: type === "division" ? [...new Set([...document.querySelectorAll('a[href^="/programs/"]')].map((anchor) => anchor.getAttribute("href")))] : [],
        moduleCount: type === "programme" ? document.querySelectorAll("details").length : 0,
      };
    }, route);

    if (route.type === "programme") {
      const firstDetails = page.locator("details").first();
      const firstSummary = firstDetails.locator("summary");
      const initiallyOpen = await firstDetails.evaluate((element) => element.open);
      await firstSummary.click();
      const toggled = await firstDetails.evaluate(
        (element, initial) => element.open !== initial,
        initiallyOpen,
      );
      await firstSummary.click();
      const restored = await firstDetails.evaluate(
        (element, initial) => element.open === initial,
        initiallyOpen,
      );
      audit.accordionOpenedAndClosed = toggled && restored;
    }

    results.push({ ...route, status: response?.status(), desktop: audit });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  for (const result of results) {
    await page.goto(`${baseUrl}${result.pathname}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(100);
    result.mobile = await page.evaluate(() => ({
      horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      h1Visible: Boolean(document.querySelector("h1")?.getBoundingClientRect().height),
      mobileMenuCentered: (() => {
        const button = document.querySelector('button[aria-label="Open navigation menu"]');
        const icon = button?.querySelector("svg");
        if (!button || !icon) return null;
        const buttonRect = button.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        return {
          x: Math.round((iconRect.left + iconRect.width / 2) - (buttonRect.left + buttonRect.width / 2)),
          y: Math.round((iconRect.top + iconRect.height / 2) - (buttonRect.top + buttonRect.height / 2)),
        };
      })(),
    }));
  }

  await page.goto(`${baseUrl}/contact-us/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    window.open = (url) => {
      window.__qaWhatsappUrl = String(url);
      return window;
    };
  });
  await page.getByLabel("Full name").fill("CCA QA Student");
  await page.getByLabel("Mobile number").fill("+94 76 000 0000");
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("Preferred time").selectOption("Evening");
  await page.getByLabel("Interested pathway (optional)").fill("Software Engineer");
  await page.getByRole("button", { name: "Request Consultation" }).click();
  await page.waitForTimeout(150);
  const contact = await page.evaluate(() => ({
    whatsappUrl: window.__qaWhatsappUrl || "",
    status: document.querySelector('[role="status"]')?.textContent?.trim() || "",
  }));

  const failures = [];
  for (const result of results) {
    if (result.status !== 200) failures.push(`${result.pathname}: HTTP ${result.status}`);
    if (result.desktop.h1Count !== 1) failures.push(`${result.pathname}: expected one H1`);
    if (!result.desktop.canonicalMatches) failures.push(`${result.pathname}: canonical mismatch`);
    if (!result.desktop.description) failures.push(`${result.pathname}: missing meta description`);
    if (!result.desktop.expectedSchemaPresent) failures.push(`${result.pathname}: missing structured data`);
    if (result.desktop.brokenImages.length) failures.push(`${result.pathname}: broken images`);
    if (result.desktop.selfDomainLinks.length) failures.push(`${result.pathname}: links back to live CCA`);
    if (result.desktop.horizontalOverflow || result.mobile.horizontalOverflow) failures.push(`${result.pathname}: horizontal overflow`);
    if (result.type === "programme" && result.desktop.moduleCount < 8) failures.push(`${result.pathname}: incomplete course breakdown`);
    if (result.type === "programme" && !result.desktop.accordionOpenedAndClosed) failures.push(`${result.pathname}: curriculum accordion interaction`);
    if (result.type === "division" && result.desktop.programmeLinks.length < 2) failures.push(`${result.pathname}: missing programme links`);
    if (result.mobile.mobileMenuCentered?.x !== 0 || result.mobile.mobileMenuCentered?.y !== 0) failures.push(`${result.pathname}: mobile menu icon not centered`);
  }
  if (!contact.whatsappUrl.startsWith("https://wa.me/94766772923?text=")) failures.push("Contact form did not prepare the WhatsApp request");
  if (!contact.status.includes("ready in WhatsApp")) failures.push("Contact form did not provide confirmation status");
  if (consoleProblems.length) failures.push(`Browser console problems: ${consoleProblems.join(" | ")}`);

  const report = { baseUrl, routesChecked: routes.length, results, contact, consoleProblems, failures };
  await writeFile("/tmp/cca-catalog-qa.json", `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ routesChecked: routes.length, contact, consoleProblems, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
