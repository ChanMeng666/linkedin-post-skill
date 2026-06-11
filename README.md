# linkedin-post — a Claude Code skill for on-brand LinkedIn posts

A [Claude Code](https://claude.com/claude-code) **skill** that writes English LinkedIn posts for
personal-brand marketing, generates an on-brand visual, and drafts the post straight into the
LinkedIn composer for review. It **never auto-posts** — it stages the draft and stops so you review
and publish.

Two modes:

- **idea** — share a framework or opinion to build authority with your network.
- **recap** — reflect on an offline tech event, crediting and tagging speakers, organizers, and
  companies to grow your network. It researches and verifies names/titles/handles before tagging.

## How it works

```
/linkedin-post idea      # or: /linkedin-post recap   (or just describe what you want)
```

`SKILL.md` orchestrates the flow:

1. **Gather inputs** — the idea/angle, or the event details and people to credit.
2. **Research & verify** (recap) — confirm exact names, titles, employers, and LinkedIn URLs.
3. **Draft the copy** — strong hook → emoji-led framework → mental shift → CTA → hashtags, in a
   consistent voice (architecture-grade, evidence-first, no marketing fluff).
4. **Generate one visual** (priority order): **Mermaid diagram → HTML-rendered image → OpenAI image
   (fallback)**.
5. **Draft into the composer** via Claude-in-Chrome, then stop for your review.

## Visuals

All visuals follow a single design system ("Caldera": a basalt canvas, one Digital-Orange accent,
Anton + DM Sans type, flat color blocks). Three ways to make one:

| Tool | Script | Best for |
|------|--------|----------|
| **Mermaid** (`mmdc`) | `scripts/render-mermaid.mjs` | frameworks, before/after, concept maps |
| **HTML → PNG** (Playwright, 2× DPI) | `scripts/render-card.mjs` (quick card) · `scripts/render-html.mjs` (bespoke layouts) | polished quote/recap cards and custom designed visuals |
| **OpenAI image** (`gpt-image-1`) | `scripts/gen-image.mjs` | abstract hero images, used only as a fallback |

Author a bespoke visual by writing an HTML file that links `templates/brand.css` (brand tokens +
helpers), then screenshot it with `render-html.mjs`.

## Repository layout

```
SKILL.md            The orchestrator (invoked as /linkedin-post)
references/         Brand tokens, post voice/structure, hashtag bank, recap playbook
templates/          Mermaid brand theme · brand.css · post-card.html · logo asset
scripts/            render-mermaid · render-card · render-html · gen-image · lib/load-env
examples/           A real reference post + its diagram
output/             Generated drafts (gitignored)
```

## Setup

```bash
npm install
npx playwright install chromium

# Optional — only needed for the OpenAI image fallback:
cp .env.example .env          # then set OPENAI_API_KEY (the loader also reads .env.local)
```

Without an OpenAI key, the image step falls back to a Mermaid diagram or HTML visual — everything
else works. To make the skill invocable as `/linkedin-post`, expose this folder to Claude Code's
skills directory (e.g. a junction/symlink at `~/.claude/skills/linkedin-post`).

## Security

API keys are read from the environment or a local, git-ignored `.env` / `.env.local` file — they are
**never** committed. `.gitignore` excludes `.env`, `.env.local`, `node_modules/`, and `output/`. Use
`.env.example` as the template.

## Notes

This is a personal-brand tool tuned to one author's identity and voice; the brand system, hashtag
bank, and reference copy under `references/` are meant to be edited to fit your own. Built as a
demonstration of composing Claude Code skills with browser automation, Mermaid, Playwright, and
image generation.
