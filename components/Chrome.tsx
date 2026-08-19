"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "features", label: "Features" },
  { id: "knows", label: "Intelligence" },
  { id: "boundary", label: "Privacy" },
  { id: "faq", label: "Questions" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [here, setHere] = useState<string | null>(null);

  useEffect(() => {
    // Scroll-spy measured straight from the handler so one rule decides it at
    // every position: the last section whose top has passed the reading line.
    const onScroll = () => {
      setSolid(window.scrollY > 24);

      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setHere((prev) => (prev === current ? prev : current));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? "border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]/55 backdrop-blur-2xl backdrop-saturate-150"
            : ""
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a
            href="#main"
            className="inline-flex min-h-11 shrink-0 items-center gap-2"
            aria-label="Jural, home"
          >
            <Image src="/brand/jural-mark.png" alt="" width={24} height={30} priority />
            <span className="text-[21px] font-semibold tracking-[-0.04em]">Jural</span>
          </a>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {SECTIONS.map((s) => {
                const on = here === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "true" : undefined}
                      className={`inline-flex min-h-11 items-center px-3 text-[14px] transition-colors ${
                        on
                          ? "text-[color:var(--color-blue)]"
                          : "text-[color:var(--color-ink-3)] hover:text-[color:var(--color-ink)]"
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href="#access"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[color:var(--color-blue)] px-5 text-[13.5px] font-medium text-white transition-colors hover:bg-[color:var(--color-blue-deep)]"
          >
            Request access
          </a>
        </div>
      </header>
    </>
  );
}
