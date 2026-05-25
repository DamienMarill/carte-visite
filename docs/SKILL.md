---
name: marill-design
description: Use this skill to generate well-branded interfaces and assets for Marill.dev, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Key things to remember
- **French first.** Vous (not tu). Sentence case. French punctuation spacing.
- **Lato everywhere** (self-hosted from `fonts/`) — 400 body, 700 headlines, 900 hero. Letter-spacing -0.02em on 40px+ display.
- **Two surface modes** — Paper (`#FAFAF7`) default, or Night gradient (`#040404 → #282A49`). Pick one per screen; never mid-gray.
- **One violet accent** (`#5A4DEB`) per screen. The sparkler colours (amber, sun, cyan, teal, pink) are only for the sparkler motif.
- **The sparkler is the one decorative flourish.** Use `assets/sparkler.svg` or `assets/spark-small.svg`. Never redraw.
- **Radii: 4px on cards**, 8px on buttons. Crisp, editorial. Not the 16–24px blob of modern SaaS.
- **No emoji, no left-border-only colour accents, no gradient text, no glass on Paper mode.**
