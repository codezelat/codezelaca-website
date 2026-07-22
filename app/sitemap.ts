import type { MetadataRoute } from "next";

import { divisionCatalog, programmes } from "@/data/program-catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-22T00:00:00+05:30");

  const coreRoutes = [
    ["/", "weekly", 1],
    ["/divisions/", "monthly", 0.9],
    ["/about-us/", "monthly", 0.8],
    ["/contact-us/", "monthly", 0.8],
    ["/privacy-policy/", "yearly", 0.4],
    ["/terms-and-conditions/", "yearly", 0.4],
    ["/refund-policy/", "yearly", 0.4],
  ] as const;
  const divisionRoutes = divisionCatalog.map((division) => [`/divisions/${division.slug}/`, "monthly", 0.85] as const);
  const programmeRoutes = programmes.map((programme) => [`/programs/${programme.slug}/`, "monthly", 0.85] as const);

  return [...coreRoutes, ...divisionRoutes, ...programmeRoutes].map(([pathname, changeFrequency, priority]) => ({
    url: `https://cca.it.com${pathname}`,
    lastModified,
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: priority as number,
  }));
}
