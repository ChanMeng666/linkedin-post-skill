# Event-recap playbook

How to turn an offline tech event into a network-growing recap, mainly for LinkedIn. The goal is **social-circle
expansion**: credit the right people/orgs accurately, add genuine personal reflection, and tag people
so the post reaches their networks.

## 1. Collect inputs from Chan

Ask for whatever she has (don't block on all of it):
- **Event:** name, date, city/venue, official link or hashtag.
- **People:** speakers, organizers, hosts, MCs, and anyone she spoke with — names as she remembers them.
- **Orgs:** organizing company/community, sponsors, companies whose people presented.
- **Her angle:** 1–2 things that genuinely stuck with her, and any moment she wants to highlight.
- **Photos:** file paths, or an explicit "none". **Ask this first** — it decides the entire visual
  branch in `SKILL.md` Step 4, and asking after the copy is drafted wastes a round-trip.

## 2. Verify before you mention (user provides → tool verifies)

**Chan does the tagging, in her own composer.** So your job is not to produce a URL — it's to make
sure she can pick the right human out of a dropdown of identical names. Optimise for that.

For each person/org:
- **WebSearch** the event + person to confirm **exact name spelling, current title, and employer**.
  Watch for name changes — someone who published as one surname five years ago may go by another
  now, and the old name won't resolve.
- **WebFetch** the official event / film / company page for the canonical spelling and the facts you
  plan to state in the copy.
- Note **a distinguishing headline** for each person — the phrase Chan will see in the dropdown that
  separates them from the namesakes. "Producer" vs "Chair of environment charities" is the whole
  game. A name with no distinguishing detail is a half-verified mention.
- **If a name can't be verified, do NOT invent a profile.** Keep the person in the copy as plain
  text and mark them in the mention table as "plain text — no confirmed profile."

This feeds the `## Who to mention` table in `post.md` (see `SKILL.md` Step 5). Do not write a
separate `MENTIONS.md` — one file, one handoff.

### What Chan does with it (so you write the table for the right job)

LinkedIn @mentions are **not** plain text. Typing `@Name` only creates a real tag if you pick the
person from the live dropdown in the composer — a typed `@Name` left unclicked is grey text that
notifies nobody. Chan pastes the copy with plain names, then converts each one. Which means:

- The **"Pick the entry that says"** column is the most valuable thing in your table.
- Explicitly flag near-misses: *"the first Jane Doe in the list is a different person."*
- Keep it to a **handful of well-chosen tags**. Don't hand her a list of 20 people to convert.

### On X

A recap on X is one moment from the night with one photo, not a thank-you list (`platforms.md`).
Mentions there are typed as `@handle`, so the handle itself has to be right: take it only from the
person's own site, LinkedIn profile or GitHub profile, or from the event's official page, and note
which in the table. Two handles at most. No verified handle means the plain name.

## 3. Photos (the real visual)

**If Chan has photos, they are the visual — generate nothing.** A real room, real faces, and a real
whiteboard are what make a recap read as lived rather than produced, and that authenticity is exactly
what earns the reads. No diagram or branded card competes with it. Do not render one "as well".

- **How many:** 1–5. One strong photo beats five mediocre ones; past ~5 the carousel stops being
  scanned.
- **Lead shot:** the one with people and energy in it — the packed room, the speaker mid-gesture, her
  with the people she met. Not an empty stage, not a slide, not a logo backdrop.
- **Read the images.** If Chan gives paths, open them with the Read tool: confirm each exists, then
  propose an order (lead shot → supporting detail → group/closing) and **mine one concrete visible
  detail to work into the copy** — a sketch on the whiteboard, the venue, the size of the crowd, the
  demo on screen. That sentence is what separates the post from a recap template.
- **People in photos:** don't name or tag anyone visible who isn't already in the verified mention
  table (§2's rule applies to photos too). If Chan wants someone credited, verify them first. Group
  shots of a crowd need no naming.
- **Write the order into the `## Photos` section of `post.md`** — position, and one line on what each
  shows — so Chan can attach them in order without re-deciding.
- If Chan says she'll pick and attach her own photos, don't ask for paths. Note the order principle
  and move on.
- **If she has no usable photos:** *offer* a single branded card (a quote or field-note) via
  `references/visuals.md` §3 — offered, not assumed. Text-only is fine too. **Never a diagram.**
- **For X:** name the single strongest photo. Landscape crops best there.

## 4. Write the recap

Follow the recap shape in `platforms.md` and the registers in `voice.md`: a Story spine (what the
night was like and what it changed for Chan) carrying Operator facts (who spoke, what they said,
how many came). Include one honest note if there is one; it makes the praise believable. Weave credit into specific moments ("loved
Jane Doe's talk on …"), never a bare wall of names. Keep Chan's personal reflection as the spine.

**Write names as plain text in the copy — no `@` prefix.** The `@` belongs in the *instruction*
column of the mention table, not in the text Chan pastes: a pasted `@Name` is dead grey text that
looks like a tag that failed. She types the `@` herself when she converts each one.

## 5. Etiquette

- Tag people for **genuine credit**, not reach-farming. Over-tagging gets flagged/ignored.
- Get titles/companies right — a wrong title is worse than none.
- Thank organizers and hosts explicitly; they amplify recaps the most.
- Keep it warm and specific. Generic "great event, great people!" recaps don't grow a network.
- Five names or fewer in the body, each with the thing they did. A longer list of thanks goes in
  one closing sentence or gets cut.
