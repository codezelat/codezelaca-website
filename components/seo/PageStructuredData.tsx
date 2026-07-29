interface PageStructuredDataProps {
  name: string;
  description: string;
  pathname: string;
  pageType?: "AboutPage" | "ContactPage" | "CollectionPage" | "WebPage";
  primaryImage?: string;
  images?: Array<{
    url: string;
    name: string;
    description: string;
  }>;
}

export function PageStructuredData({
  name,
  description,
  pathname,
  pageType = "WebPage",
  primaryImage,
  images = [],
}: PageStructuredDataProps) {
  const url = `https://cca.it.com${pathname}`;
  const absoluteImage = primaryImage ? `https://cca.it.com${primaryImage}` : undefined;
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
      ...(absoluteImage ? {
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: absoluteImage,
        },
      } : {}),
      ...(images.length ? {
        mainEntity: {
          "@type": "ImageGallery",
          name: `${name} photo gallery`,
          associatedMedia: images.map((image) => ({
            "@type": "ImageObject",
            name: image.name,
            description: image.description,
            contentUrl: `https://cca.it.com${image.url}`,
          })),
        },
      } : {}),
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
