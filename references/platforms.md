# LinkedIn and X: two rooms, two posts

Read this every run, after `voice.md`. The voice is the same on both platforms. The reader, the
length, the opening and the ending are not.

**Translate, don't trim.** The X post is written again from the idea. It is never the LinkedIn
post with paragraphs deleted, and the LinkedIn post is never an X thread glued together.

## Who is reading

| | LinkedIn | X |
|---|----------|---|
| Who | Chan's network: founders, hiring managers, the Auckland and NZ tech community, people she has met or may work with | Builders: AI engineers, open-source maintainers, people who use the tools she writes about. Mostly strangers |
| Why they read | To keep up with people they know and to judge who is worth knowing | To find out what is new and what is true, fast |
| What they reward | A real story, a lesson they can use, generous credit, honesty about a setback | A sharp claim, a number, a screenshot, a repo link, something they hadn't seen |
| What they punish | Bragging, vagueness, templated "thought leadership" | Preamble, ceremony, moralising, anything that reads like a press release |
| How Chan wants to be seen | Someone you would hire or introduce | Someone who ships and knows the details |
| Context they have | They know who she is, or can see her headline | None. The post has to stand alone |

## Mechanics

| | LinkedIn | X |
|---|----------|---|
| Hard limit | 3,000 characters | 280 per post, weighted: a link counts 23, an emoji or CJK character counts 2 |
| What shows before the cut | About the first 210 characters (less on mobile), then "see more" | The whole post |
| Working length | 900 to 1,800 for story, idea and recap. 500 to 1,000 for a take | One post under 280. A thread of 3 to 7 when the idea has parts |
| Line breaks | Blank line between every paragraph | One or two breaks per post at most |
| Hashtags | None, or 3 to 5 on the last line | None. One only if it is an event's official tag |
| Emoji | 0 to 4 | 0 or 1 |
| Links | In the body gives a preview card. In the first comment keeps the post itself clean | Not in the first post. Last post of the thread, or a reply |
| Mentions | Chosen by hand from the dropdown, so names go in the copy as plain text | Typed as `@handle`. Only a handle that has been verified. Otherwise the plain name |
| Image | Portrait 1080×1350 takes the most feed space | Landscape 1600×900 shows uncropped |
| Formatting | None renders. No markdown | None renders. No markdown |

Long-form posts on X (past 280) need a Premium account. **Chan's X account status is recorded in
`brand.md`.** If it says unknown, write to the 280 limit and use a thread for anything longer.

Always measure with `node scripts/count.mjs output/<date>-<slug>/post.md`. Do not count by eye.

## LinkedIn shapes

The register (Story or Operator) comes from `voice.md`. These are the length and the beats for
each mode.

| Mode | Register | Length | Beats |
|------|----------|--------|-------|
| **story** | Story | 900 to 1,800 | opening with a turn → scene → the turn → what she noticed → widening out → callback |
| **idea** | Operator, or Story if it came from a moment | 1,000 to 1,800 | thesis or number → what she did or saw → why it matters → one worked example → contrast pair → specific invitation |
| **take** | Operator, short | 500 to 1,000 | what the source says, credited → the one detail that landed → her read, including where she disagrees → what she'll do differently → one real question, or stop |
| **recap** | Story spine, Operator facts | 900 to 1,600 | the room in one line → one or two moments, each crediting a person for something specific → what it changed for her → thanks → what's next |

**The first 210 characters decide whether anyone reads the rest.** They must hold the turn or the
claim. Check the preview line that `count.mjs` prints: if it reads as warm-up, rewrite the top.

**Points inside an idea post.** If the idea has parts, write them as short paragraphs that each
open with a plain phrase, or as a simple list with hyphens. Three parts is better than five. No
emoji numbering, no "1/".

**Recap notes.** Credit is the job of a recap, so do it well: each person named for the specific
thing they said or did. Include one honest note if there is one (what ran late, what she'd want
more of); it makes the praise believable. Names over five go in a single closing sentence, or get
cut. Full research and tagging routine: `recap-playbook.md`.

## X shapes

### Single post (the default)

One claim and its proof, under 280. Three workable forms:

- **Claim, then evidence.** "Gave the agent a budget instead of a longer prompt. Runs went from 31
  tool calls to 9 and the answers got better. Constraints beat instructions."
- **Observation with a number.** The number first, the meaning second.
- **The one line from the LinkedIn post that would survive alone**, usually the contrast pair,
  with one sentence of setup.

If an image carries the evidence (a chart, a terminal screenshot, a diagram), the text can be one
sentence.

### Thread (when the idea really has parts)

Use only when there are three or more points and each is worth a post alone. If the middle posts
only make sense as a sequence, it is a LinkedIn post, not a thread.

- **Post 1 is the whole argument in miniature.** A stranger who reads only this post should get
  the claim and want the proof. No "a thread", no 🧵, no "1/".
- **Each following post makes one point** and is readable alone, because any of them can be
  reposted alone. Lead with the point, not with "Second,".
- **One post is the evidence**: the number, the screenshot, the snippet.
- **The last post lands it** and carries the link if there is one.
- 3 to 7 posts. Each under 280; aim for 240 so nothing looks squeezed.

In `post.md`, thread posts sit in one block separated by a line containing only `---`.

### What changes in translation

Start from the core claim, not from the LinkedIn draft, and ask what a builder who has never heard
of Chan would need.

| LinkedIn has | On X it becomes |
|--------------|-----------------|
| A scene with a time anchor and setup | One clause of context, or nothing |
| The widening-out paragraph | Cut. The reader draws it themselves |
| Thanks and credits | At most two verified `@handle`s, for the person whose work it is. The rest stays on LinkedIn |
| A warm invitation to get in touch | Cut, or "repo below" |
| "It was a good reminder that…" | State the point as a fact |
| A defined term | The term alone. This audience knows it. Define only what is new |
| Three to five hashtags | None |
| Portrait image | Landscape render of the same visual |

What gets sharper: the claim. LinkedIn tolerates "I've come to think that"; X wants the sentence
that follows it. What stays identical: every fact, every number, and the refusal to overclaim.

### By mode on X

- **idea** → single post, or a thread if it has real parts.
- **take** → single post. Her read in the first sentence, the source named, the link in a reply.
  This is the mode X suits best; when the news is fresh, post it there first.
- **story** → usually a single post holding the turn and the point. Many stories don't travel:
  if it needs the scene to work, say so and recommend LinkedIn only.
- **recap** → one moment or one line from the night, with a photo, crediting the speaker by
  verified handle. Not a thank-you list. Often optional.

When a mode doesn't suit a platform, **say so in `post.md` and skip it**. A forced X post costs
more than a missing one.

## Handles on X

A wrong `@handle` tags a stranger in public. Use one only if it was found on the person's own
site, their LinkedIn profile, their GitHub profile, or the event's official page, and say which in
the mention table. Anything else: plain name, no `@`.
