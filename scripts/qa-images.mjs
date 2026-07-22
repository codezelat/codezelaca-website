import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const baseUrl = process.env.IMAGE_QA_URL ?? "http://localhost:3000";
const outputDirectory = "output/playwright/images";

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const request = context.request;
const sitemapResponse = await request.get(`${baseUrl}/sitemap.xml`);
const sitemap = await sitemapResponse.text();
const routes = Array.from(sitemap.matchAll(/<loc>https:\/\/cca\.it\.com([^<]*)<\/loc>/g), (match) => match[1]);

if (sitemapResponse.status() !== 200 || routes.length !== 30) {
  throw new Error(`Expected 30 public routes in the sitemap; received ${routes.length}.`);
}

const report = { baseUrl, generatedAt: new Date().toISOString(), routes: {}, summary: {} };
const failures = [];

for (const route of routes) {
  const page = await context.newPage();
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  page.on("requestfailed", (failedRequest) => {
    if (failedRequest.failure()?.errorText !== "net::ERR_ABORTED") {
      errors.push(`request: ${failedRequest.url()} - ${failedRequest.failure()?.errorText}`);
    }
  });

  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (const image of document.images) image.loading = "eager";
    const step = Math.max(600, Math.floor(window.innerHeight * 0.9));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }
    await Promise.race([
      Promise.all(Array.from(document.images, (image) => image.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          }))),
      new Promise((resolve) => window.setTimeout(resolve, 15_000)),
    ]);
    window.scrollTo(0, 0);
  });

  const inspection = await page.evaluate(() => {
    const genericAlt = /^(image|photo|picture|graphic|thumbnail|logo|img|banner|hero|program image)$/i;
    const images = Array.from(document.images).map((image) => {
      const rect = image.getBoundingClientRect();
      const alt = image.getAttribute("alt");
      const source = image.getAttribute("src") ?? "";
      const sourceUrl = new URL(image.currentSrc || source, window.location.href);
      return {
        source,
        currentSource: image.currentSrc,
        alt,
        ariaHidden: image.getAttribute("aria-hidden") === "true",
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        renderedWidth: Math.round(rect.width),
        renderedHeight: Math.round(rect.height),
        fill: image.getAttribute("data-nimg") === "fill",
        sizes: image.getAttribute("sizes"),
        loading: image.getAttribute("loading") ?? "auto",
        fetchPriority: image.getAttribute("fetchpriority") ?? "auto",
        local: sourceUrl.origin === window.location.origin,
        broken: !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0,
        missingAlt: alt === null,
        invalidEmptyAlt: alt === "" && image.getAttribute("aria-hidden") !== "true",
        genericAlt: Boolean(alt && genericAlt.test(alt.trim())),
        lowResolution: rect.width > 1 && rect.height > 1 && (image.naturalWidth + 1 < rect.width || image.naturalHeight + 1 < rect.height),
      };
    });

    return {
      images,
      metadata: {
        openGraphImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "",
        openGraphImageAlt: document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content") ?? "",
        twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute("content") ?? "",
        twitterImageAlt: document.querySelector('meta[name="twitter:image:alt"]')?.getAttribute("content") ?? "",
      },
      heroLcp: images.find((image) => image.source.includes("Hero-BG")) ?? null,
    };
  });

  const metadataPaths = [...new Set([inspection.metadata.openGraphImage, inspection.metadata.twitterImage])];
  const metadataStatuses = [];
  for (const imageUrl of metadataPaths) {
    const url = new URL(imageUrl);
    const localUrl = `${baseUrl}${url.pathname}`;
    const imageResponse = await request.get(localUrl);
    metadataStatuses.push({ imageUrl, localUrl, status: imageResponse.status(), contentType: imageResponse.headers()["content-type"] ?? "" });
  }

  const routeResult = {
    httpStatus: response?.status(),
    imageCount: inspection.images.length,
    broken: inspection.images.filter((image) => image.broken),
    missingAlt: inspection.images.filter((image) => image.missingAlt),
    invalidEmptyAlt: inspection.images.filter((image) => image.invalidEmptyAlt),
    genericAlt: inspection.images.filter((image) => image.genericAlt),
    external: inspection.images.filter((image) => !image.local),
        missingResponsiveSizes: inspection.images.filter((image) => image.fill && image.source.startsWith("/_next/image") && !image.sizes),
    lowResolution: inspection.images.filter((image) => image.lowResolution),
    metadata: inspection.metadata,
    metadataStatuses,
    heroLcp: inspection.heroLcp,
    errors,
  };
  report.routes[route] = routeResult;

  if (routeResult.httpStatus !== 200) failures.push(`${route}: HTTP ${routeResult.httpStatus}`);
  for (const [label, items] of Object.entries({
    broken: routeResult.broken,
    missingAlt: routeResult.missingAlt,
    invalidEmptyAlt: routeResult.invalidEmptyAlt,
    genericAlt: routeResult.genericAlt,
    external: routeResult.external,
    missingResponsiveSizes: routeResult.missingResponsiveSizes,
    lowResolution: routeResult.lowResolution,
  })) {
    if (items.length) failures.push(`${route}: ${label} (${items.length})`);
  }
  if (!routeResult.metadata.openGraphImageAlt || !routeResult.metadata.twitterImageAlt) failures.push(`${route}: social image alt`);
  if (metadataStatuses.some((entry) => entry.status !== 200 || !entry.contentType.startsWith("image/"))) failures.push(`${route}: social image response`);
  if (route === "/" && (!routeResult.heroLcp || routeResult.heroLcp.fetchPriority !== "high" || routeResult.heroLcp.loading === "lazy")) failures.push("/: LCP image priority");
  if (errors.length) failures.push(`${route}: browser errors (${errors.length})`);

  await page.close();
}

report.summary = {
  routesChecked: routes.length,
  imagesChecked: Object.values(report.routes).reduce((total, route) => total + route.imageCount, 0),
  uniqueSocialImages: [...new Set(Object.values(report.routes).flatMap((route) => [route.metadata.openGraphImage, route.metadata.twitterImage]))].length,
  failures,
};

await browser.close();
await writeFile(`${outputDirectory}/cca-image-qa.json`, `${JSON.stringify(report, null, 2)}\n`);

if (failures.length) {
  console.error(JSON.stringify(report.summary, null, 2));
  throw new Error(`Image SEO QA failed with ${failures.length} issue(s). Inspect ${outputDirectory}/cca-image-qa.json.`);
}

console.log(JSON.stringify(report.summary, null, 2));
