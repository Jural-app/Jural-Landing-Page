import Image from "next/image";

/**
 * Full-bleed two-panel footer: the section list and a CTA on the left, the mark
 * debossed into a recessed panel on the right, one legal bar across the whole
 * width. No container, no card, the panels run to the viewport edge and the
 * split itself is the only structure.
 *
 * Only the section list and the CTA are links. Everything else is plain text
 * until the pages behind it exist, because a link to nowhere is worse than no
 * link at all.
 */

const BIG = [
  { href: "#main", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#knows", label: "What it knows" },
  { href: "#boundary", label: "Privacy" },
  { href: "#faq", label: "Questions" },
  { href: "#access", label: "Request access" },
];

const IN_THE_APP = [
  "Cases",
  "Time capture",
  "Billing & invoices",
  "Documents",
  "Drafting",
  "E-signature",
  "Reminders",
];

// Plain text for now. Give these real URLs and they can become links again.
const COMPANY = ["Contact us", "Privacy Policy", "Terms of Service"];
const LEGAL = ["Privacy Policy", "Terms of Service", "Security"];
const SOCIAL = ["LinkedIn", "X"];

/** Matches `.wrap`'s inline padding so the footer lines up with the page above. */
const PAD = "px-[22px] [@media(min-width:900px)]:px-11";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
      <div className="grid lg:grid-cols-2">
        {/* ---------------------------------------------- left panel */}
        <div className={`${PAD} pb-10 pt-14 md:pt-16`}>
          <nav aria-label="Footer">
            <ul>
              {BIG.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block py-1.5 text-[clamp(1.9rem,1.1rem+2.3vw,3.05rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-[color:var(--color-ink)] transition-colors hover:text-[color:var(--color-blue)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:max-w-[28rem]">
            <div>
              <p className="mono text-[color:var(--color-ink-4)]">In the app</p>
              <ul className="mt-5 space-y-2.5">
                {IN_THE_APP.map((t) => (
                  <li key={t} className="text-[13.5px] text-[color:var(--color-ink-2)]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mono text-[color:var(--color-ink-4)]">Company</p>
              <ul className="mt-5 space-y-2.5">
                {COMPANY.map((t) => (
                  <li key={t} className="text-[13.5px] text-[color:var(--color-ink-2)]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* tagline + CTA */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-[color:var(--color-rule)] pt-8">
            {/* Brand gradient, deep azure → azure. Cyan is deliberately left out:
                it falls under 3:1 on paper, and this is text, not decoration. */}
            <p className="bg-gradient-to-r from-[color:var(--color-blue-deep)] to-[color:var(--color-azure)] bg-clip-text text-[clamp(1.25rem,1rem+0.9vw,1.6rem)] font-semibold tracking-[-0.028em] text-transparent">
              Your whole practice, in one thread.
            </p>

            <a
              href="#access"
              className="group inline-flex items-center rounded-full bg-[color:var(--color-blue)] text-[14px] font-medium text-white transition-colors hover:bg-[color:var(--color-blue-deep)]"
            >
              <span className="py-3 pl-5 pr-4">Request access</span>
              <span aria-hidden="true" className="h-5 w-px bg-white/30" />
              <span aria-hidden="true" className="px-4 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>

        {/* ---------------------------------------------- right panel: debossed mark */}
        <div
          aria-hidden="true"
          className="relative hidden overflow-hidden border-l border-[color:var(--color-rule)] bg-[color:var(--color-paper-2)] lg:block"
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
        className={`${PAD} flex flex-col gap-4 border-t border-[color:var(--color-rule)] py-5 text-[12.5px] text-[color:var(--color-ink-4)] md:flex-row md:items-center md:justify-between`}
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span>All rights reserved © {new Date().getFullYear()} Jural</span>
          {LEGAL.map((t) => (
            <span key={t} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="text-[color:var(--color-ink-4)]/45">
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
        className={`${PAD} max-w-[68ch] pb-10 text-[12px] leading-relaxed text-[color:var(--color-ink-4)]`}
      >
        Practice management software for licensed legal professionals. Not legal
        advice, and not a substitute for professional judgment.
      </p>
    </footer>
  );
}
