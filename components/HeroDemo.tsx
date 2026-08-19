"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * The hero demo. Plays itself: a line is said, Jural works, the record lands.
 * Then it moves on. No tabs, no chooser, nothing to click.
 *
 * No device frame either. These are the app's own objects rendered straight
 * onto the canvas in the light variant, at page scale.
 *
 * Every name, matter and figure below is fictional.
 */

const CARD =
  "rounded-[14px] border border-[color:var(--color-rule)] bg-white shadow-[0_1px_3px_rgba(14,17,22,0.05)]";
const SEP = { boxShadow: "inset 0 -1px 0 0 rgba(14,17,22,0.07)" };

function Row({ k, v, strong, last }: { k: string; v: string; strong?: boolean; last?: boolean }) {
  return (
    <div
      className="flex items-center justify-between gap-4 px-4 py-2.5"
      style={last ? undefined : SEP}
    >
      <span className="text-[13px] text-[color:var(--color-ink-4)]">{k}</span>
      <span className={`num text-[13.5px] ${strong ? "font-semibold" : "font-medium"}`}>{v}</span>
    </div>
  );
}

function Head({ kind, title, tint }: { kind: string; title: string; tint: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 pb-2.5 pt-3.5" style={SEP}>
      <span className="size-2 shrink-0 rounded-full" style={{ background: tint }} />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-[color:var(--color-ink-4)]">
          {kind}
        </span>
        <span className="block truncate text-[14px] font-medium">{title}</span>
      </span>
    </div>
  );
}

function Approve({ label }: { label: string }) {
  return (
    <div className="p-3">
      <span className="block rounded-[10px] bg-[color:var(--color-blue-wash)] py-2.5 text-center text-[13px] font-semibold text-[color:var(--color-blue)]">
        {label}
      </span>
    </div>
  );
}

/** A voice note, the way it lands in the thread: bubble, waveform, duration. */
function VoiceNote({ length = "0:04" }: { length?: string }) {
  const bars = [5, 9, 14, 8, 17, 11, 6, 13, 18, 10, 7, 15, 9, 12, 6, 4];
  return (
    <span className="flex items-center gap-3 rounded-[16px] rounded-br-[5px] bg-[color:var(--color-ios-deep)] px-3.5 py-2.5">
      <span
        aria-hidden="true"
        className="grid size-[26px] shrink-0 place-items-center rounded-full bg-white"
      >
        <svg viewBox="0 0 10 12" className="ml-[1px] size-[9px]">
          <path d="M0 0l10 6-10 6z" fill="var(--color-ios-deep)" />
        </svg>
      </span>

      <span aria-hidden="true" className="flex h-[20px] items-center gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[2px] rounded-full"
            style={{ height: h, background: i < 6 ? "#fff" : "rgba(255,255,255,.45)" }}
          />
        ))}
      </span>

      <span className="num shrink-0 text-[12px] text-white/85">{length}</span>
    </span>
  );
}

const SCENES = [
  {
    id: "time",
    voice: true,
    said: "Just did 40 minutes on the Alvarez call",
    work: "Matching to matter · 2026-0117",
    out: (
      <div className={CARD}>
        <Head kind="Time entry" title="Call with client" tint="#1a9e5f" />
        <Row k="Matter" v="Alvarez v. Northline" />
        <Row k="Duration" v="0.7 h" />
        <Row k="Rate" v="$340 / h" />
        <Row k="Value" v="$238.00" strong last />
        <Approve label="Approve" />
      </div>
    ),
  },
  {
    id: "ask",
    said: "How long do I have to respond?",
    work: "Reading the file · checking service date",
    out: (
      <div className={CARD}>
        <div className="px-4 py-3.5" style={SEP}>
          <p className="text-[14px] leading-relaxed text-[color:var(--color-ink-2)]">
            You were served on <span className="font-semibold text-[color:var(--color-ink)]">3 Feb</span>,
            so your response is due{" "}
            <span className="font-semibold text-[color:var(--color-ink)]">24 Feb</span>. That is 21
            days, and you have <span className="font-semibold text-[#b26a00]">6 days</span> left.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 p-3">
          {["FRCP 12(a)(1)(A)", "Summons · served 3 Feb", "Alvarez v. Northline"].map((c) => (
            <span
              key={c}
              className="rounded-full bg-[color:var(--color-blue-wash)] px-2.5 py-1 text-[11.5px] font-medium text-[color:var(--color-blue)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "draft",
    said: "Draft the demand letter for Chen",
    work: "Pulling the facts · invoice, notice, limitation date",
    out: (
      <div className={CARD}>
        <Head kind="Letter · draft" title="Demand for payment" tint="#c2409a" />
        <div className="px-4 py-3.5" style={SEP}>
          <p className="text-[13px] leading-relaxed text-[color:var(--color-ink-3)]">
            Further to our letter of 12 November, our client&rsquo;s invoice remains unpaid in the
            sum of <span className="num font-medium text-[color:var(--color-ink)]">$4,626.00</span>.
            Unless payment is received within 14 days…
          </p>
        </div>
        <Approve label="Send for signature" />
      </div>
    ),
  },
  {
    id: "bill",
    said: "Bill Draper for everything this month",
    work: "Collecting 18 unbilled entries",
    out: (
      <div className={CARD}>
        <Head kind="Invoice · draft" title="Draper Holdings · February" tint="#0c6fc4" />
        <Row k="Entries" v="18" />
        <Row k="Hours" v="12.4" />
        <Row k="Disbursements" v="$410.00" />
        <Row k="Total" v="$4,626.00" strong last />
        <Approve label="Create & send" />
      </div>
    ),
  },
];

type Phase = "said" | "working" | "done";

export function HeroDemo() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>("said");
  const reduce = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduce) {
      setPhase("done");
      return;
    }
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("said");
    timers.current.push(setTimeout(() => setPhase("working"), 620));
    timers.current.push(setTimeout(() => setPhase("done"), 1750));
    timers.current.push(setTimeout(() => setI((n) => (n + 1) % SCENES.length), 5600));
    return () => timers.current.forEach(clearTimeout);
  }, [i, reduce]);

  const s = SCENES[i];

  return (
    <div className="relative flex min-h-[440px] flex-col justify-center gap-4 md:min-h-[480px]">
      {/* what was said */}
      <div className="flex justify-end">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${s.id}-said`}
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="flex max-w-[80%] flex-col items-end"
          >
            {s.voice ? (
              <>
                <VoiceNote />
                <p className="mt-2 pr-1 text-right text-[12.5px] italic leading-snug text-[color:var(--color-ink-4)]">
                  &ldquo;{s.said}&rdquo;
                </p>
              </>
            ) : (
              <p className="rounded-[16px] rounded-br-[5px] bg-[color:var(--color-ios-deep)] px-4 py-2.5 text-[14.5px] leading-snug text-white">
                {s.said}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* what it is doing */}
      <div className="min-h-[18px]">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "working" && (
            <motion.p
              key={`${s.id}-work`}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-[12px] text-[color:var(--color-ink-4)]"
            >
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-1 rounded-full bg-[color:var(--color-blue)]"
                    style={{ animation: `pulse-dot 1s ${d * 0.15}s infinite` }}
                  />
                ))}
              </span>
              {s.work}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* what it made */}
      <div>
        <AnimatePresence mode="wait" initial={false}>
          {phase === "done" && (
            <motion.div
              key={`${s.id}-out`}
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
            >
              {s.out}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
