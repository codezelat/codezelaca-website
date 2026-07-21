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
bun run sync:seo-assets
bun run sync:page-assets
```

`qa:home` expects the site at `http://localhost:3000`. Set `HOME_QA_URL` to check another local or deployed URL. It validates desktop and mobile geometry, visible image loading, horizontal overflow, the mobile navigation dialog, and carousel pagination. Screenshots and the JSON report are written to `output/playwright/`.

`qa:pages` verifies `/divisions/`, `/about-us/`, `/contact-us/`, `/privacy-policy/`, `/terms-and-conditions/`, and `/refund-policy/` at desktop and mobile widths. It checks the rendered content, images, responsive overflow, local navigation, consultation handoff, titles, descriptions, canonicals, robots directives, social metadata, structured data, sitemap entries, and browser errors. Set `PAGES_QA_URL` to target another local or deployed URL.

`sync:seo-assets` refreshes the source-controlled Open Graph banner, favicon, Apple icon, and live metadata evidence from `cca.it.com`. The [SEO contract](docs/research/SEO_CONTRACT.md) documents the release boundary for preserving existing indexed URLs while the remaining pages are rebuilt.

`sync:page-assets` refreshes the original division photography in `public/images/pages/divisions/` and retains production-sized source quality.

## Project structure

- `app/` — App Router entry point, metadata, local fonts, and global Tailwind theme
- `components/home/` — shared brand shell, homepage sections, and interactive carousels
- `components/pages/` — shared inner-page, editorial, form, division, and legal layouts
- `components/ui/` — shared interface primitives
- `data/` — typed homepage, division, and legal content
- `public/images/cca/` — local source imagery and recognition marks
- `docs/research/` — source topology, behavior notes, section specifications, and parity evidence
- `scripts/` — production browser QA and live SEO-asset synchronization

Every public route is statically prerendered. Shared brand, navigation, actions, structured data, carousel, legal-document, and footer foundations are reusable for later programme and division pages without duplicating the current implementation.
