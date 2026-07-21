interface PageStructuredDataProps {
  name: string;
  description: string;
  pathname: string;
  pageType?: "AboutPage" | "ContactPage" | "CollectionPage" | "WebPage";
}

export function PageStructuredData({ name, description, pathname, pageType = "WebPage" }: PageStructuredDataProps) {
  const url = `https://cca.it.com${pathname}`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": pageType,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": "https://cca.it.com/#website" },
      about: { "@id": "https://cca.it.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cca.it.com/" },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }} />;
}

