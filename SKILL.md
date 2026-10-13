---
name: linkedin-post
description: Use when Chan Meng wants to turn a thought into a post for LinkedIn, X (Twitter), or both — "write a LinkedIn post about…", "tweet this", "make this an X thread", "post about what I just read", "recap the meetup I went to". Four modes — story (something that happened and what it changed), idea (a claim she can back), take (a reaction to an article or release), recap (an event, crediting people). Writes in a voice system built from two writers she admires, writes each platform's post separately for its own audience, adds a Mermaid diagram or an HTML-rendered image when the content has a shape worth seeing, and hands back ONE markdown file. Chan posts it herself; the skill never opens LinkedIn or X.
---

# Post writer for LinkedIn and X (Chan Meng / Caldera brand)

Take one of Chan's ideas and turn it into a post that is credible to specialists, plain enough for
anyone who follows her, and worth reading to the end. Write it for LinkedIn, for X, or for both,
and hand it back as **one markdown file** she can copy from.

## Hard boundary: you never drive a browser

**This skill has no browser step.** Do not call `claude-in-chrome`, Playwright-as-automation,
chrome-devtools, or any other page-driving tool. Do not open LinkedIn or X. Do not open a composer,
type into one, resolve mention chips, attach files, or click Post, not even "to stage a draft".

This is deliberate. LinkedIn's editor cannot be driven reliably (it swallows the space after a
mention chip, lands backspaces in the wrong place, and exposes no usable file input), and a post
published under Chan's name is hers to send. She pastes, tags, attaches and publishes. Your whole
deliverable is a file that makes that take a minute.

Still allowed, because they aren't browser automation:
- **WebSearch / WebFetch** for research and verification.
- **The render scripts**, which screenshot local HTML with headless Chromium. No live site is
  involved.

## Reference docs

| File | Read |
|------|------|
| `references/voice.md` | **every run.** The writing system: two registers, openers, closers, the "Never" list, the plain-language pass |
| `references/platforms.md` | **every run.** LinkedIn against X: audience, mechanics, shapes per mode, how to translate |
| `references/brand.md` | every run. Who Chan is, who she writes for, vocabulary, visual tokens |
| `references/hashtag-bank.md` | when a LinkedIn post takes hashtags |
| `references/recap-playbook.md` | recap mode: research, verification, photos, mentions |
| `references/visuals.md` | at Step 4: which visual route, and the render recipes |
| `examples/post.md` | a worked handoff file: one idea, both platforms, with a visual |

## Workflow

### Step 0 — Mode, platforms, and the real material

**Mode**, from the `/linkedin-post <mode>` argument, else inferred, else asked once:

| Mode | Use when |
|------|----------|
| **story** | something happened to her and it changed how she thinks |
| **idea** | she has a claim and something to back it: a build, a number, a method |
| **take** | she read or watched something and has a view on it |
| **recap** | she went to an event and wants to credit the people and say what stuck |

**Platforms**: `linkedin`, `x`, or `both`. If she named one, use it. If she didn't, write both and
say so. `platforms.md` lists the cases where a mode doesn't suit a platform; skip those and say why.

**The real material.** The voice depends on true specifics, so gather them before drafting. Ask
only for what is missing, in one message:

- **story**: what happened, when and where, what was said (her words or theirs), what she expected,
  what she thinks now.
- **idea**: the claim in a sentence, what she built or measured that supports it, any numbers with
  the numbers they replaced, links.
- **take**: the URL (fetch it and read it; never react to a headline), her view, and whether she
  agrees, extends or disagrees.
- **recap**: event name, date, venue, link; who to credit and for what; one or two things that
  stuck; **and whether she has photos** (paths, or "no").

Never invent an anecdote, a quote, a number or a detail of Chan's experience. If the draft needs
one she hasn't given, ask. If she doesn't have it, write without it. (`voice.md`, first section.)

Don't block on completeness. One round of questions, then draft with what there is and list the
gaps in the handoff.

### Step 1 — Research and verify

- **take**: read the source. Note the author and publication, and what it claims in a sentence or
  two. Check any figure you plan to repeat.
- **recap**: follow `recap-playbook.md`. Confirm each name's spelling, current title and employer.
  For X, find a handle only from the person's own site or profile, or the event's page.
- **idea / story**: verify any outside fact the post leans on (a release date, what a tool does).

Never invent a profile or a handle. A wrong tag points Chan at a stranger in public.

### Step 2 — Find the spine, pick the register

Before writing, state to yourself in one sentence what the post says. If it takes two sentences,
there are two posts; pick one and offer Chan the other for later.

Then choose the register from `voice.md`: **Story** when the material is a moment, **Operator**
when it is a claim with evidence. Recaps use a Story spine with Operator facts.

### Step 3 — Draft, one platform at a time

1. **Draft the first platform** using its shape from `platforms.md` and the register from
   `voice.md`. LinkedIn first when writing both, unless it's a take on fresh news, which goes to X
   first.
2. **Write the second platform from the idea, not from the first draft.** Different reader,
   different opening, different length. `platforms.md` → "What changes in translation".
3. **Run the plain-language pass** (`voice.md`, last section) on both.
4. **Write the drafts into `post.md`** (format in Step 5) and run
   `node scripts/count.mjs output/<date>-<slug>/post.md`. Fix everything it flags. Read the
   LinkedIn preview line it prints: if the first 210 characters are warm-up, rewrite the top.
5. **Show Chan the copy and iterate** before spending effort on a visual.

### Step 4 — Decide the visual

Read `references/visuals.md` now. In short:

- Her own photos or a real screenshot always win. Generate nothing.
- Otherwise match the content's shape: arrows that matter → **Mermaid**; a comparison, a number,
  a few numbers, a straight sequence → an **HTML layout** rendered to PNG; one quotable line → a
  **quote card**; no shape → **text only**.
- Render per platform: portrait for LinkedIn, landscape for X.
- Read every PNG you render. If it repeats the copy or looks crowded, fix it or drop it.

One generated visual per post at most. Say in one line which route you took and why, including
"text only, because…".

### Step 5 — Write the handoff: `post.md`

One file: `output/<YYYY-MM-DD>-<slug>/post.md`. Chan should be able to publish from it without
asking you anything. `examples/post.md` shows the format. Sections, in order, skipping any that
don't apply:

1. **Header.** Mode, register, platforms, date drafted, event or source, visual route, counts.
2. **`## LinkedIn`.** One line of instruction, then the copy in a fence opened with
   ```` ```text linkedin ````. Names as plain text, no `@`.
3. **`## X`.** How to post it (single, or post 1 then replies), then the copy in a fence opened
   with ```` ```text x ````. Thread posts are separated by a line containing only `---`. If a link
   belongs in a reply, give it on its own line under the block.
4. **`## Who to mention`.** A table: `# | Name in the copy | LinkedIn: type this, pick the entry
   that says… | X handle (and where it was verified) | Confidence`. The "pick the entry that says"
   column matters most on LinkedIn: give the headline that separates the right person from their
   namesakes, and flag near-misses. Unverified people stay plain text on both platforms.
5. **`## Photos`.** Suggested order, lead shot first, and which one goes on X.
6. **`## Visual`.** Each generated file, which platform it is for, and what it shows.
7. **`## Link`** (take mode). The URL, and where to put it on each platform: LinkedIn body
   (preview card) or first comment; X reply. Recommend one. Never a link preview and an attached
   image on the same LinkedIn post.
8. **`## Verified facts behind the copy`.** What each claim rests on, with sources.
9. **`## Judgement calls made in the copy`.** Where you softened, sharpened, cut, or chose between
   two true framings, with the alternative spelled out. Include anything Chan was asked for and
   didn't have, and how the copy works around it.

The fence labels matter: `count.mjs` finds the copy by them.

Then, in chat: the file path, the counts, the visual route in one line, and any open question.

## Setup / dependencies

- Text-only posts need nothing installed. `scripts/count.mjs` uses only Node.
- Rendering needs `npm install` and `npx playwright install chromium` from the repo root.
  `node_modules/` is gitignored, so a fresh clone won't have it; `ERR_MODULE_NOT_FOUND` means this.
- `render-mermaid.mjs` falls back to a global `mmdc` when the local one is missing, so a Mermaid
  render succeeding doesn't mean the HTML routes will.
- The OpenAI image route needs `OPENAI_API_KEY` in `.env` (copy `.env.example`). Without it
  `gen-image.mjs` exits 2. It's a last resort anyway.

## Guardrails

- **Only real material.** No invented anecdotes, quotes, numbers or people.
- **English, NZ spelling.** The voice in `voice.md`; nothing from its "Never" list.
- **Each platform gets its own post.** Never a trimmed copy of the other.
- **Never open LinkedIn or X.** The deliverable is `post.md`. Chan publishes.
- **Never invent an identity or a handle.** Unverified means plain text.
- **Don't reuse the reference writers' sentences, stories or names.** The system borrows their
  craft, not their content.
- **One generated visual per post, and only when it shows something the text can't.** Real photos
  and screenshots outrank anything rendered. Never diagram an event or stack an image on a link
  preview.
- Keep generated work in `output/` (gitignored); never write drafts to the repo root.
