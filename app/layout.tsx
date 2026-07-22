import type { Metadata } from "next";
import localFont from "next/font/local";

import { SiteStructuredData } from "@/components/seo/SiteStructuredData";

import "./globals.css";

const poppins = localFont({
  variable: "--font-poppins",
  src: [
    { path: "../public/fonts/cca/poppins-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/cca/poppins-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/cca/poppins-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/cca/poppins-700-latin.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const inter = localFont({
  variable: "--font-inter",
  src: "../public/fonts/cca/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cca.it.com"),
  title: {
    default: "Codezela Career Accelerator - #1 Tech Career Program In Sri Lanka",
    template: "%s | CodeZela Career Accelerator",
  },
  description:
    "Launch your tech career in months, not years. Join Sri Lanka’s top accelerator with SITC & LBC Group UK. Get DEC recognized certification & hired. Apply now.",
  applicationName: "CodeZela Career Accelerator",
  creator: "Codezela Technologies",
  publisher: "Codezela Technologies",
  category: "education",
  referrer: "origin-when-cross-origin",
  alternates: { canonical: "https://cca.it.com/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/seo/cca-favicon-live.png", type: "image/png", sizes: "150x150" }],
    shortcut: "/seo/cca-favicon-live.png",
    apple: [{ url: "/seo/cca-apple-touch-live.png", type: "image/png", sizes: "300x300" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "CodeZela Career Accelerator",
    locale: "en_US",
    title: "Codezela Career Accelerator - #1 Tech Career Program In Sri Lanka",
    description:
      "Launch your tech career in months, not years. Join Sri Lanka’s top accelerator with SITC & LBC Group UK. Get DEC recognized certification & hired. Apply now.",
    images: [{ url: "/seo/cca-og-live.jpg", width: 1640, height: 721, alt: "CodeZela Career Accelerator technology career programs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codezela Career Accelerator - #1 Tech Career Program In Sri Lanka",
    description:
      "Launch your tech career in months, not years. Join Sri Lanka’s top accelerator with SITC & LBC Group UK. Get DEC recognized certification & hired. Apply now.",
    site: "@codezelaca",
    creator: "@codezelaca",
    images: ["/seo/cca-og-live.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" data-scroll-behavior="smooth" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <SiteStructuredData />
        {children}
      </body>
    </html>
  );
}
