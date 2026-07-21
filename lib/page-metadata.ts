import type { Metadata } from "next";

interface PageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
}

export function createPageMetadata({ title, description, pathname }: PageMetadataOptions): Metadata {
  const canonical = `https://cca.it.com${pathname}`;

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
      images: [
        {
          url: "/seo/cca-og-live.jpg",
          width: 1640,
          height: 721,
          alt: "CodeZela Career Accelerator technology career programmes",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@codezelaca",
      creator: "@codezelaca",
      images: ["/seo/cca-og-live.jpg"],
    },
  };
}

