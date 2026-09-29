# EditTrack — Landing Page

## What

Pre-launch waitlist landing page for EditTrack — a client communication and project feedback tool for creative freelancers (video editors, motion designers, graphic designers).

The product connects freelancers and their clients through AI-mediated feedback: clients submit vague notes, AI clarifies and structures them, freelancers receive organized revision tasks. Core loop: add project → client reviews → AI facilitates clear feedback → freelancer acts.

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
