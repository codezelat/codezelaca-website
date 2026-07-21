const siteUrl = "https://cca.it.com";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: `${siteUrl}/`,
  name: "Codezela Career Accelerator - #1 Tech Career Program In Sri Lanka",
  description:
    "Launch your tech career in months, not years. Join Sri Lanka’s top accelerator with SITC & LBC Group UK. Get DEC recognized certification & hired. Apply now.",
  datePublished: "2025-11-14T02:38:21+05:30",
  dateModified: "2026-07-22T00:00:00+05:30",
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: { "@id": `${siteUrl}/#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${siteUrl}/seo/cca-og-live.jpg`,
    width: 1640,
    height: 721,
  },
  inLanguage: "en-US",
};

export function HomeStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
