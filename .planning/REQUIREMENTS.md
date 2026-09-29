# Requirements — EditTrack Landing Page Revamp

## Scope

Full revamp of the EditTrack pre-launch waitlist landing page. Fix dark-theme remnants, recover lost product content from git history, make product mockups interactive, ensure positioning is clear for creative freelancers.

---

## REQ-01 — Recover Product Content from Git History

**Priority:** Critical  
**Constraint:** No invented content. All copy, pricing language, feature descriptions must come from actual git history or existing files.

- Read all prior commits and archived/deleted components for pricing, feature copy, positioning
- Restore any content that was lost in the Nthtake → EditTrack rebrand
- Document what was found, what was changed, what could not be recovered

---

## REQ-02 — Complete Light Theme Migration

**Priority:** Critical  
All dark-hardcoded colors must be replaced. Page must look correct on a white/light background.

Specific items remaining:
- `testimonial.tsx`: `from-[#101010]` gradients → `from-white`; card `border-white/40` → `border-black/12`
- `hold-to-unlock.tsx`: `bg-white/5` + `bg-white/20` → dark-on-light equivalents; `border-white/40` → `border-black/12`
- `component-bento.tsx`: `border-white/40` → `border-black/12`; `bg-white/5` timecode/nav → `bg-black/5`
- `pricing.tsx`: non-popular CTA `bg-white/5` → visible bg; price span `font-sans` → `font-heading`
- `features.tsx`: FeatureCard `border-white/40` → `border-black/12`; dot grid `rgba(255,255,255,0.03)` → `rgba(0,0,0,0.03)`
- `closer.tsx`: dot grid white → dark; `bg-neutral-950` select option; sessionStorage `nthtake-*` → `edittrack-*`
- `template-bento.tsx`: `border-white/40` → `border-black/12`; fix wrong content key (uses site.updates instead of correct key)
- `animated-bento.tsx`: FeatureCard `border-white/40` → `border-black/12`

---

## REQ-03 — Interactive Product Mockups

**Priority:** High  
Current mockups feel static. Make them feel like real product UI without heavy dependencies.

Approaches (pick what fits the existing component structure):
- Editable text in timeline/card UI elements
- Hover/cursor interactions on mockup cards
- Scroll-driven section reveals
- Subtle 3D tilt on product cards
- Animated state transitions in AI feedback demo

Constraint: no new animation library dependencies. Use CSS, Framer Motion (already installed), or vanilla JS.

---

## REQ-04 — Positioning Clarity

**Priority:** High  
Every section must make it clear EditTrack is for creative freelancers — specifically video editors, motion designers, designers.

- Hero headline + subheadline must name the target audience explicitly or implicitly
- Feature copy must use language freelancers recognize ("client feedback", "revisions", "delivery")
- No generic SaaS copy ("streamline your workflow", "collaborate better")

---

## REQ-05 — Playwright Visual Review

**Priority:** High  
Use Playwright MCP to visually review the full page:
- Desktop (1440px) and mobile (390px)
- Scroll through all sections
- Check spacing, responsiveness, animation triggers
- Document findings before making design changes

---

## REQ-06 — Build Cleanliness

**Priority:** Required  
After all changes:
- `npm run build` passes
- `npx tsc --noEmit` passes
- `npm run lint` passes (or all new errors fixed)

---

## Out of Scope

- Backend changes beyond fixing sessionStorage keys
- New product features or pages
- Actual product app (not the landing page)
- Dark mode support (light-only for now)
