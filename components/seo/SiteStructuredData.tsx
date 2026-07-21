const siteUrl = "https://cca.it.com";

const siteStructuredData = {
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
      alternateName: ["CCA", "CCA Sri Lanka"],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/cca/cca-logo-1024x1024.png`,
        contentUrl: `${siteUrl}/images/cca/cca-logo-1024x1024.png`,
        width: 1024,
        height: 1024,
      },
      image: `${siteUrl}/seo/cca-og-live.jpg`,
      description:
        "CodeZela Career Accelerator provides outcomes-driven technology career programmes with expert mentorship, real projects, and recognised certification pathways.",
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
        "Launch your tech career in months, not years with expert mentorship, real projects, recognised certification, and placement-ready skills.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export function SiteStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replaceAll("<", "\\u003c") }}
    />
  );
}

