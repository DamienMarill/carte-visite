# Marill.dev Design System

> **Le code au service de la créativité.**
> Transmettre, concevoir et innover avec vous.

Marill.dev is the personal portfolio and creative-dev brand of an independent developer / designer whose positioning is bilingual-French, warm, slightly playful and craft-oriented: *code in service of creativity, passing on, designing and innovating with you.*

This project is the first formalised design system for the brand. Before this there was no established visual identity — only an early, incomplete Figma exploration and a short brand positioning PDF.

---

## Sources & scope

| Source | Status | Notes |
|---|---|---|
| Figma file — **Portfolio-Marill.dev.fig** | ✅ read in full | 2 pages · 29 frames · mounted as read-only VFS. Explored `/Logo/*` (moodboard + raw logo) and `/V1/*` (Home, Home2, Home3, Home4 — 4 in-progress landing-page variants). |
| Positioning PDF — **uploads/létrucdebase.pdf** | ⚠️ **not found on filesystem** | The brief referenced this file but it was not actually uploaded. The brand positioning tagline ("Le code au service de la créativité. Transmettre, concevoir et innover avec vous.") was lifted from the Figma hero copy instead. |
| Codebase | ❌ none attached | No production site exists yet — this DS is forward-looking. |

The Figma is **explicitly incomplete** (per the user). We extrapolated a coherent system from the fragments that exist: the wordmark, the French headline copy, a deep-midnight gradient, a white-paper portrait card, and above all the **sparkler motif** that shows up in three of four Home variants. The system in this repo is meant to lock those choices down so the brand can move forward.

---

## Index — what's in this repo

```
README.md                  — this file (start here)
SKILL.md                   — agent-skill manifest (cross-compatible with Claude Code)
colors_and_type.css        — all design tokens + semantic type roles
assets/                    — logos, sparkler SVGs, photo mood images
preview/                   — individual cards populating the Design System tab
ui_kits/
  portfolio/               — the Marill.dev personal site (primary product)
    index.html             — click-thru hi-fi recreation
    *.jsx                  — reusable components (Nav, Hero, ProjectCard, …)
```

> **One product for now.** Marill.dev is a portfolio — a single public surface. When new products appear (docs site, a SaaS, a landing page for a client-facing service) add a sibling folder under `ui_kits/<product>/`.

---

## Brand essence

The name sits at the intersection of three postures, in French. Keep all three present — drop any one and the brand flattens.

1. **Le code** — the craft, the rigour, the thing actually shipped.
2. **La créativité** — code is a tool; the output is something people *feel*. The sparkler motif captures this: a small ember thrown into the dark that bursts into unexpected colour.
3. **Avec vous** — collaboration, transmission, teaching. Never the solitary genius-dev. Always *with*.

The visual outcome: **editorial, warm, understated confidence.** Big quiet French type on a deep-midnight ground, one unexpected burst of colour, no feature-tour tropes, no decorative scrollytelling.

---

## CONTENT FUNDAMENTALS

Marill.dev is written in **French first**. The copy in the Figma is entirely French; English is only used if the client requires it.

### Tone
- **Warm, personal, slightly cheeky.** Reads like a thoughtful person writing, not a brand.
- **Second-person intimate.** Uses ***vous*** (not *tu*) — professional respect, but you are addressed directly.
- **First-person singular is fine.** This is a personal brand — *mes projets, mes services, ils m'ont fait confiance*. Never the royal "we".
- **Dry humour in parentheses.** Found in the Figma: "Mes projets **(la compote qui dépote)**" — a playful aside that rewards attention without breaking the confidence.
- **Compound verb promises.** The tagline stacks three verbs in the infinitive — *Transmettre, concevoir et innover* — rhythm matters.

### Casing & punctuation
- Sentence case everywhere. **Never** Title Case. Never SHOUTING.
- French punctuation spacing: `«&nbsp;citation&nbsp;»`, `mot&nbsp;:` (non-breaking space before `: ; ? !`).
- Proper typographic apostrophe: `l'ont`, `m'ont`, not `l'ont`.
- Periods at the end of hero statements — even when they're fragments. Gives finality: *"Le code au service de la créativité."*

### Length & density
- Hero lines are **two short phrases**, not a paragraph.
- Section titles are **3–6 words** max, often a question-like fragment: *Mes services*, *Mes projets*, *Ils m'ont fait confiance*.
- Body paragraphs stay under 3 sentences.

### Voice checklist
- ✅ *Concevoir un outil sur-mesure, sans friction, avec vous.*
- ✅ *Mes projets (la compote qui dépote)*
- ✅ *Ils m'ont fait confiance — et voici pourquoi.*
- ❌ *Unlock 10× your dev velocity with AI-native pipelines!*
- ❌ *Discover our suite of solutions.*
- ❌ Emoji in body copy.

### Emoji
- **Not used in the brand voice.** The sparkler SVG fills that role — it is the brand's one piece of joy.

---

## VISUAL FOUNDATIONS

### Typography
- **Lato** for everything. Display, body, UI. Weights used: **400 Regular** (body), **700 Bold** (headlines, wordmark), **900 Black** (hero emphasis).
- Lato is self-hosted from `fonts/` via `@font-face` in `colors_and_type.css`. The full family (100/300/400/700/900 + italics) is included.
- No secondary display face. No serif. Lato carries the whole voice. A single face keeps the editorial calm that lets the sparkler *pop*.
- ⚠️ **Substitution note:** the original Figma exploration used *Figtree* (Google Fonts) — the user uploaded Lato as the chosen brand font, so Lato is now the source of truth.
- **Mono** for code only — `JetBrains Mono`.
- Type scale is a classic editorial ramp (128 / 96 / 64 / 48 / 40 / 32 / 24 / 18 / 16 / 14 / 12). See `colors_and_type.css`.
- Letter-spacing: **-0.02em** on display sizes (64px+). Zero on body.
- Line-height: **1.2** tight on display, **1.5** on body, **1.7** when in a dark-on-light quote block.

### Colors
Two distinct surface modes, not one. Pick intentionally.

| Mode | When to use | Background |
|---|---|---|
| **Paper** (light, default) | Services, projects grid, long-form content | `#FAFAF7` off-white |
| **Night** (dark) | Hero, launch moments, "big statements", footer | `linear-gradient(#040404 → #282A49)` |

**One signature accent:** `#5A4DEB` — the "violet" that shows up on the subtitle and on every interactive brand moment. Everything else (amber, sun, sky, teal, pink) is a *sparkler burst* — used in clusters of 3–5 on the sparkler illustration, almost never solo.

Semantic colors are defined in `colors_and_type.css` as CSS vars: `--fg-default`, `--fg-muted`, `--fg-accent`, `--bg-default`, `--bg-night`, etc. **Do not introduce new hex values in components — use the vars.**

### Backgrounds
- **Solid off-white paper** or **deep-midnight gradient**. Never a mid-gray, never a pastel wash.
- Imagery used **full-bleed as a hero background** only in the Night mode, and always with a subtle starfield or sparkler overlay.
- **No repeating patterns, no noise textures, no wave SVGs.** The brand's texture is typographic.

### Imagery
- **Warm colour temperature.** Golden hour > blue hour. The mood images in the Figma (sparklers in a hand, a wand reaching the moon, Luffy grinning — yes, really, this was in the moodboard) all share a warm cinematic palette.
- **Polaroid-style portrait cards** — borderless off-white frame, `--shadow-photo`, slight tilt (rotate between -4° and +4°) allowed for one hero image per page, not more.
- **Stars / cosmic specks** in Night mode backgrounds — very subtle, max 5% opacity, never animated unless a specific moment calls for it.

### Illustration — the sparkler
This is the brand's signature motif.
- Two vector sparklers sit at the corner of the hero. Stems are dark indigo (`#2B2E94`). Bursts use 4–6 of the accent hues in short strokes and dashed strokes, radiating from a yellow-violet core.
- Files: `assets/sparkler.svg` (full) · `assets/spark-small.svg` (compact, use inline as a bullet or dingbat) · `assets/logo-marill.svg` / `-light.svg` (wordmark).
- **Never redraw the sparkler from scratch each time.** Use the SVG.

### Spacing & layout
- **4px base grid.** All spacing uses vars `--space-1 … --space-10`.
- **Generous outer margins** — hero has 152px left padding on 1728px wide, so roughly **9% of viewport** on desktop. On mobile, 24px.
- Cards and sections are aligned to a **12-column grid** on desktop, not a max-width container. The brand *uses* the width of the screen; it doesn't run scared into a 1200px gutter.

### Corner radii
- Cards: **4px** (Figma's actual value — crisp, editorial, *not* the 16–24px blob of the modern SaaS era).
- Pills / tag chips: **full-round** (`--radius-pill`).
- Inputs & buttons: **8px**.
- Big decorative surfaces (portrait card): **4px + 8px white frame** — Polaroid style.

### Cards
Two recipes. Pick one per section; do not mix on the same screen.

1. **Paper card** — `#FFFFFF` surface, `border-radius: 4px`, `--shadow-md`, no visible border. Used for portraits, featured projects.
2. **Night card** — `rgba(255,255,255,.04)` tint, `1px rgba(255,255,255,.1)` border, `--radius-md`, no shadow. Used inside Night mode for metadata panels.

### Shadows
Only two live in the system:
- `--shadow-md` — soft multi-layer (lift 2px, blur 6px + 1px outline). Use on anything elevated on paper.
- `--shadow-halo` — 6px violet glow, `rgba(90,77,235,.18)`. Used **only** on the focused/hovered brand CTA. Never as decoration.

### Borders
- Never a left-border-only colour accent (avoid that particular AI-slop trope).
- Dividers are `1px solid var(--border-subtle)` in Paper, `1px solid rgba(255,255,255,.08)` in Night.
- Strong borders (`--border-strong`, pure ink) for one-off tic-tac-toe / framed-photo effects, as seen in Home3.

### Animation & motion
- **Fades and small translates.** Distance ≤ 12px, duration 220ms, `cubic-bezier(.2,.0,.2,1)` (`--ease-standard`).
- **Sparklers may twinkle** — a 2s `opacity` loop between 0.85 and 1.0, staggered 400ms between bursts. No rotation.
- **No bounces on UI chrome.** A slight `--ease-out-bounce` overshoot is allowed *only* on the brand CTA press-release.
- Respect `prefers-reduced-motion`.

### Hover states
- **Text links:** the colour does **not** change. The underline thickens from 1px to 2px and the offset grows from 3px to 5px. Quiet.
- **Buttons (primary violet):** the surface moves from `--mrl-violet` to a ~4% darker mix, and a `--shadow-halo` fades in over 120ms.
- **Cards:** lift 2px on y-axis + shadow grows from `--shadow-md` to `--shadow-lg`. No rotation, no scale.

### Press / active states
- **Buttons shrink 2%** (`scale(.98)`) on `:active`, duration 80ms. Returns with the brand's one allowed bounce.
- Links get a brief `opacity: .7` flash on `:active`, 80ms.

### Transparency & blur
- Blur is used **sparingly**, only for Night mode glass panels (`backdrop-filter: blur(12px)`), e.g. a floating nav that sits over the gradient. Never on Paper.
- Tinted translucency (`rgba(…, 0.04–0.12)`) is the default for Night-mode surfaces; they inherit the gradient underneath rather than painting their own colour.

### Layout rules — things that don't move
- **Fixed top nav** in Night mode hero — transparent over the gradient, with the wordmark left, text links right. Turns glass (`blur(12px)` + `rgba(0,0,0,.4)`) after the user scrolls past 80px.
- **Footer** is full-bleed paper, left-aligned.
- **Hero block is always anchored to the left third of the screen.** The right two-thirds are reserved for the portrait card or sparkler illustration.

### Do / don't
- ✅ Giant French headlines in Lato 700/900, two lines max.
- ✅ One violet moment per screen, not five.
- ✅ Sparkler SVG used decoratively, once.
- ❌ Gradient text, neon glows, glassmorphism on Paper mode.
- ❌ Emoji as iconography.
- ❌ Rounded-corner cards with a coloured left border.
- ❌ Bluish-purple hero gradients that dominate the page — keep the gradient to black-to-midnight; violet is for accents only.

---

## ICONOGRAPHY

No icon font, no home-grown SVG kit, no emoji in UI. The brand treats iconography as *a thing to restrain*, not *a thing to decorate with*.

### Approach
1. **The sparkler is the one illustrated mark.** It replaces any decorative flourish the brand might otherwise want to reach for. Use `assets/sparkler.svg` or `assets/spark-small.svg`.
2. **Line icons from [Lucide](https://lucide.dev)** for functional UI (arrows, external-link, download, mail, github) — 1.5px stroke, 24×24, currentColor. Lucide is loaded from CDN; no assets are bundled here to keep the repo clean.
   - *Substitution flag:* Lucide was picked because the Figma contains no icon system. Swap for Phosphor or Feather if preferred — any single-weight line set will match the brand's calm.
3. **No emoji.** The Figma uses none; body copy never does either.
4. **No Unicode shape dingbats** (★, ◆, ●) as ornament. If a break is needed, use the small sparkler SVG or a typographic em-dash.

### In this repo
- `assets/sparkler.svg` · `assets/spark-small.svg` — the motif.
- `assets/logo-marill.svg` · `assets/logo-marill-light.svg` — wordmark (dark / light).
- `assets/logo-marill-raw.png` — original bitmap wordmark from the Figma, for reference.
- `assets/hero-portrait.png` — **missing** (the 26MB Polaroid portrait exceeded the Figma export limit — use the placeholder for now and ask the designer to re-export at 2× instead of 6×).
- `assets/image-4.png` — "wand reaching the moon" illustration (Night mode hero alternate).
- `assets/image-6.png` — the sparkler reference illustration (use for mood / about pages).
- `assets/image-b.jpg` · `assets/image-e.jpg` — warm sparkler photography for atmospheric backgrounds.

---

## Substitutions & flags (things to review)

1. **No positioning PDF.** `uploads/létrucdebase.pdf` was referenced but not found on disk. Positioning statements in this README were lifted directly from the Figma hero copy. If the PDF contains more (target audience, services breakdown, pricing positioning), please re-upload and we'll refine tone guidance.
2. **`assets/hero-portrait.png` failed to copy** from Figma (file was 26MB and exceeded the export ceiling). Please re-export at a reasonable resolution.
3. **Icon set is a substitution.** Lucide chosen because no icons existed in the Figma. Confirm or swap.
4. **Lato is the brand font** (uploaded by the user, self-hosted from `fonts/`). The Figma originally used Figtree; Lato supersedes it everywhere in this system.

---

## How to use this system

- **Slides, mocks, throwaway prototypes:** `@import "./colors_and_type.css"`, pull components from `ui_kits/portfolio/`, copy assets out, make HTML artifacts.
- **Production code:** the CSS vars map cleanly onto any framework (Tailwind `@theme inline`, plain CSS, styled-components). Keep the semantic names (`--fg-default`, `--bg-night`) rather than raw hex.
- **Agent-driven design:** see `SKILL.md` — drop this repo into a Claude Code project and invoke `marill-design`.
