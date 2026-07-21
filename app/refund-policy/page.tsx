import type { Metadata } from "next";

import { LegalDocument } from "@/components/pages/LegalDocument";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { refundSections } from "@/data/pages";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Refund Policy - Codezela Career Accelerator";
const description = "Read the Codezela Career Accelerator refund policy, including the limited circumstances that apply when CCA permanently cancels a programme.";

export const metadata: Metadata = createPageMetadata({ title, description, pathname: "/refund-policy/" });

export default function RefundPolicyRoute() {
  return (
    <>
      <PageStructuredData name="Refund Policy" description={description} pathname="/refund-policy/" />
      <LegalDocument label="Refund Policy" title="when programme fees may be refunded" updatedAt="July 22, 2026" sections={refundSections} />
    </>
  );
}

