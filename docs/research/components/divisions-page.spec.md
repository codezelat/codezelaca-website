# Divisions Page Specification

## Overview

- Target: `app/divisions/page.tsx` and `components/pages/DivisionsPage.tsx`
- References: `docs/design-references/pages/divisions-{desktop,tablet,mobile}.png`
- Interaction model: static content plus anchor navigation and outbound actions

## Exact source structure

- Desktop reference: 1440px wide, 5418px tall.
- Header: shared fixed pill, max-width 1280px.
- Hero: centered, white, subtle concentric circle decoration, large violet gradient heading.
- Desktop rows: two equal columns; copy/image alternate each row.
- Mobile rows: copy first, image second; all five navigation pills stack.
- Images: 5 exact live photographs, cover fill, oversized top-left/top-right corner matching row direction.
- Consultation/footer: shared homepage components.

## Source content

Use the verbatim five-school descriptions and programme lists captured from the live route. Buttons are `View Program Details` and `Reserve Your Seat Now!`.

## Responsive behavior

- Desktop: 2-column rows, approximately 600px high with 40px gap.
- Tablet/mobile: 1-column rows; heading pill and actions remain full-width-safe; image aspect ratio is approximately 3:2.
- No horizontal overflow at 1440, 768, or 390px.
