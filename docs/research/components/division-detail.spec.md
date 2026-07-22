# Division Detail Page Specification

## Source and route contract

- Source family: `https://cca.it.com/divisions/school-of-software-and-development/` and its four sibling school routes.
- Local routes: `app/divisions/[division]/page.tsx` using the five exact school slugs.
- Every internal school and programme link is root-relative. No rendered anchor points back to `cca.it.com`.

## Visual topology

1. Shared fixed CCA header.
2. Pale hero with breadcrumb, large school title, source-aligned description, registration and programme actions, and one high-resolution school image.
3. Responsive programme-card grid using the original programme images, duration/mode labels and local detail links.
4. Four-outcome metrics band, shared consultation panel and shared footer.

Desktop is a balanced two-column hero with a tall rounded image. Mobile stacks copy, actions and image without horizontal overflow. Programme cards use a three/two/one-column progression.

## SEO and data

- Static params for five routes.
- Unique title, description, canonical URL and Open Graph image per school.
- `CollectionPage`, `ItemList` and four-level breadcrumb structured data.
- All five routes are included in `sitemap.xml`.
