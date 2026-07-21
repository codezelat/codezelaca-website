# HeaderHero Specification

## Overview
- Target files: `components/home/Header.tsx`, `components/home/Hero.tsx`
- Screenshot: `docs/design-references/cca-section-hero-desktop.png`
- Interaction model: fixed header; click-driven mobile menu; static hero.

## Exact layout and styles
- Header outer: fixed, width 100%, top 15px, z-index above content.
- Header inner desktop: x90, y35, 1260×79, white at 72% opacity, 1px `rgba(0,0,0,.24)` border, 80px radius, `0 0 10px rgba(0,0,0,.09)`.
- Header nav text: Poppins 16px/600, `#710bc0`. Header CTA: 163×55, 15px/500, `#c026d3`, 80px radius.
- Hero band: `#fdf2f8`, desktop 1000px settled height, mobile 1383px.
- Hero content: 1260px max; two equal columns at desktop; single column at mobile.
- H1 desktop: x90/y231, 495×90, Poppins 42/45/600. Mobile: x20/y180, 265×119, 36/39.6/600.
- Notice pill text is verbatim and sits above H1.
- Body copy uses `#4a5565`, three lines at desktop.
- Primary/secondary hero buttons are 55/57px high and 10px radius.
- Source artwork: `/images/cca/Hero-BG.png`, no extra color overlay, aspect ratio preserved with a cover crop.
- Metrics frame desktop: 1088×152, x176, 5px white border, 20px radius, 10px padding, gradient `#cb00f8 → #710bc0`.
- Metrics are 4 columns desktop and 2×2 mobile.

## Text content
- About Us; Divisions; Contact Us; Register Now.
- Next Cohort Starts August 2026 - Limited Seats Available.
- Start Your Tech Career in 6 Months.
- Learn from industry professionals, build real projects employers care about, and follow a curriculum shaped by global tech standards with government recognition.
- Explore Career Tracks; 1000+ Student Applications; 100% Job-Ready Skills.
- 100% Placement Ready; 18 Career Tracks; 10K+ Job Market; 50+ Professional Mentors.

## Responsive
- Desktop nav from 1024px. Below it, show a magenta bars control and hide header CTA/nav.
- Mobile content gutter is 20px; text precedes artwork and metrics.
- No horizontal overflow; artwork remains fully visible and bottom-aligned.
