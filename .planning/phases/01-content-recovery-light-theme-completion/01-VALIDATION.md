---
phase: 1
slug: content-recovery-light-theme-completion
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-09-30
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no jest.config, vitest.config, pytest.ini, or `__tests__` directory in project |
| **Config file** | None — Wave 0 gap: no test framework installed |
| **Quick run command** | `grep -r "border-white/40\|bg-white/5\|from-\[#101010\]\|bg-neutral-950\|nthtake-" src/` |
| **Full suite command** | `npx tsc --noEmit && npm run lint` |
| **Estimated runtime** | ~10 seconds |

> No test framework installed. Phase is CSS class string replacements and content key fixes. Automated grep-based verification is the practical approach for this phase. Visual review deferred to Phase 2 (Playwright).

---

## Sampling Rate

- **After every task commit:** Run `grep -r "border-white/40\|bg-white/5\|from-\[#101010\]\|bg-neutral-950\|nthtake-" src/`
- **After every plan wave:** Run `npx tsc --noEmit && npm run lint`
- **Before `/gsd:verify-work`:** Both commands must exit clean
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 01-01-T1 | 01-01 | 1 | REQ-01, REQ-02 | — | N/A | grep | `git status --short src/ public/ tsconfig.json` | N/A (bash) | ⬜ pending |
| 01-01-T2 | 01-01 | 1 | REQ-01, REQ-02 | — | N/A | grep | `grep -r "nthtake\|Nthtake\|#C8F04A\|#141414" src/app/apple-icon.tsx 2>/dev/null; test $? -ne 0 && echo PASS` | N/A (bash) | ⬜ pending |
| 01-02-T1 | 01-02 | 2 | REQ-01 | — | N/A | grep | `grep "takes" src/content/site.ts && grep "body" src/content/site.ts` | N/A (bash) | ⬜ pending |
| 01-02-T2 | 01-02 | 2 | REQ-01, REQ-02 | — | N/A | grep | `grep "site\.pricing\|Free.*0\|19.*month\|49.*month" src/components/pricing-section.tsx` | N/A (bash) | ⬜ pending |
| 01-03-T1 | 01-03 | 2 | REQ-02 | — | N/A | automated | `grep "text-destructive" src/components/cta-section.tsx; grep -v "text-red-500" src/components/cta-section.tsx` | N/A (bash) | ⬜ pending |
| 01-03-T2 | 01-03 | 2 | REQ-02 | — | N/A | automated | `grep -r "bg-zinc\|dark:" src/components/ 2>/dev/null; test $? -ne 0 && echo PASS` | N/A (bash) | ⬜ pending |
| 01-04-T1 | 01-04 | 3 | REQ-01, REQ-02 | — | N/A | automated | `grep -q "## Sources Consulted" .planning/phases/01-content-recovery-light-theme-completion/01-CONTENT-AUDIT.md && echo PASS` | ❌ | ⬜ pending |
| 01-04-T2 | 01-04 | 3 | REQ-01, REQ-02 | — | N/A | automated | `npx tsc --noEmit && npm run lint` | N/A (bash) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No test framework needed for this phase. All verification is grep-based on string patterns in source files. Existing infrastructure (TypeScript, ESLint) covers structural correctness.

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Pricing copy matches git history values (Free $0 / Pro $19 / Agency $49 / 0% commission) | REQ-01 | Visual confirmation needed — pricing display is a render concern | After running 01-02, start dev server and visually confirm pricing cards show correct values |
| OG image shows terracotta `#C65A32` not purple `#4928FD` | REQ-02 | OG image is a React component rendered to PNG — needs visual check | After 01-01, run `npm run build` and check `/opengraph-image` route |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or bash grep commands
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (no test framework needed — grep-based sufficient)
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending execution
