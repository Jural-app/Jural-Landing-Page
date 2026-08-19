"use client";

import Image from "next/image";
import { useState } from "react";

const NAV = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "The Problem", href: "#problem" },
  { label: "Our Solution", href: "#solution" },
  { label: "Pricings", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

/** Circular arrow that sits at the right edge of the demo button.
 *  Filled with the logo's blue gradient. */
function ArrowBadge() {
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white"
      style={{ background: "linear-gradient(160deg, #38c0f8 0%, #0e82e8 45%, #0562c0 100%)" }}
      aria-hidden="true"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="13 6 19 12 13 18" />
      </svg>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* ---- Announcement bar --------------------------------- */}
      <div
        className="w-full text-white"
        style={{ background: "linear-gradient(90deg, #0670d6 0%, #0e82e8 50%, #0670d6 100%)" }}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-center gap-2 px-5 py-3 text-center text-[13px] sm:text-sm">
          <span className="font-medium">Jural Summit 2026 is happening this September</span>
          <a href="#register" className="hidden items-center gap-1 font-semibold underline-offset-4 hover:underline sm:inline-flex">
            Register your seat
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </a>
        </div>
      </div>

      {/* ---- Nav bar ------------------------------------------ */}
      <div className="w-full border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          {/* Brand */}
          <a href="#" className="flex shrink-0 items-center">
            <Image src="/jural-logo.png" alt="Jural" width={482} height={601} priority className="h-11 w-auto object-contain" />
          </a>

          {/* Links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[15px] font-medium text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-brand)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#demo"
              className="hidden items-center gap-3 rounded-full bg-[#1c2027] py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-black sm:inline-flex"
            >
              Get 14 Days Demo
              <ArrowBadge />
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-lg text-[var(--color-ink)] lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-[var(--color-line)] bg-white lg:hidden">
            <ul className="mx-auto flex max-w-[1240px] flex-col px-5 py-2 sm:px-8">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[15px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-brand)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="py-3">
                <a
                  href="#demo"
                  className="inline-flex items-center gap-3 rounded-full bg-[#1c2027] py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white"
                >
                  Get 14 Days Demo
                  <ArrowBadge />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
