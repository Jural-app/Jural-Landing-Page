"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

/**
 * Two surfaces, one system. The list on the right selects; the panel on the
 * left shows that surface's actual layout rather than a device photograph.
 *
 * Hover selects on a pointer, tap selects on touch, so reading the section
 * costs nothing.
 */

const SURFACES = [
  {
    t: "iPhone",
    d: "Where the work actually happens. A hearing, a call in the car, twenty minutes on a contract between meetings. Say what happened and the record lands on the right case before you have put the phone away.",
    slot: { label: "Phone mockup", file: "/mockups/phone.png", box: "aspect-[9/19] w-[260px]" },
  },
  {
    t: "Web",
    d: "Where you settle up. Read a long document properly, draft at length, run the month's billing across every matter at once. Same cases, same files, a screen with room for them.",
    slot: { label: "Web mockup", file: "/mockups/web.png", box: "aspect-[16/10] w-full max-w-[560px]" },
  },
];

export function Surfaces() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const s = SURFACES[active];

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      {/* panel */}
      <div className="order-2 grid min-w-0 min-h-[420px] place-items-center overflow-hidden rounded-2xl bg-[color:var(--color-surface-deep)] p-6 md:min-h-[500px] md:p-10 lg:order-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Drop the real asset in and swap this for:
                <Image src={s.slot.file} alt="" width={…} height={…} className={s.slot.box} /> */}
            <div
              className={`grid place-items-center rounded-xl border border-dashed border-[color:var(--color-ink)]/20 bg-white/50 ${s.slot.box}`}
            >
              <span className="px-4 text-center text-[13px] text-[color:var(--color-ink-4)]">
                {s.slot.label}
                <span className="mt-1 block text-[11.5px] opacity-70">{s.slot.file}</span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* copy + selector */}
      <div className="order-1 min-w-0 lg:order-2">
        <h2 className="d2 max-w-[13ch]">Capture on the phone. Finish at the desk.</h2>

        <ul className="mt-12 border-t border-[color:var(--color-rule)]">
          {SURFACES.map((it, i) => {
            const on = i === active;
            return (
              <li key={it.t} className="border-b border-[color:var(--color-rule)]">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="w-full cursor-pointer py-6 text-left"
                >
                  <span className="flex items-center gap-2.5">
                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }}
                      transition={{ duration: 0.25 }}
                      className="size-[7px] shrink-0 rounded-full bg-[color:var(--color-blue)]"
                    />
                    <motion.span
                      animate={{ color: on ? "var(--color-ink)" : "var(--color-ink-2)" }}
                      transition={{ duration: 0.25 }}
                      className="text-[clamp(1.25rem,1.05rem+0.6vw,1.6rem)] font-medium tracking-[-0.03em]"
                    >
                      {it.t}
                    </motion.span>
                  </span>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span
                        key="d"
                        initial={reduce ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduce ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-3.5 block max-w-[44ch] pl-[17px] text-[16px] leading-relaxed text-[color:var(--color-ink-3)]">
                          {it.d}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
