# Visuals: choosing a route and rendering it

Read this at `SKILL.md` Step 4, once the copy is settled. It covers both the decision (which kind
of image, if any) and the recipes.

Every asset goes in the run's folder: `output/<YYYY-MM-DD>-<slug>/`.

## The one test

**Would a reader get something from the image in two seconds that the text makes them work for?**

A loop, a comparison, a number next to the number it replaced, the order things happen in: these
are faster seen than read. An image that repeats the post's sentences inside boxes is slower than
the post, and it reads as filler. Look for the visual in every draft; make one when the content
has a shape; say "text only" in one line when it doesn't. Both are normal outcomes.

If Chan asks for a visual, make it. The test governs the default, not her requests.

## Route by the shape of the content

Find the row that matches what the post is actually about. Stop at the first match.

| The post contains… | Route | Recipe |
|--------------------|-------|--------|
| Chan's own photos, or a real screenshot (terminal, chart, UI, a slide she photographed) | **Use the real thing.** Generate nothing | §1 |
| Parts connected by arrows that matter: a loop, a branch, a hand-off between systems, who calls whom, states and transitions | **Mermaid** | §2 |
| Two things set against each other: before and after, old way and new way, option A and option B | **HTML · compare** | §3 |
| One number the argument rests on | **HTML · stat** | §3 |
| A few numbers of the same kind (then and now, per month, per tool) | **HTML · bars** | §3 |
| A short sequence in a straight line: stages, a timeline, a checklist of 3 to 5 | **HTML · steps** | §3 |
| One sentence worth quoting alone | **HTML · quote card** | §4 |
| A shape none of the above fits, and the content deserves it | **Bespoke HTML** | §5 |
| A take on an article with a link preview | **Nothing.** The preview card is the visual | — |
| An opinion or a story with no structure in it | **Nothing.** Text only | — |
| Needs an abstract hero image and nothing else fits | OpenAI image, last resort | §6 |

**Mermaid or HTML?** Mermaid when the *relationships* are the content: take the arrows away and
the meaning is gone. HTML when the *layout, the numbers or the type* are the content. A straight
line of boxes joined by arrows is a list; use `steps`. Two columns of boxes is a comparison; use
`compare`.

**Do not make:**

- a box per bullet point of the copy
- a diagram of an event, a room, or the people in it
- a chart of numbers Chan didn't measure or can't source
- a generated image on top of real photos, or on top of an article's link preview
- more than one generated visual per post

## Sizes per platform

| Platform | Shape | Size | How |
|----------|-------|------|-----|
| LinkedIn | portrait 4:5 | 1080×1350 | `--size portrait` · Mermaid `flowchart TB` |
| X | landscape 16:9 | 1600×900 | `--size wide` · Mermaid `flowchart LR` |

HTML visuals render twice from one file. A Mermaid diagram usually renders once and is used on
both; write a second `.mmd` with the other direction only if the first comes out badly lopsided
for one platform (very tall on X, very wide on LinkedIn).

## Brand rules for anything generated

Full detail in `brand.md`. Basalt ground `#E2E2DF`, never pure white. **One orange `#FC5000`
accent per visual**, on the element the post is about. Ink `#070607` for text. Violet `#524AE9`
decorative only, never text. Anton for display, DM Sans for body. Flat: no shadows, no gradients.

Words on a visual follow `voice.md` too: plain, short, no slogans. A label is a few words. If a
box needs a sentence, the content is prose and belongs in the post.

---

## 1. Real photos and screenshots

Real faces, a real room, a real terminal. Nothing generated competes, so nothing is generated.

- **Event photos**: follow `recap-playbook.md` → "Photos". Order them, work one visible detail
  into the copy, record the order in `post.md`.
- **Screenshots**: ask Chan for the file. Read it, check nothing private is visible (keys, email
  addresses, other people's names, internal URLs) and tell her if something is. Suggest a crop if
  the evidence is a small part of the frame. For X, a screenshot of the actual result is often the
  strongest visual there is.

## 2. Mermaid diagram

For structure where the arrows carry meaning.

**Pick the diagram type by what the arrows mean:**

| The content is… | Type |
|-----------------|------|
| a process with a branch or a loop; an architecture; a hand-off | `flowchart` |
| messages passing between named parties over time (user, agent, tool, API) | `sequenceDiagram` |
| something that moves between named states | `stateDiagram-v2` |
| items placed on two axes (effort against payoff) | `quadrantChart` |

1. Write `output/<date>-<slug>/diagram.mmd`. Do **not** add a `--- config ---` frontmatter block;
   the brand theme is applied by the render script and frontmatter fights it. For flowcharts, the
   brand classes:
   ```
   classDef accent  fill:#FC5000,stroke:#070607,color:#fff;   %% the ONE orange node
   classDef ink     fill:#070607,stroke:#070607,color:#fff;
   classDef glare   fill:#F5F28E,stroke:#070607,color:#070607;
   classDef surface fill:#F7F6F2,stroke:#070607,color:#070607;
   ```
   Put `accent` on the single node that carries the post's point. Un-classed nodes already render
   on-brand.
2. Keep it small: **4 to 9 nodes**, labels of one to four words, edge labels only where the
   relationship isn't obvious. No title node (the post is the title) and no emoji in labels.
3. Render:
   ```
   node scripts/render-mermaid.mjs output/<date>-<slug>/diagram.mmd
   ```
   → `diagram.png`, basalt background, 2× scale.

`examples/diagram.mmd` is a worked example: a review loop, where the arrow going back is the
point of the post.

## 3. HTML layouts → PNG

Four ready layouts in `templates/visuals/`. Each is a plain HTML file with placeholder text.

| Template | For | Limits |
|----------|-----|--------|
| `stat.html` | one number and what it means | number of 5 characters or fewer |
| `compare.html` | two columns, rows paired across | 3 to 5 rows a side, each row under about 40 characters |
| `bars.html` | numbers side by side | 2 to 6 bars; set `--v` to each value as a percent of the largest |
| `steps.html` | an ordered straight-line sequence | 3 to 5 rows |

1. Copy the template to `output/<date>-<slug>/visual.html`. The output folder sits at the same
   depth as `templates/visuals/`, so the stylesheet and logo paths work unchanged.
2. Replace the text. Move `.is-key` to the row, bar or column the post is about: that is where the
   one orange (or ink) accent lands. Fill the source line in the footer with where the numbers
   come from, or delete it.
3. Render once per platform being posted to:
   ```
   node scripts/render-html.mjs output/<date>-<slug>/visual.html output/<date>-<slug>/visual-linkedin.png --size portrait
   node scripts/render-html.mjs output/<date>-<slug>/visual.html output/<date>-<slug>/visual-x.png --size wide
   ```
   The script **exits 3 if content is clipped** by the stage. Cut words or rows and render again;
   don't shrink the type.

`examples/visual.html` is a filled-in `compare`.

## 4. Quote card

For one strong line: a thesis, a quote from a talk, a field note from an event with no photos.
Nothing longer than a sentence.

```
node scripts/render-card.mjs output/<date>-<slug>/card.png \
  --eyebrow "FIELD NOTE" \
  --headline "<the line>" \
  --sub "<one line of context or attribution>" \
  --size square            # or: landscape
```
The headline auto-fits (104px down to a 40px floor), so a long one renders small. Keep it short.
Other flags: `--name`, `--stamp` (default `Chan Meng` / `chanmeng.org`), `--config <json>`. A
quote from another person needs their name in `--sub` and must be what they actually said.

## 5. Bespoke HTML

When no template fits and the content deserves a designed layout (a layered stack, a 2×2, an
annotated snippet). Start from the nearest template so the frame, footer and scale unit come along:

```html
<link rel="stylesheet" href="../../templates/brand.css">
<div class="stage portrait">
  <div class="frame">
    <div class="v-eyebrow"><span class="dot"></span>Label</div>
    <h1 class="v-title">Title</h1>
    <div class="v-rule"></div>
    <div class="v-body"> …your layout… </div>
    <div class="v-foot"> …copy from a template… </div>
  </div>
</div>
```

Size everything in `calc(var(--u) * N)` and not in pixels, so `--size wide` and `--size portrait`
both work from the one file. `templates/brand.css` has the tokens (`--orange`, `--ink`, `--ash`,
`--display`, `--body`, `--mono`) and helpers (`.block`, `.b-ink`, `.b-orange`, `.card`, `.mono`).
Logo: `templates/assets/chan-monkey-logo-black.svg`, never recoloured. Render as in §3.

## 6. OpenAI image, last resort

Only when the post needs an abstract hero image and no real asset, diagram or layout fits.

```
node scripts/gen-image.mjs "<prompt>" output/<date>-<slug>/image.png --size landscape
```

Prompt from `brand.md` → Imagery direction: risograph halftone, orange to violet dot gradient,
flat, abstract. **Forbidden:** AI portraits of Chan, stock tech or business scenes, glossy 3D.

**Exit code 2 means no API key.** Tell Chan how to set it (`.env` / `.env.local`), then use
another route if one fits, or ship text only.

---

## After rendering

**Read every PNG you made** and look at it as a stranger scrolling past would:

- Is the point clear in two seconds without reading the post?
- Is any text small, clipped or crowded? (Imagine it at phone width.)
- Is there exactly one accent, on the right element?
- Does it add to the copy, or repeat it?

If it fails, fix it or drop it and say so. A weak visual is worse than none. Whatever survives is
listed in `post.md` with its path and which platform it is for; Chan attaches it herself.

**If a script dies with `ERR_MODULE_NOT_FOUND`:** `node_modules/` is gitignored and may be absent.
Run `npm install` and `npx playwright install chromium` from the repo root, then retry.
`render-mermaid.mjs` falls back to a global `mmdc`, so it can succeed while the HTML routes are
still broken. Renders load web fonts and can take 10 to 20 seconds each.
