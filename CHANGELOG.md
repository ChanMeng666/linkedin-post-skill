# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.0] - 2026-10-13

Three ideas borrowed from a code-drawn illustration pipeline: draw bitmaps in code and not with
an image model, step a headless browser frame by frame into ffmpeg, and let lines look drawn by
hand.

### Added
- **The plate motif in code, `templates/dither.js`.** A field of square pixels in ordered dither
  (8×8 Bayer), a faint ruled grid and corner crop marks, drawn on canvas inside the existing
  HTML-to-PNG pipeline. It is the same vocabulary as the README artwork in the brand's source
  repo. New `templates/visuals/hero.html` uses it for cover images: an ink plate, the claim in
  the display face, one orange pixel as the full stop.
- **`scripts/render-video.mjs`.** Renders any HTML visual or `.mmd` diagram to a short H.264 MP4.
  Animations are seeked frame by frame in headless Chromium and piped to ffmpeg, so output is
  exact and repeatable. Entrance animations for every template live in `brand.css` under
  `.stage.motion`, so stills are unaffected. Mermaid diagrams reveal node by node, edge by edge.
- **`render-mermaid.mjs --look hand`**, Mermaid's sketched renderer with the brand theme and a
  fixed seed. Also accepts an `.svg` output path. `examples/diagram-hand.mmd` shows the
  label-colour rule that look needs.

### Removed
- **The OpenAI image route**: `scripts/gen-image.mjs`, `scripts/lib/load-env.mjs`, `.env.example`
  and the `openai` dependency. The skill now uses no image model and no API key; the hero
  plate covers the case that route existed for.

### Changed
- `references/brand.md` → Imagery direction rewritten from the current brand sources. The old
  text described a halftone dot gradient from orange to violet, a look the brand had already
  retired; it now names the dither field, the orange pixel and the plate furniture, and lists
  halftone, colour ramps and grain as retired.

- **Display face is now Bebas Neue**, following chanmeng.org, with Anton as the fallback.

### Fixed
- `render-html.mjs` redraws canvas textures after `--size` changes the stage, so they are not
  stretched.

## [2.0.0] - 2026-10-13

A redesign: a studied voice, a second platform, and visuals chosen by the shape of the content.

### Added
- **A writing system, `references/voice.md`**, built from about twenty recent posts each by two
  LinkedIn writers Chan likes reading, one story-led and one operator-led.
  It defines two registers, **Story** and **Operator**, with the shape and techniques of each,
  shared rules, opener and closer patterns, a "Never" list, and a plain-language pass. It records
  craft only; none of their sentences or stories are reproduced.
- **X (Twitter) as a second platform.** `references/platforms.md` sets out how the audience,
  mechanics and shapes differ from LinkedIn, and how to translate an idea between them. Each
  platform's post is written separately; the X post is never a trimmed LinkedIn post.
- **`story` mode**, for posts that start from something that happened.
- **`scripts/count.mjs`**, which reads the copy blocks in `post.md`, measures LinkedIn length and
  X's weighted length per post, prints the LinkedIn "see more" preview, and flags the mechanical
  items on the "Never" list.
- **HTML visual templates** in `templates/visuals/`: `stat`, `compare`, `bars`, `steps`, on a
  layout kit added to `templates/brand.css` that scales from one unit.
- **`render-html.mjs --size portrait|square|wide|landscape`**, so one HTML file renders for both
  platforms (1080×1350 for LinkedIn, 1600×900 for X). It now exits 3 when content is clipped.
- A rule stated up front: **only real material**. The skill asks for the moment, number or quote
  it needs and never invents one.

### Changed
- **Visuals are routed by the shape of the content** instead of gated by a three-question test
  that defaulted to nothing. Arrows that matter go to Mermaid; a comparison, a number, a set of
  numbers or a straight sequence go to an HTML layout; real photos and screenshots still win
  outright; text only remains a normal outcome. `references/visuals.md` now holds both the
  decision and the recipes.
- **The old house style is retired**: the emoji headline, "Here's the framework", emoji-numbered
  points, tick-and-cross lists, arrow bullets, the "drop your thoughts below" ending and the block
  of 8 to 12 hashtags. LinkedIn posts now take none, or 3 to 5.
- `post.md` has a section per platform, with the copy in fences labelled `text linkedin` and
  `text x`. The mention table gained an X-handle column with where each handle was verified.
- `SKILL.md` workflow reordered: real material → verify → spine and register → draft per platform
  → visual → handoff.
- `examples/` replaced with a worked `post.md` (the original reference post rewritten in the new
  voice, for both platforms), a `compare` visual and a Mermaid loop.

### Removed
- `references/voice-and-structure.md` (superseded by `voice.md` and `platforms.md`).
- `examples/post.txt` and its two-column Mermaid diagram, which was a comparison drawn as a
  flowchart.

## [1.1.0] (never tagged)

### Added
- **`take` mode** — a third post type for short, plain-spoken reactions to a tech article or news
  item (4–6 beats, 600–1,200 chars, 5–8 hashtags), with its own anatomy and anti-patterns in
  `references/voice-and-structure.md`. Previously such posts were forced into the 8-beat
  numbered-framework shape meant for original frameworks.
- **Event photos as a first-class input.** Recap mode now asks for photo paths up front; when Chan
  has photos they *are* the visual and nothing is generated. The skill proposes an attach order and
  works a visible detail into the copy (`references/recap-playbook.md` §3).
- **`references/visuals.md`** — all render recipes (Mermaid, card, bespoke HTML, OpenAI image),
  loaded only once a visual has been judged warranted.
- Standard community-health documentation (`CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `GOVERNANCE.md`, this changelog).

### Removed
- **All LinkedIn browser automation.** The skill no longer opens the composer, types the post, or
  resolves @mention chips via claude-in-chrome. Driving LinkedIn's editor programmatically proved
  unreliable — the composer swallows the space after a resolved mention chip and backspaces land at
  the wrong caret position, corrupting text that was already correct — and it never had a usable
  file input for photos. The skill now stops at a markdown handoff.
- A **"Hard boundary: you never drive a browser"** section at the top of `SKILL.md` makes this a
  standing prohibition rather than just an absent step, so a future run can't drift back into
  "staging a draft for review". It also states what remains allowed and why: WebSearch/WebFetch for
  verification, and the headless-Chromium render scripts, which screenshot local HTML and never
  touch a live site.

### Changed
- **The deliverable is one file: `output/<date>-<slug>/post.md`.** It carries the copy in a fenced
  block (blank lines survive the copy-paste), a `Who to @mention` table, photo order, the verified
  facts behind each claim, and the judgement calls made on Chan's behalf. Replaces the old
  `post.txt` + `MENTIONS.md` + `PHOTOS.md` split.
- **The mention table is written for a human doing the tagging.** Its key column is "Pick the entry
  that says …" — the headline that distinguishes the right person from same-named people in
  LinkedIn's dropdown — rather than a profile URL, which is easy to get wrong and useless to paste.
- Names appear as plain text in the copy, with no `@` prefix; a pasted `@Name` is dead text that
  reads as a failed tag.
- **Visuals are gated instead of automatic.** `SKILL.md` Step 3 replaced the fixed
  "Mermaid → HTML → OpenAI image" priority ladder with an ordered decision: Chan's photos → mode
  default → a three-question structure gate (≥3 parts with named relationships · would you whiteboard
  it · does it add information the copy lacks). Any "no" ships text-only, which is now stated as a
  normal outcome rather than a skipped step. An explicit request from Chan still overrides the gate.
- Step 5's manifest is conditional — a visual is listed only if Step 3 called for one, and the
  bespoke-HTML output (`visual.html`/`visual.png`) is no longer omitted.
- Step 4 handles link placement for `take` posts (body preview vs. first comment) and skips the
  attach sub-step entirely when there is no visual.
- Per-mode length bands and hashtag counts are now stated in one table in Step 2.

### Fixed
- Removed contradictory visual-priority guidance that lived in four places at once
  (`SKILL.md` frontmatter and Step 3, `README.md`, `references/voice-and-structure.md` — the last of
  which still recommended an OpenAI image for idea posts).
- `examples/diagram.mmd` contained the `--- config ---` frontmatter block the skill forbids and used
  a non-Caldera palette. Rebuilt on-brand and re-rendered.
- `SKILL.md` claimed dependencies were "already installed in this repo", but `node_modules/` is
  gitignored and absent from any clone — so a Playwright render would fail with an error the skill
  gave no guidance on. Setup now documents the `npm install` recovery, and notes that
  `render-mermaid.mjs` can still succeed via a global `mmdc` and so isn't evidence deps are present.

## [1.0.0]

### Added
- Initial documented release of Linkedin Post Skill.
