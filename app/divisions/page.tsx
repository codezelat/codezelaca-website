import type { Metadata } from "next";

import { DivisionsPage } from "@/components/pages/DivisionsPage";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "Our Divisions - Specialized Career Faculties - Codezela";
const description = "Explore the specialized academic divisions at Codezela. Choose from Technology, Design, or Business tracks powered by SITC Campus and LBC Group UK standards.";

export const metadata: Metadata = createPageMetadata({ title, description, pathname: "/divisions/" });

export default function DivisionsRoute() {
  return (
    <>
      <PageStructuredData name="Our Divisions" description={description} pathname="/divisions/" pageType="CollectionPage" />
      <DivisionsPage />
    </>
  );
}

