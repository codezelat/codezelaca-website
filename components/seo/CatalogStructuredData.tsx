import type { DivisionCatalogEntry, ProgrammeCatalogEntry } from "@/types/catalog";

function JsonLd({ value }: { value: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replaceAll("<", "\\u003c") }} />;
}

export function DivisionStructuredData({ division, programmes }: { division: DivisionCatalogEntry; programmes: ProgrammeCatalogEntry[] }) {
  const url = `https://cca.it.com/divisions/${division.slug}/`;
  return (
    <JsonLd
      value={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${url}#webpage`,
          url,
          name: division.title,
          description: division.description,
          isPartOf: { "@id": "https://cca.it.com/#website" },
          about: { "@id": "https://cca.it.com/#organization" },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: programmes.length,
            itemListElement: programmes.map((programme, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: programme.title,
              url: `https://cca.it.com/programs/${programme.slug}/`,
            })),
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://cca.it.com/" },
            { "@type": "ListItem", position: 2, name: "Divisions", item: "https://cca.it.com/divisions/" },
            { "@type": "ListItem", position: 3, name: division.title, item: url },
          ],
        },
      ]}
    />
  );
}

export function ProgrammeStructuredData({ programme, division }: { programme: ProgrammeCatalogEntry; division: DivisionCatalogEntry }) {
  const url = `https://cca.it.com/programs/${programme.slug}/`;
  return (
    <JsonLd
      value={[
        {
          "@context": "https://schema.org",
          "@type": "Course",
          "@id": `${url}#course`,
          url,
          name: `${programme.title} Career Accelerator Programme`,
          description: programme.heroDescription,
          provider: { "@id": "https://cca.it.com/#organization" },
          image: `https://cca.it.com${programme.image}`,
          educationalLevel: "Beginner to career-ready",
          teaches: programme.modules.map((module) => module.title),
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: ["online", "blended"],
            courseWorkload: "P6M",
            inLanguage: "en-US",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://cca.it.com/" },
            { "@type": "ListItem", position: 2, name: "Divisions", item: "https://cca.it.com/divisions/" },
            { "@type": "ListItem", position: 3, name: division.title, item: `https://cca.it.com/divisions/${division.slug}/` },
            { "@type": "ListItem", position: 4, name: programme.title, item: url },
          ],
        },
      ]}
    />
  );
}
