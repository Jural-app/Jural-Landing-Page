"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "premise", n: "01", label: "The premise" },
  { id: "matter", n: "02", label: "The product" },
  { id: "knows", n: "03", label: "What it knows" },
  { id: "boundary", n: "04", label: "Privacy" },
  { id: "faq", n: "05", label: "Questions" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [here, setHere] = useState<string | null>(null);

  useEffect(() => {
    // Scroll-spy. Measured directly rather than via IntersectionObserver so
    // the same rule decides it at every scroll position: the last section
    // whose top has passed the reading line wins.
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
            ? "border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]/85 backdrop-blur-xl"
            : ""
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a
            href="#main"
            className="inline-flex min-h-11 shrink-0 items-center gap-2"
            aria-label="Jural, home"
          >
            <Image src="/brand/jural-mark.png" alt="" width={22} height={28} priority />
            <span className="text-[17px] font-semibold tracking-[-0.035em]">Jural</span>
          </a>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {SECTIONS.map((s) => {
                const on = here === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "true" : undefined}
                      className="group inline-flex min-h-11 items-center gap-1.5 px-2.5"
                    >
                      <span
                        className={`num text-[10px] transition-colors ${
                          on
                            ? "text-[color:var(--color-blue)]"
                            : "text-[color:var(--color-ink-4)]"
                        }`}
                      >
                        {s.n}
                      </span>
                      <span
                        className={`text-[13.5px] transition-colors ${
                          on
                            ? "text-[color:var(--color-ink)]"
                            : "text-[color:var(--color-ink-3)] group-hover:text-[color:var(--color-ink)]"
                        }`}
                      >
                        {s.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href="#access"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[color:var(--color-ink)] px-5 text-[13.5px] font-medium text-[color:var(--color-paper)] transition-opacity hover:opacity-85"
          >
            Request access
          </a>
        </div>
      </header>
    </>
  );
}

/** Section marker — mono index + rule. Structural, like a document. */
export function Marker({ n, label, dark }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`num text-[11px] ${dark ? "text-[color:var(--color-chalk-3)]" : "text-[color:var(--color-ink-4)]"}`}>
        {n}
      </span>
      <span className={`h-px w-8 ${dark ? "bg-[color:var(--color-rule-dark)]" : "bg-[color:var(--color-rule)]"}`} />
      <span className={`mono ${dark ? "text-[color:var(--color-chalk-3)]" : "text-[color:var(--color-ink-3)]"}`}>
        {label}
      </span>
    </div>
  );
}
