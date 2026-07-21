import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.PAGES_QA_URL ?? "http://localhost:3000";
const outputDirectory = "output/playwright/pages";

const routes = [
  {
    slug: "divisions",
    pathname: "/divisions/",
    title: "Our Divisions - Specialized Career Faculties - Codezela",
    description: "Explore the specialized academic divisions at Codezela. Choose from Technology, Design, or Business tracks powered by SITC Campus and LBC Group UK standards.",
    h1: "Our Divisions",
    required: ["Five Divisions Built for Real Careers", "School of Marketing and Business"],
  },
  {
    slug: "about-us",
    pathname: "/about-us/",
    title: "About Codezela Career Accelerator - Born From Industry Tech Training",
    description: "Discover the story behind Codezela Career Accelerator, the industry-led education programme helping Sri Lankan learners build job-ready skills and global careers.",
    h1: "About Us",
    required: ["where your potential becomes your profession", "over 18 specialized tracks"],
  },
  {
    slug: "contact-us",
    pathname: "/contact-us/",
    title: "Contact Us - Start Your Application At Codezela Career Accelerator",
    description: "Ready to launch your career in tech? Visit us at in Colombo or call our admissions team. Reach out today to secure your spot in our next intake.",
    h1: "Contact Us",
    required: ["Your journey to a global career begins here", "Request Consultation"],
  },
  {
    slug: "privacy-policy",
    pathname: "/privacy-policy/",
    title: "Privacy Policy - Data Protection At Codezela Career Accelerator",
    description: "We value your trust. Read how Codezela Career Accelerator protects your personal student data and learn more about our transparency.",
    h1: "Privacy Policy",
    required: ["Last Updated: November 24, 2025", "9. Contact Us"],
  },
  {
    slug: "terms-and-conditions",
    pathname: "/terms-and-conditions/",
    title: "Terms And Conditions - Codezela Career Accelerator",
    description: "Read the official terms of service for Codezela Career Accelerator. Understand the rules regarding enrollment course fees and the code of conduct for students.",
    h1: "Terms and Conditions",
    required: ["Last Updated: November 24, 2025", "16. Contact Us"],
  },
  {
    slug: "refund-policy",
    pathname: "/refund-policy/",
    title: "Refund Policy - Codezela Career Accelerator",
    description: "Read the Codezela Career Accelerator refund policy, including the limited circumstances that apply when CCA permanently cancels a programme.",
    h1: "Refund Policy",
    required: ["Last Updated: July 22, 2026", "10. Statutory Rights"],
  },
];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { baseUrl, generatedAt: new Date().toISOString(), routes: {} };

async function loadAllImages(page) {
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = "eager";
    const step = Math.max(500, Math.floor(window.innerHeight * 0.85));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 75));
    }
    await Promise.race([
      Promise.all(
        Array.from(document.images, (image) =>
          image.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                image.addEventListener("load", resolve, { once: true });
                image.addEventListener("error", resolve, { once: true });
              }),
        ),
      ),
      new Promise((resolve) => window.setTimeout(resolve, 15_000)),
    ]);
    window.scrollTo(0, 0);
  });
}

async function inspect(page, route) {
  return page.evaluate((expected) => {
    const text = (document.body.textContent ?? "").replace(/\s+/g, " ");
    const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((script) => {
      try {
        return { valid: true, value: JSON.parse(script.textContent ?? "{}") };
      } catch {
        return { valid: false, value: null };
      }
    });

    return {
      statusCopyPresent: expected.required.map((copy) => ({ copy, present: text.includes(copy) })),
      h1Count: document.querySelectorAll("h1").length,
      h1: document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim(),
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content"),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content"),
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute("content"),
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"),
      jsonLdValid: jsonLd.every((entry) => entry.valid),
      jsonLdCount: jsonLd.length,
      dimensions: {
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      },
      brokenImages: Array.from(document.images)
        .filter((image) => {
          const rect = image.getBoundingClientRect();
          const intersectsHorizontalViewport = rect.width > 0 && rect.height > 0 && rect.right > 0 && rect.left < window.innerWidth;
          return intersectsHorizontalViewport && (!image.complete || image.naturalWidth === 0);
        })
        .map((image) => image.currentSrc || image.src),
      localPrimaryNavigation: Array.from(document.querySelectorAll('header nav a')).every((link) => {
        const href = link.getAttribute("href") ?? "";
        return ["/about-us/", "/divisions/", "/contact-us/"].includes(href);
      }),
      internalLinks: Array.from(document.querySelectorAll("a[href]"))
        .map((link) => link.getAttribute("href") ?? "")
        .filter((href) => href.startsWith("/")),
      externalSelfLinks: Array.from(document.querySelectorAll('a[href^="https://cca.it.com"]'))
        .map((link) => link.getAttribute("href")),
      copyright2026: text.includes("© 2026"),
      hasRefundFooterLink: Boolean(document.querySelector('footer a[href="/refund-policy/"]')),
    };
  }, route);
}

for (const route of routes) {
  report.routes[route.slug] = {};

  for (const device of [
    { name: "desktop", viewport: { width: 1440, height: 1000 } },
    { name: "mobile", viewport: { width: 390, height: 844 } },
  ]) {
    const page = await browser.newPage({ viewport: device.viewport, reducedMotion: "reduce" });
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") errors.push(`console-${message.type()}: ${message.text()}`);
    });
    page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
    page.on("requestfailed", (request) => {
      if (request.failure()?.errorText !== "net::ERR_ABORTED") errors.push(`request: ${request.url()} - ${request.failure()?.errorText}`);
    });

    if (route.slug === "contact-us") {
      await page.addInitScript(() => {
        window.__qaOpenedUrl = "";
        window.open = (url) => {
          window.__qaOpenedUrl = String(url);
          return { opener: null };
        };
      });
    }

    const response = await page.goto(`${baseUrl}${route.pathname}`, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: ".content-visibility-auto{content-visibility:visible!important} nextjs-portal{display:none!important}" });
    await loadAllImages(page);
    await page.waitForTimeout(250);

    const inspection = await inspect(page, route);
    let interaction = {};

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `${outputDirectory}/${route.slug}-${device.name}.png`,
      fullPage: true,
      animations: "disabled",
    });

    if (route.slug === "contact-us" && device.name === "desktop") {
      await page.getByLabel("Full Name").fill("CCA QA Student");
      await page.getByLabel("Mobile Number").fill("0771234567");
      await page.getByLabel("Email").fill("qa@example.com");
      await page.getByLabel("Preferred Time for Consultation").selectOption("Afternoon");
      await page.getByRole("button", { name: "Request Consultation" }).click();
      interaction = await page.evaluate(() => ({
        openedUrl: window.__qaOpenedUrl,
        status: document.querySelector('[role="status"]')?.textContent?.trim(),
      }));
    }

    if (route.slug === "about-us" && device.name === "mobile") {
      await page.evaluate(() => window.scrollTo(0, 0));
      const button = page.getByRole("button", { name: "Open navigation menu" });
      await button.click();
      const opened = await page.locator("#mobile-navigation").isVisible();
      await page.keyboard.press("Escape");
      await page.locator("#mobile-navigation").waitFor({ state: "detached" });
      interaction = { ...interaction, menuOpenedAndClosed: opened };
    }

    report.routes[route.slug][device.name] = {
      httpStatus: response?.status(),
      ...inspection,
      interaction,
      errors,
    };
    await page.close();
  }
}

const api = await browser.newPage();
const [sitemapResponse, robotsResponse] = await Promise.all([
  api.request.get(`${baseUrl}/sitemap.xml`),
  api.request.get(`${baseUrl}/robots.txt`),
]);
const sitemapBody = await sitemapResponse.text();
const internalPaths = Array.from(new Set(
  routes.flatMap((route) => report.routes[route.slug].desktop.internalLinks)
    .map((href) => href.split("#")[0])
    .filter(Boolean),
));
const internalLinkStatuses = await Promise.all(
  internalPaths.map(async (pathname) => ({ pathname, status: (await api.request.get(`${baseUrl}${pathname}`)).status() })),
);
report.endpoints = {
  sitemapStatus: sitemapResponse.status(),
  robotsStatus: robotsResponse.status(),
  sitemapRoutesPresent: routes.map((route) => ({ pathname: route.pathname, present: sitemapBody.includes(`<loc>https://cca.it.com${route.pathname}</loc>`) })),
  internalLinkStatuses,
};
await api.close();
await browser.close();

await writeFile(`${outputDirectory}/cca-pages-qa.json`, `${JSON.stringify(report, null, 2)}\n`);

const failures = [];
for (const route of routes) {
  for (const device of ["desktop", "mobile"]) {
    const result = report.routes[route.slug][device];
    if (result.httpStatus !== 200) failures.push(`${route.slug}/${device}: HTTP ${result.httpStatus}`);
    if (result.h1Count !== 1 || result.h1 !== route.h1) failures.push(`${route.slug}/${device}: H1 contract`);
    if (result.title !== route.title || result.description !== route.description) failures.push(`${route.slug}/${device}: metadata`);
    if (result.canonical !== `https://cca.it.com${route.pathname}`) failures.push(`${route.slug}/${device}: canonical`);
    if (!result.robots?.includes("index") || !result.robots?.includes("follow")) failures.push(`${route.slug}/${device}: robots`);
    if (result.ogTitle !== route.title || result.ogDescription !== route.description || result.twitterCard !== "summary_large_image") failures.push(`${route.slug}/${device}: social metadata`);
    if (result.ogImage !== "https://cca.it.com/seo/cca-og-live.jpg") failures.push(`${route.slug}/${device}: social image`);
    if (!result.jsonLdValid || result.jsonLdCount < 1) failures.push(`${route.slug}/${device}: structured data`);
    if (result.dimensions.horizontalOverflow) failures.push(`${route.slug}/${device}: horizontal overflow`);
    if (result.brokenImages.length) failures.push(`${route.slug}/${device}: broken images`);
    if (result.errors.length) failures.push(`${route.slug}/${device}: browser errors`);
    if (!result.localPrimaryNavigation || !result.copyright2026 || !result.hasRefundFooterLink) failures.push(`${route.slug}/${device}: shared shell`);
    if (result.externalSelfLinks.length) failures.push(`${route.slug}/${device}: absolute self-links`);
    if (!result.statusCopyPresent.every((check) => check.present)) failures.push(`${route.slug}/${device}: required copy`);
  }
}

if (!report.routes["about-us"].mobile.interaction.menuOpenedAndClosed) failures.push("mobile navigation interaction");
if (!report.routes["contact-us"].desktop.interaction.openedUrl?.startsWith("https://wa.me/94766772923?text=")) failures.push("contact WhatsApp handoff");
if (report.endpoints.sitemapStatus !== 200 || report.endpoints.robotsStatus !== 200 || !report.endpoints.sitemapRoutesPresent.every((entry) => entry.present)) failures.push("SEO endpoints");
if (!report.endpoints.internalLinkStatuses.every((entry) => entry.status === 200)) failures.push("internal link status");

if (failures.length) throw new Error(`Page QA failed:\n- ${failures.join("\n- ")}\nInspect ${outputDirectory}/cca-pages-qa.json.`);

console.log(JSON.stringify({
  result: "passed",
  pages: routes.length,
  viewports: 2,
  routes: Object.fromEntries(routes.map((route) => [route.pathname, {
    desktopHeight: report.routes[route.slug].desktop.dimensions.documentHeight,
    mobileHeight: report.routes[route.slug].mobile.dimensions.documentHeight,
  }])),
}, null, 2));
