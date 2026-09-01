import { englishFaqs } from "@/data/english";

const siteUrl = "https://cca.it.com";
const description = "Study for a practical 100% online Diploma in English in Sri Lanka. Build confident speaking, writing, academic and workplace communication skills with CCA.";

const englishStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/english/#webpage`,
    url: `${siteUrl}/english/`,
    name: "Diploma in English in Sri Lanka | CCA School of English",
    description,
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
    name: "Diploma in English in Sri Lanka",
    description,
    url: `${siteUrl}/english/`,
    provider: { "@id": `${siteUrl}/#organization` },
    educationalCredentialAwarded: "Diploma in English",
    courseMode: "online",
    inLanguage: "en",
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "School leavers, university students, early-career professionals and adult learners",
    },
    image: [
      `${siteUrl}/images/english/hero-discussion.webp`,
      `${siteUrl}/images/events/convocation-2026/hero-celebration.webp`,
      `${siteUrl}/images/events/convocation-2026/graduate-ready-portrait.webp`,
    ],
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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/english/#faqs`,
    mainEntity: englishFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export function EnglishCourseStructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(englishStructuredData).replaceAll("<", "\\u003c") }} />;
}
