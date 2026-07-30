# Post voice & structure

How to write the copy. English only. Reverse-engineered from the reference post
(`examples/post.txt`) and Chan's brand voice (`references/brand.md`). Pair this with `brand.md`
(vocabulary, do/don'ts) and `hashtag-bank.md` (tags).

## The three post types

| Type | Goal | Visual |
|------|------|--------|
| **idea** | Share her own framework/opinion → personal-brand authority | diagram only if it passes the gate |
| **take** | React to an article/news with her own read → product taste + technical judgement | none — the link preview |
| **recap** | Reflect on an offline event, mention people/orgs → grow network | Chan's real photos |

The `Visual` column is a summary, not a rule. **`SKILL.md` Step 3 owns that decision** — work through
its gate. Text-only is a normal, frequent outcome for all three.

## Anatomy of an idea post (the proven shape)

The reference post follows this skeleton — reuse it, don't copy it verbatim:

1. **Headline line** — bold claim + 1–2 emoji. Often a contrarian or "X is the new Y" frame.
   _e.g._ `🚀 The AI-Native Developer Mindset: Why Hand-Coding Everything Is the New Horse-and-Buggy 🐎🚗`
2. **Hook (2–3 short lines)** — a relatable moment or a surprising claim that earns the next line.
   A single punchy contrarian sentence on its own line works well.
3. **"Here's the framework 👇"** — signal a numbered list is coming.
4. **3–5 numbered points** — each: an emoji + bold label, then 2–4 tight lines. Use `→` arrows and
   `✅ / ❌` for contrasts. One idea per point.
5. **The mental shift** — a short before/after block (🐎 old world → 🚗 new world) distilling the thesis.
6. **Punch line** — one imperative sentence. _e.g._ "Stop being a code typist. Start being a system architect. ✨"
7. **CTA question** — invite replies. _e.g._ "What's your take — …? Drop your thoughts below 👇"
8. **Hashtag block** — 8–12 tags on the last line (see `hashtag-bank.md`).

## Anatomy of a take post

For "I read this, here's what I think." Shorter and plainer than an idea post — the value is Chan's
**judgement**, not a framework. 4–6 beats, no scaffolding.

1. **What I read** — the source in one line, plus what it actually claims. Credit the author or
   publication by name. _e.g._ `Anthropic shipped X this week. The claim: Y.`
2. **The one thing that landed** — a single detail, number, or sentence that stuck. Specific beats
   comprehensive; you are not summarizing the article, the link does that.
3. **Chan's take** — the actual opinion, including where she disagrees or thinks it's overstated.
   This beat is the whole post. Product taste = noticing what most readers skimmed past.
4. **So what** — what it changes about how she builds, or what she'll try next. One or two lines,
   concrete.
5. **CTA question** — short and genuine. _e.g._ `Am I reading this wrong?`
6. **Hashtag block** — 5–8 tags.

**Plain, not dumbed down.** The brand's architecture-grade vocabulary still applies to *nouns* — but
a take post should be readable in one pass by someone who hasn't read the article. Short sentences,
one technical term per beat at most, and if a term is load-bearing, define it in four words inline.
Precision without a jargon wall is what reads as taste; density reads as showing off.

**Anti-patterns for take posts:**
- ❌ "Here's the framework 👇" — that's an idea post; a take doesn't need scaffolding.
- ❌ A forced numbered list of 5 points mined out of the article.
- ❌ Summarizing the whole piece — the link preview and the reader's own click do that.
- ❌ A diagram. If a take genuinely needs a diagram, it was an idea post all along.
- ❌ Explainer voice ("Let me break down what this means for you"). Peer voice, not lecture.

## Anatomy of a recap post

1. **Opening** — name the event + a one-line feeling/takeaway. Optionally lead with a vivid detail.
   _e.g._ `Just back from [Event] — and I can't stop thinking about [theme]. 🙌`
2. **What stood out** — 2–4 short beats. Weave in **@mentions** of speakers/organizers naturally as
   you credit a specific talk or moment (not a bare list of names).
3. **Personal takeaway / expansion** — Chan's own reflection that ties the event to her work/thesis
   (this is what makes it a Chan post, not a recap template).
4. **Gratitude + forward-looking line** — thank organizers/hosts (@mention), note who you'd love to
   keep talking to.
5. **CTA** — light invitation ("Were you there too? What was your highlight?").
6. **Hashtag block** — event tag (if any) + 6–10 topical tags.

> See `recap-playbook.md` for how to source/verify the names and the @mention mechanics.

## Mechanics & norms

- **Length, per mode** (hard cap is LinkedIn's 3,000):
  - **idea** — 1,000–1,800 chars. The reference post is ~1,850, which is fine.
  - **take** — 600–1,200 chars. Plain-spoken, one idea, no padding. If it's running long, the extra
    length is usually article summary that should be cut.
  - **recap** — 1,000–1,600 chars, shorter when photos are carrying the post.
- **When photos are attached, the copy must reference something visible in them** — the whiteboard,
  the packed room, the demo on screen. That's the seam where a real post separates from a template.
- **First 2 lines matter most** — they're the "see more" preview. Front-load the hook.
- **Whitespace is the formatting.** Blank line between every beat. LinkedIn renders no markdown —
  no `**bold**`, no `#`, no bullet chars beyond plain text + emoji. Use emoji as bullets.
- **Emoji:** 1 per headline, 1 per numbered label, a few inline. Tasteful, not confetti. Reuse a
  consistent visual set within a post (the reference uses 🐎/🚗 as a running motif).
- **Arrows & marks:** `→` for consequence, `✅/❌` for do/don't, `👇` to point at list/CTA.
- **Voice:** architecture-grade nouns, evidence-first, no marketing fluff (see `brand.md`).
- **No hedging, no "sorry it's long."** Confidence is the statement.
- **Mention specifics** — real projects, real numbers, real names. Vague = forgettable.

## Output format

The copy goes inside a ```` ```text ```` fence in the `## The copy` section of
`output/<YYYY-MM-DD>-<slug>/post.md` (see `SKILL.md` Step 4) — exactly as it should appear on
LinkedIn: emoji inline, blank lines preserved, hashtags on the final line, names as **plain text**
with no `@` prefix. The fence matters: it keeps the blank lines intact when Chan copies it, and
LinkedIn's editor pastes it verbatim.
