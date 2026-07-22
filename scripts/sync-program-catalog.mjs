import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://cca.it.com";
const projectRoot = process.cwd();
const imageDirectory = path.join(projectRoot, "public", "images", "programs");
const guideDirectory = path.join(projectRoot, "public", "guides");
const outputFile = path.join(projectRoot, "data", "program-catalog.json");

const programmeDivisions = {
  "software-engineer": "software-and-development",
  "mobile-app-developer": "software-and-development",
  "front-end-developer": "software-and-development",
  "back-end-developer": "software-and-development",
  "full-stack-developer": "software-and-development",
  "data-scientist": "ai-and-data-science",
  "data-engineer": "ai-and-data-science",
  "data-analyst": "ai-and-data-science",
  "ai-ml-engineer": "ai-and-data-science",
  "qa-engineer": "systems-engineering",
  "devops-engineer": "systems-engineering",
  "cyber-security-engineer": "systems-engineering",
  "ui-ux-designer": "creative-media-and-design",
  "graphic-designer": "creative-media-and-design",
  "seo-aeo-specialist": "marketing-and-business",
  "project-manager": "marketing-and-business",
  "digital-marketing-specialist": "marketing-and-business",
  "business-analyst": "marketing-and-business",
};

const cleanText = (value = "") => value.replace(/\s+/g, " ").trim();

function plainText(html = "") {
  return cleanText(
    html
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&#8217;|&rsquo;/g, "’")
      .replace(/&#8211;|&ndash;/g, "–")
      .replace(/&quot;/g, '"')
      .replace(/&#039;|&apos;/g, "'"),
  );
}

async function download(url, destination) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`Unable to download ${url}: ${response.status}`);
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

async function fetchHtml(url) {
  let finalError;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        headers: { "user-agent": "CCA local catalog synchronizer" },
      });
      const html = await response.text();
      if (!response.ok || !html.includes("<h1")) {
        throw new Error(`Unexpected response ${response.status} (${html.length} bytes)`);
      }
      return html;
    } catch (error) {
      finalError = error;
      if (attempt < 4) await new Promise((resolve) => setTimeout(resolve, attempt * 1_500));
    }
  }

  throw new Error(`Unable to load ${url} after four attempts: ${finalError}`);
}

function extensionFor(url, fallback) {
  const pathname = new URL(url).pathname;
  const extension = path.extname(pathname).toLowerCase();
  return extension && extension.length <= 6 ? extension : fallback;
}

const apiUrl = `${origin}/wp-json/wp/v2/program?per_page=100&_embed=1`;
const apiResponse = await fetch(apiUrl, { redirect: "follow" });
if (!apiResponse.ok) throw new Error(`Unable to load the live programme API: ${apiResponse.status}`);

const apiProgrammes = await apiResponse.json();
const bySlug = new Map(apiProgrammes.map((programme) => [programme.slug, programme]));
const missing = Object.keys(programmeDivisions).filter((slug) => !bySlug.has(slug));
if (missing.length) throw new Error(`The live API is missing programmes: ${missing.join(", ")}`);

await mkdir(imageDirectory, { recursive: true });
await mkdir(guideDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.setDefaultTimeout(30_000);
await page.route("**/*", (route) => {
  if (route.request().isNavigationRequest()) return route.continue();
  return route.abort();
});

const catalog = [];

try {
  for (const [slug, divisionId] of Object.entries(programmeDivisions)) {
    const programme = bySlug.get(slug);
    const liveUrl = `${origin}/programs/${slug}/`;
    const html = await fetchHtml(liveUrl);
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.locator("h1").first().waitFor({ state: "attached" });

    const extracted = await page.evaluate(() => {
      const normalize = (value = "") => value.replace(/\s+/g, " ").trim();
      const text = (element) => normalize(element?.textContent || "");
      const h1 = document.querySelector("h1");
      const heroContainer = h1?.closest(".e-con-inner") || h1?.parentElement?.parentElement;
      const heroTexts = Array.from(heroContainer?.querySelectorAll(".elementor-widget-text-editor") || [])
        .map(text)
        .filter(Boolean);
      const heroDescription =
        heroTexts.find((value) => /join our|career accelerator|programme|program/i.test(value)) ||
        heroTexts[0] ||
        "";

      const whoHeading = Array.from(document.querySelectorAll("h2, h3")).find((element) =>
        /^who is\b/i.test(text(element)),
      );
      const whoContainer = whoHeading?.closest(".e-con-child") || whoHeading?.parentElement?.parentElement;
      const roleTexts = Array.from(whoContainer?.querySelectorAll(".elementor-widget-text-editor") || [])
        .map(text)
        .filter((value) => value && value !== text(whoHeading));

      const modules = Array.from(document.querySelectorAll(".ue-repeater-accordion-item"))
        .map((item) => ({
          title: text(item.querySelector(".ue-repeater-accordion-item-heading")),
          description: text(
            item.querySelector(".ue-repeater-accordion-item-text") ||
              item.querySelector(".ue-repeater-accordion-item-content"),
          ),
        }))
        .filter((item) => item.title && item.description);

      const guide = Array.from(document.querySelectorAll("a[href]"))
        .find((anchor) => /download.*program|program.*guide/i.test(text(anchor)));

      return {
        title: text(h1),
        metaDescription: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
        heroDescription,
        roleHeading: text(whoHeading),
        roleDescription: roleTexts.join(" "),
        modules,
        guideUrl: guide?.href || "",
      };
    });

    const featuredImage = programme._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (!featuredImage) throw new Error(`No featured image found for ${slug}`);
    if (!extracted.title || !extracted.heroDescription || !extracted.roleDescription || !extracted.modules.length) {
      throw new Error(`Incomplete live content extracted for ${slug}: ${JSON.stringify(extracted)}`);
    }

    const imageExtension = extensionFor(featuredImage, ".jpg");
    const localImage = `/images/programs/${slug}${imageExtension}`;
    await download(featuredImage, path.join(imageDirectory, `${slug}${imageExtension}`));

    let localGuide = "";
    if (extracted.guideUrl && new URL(extracted.guideUrl).hostname.endsWith("cca.it.com")) {
      const guideExtension = extensionFor(extracted.guideUrl, ".pdf");
      localGuide = `/guides/${slug}${guideExtension}`;
      await download(extracted.guideUrl, path.join(guideDirectory, `${slug}${guideExtension}`));
    }

    catalog.push({
      slug,
      divisionId,
      title: extracted.title,
      metaDescription: cleanText(extracted.metaDescription) || plainText(programme.excerpt?.rendered),
      heroDescription: cleanText(extracted.heroDescription),
      roleHeading: cleanText(extracted.roleHeading) || `Who is a ${extracted.title}?`,
      roleDescription: cleanText(extracted.roleDescription),
      modules: extracted.modules.map((module) => ({
        title: cleanText(module.title),
        description: cleanText(module.description),
      })),
      image: localImage,
      imageAlt: `${extracted.title} career accelerator programme`,
      guide: localGuide,
      sourceUrl: liveUrl,
    });

    console.log(`Synced ${slug}: ${extracted.modules.length} modules`);
  }
} finally {
  await browser.close();
}

await writeFile(outputFile, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
console.log(`Wrote ${catalog.length} programmes to ${path.relative(projectRoot, outputFile)}`);
