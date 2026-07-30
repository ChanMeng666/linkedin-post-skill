# linkedin-post — a Claude Code skill for on-brand LinkedIn posts

A [Claude Code](https://claude.com/claude-code) **skill** that writes English LinkedIn posts for
personal-brand marketing, adds an on-brand visual *only when one earns its place*, and hands you
**one markdown file**: the copy, who to @mention (and how to pick the right person out of LinkedIn's
dropdown), and photo notes. It **never touches LinkedIn** — no browser automation, no composer. You
copy, tag, attach, publish.

Three modes:

- **idea** — share your own framework or opinion to build authority with your network.
- **take** — a short, plain-spoken reaction to a tech article or news item: what it claimed, what
  landed, and your actual read on it.
- **recap** — reflect on an offline tech event, crediting and tagging speakers, organizers, and
  companies to grow your network. It researches and verifies names/titles/handles before tagging,
  and uses **your own event photos** as the visual.

## How it works

```
/linkedin-post idea      # or: take / recap   (or just describe what you want)
```

`SKILL.md` orchestrates the flow:

1. **Gather inputs** — the idea/angle, the article URL, or the event details, people to credit, and
   whether you have photos.
2. **Research & verify** (recap) — confirm exact names, titles and employers, plus a distinguishing
   headline so you can tell two same-named people apart in LinkedIn's dropdown.
3. **Draft the copy** — a shape and length band per mode, in a consistent voice
   (architecture-grade, evidence-first, no marketing fluff).
4. **Decide whether a visual helps at all** — your photos win outright; a diagram must pass an
   explicit structure test; otherwise the post ships text-only.
5. **Write `post.md`** — copy in a fenced block, the mention table, photo order, the facts each
   claim rests on, and every judgement call made on your behalf.

## Visuals — gated, not automatic

The most common correct answer is **no generated visual**. A diagram that restates the copy reads as
AI filler, and on an event recap a synthetic card actively undercuts the real photos. So Step 3 works
top-down: *your photos* → *mode default* → *a three-question gate* → text-only.

| Route | Script | When |
|-------|--------|------|
| **Your photos** | — (nothing rendered) | any post about something you attended — always wins |
| **Mermaid** (`mmdc`) | `scripts/render-mermaid.mjs` | only structure that passes the gate: ≥3 parts with real relationships (flow, before/after, stack, branch) |
| **HTML → PNG** (Playwright, 2× DPI) | `scripts/render-card.mjs` (quick card) · `scripts/render-html.mjs` (bespoke layouts) | one strong quotable line; bespoke when the card is too plain |
| **OpenAI image** (`gpt-image-1`) | `scripts/gen-image.mjs` | abstract hero image, last resort only |
| **Nothing** | — | everything else, including every `take` post |

Anything that does get generated follows a single design system ("Caldera": a basalt canvas, one
Digital-Orange accent, Anton + DM Sans type, flat color blocks). Author a bespoke visual by writing
an HTML file that links `templates/brand.css` (brand tokens + helpers), then screenshot it with
`render-html.mjs`. Recipes live in `references/visuals.md`; the decision logic stays in `SKILL.md`.

## Repository layout

```
SKILL.md            The orchestrator (invoked as /linkedin-post) — owns the visual gate
references/         Brand tokens, post voice/structure, hashtag bank, recap playbook, visual recipes
templates/          Mermaid brand theme · brand.css · post-card.html · logo asset
scripts/            render-mermaid · render-card · render-html · gen-image · lib/load-env
examples/           A real reference post + its diagram
output/             Generated drafts — one post.md per run, plus any visual (gitignored)
```

## Setup

```bash
npm install
npx playwright install chromium

# Optional — only needed for the OpenAI image fallback:
cp .env.example .env          # then set OPENAI_API_KEY (the loader also reads .env.local)
```

The OpenAI key is genuinely optional — that route is a last resort, and without a key
`gen-image.mjs` exits 2 while everything else works. To make the skill invocable as
`/linkedin-post`, expose this folder to Claude Code's skills directory (e.g. a junction/symlink at
`~/.claude/skills/linkedin-post`).

## Security

API keys are read from the environment or a local, git-ignored `.env` / `.env.local` file — they are
**never** committed. `.gitignore` excludes `.env`, `.env.local`, `node_modules/`, and `output/`. Use
`.env.example` as the template.

## Notes

This is a personal-brand tool tuned to one author's identity and voice; the brand system, hashtag
bank, and reference copy under `references/` are meant to be edited to fit your own. Built as a
demonstration of composing Claude Code skills with web research, Mermaid, Playwright, and image
generation.

Earlier versions drove the LinkedIn composer via browser automation. That was removed: LinkedIn's
editor mangles programmatic input around @mention chips (swallowed spaces, backspaces landing in the
wrong place), and the composer gives no usable file input for photos anyway. Producing a clean
markdown handoff is both more reliable and faster for the human doing the final 30 seconds of work.
