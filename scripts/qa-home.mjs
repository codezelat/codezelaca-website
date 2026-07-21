import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.HOME_QA_URL ?? "http://localhost:3000";
const outputDirectory = "output/playwright";
const expectedTitle = "Codezela Career Accelerator - #1 Tech Career Program In Sri Lanka";
const expectedDescription =
  "Launch your tech career in months, not years. Join Sri Lanka’s top accelerator with SITC & LBC Group UK. Get DEC recognized certification & hired. Apply now.";

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { baseUrl, generatedAt: new Date().toISOString(), desktop: {}, mobile: {} };

async function waitForImages(page) {
  await page.evaluate(async () => {
    const viewportStep = Math.max(400, Math.floor(window.innerHeight * 0.75));
    for (let y = 0; y < document.documentElement.scrollHeight; y += viewportStep) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 100));
    }
  });
  await page.waitForTimeout(500);
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const box = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y + window.scrollY),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      document: {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      },
      brokenImages: Array.from(document.images)
        .filter((image) => {
          const rect = image.getBoundingClientRect();
          const isRenderedInTheHorizontalViewport =
            rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < window.innerWidth;
          return isRenderedInTheHorizontalViewport && (!image.complete || image.naturalWidth === 0);
        })
        .map((image) => image.getAttribute("src")),
      landmarks: {
        header: box("header"),
        hero: box("main > section:nth-of-type(1)"),
        programme: box("main > section:nth-of-type(2)"),
        differences: box("main > section:nth-of-type(3)"),
        programs: box("#programs"),
        recognition: box("#recognition-title"),
        consultation: box("#consultation-title"),
        footer: box("footer"),
      },
      programmeDetails: {
        copyColumn: box("main > section:nth-of-type(2) > div > div:first-child"),
        firstParagraph: box("main > section:nth-of-type(2) p:first-of-type"),
        secondParagraph: box("main > section:nth-of-type(2) p:nth-of-type(2)"),
        outcomeGrid: box("main > section:nth-of-type(2) > div > div:nth-child(2)"),
      },
      programsDetails: {
        firstCard: box("#programs article"),
      },
      copy: {
        h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
        h2: Array.from(document.querySelectorAll("h2")).map((heading) =>
          heading.textContent?.replace(/\s+/g, " ").trim(),
        ),
      },
      seo: {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
        googlebot: document.querySelector('meta[name="googlebot"]')?.getAttribute("content"),
        openGraphTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content"),
        openGraphDescription: document
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content"),
        openGraphImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
        twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"),
        twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute("content"),
        twitterDescription: document
          .querySelector('meta[name="twitter:description"]')
          ?.getAttribute("content"),
        twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute("content"),
        manifest: document.querySelector('link[rel="manifest"]')?.getAttribute("href"),
        structuredDataTypes: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap((script) => {
          try {
            const value = JSON.parse(script.textContent ?? "{}");
            return Array.isArray(value["@graph"])
              ? value["@graph"].map((entry) => entry["@type"])
              : [value["@type"]];
          } catch {
            return ["invalid-json"];
          }
        }),
      },
      approvedContent: {
        august2026: document.body.textContent?.includes("August 2026") ?? false,
        over18Tracks: document.body.textContent?.includes("over 18 specialized tracks") ?? false,
        copyright2026: document.body.textContent?.includes("© 2026") ?? false,
      },
      programDots: document.querySelectorAll('[aria-label="Choose a program slide"] button').length,
      recognitionDots: document.querySelectorAll('[aria-label="Choose a recognition logo"] button').length,
    };
  });
}

async function makePage(viewport) {
  const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  page.on("requestfailed", (request) => {
    const errorText = request.failure()?.errorText ?? "failed";
    if (errorText !== "net::ERR_ABORTED") {
      errors.push(`request: ${request.url()} - ${errorText}`);
    }
  });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await waitForImages(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.addStyleTag({
    content: ".content-visibility-auto { content-visibility: visible !important; } nextjs-portal { display: none !important; }",
  });
  await page.waitForTimeout(250);
  for (const selector of [
    '[aria-label="Choose a program slide"] button',
    '[aria-label="Choose a recognition logo"] button',
  ]) {
    const firstDot = page.locator(selector).first();
    if ((await firstDot.count()) === 1) await firstDot.click();
  }
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  return { page, errors };
}

const desktopSession = await makePage({ width: 1440, height: 1000 });
await desktopSession.page.screenshot({
  path: `${outputDirectory}/cca-local-desktop.png`,
  fullPage: true,
  animations: "disabled",
});
report.desktop = {
  ...(await inspectPage(desktopSession.page)),
  errors: desktopSession.errors,
};

const [robotsResponse, sitemapResponse, manifestResponse] = await Promise.all([
  desktopSession.page.request.get(`${baseUrl}/robots.txt`),
  desktopSession.page.request.get(`${baseUrl}/sitemap.xml`),
  desktopSession.page.request.get(`${baseUrl}/manifest.webmanifest`),
]);
report.seoEndpoints = {
  robots: {
    status: robotsResponse.status(),
    body: await robotsResponse.text(),
  },
  sitemap: {
    status: sitemapResponse.status(),
    body: await sitemapResponse.text(),
  },
  manifest: {
    status: manifestResponse.status(),
    body: await manifestResponse.text(),
  },
};
await desktopSession.page.close();

const mobileSession = await makePage({ width: 390, height: 844 });
await mobileSession.page.screenshot({
  path: `${outputDirectory}/cca-local-mobile.png`,
  fullPage: true,
  animations: "disabled",
});
await mobileSession.page.evaluate(() => window.scrollTo(0, 0));
const mobileInspection = await inspectPage(mobileSession.page);

const menuButton = mobileSession.page.getByRole("button", { name: "Open navigation menu" });
await menuButton.click({ force: true });
const menu = mobileSession.page.locator("#mobile-navigation");
await mobileSession.page.waitForTimeout(500);
const menuOpened = (await menu.count()) === 1 && (await menu.isVisible());
const expandedAfterClick = await menuButton.getAttribute("aria-expanded");
await mobileSession.page.screenshot({
  path: `${outputDirectory}/cca-local-mobile-menu.png`,
  animations: "disabled",
});
if (menuOpened) {
  await mobileSession.page.keyboard.press("Escape");
  await menu.waitFor({ state: "detached" });
}

const secondProgramDot = mobileSession.page
  .locator('[aria-label="Choose a program slide"] button')
  .nth(1);
const programDotAvailable = (await secondProgramDot.count()) === 1;
if (programDotAvailable) await secondProgramDot.click();
const programDotChanged = programDotAvailable
  ? (await secondProgramDot.getAttribute("aria-current")) === "true"
  : false;

report.mobile = {
  ...mobileInspection,
  expandedAfterClick,
  menuOpenedAndClosed: menuOpened,
  programDotAvailable,
  programDotChanged,
  errors: mobileSession.errors,
};
await mobileSession.page.close();

await browser.close();

await writeFile(
  `${outputDirectory}/cca-home-qa.json`,
  `${JSON.stringify(report, null, 2)}\n`,
);

const seoChecks = [
  new URL(report.desktop.seo.canonical).origin === "https://cca.it.com" &&
    new URL(report.desktop.seo.canonical).pathname === "/",
  report.desktop.seo.title === expectedTitle,
  report.desktop.seo.description === expectedDescription,
  report.desktop.seo.robots?.includes("index"),
  report.desktop.seo.robots?.includes("follow"),
  report.desktop.seo.googlebot?.includes("max-image-preview:large"),
  report.desktop.seo.googlebot?.includes("max-snippet:-1"),
  report.desktop.seo.googlebot?.includes("max-video-preview:-1"),
  report.desktop.seo.openGraphTitle === expectedTitle,
  report.desktop.seo.openGraphDescription === expectedDescription,
  report.desktop.seo.openGraphImage === "https://cca.it.com/seo/cca-og-live.jpg",
  report.desktop.seo.twitterCard === "summary_large_image",
  report.desktop.seo.twitterTitle === expectedTitle,
  report.desktop.seo.twitterDescription === expectedDescription,
  report.desktop.seo.twitterImage === "https://cca.it.com/seo/cca-og-live.jpg",
  report.desktop.seo.manifest === "/manifest.webmanifest",
  ["Place", "EducationalOrganization", "WebSite", "WebPage"].every((type) =>
    report.desktop.seo.structuredDataTypes.includes(type),
  ),
  Object.values(report.desktop.approvedContent).every(Boolean),
  report.seoEndpoints.robots.status === 200,
  report.seoEndpoints.robots.body.includes("Sitemap: https://cca.it.com/sitemap.xml"),
  report.seoEndpoints.sitemap.status === 200,
  report.seoEndpoints.sitemap.body.includes("<loc>https://cca.it.com/</loc>"),
  report.seoEndpoints.manifest.status === 200,
];

if (!seoChecks.every(Boolean)) {
  throw new Error("Homepage SEO contract failed. Inspect output/playwright/cca-home-qa.json.");
}

console.log(JSON.stringify(report, null, 2));
