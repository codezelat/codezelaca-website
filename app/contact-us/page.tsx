import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/ContactPage";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Contact Us - Start Your Application At Codezela Career Accelerator";
const description = "Ready to launch your career in tech? Visit us at in Colombo or call our admissions team. Reach out today to secure your spot in our next intake.";

export const metadata: Metadata = createPageMetadata({ title, description, pathname: "/contact-us/" });

export default function ContactRoute() {
  return (
    <>
      <PageStructuredData name="Contact Us" description={description} pathname="/contact-us/" pageType="ContactPage" />
      <ContactPage />
    </>
  );
}

