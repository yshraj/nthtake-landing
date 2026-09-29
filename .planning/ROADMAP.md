# Roadmap: EditTrack — Landing Page Revamp

## Overview

Four-phase revamp of the EditTrack pre-launch landing page. Phase 1 recovers lost product content from git history and completes the light-theme migration. Phase 2 does a Playwright visual audit and tightens freelancer positioning. Phase 3 makes product mockups feel like real interactive UI. Phase 4 ensures clean build, TypeScript, and lint.

## Phases

- [ ] **Phase 1: Content Recovery + Light Theme Completion** - Restore lost product copy from git history; fix all remaining dark-hardcoded colors
- [ ] **Phase 2: Playwright Review + Positioning Pass** - Visual audit at 1440px and 390px; update copy to clearly target creative freelancers
- [ ] **Phase 3: Interactive Mockups** - Make product UI mockups feel real and interactive
- [ ] **Phase 4: Build + QA** - Clean npm build, TypeScript, and lint

## Phase Details

### Phase 1: Content Recovery + Light Theme Completion
**Goal**: Restore all recoverable product content from git history (no invented copy); complete all remaining dark-theme color fixes so the page renders correctly on a light background
**Depends on**: Nothing (first phase)
**Requirements**: REQ-01, REQ-02
**Success Criteria** (what must be TRUE):
  1. No `bg-white/5`, `border-white/40`, `from-[#101010]`, `bg-neutral-950` remain in landing components (except intentionally dark sections like footer)
  2. sessionStorage keys updated from `nthtake-*` to `edittrack-*` in closer.tsx
  3. template-bento.tsx uses correct content key (not site.updates)
  4. Any pricing language, feature copy, or positioning content recovered from git history is documented with its source
**Note (Path B, user-confirmed)**: The new working-tree page is the baseline, and the watermelon template (closer.tsx, template-bento.tsx, etc.) is deleted. Criteria 2 and 3 are satisfied by removal. The recovered copy is kept as `site.takes.body`.
**Plans**: 4 plans

Plans:
- [ ] 01-01-PLAN.md — Commit Path B baseline; remove Nthtake apple-icon; light-palette OG image + themeColor (wave 1)
- [ ] 01-02-PLAN.md — Wire PricingSection to site.pricing (git-history pricing); add site.takes.body; drop unsourced billing claims (wave 2)
- [ ] 01-03-PLAN.md — Light-theme sweep: zinc/dark: -> muted tokens, missing @theme mappings, text-destructive (wave 2)
- [ ] 01-04-PLAN.md — 01-CONTENT-AUDIT.md provenance record + phase-end gate (wave 3)

### Phase 2: Playwright Review + Positioning Pass
**Goal**: Visual audit of full page across desktop and mobile; update hero and feature copy to clearly position EditTrack for video editors and creative freelancers
**Depends on**: Phase 1
**Requirements**: REQ-04, REQ-05
**Success Criteria** (what must be TRUE):
  1. Playwright screenshots at 1440px and 390px show clean layout with no visual regressions
  2. Hero headline names video editors / creative freelancers explicitly or unmistakably
  3. Feature copy uses freelancer vocabulary (revisions, client feedback, delivery) not generic SaaS language
  4. All spacing and responsiveness issues found in Playwright review are fixed
**Plans**: TBD

### Phase 3: Interactive Mockups
**Goal**: At least 2 major product mockup sections have genuine interactive behavior; no new heavy animation dependencies added
**Depends on**: Phase 2
**Requirements**: REQ-03
**Success Criteria** (what must be TRUE):
  1. At least 2 mockup sections have interaction beyond CSS hover (e.g. editable fields, animated state transitions, cursor-driven effects, or scroll-driven reveals)
  2. No new animation libraries added beyond Framer Motion (already installed)
  3. Interactions work on both desktop and mobile
**Plans**: TBD

### Phase 4: Build + QA
**Goal**: Clean passing build, TypeScript check, and lint with zero new errors introduced by the revamp
**Depends on**: Phase 3
**Requirements**: REQ-06
**Success Criteria** (what must be TRUE):
  1. `npm run build` exits 0
  2. `npx tsc --noEmit` exits 0
  3. `npm run lint` exits 0 (or all lint errors are pre-existing and documented)
**Plans**: TBD
