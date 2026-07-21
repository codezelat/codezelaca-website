# CCA Homepage Behaviors

## Header

- Fixed at the top with a 15px outer offset and no visual state change after 1000px of scroll.
- Desktop navigation is visible; below the desktop breakpoint it becomes a magenta bars control.
- Mobile menu is click-driven, modal-like, dismissible by close control, link selection, Escape, or backdrop click.

## Buttons and links

- Primary buttons: `rgb(192, 38, 211)`, white text, 10px radius, 15px Poppins 500, 0.3s transition.
- Secondary buttons: white surface, magenta border/text, 10px radius.
- Every visible CTA uses a real destination; WhatsApp destinations use numeric `wa.me` links.
- Focus rings remain visible for keyboard users; reduced motion removes animated transforms.

## Programs carousel

- Embla-compatible horizontal carousel.
- 3 cards visible at 1440, 2 at tablet, 1 at mobile.
- Loop enabled, 10px gap, autoplay delay 5000ms, stops on pointer/focus interaction.
- Pagination dots are clickable and update the active slide group; drag/swipe is enabled.

## Recognition carousel

- 5 logos visible at 1440, 3 at tablet, 2 at mobile.
- Loop enabled, 30px gap, autoplay delay 2000ms, stops on pointer/focus interaction.
- Six pagination positions, with the active dot magenta.

## Scroll and reveal

- Source uses Elementor lazy loading and entrance classes. The clone uses restrained viewport reveals only where they do not alter the captured settled layout.
- `prefers-reduced-motion` disables autoplay and reveal movement.

## Responsive behavior

- Main content max width is 1260px with 90px desktop gutters and 20px mobile gutters.
- Hero, programme, and footer change from columns to a single vertical flow.
- Programme collage and central differentiator logo are hidden on mobile.
- No horizontal page overflow; carousel tracks clip within their own viewports.
