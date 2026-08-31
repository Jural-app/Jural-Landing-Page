"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * The About page's beliefs as a master-detail index: four convictions set at
 * display scale (the footer's big-list voice), the active one in full ink
 * with its body and drawn proof beside it. Hovering or clicking a title
 * takes over; left alone it advances gently. Under prefers-reduced-motion it
 * is a static list showing the first belief.
 */

const CYCLE_MS = 4500;

type Belief = {
  title: string;
  body: string;
  art: ReactNode;
};

const BELIEFS: Belief[] = [
  {
    title: "Ease over data-entry",
    body: "Software that creates admin work gets abandoned. The tool must fit the day, not the other way around.",
    art: (
      <div className="flex items-end gap-4">
        {/* the form nobody wants to fill, visibly a form */}
        <div className="relative">
          <div className="w-[150px] space-y-2 opacity-60">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                Client name
              </p>
              <div className="mt-0.5 flex h-[20px] items-center rounded bg-white px-1.5 text-[10px] text-[var(--color-ink-2)] ring-1 ring-[rgba(14,21,36,0.14)]">
                Jordan Hale
              </div>
            </div>
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                Matter type
              </p>
              <div className="mt-0.5 flex h-[20px] items-center rounded bg-white px-1.5 text-[10px] text-[var(--color-ink-3)]">
                Select&hellip;
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 h-[2.5px] w-[168px] -translate-x-1/2 -translate-y-1/2 -rotate-[9deg] rounded-full bg-[var(--color-ink-2)]" />
        </div>
        <span className="rounded-xl rounded-bl-sm bg-[var(--color-brand)] px-3 py-1.5 text-[11px] font-medium text-white">
          Northshore stopped paying us in January
        </span>
      </div>
    ),
  },
  {
    title: "Private by architecture",
    body: "A promise is a policy. Sensitive work stays on your devices, so trust does not depend on us.",
    art: (
      <div className="flex items-center gap-2.5 text-[11px]">
        <span className="rounded-md bg-white px-2 py-1 font-semibold text-[var(--color-ink)] ring-1 ring-[var(--color-line)]">
          Hale v. Northshore
        </span>
        <svg width="18" height="8" viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2 2.5" className="shrink-0 text-[var(--color-ink-3)]" aria-hidden="true">
          <line x1="1" y1="5" x2="19" y2="5" />
        </svg>
        <span className="rounded-md bg-white px-2 py-1 font-mono text-[var(--color-ink-3)] ring-1 ring-[var(--color-line)]">
          9f&bull;xK2&bull;Lq8&hellip;
        </span>
      </div>
    ),
  },
  {
    title: "Truly native",
    body: "First-class iPhone and Mac apps, not a website wearing a frame.",
    art: (
      <div className="flex items-end gap-2.5">
        <div className="flex h-[46px] w-[24px] items-start justify-center rounded-[7px] border-[1.5px] border-[var(--color-ink-2)] pt-1">
          <span className="h-[3px] w-[9px] rounded-full bg-[var(--color-ink-2)]" />
        </div>
        <div className="h-[38px] w-[58px] rounded-md border-[1.5px] border-[var(--color-ink-2)] p-1">
          <div className="flex gap-[3px]">
            <span className="h-[3.5px] w-[3.5px] rounded-full bg-[#ff5f57]" />
            <span className="h-[3.5px] w-[3.5px] rounded-full bg-[#febc2e]" />
            <span className="h-[3.5px] w-[3.5px] rounded-full bg-[#28c840]" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Honesty over fluency",
    body: "An assistant that guesses is a liability in this profession. When something is not in the file, Jural says exactly that.",
    art: (
      <div className="flex w-[210px] flex-col gap-1.5 text-[11px]">
        <div className="flex justify-end">
          <span className="rounded-xl rounded-br-sm bg-[var(--color-brand)] px-2.5 py-1 font-medium text-white">
            Do we have their W-9?
          </span>
        </div>
        <div className="flex justify-start">
          <span className="rounded-xl rounded-bl-sm bg-white px-2.5 py-1 font-medium text-[var(--color-ink-2)] ring-1 ring-[var(--color-line)]">
            Not on file.
          </span>
        </div>
      </div>
    ),
  },
];

export function BeliefIndex() {
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const hovered = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
    }
  }, []);

  /* Always cycling; the pointer resting on the section is the only pause,
     so a visitor's click never strands the list on one entry forever. */
  useEffect(() => {
    if (still) return;
    const t = setInterval(() => {
      if (!hovered.current) setActive((a) => (a + 1) % BELIEFS.length);
    }, CYCLE_MS);
    return () => clearInterval(t);
  }, [still]);

  const pick = (i: number) => setActive(i);

  const current = BELIEFS[active];

  return (
    <div
      onMouseEnter={() => { hovered.current = true; }}
      onMouseLeave={() => { hovered.current = false; }}
      className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20"
    >
      {/* the index */}
      <ul>
        {BELIEFS.map((b, i) => (
          <li key={b.title}>
            <button
              type="button"
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
              aria-expanded={active === i}
              className={`block py-2 text-left text-[clamp(1.7rem,1.1rem+1.9vw,2.7rem)] font-semibold leading-[1.2] tracking-[-0.03em] transition-colors duration-300 [font-family:var(--font-display)] ${
                active === i
                  ? "text-[var(--color-ink)]"
                  : "text-[rgba(14,21,36,0.28)] hover:text-[rgba(14,21,36,0.55)]"
              }`}
            >
              {b.title}
            </button>

            {/* on small screens the detail unfolds under its title */}
            {active === i && (
              <div className="menu-in pb-4 pt-2 lg:hidden">
                <p className="max-w-[46ch] text-[15px] leading-[1.7] text-[var(--color-ink-2)]">{b.body}</p>
                <div className="mt-5">{b.art}</div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* the detail, desktop */}
      <div className="hidden lg:flex lg:flex-col lg:justify-center">
        <div key={active} className="menu-in">
          <p className="max-w-[44ch] text-[17px] leading-[1.75] text-[var(--color-ink-2)]">
            {current.body}
          </p>
          <div className="mt-8">{current.art}</div>
        </div>
      </div>
    </div>
  );
}
