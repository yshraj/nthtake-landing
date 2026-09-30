# EditTrack AI — Feature Brief

## The Core Insight

Client feedback is almost always vague. "The color doesn't look right." "This feels off." "Make it more professional." These statements are not actionable — and when the designer just accepts them and makes a guess, the revision comes back with the same problem or creates a new one.

EditTrack's AI layer exists to catch this before it becomes a back-and-forth loop. It knows the project. It asks the right question. It makes sure the client actually decides something.

---

## Two Tiers of AI Capability

### Tier 1 — Feedback Packaging (current: hackathon MVP, 9 Sep 2026)

**What it does:**
- Client annotates a preview (image markup: pencil, highlight, text, voice recording)
- Groq `whisper-large-v3-turbo` transcribes voice clips (handles Hinglish)
- Groq `llama-3.1-8b-instant` converts the ramble into a short action summary + client quote
- Output: numbered revision packet (summary + quote + raw audio) sent to the freelancer in one Gmail

**What it does NOT do:**
- Does not know previous project decisions
- Does not challenge contradictory feedback
- Does not ask the client a clarifying question
- Does not present alternatives

**Framing on the landing page:** Do not use Tier 1 as the main AI story. It is infrastructure, not the value proposition. The landing page should describe the vision (Tier 2), not the hackathon summarizer.

---

### Tier 2 — Context-Aware Feedback Conversation (product vision, not yet built)

**The scenario:**
A designer has uploaded V3 of a brand video. Attached to the project are: the original brief, a PDF with approved color palette decisions, and three rounds of prior feedback comments. The client opens the watermarked preview and types: "this background color isn't looking good."

**What Tier 2 AI does:**

1. **Looks up project context.** It reads the attached project documents: the brief, any PDFs, prior decisions logged in comments, or meeting notes uploaded to the project.

2. **Challenges vague feedback with context.** Instead of silently accepting "background color isn't looking good," the AI responds:
   > "The teal background was selected in the V1 review based on the brand guide you shared (see: Brand_Palette_Final.pdf, page 3). Are you saying the palette decision itself needs to change, or is there something about how the color is applied here that feels off?"

3. **Clarifies the actual problem.** The AI asks one focused question (not an open-ended "can you elaborate?"). The question is grounded in the project's history — so it's specific, not generic.

4. **Presents 2–4 concrete alternatives.** Once the client's intent is clearer, the AI presents specific options:
   > "Based on your approved brand colors, here are three directions:
   > A) Swap to the navy from the secondary palette (stays on-brand, stronger contrast)
   > B) Lighten the current teal to 60% opacity (softer feel, same hue family)
   > C) Use the background from V1 (approved version) and revisit this in V4
   > D) Open this to the designer for their suggestion"

5. **Client chooses.** One tap. No ambiguity.

6. **AI converts the choice to a revision note.** The final output to the designer is not the client's original vague comment. It's a clear, decided instruction:
   > **Revision note #2:** Background color — swap teal to navy (secondary palette). Reference: Brand_Palette_Final.pdf page 3, approved secondary color. Rationale: client confirmed the palette is correct; the issue is contrast, not hue family.

**What makes this different from generic AI summarization:**
- It does not just clean up grammar or organize bullet points
- It actively prevents contradictory decisions by referencing what was previously agreed
- It protects the designer from doing work that conflicts with approved decisions
- It protects the client from requesting something they already rejected in a prior round
- The revision note is a decision, not a paraphrase of a complaint

---

## Context Sources (what the AI reads)

When a freelancer creates a project, they can attach:
- **The original brief** (text or uploaded PDF)
- **Reference documents** (approved color palettes, style guides, scripts, brand guides)
- **Meeting notes** (uploaded or pasted text from kick-off calls)
- **Prior revision feedback** (all previous comment rounds are stored per project version)
- **Approved decisions** (explicitly flagged comments or notes marked as "approved")

The AI has access to all of these when a client submits new feedback. This is what allows contextual challenge — the AI is not guessing; it is referencing documented agreements.

---

## Landing Page Framing Guidelines

**Do NOT say:** "EditTrack uses AI to summarize your feedback." (This is Tier 1 — infrastructure, not the value.)

**DO say:** "EditTrack's AI knows your project. When a client's feedback contradicts a decision you already made together, the AI catches it — and helps the client clarify what they actually mean before it reaches your to-do list."

**Do NOT show:** A vague AI chip that turns messy text into a bulleted list.

**DO show:** A conversation between the AI and the client — the vague message, the contextual challenge, the options, the choice, the final revision note.

**Framing for pre-launch page (feature not yet live):**
Describe this as how EditTrack works, not as a feature you can try today. The page is a waitlist page — describing the product vision is appropriate. Do not add disclaimers like "coming soon" unless the product is live with the summarization-only tier. When the page shows this as the product, it should be presented as what EditTrack is, not what it will eventually become.

---

## Example: Full Conversation Flow (for landing page animation)

```
[Designer uploads V3 of brand video]

[Client opens review room — watermarked preview plays]

Client types:
"the background color isn't looking good here"

---

AI responds:
"The teal background was selected in your V1 review based on
Brand_Palette_Final.pdf (page 3). Are you saying the palette
decision needs to change, or is the issue how it's applied in
this scene?"

---

Client:
"i think the palette is fine, it just feels too strong here"

---

AI:
"Got it — the hue is correct but the intensity is the issue.
Here are three directions based on your approved palette:

A  Teal at 60% opacity — same hue, softer
B  Switch to the approved secondary navy — stronger contrast
C  White or light neutral — neutral background, color in type only

Which feels closest to what you're after?"

---

Client selects: A

---

AI produces revision note for designer:
Revision note #2
Background: reduce teal to 60% opacity (scene 1–3)
Rationale: client confirmed approved palette; issue was
intensity, not hue. Reference: Brand_Palette_Final.pdf p.3
```

---

## What to Avoid on the Landing Page

1. Do not show the AI as a chatbot widget — it lives inside the review room, not as a standalone chat product
2. Do not describe it as "AI that edits the design" — it is a feedback facilitator, not a creative tool
3. Do not say "AI writes the revision notes for you" — the designer still does the work; the AI makes the brief clear
4. Do not conflate Tier 1 (summarization) with Tier 2 (contextual conversation) — they are different capabilities; Tier 2 is the core value
5. Do not claim context lookup is live today — it is the product vision; the hackathon MVP only summarizes voice notes
