# Post voice & structure

How to write the copy. English only. Reverse-engineered from the reference post
(`examples/post.txt`) and Chan's brand voice (`references/brand.md`). Pair this with `brand.md`
(vocabulary, do/don'ts) and `hashtag-bank.md` (tags).

## The two post types

| Type | Goal | Default visual |
|------|------|----------------|
| **idea** | Share a framework/opinion → personal-brand authority | brand Mermaid diagram or OpenAI image |
| **recap** | Reflect on an offline event, mention people/orgs → grow network | branded HTML→PNG card |

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

- **Length:** 1,000–1,800 characters is the sweet spot. The reference post is ~1,850 — fine. Hard
  cap is LinkedIn's 3,000.
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

Write the final copy to `output/<YYYY-MM-DD>-<slug>/post.txt` as plain text exactly as it should
appear on LinkedIn (emoji inline, blank lines preserved, hashtags on the final line). Keep it
copy-paste-ready even though the skill will also draft it into the composer.
