# Event-recap playbook

How to turn an offline tech event into a network-growing LinkedIn recap. The goal is **social-circle
expansion**: credit the right people/orgs accurately, add genuine personal reflection, and tag people
so the post reaches their networks.

## 1. Collect inputs from Chan

Ask for whatever she has (don't block on all of it):
- **Event:** name, date, city/venue, official link or hashtag.
- **People:** speakers, organizers, hosts, MCs, and anyone she spoke with — names as she remembers them.
- **Orgs:** organizing company/community, sponsors, companies whose people presented.
- **Her angle:** 1–2 things that genuinely stuck with her, and any moment she wants to highlight.

## 2. Verify before you mention (user provides → tool verifies)

For each person/org, confirm the public facts so mentions are accurate and tags resolve:
- **WebSearch** the event + person to confirm **exact name spelling, current title, and employer**.
- Use **claude-in-chrome** to open the event page (Luma/Meetup/Eventbrite/LinkedIn event) and the
  person's **LinkedIn profile** to capture the canonical name and profile URL.
- Build a **MENTIONS checklist** and save it to `output/<date>-<slug>/MENTIONS.md`:

  ```
  | Role | Name (as on LinkedIn) | Title @ Company | LinkedIn URL | Tag? |
  |------|-----------------------|-----------------|--------------|------|
  | Speaker | Jane Doe | Staff ML Eng @ Acme | linkedin.com/in/janedoe | yes |
  | Organizer | Auckland AI | (company page) | linkedin.com/company/... | yes |
  ```
- **If a name can't be verified, do NOT invent a profile.** Mention the person by name in plain text
  and flag it in MENTIONS.md as "unverified — confirm before tagging."

## 3. Write the recap

Follow the recap anatomy in `voice-and-structure.md`. Weave mentions into specific credit ("loved
@Jane's talk on …"), never a bare wall of @names. Keep Chan's personal reflection as the spine.

## 4. The @mention mechanics (important)

LinkedIn @mentions are **not** plain text — typing `@Name` only creates a real tag if you pick the
person from the live dropdown **in the composer**. So:
- In `post.txt`, write mentions as plain readable names (e.g. "Jane Doe") and keep the handles in
  `MENTIONS.md`. This is the copy-paste fallback.
- When drafting into the composer via claude-in-chrome (see `SKILL.md`), type the name, **wait for
  the dropdown, and click the matching person/company** so the tag resolves. Verify each chip turns
  blue/linked. Tag only people on the verified list.
- LinkedIn practical caps: keeping it to a **handful of well-chosen tags** reads better and notifies
  the people who matter — don't tag 20 people.

## 5. Etiquette

- Tag people for **genuine credit**, not reach-farming. Over-tagging gets flagged/ignored.
- Get titles/companies right — a wrong title is worse than none.
- Thank organizers and hosts explicitly; they amplify recaps the most.
- Keep it warm and specific. Generic "great event, great people!" recaps don't grow a network.
