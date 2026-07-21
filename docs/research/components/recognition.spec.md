# Recognition Specification

## Overview
- Target file: `components/home/RecognitionCarousel.tsx`
- Screenshot: `docs/design-references/cca-section-recognition-desktop.png`
- Interaction model: autoplay + drag/swipe + pagination.

## Exact layout and styles
- Desktop section: y3471, 321px; content 1260px wide.
- Label 18/18/700; headline 42/45/600. Mobile headline 32/38.4/600.
- Carousel viewport: 1260×136, 5 slides, 30px gap, loop, autoplay 2000ms.
- Logos retain natural aspect ratio and fit within a consistent 105px-high stage.
- Six dots; active dot `#710bc0`, others black/gray according to inactive state.

## Assets
- Chamber of Psychology and Counselling; ISO; SITC; Gatehouse Awards; London Business Consultancy; DEC.
- Use exact local PNGs in `public/images/cca`.

## Responsive
- 5 logos desktop, 3 tablet, 2 mobile. Mobile section settled height approximately 371px.
- Pagination is clickable; autoplay pauses on interaction and reduced motion.
