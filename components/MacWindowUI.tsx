"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  LuCalendarClock,
  LuCheck,
  LuCreditCard,
  LuMessagesSquare,
  LuPenLine,
  LuReceipt,
  LuSignature,
  LuUserPlus,
} from "react-icons/lu";

/**
 * The Mac page's centerpiece: the actual product UI, drawn. A macOS window
 * with the case sidebar, one thread, and the message bar; no tabs, no modes,
 * because the product has none. The demo is a complete conversation that
 * plays out in the thread: a question answered from the file, a letter
 * drafted, signed and filed, the month billed. Everything happens in the
 * chat because the chat is the interface.
 *
 * The lawyer's messages are typed live into the message bar before they post;
 * replies and work cards arrive on their own. The whole conversation loops.
 */

const CASES = [
  {
    name: "Hale v. Northshore Logistics",
    snippet: "Assistant: Demand letter draft is ready",
    when: "2h",
    stage: "Investigation",
    active: true,
  },
  {
    name: "Reyes Family Trust",
    snippet: "Assistant: Intake written up, ready to review",
    when: "1d",
    stage: "Intake",
    active: false,
  },
  {
    name: "Marden LLC formation",
    snippet: "You: Send the formation documents",
    when: "3d",
    stage: "Drafting",
    active: false,
  },
  {
    name: "Okafor v. Brightline HOA",
    snippet: "Assistant: Follow-up scheduled",
    when: "5d",
    stage: "Pleadings",
    active: false,
  },
];

/* ---------------------------------------------------------------- fragments */

function Me({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[78%] rounded-2xl bg-[var(--color-brand)] px-3.5 py-2 text-[12.5px] leading-snug text-white">
        {children}
      </p>
    </div>
  );
}

function Reply({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-start">
      <p className="max-w-[78%] rounded-2xl bg-[rgba(14,21,36,0.05)] px-3.5 py-2 text-[12.5px] leading-snug text-[var(--color-ink-2)]">
        {children}
      </p>
    </div>
  );
}

function SourceChip({ children }: { children: ReactNode }) {
  return (
    <span className="w-fit rounded-full bg-[var(--color-brand-wash)] px-2 py-[3px] text-[10.5px] font-medium text-[var(--color-brand-dark)]">
      {children}
    </span>
  );
}

function WorkCard({
  icon,
  title,
  meta,
  good,
  children,
}: {
  icon: ReactNode;
  title: string;
  meta?: string;
  good?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={`max-w-[86%] rounded-xl border p-3.5 ${
        good
          ? "border-emerald-200 bg-emerald-50/70"
          : "border-[var(--color-line)] bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={good ? "text-emerald-600" : "text-[var(--color-brand)]"}>{icon}</span>
        <p className="text-[12px] font-semibold text-[var(--color-ink)]">{title}</p>
        {meta ? <p className="ml-auto pl-3 text-[10.5px] text-[var(--color-ink-3)]">{meta}</p> : null}
      </div>
      {children ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ script */

type Step =
  | { kind: "me"; text: string }
  | { kind: "show"; node: ReactNode };

const I = { size: 13, strokeWidth: 2.1 } as const;

const SCRIPT: Step[] = [
  { kind: "me", text: "When did Northshore last actually pay us?" },
  {
    kind: "show",
    node: (
      <div className="space-y-1.5">
        <Reply>Nov 12, 2023. $6,250 against invoice 1041, cleared in full. Nothing since.</Reply>
        <SourceChip>Source: Invoice 1041.pdf</SourceChip>
      </div>
    ),
  },
  { kind: "me", text: "Draft a demand letter for the unpaid balance" },
  {
    kind: "show",
    node: (
      <WorkCard icon={<LuPenLine {...I} />} title="Demand letter, draft ready">
        <p className="text-[11.5px] leading-relaxed text-[var(--color-ink-3)]">
          Parties, dates and amounts filled from the case record. Only the
          narrative was written by AI. Open it to review.
        </p>
      </WorkCard>
    ),
  },
  { kind: "me", text: "Looks right. Send it to Alex for signature." },
  {
    kind: "show",
    node: (
      <WorkCard icon={<LuSignature {...I} />} title="Sent for signature" meta="3:07 PM">
        <p className="text-[11.5px] text-[var(--color-ink-3)]">
          Alex Morgan, identity by email and one-time passcode.
        </p>
      </WorkCard>
    ),
  },
  {
    kind: "show",
    node: (
      <WorkCard icon={<LuCheck {...I} />} title="Executed" meta="3:19 PM" good>
        <p className="text-[11.5px] text-[var(--color-ink-3)]">
          Certificate issued, signed copy filed into the case. 0.5 hr added to
          unbilled time.
        </p>
      </WorkCard>
    ),
  },
  /* Unprompted: the firm keeps moving while you draft. */
  {
    kind: "show",
    node: (
      <WorkCard icon={<LuCalendarClock {...I} />} title="Check-in" meta="Unprompted">
        <p className="text-[11.5px] leading-relaxed text-[var(--color-ink-3)]">
          No word from Northshore&rsquo;s counsel on the stipulation in 3 days.
          Want me to chase?
        </p>
      </WorkCard>
    ),
  },
  { kind: "me", text: "Yes, chase them. And bill the month." },
  {
    kind: "show",
    node: (
      <WorkCard icon={<LuReceipt {...I} />} title="Invoice 1044" meta="Draft">
        <div className="text-[11.5px]">
          {[
            ["13.4 hrs at $320", "$4,288.00"],
            ["Filing fees", "$410.00"],
          ].map(([label, amt]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-[var(--color-line)] py-1 last:border-0"
            >
              <span className="text-[var(--color-ink-3)]">{label}</span>
              <span className="font-medium tabular-nums text-[var(--color-ink)]">{amt}</span>
            </div>
          ))}
          <div className="mt-1 flex items-center justify-between pt-1">
            <span className="font-semibold text-[var(--color-ink)]">Total</span>
            <span className="text-[13.5px] font-semibold tracking-[-0.02em] text-[var(--color-brand)]">
              $4,698.00
            </span>
          </div>
        </div>
        <button
          type="button"
          tabIndex={-1}
          className="mt-2 w-full rounded-lg bg-[var(--color-brand)] py-1.5 text-[11px] font-semibold text-white"
        >
          Send invoice
        </button>
      </WorkCard>
    ),
  },
  {
    kind: "show",
    node: (
      <Reply>
        Invoice 1044 sent. Northshore pays the firm directly; Jural takes 0%.
      </Reply>
    ),
  },
];

const TYPE_MS = 34;
const BEAT_MS = 1100;
const HOLD_MS = 4200;

/* ------------------------------------------------------------------- window */

export function MacWindowUI() {
  const rootRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState("");
  const [dim, setDim] = useState(false);
  const [active, setActive] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setShown(SCRIPT.length);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* The thread keeps its newest message in view, like a real chat. */
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, typing]);

  useEffect(() => {
    if (!active || still) return;
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      while (alive) {
        setDim(false);
        setShown(0);
        setTyping("");
        await sleep(700);

        for (let i = 0; i < SCRIPT.length; i += 1) {
          if (!alive) return;
          const step = SCRIPT[i];

          if (step.kind === "me") {
            for (let c = 1; c <= step.text.length; c += 1) {
              if (!alive) return;
              setTyping(step.text.slice(0, c));
              await sleep(TYPE_MS);
            }
            await sleep(260);
            setTyping("");
            setShown(i + 1);
            await sleep(650);
          } else {
            await sleep(450);
            setShown(i + 1);
            await sleep(BEAT_MS);
          }
        }

        await sleep(HOLD_MS);
        if (!alive) return;
        setDim(true);
        await sleep(450);
      }
    })();

    return () => { alive = false; };
  }, [active, still]);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-[12px] bg-white shadow-[0_36px_90px_-30px_rgba(14,21,36,0.45)] ring-1 ring-[rgba(14,21,36,0.1)]"
    >
      {/* -------- title bar: a whisper of the brand across the chrome ------ */}
      <div
        className="flex items-center gap-3 border-b border-[var(--color-line)] px-4 py-2.5"
        style={{
          background:
            "linear-gradient(90deg, var(--color-brand-wash) 0%, rgba(192,232,248,0.3) 45%, #ffffff 100%)",
        }}
      >
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        </div>
      </div>

      <div className="flex">
        {/* -------- icon rail -------- */}
        <div className="hidden w-[52px] shrink-0 flex-col items-center gap-2 border-r border-[var(--color-line)] bg-[rgba(14,21,36,0.018)] py-3 sm:flex">
          <Image
            src="/jural-logo.png"
            alt=""
            width={482}
            height={601}
            className="mb-2 h-6 w-6 object-contain"
          />
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--color-brand)] text-white">
            <LuMessagesSquare size={15} strokeWidth={2.1} />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-lg text-[var(--color-ink-3)]">
            <LuCreditCard size={15} strokeWidth={2.1} />
          </span>
          <span className="mt-auto grid h-8 w-8 place-items-center rounded-full bg-[rgba(14,21,36,0.08)] text-[var(--color-ink-3)]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
            </svg>
          </span>
        </div>

        {/* -------- sidebar -------- */}
        <div className="hidden w-[248px] shrink-0 flex-col border-r border-[var(--color-line)] bg-white p-3 lg:flex">
          {/* large title row, macOS style */}
          <div className="flex items-center justify-between px-1.5 pb-2.5">
            <p className="text-[17px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
              Cases
            </p>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-brand)] text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </div>

          <div className="mx-0.5 mb-2.5 flex h-7 items-center gap-1.5 rounded-lg border border-[var(--color-line)] bg-white px-2.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="text-[var(--color-ink-3)]">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" />
            </svg>
            <span className="text-[11px] text-[var(--color-ink-3)]">Search</span>
          </div>

          {/* filter chips */}
          <div className="mb-2.5 flex gap-1 overflow-hidden px-0.5">
            <span className="rounded-full bg-[var(--color-brand)] px-2.5 py-[3px] text-[10px] font-semibold text-white">
              All
            </span>
            {[
              ["Intake", "#10b981"],
              ["Investigation", "#0e82e8"],
              ["Pleadings", "#8b5cf6"],
            ].map(([label, dot]) => (
              <span
                key={label}
                className="flex items-center gap-1 rounded-full bg-[rgba(14,21,36,0.05)] px-2 py-[3px] text-[10px] font-medium text-[var(--color-ink-2)]"
              >
                <span className="h-[5px] w-[5px] rounded-full" style={{ background: dot }} />
                {label}
              </span>
            ))}
          </div>

          {/* case rows: the selection runs the sidebar's full width */}
          <div className="-mx-3 flex flex-col gap-0.5">
            {CASES.map((c) => (
              <div
                key={c.name}
                className={`px-5 py-2 ${
                  c.active ? "bg-[rgba(14,21,36,0.06)]" : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[12px] font-semibold text-[var(--color-ink)]">
                      {c.name}
                    </p>
                    <p className="shrink-0 text-[9.5px] text-[var(--color-ink-3)]">{c.when}</p>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[10.5px] text-[var(--color-ink-3)]">{c.snippet}</p>
                    <span className="shrink-0 rounded-full bg-[rgba(14,21,36,0.05)] px-1.5 py-[1px] text-[8.5px] font-medium text-[var(--color-ink-3)]">
                      {c.stage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-auto px-2 pt-3 text-[10.5px] text-[var(--color-ink-3)]">
            Hale Law Group
          </p>
        </div>

        {/* -------- the thread -------- */}
        <div className="flex min-h-[560px] flex-1 flex-col">
          {/* case header */}
          <div className="flex items-center gap-3 border-b border-[var(--color-line)] bg-[rgba(14,21,36,0.03)] px-5 py-1.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--color-brand)] text-[9.5px] font-bold text-white">
              JH
            </span>
            <p className="min-w-0 truncate text-[13px] font-semibold text-[var(--color-ink)]">
              Hale v. Northshore Logistics, unpaid consulting invoices
            </p>
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg text-[var(--color-ink-3)]">
                <LuUserPlus size={14} strokeWidth={2.1} />
              </span>
              <span className="flex items-center rounded-full bg-[rgba(14,21,36,0.06)] p-[3px]">
                <span className="grid h-6 w-10 place-items-center rounded-full bg-[var(--color-brand)] text-white">
                  {/* filled speech bubble */}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 3.42-9 7.64 0 2.05.95 3.9 2.5 5.27-.1.86-.44 2.03-1.4 3.09 0 0 1.86-.13 3.4-1.23.86.33 1.8.51 2.79.51h1.71c4.97 0 9-3.42 9-7.64S16.97 3 12 3z" />
                  </svg>
                </span>
                <span className="grid h-6 w-9 place-items-center text-[var(--color-ink-2)]">
                  {/* filled 2x2 grid */}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="8" height="8" rx="2" />
                    <rect x="13" y="3" width="8" height="8" rx="2" />
                    <rect x="3" y="13" width="8" height="8" rx="2" />
                    <rect x="13" y="13" width="8" height="8" rx="2" />
                  </svg>
                </span>
              </span>
            </div>
          </div>
          <div
            ref={threadRef}
            className={`flex-1 space-y-2.5 overflow-hidden p-5 transition-opacity duration-500 sm:p-7 ${
              dim ? "opacity-0" : "opacity-100"
            }`}
          >
            {SCRIPT.slice(0, shown).map((step, i) => (
              <div key={i} className="menu-in">
                {step.kind === "me" ? <Me>{step.text}</Me> : step.node}
              </div>
            ))}
          </div>

          {/* -------- message bar -------- */}
          <div className="border-t border-[var(--color-line)] p-4">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-[var(--color-ink-3)]">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
              <p className="h-9 flex-1 truncate rounded-xl border border-[var(--color-line)] bg-white px-3.5 leading-[34px] text-[12.5px]">
                {typing ? (
                  <span className="text-[var(--color-ink)]">
                    {typing}
                    <span className="ml-[1px] inline-block h-[1.05em] w-[1.5px] translate-y-[2px] animate-pulse bg-[var(--color-ink)]" />
                  </span>
                ) : (
                  <span className="text-[var(--color-ink-3)]">Message Assistant&hellip;</span>
                )}
              </p>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--color-brand)] text-white">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
