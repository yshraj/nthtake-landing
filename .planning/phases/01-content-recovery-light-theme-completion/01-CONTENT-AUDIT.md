# Phase 1 — Content Audit

> REQ-01 deliverable: what was found, what was changed, what could not be recovered.
> Input for Phase 2 positioning pass.

---

## Sources Consulted

| Source | Type | Notes |
|--------|------|-------|
| `17545f8` Initial commit | git | Nthtake brand; original site.ts; watermelon template |
| `53095dd` | git | Early copy iteration |
| `5f01252` Refactor landing page copy and UI for freelance clarity | git | Introduced "freelance clarity" framing |
| `3d59cff` Implement new pricing page and finalize copy for launch | git | Pricing locked: Free $0 / Pro $19 / Agency $49; 0% commission; "simple, flat monthly subscription" |
| `8db8b6b` feat: replace component bento grid with interactive feedback marker interface | git | Last pre-Path-B watermelon commit; closer.tsx, template-bento.tsx still present |
| `c094c0b` chore(01): adopt new landing page as baseline (Path B) | git | New component architecture committed; watermelon deleted |
| `saas-info/landing-content.md` | doc | Product narrative: page flow, waitlist fields, "no subscription / minor monthly fees" |
| `saas-info/paylock-idea-brief.md` | doc | PayLock concept: watermarked streaming preview, locked download, no client signup, client magic link |
| `saas-info/hold-to-unlock.md` | doc | Hold-to-unlock interaction spec |

---

## Pricing (Recovered)

| Plan | Price | Period | Source |
|------|-------|--------|--------|
| Free | $0 | / month | `3d59cff` (site.ts pricing block) + current `src/content/site.ts` |
| Pro | $19 | / month | `3d59cff` (site.ts pricing block) + current `src/content/site.ts` |
| Agency | $49 | / month | `3d59cff` (site.ts pricing block) + current `src/content/site.ts` |

**0% commission** on every plan — confirmed `3d59cff` and current site.ts.

**Fee phrasing history:**
- `3d59cff` FAQ: "We charge a simple, flat monthly subscription to use the platform" (canonical answer to "What does it cost?")
- `3d59cff` pricing body: "Nthtake charges a simple monthly fee. No percentage taken from your client payments."
- Current site.ts pricing.body: "EditTrack charges a minor monthly fee. 0% taken from your client payments — ever."
- `saas-info/landing-content.md`: "No subscription. Minor monthly fees."

Both "minor monthly fee" and "flat monthly subscription" appear in history. Either is sourced. The live FAQ (`faq-section.tsx`) uses "flat monthly fee" which is consistent with `3d59cff`.

---

## Changed In This Phase

- `c094c0b` — Path B baseline: 73 files changed, watermelon template deleted, new component architecture on main
- `e63d9cb` — `apple-icon.tsx` deleted (Nthtake lime `#C8F04A` on `#141414` mark removed)
- `e63d9cb` — `opengraph-image.tsx` updated: `#FCFAF8` bg, `#C65A32` terracotta, `#111111` headline, `rgba(17,17,17,0.6)` subline
- `e63d9cb` — `layout.tsx` themeColor updated to `#FCFAF8`
- `de15543` — `site.takes.body: "Send the take, not a recap."` added (text verbatim from `site.updates.titleBefore + titleAccent`, present since `17545f8`)
- `de15543` — `"AI summaries not included"` moved from Free plan `features` to `excluded: []` (same string, renders with dash not checkmark)
- `de15543` — `excluded: [] as string[]` added to Pro and Agency plans
- `de15543` — `PricingSection` hardcoded `plans` array replaced with `site.pricing` (source of truth, 3d59cff-backed)
- `de15543` — Badge token: `bg-primary text-background` → `bg-primary text-primary-foreground`
- `de15543` — Unsourced footnote "No credit card required for Free. Cancel anytime." removed (git log --all -S lookup returned no matches)
- `27ab962` — `globals.css` @theme block: added 6 missing color mappings (input, ring, card, card-foreground, destructive, destructive-foreground)
- `27ab962` — `cta-section.tsx`: `text-red-500` → `text-destructive`
- `27ab962` — `product-mockups.tsx`: 4 zinc/dark: class replacements (bg-zinc-50/50 → bg-muted/40, bg-zinc-50 → bg-muted/30, bg-zinc-200 → bg-muted, bg-zinc-50 → bg-muted/40)

---

## Rebrand Remnants

`grep -rni "nthtake" src/` — **CLEAN** (no matches).

**closer.tsx sessionStorage keys** (`nthtake-name`, `nthtake-email`, `nthtake-craft`) and **template-bento.tsx** ("NTHTAKE.STUDIO" URL + `site.updates` key misuse): both files were part of the watermelon template deleted in commit `c094c0b` (Path B baseline). Resolution: deletion.

`grep -rn "sessionStorage" src/` — **CLEAN** (no sessionStorage calls in any component).

The recovered body copy ("Send the take, not a recap.") lives on as `site.takes.body`.

---

## Unsourced Copy

Copy introduced in `c094c0b` (Path B baseline). None of it existed before that commit.
`git log --all -S"<string>" --oneline` returned `c094c0b` or nothing for all strings below.
Where `c094c0b` appears, the string was not present before Path B — it was written fresh during the rebrand.

| Component | String | Lookup result | Status |
|-----------|--------|---------------|--------|
| `page.tsx` | "Control delivery, review, and payment in one workflow." | `c094c0b` only | UNSOURCED — REQ-04 candidate |
| `page.tsx` | "Send a watermarked preview. Your client reviews, gives feedback, approves, and pays. The clean files unlock instantly. No client account needed." | `c094c0b` only | SOURCED (concept: `paylock-idea-brief.md` §2; "no client signup needed" confirmed) |
| `page.tsx` | "Join the Waitlist" | `c094c0b` only | UNSOURCED — generic CTA |
| `page.tsx` | "How it works" | `c094c0b` only | UNSOURCED — generic heading |
| `page.tsx` | "A seamless experience for you and your clients." | `c094c0b` only | UNSOURCED — REQ-04 candidate (generic SaaS) |
| `product-showcase.tsx` | "Frictionless Access" (badge) | `c094c0b` only | UNSOURCED — REQ-04 candidate (generic SaaS) |
| `product-showcase.tsx` | "Share securely. No client signup required." | `c094c0b` only | SOURCED (concept: `paylock-idea-brief.md` "no client signup") |
| `product-showcase.tsx` | "Generate a unique, expiring magic link. Your client clicks it and goes straight to the review room." | `c094c0b` only; `paylock-idea-brief.md` has "client magic link" | SOURCED (concept: paylock-idea-brief.md) |
| `product-showcase.tsx` | "Their privacy is protected, and they never have to remember another password." | `c094c0b` only | UNSOURCED — CLAIM, confirm with user |
| `product-showcase.tsx` | "Pinpoint feedback. Keep versions organized." | `c094c0b` only | UNSOURCED — REQ-04 candidate |
| `product-showcase.tsx` | "Clients can point, click, and comment directly on the frame." | `c094c0b` only | UNSOURCED — CLAIM, confirm with user |
| `product-showcase.tsx` | "PayLock Gateway" (badge) | `c094c0b` only; "PayLock" named in `paylock-idea-brief.md` | SOURCED (paylock-idea-brief.md) |
| `product-showcase.tsx` | "Get paid before they get the files." | `c094c0b` only; `5f01252` has "get paid before" concept | SOURCED (`5f01252`) |
| `product-showcase.tsx` | "No more chasing invoices." | `5f01252` has "chasing" concept, `saas-info` has ghosting framing | SOURCED (concept) |
| `product-showcase.tsx` | "The clean, unwatermarked source files are instantly unlocked and delivered the second payment succeeds." | `c094c0b` only | SOURCED (concept: `paylock-idea-brief.md` §2 — "final files unlock automatically") |
| `product-mockups.tsx` | "Expires in 7 days" (magic link mockup) | `c094c0b` only | UNSOURCED — CLAIM, confirm with user |
| `product-mockups.tsx` | "Payment Protected" (pill label) | `c094c0b` only | UNSOURCED — CLAIM, confirm with user |
| `product-mockups.tsx` | "EditTrack Preview" (watermark text) | `c094c0b` only | SOURCED (brand name + watermark concept) |
| `product-mockups.tsx` | "Acme Corp Rebrand — Final Review" (workspace title) | `c094c0b` only | UNSOURCED — placeholder, fine for mockup |
| `trust-section.tsx` | "Your work, protected." | `c094c0b` only | UNSOURCED — REQ-04 candidate |
| `trust-section.tsx` | "100% Confidential" | `c094c0b` only | UNSOURCED — CLAIM, confirm with user |
| `trust-section.tsx` | "We don't use your files for training, and we never expose them to third parties." | `c094c0b` only | UNSOURCED — CLAIM, confirm with user |
| `trust-section.tsx` | "No Public Indexing" | `c094c0b` only | UNSOURCED — CLAIM, confirm with user |
| `trust-section.tsx` | "Expiring Magic Links" | `c094c0b` only; paylock-idea-brief.md has "client magic link" | SOURCED (concept: paylock-idea-brief.md) |
| `trust-section.tsx` | "Control exactly who sees your work and for how long." | `c094c0b` only | UNSOURCED — REQ-04 candidate |
| `trust-section.tsx` | "No Client Accounts" | `c094c0b` only; paylock-idea-brief.md: "no client signup needed" | SOURCED (concept: paylock-idea-brief.md) |
| `trust-section.tsx` | "EditTrack is a tool, not a marketplace." | `c094c0b` only | UNSOURCED — REQ-04 candidate (positioning claim) |
| `faq-section.tsx` | "Does the client pay before they see the work?" | `c094c0b` only | SOURCED (concept: paylock-idea-brief.md — full preview before payment) |
| `faq-section.tsx` | "Do my clients need to create an EditTrack account?" | `c094c0b` only | SOURCED (concept: paylock-idea-brief.md — no client signup) |
| `faq-section.tsx` | "Can't they just screen-record the watermarked preview?" | `c094c0b` only; watermark-screen-record Q was in old FAQ | SOURCED (concept: `saas-info/landing-content.md` FAQ "screen-record") |
| `faq-section.tsx` | "How do revisions work?" | `c094c0b` only | SOURCED (concept: site.ts takes/revisions structure) |
| `faq-section.tsx` | "What does it cost?" answer: "EditTrack takes 0% of your client payments. We charge a flat monthly fee: Free ($0), Pro ($19/mo), or Agency ($49/mo)." | prices from `3d59cff`; 0% from `3d59cff` | SOURCED (`3d59cff`) |
| `faq-section.tsx` | "Are there file size or storage limits?" storage sizes | `3d59cff` site.ts storage values | SOURCED (`3d59cff`) |
| `faq-section.tsx` | "Can anyone else see my work?" answer references "secret link" | `c094c0b` + `saas-info/landing-content.md` "secret link, never indexed" | SOURCED (`saas-info/landing-content.md`) |
| `cta-section.tsx` | "Stop chasing invoices. Start protecting your work." | `5f01252` has "chasing" concept | SOURCED (concept: `5f01252`) |
| `cta-section.tsx` | "Join the waitlist to secure early access. We're rolling out EditTrack to a select group of professional creators." | `c094c0b` only | UNSOURCED — CLAIM, confirm with user ("select group" implies exclusivity gate) |
| `cta-section.tsx` | "No spam. We will only contact you when your account is ready." | `c094c0b` only | UNSOURCED — CLAIM, confirm with user |
| `cta-section.tsx` | "Join Waitlist" (button) | `c094c0b` only | UNSOURCED — generic CTA |

---

## Recoverable Content Not Yet Rendered

`grep -rn "site\." src/components src/app` shows only `site.pricing.*` is consumed.
All other `site.*` keys exist in `src/content/site.ts` but no component renders them.

| site.* key | Content summary | Phase 2 reuse potential |
|------------|-----------------|------------------------|
| `site.hero` | Headline "Control delivery...", body, waitlist CTA labels, error/success strings | Replace page.tsx hardcoded hero copy |
| `site.tools` | Tool names (Premiere, After Effects, DaVinci, Figma, Photoshop, Final Cut) + tagline | Add tools/compatibility section |
| `site.stats` | 3 stats: "0 awkward follow-ups", "0% commission", "100% of your rate" | Add stats bar (was in old site, resonant) |
| `site.how` | 6 step labels: "Send a take", "Client reviews", "AI organises feedback", "One round of changes", "Client approves", "Files unlock" | Replace hardcoded ProductShowcase copy |
| `site.studio` | PayLock demo labels (locked/unlocked, hold label, URL preview) | Wire MockupPayLock labels |
| `site.review` | Feedback problem framing + "review problem" copy | Could anchor a dedicated section |
| `site.unlock` | Unlock success states, billing claim removal | Wire MockupPayLock unlock states |
| `site.takes` | `kicker`, `titleBefore`, `titleAccent`, `before`, `after`, `body` (now present) | Takes/versions section |
| `site.updates` | "Send the take, not a recap." heading structure | Updates section |
| `site.faq` | 7 Q/A pairs (general), 3 pricing FAQs | Replace faq-section.tsx hardcoded `faqs` array |
| `site.closer` | Email + craft waitlist, CTA copy | Wire CtaSection to site.closer |
| `site.voices` | Testimonials (if any) or social proof items | TrustSection or dedicated section |
| `site.footer` | Blurb, nav links, status | Wire Navbar and a footer component |
| `site.nav` | Nav link labels | Wire Navbar links |

---

## Not Recoverable / Removed

These assets were in git history (commits `17545f8`–`8db8b6b`) but deleted in the Path B baseline (`c094c0b`):

| Asset | Restore command |
|-------|----------------|
| `public/takes/01-interview.png` | `git show 8db8b6b:public/takes/01-interview.png > public/takes/01-interview.png` |
| `public/takes/02-macro.png` | `git show 8db8b6b:public/takes/02-macro.png > public/takes/02-macro.png` |
| `public/takes/03-night.png` | `git show 8db8b6b:public/takes/03-night.png > public/takes/03-night.png` |
| `public/takes/04-motion.png` | `git show 8db8b6b:public/takes/04-motion.png > public/takes/04-motion.png` |
| `public/takes/05-studio.png` | `git show 8db8b6b:public/takes/05-studio.png > public/takes/05-studio.png` |
| `public/takes/take-03.mp4` | `git show 8db8b6b:public/takes/take-03.mp4 > public/takes/take-03.mp4` |

**No product copy was lost.** All pre-rebrand copy survives in `site.ts` or in git history. The watermelon-only components (closer.tsx, template-bento.tsx, hold-to-unlock.tsx, etc.) are deleted, but their content keys (`site.closer`, `site.takes`, `site.updates`, etc.) still exist in site.ts and are available for Phase 2.

---

## Phase Gate

Results of running ROADMAP Phase 1 success criteria checks.

| Criterion | Verdict | Evidence |
|-----------|---------|----------|
| 1. No `bg-white/5`, `border-white/40`, `from-[#101010]`, `bg-neutral-950`, `zinc-*`, `dark:` remain in landing components | **PASS** | `grep -rnE "bg-white/|border-white/|from-\[#101010\]|bg-\[#101010\]|bg-neutral-950|zinc-|dark:|rgba\(255, ?255, ?255" src/components src/app/page.tsx` → **no matches** |
| 2. sessionStorage keys updated from `nthtake-*` to `edittrack-*` | **PASS (by removal)** | `grep -rni "nthtake" src/` → **no matches**. `grep -rn "sessionStorage" src/` → **no matches**. `closer.tsx` was deleted in `c094c0b`. |
| 3. template-bento.tsx uses correct content key | **N/A** | `template-bento.tsx` deleted in `c094c0b`. Recovered content lives as `site.takes.body: "Send the take, not a recap."` — confirmed: `grep -n 'body: "Send the take, not a recap."' src/content/site.ts` → match at line 100. |
| 4. Pricing language, feature copy, and positioning content recovered from git history documented with source | **PASS** | See `## Pricing (Recovered)` (source: `3d59cff`) and `## Unsourced Copy` table above. |

**TypeScript:** `npx tsc --noEmit` — **exit 0** (PASS)

**ESLint (src/ only):** `npx eslint src/` — **2 warnings, 0 errors** (PASS for phase gate)
- `src/components/cta-section.tsx:28` — `'err' is defined but never used` (pre-existing, warning only)
- `src/components/product-mockups.tsx:159` — `'handleScroll' is assigned a value but never used` (pre-existing, warning only)

Note: `npm run lint` shows 7 errors but they are in abandoned worktree directories (`/.claude/worktrees/agent-abba0f72*/`) that ESLint traverses because they are inside the project root. These are not in `src/` and will disappear when worktrees are cleaned. Phase 4 (`npm run build`) will confirm final gate.
