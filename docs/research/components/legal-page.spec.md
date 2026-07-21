# Legal Page Specification

## Overview

- Targets: `app/privacy-policy/page.tsx`, `app/terms-and-conditions/page.tsx`, `app/refund-policy/page.tsx`, and `components/pages/LegalDocument.tsx`
- Interaction model: static semantic document

## Structure

- Shared header.
- Compact inner hero with the route label and title.
- Last-updated line at the start of the readable document column.
- Privacy Policy preserves the nine live source sections and Terms and Conditions preserves the sixteen live source sections.
- Refund Policy is a new 2026 document covering permanent CCA programme cancellation, calculation and process, with an express non-waivable statutory-rights clause.
- Constrained readable text column with clear section spacing and accessible email link.
- Shared footer.

## Responsive behavior

- Desktop text column max-width approximately 1080px.
- Mobile reduces heading scale and padding while retaining normal-flow text; no fixed-height legal content.

## Legal-content boundary

The live Privacy Policy and Terms wording is preserved verbatim. The new Refund Policy is intentionally separate from the cloned 2025 documents and should receive qualified Sri Lankan legal review before production publication.
