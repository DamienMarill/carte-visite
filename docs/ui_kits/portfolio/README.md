# UI Kit — Portfolio

High-fidelity recreation of the Marill.dev personal portfolio — the only public surface of the brand right now.

Open `index.html` for an interactive click-thru. It's a single-page faux-site that exercises:

- Night-mode hero (Home2 from Figma)
- Nav with Projets / CV / Contact
- Services section (Home3 paper surface)
- Projects grid (la compote qui dépote)
- Contact form with violet focus ring
- Footer

Components live in sibling `.jsx` files and are loaded by `index.html` as Babel scripts. Each is small and cosmetic-only — this is a visual kit, not a framework.

## Components
- `Nav.jsx` — top navigation
- `Hero.jsx` — night-mode hero with sparkler motif
- `Services.jsx` — three service cards on paper
- `Projects.jsx` — project grid with tags + hover lift
- `Testimonials.jsx` — "Ils m'ont fait confiance" quote rail
- `Contact.jsx` — form with focus ring
- `Footer.jsx` — compact paper footer
- `Sparkler.jsx` — reusable sparkler wrapper (full or compact)

Design source: `/V1/Home`, `/V1/Home2`, `/V1/Home3`, `/V1/Home4` in the Figma file.
