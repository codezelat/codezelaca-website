import type { Metadata } from "next";

import { EnglishLandingPage } from "@/components/english/EnglishLandingPage";
import { EnglishCourseStructuredData } from "@/components/seo/EnglishCourseStructuredData";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Diploma in English | CCA School of English";
const description = "Build confident spoken, written, academic and workplace English through practical online learning at CCA School of English. Talk to admissions today.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  pathname: "/english/",
  image: "/images/english/hero-discussion.webp",
  imageAlt: "Sri Lankan learners practising English communication at CCA School of English",
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
