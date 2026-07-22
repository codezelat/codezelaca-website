import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: ["https://cca.it.com/sitemap.xml", "https://cca.it.com/local-sitemap.xml"],
    host: "https://cca.it.com",
  };
}
