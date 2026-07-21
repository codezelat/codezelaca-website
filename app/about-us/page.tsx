import type { Metadata } from "next";

import { AboutPage } from "@/components/pages/AboutPage";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "About Codezela Career Accelerator - Born From Industry Tech Training";
const description = "Discover the story behind Codezela Career Accelerator, the industry-led education programme helping Sri Lankan learners build job-ready skills and global careers.";

export const metadata: Metadata = createPageMetadata({ title, description, pathname: "/about-us/" });

export default function AboutRoute() {
  return (
    <>
      <PageStructuredData name="About Us" description={description} pathname="/about-us/" pageType="AboutPage" />
      <AboutPage />
    </>
  );
}

