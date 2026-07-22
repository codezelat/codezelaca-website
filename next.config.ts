import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    qualities: [75, 90],
    minimumCacheTTL: 31_536_000,
  },
  async redirects() {
    return [
      {
        source: "/program_category/career-accelerator",
        destination: "/divisions/",
        permanent: true,
      },
      ...["/wp-sitemap.xml", "/sitemap_index.xml", "/page-sitemap.xml", "/program-sitemap.xml", "/program_category-sitemap.xml"].map((source) => ({
        source,
        destination: "/sitemap.xml",
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/:asset(images|fonts|seo)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
