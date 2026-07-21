import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodeZela Career Accelerator",
    short_name: "CodeZela CCA",
    description:
      "Technology career programs with expert mentorship, real projects, and recognized certification pathways.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c026d3",
    lang: "en-US",
    icons: [
      {
        src: "/seo/cca-favicon-live.png",
        sizes: "150x150",
        type: "image/png",
      },
      {
        src: "/seo/cca-apple-touch-live.png",
        sizes: "300x300",
        type: "image/png",
      },
      {
        src: "/images/cca/cca-logo-1024x1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
