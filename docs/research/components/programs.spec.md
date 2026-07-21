# Programs Specification

## Overview
- Target file: `components/home/ProgramsCarousel.tsx`
- Screenshot: `docs/design-references/cca-section-programs-desktop.png`
- Interaction model: autoplay + drag/swipe + pagination.

## Exact layout and styles
- Desktop section: y2545, 846px, width 1260px; label/headline centered.
- Heading: Poppins 42/45/600; mobile 32/38.4/600.
- Carousel: 1260×576, 3 slides, 10px gap, loop, autoplay 5000ms.
- Card: 403×550, 1px `rgba(0,0,0,.15)`, 20px radius, 10px padding.
- Image: 381×300 settled crop, 18px radius, object-cover.
- Card title: Poppins 28/32/700. Meta pills have neutral 1px border and purple text.
- Learn More: 123×55, `#c026d3`, 10px radius. All-programs CTA: `#710bc0`.
- Dots reflect all 12 slides; active dot black in source settled state.

## Content
- Full-Stack Developer; AI/ML Engineer; Back-End Developer; Business Analyst; Cyber Security Engineer; Data Analyst; Data Engineer; Data Scientist; DevOps Engineer; Digital Marketing Specialist; Front-End Developer; Graphic Designer.
- Every card: 6 Months; Hybrid & 100% Online; Learn More.
- Initial visible order is Full-Stack, AI/ML, Back-End.

## Assets
- Exact local program photos from `public/images/cca`; where a blocked WordPress derivative is absent, use the nearest same-session source photo and record the mapping in data.

## Responsive
- 3/2/1 slides at desktop/tablet/mobile. Mobile card stays centered and approximately 350px wide.
- Pause autoplay on hover/focus/drag and when reduced motion is requested.
