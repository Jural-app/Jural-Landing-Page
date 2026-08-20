# Jural

An AI pocket CRM for lawyers. Jural puts a firm's entire practice — matters,
documents, deadlines, drafting, billing and legal research — into a single
chat-style app on the iPhone, driven by an AI model that runs **on the device**.

Jural is in private beta.

---

## What it is

Legal practice management has always been built for firms: browser-based CRMs
with dozens of modules, mandatory fields, and an administrator to configure it
all. That model fails the people it is nominally for. A solo attorney does not
skip a time entry because they don't want the money — they skip it because
recording it costs a laptop, a login and six clicks, and the entry is worth six
minutes.

Jural inverts that. Instead of a system the lawyer operates, it is an
intelligence that operates the system on their behalf. The lawyer says what
happened, or asks what they need to know, in the same register they'd use
messaging a colleague. Jural produces the record, the draft, the answer or the
invoice, and waits for approval.

**It is not an assistant bolted onto a CRM. It is intended to be the CRM.**

---

## Who it's for

- **Solo attorneys and small legal teams**, initially in the **United States**.
- Practices where the person doing the legal work is also the person doing the
  billing, filing and chasing.
- Not aimed at large firms with legal-ops departments. There is no
  implementation project, no rollout, no administrator.

Jural is **lawyer-facing only**. Clients do not have accounts and do not appear
in threads. Client communication happens outside the app through the usual
channels; what leaves Jural are artefacts — an invoice, a letter, a document
sent for signature.

---

## The core interaction

Every task in the app follows the same shape:

1. **Say it.** Type, or hold the mic and talk. No forms, no menus, no syntax.
2. **Jural builds the record.** It returns a real, structured object in the
   thread — a time entry, reminder, invoice, letter draft — already populated
   from what was said and what it knows about the matter. Editable inline.
3. **Approve.** One tap commits it.

**Nothing is billed, filed, sent or signed until a lawyer approves it.** This is
a hard rule, not a setting. It is the trust boundary of the entire product: an
AI acting on a matter is only acceptable if a human signs off on every outward
action.

### Two views of every matter

A case in Jural has two faces and one switch between them:

- **Chat** — where the work happens. Messy, fast, spoken, out of order.
- **The case file** — what the work becomes. Reminders, time logs, documents and
  media, sorted and searchable.

Nobody fills in a form to build the second one. It assembles itself out of the
first. The familiar messaging-app attachment tray is repurposed to hold legal
record types (Photos, Document, Log time, Reminder, Invoice) so the gesture is
one every user already knows.

---

## The intelligence

Two capabilities, equally important:

**It does the work.** Every CRM action, by voice or text.

**It knows the answers.** Jural builds a private knowledge graph of each matter
from the messages and documents in it — people, companies, obligations,
deadlines and the relationships between them — and holds jurisdiction,
procedure and policy knowledge alongside it.

The practical consequence is that answers are specific rather than general. Ask
when a response is due and it counts from the service date in that file. Ask
what was agreed on notice and it quotes the clause. "What's the filing deadline
in this county?" and "log 40 minutes" go into the same box.

Every entity and relationship Jural has inferred is listed in plain language on
the case info screen, and any of it can be swiped away and forgotten. The
memory is inspectable and revocable by the user — not a black box.

---

## Privacy: the defining constraint

**The model runs locally on the iPhone through Apple Intelligence. Client
matters are not uploaded, not queued on a server, and not processed by any
third-party model.**

This is architecture, not policy. It pays off three ways:

- **Privilege survives it.** No third party ever processes a client confidence,
  so there is no vendor DPA to negotiate, no sub-processor list to audit, and no
  breach notification to write about a copy that doesn't exist.
- **No AI surcharge.** Competing tools meter tokens against a paid model API and
  bill it back per seat. Jural has no per-token cost to pass on.
- **Works with no signal.** Courthouse basements, flights, lifts. The
  intelligence is already on the device.

Any feature proposal that requires shipping matter content off the device should
be treated as a change to the product's core premise, not an implementation
detail.

---

## Scope

Shipped or in active development:

| Area | Detail |
| --- | --- |
| Matters | Open cases, set practice area, move through custom stages, filter the list |
| Time capture | Logged by voice or text against a matter, in the moment |
| Billing | Unbilled time → invoice → sent → paid. Stripe for payments |
| Documents | Store, organise, and let the AI read them |
| Drafting | Letters, demands, correspondence, drafted from the matter's own facts |
| Signatures | Send out for signature and track status without leaving the case |
| Reminders & tasks | Dictated, proposed with date/time, approved |
| Research & answers | Case questions and legal questions in one box |
| Reports | Hours, unbilled work, outstanding balances |
| Contacts & clients | Pull from phone contacts; call or message from the case |
| Team | Shared or per-user matter threads; roles and link invites |
| Integrations | Works alongside an existing CRM rather than forcing a migration |

**Planned:** a **Dashboard** giving a whole-practice view, joining the tab bar
as an additional top-level destination.

---

## Teams

Small-team collaboration without enterprise machinery:

- A matter thread can be **shared with the team or kept private** to one user.
- Invite by link; no seat provisioning or onboarding call.
- Roles: **Attorney** (full case and document work), **Paralegal** (create and
  edit), **Viewer** (read-only).
- Practice-level configuration lives under Account: stages, team members,
  practice areas, clients.

---

## Platform

- **iOS only** at present, built in Swift/SwiftUI. Requires an
  Apple-Intelligence-capable iPhone — a direct consequence of the model running
  on-device.
- Follows the system appearance: **light and dark** both supported, per the
  phone's setting.
- **Android is planned after iOS.** The intent is to ship the on-device
  experience properly on one platform rather than a diluted version on two.
- **United States first.** Further jurisdictions to follow.

Current top-level navigation: **Cases · Billing · Account** (Dashboard to join).

---

## Positioning notes

For anyone writing copy, docs or UI text for Jural:

- Lead with **capability and privacy together**. "More capable than the cloud
  tools, at less risk and less cost" is the position. Privacy alone reads
  defensive; capability alone invites the obvious objection.
- **Do not reduce it to voice note-taking.** Time logging is one object type
  among many and the least interesting. The product is the whole practice.
- The familiar chat interface is a **means, not the pitch**. It exists because a
  tool you must decide to open has already lost to the tool that is open.
- Avoid promising specific legal outcomes. Jural surfaces what is in the user's
  files and what the rules say, and it drafts.

### Guardrails

- **Jural does not provide legal advice.** It is practice management software
  for licensed professionals; every output is the lawyer's to review and settle.
- Never imply client data is processed in the cloud, or that any action is taken
  without approval. Both are false and both are load-bearing.
- Pricing is not yet public. The one commitment made so far: **there will be no
  separate AI add-on fee.**

---

## Brand

**Mark.** A paper plane cutting through the bowl of a "J", in a blue gradient
running from deep azure at the stem to cyan at the foot.

**Colour.** Sampled from the mark:

| Role | Value | Use |
| --- | --- | --- |
| Interactive / text blue | `#0C6FC4` | Links, icons, focus, anything under white text |
| Brand azure | `#0A80E7` | Decorative only — see note |
| Brand cyan | `#45C8FB` | Decorative only |
| Deep | `#0667BE` | Gradient anchor |

> The vivid azure `#0A80E7` is only **4.00:1** against white. It fails WCAG AA
> for body text and for white-on-blue buttons. Use the deeper `#0C6FC4` for
> anything that is text or sits beneath text; reserve the bright azure and cyan
> for gradients, glows and large display type.

In-app, the interface uses the iOS system blue (`#0A84FF`) for accents. Filled
surfaces carrying white text should use a slightly deeper blue (`#0A6FD8`) —
visually near-identical, and legible.

**Name.** Jural. Earlier builds carried the working name *LawVenue*; that string
should not appear anywhere.

---

## Demo and screenshot data

Any matter, client or firm name used in marketing material, screenshots or
fixtures must be **fictional**. Real matter names, client names and case numbers
must never appear in a public repository, the App Store listing, or the website.
