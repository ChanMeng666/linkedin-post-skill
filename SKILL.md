---
name: linkedin-post
description: Use when Chan Meng wants to write an English LinkedIn post for personal-brand marketing — an "idea" post (her own framework/opinion), a "take" post (a short reaction to a tech article or news she read), or a post-event "recap" (reflecting on an offline tech meetup, crediting speakers/organizers/companies to grow her network). Researches and verifies the people to credit, writes on-brand copy with emoji + hashtags, adds a Caldera-branded visual only when one genuinely earns its place (recaps use Chan's own event photos; many posts ship text-only), and hands back ONE markdown file — copy, who to @mention, and photo notes. Chan posts it herself; the skill never opens LinkedIn.
---

# LinkedIn post writer (Chan Meng / Caldera brand)

Write English LinkedIn posts that build Chan Meng's personal brand and expand her network, and hand
them back as **one markdown file** she can copy straight into LinkedIn.

## Hard boundary: you never drive a browser

**This skill has no browser step.** Do not call `claude-in-chrome`, Playwright-as-automation,
chrome-devtools, or any other page-driving tool. Do not open LinkedIn. Do not open a composer, type
into one, resolve @mention chips, attach files, or click Post — not even "just to stage a draft for
review."

This is a deliberate removal, not an oversight. LinkedIn's editor cannot be driven reliably: it
swallows the space after a resolved mention chip, lands backspaces at the wrong caret position and
corrupts text that was already correct, and exposes no usable file input for photos. Every attempt
costs more time than it saves and risks mangling copy Chan has already approved.

**Chan does the LinkedIn half entirely by hand** — she pastes the copy, converts each name into a
tag from the live dropdown, attaches her own photos, and publishes. Your entire deliverable is a
markdown file that makes those thirty seconds frictionless.

Still allowed, because they aren't browser automation:
- **WebSearch / WebFetch** for research and verification — this is how you get names, titles and
  facts right, and it matters more now that Chan tags from your table rather than from a URL.
- **The render scripts** (`render-card.mjs`, `render-html.mjs`), which screenshot local HTML with
  headless Chromium. That's image generation, not page automation — no live site is involved.

## When to use
- "Write a LinkedIn post about <idea>" / "here's my framework for X" → **idea mode**.
- "I read <article/news>, here's my take" / a pasted URL + a reaction → **take mode**.
- "I went to <event>, write a recap" / "post-event reflection" → **recap mode**.

## Reference docs (read the ones you need)
- `references/brand.md` — colors, fonts, logo, voice do/don'ts, imagery direction.
- `references/voice-and-structure.md` — post anatomy per mode + mechanics (read every run).
- `references/hashtag-bank.md` — curated hashtag sets + rules.
- `references/recap-playbook.md` — recap research, verification, photos, @mention mechanics.
- `references/visuals.md` — render recipes. **Read only if Step 3's gate says a visual is warranted.**
- `examples/post.txt` + `examples/diagram.mmd` — a real reference idea post + its diagram.

## Workflow

### Step 0 — Pick mode & gather inputs
- Mode from the `/linkedin-post <idea|take|recap>` arg, else infer, else ask once.
- **Idea:** the thought/angle, target audience, any proof points (repos, numbers, links).
- **Take:** the article/news URL, what the source actually claims (1–2 sentences), Chan's own take,
  and whether she's agreeing, extending, or pushing back. Fetch the URL and read it — don't react to
  a headline. Note the author/publication so she can credit them.
- **Recap:** event name/date/city/link, the people and orgs to credit, Chan's 1–2 genuine takeaways,
  **and — ask this up front — does she have event photos? (paths, or "no")**. That answer decides
  Step 3 entirely, so get it before drafting.
- Don't block on completeness — gather what she has.

### Step 1 — (Recap only) Research & verify who to credit
Follow `references/recap-playbook.md`:
- **WebSearch + WebFetch** the event page and each person Chan named: confirm exact name spelling,
  current title, and employer. Fetch the official event/film/company page for the hard facts.
- Never invent a profile or a handle. Chan resolves every tag herself, by hand, in her own LinkedIn
  composer — so what she needs from you is **the right name plus a way to recognise the right person
  in the dropdown** (a distinguishing headline), not a URL you guessed.
- Keep the findings for the mention table in Step 4.

### Step 2 — Draft the copy
- Use the anatomy **for the mode** in `references/voice-and-structure.md` plus the voice rules in
  `references/brand.md`. Each mode has its own shape and length band — don't force one into another:

  | Mode | Shape | Length | Hashtags |
  |------|-------|--------|----------|
  | idea | 8-beat framework: hook → numbered points → mental shift → CTA | 1,000–1,800 chars | 8–12 |
  | take | 4–6 beats: what I read → what landed → my take → so what → CTA | 600–1,200 chars | 5–8 |
  | recap | 6 beats: opening → what stood out (@mentions) → takeaway → thanks → CTA | 1,000–1,600 chars | 6–10 |

- Tags from `references/hashtag-bank.md`. Architecture-grade vocabulary, evidence-first, no marketing
  fluff. English only.
- Plain text (LinkedIn renders no markdown); blank line between beats; emoji as bullets.
- Show Chan the draft and iterate **before** spending effort on a visual.

### Step 3 — Decide IF a visual helps, then which

**Text-only is a valid, common, and often better outcome.** Plenty of strong LinkedIn posts carry no
image at all, and a diagram that merely restates the copy reads as AI filler — it costs Chan
credibility rather than adding reach. "No visual" is a decision to state, not a step you failed.

If Chan explicitly asks for a diagram or an image, make it — the gate governs the *default*, not her
requests. Otherwise work through these in order and stop at the first one that answers:

**1. Does Chan have her own photos?** (recap, or any post about something she was physically at)
→ **Her photos ARE the visual. Generate nothing.** Real faces and a real room beat any render for
authenticity, which is the whole point of a recap. Follow `recap-playbook.md` → "Photos (the real
visual)": order them, work one visible detail into the copy, and record the order in `post.md`.

**2. Mode default:**
- **take** → **no visual.** The article link's own preview card is the visual (see Step 4). Adding a
  branded graphic on top competes with it and buries the link. (Exception: if Chan wants to show a
  specific figure *from the source* — a chart, a benchmark table — use that image, credited. Don't
  redraw it as a Mermaid diagram.)
- **recap without photos** → *offer* one branded card (a quote or field-note). **Never a diagram** —
  never draw a box-and-arrow chart of an evening with humans in it.
- **idea** → continue to the gate.

**3. The gate — a diagram ships only if ALL THREE are yes:**
1. Is there structure a reader can't absorb from the text in one pass — **≥3 parts *and* named
   relationships between them** (a flow, a before/after, a layered stack, a decision branch)?
2. Would you actually sketch this on a whiteboard to explain it out loud?
3. Does the diagram carry information the copy doesn't — rather than restating the numbered list?

Any "no" → **no diagram.** If the post is structure-free but has one killer line, you may *offer*
Chan a quote card — offer it, don't assume it. If the gate is genuinely borderline, ask Chan **one**
question; don't hand her a menu of four options.

**4. Route → recipe** (commands live in `references/visuals.md`, read it only now):

| Verdict | Asset |
|---------|-------|
| Chan's photos | none generated — just the `## Photos` section of `post.md` |
| Gate passed | Mermaid diagram → `diagram.mmd` + `diagram.png` |
| One killer line, offered & accepted | branded card → `card.png` |
| Card too plain for accepted content | bespoke HTML → `visual.html` + `visual.png` |
| Needs a hero image, nothing else fits | OpenAI image → `image.png` (last resort) |
| Everything else | **nothing — ship text-only** |

If you generate something, **Read the rendered PNG** and show Chan the asset. If it looks like filler
on screen, say so and drop it. If you generate nothing, tell Chan in one line
why — that's the deliverable for this step.

### Step 4 — Write the handoff: `post.md`

The deliverable is **one file**: `output/<YYYY-MM-DD>-<slug>/post.md`. Chan opens it, copies the
copy, tags the people, attaches her photos, publishes. Everything she needs is in that file — she
should never have to come back and ask you a question to finish posting.

Required sections, in this order:

1. **Header** — mode, date drafted, event/source name, date + venue or article URL, which visual
   route Step 3 took (or "none — Chan's photos"), character count, hashtag count.
2. **`## The copy`** — the post inside a ```` ```text ```` fence so blank lines and emoji survive the
   copy-paste exactly. One line above it: "Copy everything inside the block, exactly as-is."
3. **`## Who to @mention`** (recap, or any post crediting people) — a table:
   `# | Name in the copy | Type this | Pick the entry that says | Confidence`.
   The **"Pick the entry that says"** column is the important one: LinkedIn's dropdown shows several
   people with the same name, so give Chan the headline that identifies the right one. Flag every
   near-miss you found ("the *first* Jane Doe is a different person — she's the one headlined X").
   Mark anything unverified as plain-text-only. Never supply a profile URL you aren't certain of.
4. **`## Photos`** — the suggested order, lead shot first, and the rule that nobody visible gets
   named or tagged unless they're in the mention table. Skip if there are no photos.
5. **`## Link`** (take mode) — the article URL, and whether to put it in the body (LinkedIn renders
   a preview card, which is the visual) or the first comment (no preview, better reach). Recommend
   one. Never both a link preview and an attached image.
6. **`## Verified facts behind the copy`** — the sourced facts any claim in the post rests on, so
   Chan can defend or correct them.
7. **`## Judgement calls made in the copy`** — anywhere you softened, sharpened, omitted, or chose
   between two true framings, with the alternative spelled out. This is where you're honest about
   what you decided on her behalf.

Also in the folder, **only if Step 3 called for one**: the visual (`diagram.mmd`+`diagram.png`,
`card.png`, `visual.html`+`visual.png`, or `image.png`). An empty visual slot is a correct result.

Then, in chat, give Chan the file path and one line on which visual route you took and why —
including "text-only, because …". That keeps the decision auditable and stops the next run from
defaulting to a diagram.

## Setup / dependencies
- **Only needed if a visual is being rendered** — text-only posts need nothing installed.
- `node_modules/` is gitignored, so it may be absent. If a render script fails with
  `ERR_MODULE_NOT_FOUND` (playwright / openai), run `npm install` then
  `npx playwright install chromium` from the repo root and retry.
- `render-mermaid.mjs` falls back to a global `mmdc` when the local one is missing, so a Mermaid
  render can succeed even with no `node_modules` — don't read that as "deps are installed".
- **OpenAI image** needs a key: copy `.env.example` → `.env` and set `OPENAI_API_KEY`. Without it,
  `gen-image.mjs` exits 2 — everything else works, and that path is a last resort anyway.
- `mmdc` reuses the existing `puppeteer-config.json`; the brand theme lives in
  `templates/mermaid-brand-config.json` + `templates/mermaid-brand.css`.

## Guardrails
- English only; on-brand voice; one orange accent per visual.
- **Never generate a visual to fill a slot.** An unearned diagram reads as AI filler and costs more
  credibility than a bare post ever would. No visual is a normal outcome — say so and move on.
- **Real photos outrank generated art.** If Chan has event photos, nothing gets rendered.
- Never diagram a recap; never stack a branded image on top of an article link preview.
- **Never open LinkedIn.** No browser automation, no composer, no posting — the deliverable is
  `post.md` and nothing else. Chan publishes.
- Never invent a person's identity/handle. You are telling Chan who to tag, so a wrong name sends
  her to tag the wrong human — worse than telling her you couldn't verify it (`recap-playbook.md`).
- Keep generated work in `output/` (gitignored); never write drafts to the repo root.
