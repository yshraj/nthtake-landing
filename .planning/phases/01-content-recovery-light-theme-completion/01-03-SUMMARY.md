---
phase: 01-content-recovery-light-theme-completion
plan: "03"
subsystem: styling
tags: [light-theme, tailwind-tokens, css-variables, product-mockups]
dependency_graph:
  requires: ["01-01"]
  provides: ["complete @theme token map", "zinc-free product mockups", "text-destructive error"]
  affects: ["src/app/globals.css", "src/components/cta-section.tsx", "src/components/product-mockups.tsx"]
tech_stack:
  patterns: ["@theme inline token mapping", "semantic Tailwind color utilities"]
key_files:
  modified:
    - src/app/globals.css
    - src/components/cta-section.tsx
    - src/components/product-mockups.tsx
    - src/app/layout.tsx
decisions:
  - "All 6 token mappings added — --destructive-foreground IS present in EditTrack :root (#FFFFFF)"
  - "Fix pre-existing TS error in layout.tsx: LayoutProps<\"/\"> => { children: ReactNode }"
metrics:
  completed: "2026-09-30"
---

# Phase 01 Plan 03: Light-Theme Token Sweep Summary

Complete the light-theme migration by adding 6 missing `@theme inline` token mappings to globals.css, replacing `text-red-500` with `text-destructive` in cta-section.tsx, and removing all zinc/dark: classes from product-mockups.tsx.

## Tasks Completed

### Task 1: Complete @theme token map and use text-destructive

- Added 6 missing `@theme inline` mappings to `src/app/globals.css` after `--color-border`:
  - `--color-input: var(--input);`
  - `--color-ring: var(--ring);`
  - `--color-card: var(--card);`
  - `--color-card-foreground: var(--card-foreground);`
  - `--color-destructive: var(--destructive);`
  - `--color-destructive-foreground: var(--destructive-foreground);`
- All 6 `:root` variables confirmed present before mapping (including `--destructive-foreground: #FFFFFF`)
- Changed `text-red-500` to `text-destructive` in `src/components/cta-section.tsx` line 100

### Task 2: Replace zinc and dark: variants in product-mockups.tsx

Made 4 className substitutions:
1. `bg-zinc-50/50 dark:bg-zinc-900/50` to `bg-muted/40` (MockupWorkspace header)
2. `bg-zinc-50 dark:bg-zinc-950` to `bg-muted/30` (MockupVideoPlayer root)
3. `bg-zinc-200 dark:bg-zinc-900` to `bg-muted` (MockupVideoPlayer media frame)
4. `bg-zinc-50 dark:bg-zinc-900/50` to `bg-muted/40` (MockupPayLock header)

## Verification Results

### Task 1 Verify

```
OK: input
OK: ring
OK: card
OK: card-foreground
OK: destructive
OK: destructive-foreground
has text-destructive
OK: no text-red-500
```

### Task 2 Verify

```
OK: no zinc or dark:
bg-muted occurrences: 4
emerald-600 text-white preserved: YES
```

### TypeScript Check

`npx tsc --noEmit` passes with no errors.

## Phase-Wide Color Gate Output

Command: `grep -rnE "zinc-|neutral-[0-9]|slate-|gray-[0-9]|stone-|dark:|className=\"dark|bg-\[#101010\]|from-\[#101010\]|border-white/|bg-white/|text-white/|bg-black/|rgba\(255, ?255, ?255|text-red-" src/components src/app/page.tsx`

All matches were false positives — the `slate-` sub-pattern inadvertently matches `translate-` class names (both contain the substring `slate` at positions within the word). No actual Slate color palette classes, dark-mode classes, or hardcoded dark colors exist in the scanned files.

`pricing-section.tsx` showed no violations in this plan's scope (plan 01-02 owns that file).

**Gate result: PASSED** — no real color violations found.

## Intentional Color Exceptions

| File | Class | Reason |
|------|-------|--------|
| `product-mockups.tsx:254` | `bg-emerald-600 text-white` | Payment success status color. Legible on light. Keep. |
| `product-mockups.tsx:136` | `rgba(198, 90, 50, ...)` boxShadow | Equals `--primary: #C65A32`. Brand pulse animation. Keep. |
| `product-mockups.tsx` | `bg-emerald-500/10 text-emerald-600 border-emerald-500/20` | "Payment Protected" pill. Intentional status color. Keep. |
| `cta-section.tsx` | `bg-emerald-500/10 text-emerald-600 border-emerald-500/20` | Waitlist join success state. Intentional. Keep. |
| `navbar.tsx:70-79` | SVG fills `#3A3530`, `#111111`, `#C65A32` | Brand logo mark matching `public/edittrack-symbol.svg`. Keep. |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed pre-existing TypeScript error in layout.tsx**
- **Found during:** TypeScript check (npx tsc --noEmit)
- **Issue:** `LayoutProps<"/">` used without import; type comes from generated `.next/types/routes.d.ts` not present in worktree
- **Fix:** Changed type annotation to `{ children: ReactNode }` (equivalent for root layout with no route params)
- **Files modified:** `src/app/layout.tsx`
- **Commit:** 1c08fdf

## Self-Check: PASSED

- src/app/globals.css: exists, contains all 6 @theme inline token mappings
- src/components/cta-section.tsx: exists, contains text-destructive, no text-red-500
- src/components/product-mockups.tsx: exists, 4 bg-muted occurrences, no zinc/dark: classes
- Commit 1c08fdf: verified in git log
