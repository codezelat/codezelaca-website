import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/ContactPage";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Contact Us - Start Your Application At Codezela Career Accelerator";
const description = "Talk with the CodeZela Career Accelerator admissions team about programmes, applications and the August 2026 cohort. Request a free career consultation today.";

export const metadata: Metadata = createPageMetadata({ title, description, pathname: "/contact-us/" });

export default function ContactRoute() {
  return (
    <>
      <PageStructuredData name="Contact Us" description={description} pathname="/contact-us/" pageType="ContactPage" />
      <ContactPage />
    </>
  );
}
