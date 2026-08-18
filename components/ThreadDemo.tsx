"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Artifact, Composer, Phone, Row, Said, ThreadHeader, Thinking } from "./AppUI";

/**
 * The hero demo, split into a provider plus two consumers so the phone and its
 * controls can sit in different grid cells. The hero needs the phone on the
 * right and the prompts under the copy on the left; a single self-contained
 * block could not do that without leaving half the fold empty.
 */

type Scenario = {
  id: string;
  chip: string;
  said: string;
  /** what it is doing while it thinks — grounded in the matter, not generic */
  work: string;
  render: () => ReactNode;
};

const SCENARIOS: Scenario[] = [
  {
    id: "time",
    chip: "Log time",
    said: "Just did 40 minutes on the Alvarez call",
    work: "Matching to matter · 2026-0117",
    render: () => (
      <Artifact kind="Time entry" title="Call with client" accent="#30d158" action="Approve">
        <Row k="Matter" v="Alvarez v. Northline" />
        <Row k="Duration" v="0.7 h" />
        <Row k="Rate" v="$340 / h" />
        <Row k="Value" v="$238.00" strong />
      </Artifact>
    ),
  },
  {
    id: "ask",
    chip: "Ask the law",
    said: "How long do I have to respond?",
    work: "Reading the file · checking service date",
    render: () => (
      <div className="space-y-2">
        <div className="rounded-[1.15rem] rounded-bl-[0.4rem] bg-white/8 px-3.5 py-2.5">
          <p className="text-[13.5px] leading-relaxed text-white/90">
            You were served on <span className="font-semibold text-white">3 Feb</span>, so your
            response is due <span className="font-semibold text-white">24 Feb</span> — 21 days.
            You have <span className="font-semibold text-[#ff9f0a]">6 days</span> left.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["FRCP 12(a)(1)(A)", "Summons — served 3 Feb", "Alvarez v. Northline"].map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/12 bg-white/5 px-2 py-1 text-[10.5px] text-white/55"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "draft",
    chip: "Draft a letter",
    said: "Draft the demand letter for Chen",
    work: "Pulling facts from 14 documents",
    render: () => (
      <Artifact kind="Draft · Letter" title="Demand for payment" accent="#bf5af2" action="Review & send">
        <div className="space-y-1.5 rounded-lg bg-black/40 p-2.5">
          {[
            "Dear Mr. Whitfield,",
            "We act for Ms. Ada Chen in respect of the",
            "unpaid invoices of 12 November and 3…",
          ].map((l, i) => (
            <p key={i} className="text-[11px] leading-relaxed text-white/70">
              {l}
            </p>
          ))}
          <div className="h-1.5 w-2/5 rounded-full bg-white/12" />
        </div>
        <Row k="Cites" v="3 documents" />
      </Artifact>
    ),
  },
  {
    id: "bill",
    chip: "Send an invoice",
    said: "Bill Draper for everything this month",
    work: "Collecting 18 unbilled entries",
    render: () => (
      <Artifact kind="Invoice · Draft" title="Draper Holdings — February" accent="#0a84ff" action="Create & send">
        <Row k="Entries" v="18" />
        <Row k="Hours" v="12.4" />
        <Row k="Disbursements" v="$410.00" />
        <Row k="Total" v="$4,626.00" strong />
      </Artifact>
    ),
  },
];

type Phase = "idle" | "said" | "working" | "done";

const Ctx = createContext<{
  active: number;
  phase: Phase;
  play: (i: number) => void;
  register: (el: HTMLElement | null) => void;
} | null>(null);

function useThread() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Thread parts must be used inside <ThreadDemo>");
  return ctx;
}

export function ThreadDemo({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const reduce = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const anchor = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  const play = useCallback(
    (i: number) => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setActive(i);
      if (reduce) {
        setPhase("done");
        return;
      }
      setPhase("idle");
      timers.current.push(setTimeout(() => setPhase("said"), 90));
      timers.current.push(setTimeout(() => setPhase("working"), 620));
      timers.current.push(setTimeout(() => setPhase("done"), 1750));
    },
    [reduce]
  );

  const register = useCallback((el: HTMLElement | null) => {
    anchor.current = el;
  }, []);

  // Start once the phone is actually on screen.
  useEffect(() => {
    const el = anchor.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      play(0);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            play(0);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, [play]);

  const value = useMemo(() => ({ active, phase, play, register }), [active, phase, play, register]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function ThreadPhone({ width = 300 }: { width?: number }) {
  const { active, phase, register } = useThread();
  const s = SCENARIOS[active];

  return (
    <div ref={register}>
      <Phone width={width}>
        <ThreadHeader title="Alvarez v. Northline" sub="2026-0117 · Litigation" />

        <div className="flex h-[398px] flex-col justify-end gap-2.5 bg-black px-3 py-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {phase !== "idle" && (
              <motion.div
                key={`${s.id}-said`}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              >
                <Said>{s.said}</Said>
              </motion.div>
            )}

            {phase === "working" && (
              <motion.div
                key={`${s.id}-work`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="space-y-1.5"
              >
                <Thinking />
                <p className="mono text-[9px] normal-case tracking-[0.08em] text-white/55">{s.work}</p>
              </motion.div>
            )}

            {phase === "done" && (
              <motion.div
                key={`${s.id}-out`}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              >
                {s.render()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Composer />
      </Phone>
    </div>
  );
}

export function ThreadControls() {
  const { active, play } = useThread();

  return (
    <div>
      <p className="mono text-[color:var(--color-ink-4)]">Try it — say something</p>
      <div className="mt-3 flex flex-col gap-1.5">
        {SCENARIOS.map((sc, i) => {
          const on = i === active;
          return (
            <button
              key={sc.id}
              onClick={() => play(i)}
              aria-pressed={on}
              className={[
                "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors duration-200",
                on
                  ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                  : "border-[color:var(--color-rule)] bg-transparent text-[color:var(--color-ink-2)] hover:border-[color:var(--color-ink-4)]",
              ].join(" ")}
            >
              <span className="text-[14px] leading-snug">“{sc.said}”</span>
              <span
                className={[
                  "mono shrink-0 text-[9px]",
                  on ? "text-[color:var(--color-paper)]/60" : "text-[color:var(--color-ink-4)]",
                ].join(" ")}
              >
                {sc.chip}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
