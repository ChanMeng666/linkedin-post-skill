---
name: linkedin-post
description: Use when Chan Meng wants to write an English LinkedIn post for personal-brand marketing — either an "idea" post (sharing a framework/opinion) or a post-event "recap" (reflecting on an offline tech meetup, mentioning speakers/organizers/companies to grow her network). Drafts on-brand copy with emoji + hashtags, generates a Caldera-branded visual (Mermaid diagram, OpenAI image, or HTML card), and drafts it into the LinkedIn composer via claude-in-chrome for review — never auto-posts.
---

# LinkedIn post writer (Chan Meng / Caldera brand)

Write English LinkedIn posts that build Chan Meng's personal brand and expand her network, then
draft them straight into the LinkedIn composer for one-click review. **You never click Post** — Chan
reviews and publishes.

## When to use
- "Write a LinkedIn post about <idea>" → **idea mode**.
- "I went to <event>, write a recap" / "post-event reflection" → **recap mode**.

## Reference docs (read the ones you need)
- `references/brand.md` — colors, fonts, logo, voice do/don'ts, imagery direction.
- `references/voice-and-structure.md` — post anatomy + mechanics (read every run).
- `references/hashtag-bank.md` — curated hashtag sets + rules.
- `references/recap-playbook.md` — recap research, verification, @mention mechanics.
- `examples/post.txt` + `examples/diagram.mmd` — a real reference idea post + its diagram.

## Workflow

### Step 0 — Pick mode & gather inputs
- Mode from the `/linkedin-post <idea|recap>` arg, else infer, else ask once.
- **Idea:** the thought/angle, target audience, any proof points (repos, numbers, links).
- **Recap:** event name/date/city/link, the people and orgs to credit, and Chan's 1–2 genuine
  takeaways. Don't block on completeness — gather what she has.

### Step 1 — (Recap only) Research & verify mentions
Follow `references/recap-playbook.md`:
- WebSearch + claude-in-chrome to confirm exact name spelling, current title, employer, and the
  LinkedIn profile/company URL for each person/org Chan named.
- Write `output/<YYYY-MM-DD>-<slug>/MENTIONS.md` (the role/name/title/URL/tag-yes table).
- Never invent a profile. Unverified names → plain text only, flagged in MENTIONS.md.

### Step 2 — Draft the copy
- Follow the anatomy in `references/voice-and-structure.md` and the voice rules in
  `references/brand.md`: strong hook, emoji-led structure, mental-shift/takeaway, CTA question,
  then 8–12 hashtags (idea) or 6–10 (recap) from `references/hashtag-bank.md`.
- Architecture-grade vocabulary, evidence-first, no marketing fluff. English only.
- Plain text (LinkedIn renders no markdown); blank line between beats; emoji as bullets.
- Show Chan the draft and iterate **before** generating the visual or opening the browser.

### Step 3 — Choose & generate ONE visual
Write assets into the same output folder. **Visual priority (Chan's stated preference):**
**(1) Mermaid diagram → (2) HTML-rendered image (card or bespoke) → (3) OpenAI image only as a
last resort.** Default idea posts to a Mermaid diagram; reach for HTML to craft *more beautiful*
bespoke visuals. Ask Chan only if genuinely unsure.

**a) Brand Mermaid diagram — PREFERRED** (frameworks, before/after, concept maps — great for idea posts):
1. Write the diagram to `output/<date>-<slug>/diagram.mmd`. Do NOT add a `--- config ---`
   frontmatter block (the brand config is applied via the CLI). Use the brand classDefs for accents:
   ```
   classDef accent  fill:#FC5000,stroke:#070607,color:#fff;   %% the ONE orange block
   classDef ink     fill:#070607,stroke:#070607,color:#fff;
   classDef glare   fill:#F5F28E,stroke:#070607,color:#070607;
   classDef surface fill:#F7F6F2,stroke:#070607,color:#070607; %% default-ish
   ```
   Keep one orange accent per diagram (brand rule). Un-classed nodes already render on-brand.
2. Render: `node scripts/render-mermaid.mjs output/<date>-<slug>/diagram.mmd`
   → produces `diagram.png` on a basalt background at 2× scale.

**b) HTML-rendered image — PREFERRED for richer visuals.** Two ways:

  *b1) Quick branded card* (quotes, theses, recap "field-note" cards):
  ```
  node scripts/render-card.mjs output/<date>-<slug>/card.png \
    --eyebrow "EVENT RECAP" \
    --headline "<short punchy line — the thesis or a quote>" \
    --sub "<one-line context / attribution>" \
    --size square            # or: landscape
  ```
  Headline auto-fits; keep it short (a quote or thesis), not a paragraph.

  *b2) Bespoke HTML* — author a custom on-brand layout when the card is too plain. Write an HTML
  file that links the brand CSS and wraps content in a `.stage` element, then screenshot it:
  ```
  <!-- output/<date>-<slug>/visual.html -->
  <link rel="stylesheet" href="../../templates/brand.css">   <!-- ../ depth: output/<slug>/ → repo root -->
  <div class="stage square"> …your Caldera layout using --orange/--ink, .display, .rule, blocks… </div>
  ```
  ```
  node scripts/render-html.mjs output/<date>-<slug>/visual.html output/<date>-<slug>/visual.png --selector ".stage"
  ```
  `templates/brand.css` gives tokens + helpers (`.stage`, `.eyebrow`, `.display`, `.rule`,
  `.block`/`.px`, `.card`, logo at `templates/assets/chan-monkey-logo-black.svg`). Honor the brand:
  basalt ground, one orange accent per unit, Anton display + DM Sans body, flat (no shadows/gradients).
  Use `templates/post-card.html` as a worked reference.

**c) OpenAI image — FALLBACK ONLY** (use when neither a diagram nor an HTML layout fits):
```
node scripts/gen-image.mjs "<prompt>" output/<date>-<slug>/image.png --size landscape
```
Prompt from `references/brand.md` → Imagery direction (risograph halftone, orange→violet, flat,
abstract — NO portraits of Chan, no stock scenes). Exit code 2 = no key; tell Chan how to set it
(`.env.local`) and fall back to a Mermaid/HTML visual.

**d) Plain text** — some posts need no visual. Skip this step.

Show Chan the rendered asset (Read the PNG) and confirm before drafting into LinkedIn.

### Step 4 — Draft into the LinkedIn composer (claude-in-chrome)
Load the browser tools, then:
1. `tabs_context_mcp` to see current tabs; create a new tab and `navigate` to
   `https://www.linkedin.com/feed/`. If not logged in, ask Chan to log in, then continue.
2. Open the post composer ("Start a post").
3. Type the copy from `post.txt` into the editor.
4. **Resolve @mentions (recap):** for each verified person/company in MENTIONS.md, type `@` + name,
   **wait for the dropdown, and click the matching entry** so the tag turns into a real linked chip.
   Verify each chip is linked. Only tag verified entries.
5. Attach the visual: try `find`/`read_page` for an `<input type="file">` ref and use `file_upload`.
   **Known limitation (LinkedIn web):** the composer injects no usable file input into the
   accessibility tree, and clicking the photo icon opens a **native OS file picker** you must NOT
   drive (it can block the session). So by default, **hand the image attach to Chan**: tell her the
   exact PNG path and ask her to click the photo icon and select it. Don't risk the native dialog.
6. **STOP.** Do not click Post. Tell Chan the draft + the visual path, and ask her to attach the
   image (if not done) and publish.

> Browser note: this environment auto-resizes the window between actions, which can close the
> composer. Type the full post (body + hashtags) in ONE `type` call, screenshot once to confirm,
> and avoid extra round-trips while the modal is open.

> Optional: record the composer steps with `gif_creator` if Chan wants a replay.
> Caution: avoid clicking anything that triggers a browser dialog (see global browser guidance).

### Step 5 — Final output
Leave the folder `output/<YYYY-MM-DD>-<slug>/` containing:
- `post.txt` — the final copy (copy-paste-ready fallback).
- the visual (`diagram.mmd`+`diagram.png`, `card.png`, or `image.png`).
- `MENTIONS.md` — recap only.

## Setup / dependencies (already installed in this repo)
- `npm install` done (playwright + openai + mermaid-cli local); `npx playwright install chromium` done.
- **OpenAI image** needs a key: copy `.env.example` → `.env` and set `OPENAI_API_KEY`. Without it,
  image mode falls back to Mermaid/card — everything else works.
- `mmdc` reuses the existing `puppeteer-config.json`; the brand theme lives in
  `templates/mermaid-brand-config.json` + `templates/mermaid-brand.css`.

## Guardrails
- English only; on-brand voice; one orange accent per visual.
- Never auto-publish; always stop at the staged draft for Chan's review.
- Never invent a person's identity/handle; verify before tagging (`recap-playbook.md`).
- Keep generated work in `output/` (gitignored); never write drafts to the repo root.
