# Homepage SEO Contract

The homepage must preserve the live `cca.it.com` search identity while improving the technical implementation.

## Preserved live signals

- Exact live title and meta-description intent.
- Self-referencing `https://cca.it.com/` canonical URL.
- Index/follow with unlimited snippet and large image-preview directives.
- Exact live Open Graph banner stored at `public/seo/cca-og-live.jpg` (1640×721).
- Live Twitter account, social profiles, organization address, contact number, publication date, and site/organization identifiers.
- Live favicon and Apple icon assets stored locally.

## Added or strengthened

- Next.js metadata with future-page title templating.
- Complete Open Graph and Twitter card output using the real live banner.
- `EducationalOrganization`, `Place`, `WebSite`, and `WebPage` JSON-LD without the live homepage’s misleading `Article`/`admin` author schema.
- Crawlable `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest` metadata routes.
- Semantic page landmarks, one H1, ordered headings, descriptive image alternatives, local fonts, local imagery, and static prerendering.
- Automated HTML checks for metadata, structured data, crawl routes, approved 2026 content, visible images, and responsive overflow.

## Deployment boundary

The current sitemap intentionally contains only the implemented homepage. Do not replace the full live site with this homepage-only build until every indexed legacy URL is either rebuilt at the same URL or safely preserved through an origin/rewrite strategy. Launching a homepage while existing public URLs return 404 would lose search equity even if the homepage SEO is perfect.

Run `bun run sync:seo-assets` to refresh source-controlled live SEO assets, then run `bun run build` and `bun run qa:home` before release.
