# Visual recipes

**Read this only after `SKILL.md` Step 3 has decided a visual is warranted.** This file is the
*how*, never the *whether* — the gate lives in `SKILL.md` and nothing here overrides it. Text-only
is a normal outcome; don't let a recipe on this page talk you into using it.

Every asset goes in the run's folder: `output/<YYYY-MM-DD>-<slug>/`.

**Brand invariants for any generated visual** (full detail in `brand.md`):
basalt ground `#E2E2DF` (never pure white) · **at most one orange `#FC5000` accent per visual unit**
· ink `#070607` for text · violet `#524AE9` decorative only, never text · Anton display + DM Sans
body · flat — **no shadows, no gradients**.

---

## 1. Chan's own photos — the strongest visual there is

Real faces, a real room, a real whiteboard. Nothing generated competes with this on a recap. If
Chan has photos, that IS the visual: **generate nothing.**

See `recap-playbook.md` → "Photos (the real visual)" for the full routine (how many, ordering, what
to mine from them for the copy). The only job here: don't render over the top of them.

## 2. Brand Mermaid diagram

**Only for structure that passed the gate** — a flow, a before/after, a layered stack, a decision
branch: ≥3 parts with named relationships between them.

**Do NOT diagram:**
- a linear opinion or a story — there's no structure, only sequence
- a single claim, however good (→ consider a quote card instead, §3)
- a list that is already a list in the copy — a box per bullet adds nothing, it just restates
- anything that resolves to ≤2 nodes, or to one node with satellites
- an event, a room, or the people at it — never diagram a recap
- "the idea, but in boxes" as a decoration of last resort

1. Write the diagram to `output/<date>-<slug>/diagram.mmd`. Do **NOT** add a `--- config ---`
   frontmatter block — the brand config is applied via the CLI and frontmatter fights it. Use the
   brand classDefs for accents:
   ```
   classDef accent  fill:#FC5000,stroke:#070607,color:#fff;   %% the ONE orange block
   classDef ink     fill:#070607,stroke:#070607,color:#fff;
   classDef glare   fill:#F5F28E,stroke:#070607,color:#070607;
   classDef surface fill:#F7F6F2,stroke:#070607,color:#070607; %% default-ish
   ```
   One orange accent per diagram — put it on the node that carries the thesis. Un-classed nodes
   already render on-brand. Keep node labels to a few words; a diagram of paragraphs is a table.
2. Render:
   ```
   node scripts/render-mermaid.mjs output/<date>-<slug>/diagram.mmd
   ```
   → `diagram.png`, basalt background, 2× scale.

`examples/diagram.mmd` is a worked example of a diagram that *earns* its place (a genuine
old-way/new-way fork with a shared consequence).

## 3. Quick branded card

For **one** strong quotable line — a thesis, a quote, a recap field-note when there are no photos.
Not for anything that needs more than a sentence.

```
node scripts/render-card.mjs output/<date>-<slug>/card.png \
  --eyebrow "EVENT RECAP" \
  --headline "<short punchy line — the thesis or a quote>" \
  --sub "<one-line context / attribution>" \
  --size square            # or: landscape
```
The headline auto-fits (104px → 40px floor), so a long headline just renders small and sad. Keep it
short. Other flags: `--name`, `--stamp` (default `Chan Meng` / `chanmeng.org`), `--config <json>`.

## 4. Bespoke HTML → PNG

When the card is too plain and the content deserves a designed layout. Author an HTML file that
links the brand CSS and wraps content in a `.stage`, then screenshot it:

```html
<!-- output/<date>-<slug>/visual.html -->
<link rel="stylesheet" href="../../templates/brand.css">   <!-- ../ depth: output/<slug>/ → repo root -->
<div class="stage square"> …Caldera layout using --orange/--ink, .display, .rule, blocks… </div>
```
```
node scripts/render-html.mjs output/<date>-<slug>/visual.html output/<date>-<slug>/visual.png --selector ".stage"
```

`templates/brand.css` gives tokens + helpers: `.stage` (`.square` 1200×1200 · `.landscape` 1200×628
· `.portrait` 1080×1350), `.eyebrow`, `.display`, `.rule`, `.block`/`.b-violet`/`.b-ink`/`.b-orange`/
`.b-glare`, `.px`, `.card`, `.logo.on-ink`. Logo at `templates/assets/chan-monkey-logo-black.svg` —
never recolor it. `templates/post-card.html` is a worked reference layout.

## 5. OpenAI image — last resort

Only when neither a diagram nor an HTML layout fits and the post genuinely needs a hero image.

```
node scripts/gen-image.mjs "<prompt>" output/<date>-<slug>/image.png --size landscape
```

Prompt from `brand.md` → Imagery direction: risograph halftone, orange → violet dot gradient, flat,
abstract. **Forbidden:** AI portraits of Chan, generic stock tech/business scenes, glossy 3D.

**Exit code 2 = no API key.** Tell Chan how to set it (`.env` / `.env.local`), and then either fall
back to a card/diagram *if one is actually appropriate* — or ship text-only. A missing key is not a
reason to force a visual the gate would have rejected.

---

After rendering, **Read the PNG** and show Chan the asset before you write the handoff. If it looks
like filler once rendered, say so and drop it — a weak visual is worse than none. Whatever survives
gets its path listed in `post.md`; Chan attaches it herself.

**If a script dies with `ERR_MODULE_NOT_FOUND`:** `node_modules/` is gitignored and may be absent.
Run `npm install` + `npx playwright install chromium` from the repo root, then retry. (Note that
`render-mermaid.mjs` falls back to a global `mmdc`, so it can succeed while §3–5 are still broken.)
