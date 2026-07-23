import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.HOME_QA_URL ?? "http://localhost:3000";
const outputDirectory = "output/playwright";
const expectedTitle = "Codezela Career Accelerator - #1 Tech Career Program In Sri Lanka";
const expectedDescription =
  "Launch your tech career in months, not years. Join Sri Lanka’s top accelerator with SITC & LBC Group UK. Get DEC recognized certification & hired. Apply now.";
const expectedProgramImagePaths = [
  "/images/programs/detail/full-stack-developer.webp",
  "/images/programs/detail/ai-ml-engineer.webp",
  "/images/programs/detail/back-end-developer.webp",
  "/images/programs/detail/business-analyst.webp",
  "/images/programs/detail/cyber-security-engineer.webp",
  "/images/programs/detail/data-analyst.webp",
  "/images/programs/detail/data-engineer.webp",
  "/images/programs/detail/data-scientist.webp",
  "/images/programs/detail/devops-engineer.webp",
  "/images/programs/detail/digital-marketing-specialist.webp",
  "/images/programs/detail/front-end-developer.webp",
  "/images/programs/detail/graphic-designer.webp",
];
const qaOrigin = new URL(baseUrl);
const isLocalQa = ["localhost", "127.0.0.1"].includes(qaOrigin.hostname);

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: isLocalQa ? ["--host-resolver-rules=MAP cca.it.com 127.0.0.1"] : [],
});
const report = { baseUrl, generatedAt: new Date().toISOString(), desktop: {}, tablet: {}, mobile: {} };

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
    const heroCareerLink = document.querySelector('section[aria-labelledby="hero-heading"] a[href="/divisions"], section[aria-labelledby="hero-heading"] a[href="/divisions/"]');
    const mobileMenuButton = document.querySelector('button[aria-label="Open navigation menu"]');
    const mobileMenuIcon = mobileMenuButton?.querySelector("svg");
    const mobileMenuButtonRect = mobileMenuButton?.getBoundingClientRect();
    const mobileMenuIconRect = mobileMenuIcon?.getBoundingClientRect();

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
        recognition: box('section[aria-labelledby="recognition-title"]'),
        consultation: box('section[aria-labelledby="consultation-title"]'),
        footer: box("footer"),
      },
      structure: {
        mainSections: document.querySelectorAll("main > section").length,
        recognitionLogos: document.querySelectorAll('section[aria-labelledby="recognition-title"] img').length,
      },
      programmeDetails: {
        copyColumn: box("main > section:nth-of-type(2) > div > div:first-child"),
        firstParagraph: box("main > section:nth-of-type(2) p:first-of-type"),
        secondParagraph: box("main > section:nth-of-type(2) p:nth-of-type(2)"),
        outcomeGrid: box("main > section:nth-of-type(2) > div > div:nth-child(2)"),
      },
      programsDetails: {
        firstCard: box("#programs article"),
        images: Array.from(document.querySelectorAll("#programs article img")).map((image) => {
          const sourceUrl = new URL(image.currentSrc || image.src, window.location.href);
          return {
            source: sourceUrl.pathname === "/_next/image/"
              ? sourceUrl.searchParams.get("url") || sourceUrl.pathname
              : sourceUrl.pathname,
            alt: image.alt,
            loaded: image.complete && image.naturalWidth > 0,
          };
        }),
      },
      copy: {
        h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
        h2: Array.from(document.querySelectorAll("h2")).map((heading) =>
          heading.textContent?.replace(/\s+/g, " ").trim(),
        ),
      },
      heroCareerLink: {
        text: heroCareerLink?.textContent?.replace(/\s+/g, " ").trim(),
        whiteSpace: heroCareerLink ? getComputedStyle(heroCareerLink).whiteSpace : null,
        wraps: heroCareerLink ? heroCareerLink.scrollHeight > heroCareerLink.clientHeight : true,
        overflows: heroCareerLink ? heroCareerLink.scrollWidth > heroCareerLink.clientWidth : true,
      },
      mobileMenuIcon: mobileMenuButtonRect && mobileMenuIconRect ? {
        centerOffsetX: Math.abs((mobileMenuButtonRect.left + mobileMenuButtonRect.width / 2) - (mobileMenuIconRect.left + mobileMenuIconRect.width / 2)),
        centerOffsetY: Math.abs((mobileMenuButtonRect.top + mobileMenuButtonRect.height / 2) - (mobileMenuIconRect.top + mobileMenuIconRect.height / 2)),
      } : null,
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
      analytics: {
        measurementConfigured: document.querySelector("#google-analytics")?.textContent?.includes("G-FEV38YNDVC") ?? false,
        consentModeConfigured: document.querySelector("#analytics-consent-default")?.textContent?.includes('"consent", "default"') ?? false,
        productionHostGuarded: document.querySelector("#google-analytics")?.textContent?.includes('window.location.hostname === "cca.it.com"') ?? false,
        externalTagLoadedLocally: Boolean(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')),
      },
      approvedContent: {
        august2026: document.body.textContent?.includes("August 2026") ?? false,
        over18Tracks: document.body.textContent?.includes("over 18 specialized tracks") ?? false,
        copyright2026: document.body.textContent?.includes("© 2025–2026") ?? false,
      },
      links: {
        internal: Array.from(document.querySelectorAll("a[href]"))
          .map((link) => link.getAttribute("href") ?? "")
          .filter((href) => href.startsWith("/")),
        externalSelf: Array.from(document.querySelectorAll('a[href^="https://cca.it.com"]'))
          .map((link) => link.getAttribute("href")),
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
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await waitForImages(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
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
const internalPaths = Array.from(new Set(report.desktop.links.internal.map((href) => href.split("#")[0]).filter(Boolean)));
const internalLinkStatuses = await Promise.all(
  internalPaths.map(async (pathname) => ({ pathname, status: (await desktopSession.page.request.get(`${baseUrl}${pathname}`)).status() })),
);
const programImageStatuses = await Promise.all(
  expectedProgramImagePaths.map(async (pathname) => {
    const response = await desktopSession.page.request.get(`${baseUrl}${pathname}`);
    return {
      pathname,
      status: response.status(),
      contentType: response.headers()["content-type"] ?? "",
    };
  }),
);
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
  internalLinkStatuses,
  programImageStatuses,
};
await desktopSession.page.close();

const tabletSession = await makePage({ width: 768, height: 1024 });
await tabletSession.page.screenshot({
  path: `${outputDirectory}/cca-local-tablet.png`,
  fullPage: true,
  animations: "disabled",
});
report.tablet = {
  ...(await inspectPage(tabletSession.page)),
  errors: tabletSession.errors,
};
await tabletSession.page.close();

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

const secondRecognitionDot = mobileSession.page
  .locator('[aria-label="Choose a recognition logo"] button')
  .nth(1);
const recognitionDotAvailable = (await secondRecognitionDot.count()) === 1;
if (recognitionDotAvailable) await secondRecognitionDot.click();
const recognitionDotChanged = recognitionDotAvailable
  ? (await secondRecognitionDot.getAttribute("aria-current")) === "true"
  : false;

report.mobile = {
  ...mobileInspection,
  expandedAfterClick,
  menuOpenedAndClosed: menuOpened,
  programDotAvailable,
  programDotChanged,
  recognitionDotAvailable,
  recognitionDotChanged,
  errors: mobileSession.errors,
};
await mobileSession.page.close();

const runsProductionHostConsentCheck = isLocalQa;
if (runsProductionHostConsentCheck) {
  const consentPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await consentPage.route("**/*googletagmanager.com/**", (route) => route.abort());
  const consentUrl = `http://cca.it.com:${qaOrigin.port || "80"}/`;
  await consentPage.goto(consentUrl, { waitUntil: "domcontentloaded" });

  const consentRegion = consentPage.locator('section[aria-label="Analytics preferences"]');
  await consentRegion.waitFor({ state: "visible" });
  const cdpSession = await consentPage.context().newCDPSession(consentPage);
  const accessibilityTree = await cdpSession.send("Accessibility.getFullAXTree");
  const accessibilityNode = accessibilityTree.nodes.find(
    (node) => node.name?.value === "Analytics preferences",
  );
  const semantics = await consentRegion.evaluate((element) => ({
    tagName: element.tagName,
    explicitRole: element.getAttribute("role"),
    live: element.getAttribute("aria-live"),
  }));

  await consentPage.getByRole("button", { name: "Decline" }).click();
  const declined = await consentPage.evaluate(() => ({
    stored: window.localStorage.getItem("cca-analytics-consent"),
    update: window.dataLayer?.findLast?.(
      (entry) => entry?.[0] === "consent" && entry?.[1] === "update",
    )?.[2]?.analytics_storage,
  }));
  await consentPage.reload({ waitUntil: "domcontentloaded" });
  const staysDismissed = (await consentRegion.count()) === 0;

  await consentPage.evaluate(() => window.localStorage.removeItem("cca-analytics-consent"));
  await consentPage.reload({ waitUntil: "domcontentloaded" });
  await consentPage.getByRole("button", { name: "Allow analytics" }).click();
  const granted = await consentPage.evaluate(() => ({
    stored: window.localStorage.getItem("cca-analytics-consent"),
    update: window.dataLayer?.findLast?.(
      (entry) => entry?.[0] === "consent" && entry?.[1] === "update",
    )?.[2]?.analytics_storage,
  }));

  report.analyticsConsent = {
    semantics,
    accessibilityTree: {
      role: accessibilityNode?.role?.value,
      name: accessibilityNode?.name?.value,
      ignored: accessibilityNode?.ignored,
    },
    declined,
    staysDismissed,
    granted,
  };
  await consentPage.close();
}

const autoplayPage = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference" });
const autoplayErrors = [];
autoplayPage.on("console", (message) => {
  if (message.type() === "error") autoplayErrors.push(`console: ${message.text()}`);
});
autoplayPage.on("pageerror", (error) => autoplayErrors.push(`page: ${error.message}`));
await autoplayPage.goto(baseUrl, { waitUntil: "domcontentloaded" });
await autoplayPage.waitForTimeout(500);
const programInitial = await autoplayPage.locator('[aria-label="Choose a program slide"] button[aria-current="true"]').getAttribute("aria-label");
const recognitionInitial = await autoplayPage.locator('[aria-label="Choose a recognition logo"] button[aria-current="true"]').getAttribute("aria-label");
await autoplayPage.waitForTimeout(5_300);
const programAfter = await autoplayPage.locator('[aria-label="Choose a program slide"] button[aria-current="true"]').getAttribute("aria-label");
const recognitionAfter = await autoplayPage.locator('[aria-label="Choose a recognition logo"] button[aria-current="true"]').getAttribute("aria-label");
report.carouselAutoplay = {
  programInitial,
  programAfter,
  programAdvanced: programInitial !== programAfter,
  recognitionInitial,
  recognitionAfter,
  recognitionAdvanced: recognitionInitial !== recognitionAfter,
  errors: autoplayErrors,
};
await autoplayPage.close();

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
  report.desktop.analytics.measurementConfigured,
  report.desktop.analytics.consentModeConfigured,
  report.desktop.analytics.productionHostGuarded,
  !report.desktop.analytics.externalTagLoadedLocally,
  Object.values(report.desktop.approvedContent).every(Boolean),
  report.desktop.heroCareerLink.text === "Explore Career Tracks",
  report.desktop.heroCareerLink.whiteSpace === "nowrap",
  !report.desktop.heroCareerLink.wraps,
  !report.desktop.heroCareerLink.overflows,
  report.mobile.heroCareerLink.text === "Explore Career Tracks",
  report.mobile.heroCareerLink.whiteSpace === "nowrap",
  !report.mobile.heroCareerLink.wraps,
  !report.mobile.heroCareerLink.overflows,
  report.mobile.mobileMenuIcon?.centerOffsetX <= 1,
  report.mobile.mobileMenuIcon?.centerOffsetY <= 1,
  report.mobile.menuOpenedAndClosed,
  report.mobile.programDotAvailable,
  report.mobile.programDotChanged,
  report.mobile.recognitionDotAvailable,
  report.mobile.recognitionDotChanged,
  report.carouselAutoplay.programAdvanced,
  report.carouselAutoplay.recognitionAdvanced,
  report.carouselAutoplay.errors.length === 0,
  report.desktop.programsDetails.images.length === expectedProgramImagePaths.length,
  report.desktop.programsDetails.images.every((image) => image.alt),
  new Set(report.desktop.programsDetails.images.map((image) => image.source)).size === expectedProgramImagePaths.length,
  expectedProgramImagePaths.every((path) => report.desktop.programsDetails.images.some((image) => image.source === path)),
  report.seoEndpoints.programImageStatuses.every((image) => image.status === 200 && image.contentType.startsWith("image/")),
  report.desktop.structure.mainSections === 6,
  report.tablet.structure.mainSections === 6,
  report.mobile.structure.mainSections === 6,
  report.desktop.structure.recognitionLogos === 6,
  report.tablet.structure.recognitionLogos === 6,
  report.mobile.structure.recognitionLogos === 6,
  report.desktop.landmarks.footer?.height <= 700,
  report.tablet.landmarks.footer?.height < 1100,
  report.tablet.landmarks.consultation?.height < 650,
  report.mobile.landmarks.footer?.height < 1300,
  report.mobile.landmarks.consultation?.height < 720,
  !report.tablet.document.horizontalOverflow,
  report.tablet.errors.length === 0,
  !runsProductionHostConsentCheck || report.analyticsConsent?.semantics.tagName === "SECTION",
  !runsProductionHostConsentCheck || report.analyticsConsent?.semantics.explicitRole === null,
  !runsProductionHostConsentCheck || report.analyticsConsent?.semantics.live === "polite",
  !runsProductionHostConsentCheck || report.analyticsConsent?.accessibilityTree.role === "region",
  !runsProductionHostConsentCheck || report.analyticsConsent?.accessibilityTree.name === "Analytics preferences",
  !runsProductionHostConsentCheck || report.analyticsConsent?.accessibilityTree.ignored === false,
  !runsProductionHostConsentCheck || report.analyticsConsent?.declined.stored === "denied",
  !runsProductionHostConsentCheck || report.analyticsConsent?.declined.update === "denied",
  !runsProductionHostConsentCheck || report.analyticsConsent?.staysDismissed,
  !runsProductionHostConsentCheck || report.analyticsConsent?.granted.stored === "granted",
  !runsProductionHostConsentCheck || report.analyticsConsent?.granted.update === "granted",
  report.desktop.links.externalSelf.length === 0,
  report.mobile.links.externalSelf.length === 0,
  report.seoEndpoints.internalLinkStatuses.every((entry) => entry.status === 200),
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
