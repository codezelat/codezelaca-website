import type { Metadata } from "next";

import { LegalDocument } from "@/components/pages/LegalDocument";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { termsSections } from "@/data/pages";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Terms And Conditions - Codezela Career Accelerator";
const description = "Read the official terms of service for Codezela Career Accelerator. Understand the rules regarding enrollment course fees and the code of conduct for students.";

export const metadata: Metadata = createPageMetadata({ title, description, pathname: "/terms-and-conditions/" });

export default function TermsRoute() {
  return (
    <>
      <PageStructuredData name="Terms and Conditions" description={description} pathname="/terms-and-conditions/" />
      <LegalDocument label="Terms and Conditions" title="how you use our website and programmes" updatedAt="November 24, 2025" sections={termsSections} />
    </>
  );
}

