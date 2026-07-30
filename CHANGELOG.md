# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
