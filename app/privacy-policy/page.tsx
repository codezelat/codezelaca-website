import type { Metadata } from "next";

import { LegalDocument } from "@/components/pages/LegalDocument";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { privacySections } from "@/data/pages";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Privacy Policy - Data Protection At Codezela Career Accelerator";
const description = "We value your trust. Read how Codezela Career Accelerator protects your personal student data and learn more about our transparency.";

export const metadata: Metadata = createPageMetadata({ title, description, pathname: "/privacy-policy/" });

export default function PrivacyPolicyRoute() {
  return (
    <>
      <PageStructuredData name="Privacy Policy" description={description} pathname="/privacy-policy/" />
      <LegalDocument label="Privacy Policy" title="how we collect and protect your personal information" updatedAt="November 24, 2025" sections={privacySections} />
    </>
  );
}

