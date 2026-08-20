import Image from "next/image";

/**
 * Full-bleed two-panel footer: the section list and a CTA on the left, the mark
 * debossed into a recessed panel on the right, one legal bar across the whole
 * width. No container, no card, the panels run to the viewport edge and the
 * split itself is the only structure.
 *
 * Only the section list, the CTA and the two live subdomains are links.
 * Everything else is plain text until the pages behind it exist, because a link
 * to nowhere is worse than no link at all.
 */

const BIG = [
  { href: "#", label: "Home" },
  { href: "#problem", label: "The problem" },
  { href: "#solution", label: "Our solution" },
  { href: "#features", label: "What it does" },
  { href: "#security", label: "Security" },
  { href: "#demo", label: "Get a demo" },
];

const IN_THE_APP = [
  "Cases and matters",
  "AI client intake",
  "Case chat",
  "Documents",
  "Drafting",
  "E-signature",
  "Time and billing",
];

/** Live today, so these are real links. */
const LIVE = [
  { label: "Trust Center", href: "https://trust.jural.app" },
  { label: "Status", href: "https://status.jural.app" },
];

// Plain text for now. Give these real URLs and they can become links again.
const COMPANY = ["Contact us", "Privacy Policy", "Terms of Service"];
const LEGAL = ["Privacy Policy", "Terms of Service", "Security"];
const SOCIAL = ["LinkedIn", "X"];

/** Lines the footer up with the page above. */
const PAD = "px-6 sm:px-10";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-paper)]">
      <div className="grid lg:grid-cols-2">
        {/* ---------------------------------------------- left panel */}
        <div className={`${PAD} pb-10 pt-14 md:pt-16`}>
          <nav aria-label="Footer">
            <ul>
              {BIG.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block py-1.5 text-[clamp(1.9rem,1.1rem+2.3vw,3.05rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand)] [font-family:var(--font-display)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:max-w-[30rem]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)] [font-family:var(--font-mono)]">
                In the app
              </p>
              <ul className="mt-5 space-y-2.5">
                {IN_THE_APP.map((t) => (
                  <li key={t} className="text-[13.5px] text-[var(--color-ink-2)]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)] [font-family:var(--font-mono)]">
                Company
              </p>
              <ul className="mt-5 space-y-2.5">
                {LIVE.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-brand)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                {COMPANY.map((t) => (
                  <li key={t} className="text-[13.5px] text-[var(--color-ink-2)]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* tagline + CTA */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--color-line)] pt-8">
            {/* Brand gradient, deep blue into the brand blue. The bright cyan is
                deliberately left out: it falls under 3:1 on paper, and this is
                text, not decoration. */}
            <p className="bg-gradient-to-r from-[var(--color-brand-dark)] to-[var(--color-brand)] bg-clip-text text-[clamp(1.25rem,1rem+0.9vw,1.6rem)] font-semibold tracking-[-0.028em] text-transparent [font-family:var(--font-display)]">
              The whole practice, in one conversation.
            </p>

            <a
              href="#demo"
              className="group inline-flex items-center rounded-full bg-[var(--color-brand)] text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-brand-deep)]"
            >
              <span className="py-3 pl-5 pr-4">Get 14 Days Demo</span>
              <span aria-hidden="true" className="h-5 w-px bg-white/30" />
              <span
                aria-hidden="true"
                className="px-4 transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* ---------------------------------------------- right panel: debossed mark */}
        <div
          aria-hidden="true"
          className="relative hidden overflow-hidden border-l border-[var(--color-line)] bg-[var(--color-canvas)] lg:block"
        >
          <Image
            src="/brand/Jural.png"
            alt=""
            width={560}
            height={560}
            className="pointer-events-none absolute bottom-8 right-8 w-[68%] max-w-[430px] select-none"
          />
        </div>
      </div>

      {/* ---------------------------------------------- legal bar */}
      <div
        className={`${PAD} flex flex-col gap-4 border-t border-[var(--color-line)] py-5 text-[12.5px] text-[var(--color-ink-3)] md:flex-row md:items-center md:justify-between`}
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span>All rights reserved © {new Date().getFullYear()} Jural</span>
          {LEGAL.map((t) => (
            <span key={t} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="text-[var(--color-ink-3)]/45">
                ·
              </span>
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5">
          {SOCIAL.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <p
        className={`${PAD} max-w-[68ch] pb-10 text-[12px] leading-relaxed text-[var(--color-ink-3)]`}
      >
        Practice management software for licensed legal professionals. Not legal
        advice, and not a substitute for professional judgment.
      </p>
    </footer>
  );
}
