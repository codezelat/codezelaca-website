import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
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
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "64x64" },
      { url: "/seo/cca-favicon-live.png", type: "image/png", sizes: "150x150" },
    ],
    shortcut: "/favicon.ico",
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
    images: [{ url: "/seo/cca-og-live.jpg", alt: "CodeZela Career Accelerator technology career programs" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" data-scroll-behavior="smooth" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <SiteStructuredData />
        {children}
        <AnalyticsConsent />
        <Script id="analytics-consent-default" strategy="beforeInteractive">
          {`
            if (window.location.hostname === "cca.it.com" || window.location.hostname === "www.cca.it.com") {
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
              var analyticsChoice = null;
              try { analyticsChoice = window.localStorage.getItem("cca-analytics-consent"); } catch (error) {}
              var analyticsStorage = analyticsChoice === "granted" ? "granted" : "denied";
              window.gtag("consent", "default", {
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
                analytics_storage: analyticsStorage,
                wait_for_update: analyticsChoice ? 0 : 500
              });
              window.gtag("set", "ads_data_redaction", true);
              window.gtag("set", "allow_google_signals", false);
            }
          `}
        </Script>
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            if (window.location.hostname === "cca.it.com" || window.location.hostname === "www.cca.it.com") {
              var googleTag = document.createElement("script");
              googleTag.async = true;
              googleTag.src = "https://www.googletagmanager.com/gtag/js?id=G-FEV38YNDVC";
              document.head.appendChild(googleTag);
              window.gtag("js", new Date());
              window.gtag("config", "G-FEV38YNDVC", { send_page_view: true });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
