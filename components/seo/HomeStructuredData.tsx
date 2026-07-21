const siteUrl = "https://cca.it.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Place",
      "@id": `${siteUrl}/#place`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 12, Parkland Building, 33, Park Street",
        addressRegion: "Western",
        postalCode: "00200",
        addressCountry: "LK",
      },
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "CodeZela Career Accelerator",
      alternateName: "CCA Sri Lanka",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/cca/cca-logo-1024x1024.png`,
        contentUrl: `${siteUrl}/images/cca/cca-logo-1024x1024.png`,
        width: 1024,
        height: 1024,
      },
      description:
        "CodeZela Career Accelerator provides outcomes-driven technology career programs with expert mentorship, real projects, and recognized certification pathways.",
      email: "ca@codezela.com",
      telephone: "+94766772923",
      legalName: "Codezela Career Accelerator",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Level 12, Parkland Building, 33, Park Street",
        addressRegion: "Western",
        postalCode: "00200",
        addressCountry: "LK",
      },
      location: { "@id": `${siteUrl}/#place` },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "admissions",
          telephone: "+94766772923",
          email: "ca@codezela.com",
          areaServed: "LK",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          contactType: "admissions",
          telephone: "+94766778438",
          areaServed: "LK",
          availableLanguage: ["English"],
        },
      ],
      sameAs: [
        "https://www.facebook.com/codezelaca",
        "https://twitter.com/codezelaca",
        "https://www.instagram.com/codezelaca",
        "https://www.linkedin.com/company/codezelaca/",
        "https://x.com/CodezelaCA",
        "https://www.tiktok.com/@codezelaca",
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "Codezela Technologies",
        url: "https://codezela.com/",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "CodeZela Career Accelerator",
      alternateName: "CCA",
      description:
        "Launch your tech career in months, not years with expert mentorship, real projects, recognized certification, and placement-ready skills.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
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
    },
  ],
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
