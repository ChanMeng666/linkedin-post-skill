# Interviews with an AI-built portfolio

> Worked example of the handoff file. It is this skill's original reference post (the "AI-native
> developer mindset" framework) rewritten under `references/voice.md`, using only the facts that
> post contained. Nothing was added to the story.

- **Mode:** idea · **Register:** Operator, opened with two lines of scene
- **Platforms:** LinkedIn + X (thread of 5)
- **Drafted:** 2026-10-13
- **Visual:** HTML `compare`, rendered for both platforms. The post argues a before/after, which
  is faster seen than read.
- **Counts:** LinkedIn 1,338 characters, 3 hashtags · X 5 posts, longest 190

## LinkedIn

Copy everything inside the block, exactly as it is. The three bold lead-ins are look-alike
Unicode letters and paste as they are; `node scripts/style.mjs examples/post.md --plain` removes them.

```text linkedin
A student asked me how to get through technical interviews when their whole portfolio was built with AI help.

They were planning to keep quiet about it.

I told them to do the opposite, and to lead with it.

Most teams that are hiring already use AI to ship. The interviewer isn't checking whether you can type a for-loop from memory. They're checking whether you can be trusted with the decisions the model can't make.

So show them that. Three things I suggested:

𝗕𝗲 𝗮𝗯𝗹𝗲 𝘁𝗼 𝗲𝘅𝗽𝗹𝗮𝗶𝗻 𝗲𝘃𝗲𝗿𝘆 𝗰𝗵𝗼𝗶𝗰𝗲. Why this stack, why this data model, what you gave up. If the model picked it and you can't say why it's right, that's the gap to close before the interview.

𝗧𝗿𝗲𝗮𝘁 𝗽𝗿𝗼𝗺𝗽𝘁𝗶𝗻𝗴 𝗮𝘀 𝘀𝗼𝗺𝗲𝘁𝗵𝗶𝗻𝗴 𝘆𝗼𝘂 𝘀𝘁𝘂𝗱𝗶𝗲𝗱. Read the official prompting docs, and write a prompt the way you'd write an API contract: explicit, structured, easy to check.

𝗕𝘂𝗶𝗹𝗱 𝗼𝗻𝗲 𝗿𝗲𝗮𝗹 𝘁𝗵𝗶𝗻𝗴, 𝘄𝗶𝘁𝗵 𝗿𝗲𝗮𝗹 𝘂𝘀𝗲𝗿𝘀, 𝗶𝗻 𝗼𝗻𝗲 𝗰𝗼𝗱𝗲𝗯𝗮𝘀𝗲. A single repo lets the model see the whole flow in one context window, so what it writes is better. It also gives you a real system to talk about.

Hiding the tool makes it look like you haven't noticed what changed. Explaining how you directed it makes you look like someone who can run a project.

The typing got cheap. The judgement didn't.

If you interview engineers, what do you actually ask now?

#TechCareers #AIEngineering #SoftwareEngineering
```

## X

Post 1 first, then reply to it with each of the others in order. Attach `visual-x.png` to post 1.

```text x
A student asked me how to pass technical interviews when their portfolio was built with AI. They planned to hide it.

That's the wrong way round. Hiding it is what makes you look junior.
---
Interviewers aren't checking whether you can type a for-loop from memory. Their own team ships with AI.

They're checking whether you can make the decisions the model can't.
---
So be able to defend every choice in the repo. Why this stack, why this data model, what you gave up.

If the model picked it and you can't say why it's right, fix that before the interview.
---
Keep the project in one codebase. The model sees the whole flow in one context window, so what it writes is better, and you end up with a real system to talk about.
---
The typing got cheap. The judgement didn't.

Show the judgement.
```

## Visual

| File | For | Shows |
|------|-----|-------|
| `visual-linkedin.png` | LinkedIn, portrait 1080×1350 | what interviews tested then against now |
| `visual-x.png` | X, landscape 1600×900 | the same, attached to post 1 |

Source: `visual.html` (from `templates/visuals/compare.html`).

## Verified facts behind the copy

- The student conversation and the advice given are from Chan's original post. No detail was added.
- "A single repo lets the model see the whole flow in one context window" is Chan's claim from the
  original. It holds for projects small enough to fit; a large monorepo won't.

## Judgement calls made in the copy

- **Four points became three.** "Real projects beat toy projects" and "one codebase" were merged,
  because the reason for both is the same: something real to talk about.
- **Three lead-ins are bold**, one per point, so the points can be found at a glance. Nothing
  else is: not the opening, not the closing line. See `platforms.md` → "Bold on LinkedIn".
- **The horse-and-buggy metaphor is gone**, along with the headline, the emoji numbering and the
  tick-and-cross list. See the "Never" list in `voice.md`.
- **The closing question is addressed to interviewers**, not to everyone. It's one Chan would want
  answered. Alternative: end on "The typing got cheap. The judgement didn't." and stop.
- **"Makes you look junior" appears on X only.** It is blunter than the LinkedIn wording. Soften to
  "makes you look out of date" if that reads as a dig at the student.
