import type { Metadata } from "next";

import { GraduationEventPage } from "@/components/pages/GraduationEventPage";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { eventStructuredImages } from "@/data/events";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "CCA Graduation 2026 - Event Story & Photo Highlights";
const description = "Explore the CCA Graduation 2026 event story, including real photographs from the SITC convocation, graduate recognition and celebration moments.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  pathname: "/events/graduation-2026/",
  image: "/seo/cca-events-graduation-og.jpg",
  imageAlt: "CCA graduates celebrating their 2026 graduation milestone",
  imageWidth: 1200,
  imageHeight: 630,
});

export default function GraduationEventRoute() {
  return (
    <>
      <PageStructuredData
        name="CCA Graduation 2026"
        description={description}
        pathname="/events/graduation-2026/"
        primaryImage="/images/events/convocation-2026/presentation-handshake.webp"
        images={eventStructuredImages}
      />
      <GraduationEventPage />
    </>
  );
}
