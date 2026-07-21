import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cca.it.com/",
      lastModified: new Date("2026-07-22T00:00:00+05:30"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
