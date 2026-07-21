# ProgrammeOverview Specification

## Overview
- Target file: `components/home/ProgrammeOverview.tsx`
- Screenshot: `docs/design-references/cca-section-about-desktop.png`
- Interaction model: static cards with link-free content.

## Exact layout and styles
- Desktop section: y1000, 746px high, max width 1260px, two 630px columns.
- Left column padding 10px. Label 18/18/700 `#710bc0`; main heading 42/45/600.
- Supporting paragraphs use `#4a5565`; collage uses `/images/cca/Frame-1000001114-2-1024x503.png` and has no overlay.
- Right side is a 2×2 grid, 610px wide overall, 302px rows.
- Each card outer: 295×302, 1px black, 20px radius, 5px padding.
- Each card inner: 283×290, 1px black, 20px radius, 10px padding.
- Images use source assets, 18px radius, cover crop. Titles: Poppins 18/18/600.

## Text content
- About the Programme.
- What is CodeZela Career Accelerator?
- The Codezela Career Accelerator is a premium, outcomes-driven programme that transforms ambitious learners into skilled professionals through real-world projects, expert mentorship, and a proven curriculum.
- Every learner finishes with verified work experience, a job-ready portfolio, and clear pathways to international certification. This is practical training built for real careers, not theory.
- Career-Focused — Every project, every lesson, every mentor session is designed to make you job-ready.
- Real Verification — Build a portfolio of real-world projects with verifiable work experience that prove your skills to employers.
- Expert Mentorship — Learn from industry professionals with 10+ years of experience in top IT companies.
- 6 Months Sprint — Intensive, structured learning that gets you from beginner to professional fast.

## Assets
- Collage and the four exact source photographs in `public/images/cca`.

## Responsive
- At mobile: one column, 20px gutter, 32/32 heading, collage hidden, four 302px cards stacked.
- At tablet: copy and cards stack with a two-column card grid when space permits.
