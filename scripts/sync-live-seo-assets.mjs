import { mkdir, writeFile } from "node:fs/promises";

const liveUrl = "https://cca.it.com/";
const outputDirectory = new URL("../public/seo/", import.meta.url);
const reportDirectory = new URL("../output/sync/", import.meta.url);
const reportOutput = new URL("live-seo.json", reportDirectory);
const headers = {
  accept: "text/html,application/xhtml+xml,image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  referer: liveUrl,
  "user-agent": "Mozilla/5.0",
};

await mkdir(outputDirectory, { recursive: true });
await mkdir(reportDirectory, { recursive: true });

const htmlResponse = await fetch(liveUrl, { headers });
if (!htmlResponse.ok) throw new Error(`Could not fetch live homepage: ${htmlResponse.status}`);
const html = await htmlResponse.text();

const getMeta = (attribute, value) => {
  const pattern = new RegExp(
    `<meta[^>]+${attribute}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  return html.match(pattern)?.[1]?.replaceAll("&amp;", "&") ?? null;
};

const getLink = (rel) => {
  const pattern = new RegExp(
    `<link[^>]+rel=["'][^"']*${rel}[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>`,
    "i",
  );
  return html.match(pattern)?.[1]?.replaceAll("&amp;", "&") ?? null;
};

const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

const graph = jsonLd.flatMap((entry) => entry["@graph"] ?? []);
const liveOrganization = graph.find((entry) => entry["@type"] === "Organization");
const ogImage = getMeta("property", "og:image");
const liveLogo = liveOrganization?.logo?.url ?? null;
const icon = getLink("icon");
const appleIcon = getLink("apple-touch-icon");

const assets = [
  { name: "openGraph", source: ogImage, filename: "cca-og-live.jpg" },
  { name: "organizationLogo", source: liveLogo, filename: "cca-logo-live.png" },
  { name: "icon", source: icon, filename: "cca-favicon-live.png" },
  { name: "appleIcon", source: appleIcon, filename: "cca-apple-touch-live.png" },
].filter((asset) => asset.source);

const downloaded = [];
for (const asset of assets) {
  const response = await fetch(asset.source, { headers });
  if (!response.ok) {
    downloaded.push({ ...asset, status: response.status, local: null });
    continue;
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(new URL(asset.filename, outputDirectory), bytes);
  downloaded.push({
    ...asset,
    status: response.status,
    contentType: response.headers.get("content-type"),
    bytes: bytes.length,
    local: `/seo/${asset.filename}`,
  });
}

const metadata = {
  syncedAt: new Date().toISOString(),
  source: liveUrl,
  title: html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? null,
  description: getMeta("name", "description"),
  canonical: getLink("canonical"),
  robots: getMeta("name", "robots"),
  openGraph: {
    locale: getMeta("property", "og:locale"),
    type: getMeta("property", "og:type"),
    title: getMeta("property", "og:title"),
    description: getMeta("property", "og:description"),
    url: getMeta("property", "og:url"),
    siteName: getMeta("property", "og:site_name"),
    image: ogImage,
    imageWidth: getMeta("property", "og:image:width"),
    imageHeight: getMeta("property", "og:image:height"),
    imageType: getMeta("property", "og:image:type"),
  },
  twitter: {
    card: getMeta("name", "twitter:card"),
    title: getMeta("name", "twitter:title"),
    description: getMeta("name", "twitter:description"),
    site: getMeta("name", "twitter:site"),
    creator: getMeta("name", "twitter:creator"),
    image: getMeta("name", "twitter:image"),
  },
  liveOrganization,
  assets: downloaded,
};

await writeFile(reportOutput, `${JSON.stringify(metadata, null, 2)}\n`);
console.log(JSON.stringify({ assets: downloaded, report: reportOutput.pathname }, null, 2));
