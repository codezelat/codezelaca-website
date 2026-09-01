import type { Metadata } from "next";

import { EnglishLandingPage } from "@/components/english/EnglishLandingPage";
import { EnglishCourseStructuredData } from "@/components/seo/EnglishCourseStructuredData";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Diploma in English in Sri Lanka | CCA School of English";
const description = "Study for a practical 100% online Diploma in English in Sri Lanka. Build confident speaking, writing, academic and workplace communication skills with CCA.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  pathname: "/english/",
  image: "/images/english/hero-discussion.webp",
  imageAlt: "Sri Lankan learners practising English for the CCA Diploma in English",
  imageWidth: 1600,
  imageHeight: 817,
});

export default function EnglishPage() {
  return (
    <>
      <EnglishCourseStructuredData />
      <EnglishLandingPage />
    </>
  );
}
