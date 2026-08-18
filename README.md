# Jural — landing page (v2)

Second iteration. v1 lives in `../Jural Landing Page` and still runs on **3001**;
this one runs on **3002**. Nothing is shared between them.

```bash
npm run dev     # http://localhost:3002
npm run build
```

Next 16 · React 19 · Tailwind v4 · **motion** (Framer Motion) · TypeScript.

---

## What changed from v1, and why

**v1 transcribed the brief.** Context given to explain the product ("not aimed at
big firms", "say it and approve it") ended up printed on the page as copy, which
both undersold the product and read like notes. v2 argues a position instead:

- The hook is a synthesised market insight — *you bill in six-minute units and
  reconstruct them in hour-long guesses* — not a restatement of features.
- Breadth is shown by following **one matter end to end** (engagement letter →
  work → counsel → signature → paid), not by a grid of feature cards.
- The audience section is gone. Focus is signalled by the writing, not declared.

**Every product visual is coded UI, not a screenshot.** `components/AppUI.tsx`
rebuilds Jural's interface — phone chrome, thread header, bubbles, artifact
cards — so the demos can be driven, animated, and read by a screen reader.

---

## The interactive pieces

| Component | What it does |
| --- | --- |
| `ThreadDemo` | Hero. Four prompts the visitor can run; each returns a **different** record type (time entry, grounded answer with authorities, letter draft, invoice) so breadth is demonstrated by use. |
| `Reel` | One matter followed through five beats. The phone is pinned and its screen changes with scroll. |
| `Graph` | The matter's knowledge graph. Hover or focus a party to isolate what Jural inferred, with relationship labels. |
| `Boundary` | The privacy argument drawn: a file crossing out through vendors, versus a loop that closes inside the device. |

---

## Navigation

The nav carries the five section markers (`01 The premise` … `05 Questions`),
mirroring the numbered structure running down the page, with a scroll-spy that
highlights wherever you are. It measures scroll directly rather than using an
observer so one rule decides the active section at every position: the last
section whose top has passed the reading line.

Section links are hidden below `lg` — five of them will not fit at 375px. If you
want them on mobile later, a sheet triggered from the logo is the natural place.

## Things that are deliberate

**Hero entrance is CSS, not motion.** `<Rise now>` uses a keyframe animation so
the hero — and the LCP heading — paints from server HTML. Below the fold, `Rise`
uses motion's `whileInView`. If the hero waited on an in-view observer it would
sit at `opacity: 0` while JS booted.

**The graph draws statically.** Animating `pathLength` from 0 looks good but
leaves every edge invisible if the animation never runs, and an edgeless graph is
just a scatter of dots. The section fade covers the entrance instead.

**Reel tracking uses plain scroll math, not `requestAnimationFrame`.** rAF is
suspended in a backgrounded tab, so an rAF lock can be taken and never released —
freezing the reel permanently. Five `getBoundingClientRect` reads per scroll
event is cheaper than that risk.

**Two blues.** `--color-ios` (#0a84ff) is the app's real accent, used for dots,
strokes and icons. `--color-ios-deep` (#0a6fd8) backs anything carrying white
text — white on #0a84ff is only 3.65:1. The difference is imperceptible; the
legibility is not.

---

## Verified

Checked at 375 and 1440 with an oklab-aware canvas probe (Tailwind v4 emits
`oklab()`, so naive rgb parsing gives false readings):

- 52 text styles, **zero** WCAG AA contrast failures
- No horizontal scroll, no overflowing elements
- All interactive targets ≥ 44px; inputs 17px (no iOS auto-zoom)
- One `<h1>`; skip link; visible focus rings; full reduced-motion support
- Graph nodes are keyboard-focusable with descriptive `aria-label`s, and the
  whole graph carries a text description for screen readers

---

## Before launch

- [ ] Point `metadataBase` at the real domain
- [ ] Add `opengraph-image.png` in `app/`
- [ ] Connect `app/api/access/route.ts` to a real provider
- [ ] The demo data is fictional (Alvarez, Chen, Draper) — keep it that way
