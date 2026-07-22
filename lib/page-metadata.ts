import type { Metadata } from "next";

interface PageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  imageAlt?: string;
}

export function createPageMetadata({ title, description, pathname, image = "/seo/cca-og-live.jpg", imageAlt = "CodeZela Career Accelerator technology career programmes" }: PageMetadataOptions): Metadata {
  const canonical = `https://cca.it.com${pathname}`;
  const openGraphImage = image === "/seo/cca-og-live.jpg"
    ? { url: image, width: 1640, height: 721, alt: imageAlt }
    : { url: image, alt: imageAlt };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "CodeZela Career Accelerator",
      locale: "en_US",
      title,
      description,
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@codezelaca",
      creator: "@codezelaca",
      images: [{ url: image, alt: imageAlt }],
    },
  };
}
