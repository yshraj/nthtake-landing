# Phase 1: Content Recovery + Light Theme Completion — Research

**Researched:** 2026-09-29
**Domain:** Next.js landing page brownfield repair (content recovery, Tailwind dark→light color migration)
**Confidence:** HIGH (all findings read directly from committed and working-tree files)

---

## Summary

This phase has two requirements: recover product content from git history (REQ-01) and complete the
light-theme migration by fixing hardcoded dark Tailwind classes (REQ-02).

**Critical pre-condition the planner must resolve first:** The working tree is in a significantly
diverged state from the last commit (HEAD). The HEAD commit has the full watermelon template
(`src/components/watermelon/templates/landing-01/`) as the active page. The working tree has
deleted all watermelon component files and replaced `src/app/page.tsx` with a new component
architecture (`src/components/navbar.tsx`, `product-showcase.tsx`, `pricing-section.tsx`, etc.)
that is already light-theme compatible. Neither the deletion nor the new page.tsx has been
committed. The requirements were written against the watermelon template; the planner must confirm
which version to proceed with before writing tasks.

**Content recovery finding:** Pricing data ($0 Free / $19 Pro / $49 Agency) is confirmed from git
history and is consistent across all commits. The Nthtake→EditTrack rename is complete in
`src/content/site.ts` (current working file). The `closer.tsx` still carries three stale
`nthtake-*` sessionStorage keys. The `template-bento.tsx` uses `site.updates.titleBefore/
titleAccent` as a body paragraph — the correct fix is to add `site.takes.body` to site.ts.

**Primary recommendation:** Confirm working-tree intent (keep new page or restore watermelon), then
apply color fixes and sessionStorage key rename to whichever path is chosen.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| REQ-01 | Recover product content from git history — no invented copy | Pricing confirmed from all 5 commits; see Content Recovery section |
| REQ-02 | Complete light-theme migration — no dark-hardcoded colors remain in landing components | All 8 watermelon component files audited; exact line-level issues documented |
</phase_requirements>

---

## Critical Pre-Condition: Working Tree vs HEAD Divergence

The working tree has **not** committed the following changes:

| File | HEAD state | Working tree state |
|------|------------|-------------------|
| `src/app/page.tsx` | Renders `<Landing01Demo />` from watermelon template | Replaced with 124-line new page using new components |
| `src/components/watermelon/templates/landing-01/**` | 20+ files present | ALL deleted (unstaged) |
| `src/components/{navbar,pricing-section,product-mockups,...}` | Not present | New files present |

The new working-tree components (`pricing-section.tsx`, `product-mockups.tsx`, etc.) use semantic
Tailwind tokens (`bg-background`, `text-foreground`, `border-border`) and are already light-theme
compatible. They do NOT need the REQ-02 color fixes.

**The watermelon components in HEAD do need the REQ-02 fixes.**

The planner must decide — and the plan should have this as its first task (a human checkpoint):
- **Path A:** Discard working-tree changes (`git restore .`), keep watermelon template, apply color fixes to it.
- **Path B:** Stage and commit the new working-tree page, abandon the watermelon template.

The research below covers Path A (the watermelon components) because that is what the requirements
describe. If Path B is chosen, REQ-02 is already satisfied and REQ-01 reduces to a content audit of
the new components.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Theming / color tokens | Frontend (globals.css) | Individual components | CSS custom properties cascade; components must not override with hardcoded values |
| Content / copy | `src/content/site.ts` | Component inline strings | Single source of truth pattern already in use |
| sessionStorage state | Browser/client components | — | Only client components touch sessionStorage |
| Section assembly | `src/app/page.tsx` or `demo.tsx` | — | Page file owns render order |

---

## Content Recovery Findings (REQ-01)

All content found by reading git history directly. Nothing invented.

### Pricing (confirmed across all commits)

Source: `git show HEAD:src/content/site.ts` (and matching data in working-tree
`src/components/pricing-section.tsx`) [VERIFIED: direct file read]

| Plan | Price | Period | Key features |
|------|-------|--------|-------------|
| Free | $0 | / month | 1 active project, 10 GB, 3 takes/revisions, Basic client preview, Feedback, Payment unlock, EditTrack watermark, 0% commission, No AI summaries |
| Pro | $19 | / month | 20 projects, 250 GB, Unlimited takes, Client preview, Feedback, Payment unlock, 100 AI summaries/mo, Custom watermark, 0% commission |
| Agency | $49 | / month | Unlimited projects, 1 TB, Unlimited takes, Client preview, Feedback, Payment unlock, 500 AI summaries/mo, 3 team seats, Custom watermark, Priority support, 0% commission |

Pricing language from site.ts: "EditTrack charges a minor monthly fee. 0% taken from your client
payments — ever."

The pricing section FAQ answer to "What does it cost?" reads: "EditTrack takes 0% commission on
your client payments. We charge a minor monthly fee to use the platform — no percentage of what
you earn." [VERIFIED: direct file read from current site.ts]

### Brand rename status

The `site.ts` (current working file) has been updated: `name: "EditTrack"`. All `site.*` copy
references have been changed from "Nthtake" to "EditTrack". [VERIFIED: direct file read]

Remaining Nthtake references found:
1. `closer.tsx` line 44 — `sessionStorage.getItem("nthtake-name")`
2. `closer.tsx` line 61 — `sessionStorage.setItem("nthtake-email", ...)`
3. `closer.tsx` line 62 — `sessionStorage.setItem("nthtake-craft", ...)`
4. `template-bento.tsx` BrowserMockup URL string — `"[ NTHTAKE.STUDIO / TAKES ]"` (line ~165)

### Template-bento wrong content key

`template-bento.tsx` renders this as a body `<p>` element:
```tsx
{site.updates.titleBefore}
<span className="text-primary">{site.updates.titleAccent}</span>
```
Result: "Send the take, not a **recap.**"

`site.updates` exists in site.ts as a heading-style section entry (titleBefore + titleAccent only,
no `body` key). Using a heading-key pair as body paragraph text is the "wrong key" issue.

**Correct fix** (no invented copy): Add `body: "Send the take, not a recap."` to `site.takes` in
site.ts, then update template-bento.tsx to render `{site.takes.body}` as plain text in the `<p>`.
This recovers the same content (taken directly from `site.updates`) but through a semantically
correct key. [VERIFIED: direct file read, all 5 commits audited for this content]

### Hero and features copy

All hero copy, stats, how-it-works, features, questions/FAQ, voices/testimonials, and footer copy
is present and complete in `site.ts` (current working file). No content was lost in the rename.
The only additions needed are:
- `site.takes.body` (described above)
- Optionally update the template-bento URL string from `NTHTAKE.STUDIO` to `EDITTRACK.COM`

---

## Dark Theme Color Audit (REQ-02)

All issues read directly from HEAD commit files. [VERIFIED: direct file read, `git show HEAD:...`]

All 8 watermelon landing components share the same base dark-theme pattern:
- Section background: `bg-[#101010]` → replace with `bg-background`
- Card containers: `bg-black/40 backdrop-blur-md` → `bg-card backdrop-blur-md` or `bg-background/80`
- Card borders: `border-white/10` → `border-border`
- Card hover: `hover:bg-white/2` → `hover:bg-muted/30`
- Text hierarchy: `text-white/80` → `text-foreground`, `text-white/50` → `text-muted-foreground`, `text-white/40` → `text-muted-foreground/70`
- Separator lines: `border-white/5` → `border-border/30`

**Per-file specifics beyond the base pattern:**

### testimonial.tsx
| Location | Dark class | Light replacement |
|----------|-----------|------------------|
| Marquee fade left | `bg-linear-to-r from-[#101010]` | `bg-linear-to-r from-background` |
| Marquee fade right | `bg-linear-to-l from-[#101010]` | `bg-linear-to-l from-background` |
| FeatureCard corners (×4) | `border-white/40` | `border-border` |
| Platform badge | `border-white/15 text-white/50` | `border-border text-muted-foreground` |
| Avatar bg | `bg-white/5 border-white/20` | `bg-muted border-border` |
| Author text | `text-white/90` | `text-foreground` |
| Handle text | `text-white/40` | `text-muted-foreground` |

### hold-to-unlock.tsx
| Location | Dark class | Light replacement |
|----------|-----------|------------------|
| Browser chrome bar | `bg-white/5` | `bg-muted/50` |
| Browser dots (×3) | `bg-white/20` | `bg-border` |
| TemplateCard corners (×4) | `border-white/40` | `border-border` |
| Hold button | `border-white/20 text-white` | `border-border text-foreground` |
| URL bar text | `text-white/50` | `text-muted-foreground` |
| Hint text | `text-white/40` | `text-muted-foreground` |

### component-bento.tsx
| Location | Dark class | Light replacement |
|----------|-----------|------------------|
| FeatureCard corners (×4) | `border-white/40` | `border-border` |
| Timecode pill | `bg-white/5 border-white/10` | `bg-muted/50 border-border` |
| Timecode icon/text | `fill-white/40 text-white/40` | `fill-muted-foreground text-muted-foreground` |
| Marker nav button (inactive) | `border-white/10 bg-white/5 text-white/40 hover:bg-white/10` | `border-border bg-muted/30 text-muted-foreground hover:bg-muted/60` |
| Comment card bg | `bg-black/80` | `bg-card` |
| Comment card borders | `border-white/10` | `border-border` |
| Grid pattern | `rgba(255,255,255,0.03)` | keep as-is or swap to `rgba(0,0,0,0.03)` |

### pricing.tsx
| Location | Dark class | Light replacement |
|----------|-----------|------------------|
| Non-popular CTA button | `border-white/20 bg-white/5 text-white hover:bg-white/10` | `border-border bg-secondary text-foreground hover:bg-secondary/80` |
| Price `<span>` | `font-sans` | `font-heading` |
| Plan name text | `text-white/80` | `text-foreground` |
| Feature text | `text-white/70` | `text-muted-foreground` |
| Feature label | `text-white/40` | `text-muted-foreground` |
| Target text | `text-white/60` | `text-muted-foreground` |
| Period text | `text-white/40` | `text-muted-foreground` |

### features.tsx
| Location | Dark class | Light replacement |
|----------|-----------|------------------|
| FeatureCard corners (×4) | `border-white/40` | `border-border` |
| Dot grid | `rgba(255,255,255,0.03)` | `rgba(0,0,0,0.03)` |
| Section bg | `bg-[#101010]` | `bg-background` |

### closer.tsx
| Location | Dark class | Light replacement |
|----------|-----------|------------------|
| Dot grid | `rgba(255,255,255,0.03)` | `rgba(0,0,0,0.03)` |
| Select option | `bg-neutral-950` | `bg-background` |
| sessionStorage key (read) | `nthtake-name` | `edittrack-name` |
| sessionStorage key (write) | `nthtake-email` | `edittrack-email` |
| sessionStorage key (write) | `nthtake-craft` | `edittrack-craft` |

### template-bento.tsx
| Location | Dark class | Light replacement |
|----------|-----------|------------------|
| TemplateCard corners (×4) | `border-white/40` | `border-border` |
| BrowserMockup bar | `bg-white/5` | `bg-muted/50` |
| BrowserMockup dots (×3) | `bg-white/20` | `bg-border` |
| Grid pattern | `rgba(255,255,255,0.03)` | `rgba(0,0,0,0.03)` |
| URL string | `"[ NTHTAKE.STUDIO / TAKES ]"` | `"[ EDITTRACK.COM / TAKES ]"` |
| Body text key | `site.updates.titleBefore/titleAccent` | `site.takes.body` (add to site.ts first) |

### animated-bento.tsx
| Location | Dark class | Light replacement |
|----------|-----------|------------------|
| FeatureCard corners (×4) | `border-white/40` | `border-border` |
| FeatureCard container | `bg-black/40` | `bg-card` |
| Section bg | `bg-[#101010]` | `bg-background` |

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content/site.ts          # Single source of truth for all copy
├── app/page.tsx             # Entry point (currently diverged — see pre-condition)
└── components/
    └── watermelon/templates/landing-01/landing/
        ├── *.tsx            # Individual section components (all in HEAD)
```

### Color Token Pattern (globals.css)
The CSS custom properties already defined in `src/app/globals.css`:
```css
:root {
  --background: #FCFAF8;   /* Warm off-white */
  --foreground: #111111;   /* Near black */
  --card: #FFFFFF;
  --border: (set in shadcn layer);
  --muted: (set in shadcn layer);
  --muted-foreground: (set in shadcn layer);
  --primary: #C65A32;      /* Terracotta */
}
```
All components must use semantic tokens, not hardcoded hex or white/black opacity values.

### Content Key Pattern (site.ts)
```typescript
// Existing pattern for all sections:
site.sectionName.kicker     // eyebrow label
site.sectionName.titleBefore // heading before accent
site.sectionName.titleAccent // heading accent word
site.sectionName.body       // body paragraph text (ADD to site.takes)
```

### SessionStorage Key Pattern
After rename, consistent prefix: `edittrack-*`
```typescript
// closer.tsx — three keys to update:
sessionStorage.getItem("edittrack-name")    // was nthtake-name
sessionStorage.setItem("edittrack-email", email)  // was nthtake-email
sessionStorage.setItem("edittrack-craft", craft)  // was nthtake-craft
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Section color tokens | Hardcoded hex in component JSX | CSS custom properties in globals.css + semantic Tailwind classes | Already set up; adding hardcoded values creates future regressions |
| Copy management | Inline strings in component files | `src/content/site.ts` | Already the project pattern |

---

## Common Pitfalls

### Pitfall 1: Missing `demo.tsx` class attribute
**What goes wrong:** `demo.tsx` has `<main className="dark min-h-dvh ... bg-[#101010]">`. After fixing all section backgrounds to `bg-background`, the `dark` class on `<main>` will force Tailwind's dark variant and re-enable dark-mode values on components that use the `dark:` variant. Additionally the `bg-[#101010]` on `<main>` itself is not in the audit list but must be removed.
**How to avoid:** Include `demo.tsx` in the light-theme audit. Remove the `dark` className and the hardcoded `bg-[#101010]` from `<main>`.

### Pitfall 2: Component-level `dark:` variants triggered by `.dark` class
**What goes wrong:** The `@custom-variant dark (&:is(.dark *));` in globals.css means any element inside a `.dark`-classed ancestor gets dark overrides. If `demo.tsx` keeps `className="dark ..."`, the semantic token values switch to dark-mode values and appear broken even after fixing hardcoded colors.
**How to avoid:** Remove the `dark` class from `demo.tsx`'s `<main>` as part of REQ-02.

### Pitfall 3: sessionStorage key mismatch across components
**What goes wrong:** `closer.tsx` writes `edittrack-email` and `edittrack-craft` but the `hero.tsx` waitlist form may still read `nthtake-*` keys (if not audited). Any cross-component session reads will return null.
**How to avoid:** Search all component files for `nthtake-` before closing REQ-01.

### Pitfall 4: Hardcoded `font-sans` on price
**What goes wrong:** The price `<span>` in pricing.tsx uses `font-sans` which maps to Inter Tight — a body font. Requirements specify `font-heading` for price display.
**How to avoid:** Change `font-sans` to `font-heading` on the price span only.

### Pitfall 5: New working tree files broken if switching to Path A
**What goes wrong:** `src/app/page.tsx` in the working tree imports `MockupWorkspace`, `Navbar`, etc. from `src/components/`. If Path A (restore watermelon) is chosen, these new component files can stay but `page.tsx` must revert to `import Landing01Demo`.
**How to avoid:** The plan's first task is the Path A/B decision checkpoint.

---

## Runtime State Inventory

> Not a rename/refactor phase beyond sessionStorage key changes.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None identified | — |
| Live service config | None identified | — |
| OS-registered state | None identified | — |
| Secrets/env vars | `sessionStorage` keys `nthtake-name`, `nthtake-email`, `nthtake-craft` — client-side only, no server secrets | Code edit in closer.tsx (3 lines) |
| Build artifacts | None identified | — |

---

## Environment Availability

> Step 2.6: SKIPPED — no external dependencies beyond Node.js and the already-installed package
> set. Phase is code/content edits only.

---

## Package Legitimacy Audit

> No new packages are installed in this phase. All edits are to existing source files.

---

## Open Questions (RESOLVED)

1. **Path A vs Path B: which version of the page to keep?**
   - What we know: Working tree has fully replaced the watermelon template with new components. HEAD has the watermelon template with 20+ component files. The requirements reference the watermelon components.
   - What's unclear: Was the working-tree replacement intentional and the requirements are stale, or should the working tree be discarded?
   - Recommendation: Make this the first (human checkpoint) task in the plan. Document both options. The planner cannot proceed with detailed tasks until this is resolved.
   - RESOLVED: User confirmed Path B — keep new working-tree page.tsx as baseline. Plan 01-01 commits this baseline. Watermelon template files are deleted; all plans target new Path B component set.

2. **`site.takes.body` content**
   - What we know: The body text "Send the take, not a recap." exists in `site.updates.titleBefore/titleAccent` and has been there since the initial commit. It is the intended body copy for the takes section.
   - What's unclear: Should it stay as-is (combined heading words) or be rewritten as a full sentence?
   - Recommendation: Add `body: "Send the take, not a recap."` to `site.takes` — this is exactly the existing text, properly promoted to a body key. No new copy invented.
   - RESOLVED: Plan 01-02 Task 1 adds `body: "Send the take, not a recap."` to `site.takes` in site.ts. Exact text sourced from existing `site.updates.titleBefore/titleAccent` — no new copy invented.

3. **Hero.tsx sessionStorage usage**
   - What we know: `closer.tsx` reads `nthtake-name` from sessionStorage. Hero.tsx may write it.
   - What's unclear: Not audited. `hero.tsx` is in HEAD (watermelon) — need to confirm which keys it writes.
   - Recommendation: Add a task to grep all watermelon components for `nthtake-` before finalizing the sessionStorage rename.
   - RESOLVED: Moot under Path B. Both `closer.tsx` and `hero.tsx` are watermelon template files deleted by the baseline commit in Plan 01-01. No sessionStorage rename needed — the files are gone.

---

## Validation Architecture

> `workflow.nyquist_validation` is not set in `.planning/config.json` — treated as enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no jest.config, vitest.config, pytest.ini, or `__tests__` directory found |
| Config file | None — Wave 0 gap |
| Quick run command | N/A until framework installed |
| Full suite command | N/A until framework installed |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| REQ-01 | Pricing data matches git history values | manual | N/A — visual/grep check | ❌ |
| REQ-01 | No `nthtake-*` sessionStorage keys in source | automated grep | `grep -r "nthtake-" src/` | N/A (bash) |
| REQ-02 | No `border-white/40`, `bg-white/5`, `from-[#101010]`, `bg-neutral-950` in landing components | automated grep | `grep -r "border-white/40\|bg-white/5\|from-\[#101010\]\|bg-neutral-950" src/components/watermelon/` | N/A (bash) |
| REQ-02 | `site.takes.body` key exists in site.ts | automated grep | `grep "takes.body\|body:" src/content/site.ts` | N/A (bash) |

### Wave 0 Gaps
- No test framework installed. For this phase (color string replacements + content key fixes), post-edit grep checks are the practical verification. No unit tests needed for string substitutions.
- Visual review is deferred to Phase 2 (Playwright).

---

## Security Domain

> These changes are static content and CSS class fixes with no authentication, session, or input handling changes beyond the sessionStorage key rename. ASVS categories V2–V6 do not apply to this phase.

The sessionStorage rename (nthtake-* → edittrack-*) is a client-side cosmetic fix; sessionStorage is not used for auth or access control.

---

## Sources

### Primary (HIGH confidence — direct file read from committed and working-tree files)
- `git show HEAD:src/content/site.ts` — pricing, copy, brand name, section structure
- `git show HEAD:src/components/watermelon/templates/landing-01/landing/*.tsx` — dark color patterns
- `git show 17545f8:src/content/site.ts` — initial commit site.ts for content archaeology
- `src/app/globals.css` (working tree) — CSS custom property tokens
- `src/app/page.tsx` (working tree) — confirms working tree divergence
- `src/components/pricing-section.tsx` (working tree) — confirms pricing data consistency

### Secondary
- None needed — all findings are from direct source reads.

---

## Metadata

**Confidence breakdown:**
- Content recovery: HIGH — all data read directly from git history, no inference
- Dark color audit: HIGH — all patterns read from committed component files, line numbers documented
- Working tree divergence: HIGH — confirmed via `git diff HEAD` and direct file reads
- Validation architecture: MEDIUM — no test infra exists; grep-based verification is the practical approach

**Research date:** 2026-09-29
**Valid until:** 2026-10-29 (stable codebase — no fast-moving dependencies in scope)
