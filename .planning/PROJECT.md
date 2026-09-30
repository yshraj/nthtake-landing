# EditTrack — Landing Page

## What

Pre-launch waitlist landing page for EditTrack — a client review, AI feedback, and payment delivery tool for creative freelancers (video editors, motion designers, graphic designers).

### Core product loop

1. Freelancer uploads deliverable → watermarked preview sent via a single link
2. Client reviews the preview (no account required)
3. Client leaves feedback — often vague or contradictory
4. **EditTrack AI intervenes:** checks existing project context (brief, prior decisions, uploaded references, previous comment rounds) → challenges or clarifies vague feedback → presents concrete options → client picks one → output is a clear, decided revision note for the designer
5. Freelancer acts on an unambiguous revision note — not a vague complaint
6. Client approves final version → pays → clean master files unlock instantly

### AI value proposition (distinct from generic "AI summarizes feedback")

The critical insight: client feedback is almost always vague. The AI's job is not to clean up grammar or organize bullet points. It is to catch contradictory or ambiguous feedback *before it reaches the designer's to-do list*, using what was already agreed in the project.

Example: Client says "this color doesn't look right." AI checks the approved brand palette PDF attached to the project, references the V1 approval decision, and responds: "The teal was approved in your V1 review per the brand guide (page 3). Is the palette itself the issue, or how it's applied here?" Then presents 3 concrete options. Client picks one. Revision note is specific and decided.

**Two capability tiers (see saas-info/ai-feature-brief.md):**
- Tier 1 (hackathon MVP, Groq whisper + llama): voice transcription → summarization → numbered revision packet. Does not check project context.
- Tier 2 (product vision): context lookup from project documents → contextual challenge → option presentation → guided choice → revision note. This is the core landing page story.

The landing page should describe Tier 2 as the product, because that is what EditTrack is — not a summarizer. The Tier 1 hackathon infrastructure is an implementation detail, not the value proposition.

## Why

Creative freelancers lose time in feedback hell — vague client notes, back-and-forth clarification, revision confusion. EditTrack cuts that loop by making feedback structured before it reaches the freelancer.

The landing page must make this value obvious, credibly, in seconds — and convert visiting freelancers into waitlist signups.

## Who

**Primary:** Freelance video editors  
**Secondary:** Motion designers, graphic designers, other creative freelancers  
**Tertiary:** Small creative agencies with freelance-style client workflows

Not enterprise. Not agencies with PMs. Solo and small-team creatives who manage client relationships directly.

## What "Done" Looks Like

1. Landing page passes visual review — real product feel, not a template
2. Positioning clearly communicates EditTrack is for creative freelancers
3. Product mockups feel interactive (not static screenshots)
4. Light theme fully functional — no dark-hardcoded remnants
5. All product decisions, copy, pricing language recovered from git history (no invented content)
6. Waitlist signup works end-to-end
7. Build, TypeScript, and lint clean

## Current State (Brownfield)

- Next.js codebase, existing landing page, mid-revamp
- Rebranded from Nthtake → EditTrack (partially complete)
- Light theme revamp in progress — dark-hardcoded colors remain in several components
- Typography system updated (Inter Tight heading, Instrument Serif accent) but font overrides incomplete
- Legacy `nthtake-*` sessionStorage keys still present in closer.tsx
- Product mockups exist but feel static — no real interactivity

## Known Remaining Work

**Light theme color fixes** (documented from prior session):
- testimonial.tsx: marquee gradients, card corner brackets
- hold-to-unlock.tsx: browser chrome bar/dots, corner brackets  
- component-bento.tsx: corner brackets, timecode pill, marker nav buttons
- pricing.tsx: non-popular CTA button bg, price span font
- features.tsx: FeatureCard corner brackets, dot grid
- closer.tsx: dot grid, select option bg, sessionStorage keys nthtake-* → edittrack-*
- template-bento.tsx: TemplateCard corner brackets, wrong content key in body paragraph
- animated-bento.tsx: FeatureCard corner brackets

**Product recovery:**
- Recover pricing language, feature copy, positioning from git history
- Do not invent pricing — read from actual old commits/files only

**Interactive mockups:**
- Make product UI mockups feel real and interactive
- Candidates: editable timelines, cursor interactions, scroll-driven reveals, cards with hover states

## Constraints

- No invented copy, especially pricing — recover from git history only
- No dark-only assumptions — everything must work on light background
- Keep site fast — no heavy animation libraries for decorative effects
- Playwright MCP available for visual review
