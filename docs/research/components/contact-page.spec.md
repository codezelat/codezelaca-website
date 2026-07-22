# Contact Us Page Specification

## Overview

- Target: `app/contact-us/page.tsx` and `components/pages/ContactPage.tsx`
- Interaction model: validated client-side form submission to WhatsApp

## Source content and controls

- Hero label: `Contact Us`.
- Heading: `Your journey to a global career begins here`.
- Exact live descriptive paragraph.
- Actions: `WhatsApp Us Now` and `Email Us Now`.
- Consultation heading: `Choose your next step with clarity` with the August 2026 cohort context.
- Direct contact cards expose the verified admissions WhatsApp number and email address without inventing a physical location.
- Fields: Full Name, Mobile Number, Email, Preferred Time for Consultation (Morning/Afternoon/Evening), Interested Pathway?, Message.
- Submit: `Request Consultation`.

## Responsive behavior

- Desktop uses a bounded two-column consultation section: guidance and contact methods on the left, a rounded form card on the right.
- Mobile controls stack with 44px minimum interactive height and no horizontal overflow.
- Invalid required controls use native validation; valid submission opens the configured CCA WhatsApp destination with all entered fields.
- Every field has a visible label, autocomplete attributes where relevant, and an announced submission status.
