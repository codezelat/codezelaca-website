import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-22T00:00:00+05:30");

  return [
    ["/", "weekly", 1],
    ["/divisions/", "monthly", 0.9],
    ["/about-us/", "monthly", 0.8],
    ["/contact-us/", "monthly", 0.8],
    ["/privacy-policy/", "yearly", 0.4],
    ["/terms-and-conditions/", "yearly", 0.4],
    ["/refund-policy/", "yearly", 0.4],
  ].map(([pathname, changeFrequency, priority]) => ({
    url: `https://cca.it.com${pathname}`,
    lastModified,
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: priority as number,
  }));
}
