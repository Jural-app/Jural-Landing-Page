"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Artifact, Composer, Phone, Row, ThreadHeader } from "./AppUI";

/**
 * One matter, followed end to end. The phone is pinned and its screen changes
 * as each beat scrolls into view — breadth shown as a story rather than a grid
 * of feature cards.
 */

const BEATS = [
  {
    n: "01",
    tag: "Intake",
    h: "A matter opens itself.",
    p: "Forward the engagement letter and Jural reads it — parties, opposing counsel, the fee arrangement, the limitation date. The file exists before you have decided what to call it.",
    screen: <IntakeScreen />,
  },
  {
    n: "02",
    tag: "The work",
    h: "The record writes itself as you go.",
    p: "A hearing, a call in the car, a photograph of a filed copy. You say what happened in the words you would use to a colleague, and it lands in the file as structured, billable, searchable record.",
    screen: <FileScreen />,
  },
  {
    n: "03",
    tag: "Counsel",
    h: "It answers from the file and from the law.",
    p: "Not a chatbot with your documents bolted on. Jural holds the matter and the rules that govern it at once, so the answer arrives with the deadline already calculated and the authority attached.",
    screen: <AskScreen />,
  },
  {
    n: "04",
    tag: "Output",
    h: "It drafts, and it sends for signature.",
    p: "Letters, demands, engagement terms — drafted from the facts already in the file, in the voice you have been writing in all year. Out for signature without opening anything else.",
    screen: <SignScreen />,
  },
  {
    n: "05",
    tag: "Money",
    h: "The bill is already written.",
    p: "Every minute you narrated became an entry. February invoices itself, goes out, and gets paid — while the work is still fresh enough to defend line by line.",
    screen: <PaidScreen />,
  },
];

export function Reel() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Whichever beat's centre is nearest the viewport centre wins.
    //
    // Measured straight from the scroll handler rather than behind a
    // requestAnimationFrame lock: rAF is suspended in a backgrounded tab, so
    // the lock can be taken and never released, freezing the reel. Five
    // getBoundingClientRect reads per scroll event is not worth that risk.
    const measure = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive((prev) => (prev === best ? prev : best));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24">
      <div>
        {BEATS.map((b, i) => (
          <div
            key={b.n}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex min-h-[46vh] flex-col justify-center py-7 lg:min-h-[56vh]"
          >
            <div className="flex items-center gap-3">
              <span className="num text-[11px] text-[color:var(--color-chalk-3)]">{b.n}</span>
              <span className="h-px w-8 bg-[color:var(--color-rule-dark)]" />
              <span className="mono text-[color:var(--color-chalk-3)]">{b.tag}</span>
            </div>

            <motion.h3
              animate={{ opacity: active === i ? 1 : 0.28 }}
              transition={{ duration: 0.45 }}
              className="d3 mt-5 max-w-[16ch] text-[color:var(--color-chalk)]"
            >
              {b.h}
            </motion.h3>

            <motion.p
              animate={{ opacity: active === i ? 1 : 0.22 }}
              transition={{ duration: 0.45 }}
              className="mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-[color:var(--color-chalk-2)]"
            >
              {b.p}
            </motion.p>
          </div>
        ))}
      </div>

      {/* Pinned device */}
      <div className="hidden lg:block">
        <div className="sticky top-1/2 -translate-y-1/2" data-active={active}>
          <Phone width={306}>
            {/* Keyed fade rather than AnimatePresence: `mode="wait"` holds the
                incoming screen until the outgoing one has finished exiting,
                which visibly lags when you scroll quickly through the beats. */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {BEATS[active].screen}
            </motion.div>
          </Phone>

          <div className="mt-6 flex justify-center gap-1.5">
            {BEATS.map((b, i) => (
              <span
                key={b.n}
                className="h-[3px] w-7 rounded-full transition-colors duration-300"
                style={{ background: i === active ? "var(--color-ios)" : "rgba(255,255,255,.16)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* On small screens the phone travels with each beat instead */}
      <div className="lg:hidden">
        <Phone width={286} className="mx-auto">
          {BEATS[active].screen}
        </Phone>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- screens */

function Frame({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <>
      <ThreadHeader title={title} sub={sub} />
      <div className="flex h-[402px] flex-col gap-2.5 bg-black px-3 py-3">{children}</div>
      <Composer />
    </>
  );
}

function IntakeScreen() {
  return (
    <Frame title="Chen, Ada" sub="2026-0121 · Commercial">
      <div className="mt-auto space-y-2.5">
        <p className="mono text-[9px] text-white/55">Read engagement-letter.pdf</p>
        <Artifact kind="New matter" title="Chen — unpaid invoices" accent="#30d158" action="Open matter">
          <Row k="Client" v="Ada Chen" />
          <Row k="Opposing" v="Whitfield Ltd" />
          <Row k="Fee" v="Hourly · $340" />
          <Row k="Limitation" v="14 Nov 2028" strong />
        </Artifact>
      </div>
    </Frame>
  );
}

function FileScreen() {
  const items = [
    { i: "◷", t: "Directions hearing", m: "1.5 h · today", c: "#30d158" },
    { i: "◷", t: "Call — opposing counsel", m: "0.4 h · today", c: "#30d158" },
    { i: "▤", t: "Filed defence (photo)", m: "2 pages · yesterday", c: "#0a84ff" },
    { i: "◔", t: "Reply due", m: "24 Feb · 6 days", c: "#ff9f0a" },
  ];
  return (
    <Frame title="Alvarez v. Northline" sub="2026-0117 · Litigation">
      <div className="flex items-center justify-between">
        <p className="mono text-[9px] text-white/55">Case file</p>
        <p className="num text-[10px] text-white/55">12.4 h unbilled</p>
      </div>
      <div className="space-y-1.5">
        {items.map((it) => (
          <div key={it.t} className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-[#141418] px-3 py-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg text-[13px]" style={{ background: `${it.c}1f`, color: it.c }}>
              {it.i}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-white">{it.t}</span>
              <span className="block text-[11px] text-white/55">{it.m}</span>
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function AskScreen() {
  return (
    <Frame title="Alvarez v. Northline" sub="2026-0117 · Litigation">
      <div className="mt-auto space-y-2.5">
        <div className="flex justify-end">
          <p className="max-w-[76%] rounded-[1.15rem] rounded-br-[0.4rem] bg-[color:var(--color-ios-deep)] px-3.5 py-2 text-[14px] text-white">
            Can they still amend?
          </p>
        </div>
        <div className="rounded-[1.15rem] rounded-bl-[0.4rem] bg-white/8 px-3.5 py-2.5">
          <p className="text-[13.5px] leading-relaxed text-white/90">
            Only with leave now — their 21 days ran on{" "}
            <span className="font-semibold text-white">18 Feb</span>. Northline amended once
            already, so a second is at the court&rsquo;s discretion.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["FRCP 15(a)(2)", "Amended answer — 18 Feb"].map((s) => (
            <span key={s} className="rounded-md border border-white/12 bg-white/5 px-2 py-1 text-[10.5px] text-white/60">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function SignScreen() {
  return (
    <Frame title="Chen, Ada" sub="2026-0121 · Commercial">
      <div className="mt-auto space-y-2.5">
        <Artifact kind="Out for signature" title="Demand for payment" accent="#bf5af2">
          <div className="space-y-2 pb-1">
            {[
              { who: "You", when: "Signed · 9:44", done: true },
              { who: "Ada Chen", when: "Awaiting signature", done: false },
            ].map((r) => (
              <div key={r.who} className="flex items-center gap-2.5">
                <span
                  className="grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold"
                  style={{
                    background: r.done ? "#30d158" : "transparent",
                    border: r.done ? "none" : "1.5px dashed rgba(255,255,255,.3)",
                    color: "#000",
                  }}
                >
                  {r.done ? "✓" : ""}
                </span>
                <span className="flex-1 text-[12.5px] text-white/85">{r.who}</span>
                <span className="text-[11px] text-white/55">{r.when}</span>
              </div>
            ))}
          </div>
        </Artifact>
      </div>
    </Frame>
  );
}

function PaidScreen() {
  return (
    <Frame title="Draper Holdings" sub="2026-0104 · Corporate">
      <div className="mt-auto space-y-2.5">
        <Artifact kind="Invoice · Paid" title="February — INV-0042" accent="#30d158">
          <Row k="Hours" v="12.4" />
          <Row k="Disbursements" v="$410.00" />
          <Row k="Total" v="$4,626.00" strong />
          <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-[#30d158]/12 px-2.5 py-2">
            <span className="grid size-4 place-items-center rounded-full bg-[#30d158] text-[9px] font-bold text-black">
              ✓
            </span>
            <span className="text-[11.5px] font-medium text-[#30d158]">Paid in full · 2 days</span>
          </div>
        </Artifact>
      </div>
    </Frame>
  );
}
