"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Problem: copy on the left, and on the right a Mac desktop (/mac.jpg) with a
 * legacy CRM window open on it, so the "built for a desk" line has a desk to
 * point at.
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
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-12">
          {/* ---- Left: eyebrow, headline, body ------------------- */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              The problem
            </div>

            <h2 className="text-[clamp(1.55rem,1rem+1.3vw,2rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Legal software was built for a desk. A lawyer&rsquo;s day
              doesn&rsquo;t happen at one.
            </h2>

            <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              <p>
                For over a decade, law firms came to us asking for a custom
                CRM while already paying for a well-known one. It was never
                the cost, and it was never privacy. It was that every task
                meant sitting down, opening a module and filling in a form.
              </p>
              <p className="font-semibold text-[var(--color-ink)]">
                Hundreds of features. A handful ever used. Every one of them
                waiting to be typed into.
              </p>
            </div>
          </div>
          {/* ---- Right: a Mac desktop with the window open on it -- */}
          <div>
            <div
              ref={ref}
              className="relative aspect-[5/4] overflow-hidden rounded-xl bg-[var(--color-canvas-deep)] sm:aspect-[2048/1332]"
            >
              {/* The desktop. Menu bar stays visible above the window and
                  the Dock below it, so it reads as a laptop screen rather
                  than a screenshot in a box. */}
              <Image
                src="/mac.jpg"
                alt=""
                fill
                aria-hidden="true"
                sizes="(min-width: 1024px) 760px, 100vw"
                quality={90}
                className="object-cover"
              />

              {/* The window floats where a Mac window would: clear of the
                  menu bar, above the Dock, with a real macOS-weight shadow. */}
              <div className="absolute inset-x-[6%] bottom-[12.5%] top-[8.5%] flex flex-col overflow-hidden rounded-[10px] border border-[rgba(14,21,36,0.18)] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.16),0_28px_70px_-18px_rgba(0,20,60,0.6)]">
                {/* Title bar */}
                <div className="flex shrink-0 items-center gap-3 border-b border-[rgba(14,21,36,0.09)] bg-[rgba(14,21,36,0.035)] px-4 py-2.5">
                  <div className="flex gap-1.5">
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                      <span
                        key={c}
                        style={{ backgroundColor: c }}
                        className="h-[10px] w-[10px] rounded-full ring-1 ring-inset ring-black/10"
                      />
                    ))}
                  </div>
                  <span className="ml-1 h-2 w-36 rounded-full bg-[rgba(14,21,36,0.13)]" />
                  <span className="ml-auto h-2 w-14 rounded-full bg-[rgba(14,21,36,0.09)]" />
                </div>

                {/* Tab strip */}
                <div className="flex shrink-0 items-end gap-1 border-b border-[rgba(14,21,36,0.09)] bg-[rgba(14,21,36,0.02)] px-3 pt-2">
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
                <div className="flex shrink-0 gap-1.5 overflow-hidden border-b border-[rgba(14,21,36,0.09)] px-4 py-2.5">
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

                {/* Body: sidebar + table, fills the window and clips on both axes */}
                <div className="flex min-h-0 flex-1 overflow-hidden">
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
              A typical legacy CRM. Twenty-four tools in the ribbon, four in use.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
