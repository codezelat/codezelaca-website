# CodeZela Career Accelerator

The production-ready Next.js homepage for CodeZela Career Accelerator, rebuilt from the current `cca.it.com` visual system with local assets, responsive layouts, and accessible interactions.

## Stack

- Next.js 16 App Router and React 19
- Tailwind CSS 4
- Embla Carousel with autoplay
- Lucide and React Icons
- Local Poppins and Inter font files through `next/font/local`
- Playwright browser QA

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gates

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run qa:home
npm run sync:seo-assets
```

`qa:home` expects the site at `http://localhost:3000`. Set `HOME_QA_URL` to check another local or deployed URL. It validates desktop and mobile geometry, visible image loading, horizontal overflow, the mobile navigation dialog, and carousel pagination. Screenshots and the JSON report are written to `output/playwright/`.

`sync:seo-assets` refreshes the source-controlled Open Graph banner, favicon, Apple icon, and live metadata evidence from `cca.it.com`. The [SEO contract](docs/research/SEO_CONTRACT.md) documents the release boundary for preserving existing indexed URLs while the remaining pages are rebuilt.

## Project structure

- `app/` — App Router entry point, metadata, local fonts, and global Tailwind theme
- `components/home/` — homepage sections and interactive carousels
- `components/ui/` — shared interface primitives
- `data/home.ts` — typed homepage content and destinations
- `public/images/cca/` — local source imagery and recognition marks
- `docs/research/` — source topology, behavior notes, section specifications, and parity evidence
- `scripts/` — production browser QA and live SEO-asset synchronization

The homepage is intentionally section-based so future pages can reuse the brand, navigation, action, carousel, and footer foundations without duplicating the homepage implementation.
