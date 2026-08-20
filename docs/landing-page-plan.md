# Jural Landing Page: Build Plan

Source of truth: `Jural-Blueprint.pdf` + the elevator pitch.
Status: outline agreed, awaiting Mobbin visual references per section.

## The argument the page makes

Hero provokes → Problem names the pain → Pillars answer in three lines →
**Chat section delivers the thesis** → Solution proves it with real screens →
AI explains how it's possible → Security explains why it's safe →
Native says where it lives → CTA closes.

## Open decisions

- **Social proof**: `Clients.tsx` (Marbrook / Northgate / Pearce Legal) and the G2
  "Top 25 Legal Products" badge appear invented. Confirm real or cut. Fabricated
  proof on a live site aimed at attorneys is a credibility and legal risk.
- **Pricing**: skipped this pass. Slot reserved. Nav points at demo CTA.

## Claim guardrails

- SOC 2 is on the **Sprinto track**, not certified. Never claim certification.
- Trust center is **in progress**.
- App Store release is **roadmap**, not shipped.

---

## Sections

### 1. Header ✅ exists
No change.

### 2. Hero ✅ exists
"Forget Traditional CRM. Just Start Talking."

### 3. Social proof strip: decision needed
If nothing real: cut, replace with a verifiable credibility bar,
"Signal-protocol encryption · Stripe Connect payouts · ESIGN/UETA e-signatures."
*Mobbin: logo bar / trust bar.*

### 4. The Problem (`#problem`): NEW
The decade-long pattern: lawyers paying for CRMs and still asking for custom ones.
It was never cost or privacy, it was **usability**. Hundreds of features, a
fraction used. The lawyer is not at a desk.
Lands on the Clio contrast: form-heavy, desktop-era, per-seat, takes a cut.
*Mobbin: problem/solution split, before-after, comparison table.*

### 5. Pillars ✅ exists: move to sit after the Problem
Pocket / conversation / private. The three-line answer.

### 6. Chat as the interface: NEW ★ THE THESIS SECTION
**The most important new section on the page.**

Not "we have a chat feature". The claim is: **the conversation IS the app.**

Three beats:

1. **Nothing to learn.** Legacy CRMs make you learn 100 features to use five.
   Jural asks you to do the one thing you already do a hundred times a day: type
   a message. Zero learning curve is the answer to the usability problem raised
   in section 4, this section is the payoff to that setup.
2. **Say it, and it happens.** The thread is the control surface, not a message
   log. "I need to bill the client" returns a live **invoice card** in the
   thread, email, rate, line items, Create & send. Not a navigation to a
   Billing module and a twelve-field form. Say it by voice and it still works.
   Reminders come back as cards with an **Approve** button.
3. **The thread remembers.** Every message and document quietly builds the case
   knowledge graph, parties, relationships, dates, on-device. Ask the thread
   a question and it answers from the real case, or says **"not on file"**
   rather than guessing.

Contrast device worth building: *legacy*, Billing → New Invoice → 12 fields →
Save. *Jural*, one sentence.

Assets: `thread.png` is the hero shot (invoice card + voice note + reminder card
in one scroll). `knows.png` backs beat 3 (What Jural knows / Relationships,
"built on-device from your messages and documents").

*Mobbin: chat/messaging UI showcase, annotated screenshot with callouts,
scroll-triggered conversation replay, side-by-side old-way/new-way.*

### 7. Our Solution (`#solution`): NEW
Alternating feature blocks. Now **proof** for the thesis above, not the place
the thesis is made.
- **AI intake, no forms**: adaptive interview, requests docs mid-interview,
  auto-writes the case title. → `newcase.png`, `caseinfo.png`
- **It reads your documents**: on-device extraction + OCR, RAG retrieval,
  digested into parties/dates/amounts. → `attach.png`
- **Keep 100% of what you bill**: Stripe Connect, firm is merchant of record,
  **0% taken**. Sharpest price story. → `billing.png`
- **Compact grid** for the rest: e-signatures, time & tasks, parties graph,
  follow-up assistant, Zoom, document generation. → `cases.png`, `casefile.png`,
  `roles.png`

*Note: "Every case is a conversation" moves OUT of here and INTO section 6.*

*Mobbin: alternating feature sections with device mockup, sticky scroll
showcase, bento grid.*

### 8. How the AI works: NEW
Hybrid: on-device for private work, cloud only for hard generation, sends
extracted text, retains nothing. Case memory reconciles facts with provenance
rather than overwriting. "Structure beats the model."
*Mobbin: how-it-works, numbered steps, architecture diagram.*

### 9. Security ✅ exists: move here, extend
Layer table: documents / AI / chat / sync / app access / auth.
Honest status line on the trust center.
*Mobbin: security section, encryption explainer.*

### 10. Native iPhone + Mac: NEW
Real macOS, not Catalyst. Not a web wrapper. Shared core, native chrome.
*Mobbin: platform showcase, download/app section.*

### 11. Pricing: SKIPPED, slot reserved

### 12. FAQ (`#resources`): NEW
Where does my data live? Can my paralegal collaborate? Do you see my client
documents? What happens if I leave? Is it really 0%?
*Mobbin: FAQ accordion.*

### 13. Final CTA: NEW
"Get 14 Days Demo", matching the header.

### 14. Footer: NEW
Page currently just ends. Product / company / legal columns.
Live subdomains: `trust`, `status`, `portal`.
*Mobbin: large sitemap footer.*
