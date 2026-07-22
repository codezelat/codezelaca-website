# CodeZela Career Accelerator

The production-ready Next.js website for CodeZela Career Accelerator, rebuilt from the current `cca.it.com` visual system with local assets, responsive layouts, accessible interactions, and a complete indexable page/metadata foundation.

## Stack

- Next.js 16 App Router and React 19
- Tailwind CSS 4
- Embla Carousel with autoplay
- Lucide and React Icons
- Local Poppins and Inter font files through `next/font/local`
- Playwright browser QA

## Run locally

```bash
bun install --frozen-lockfile
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gates

```bash
bun run lint
bunx tsc --noEmit
bun run build
bun run qa:home
bun run qa:pages
bun run qa:catalog
bun run sync:seo-assets
bun run sync:page-assets
bun run sync:program-assets
bun run sync:program-catalog
```

`qa:home` expects the site at `http://localhost:3000`. Set `HOME_QA_URL` to check another local or deployed URL. It validates desktop and mobile geometry, visible image loading, horizontal overflow, the mobile navigation dialog, and carousel pagination. Screenshots and the JSON report are written to `output/playwright/`.

`qa:pages` verifies `/divisions/`, `/about-us/`, `/contact-us/`, `/privacy-policy/`, `/terms-and-conditions/`, and `/refund-policy/` at desktop and mobile widths. It checks the rendered content, images, responsive overflow, local navigation, consultation handoff, titles, descriptions, canonicals, robots directives, social metadata, structured data, sitemap entries, and browser errors. Set `PAGES_QA_URL` to target another local or deployed URL.

`qa:catalog` verifies every division and programme detail route at desktop and mobile widths, including route health, responsive overflow, local navigation, metadata, structured data, images, curriculum accordions, and consultation actions.

`sync:seo-assets` refreshes the source-controlled Open Graph banner, favicon, Apple icon, and a generated metadata report from `cca.it.com`. The generated report is written below the ignored `output/` directory.

`sync:page-assets` refreshes the original division photography in `public/images/pages/divisions/` and retains production-sized source quality.

`sync:program-assets` refreshes the original local programme photography. `sync:program-catalog` can refresh programme content when the source site is available.

## Project structure

- `app/` — App Router entry point, metadata, local fonts, and global Tailwind theme
- `components/home/` — shared brand shell, homepage sections, and interactive carousels
- `components/pages/` — shared inner-page, editorial, form, division, and legal layouts
- `components/ui/` — shared interface primitives
- `data/` — typed homepage, division, and legal content
- `public/images/cca/` — local source imagery and recognition marks
- `scripts/` — production browser QA and live SEO-asset synchronization

Every public route is statically prerendered. Shared brand, navigation, actions, structured data, carousel, legal-document, catalogue, and footer foundations keep the implementation reusable without duplicating page logic.
