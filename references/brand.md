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

- **Display:** Anton (Google Fonts, OFL) — name, headings, stat numbers. MIXED case (not all-caps),
  tracking `0.02em`, single weight 400 (renders ultra-bold; never faux-bold).
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

## Imagery direction (for OpenAI-generated images)

Functional and abstract, **risograph print feel**. Signature treatment: a **halftone dot gradient**
ramping Digital Orange `#FC5000` → Cyber Violet `#524AE9`, dots whose radius scales across the
gradient, clipped to a rounded panel. Flat and printed, never glossy; depth from color shifts, not
shadows. **Forbidden:** AI-generated portraits of Chan; generic stock "tech/business" scenes; glossy
3D renders. Keep it abstract/conceptual, not literal people.
