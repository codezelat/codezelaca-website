import type { Metadata } from "next";

import { EventsPage } from "@/components/pages/EventsPage";
import { PageStructuredData } from "@/components/seo/PageStructuredData";
import { eventStructuredImages } from "@/data/events";
import { createPageMetadata } from "@/lib/page-metadata";

const title = "CCA Events & Moments - 2026 Graduation Celebration";
const description = "Explore the CCA 2026 graduation celebration through real photographs of graduates, the convocation ceremony and milestone moments from the day.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  pathname: "/events/",
  image: "/seo/cca-events-graduation-og.jpg",
  imageAlt: "CCA graduates celebrating together after the 2026 convocation",
  imageWidth: 1200,
  imageHeight: 630,
});

export default function EventsRoute() {
  return (
    <>
      <PageStructuredData
        name="CCA Events & Moments"
        description={description}
        pathname="/events/"
        pageType="CollectionPage"
        primaryImage="/images/events/convocation-2026/hero-celebration.webp"
        images={eventStructuredImages}
      />
      <EventsPage />
    </>
  );
}
