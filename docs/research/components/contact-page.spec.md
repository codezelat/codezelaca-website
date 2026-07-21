# Contact Us Page Specification

## Overview

- Target: `app/contact-us/page.tsx` and `components/pages/ContactPage.tsx`
- Interaction model: validated client-side form submission to WhatsApp

## Source content and controls

- Hero label: `Contact Us`.
- Heading: `Your journey to a global career begins here`.
- Exact live descriptive paragraph.
- Actions: `WhatsApp Us Now` and `Email Us Now`.
- Form headings: `Need a Free Consultation?`, `Our Mentors will help you choose the right path`, and the exact supporting line.
- Fields: Full Name, Mobile Number, Email, Preferred Time for Consultation (Morning/Afternoon/Evening), Interested Pathway?, Message.
- Submit: `Request Consultation`.

## Responsive behavior

- Desktop form uses a wide two-column control grid inside a rounded, lightly shadowed panel.
- Mobile controls stack with 44px minimum interactive height and no horizontal overflow.
- Invalid required controls use native validation; valid submission opens the configured CCA WhatsApp destination with all entered fields.
