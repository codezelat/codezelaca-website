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
      const programmeImages = type === "programme"
        ? [...document.querySelectorAll("main img")].slice(0, 2).map((image) => {
            const sourceUrl = new URL(image.currentSrc || image.src, window.location.href);
            const source = sourceUrl.pathname === "/_next/image/"
              ? sourceUrl.searchParams.get("url") || sourceUrl.pathname
              : sourceUrl.pathname;
            const rect = image.getBoundingClientRect();
            return {
              source,
              alt: image.alt,
              naturalWidth: image.naturalWidth,
              naturalHeight: image.naturalHeight,
              renderedWidth: Math.round(rect.width),
              renderedHeight: Math.round(rect.height),
            };
          })
        : [];

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
        programmeImages,
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

  const notFoundConsoleStart = consoleProblems.length;
  const notFoundResponse = await page.goto(`${baseUrl}/this-page-does-not-exist/`, { waitUntil: "domcontentloaded" });
  const notFound = await page.evaluate(() => ({
    status: 0,
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.trim() || "",
    robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") || "",
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "",
    horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    homeLink: document.querySelector('main a[href="/"]')?.getAttribute("href") || "",
    divisionsLink: document.querySelector('main a[href="/divisions/"]')?.getAttribute("href") || "",
    contactLink: document.querySelector('main a[href="/contact-us/"]')?.getAttribute("href") || "",
  }));
  notFound.status = notFoundResponse?.status() || 0;
  const notFoundConsoleProblems = consoleProblems
    .splice(notFoundConsoleStart)
    .filter((message) => !message.includes("Failed to load resource: the server responded with a status of 404"));
  consoleProblems.push(...notFoundConsoleProblems);
  notFound.consoleProblems = notFoundConsoleProblems;

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
    if (result.type === "programme" && result.desktop.programmeImages.length !== 2) failures.push(`${result.pathname}: expected hero and career images`);
    if (result.type === "programme" && new Set(result.desktop.programmeImages.map((image) => image.source)).size !== 2) failures.push(`${result.pathname}: duplicate programme imagery`);
    if (result.type === "programme" && result.desktop.programmeImages[1]?.source !== `/images/programs/detail/${result.pathname.split("/").at(-2)}.webp`) failures.push(`${result.pathname}: missing role-specific detail image`);
    if (result.type === "division" && result.desktop.programmeLinks.length < 2) failures.push(`${result.pathname}: missing programme links`);
    if (result.mobile.mobileMenuCentered?.x !== 0 || result.mobile.mobileMenuCentered?.y !== 0) failures.push(`${result.pathname}: mobile menu icon not centered`);
  }
  if (!contact.whatsappUrl.startsWith("https://wa.me/94766772923?text=")) failures.push("Contact form did not prepare the WhatsApp request");
  if (!contact.status.includes("ready in WhatsApp")) failures.push("Contact form did not provide confirmation status");
  const uniqueDetailImages = new Set(results.filter((result) => result.type === "programme").map((result) => result.desktop.programmeImages[1]?.source).filter(Boolean));
  if (uniqueDetailImages.size !== programmeSlugs.length) failures.push(`Expected ${programmeSlugs.length} unique programme detail images; received ${uniqueDetailImages.size}`);
  if (notFound.status !== 404) failures.push(`404 page returned HTTP ${notFound.status}`);
  if (!notFound.title.includes("Page Not Found") || !notFound.h1) failures.push("404 page is missing its title or heading");
  if (!notFound.robots.toLowerCase().includes("noindex")) failures.push("404 page is missing noindex");
  if (notFound.canonical) failures.push(`404 page must not expose a canonical URL: ${notFound.canonical}`);
  if (notFound.horizontalOverflow) failures.push("404 page has horizontal overflow");
  if (notFound.homeLink !== "/" || notFound.divisionsLink !== "/divisions/" || notFound.contactLink !== "/contact-us/") failures.push("404 recovery links are incomplete");
  if (consoleProblems.length) failures.push(`Browser console problems: ${consoleProblems.join(" | ")}`);

  const report = { baseUrl, routesChecked: routes.length, results, contact, notFound, uniqueDetailImages: [...uniqueDetailImages], consoleProblems, failures };
  await writeFile("/tmp/cca-catalog-qa.json", `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ routesChecked: routes.length, uniqueDetailImages: uniqueDetailImages.size, contact, notFound, consoleProblems, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
