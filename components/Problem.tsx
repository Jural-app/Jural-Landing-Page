"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Problem: laid out on the Legora reference, with a large grey panel on the left
 * holding a floating app window, and a narrow right column with the eyebrow and
 * headline pinned to the top and an accordion pinned to the bottom.
 *
 * The window is a stylised, entirely fictional legacy CRM. No real product is
 * depicted. Its table runs wider and taller than the frame, so it stays clipped
 * from the inside: there is always more of it than you can see.
 *
 * On scroll into view the toolbar dims one icon at a time until four remain,
 * "hundreds of features, a handful ever used" without resorting to a chart.
 *
 * Greys are derived from --color-ink (#0e1524) at low alpha, matching how
 * --color-line is already defined, so they read cool and stay on-palette.
 */

/* Deterministic pseudo-widths, so SSR and client agree (no Math.random). */
const px = (i: number, base: number, span: number, k = 29) => base + ((i * k) % span);

const SIDEBAR = Array.from({ length: 31 }, (_, i) => px(i, 38, 48));
const TOOLBAR = Array.from({ length: 24 }, (_, i) => i);
const KEEP = new Set([3, 9, 16, 21]); // the handful that stay lit
const TABS = [78, 96, 64, 110, 72];
const COLS = 14;
const ROWS = 12;


export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDim(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="problem" aria-label="The problem" className="bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-12">
          {/* ---- Left: eyebrow, headline, body ------------------- */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              The Problem
            </div>

            <h2 className="text-[clamp(1.55rem,1rem+1.3vw,2rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              For over a decade, lawyers came to us asking for a custom CRM.
              They were already paying for one.
            </h2>

            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              <p>
                We assumed it was cost. Then we assumed it was privacy. It was
                neither. The software was built for a desk, and a
                lawyer&rsquo;s day doesn&rsquo;t happen at one.
              </p>
              <p className="font-semibold text-[var(--color-ink)]">
                Hundreds of features. A handful ever used. Every one of them
                asking to be fed.
              </p>
            </div>
          </div>
          {/* ---- Right: grey panel holding the window ------------ */}
          <div>
            <div
              ref={ref}
              className="flex items-center justify-center overflow-hidden rounded-xl bg-[var(--color-canvas-deep)] p-6 sm:p-12 lg:p-14"
            >
              <div className="w-full overflow-hidden rounded-lg border border-[rgba(14,21,36,0.13)] bg-white shadow-[0_26px_60px_-30px_rgba(14,21,36,0.45)]">
                {/* Title bar */}
                <div className="flex items-center gap-3 border-b border-[rgba(14,21,36,0.09)] bg-[rgba(14,21,36,0.035)] px-4 py-2.5">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-[8px] w-[8px] rounded-full bg-[rgba(14,21,36,0.16)]"
                      />
                    ))}
                  </div>
                  <span className="ml-1 h-2 w-36 rounded-full bg-[rgba(14,21,36,0.13)]" />
                  <span className="ml-auto h-2 w-14 rounded-full bg-[rgba(14,21,36,0.09)]" />
                </div>

                {/* Tab strip */}
                <div className="flex items-end gap-1 border-b border-[rgba(14,21,36,0.09)] bg-[rgba(14,21,36,0.02)] px-3 pt-2">
                  {TABS.map((tw, i) => (
                    <div
                      key={i}
                      style={{ width: tw }}
                      className={`flex h-6 shrink-0 items-center rounded-t-md px-2 ${
                        i === 1
                          ? "bg-white ring-1 ring-[rgba(14,21,36,0.09)]"
                          : "bg-[rgba(14,21,36,0.045)]"
                      }`}
                    >
                      <span className="h-1.5 w-full rounded-full bg-[rgba(14,21,36,0.14)]" />
                    </div>
                  ))}
                </div>

                {/* Toolbar: the dimming ribbon */}
                <div className="flex gap-1.5 overflow-hidden border-b border-[rgba(14,21,36,0.09)] px-4 py-2.5">
                  {TOOLBAR.map((i) => {
                    const off = dim && !KEEP.has(i);
                    return (
                      <span
                        key={i}
                        style={{ transitionDelay: `${i * 55}ms` }}
                        className={`h-6 w-6 shrink-0 rounded-md transition-colors duration-500 motion-reduce:!transition-none ${
                          off
                            ? "bg-[rgba(14,21,36,0.045)]"
                            : "bg-[rgba(14,21,36,0.17)]"
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Body: sidebar + table, clipped on both axes */}
                <div className="flex h-[200px] overflow-hidden sm:h-[225px]">
                  {/* Sidebar */}
                  <div className="w-[110px] shrink-0 border-r border-[rgba(14,21,36,0.09)] bg-[rgba(14,21,36,0.02)] px-3 py-3 sm:w-[164px]">
                    {SIDEBAR.map((sw, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 py-[6px] ${
                          i === 4 || i === 13 || i === 22 ? "mt-3" : ""
                        }`}
                      >
                        <span className="h-3 w-3 shrink-0 rounded-[3px] bg-[rgba(14,21,36,0.12)]" />
                        <span
                          style={{ width: `${sw}%` }}
                          className="h-1.5 rounded-full bg-[rgba(14,21,36,0.125)]"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Table */}
                  <div className="min-w-0 flex-1 px-4 py-3">
                    <div className="mb-3 flex gap-2">
                      {[64, 88, 52, 76].map((fw, i) => (
                        <span
                          key={i}
                          style={{ width: fw }}
                          className="h-6 shrink-0 rounded-md border border-[rgba(14,21,36,0.09)] bg-[rgba(14,21,36,0.03)]"
                        />
                      ))}
                    </div>

                    <div className="flex gap-2 border-b border-[rgba(14,21,36,0.11)] pb-2">
                      {Array.from({ length: COLS }, (_, c) => (
                        <span
                          key={c}
                          style={{ width: px(c, 46, 34, 23) }}
                          className="h-1.5 shrink-0 rounded-full bg-[rgba(14,21,36,0.19)]"
                        />
                      ))}
                    </div>

                    {Array.from({ length: ROWS }, (_, r) => (
                      <div
                        key={r}
                        className="flex gap-2 border-b border-[rgba(14,21,36,0.06)] py-[8px]"
                      >
                        {Array.from({ length: COLS }, (_, c) => (
                          <span
                            key={c}
                            style={{ width: px(c * 3 + r, 40, 40, 17) }}
                            className="h-1.5 shrink-0 rounded-full bg-[rgba(14,21,36,0.105)]"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-ink-3)] [font-family:var(--font-mono)]">
              A typical legacy CRM
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
