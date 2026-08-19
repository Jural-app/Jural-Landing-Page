"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  BillingUI,
  CaseFileUI,
  CasesUI,
  ClientsUI,
  DeadlinesUI,
  DocumentsUI,
  ICON,
  ReportsUI,
  TeamUI,
} from "./FeatureUI";

/**
 * The list on the left is read by scrolling, not clicking: whichever item sits
 * nearest the middle of the viewport becomes active, and the pinned panel on
 * the right swaps to its screen.
 *
 * Inactive items keep an AA text colour rather than fading out. Dimming copy
 * to signal focus is a contrast bug wearing a design hat.
 */

const ITEMS = [
  {
    t: "Cases",
    d: "Open a matter, set its practice area, and move it through the stages your practice actually uses. Search and filter the list by stage or client.",
    icon: ICON.doc,
    ui: <CasesUI />,
  },
  {
    t: "The case file",
    d: "Every reminder, time log, document and photo for a matter, gathered as you work rather than filed by hand.",
    icon: ICON.photo,
    ui: <CaseFileUI />,
  },
  {
    t: "Clients",
    d: "Pull a client straight from your phone contacts, then call or message them without leaving the case.",
    icon: ICON.person,
    ui: <ClientsUI />,
  },
  {
    t: "Time and billing",
    d: "Turn unbilled hours into an invoice and take payment through Stripe, while the work is still fresh enough to defend line by line.",
    icon: ICON.card,
    ui: <BillingUI />,
  },
  {
    t: "Documents and drafting",
    d: "Store what the matter runs on, draft from the facts already inside it, and send out for signature without opening anything else.",
    icon: ICON.doc,
    ui: <DocumentsUI />,
  },
  {
    t: "Deadlines and reminders",
    d: "Dates worked out from what is in the file and proposed to you, instead of typed into a calendar and hoped for.",
    icon: ICON.bell,
    ui: <DeadlinesUI />,
  },
  {
    t: "Reports",
    d: "Hours worked, what is still unbilled, and what your clients owe you.",
    icon: ICON.chart,
    ui: <ReportsUI />,
  },
  {
    t: "Team",
    d: "Share a matter or keep it private. Attorney, paralegal and viewer roles, invited by link.",
    icon: ICON.users,
    ui: <TeamUI />,
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Whichever item's centre is nearest the viewport centre wins. Measured
    // straight from the scroll handler rather than behind a rAF lock, which a
    // backgrounded tab can take and never release.
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
    <div>
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="d2 max-w-[16ch]">Everything a practice runs on</h2>
          <p className="lead mt-5 max-w-[52ch]">
            Cases, documents, time, billing, deadlines and your team, in one
            place instead of five.
          </p>
        </div>

        <a
          href="#access"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[color:var(--color-ink)]/20 px-5 py-2.5 text-[14px] font-medium transition-colors hover:border-[color:var(--color-ink)]/45"
        >
          Request access
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            ›
          </span>
        </a>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-16">
        {/* the list is the scrub track */}
        <ul>
          {ITEMS.map((it, i) => {
            const on = i === active;
            return (
              <li
                key={it.t}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="relative border-t border-[color:var(--color-rule)] py-10 pl-8 lg:flex lg:min-h-[58vh] lg:flex-col lg:justify-center lg:py-12"
              >
                {/* active marker rides the rule */}
                <motion.span
                  aria-hidden="true"
                  animate={{ opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-10 bottom-10 w-[2px] rounded-full bg-[color:var(--color-blue)] lg:top-12 lg:bottom-12"
                />

                <svg viewBox="0 0 20 20" className="size-[26px]" aria-hidden="true">
                  <motion.path
                    d={it.icon}
                    fill="none"
                    initial={{ stroke: "var(--color-ink-4)" }}
                    animate={{ stroke: on ? "var(--color-blue)" : "var(--color-ink-4)" }}
                    transition={{ duration: 0.3 }}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <motion.h3
                  animate={{ color: on ? "var(--color-ink)" : "var(--color-ink-2)" }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 text-[clamp(1.45rem,1.1rem+1vw,1.95rem)] font-medium leading-[1.15] tracking-[-0.03em]"
                >
                  {it.t}
                </motion.h3>

                <p className="mt-4 max-w-[44ch] text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-[color:var(--color-ink-3)]">
                  {it.d}
                </p>

                {/* below lg nothing can pin, so each item carries its own screen */}
                <div className="mt-7 overflow-hidden rounded-2xl bg-[color:var(--color-surface-deep)] p-5 lg:hidden">
                  {it.ui}
                </div>
              </li>
            );
          })}
        </ul>

        {/* pinned screen */}
        <div className="hidden lg:block">
          <div className="sticky top-[max(6rem,calc(50vh-250px))]">
            <div className="mx-auto grid h-[calc(100vh-16rem)] max-h-[500px] min-h-[400px] w-full max-w-[464px] place-items-center overflow-hidden rounded-2xl bg-[color:var(--color-surface-deep)] p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ITEMS[active].ui}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
