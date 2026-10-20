# Brand reference — Chan Meng / "Caldera" v2.1.1

Snapshot of the design + voice tokens used to keep generated posts and visuals on-brand.
**Canonical sources** (re-read if these drift): `D:\github_repository\ChanMeng666\data\brand.yaml`,
`...\docs\brand\DESIGN.md`, `...\linkedin\linkedin-profile.json`. This file is a distilled cache so
the skill needn't load the whole repo each run.

## Identity

- **Name:** Chan Meng
- **Tagline:** Building at the intersection of AI, cultural technology, and women's health.
- **Philosophy / signature phrase:** *Subtraction for life, addition for thought.*
- **One-line voice:** Architecture-grade vocabulary, evidence-first claims, restraint in life and
  boldness in expression. Cross-cultural fluency without translation.
- **Positioning:** AI Agent Architect · Full-stack Engineer. Top skills: AI Agent Architecture,
  Model Context Protocol (MCP), Multi-agent Systems, Kubernetes, AI Integration.
- **Based:** Auckland, NZ.

### Audiences (write for these)
- Founders evaluating an AI agent architect / fractional CTO
- Recruiters & hiring managers in AI / full-stack / FemTech
- Engineers and learners following the open-source craft
- Chinese-speaking developer communities (中文社区)
- Te Ao Māori partners and cultural-technology collaborators

### Accounts
- **LinkedIn:** Chan's personal profile. The audiences above.
- **X:** free tier, so every post is written to the 280-character limit and anything longer
  becomes a thread. No long-form posts. Handle **not recorded yet** (fill in here). Audience there: AI engineers, open-source maintainers, people
  who use the tools she writes about. See `platforms.md`.

## Color — Caldera palette

| Token | Hex | Role |
|-------|-----|------|
| basalt canvas | `#E2E2DF` | page background — the muted base, **never pure white** |
| ash white | `#F7F6F2` | card / button surface |
| abyssal ink | `#070607` | text, headings, strong borders |
| **digital orange** | `#FC5000` | **THE accent** — block fills, accent rules, one per unit |
| cyber violet | `#524AE9` | decorative-only — large shapes, never text |
| pixel glare | `#F5F28E` | highlight overlays, graphic accents |
| pure white | `#FFFFFF` | text fills on ink/orange blocks **only** |

**Hard rules:**
- Orange is a BLOCK background or accent rule — **never small body or link text** (fails contrast).
- Violet is decorative-only — never text or UI.
- Flat: depth comes from solid color blocks, **never shadows or gradients**.
- At most **one orange accent per visual unit**.
- On an orange fill, small text is ink (`#070607`); white only for large/bold numbers.

## Typography

- **Display:** Anton (Google Fonts, OFL): titles and stat numbers. Heavy, condensed, MIXED case
  (not all-caps), tracking `0.02em`, single weight 400; never faux-bold.
  **The display face goes by surface.** Every rendered asset (LinkedIn and X banners, blog share
  images, README artwork, CV, and so the visuals this skill makes) is Anton, per `brand.yaml`
  v2.1.1, which recorded the move from Bebas Neue to Anton on 2026-06-07. Live web text (the
  chanmeng.org pages and the newsletter emails) is Bebas Neue. A post image sits in the same feed
  as those banners and share cards, so it matches them.
- **Body:** DM Sans (400/500/700) — DM Sans 500 is the workhorse.
- **Mono:** JetBrains Mono — datestamps / paths / versions only.
- Body never below 16px web.
- Web font load: `https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap`

## Logo

- File (bundled locally): `templates/assets/chan-monkey-logo-black.svg` (276×263, white bg rect).
- Source of truth: `ChanMeng666/public/brands/chan-monkey-logo-black.svg`.
- **Never recolor** — black ink on basalt/ash is canonical. To place on the ink block, the card CSS
  uses `filter:invert(1); mix-blend-mode:screen` (flips art to white, drops the white bg into ink).
- Do not skew, rotate, add effects, or pair with a generated wordmark.

## Voice — verbal half of the brand

**How posts are written lives in `voice.md`.** This section is the brand layer underneath it:
which nouns Chan uses and which words she doesn't. Where the two seem to pull apart, `voice.md`
wins for posts: precise nouns, yes, but in sentences a person would say aloud, with each term
explained in passing the first time. "Architecture-grade" describes the accuracy of the
vocabulary, not the density of the sentence.

**Principles:**
1. **Architecture-grade vocabulary** — engineering nouns over marketing adjectives.
2. **Evidence-first** — every claim links to one proof point (PR, repo, live URL, paper).
3. **Subtraction for life, addition for thought** — remove decoration until what's left is the idea.
4. **Cross-cultural fluency without translation** — te reo Māori, 中文, English in their own forms,
   italicised once then treated as first-class vocabulary; no parenthetical glosses unless needed.
5. **Never apologise for restraint** — no "sorry it's plain", no "minimal-but-" hedges.

**Prefer:** orchestration · dispatch · hub-and-spoke · agentic · evidence-first · shipped ·
open-sourced · production · end-to-end.

**Avoid:** leverage · robust · world-class · best-in-class · cutting-edge · synergy · rockstar · ninja.

**Do:**
- "Replaces click-through workflows with agentic ones: natural-language intent drives downstream orchestration."
- "86.6% solo-built; AI mentor matching and membership-flow automation in production."

**Don't:**
- "Leveraged cutting-edge AI to deliver robust, world-class solutions."
- "I'm a passionate, results-driven full-stack rockstar."

## Imagery direction (drawn in code by `templates/dither.js`)

Checked on 2026-10-13 against the website repo (`2d-portfolio`: `tailwind.config.ts`,
`src/app/globals.css`, `src/app/layout.tsx`) and the brand data repo (`ChanMeng666`:
`data/brand.yaml`, `scripts/readme-art/kit.mjs`). Re-check those when this looks out of date.
**Where the two disagree, the website is the latest decision**, with one exception worked out
from the commit history: the display face, which goes by surface (see Typography).

**The motif is the pixel, not the dot.** The system is a "pixelated cyber-playground": flat colour
blocks and square pixels with hard edges.

- **Dither field.** A field of square pixels in ordered dither (8×8 Bayer), one flat colour,
  sparse at one edge and nearly solid at the other. Ash on an ink plate. This is the brand's
  texture, the one on the README hero and cover.
- **The orange pixel.** One small orange square, usually as the full stop after a line of display
  type. It is the plate's single accent.
- **Plate furniture.** A faint ruled grid under the artwork and a crop mark in each corner.
- **Ink plate or basalt card.** Covers sit on ink with ash type. Content visuals (comparisons,
  numbers, steps) sit on basalt with ash cards, like the blog's share images: eyebrow with an
  orange square, Anton title, orange dash, name.
- Product screenshots and logos appear as they are, inside ash cards. Real assets over stock.

**Retired, do not use:** round halftone dots, risograph dot gradients, any orange-to-violet colour
ramp, paper grain or noise. These belonged to an earlier version of the system.

**The monkey illustration (the one generated route).** Since 2.3.0 the brand monkey may appear
in hand-drawn scenes generated by an image model, through the `chan-monkey-illustrations` skill:
the logo is passed as a reference image so the head is the real mark, the ground is basalt, the
line is ink, and the accents follow the palette rules above (one orange, violet never text). It
is the default visual for posts without a shape (`visuals.md` §8).

**Forbidden:** any other AI-generated imagery, including portraits of Chan or anyone else;
generated charts, diagrams or screenshots; generic stock "tech/business" scenes; glossy 3D
renders; shadows and gradients.
