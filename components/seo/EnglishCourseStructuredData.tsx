const siteUrl = "https://cca.it.com";

const englishStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/english/#webpage`,
    url: `${siteUrl}/english/`,
    name: "Diploma in English | CCA School of English",
    description: "Build confident spoken, written, academic and workplace English through practical online learning at CCA School of English.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/english/#course` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: `${siteUrl}/images/english/hero-discussion.webp`,
      width: 1600,
      height: 817,
    },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${siteUrl}/english/#course`,
    name: "Diploma in English",
    description: "A practical online Diploma in English focused on confident speaking, clear writing, comprehension, presentations and professional communication.",
    url: `${siteUrl}/english/`,
    provider: { "@id": `${siteUrl}/#organization` },
    educationalCredentialAwarded: "Diploma in English",
    courseMode: "online",
    inLanguage: "en",
    image: `${siteUrl}/images/english/hero-discussion.webp`,
    teaches: [
      "English grammar and sentence control",
      "Vocabulary and pronunciation",
      "Speaking and listening",
      "Reading comprehension",
      "Academic and workplace writing",
      "Presentations and interviews",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "CCA School of English", item: `${siteUrl}/english/` },
    ],
  },
];

export function EnglishCourseStructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(englishStructuredData).replaceAll("<", "\\u003c") }} />;
}
