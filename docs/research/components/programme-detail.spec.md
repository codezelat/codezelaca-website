# Programme Detail Page Specification

## Source and route contract

- Source family: `https://cca.it.com/programs/software-engineer/` and all programme links exposed by the live Career Accelerator archive.
- Local routes: `app/programs/[program]/page.tsx` for the complete 18-programme catalog.
- Original featured media is stored under `public/images/programs/`; route rendering has no live-site asset dependency.

## Visual topology

1. Shared fixed header and local breadcrumb trail.
2. Pale two-column hero with programme badge, title, description, registration/course actions, expert-trust cues and featured image.
3. Role explanation with practical outcome checklist.
4. Four-card delivery/outcome band.
5. Accessible native-details curriculum with at least ten programme-specific modules.
6. Recognition carousel, consultation panel and shared footer.

Desktop retains the live page's strong split hero and generous whitespace. Mobile stacks every region, keeps CTAs on one line, centers the menu icon and maintains zero horizontal overflow.

## SEO and data

- Static params for 18 routes.
- Unique title, description, canonical URL and programme image per route.
- `Course` and breadcrumb structured data, including delivery mode, provider and taught modules.
- All 18 routes are included in `sitemap.xml`.

## Source availability note

The live host intermittently returns a verification page. `scripts/sync-program-catalog.mjs` is retained as an explicit Bun refresh path for the server-rendered curriculum when the source is available; the checked-in catalog remains complete and independent of that host at runtime.
