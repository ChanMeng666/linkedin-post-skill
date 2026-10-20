# Visuals: choosing a route and rendering it

Read this at `SKILL.md` Step 4, once the copy is settled. It covers both the decision (which kind
of image, if any) and the recipes.

Every asset goes in the run's folder: `output/<YYYY-MM-DD>-<slug>/`.

## The one test

**Would a reader get something from the image in two seconds that the text makes them work for?**

A loop, a comparison, a number next to the number it replaced, the order things happen in: these
are faster seen than read. An image that repeats the post's sentences inside boxes is slower than
the post, and it reads as filler.

**Every post gets a visual.** When the content has a shape, the shape picks the route below. When
it doesn't (a story, an opinion, a take), the visual is a **monkey illustration** (§8): the post's
one idea as a physical metaphor, acted out by the brand monkey. That passes the test a different
way: it gives the idea a picture the reader remembers, without repeating a word of the copy.

"Text only" now happens only when Chan asks for it, or when the monkey route can't run (no key,
no skill) and the hero plate would add nothing. Say which in one line.

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
| An idea, a habit, a before/after of a feeling, a story's turn, a take's point: no numbers, no wiring diagram | **Monkey illustration** | §8 |
| A take on an article | **Monkey illustration**, and the link moves to the first comment (LinkedIn) or a reply (X) — never an image and a preview card together | §8 |
| An opinion or a story with no structure in it | **Monkey illustration** | §8 |
| Needs a cover image and the monkey route can't run, or Chan asks for the plate | **HTML · hero** (ink plate with a dither field) | §6 |

**Monkey or code?** Code when a reader might check or implement from the image: numbers,
architecture, more than five parts, exact labels. An image model misspells and miscounts, so
anything that must be exact is drawn by code. The monkey when the image should make the idea
*felt*: one claim, one metaphor, at most three words on it. A post whose structure is a simple
before/after or a loop can go either way; prefer the monkey for Story register, code for
Operator register.

**Mermaid or HTML?** Mermaid when the *relationships* are the content: take the arrows away and
the meaning is gone. HTML when the *layout, the numbers or the type* are the content. A straight
line of boxes joined by arrows is a list; use `steps`. Two columns of boxes is a comparison; use
`compare`.

**Do not make:**

- a box per bullet point of the copy
- a diagram of an event, a room, or the people in it
- a chart of numbers Chan didn't measure or can't source
- a generated image on top of real photos, or on top of an article's link preview
- more than one generated visual per post (the LinkedIn and X renders of one visual count as one)
- anything from an image model **except the monkey route (§8)**: no AI portraits of Chan or
  anyone else, no stock-style scenes, no generated screenshots, charts or diagrams. The monkey
  route is the one exception because it is anchored on the real logo and held to the brand
  palette; everything else stays drawn by code

## Sizes per platform

| Platform | Shape | Size | How |
|----------|-------|------|-----|
| LinkedIn | portrait 4:5 | 1080×1350 | `--size portrait` · Mermaid `flowchart TB` |
| X | landscape 16:9 | 1600×900 | `--size wide` · Mermaid `flowchart LR` |

HTML visuals render twice from one file. A Mermaid diagram usually renders once and is used on
both; write a second `.mmd` with the other direction only if the first comes out badly lopsided
for one platform (very tall on X, very wide on LinkedIn).

## Brand rules for anything generated

Full detail in `brand.md`. The motif is the square pixel: no round dots, no halftone, no colour
gradients, no grain. Basalt ground `#E2E2DF`, never pure white. **One orange `#FC5000`
accent per visual**, on the element the post is about. Ink `#070607` for text. Violet `#524AE9`
decorative only, never text. Anton for display, DM Sans for body. Flat: no shadows, no gradients.

The monkey route keeps these rules with its own medium: basalt ground (swapped in after
generation), hand-drawn ink line, one orange accent, violet only as marks, labels in ink. No
Anton or DM Sans: its few labels are hand-lettered.

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

### The sketched look

```
node scripts/render-mermaid.mjs output/<date>-<slug>/diagram.mmd --look hand
```

Switches Mermaid to its hand-drawn renderer: slightly wobbly ink lines and hatched fills, in the
same brand colours, seeded so it renders the same every time. Use it when the diagram is a way
of thinking and not a specification (a habit, a loop, a rough model of how something works),
or when the post is in the Story register and a ruled diagram would feel cold. Keep the default
look for architecture, anything with more than seven nodes, and anything a reader might implement
from.

Hatched fills make white text hard to read, so in this look **every label stays ink-coloured**:
don't use the `ink` class, and define the accent as
`classDef accent fill:#FC5000,stroke:#070607,color:#070607;`. `examples/diagram-hand.mmd` shows it.

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

## 6. Hero: the cover plate

For a post that wants a cover image and has nothing real or structural to show: an announcement,
a story with no photo, the first post of an X thread. It is the brand's own plate, the same
vocabulary as the hero and cover on Chan's GitHub README:

- an **ink plate** with the claim in the display face, in ash
- **one orange pixel** as the full stop, the plate's only accent
- a **dither field**: square pixels in ordered dither, thickening away from the type (to the
  right in landscape, downward in portrait)
- a faint ruled **grid** and a **crop mark** in each corner
- the monkey mark and the name in mono as the signature

Everything is **drawn in code** by `templates/dither.js`. Ordered dither is a function of
position, so the same file always renders the same pixels. No image model, no API key.

1. Copy `templates/visuals/hero.html` to `output/<date>-<slug>/visual.html`.
2. Set the eyebrow and the title. The title is the post's claim in about six words; it is the
   only information on the image, so it has to be worth reading alone. End it with
   `<span class="stop"></span>` and no typed full stop.
3. Leave the orange alone: the full stop is the one accent, so the eyebrow has no orange square.
4. Render as in §3.

In a bespoke layout, `<canvas class="dither">` fills whatever box CSS gives it (`data-angle` sets
the direction it thickens, `data-cell` the pixel pitch) and `<canvas class="furniture">` as the
first child of `.stage` draws the grid and crop marks. Add `plate-ink` to the stage for the ink
ground, and include `<script src="../../templates/dither.js"></script>` after the stage.

A hero carries less than any other route. Prefer a photo, a screenshot or a layout with real
content whenever one exists.

## 7. Motion: the same visual as a short video

Only when Chan asks for a video or an animated version. A still is the default; most posts
don't need movement, and a video nobody asked for is a larger kind of filler.

```
node scripts/render-video.mjs output/<date>-<slug>/visual.html output/<date>-<slug>/visual-x.mp4 --size wide
node scripts/render-video.mjs output/<date>-<slug>/visual.html output/<date>-<slug>/visual-linkedin.mp4 --size portrait
node scripts/render-video.mjs output/<date>-<slug>/diagram.mmd  output/<date>-<slug>/diagram.mp4 --size portrait [--look hand]
```

- **HTML visuals** need no changes. The script switches on entrance animations that already live
  in `brand.css`: the title rises, then rows, bars or columns arrive in reading order (in
  `compare`, the side the post argues for arrives last), then everything holds.
- **Mermaid diagrams** reveal in source order: each node fades in, then each arrow draws itself.
  So write the `.mmd` in the order the idea should be told.
- Flags: `--duration` in seconds (default 6), `--fps` (default 30). No audio. Output is H.264 MP4
  at 1600×900 or 1080×1350, which both platforms accept as native video.
- Frames are stepped, not recorded, so the result is exact and repeatable. A 6-second clip takes
  about 20 to 30 seconds to render. Needs `ffmpeg` on PATH (exit code 2 if missing).
- For a bespoke layout, add your own rules under `.stage.motion …` so the still is untouched.

Check the result before handing it over: pull a few frames with
`ffmpeg -ss <t> -i <file>.mp4 -frames:v 1 frame.png` and Read them. Confirm nothing is clipped
mid-animation and the final frame matches the PNG. List the MP4 beside the PNG in `post.md`; Chan
picks which to attach. A post takes an image or a video, not both.

## 8. Monkey illustration

The brand monkey, from the logo, acting out the post's one idea in a hand-drawn scene. Made by
the `chan-monkey-illustrations` skill: an image model (OpenAI `gpt-image-2`) with the logo
attached as a reference image, so the head is always the real mark.

**Read first:** that skill's `references/monkey-ip.md` (the character), `composition-patterns.md`
(how to invent the metaphor), `prompt-template.md` (the brief), and the "Social post profile"
in its `style-dna.md`. The skill lives at `~/.claude/skills/chan-monkey-illustrations/`.

1. **Find the metaphor.** Take the post's spine (Step 2) and turn it into a physical verb and a
   low-tech object, then give the verb to the monkey. The idea must still work if a reader
   never reads the post. One object, one action. If the monkey could be deleted and the picture
   still says the same thing, it's decoration: rewrite the scene.
2. **Write the brief** to `output/<date>-<slug>/monkey-brief.txt` from the skill's generation
   template, with the post profile:
   - CHARACTER block word for word; choose the mood from `monkey-ip.md`.
   - Compose for **portrait 4:5** (LinkedIn renders first): stack the scene vertically.
   - **One orange accent** on the element the post is about. Violet only as marks. No glare,
     or one swipe.
   - **0 to 3 labels**, 1 to 3 words, English (NZ spelling), in ink. Never a sentence from the
     copy, never the post's hook, never a name, a handle or a hashtag.
   - No real people, no event scenes, no logos of other companies, no text pretending to be a
     screenshot.
3. **Render LinkedIn, then recompose for X** from it, so both platforms carry the same picture:
   ```
   node scripts/render-monkey.mjs output/<date>-<slug>/monkey-brief.txt output/<date>-<slug>/visual-linkedin.png --size portrait
   node scripts/render-monkey.mjs output/<date>-<slug>/monkey-brief.txt output/<date>-<slug>/visual-x.png --size wide --from output/<date>-<slug>/visual-linkedin.png
   ```
   X-only post: render `--size wide` directly. Each call takes about a minute.
4. **Read both PNGs** and run the skill's `references/qa-checklist.md` plus "After rendering"
   below. Above all: the head is on-model (curl sweeping up to the right, white face, round
   eyes), labels spelled exactly, one orange accent. Fix with one regeneration or one edit
   (the skill's edit prompts); after two failures, simplify the scene or drop to the hero plate.
5. **In `post.md`**, under `## Visual`, list both files and the metaphor in one line, and note
   that it is AI-generated from the logo (see `brand.md`).

`render-monkey.mjs` exits 2 when the skill, Python or `OPENAI_API_KEY` is missing. Fall back to
the hero plate (§6) and say so in the handoff.

**Recaps:** never draw the event, the room or the people. If Chan has no photos, a monkey
illustration may show *the one thing that stuck* — offered, not assumed (`recap-playbook.md`).

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
