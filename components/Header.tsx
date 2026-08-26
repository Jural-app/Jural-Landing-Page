"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import type { MouseEvent, RefObject } from "react";
import { flushSync } from "react-dom";

/* ------------------------------------------------------------------ nav data */

type Leaf = { label: string; href: string; blurb?: string };
type Group = { title: string; items: Leaf[] };
type NavEntry = Leaf | { label: string; groups: Group[] };

/**
 * The Product menu is split the way the product actually is: the surfaces a
 * lawyer works on, then what they do there.
 */
const PRODUCT: Group[] = [
  {
    title: "Platform",
    items: [
      { label: "iPhone app", href: "/product/iphone", blurb: "Your firm in your pocket." },
      { label: "Mac app", href: "/product/mac", blurb: "A real native Mac app, not a wrapper." },
    ],
  },
  {
    title: "Features",
    items: [
      { label: "AI client intake", href: "/product/intake", blurb: "The client answers an interview, not a form." },
      { label: "Case chat & assistant", href: "/product/chat", blurb: "One thread per matter, grounded in the case." },
      { label: "Document intelligence", href: "/product/documents", blurb: "Every document read, not just filed." },
      { label: "Document generation", href: "/product/drafting", blurb: "Describe the draft, refine it by prompt." },
      { label: "E-signatures", href: "/product/esign", blurb: "ESIGN and UETA signing, built in." },
      { label: "Time & billing", href: "/product/billing", blurb: "Capture the work, invoice at 0%." },
      { label: "Follow-up assistant", href: "/product/follow-up", blurb: "Check-ins that keep matters moving." },
    ],
  },
];

/**
 * Destinations, not a narrative outline. "The Problem" and "Our Solution" were
 * scroll targets from the single-page build and stay as homepage sections;
 * they are not places to go. Home lives on the logo, which is where people
 * already look for it.
 */
const NAV: NavEntry[] = [
  { label: "Product", groups: PRODUCT },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

const hasMenu = (item: NavEntry): item is Extract<NavEntry, { groups: Group[] }> =>
  "groups" in item;

/* ---------------------------------------------------------------- primitives */

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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      className={`transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ scrolling */

/** Breathing room left between the sticky header and the section heading. */
const LANDING_GAP = 32;

/** How much leading whitespace the walk below is allowed to skip, as a guard
 *  against an unusual section structure flinging the visitor past the heading. */
const MAX_SKIPPED_PADDING = 180;

/**
 * Top of a section's first real content, rather than the top of its box.
 *
 * Sections pad themselves generously (py-24 / py-32), and that padding sits in
 * different places: on the <section> itself in Conversation, on an inner
 * wrapper in Problem, Features and Trust. Aiming at the box edge parks up to
 * 128px of empty space under the header, so the heading arrives partway down
 * an otherwise blank screen.
 *
 * Walking down the first in-flow child finds the heading, eyebrow or badge
 * wherever the padding happens to live, without each section having to declare
 * its own offset. Absolute and hidden children are skipped because decorative
 * background layers are not content.
 */
function contentTop(section: Element) {
  let node: Element = section;
  let top = node.getBoundingClientRect().top;

  for (let depth = 0; depth < 6; depth += 1) {
    const child = Array.from(node.children).find((el) => {
      const style = getComputedStyle(el);
      return style.position !== "absolute" && style.position !== "fixed" && style.display !== "none";
    });
    if (!child) break;

    node = child;
    top = Math.max(top, child.getBoundingClientRect().top);
  }

  return top;
}

/**
 * Scroll to an in-page section without writing the hash into the URL.
 *
 * A plain anchor jump appends "#problem" to the address bar and pushes a
 * history entry, so Back walks the visitor through every section they clicked
 * instead of leaving the site. The homepage is one scroll, so the hash carries
 * no meaning worth putting in the URL.
 *
 * The header offset is measured live rather than hard-coded: the announcement
 * bar wraps at narrow widths, which takes the header from 119px to 220px.
 * Scrolling stays smooth via scroll-behavior in globals.css, which already
 * honours prefers-reduced-motion.
 */
function scrollToSection(href: string, header: RefObject<HTMLElement | null>) {
  if (href === "#") {
    window.scrollTo({ top: 0 });
    return;
  }

  const target = document.querySelector(href);
  if (!target) return;

  const sectionTop = target.getBoundingClientRect().top;
  const skipped = Math.min(contentTop(target) - sectionTop, MAX_SKIPPED_PADDING);
  const offset = (header.current?.offsetHeight ?? 0) + LANDING_GAP;

  window.scrollTo({ top: Math.max(0, sectionTop + skipped + window.scrollY - offset) });
}

/* --------------------------------------------------------------------- header */

export function Header() {
  const [open, setOpen] = useState(false);          // mobile sheet
  const [menu, setMenu] = useState<string | null>(null);   // open desktop dropdown
  const [drawer, setDrawer] = useState<string | null>(null); // open mobile accordion
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = NAV.find((item) => hasMenu(item) && item.label === menu) as
    | Extract<NavEntry, { groups: Group[] }>
    | undefined;

  /* Nothing in the header should point at the page it is already on. */
  const onDemoPage = usePathname() === "/demo";

  const closeAll = () => {
    setOpen(false);
    setMenu(null);
    setDrawer(null);
  };

  /**
   * Hash links scroll without touching the URL; real routes navigate normally.
   * The split matters now that the nav points at /product/* and /pricing:
   * intercepting those would leave the visitor sitting on the homepage after a
   * click that looked like navigation.
   *
   * A link to the route you are already on is the third case, and it is the
   * logo's job on the homepage: go back to the top rather than reload.
   */
  const onNavClick = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    const isHash = href.startsWith("#");
    const isCurrentRoute = !isHash && href === window.location.pathname;

    if (!isHash && !isCurrentRoute) {
      closeAll();
      return;
    }

    e.preventDefault();

    /* Close the mobile menu *before* measuring. The menu is part of the sticky
       header, so while it is open the header is taller and every section sits
       lower; measuring first would aim at a position that stops existing the
       moment the menu collapses. flushSync commits the close synchronously so
       the measurement below reads the settled layout. */
    flushSync(closeAll);

    if (isCurrentRoute) {
      window.scrollTo({ top: 0 });
      return;
    }

    scrollToSection(href, headerRef);
  };

  /* Hover with a short close delay, so crossing the gap between the trigger and
     the panel does not snap the menu shut mid-reach. */
  const hoverOpen = (label: string) => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };

  /**
   * Hide on the way down, come back on the way up. Kept sticky rather than
   * static so the demo CTA is always one upward flick away, instead of only
   * reachable by scrolling to the top of the page.
   */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // ignore sub-pixel jitter, which otherwise flickers the bar
      if (Math.abs(delta) < 5) return;

      // a dropdown left hanging while the bar slides away reads as a bug
      setMenu(null);

      // never hide at the very top, and never hide with the menu open
      if (y < 90 || open) setHidden(false);
      else setHidden(delta > 0);

      lastY.current = y;
    };

    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  /* Escape closes, and a click anywhere outside the header dismisses the panel. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenu(null); setDrawer(null); }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenu(null);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* ---- Announcement bar --------------------------------- */}
      <div
        className="w-full text-white"
        style={{ background: "linear-gradient(90deg, #0670d6 0%, #0e82e8 50%, #0670d6 100%)" }}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-center gap-2 px-5 py-3 text-center text-[13px] sm:text-sm">
          <span className="font-medium">Jural learns the matter from your conversation. No intake forms.</span>
          {!onDemoPage && (
          <a
            href="/demo"
            onClick={onNavClick("/demo")}
            className="hidden items-center gap-1 font-semibold underline-offset-4 hover:underline sm:inline-flex"
          >
            Book a demo
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </a>
          )}
        </div>
      </div>

      {/* ---- Nav bar ------------------------------------------ */}
      <div className="relative w-full border-b border-[var(--color-line)] bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          {/* Brand */}
          <a href="/" onClick={onNavClick("/")} aria-label="Jural home" className="flex shrink-0 items-center">
            <Image src="/jural-logo.png" alt="Jural" width={482} height={601} priority className="h-11 w-auto object-contain" />
          </a>

          {/* Links */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) =>
              hasMenu(item) ? (
                <li
                  key={item.label}
                  onMouseEnter={hoverOpen(item.label)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    aria-expanded={menu === item.label}
                    aria-haspopup="true"
                    onClick={() => setMenu((v) => (v === item.label ? null : item.label))}
                    className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors duration-200 ${
                      menu === item.label
                        ? "text-[var(--color-ink)]"
                        : "text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
                    }`}
                  >
                    {item.label}
                    <Chevron open={menu === item.label} />
                  </button>
                </li>
              ) : (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={onNavClick(item.href)}
                    className="text-[15px] font-medium text-[var(--color-ink-2)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                  >
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {!onDemoPage && (
              <a
                href="/demo"
                onClick={onNavClick("/demo")}
                className="hidden items-center gap-3 rounded-full bg-[#1c2027] py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white transition-colors hover:bg-black sm:inline-flex"
              >
                Get 14 Days Demo
                <ArrowBadge />
              </a>
            )}

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

        {/* Full-bleed panel. It lives outside <nav> so it can span the viewport
            rather than the 1240px rail, and it keeps its own hover handlers
            because the pointer leaves the trigger to reach it. */}
        {openMenu && (
          <div
            onMouseEnter={hoverOpen(openMenu.label)}
            onMouseLeave={hoverClose}
            className="menu-in absolute inset-x-0 top-full hidden border-b border-[var(--color-line)] bg-white shadow-[0_24px_48px_-32px_rgba(14,21,36,0.4)] lg:block"
          >
            <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,260px)_1px_minmax(0,1fr)] gap-x-12 px-5 py-11 sm:px-8">
              {openMenu.groups.map((group, i) => (
                <Fragment key={group.title}>
                  {/* Hairline between the surfaces and what you do on them. */}
                  {i > 0 && <div className="bg-[var(--color-line)]" />}

                  <div>
                    <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-3)]">
                      {group.title}
                    </div>
                    <ul
                      className={
                        group.items.length > 3
                          ? "grid grid-cols-3 gap-x-10 gap-y-5"
                          : "flex flex-col gap-5"
                      }
                    >
                      {group.items.map((leaf) => (
                        <li key={leaf.href}>
                          <a href={leaf.href} onClick={onNavClick(leaf.href)} className="group block">
                            <span className="relative inline-block text-[14.5px] font-semibold text-[var(--color-ink)]">
                              {leaf.label}
                              {/* Draws in from the left instead of filling a
                                  block behind the row. */}
                              <span
                                aria-hidden="true"
                                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-brand)] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                              />
                            </span>
                            {leaf.blurb && (
                              <span className="mt-1.5 block max-w-[30ch] text-[12.5px] leading-relaxed text-[var(--color-ink-3)] transition-colors duration-200 group-hover:text-[var(--color-ink-2)]">
                                {leaf.blurb}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {open && (
          <div className="max-h-[calc(100dvh-119px)] overflow-y-auto border-t border-[var(--color-line)] bg-white lg:hidden">
            <ul className="mx-auto flex max-w-[1240px] flex-col px-5 py-2 sm:px-8">
              {NAV.map((item) =>
                hasMenu(item) ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={drawer === item.label}
                      onClick={() => setDrawer((v) => (v === item.label ? null : item.label))}
                      className="flex w-full items-center justify-between py-3 text-[15px] font-medium text-[var(--color-ink-2)]"
                    >
                      {item.label}
                      <Chevron open={drawer === item.label} />
                    </button>

                    {drawer === item.label && (
                      <div className="flex flex-col gap-5 pb-4 pl-1">
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
                              {group.title}
                            </div>
                            <ul className="flex flex-col">
                              {group.items.map((leaf) => (
                                <li key={leaf.href}>
                                  <a
                                    href={leaf.href}
                                    onClick={onNavClick(leaf.href)}
                                    className="block py-2 text-[14.5px] font-medium text-[var(--color-ink)]"
                                  >
                                    {leaf.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={onNavClick(item.href)}
                      className="block py-3 text-[15px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-brand)]"
                    >
                      {item.label}
                    </a>
                  </li>
                )
              )}
              {!onDemoPage && (
                <li className="py-3">
                  <a
                    href="/demo"
                    onClick={onNavClick("/demo")}
                    className="inline-flex items-center gap-3 rounded-full bg-[#1c2027] py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white"
                  >
                    Get 14 Days Demo
                    <ArrowBadge />
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
