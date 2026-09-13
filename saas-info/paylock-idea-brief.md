# PayLock — Idea Brief (working name)

**One-liner:** Get-paid infrastructure for Indian freelancers who deliver digital work — the client reviews a watermarked preview, pays via UPI, and the final files unlock automatically. We earn 2–3% per delivery, only when the freelancer gets paid.

**Positioning:** *"Frame.io meets Razorpay — review and get paid in one link."*

**Hackathon slice (9 Sep 2026):** agent across Drive + Gmail + Razorpay Test Mode; optional Canva export; WhatsApp deferred; **PNG/JPG review**; UI = shadcn + Magic UI; **DB + auth = Supabase** (email OTP, one code for sign-in and sign-up). Full decisions in [§14](#14-hackathon-mvp--multi-app-agent-logged-9-sep-2026).

---

## 1. The problem

Freelancers hand over finished work first, then chase payment with zero leverage. Ghosting after delivery is the single loudest freelancer pain we found across every source:

- A single Reddit question about post-delivery ghosting drew **3,200 freelancer responses** ([source](https://dev.to/jaysomani/i-asked-reddit-one-question-3200-freelancers-responded-heres-what-i-built-4ke8)).
- Razorpay's Fix My Itch (50k contributors, India): *"Why do freelancers ghost projects after partial payments without accountability systems?"* — **itch score 76/100** ([source](https://razorpay.com/m/fix-my-itch/)).
- Current "solutions" are behavioral: 25–50% advance, contracts, MSME Samadhaan portal, legal notices — all friction, none automated.

We are **not** solving "freelancers can't find clients" (that's Toptal/marketplaces). We solve "getting paid by clients you already have."

## 2. How it works

1. Freelancer uploads the deliverable (4K video, design files, code) and sets amount → gets one link.
2. Client opens the link: **watermarked streaming preview** (can watch/view everything, can't download) + GST invoice + UPI/card pay button. No signup needed.
3. Payment clears → clean files unlock instantly. Until then, polite auto-reminders on WhatsApp/email — which stop the moment payment lands.
4. Optional: 30–50% advance link to start the project, balance locked at delivery (matches existing Indian freelance culture).

## 3. Why now

- Three independent Indian teams launched adjacent products in the last 12–18 months (see competitor map) — the market is being *discovered right now*, and nobody has won distribution.
- UPI links are now a normal way for Indian clients to pay — the client-side friction that would have killed this in 2019 is gone.
- Western incumbents structurally can't serve India: HoneyBook only supports payments in 4 countries; Gumroad has no UPI.

## 4. Proof people pay for this model

| Evidence | What it proves |
|---|---|
| [Mirian](https://mirian.io/) — same file-lock model, US/Stripe: ~40,000 users, ~$342k/yr est., 5% fee, no funding, 1–10 people | The exact business model sustains a real company at solo scale |
| Instamojo charges 2% + ₹3 and served Indian freelancers/creators for a decade | Indians accept transaction fees on digital delivery |
| Topmate: 300k creators paying 10% commission | Indian professionals accept revenue-share pricing when the tool collects the money |
| Gumroad ~$71k/30d verified (TrustMRR) at ~10% fee | Transaction-fee model scales |

**Why transaction fees beat subscriptions here:** Zoho Invoice is free forever — any subscription invoicing tool dies against it. A 2–3% fee taken from money the freelancer might otherwise never receive is psychologically painless and needs no monthly justification.

## 5. Target niche (first 12 months)

**Indian freelance video editors and designers.**

- Heavy files (multi-GB 4K exports) that generic tools handle poorly.
- Preview/watermark/revision workflow is native to how they already work (they know Frame.io).
- High ghosting exposure: work delivered digitally, easy for a client to vanish.
- Reachable: YouTube/Instagram editing community — and we already produce YouTube content (obliviox), so marketing = content we know how to make.

## 6. Competitor map (verified July 2026)

| Type | Player | Model | Status / weakness |
|---|---|---|---|
| Direct (India) | [Payzowork](https://payzowork.com/) | File-lock link, UPI/cards | Very young 2-person team; generic file lock; claims (2,700 users, 4.9★) unverifiable; testimonials look AI-written; no preview, no GST/TDS depth, no niche |
| Escrow (India) | [TrustWork](https://trustwork.in/) | WhatsApp-native RBI escrow (via Castler); free for freelancer, client pays ₹99 or 2% | Client must lock 100% upfront before work starts — heavy friction for small jobs |
| Escrow (India, funded) | [Trustopay](https://trustopay.in) | Escrow for freelancers + OLX deals + brand collabs; Build3-backed | Unfocused — three markets at once |
| Global direct | [Mirian](https://mirian.io/) | File-lock, 5% fee | Stripe/USD only; no UPI, no GST, no WhatsApp — can't serve India well |
| Global indie | ProposalLock | $29 one-time, LemonSqueezy | Hobby project on a vercel.app subdomain; validates demand |
| Creator storefronts | Instamojo, Topmate, SuperProfile, QwikLink, GenZaic, Ownstreet, Playto | Sell products to many buyers, file delivered after payment | Built for 1-to-many product sales, not 1:1 client-work handoffs; no proposals/milestones/chasing (QwikLink chases brand-deal payments only) |
| Invoicing | Zoho Invoice (free), Refrens (200k+ businesses), Riffit | Invoices + reminders | Reminders without enforcement — no leverage; never compete with them on invoicing |
| Rails (suppliers, not rivals) | Castler, RazorpayX Escrow+, Cashfree, Setu | Escrow/payment APIs | We build *on* these later if we add escrow flows |
| The real incumbent | Habit | Advance + contract + WhatsApp nagging + MSME portal | What ~95% of freelancers do today; our true competition |

**Read on the market:** 3–10 young, weak competitors with no distribution = validation sweet spot, not saturation. But barrier to entry is low and Razorpay/Instamojo could bundle this someday — speed and niche ownership are the defense.

## 7. How we're different (what nobody has built)

1. **Watermarked streaming preview before payment** — client verifies the finished work, *then* pays, *then* files unlock. Fixes the two-sided trust problem. Payzowork/Mirian lock blind; Frame.io reviews but has no payments. This is the killer feature.
2. **Video-grade file handling** — resumable multi-GB uploads, fast CDN delivery. Storefronts are built for PDFs.
3. **Advance + balance flow** — 30–50% advance to start, balance locked at delivery. The middle path between TrustWork (100% upfront, too much friction) and Payzowork/Mirian (0% protection during work). Matches existing behavior.
4. **WhatsApp-native reminders that stop on payment** — Indian clients live on WhatsApp, not email. Kills the emotional labor of chasing.
5. **GST + TDS-aware invoicing** — corporate clients can't pay without a GST invoice; 194J TDS (10%) confuses every freelancer. Auto GST invoice per delivery + TDS-adjusted payout view. Later: auto-FIRA for foreign clients. Zoho invoices without locking; Payzowork locks without compliance. Nobody does both.
6. **Evidence pack** — every delivery builds a timestamped trail (scope, delivery proof, invoice, reminders); one-click PDF export formatted for MSME Samadhaan / legal notice. Turns "payment link" into "protection system" — matching the *accountability* framing in Razorpay's research.
7. **(Year 2) Client payment-behavior score** — "this client paid 14 freelancers on time." Network-effect moat; nobody scores clients today.

Features 1–4 are the launch wedge. 5–7 keep us ahead when copycats notice. The un-copyable part: niche + content distribution ("the tool every Indian editor's favorite YouTuber uses").

## 8. Business model

- **2–3% per successful delivery** (undercuts Mirian's 5%, Topmate's 10%). Free to sign up, no subscription, no client signup.
- Client pays invoice amount; fee deducted from payout (freelancer perceives it as ~₹25 per ₹1,000 recovered).
- Later revenue: premium tier (custom branding, evidence packs, analytics) at flat ₹199–299/mo *optional*; never gate the core loop.

## 9. MVP scope — 3 weeks (product)

This is the **product** v1 after validation — not the Sunday hackathon slice. See §14 for the hackathon agent MVP.

**In:** watermarked streaming preview + locked download; UPI/Razorpay checkout (no client signup); auto GST invoice; WhatsApp + email reminders with auto-stop; advance/balance split; freelancer dashboard (deliveries, payouts).

**Explicitly out of product v1:** full Frame.io-style video timecode comments, TDS dashboard, FIRA, evidence pack, client scores, teams, API.

**Hackathon exception:** **image-only** review with draw / highlight / text / voice, then one **Submit feedback** for many notes (see §14.3). That is not the 3-week Frame.io product. Video review is out of Sunday.

## 10. Validation plan — 2 weeks, before writing product code

1. Landing page pitching the watermarked-preview flow, with real pricing and a "Start free" button (measure clicks to signup, not visits).
2. 50 targeted DMs to Indian video editors/designers (YouTube/Instagram/Discord/WhatsApp groups). Mom Test questions — past behavior only:
   - "When did a client last delay/ghost payment? What did it cost you?"
   - "What do you do today to prevent it?"
   - "Have you heard of Payzowork or TrustWork?" (their reach = our urgency)
   - "What would make you distrust a tool like this?" (adoption objection)
3. Offer a concierge pilot: "I'll run your next delivery through a locked link manually — you pay 2% only if you get paid."

**Kill criteria:** <5% DM reply rate after refining the pitch twice → wrong segment/offer. Zero of 50 willing to try a pilot → kill. **3–5 strangers using the pilot or preordering → build.**

## 11. Risks (honest)

| Risk | Mitigation |
|---|---|
| Low barrier — features copyable in weeks | Niche + content distribution + ship speed; sequence features (evidence pack, client score) |
| Razorpay/Instamojo bundles it someday | Own the niche workflow they won't build (previews, revisions, TDS); be the acquisition target, not the roadkill |
| Freelancer fear of offending clients | Branded premium delivery portal positioning ("your studio portal"), preview-first flow, client pays without signup |
| Habit change (Drive/WeTransfer is free) | Free to use; fee only on success; concierge onboarding for first users |
| Client refuses link payment | UPI links are now mainstream; invoice + GST compliance makes it *easier* for corporate clients, not harder |
| Payment-gateway/KYC dependencies | Razorpay Route/standard merchant flows first; escrow rails (Castler) only if/when needed |

## 12. Realistic money expectations

- Months 0–2: ₹0 (validation + MVP).
- Months 3–6: first paying users; ₹5k–40k/mo if outreach is consistent (50 DMs/week + weekly content).
- Months 12–18: ₹40k–1.5L/mo is a realistic median-good outcome (comps: TrustMRR mid-tail $500–3k MRR).
- Ceiling if distribution compounds: Mirian-scale (~₹15–25L/mo) in 3–4 years.
- Biggest predictor is not the idea — it's consistent distribution effort. (Cautionary comp: Klovio got 3,200 views on its validation post and zero organic signups because it stopped at a landing page.)

## 13. Next actions (product validation)

- [ ] Sign up for Payzowork + TrustWork as a user; note janky flows (20 min).
- [ ] Draft landing page copy (headline, 3 pain bullets, preview-flow demo, pricing, CTA).
- [ ] Build the 50-prospect DM list (editors/designers) + 4-line DM script with the two competitive questions.
- [ ] Ship landing page; start DMs; log replies in a sheet.
- [ ] Decision on day 14 against kill criteria above.

---

## 14. Hackathon MVP — multi-app agent (logged 9 Sep 2026)

**Event:** Multi-App AI Agent Hackathon (Lemma × Comma Capital; judged by Arga Labs). Build an agent that **takes action** across ≥3 external apps. Reliability & evaluation is 25% of the score.

**Framing:** PayLock as a *hosted product* is not an agent. PayLock as an **agent that runs lock → review → chase → unlock** across real apps is the submission.

**One sentence for judges:** *An agent that locks a PNG preview, lets the client mark it (draw, highlight, type, 45s voice → cheap summary), emails the freelancer one numbered packet, then unlocks Drive only after Razorpay test payment — and can prove it did not nag anyone who already paid.*

### 14.1 Why this idea still fits

Fix My Itch: *“Why do freelancers ghost projects after partial payments without accountability systems?”* (itch 76). We solve get-paid-by-clients-you-already-have, not find-clients.

Lemma/Arga will score **silent failures**: the tools return 200 but the agent reminds after pay, unlocks before pay, or treats “I don’t like this” as approval.

### 14.2 Sunday vs 3-week product

| Build on Sunday | Do **not** build on Sunday |
|---|---|
| Agent + tools that write to 3 apps | 4K watermark transcoding / CDN |
| Preview page with download disabled (CSS watermark is enough) | GST/TDS invoices, FIRA |
| **PNG/JPG only:** pencil, highlight, text box, voice → one Submit for many notes | Video, PDF, multi-page editors, live collab |
| Razorpay **Test Mode** Payment Link + signed webhook | Live keys, real money, escrow (Castler) |
| Gmail send via **buttons** (no cron); last sent + last error on the dashboard | WhatsApp, auto 24h/72h reminder jobs |
| Drive view-only → downloadable on pay | Polished marketing site (Magic UI only if leftover time) |
| Optional Canva **export** if OAuth lands in ~1h | Agent *edits* the Canva design |
| ~15 eval cases + traces | Advance/balance split, evidence pack, client scores |

Core loop only:

`ingest → preview_sent → (request_changes ↔ new preview) → approve → paid → unlocked`

### 14.3 Client review & feedback (images only)

MVP previews are **PNG/JPG only**. No video, no PDF markup, no Canva-in-browser editing. Client stays on **our** page (no Canva/WhatsApp install).

Two primary actions on the review page:

- **Submit feedback** → save all notes from this session, email the freelancer a brief, **do not charge, do not unlock**
- **Approve & pay** → Razorpay test link → `payment.captured` → Drive unlocks. Freelancer **Send reminder** button becomes a no-op (disabled + reason).

Approve is disabled (or confirm-walled) if there are unsaved marks. Empty Submit is blocked: “Add at least one note, or approve the preview.”

**Product caution:** unlimited free revisions is how freelancers get unpaid work. Sunday: unlimited change-request rounds on the *preview*; payment still required for the *final file*. Revision caps later.

#### Markup tools (on the image)

Simple toolbar, one tool at a time. Think “markup a screenshot,” not Photoshop.

| Tool | What the client does | What we store |
|---|---|---|
| **Hand / pan** | Move around a zoomed image (esp. mobile) | View state only |
| **Pencil** | Freehand circle/arrow on the problem | Stroke path + color, numbered |
| **Highlight** | Semi-transparent wash over a region (logo, face, text) | Rect or freehand fill |
| **Text box** | Short note on the image (“logo smaller”, “wrong colour”) | `{x,y,w,h,text}` |
| **Pin + voice** | Tap a spot, then record (see limits below) | `{x,y}` + audio + transcript + summary |

Number each mark **1, 2, 3…** on the canvas so the freelancer’s email matches the picture. Client can **undo**, **delete one card**, or **hide/show** a mark before submit. No layers, no brush libraries, no eyedropper.

Zoom + pinch on mobile. Desktop: scroll-wheel zoom, space/hand to pan. Watermark overlay + disable download/right-save as far as the browser allows.

#### Voice → cheap model → summarised feedback

Client opens the image, taps a spot (or uses a global “Record” if they don’t want to aim), holds to record.

**Limits (keep cost and junk down):**

- **Max 45 seconds** per clip (visible countdown). Auto-stop at the cap.
- **Max 3 clips** per Submit (plus any number of pencil/highlight/text marks, cap **8 marks total** per submit).
- Mic permission denied → fall back to text; don’t block the whole review.
- Store the **raw audio** in **Supabase Storage** (freelancer can replay tone/Hindi). Never throw it away after the summary.

**Pipeline (Groq only — locked):**

1. Transcribe: Groq **`whisper-large-v3-turbo`**. Expect **Hinglish**.
2. Summarise: Groq **`llama-3.1-8b-instant`** — ramble → short English action list + one-line client quote.
3. Attach both to that mark. If transcription is empty/garbage, label **“check the audio”** and still send the clip. No OpenAI/Gemini on Sunday.

Example output for one pin:

```text
mark #2 · logo, top-right
quote: "i dont like this, make it smaller"
summary: Reduce logo size ~30%; keep placement top-right.
audio: feedback-v1-mark-2.webm
```

The agent’s job is this packaging — not redesigning the file.

#### One session, many notes, one Submit

UX: add marks **one by one** (smooth, card-stack), send **once**.

1. Client adds a mark (draw / highlight / type / record). A card appears in a side tray (bottom sheet on mobile): *#1 Logo — “make smaller”*.
2. **Add another** — canvas stays, tray grows. No full-page reload.
3. When done, **Submit feedback** (primary). One click sends **all** marks together.
4. After submit: “Sent. The freelancer will upload a new preview.” Pay is still locked. Client can wait; they don’t keep poking a dead form.

Do **not** email the freelancer on every pencil stroke. One agent run per Submit: Drive write + one Gmail.

**What the freelancer gets (one packet):**

- Numbered brief (summaries + quotes)
- Flattened **annotated PNG** (strokes + numbers burned in) so they can open it on WhatsApp later
- `feedback-v1.json` (geometry, transcripts, summaries)
- Audio clips next to the JSON
- Same `delivery_id` + `preview_v1` — v2 uploads must not mix with v1 marks

#### Extra ideas that are worth it (still MVP-shaped)

Keep these if they stay small; they make the demo feel like a real review tool:

- **Must-fix vs nice-to-have** on each card (one tap). Freelancer sorts.
- **Hinglish → English summary**, raw audio kept (Indian clients will not dictate clean English).
- **Multi-image, still images only:** if the delivery is 2–3 stills (e.g. thumbnail + poster), a simple **prev/next** filmstrip. Marks belong to `image_id`. Not a PDF.
- **After submit, client sees their own packet** (read-only) so they trust it landed.
- **Freelancer reply is a new preview upload**, not a comment thread. Sunday is not a chat app.
- **“Looks good except #2”** is still `request_changes` if any mark exists. Approve & pay is a separate, explicit control.

**Out of this feedback MVP:** video timecodes, live cursors, Figma-like components, agent auto-editing Canva, OCR “detect the logo” (optional later), unlimited recording, per-stroke emails.

### 14.4 App decisions (realistic + helpful)

**Rule:** add an app only if it removes a step the user already hates. Do not stack Canva + Figma + Slack as checkboxes. Clients stay on one link.

| App | Decision | Why |
|---|---|---|
| **Google Drive** | **In (must)** | Source for editors / store locked file, preview, pins. View-only share → downloadable on pay. OAuth, free at demo volume. |
| **Gmail** | **In (must)** | Sunday stand-in for WhatsApp. Send preview+pay link, revision brief to freelancer, unlock mail; **stop** the chase on payment. Same GCP project as Drive. |
| **Razorpay** | **In (must), Test Mode** | Account already exists. `rzp_test_…` keys. No real money. Test UPI `success@razorpay` / `failure@razorpay`. Test webhooks. Unlock only after verified `payment.captured` / `payment_link.paid`. |
| **WhatsApp** | **Out for Sunday** | Credits are not the real blocker — Meta/Twilio sender setup is. Production channel later; demo the *auto-stop* behaviour on Gmail. |
| **Canva** | **Nice-if-easy** | Helpful for **designers** (stops WhatsApp-compressed PNG as the delivery channel). Connect API can export PNG/PDF/MP4. Public integration in **draft** = personal demo, no marketplace review. Private integrations need Enterprise — don’t pick Private. Skip if OAuth isn’t up in ~1 hour; freelancer can upload a Canva-exported PNG instead. **Do not** auto-edit the design. |
| **Figma, Slack, Notion, Calendar** | **Out** | Wrong tribe or extra logins. Figma is a later niche. |

**Sunday trio (default):** Drive + Gmail + Razorpay test.

**If Canva OAuth works:** Canva (export preview + HD after pay) + Gmail + Razorpay; Drive still holds locked files / annotations.

**Personas:** designers → Canva as source. 4K video editors → Drive as source. Don’t build both sources this weekend.

### 14.5 How the agent uses the three apps

State machine:

```
draft → preview_sent → paid → unlocked
              ↘ request_changes → preview_vN ↗
```

No overdue cron. Freelancer hits **Send email** when they want.

**Tools (write, not just read):** `create_delivery`, `set_drive_access`, `create_payment_link`, `send_gmail`, `capture_revision` (batch of marks + annotated PNG + audio), `check_payment`, `send_reminder` (no-op if paid).

1. Freelancer: “Lock this Drive file (or Canva design) for Priya, ₹25,000, email priya@…”
2. Drive: preview view-only / no download. Optional Canva: export preview PNG.
3. Razorpay: Payment Link with `delivery_id` in notes (idempotency key). Disabled / unused until Approve if we are still in revision.
4. Gmail: client gets preview URL + (after approve) pay link. Freelancer gets **one** numbered brief + annotated PNG on Submit feedback (not per stroke).
5. Webhook → **re-fetch** payment (don’t trust body alone) → if captured: Drive downloadable, Gmail “unlocked”, disable Send reminder.
6. **Send reminder** (dashboard button): Gmail again **only if** still unpaid. Always write `last_email_at` / `last_email_error`.

Idempotency key = `delivery_id`. Same delivery twice → one link, one unlock.

### 14.6 Integration notes (cost / setup)

**Razorpay — ₹0 demo**

- Dashboard → **Test Mode** toggle. Test Key ID/Secret (`rzp_test_…`).
- Configure a **Test** webhook URL (tunnel to local). Subscribe to `payment.captured` and/or `payment_link.paid`. Verify signature.
- Pay in checkout with UPI VPA `success@razorpay` (success) or `failure@razorpay` (fail). No customer charged, no settlement.
- Do **not** use Live keys on Sunday.

**Gmail — ₹0, no WhatsApp credits**

- One Google Cloud project, OAuth consent **Testing**, add freelancer + fake-client Gmails as test users.
- Scopes with Drive in the same client. Send via Gmail API (or SMTP + app password if API consent is slow).
- Demo line: *“Production is WhatsApp; this build uses Gmail so we could ship reliably today.”*

**Drive — ₹0**

- Same OAuth client. Upload preview + `feedback-*.json` + annotated PNG. Permission flip is the lock.

**Canva — free personal draft; not “easy”**

- [Connect quickstart](https://www.canva.dev/docs/connect/quickstart/). MFA on Canva account. OAuth PKCE, redirect `http://127.0.0.1:…` (`localhost` often blocked).
- Create **public integration in draft** for our own account. Export job → poll → preview PNG; after pay, export PDF/PNG HD.
- Comments-back-into-Canva is a preview API — skip. Client taps happen on **our** page.
- Fallback: upload PNG already exported from Canva; still a 3-app agent.

### 14.7 Reliability evals (show these)

| Case | Agent must |
|---|---|
| Pencil/highlight/text/voice then **Submit feedback** | `request_changes` — no charge, no unlock |
| Three marks, one Submit | **One** Gmail + one Drive packet (not three emails) |
| Voice 45s cap / 4th clip | Reject extra audio; keep other marks |
| Hinglish ramble | Summary + quote + **raw audio** saved |
| Empty Submit | Blocked |
| Unsaved marks + Approve & pay | Confirm or block until save/discard |
| “Looks good” → Approve & pay (no marks) | then Razorpay; unlock only on captured |
| Payment captured | Unlock **once**, email **once**; Send reminder **disabled** |
| Send reminder after pay | No-op (**killer demo**); UI shows why |
| Send reminder while unpaid | One Gmail; update **last sent at**; clear last error |
| Gmail API fails | Do not change delivery status; store **last_email_error** + time |
| Duplicate “send delivery” | Reuse same `delivery_id` / payment link |
| Webhook unsigned / wrong id | Do not unlock |
| Marks on v1 vs v2 | Attach to the active preview only |
| Unpaid | Allow Send reminder; do not unlock |

Log every tool call: input, output, `delivery_id`, decision, confidence.

### 14.8 Two-minute demo script

1. Freelancer locks a **PNG/JPG** preview (Drive, or Canva export).
2. Client opens the Gmail link. Highlights the logo, pencils a circle, types “smaller,” records ~10s Hinglish “yeh pasand nahi.”
3. Cards stack: #1 highlight, #2 pencil+text, #3 voice. **One Submit feedback.**
4. Freelancer Gmail: numbered summary + annotated PNG + audio. File still locked. **No Razorpay charge.** Show that stroke-by-stroke did **not** spam inbox.
5. New preview → Approve & pay → `success@razorpay`.
6. File becomes downloadable. Hit **Send reminder** — it refuses. Dashboard still shows **last email sent at** (and last error if a send failed). Show evals / traces.

### 14.9 Hackathon next actions

- [ ] Google Cloud project: Drive + Gmail OAuth (Testing, test users).
- [ ] Razorpay Test Mode keys + test webhook tunnel.
- [ ] Timebox Canva Connect (1 hour). Keep or drop.
- [ ] Review UI: Konva canvas + pencil / highlight / text / pan + numbered cards.
- [ ] Voice: Groq whisper-large-v3-turbo + llama-3.1-8b-instant; keep raw audio.
- [ ] Tray UX: add many marks → **one Submit feedback** → one Gmail + Drive packet.
- [ ] Dashboard: Send review / Send reminder **buttons**; show last sent at + last send error. No cron.
- [ ] Agent tools + `delivery_id` / `preview_vN` state store.
- [ ] Eval harness for the table in §14.7.
- [ ] UI: init shadcn + Magic UI MCP; daisyUI only as the no-shadcn path (see §14.10).
- [ ] Supabase project: tables + RLS + Email OTP (see §14.11).
- [ ] Groq API key in env (transcribe + summarise).
- [ ] Record demo early (live APIs fail during judging).

### 14.10 UI stack (locked 9 Sep 2026)

Locked libraries: **shadcn/ui**, **Magic UI**, **daisyUI**. 21st.dev and HeroUI are out.

These are **not** three layers in one app. shadcn and daisyUI both own Button/Modal/Drawer. Mixing them = two visual systems.

**Default (React / Next):**

| Layer | Library | Job |
|---|---|---|
| App chrome | **shadcn/ui** | Button, Dialog, Sheet, Tabs, Tooltip, Badge, Card, Toast, toolbar. MCP installs from the registry. Unlimited, MIT. |
| Motion / landing | **Magic UI** | Marquee, glow, bento, etc. Companion to shadcn. ~150+ free; Pro templates not required. |
| Markup canvas | **Konva + react-konva** | Pencil (Line), highlight (translucent Rect), text, pan/zoom. Dynamic import, `ssr: false`. Don’t write a drawing engine. |

**daisyUI:** keep as the **escape hatch** (HTML + Tailwind classes, 68 free components, GitMCP). Use it only if we are *not* on shadcn. Never `btn` + shadcn `<Button>` on the same page.

**MCPs to enable**

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    },
    "magicui": {
      "command": "npx",
      "args": ["-y", "@magicuidesign/mcp@latest"]
    }
  }
}
```

daisyUI free path if needed: GitMCP `https://gitmcp.io/saadeghi/daisyui` (Blueprint is paid — skip).

**Agent rule:** do not invent Button/Dialog/Sheet. Pull from shadcn MCP. Pull marketing motion from Magic UI MCP. Use Konva for the review canvas.

### 14.11 Backend — Supabase (locked 9 Sep 2026)

**Database:** Supabase (Postgres). Source of truth for users, deliveries, preview versions, marks, payment ids, reminder state.

**Auth:** Supabase Auth **email OTP only**. One flow for new and returning freelancers:

1. Enter email → `signInWithOtp({ email })` (`shouldCreateUser: true`, default).
2. Enter 6-digit code → session.
3. No password, no separate sign-up form, no Google/GitHub for Sunday.

Dashboard: Authentication → Providers → Email → enable **OTP** (not magic-link-only). Confirm that new users are created on first OTP.

**Who logs in:** **freelancer only.** Client does **not** create an account (original brief: no client signup). Client opens a **secret review URL** (`/r/<token>`). Token is unguessable, tied to `delivery_id` + `preview_vN`, stored hashed in Supabase.

**Files vs Drive:**

| What | Where |
|---|---|
| Rows, status, Razorpay ids, tokens | **Supabase DB** |
| Preview PNG, annotated PNG, voice clips | **Supabase Storage** (fast for the review page) |
| Final locked file + permission flip | **Google Drive** (the external-app action judges need) |
| Notify freelancer / client | **Gmail** |
| Money | **Razorpay Test** |

Do not put the whole product in Drive. Do not skip Drive either — then we only have two apps.

**RLS (must):** freelancer `auth.uid()` can CRUD own deliveries. Client review page uses a **server** path that checks the token — never a service-role key in the browser.

**Hackathon quota:** free Supabase project is enough (Auth OTP + Storage + DB). Email OTP is free; don’t use phone/SMS OTP.

**Suggested tables (v0):** `profiles`, `deliveries`, `preview_versions`, `feedback_submits`, `marks`, `review_tokens`, `payments`, `email_events` (`sent_at`, `kind`, `error`). No `reminder_jobs` cron table.

**Groq:** `GROQ_API_KEY` in the config module. Transcribe + summarise only — never log audio or transcripts to Splunk-style info logs in production (PII).

### 14.12 Decision log — remaining

Locked: apps, UI kit, Konva canvas, Groq models, image-only review, Supabase DB, email OTP, freelancer-only auth, client magic link, **no auto-reminders**.

**Also locked (9 Sep evening):**

| Topic | Decision |
|---|---|
| Transcribe | Groq `whisper-large-v3-turbo` |
| Summarise | Groq `llama-3.1-8b-instant` |
| Canvas | **Konva + react-konva** (Next `dynamic(..., { ssr: false })`). Pencil / highlight / text / pan. Not Fabric, not a custom engine. |
| Canva | Still **1-hour timebox**; drop if OAuth slips. |
| Reminders | **No MVP cron / 24h / 72h.** Freelancer dashboard: **Send review email** and **Send reminder** buttons. If already `paid`, buttons disabled. Show **last email sent at** (kind + timestamp) and **last send error** if Gmail failed. |
| App framework | **Next.js** (App Router) on **Vercel** |
| Currency / pay | **INR**, Razorpay **platform test keys** |
| Review security | Secret token in URL, expiry ~14 days |
| Env | One config module; Groq + Supabase + Razorpay + Google in env, not scattered reads |

**Still open (small):**

- Name (PayLock is working)
- Team / public GitHub for submission
- Evals as `/demo` page vs `/evals` script — prefer a **page** for the 2-min demo
- Gmail OAuth vs SMTP app password if Google consent is slow (same app, fallback only)

**Explicitly not deciding now:** GST/TDS, WhatsApp WABA, live Razorpay, custom domain, phone OTP, OAuth social login, multi-freelancer teams, Figma, 21st.dev, Vercel Cron.
