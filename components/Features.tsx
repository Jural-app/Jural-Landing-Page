"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  BillingUI,
  DocumentsUI,
  DraftingUI,
  FEATURE_ICONS,
  IntakeUI,
  SignatureUI,
  ThreadUI,
} from "./FeatureUI";

/**
 * The list on the left is read by scrolling, not clicking: whichever item sits
 * nearest the middle of the viewport becomes active, and the pinned panel on
 * the right swaps to its screen.
 *
 * Inactive items keep an AA text colour rather than fading out. Dimming copy
 * to signal focus is a contrast bug wearing a design hat.
 *
 * The six items are ordered as one matter moving through the firm, intake to
 * paid, so the section reads as a sequence rather than a menu of features. That
 * matters here: the Problem section above attacks legacy CRMs for having
 * hundreds of features nobody uses, and a grid of tiles would undercut it.
 */

/** Panel ground for the coded screens. */
const PANEL = {
  backgroundImage: "url('/brand/features-bg.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ITEMS = [
  {
    t: "Intake without forms",
    d: "The client answers an adaptive interview instead of filling in a form. It asks its own follow-ups, reads what they upload, and the matter arrives already written up.",
    Icon: FEATURE_ICONS.intake,
    ui: <IntakeUI />,
  },
  {
    t: "Every case is a thread",
    d: "Ask for case information, log time by speaking it, attach a document or schedule a task, all in one conversation. Actions come back as cards you approve.",
    Icon: FEATURE_ICONS.thread,
    ui: <ThreadUI />,
  },
  {
    t: "It reads your documents",
    d: "Text layers and OCR are extracted on the device, then digested into type, parties, dates and amounts. The raw file never leaves your phone unencrypted.",
    Icon: FEATURE_ICONS.documents,
    ui: <DocumentsUI />,
  },
  {
    t: "Drafting from the file",
    d: "Client, matter and firm details fill deterministically from records. The model is asked only to write the narrative, which is the part it is actually good at.",
    Icon: FEATURE_ICONS.drafting,
    ui: <DraftingUI />,
  },
  {
    t: "Signature, in house",
    d: "Send for signature and the signer verifies by email and passcode, with consent captured. The executed PDF gets a certificate and a hash seal, filed back to the case.",
    Icon: FEATURE_ICONS.signature,
    ui: <SignatureUI />,
  },
  {
    t: "Paid, and you keep all of it",
    d: "Build an invoice from unbilled time and take payment through Stripe Connect. Your firm is the merchant of record and Jural takes 0% of what you invoice.",
    Icon: FEATURE_ICONS.billing,
    ui: <BillingUI />,
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
    <section id="features" aria-label="What Jural does" className="bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-[16ch] text-[clamp(2.1rem,1.1rem+3.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              One matter, start to paid
            </h2>
            <p className="mt-5 max-w-[52ch] text-[clamp(1.05rem,0.98rem+0.45vw,1.2rem)] leading-relaxed tracking-[-0.014em] text-[var(--color-ink-2)]">
              Intake, the case file, documents, drafting, signature and billing.
              Not a menu to learn, a sequence you already follow.
            </p>
          </div>

          <a
            href="/demo"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[rgba(14,21,36,0.2)] px-5 text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:border-[rgba(14,21,36,0.45)]"
          >
            Get 14 Days Demo
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              ›
            </span>
          </a>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-16">
          {/* the list is the scrub track */}
          <ul className="min-w-0">
            {ITEMS.map((it, i) => {
              const on = i === active;
              const Icon = it.Icon;
              return (
                <li
                  key={it.t}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="relative border-t border-[var(--color-line)] py-10 pl-8 lg:flex lg:min-h-[58vh] lg:flex-col lg:justify-center lg:py-12"
                >
                  {/* active marker rides the rule */}
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute bottom-10 left-0 top-10 w-[2px] rounded-full bg-[var(--color-brand)] lg:bottom-12 lg:top-12"
                  />

                  <motion.span
                    aria-hidden="true"
                    animate={{ color: on ? "var(--color-brand)" : "var(--color-ink-3)" }}
                    transition={{ duration: 0.45 }}
                    className="block"
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </motion.span>

                  <motion.h3
                    animate={{ color: on ? "var(--color-ink)" : "var(--color-ink-2)" }}
                    transition={{ duration: 0.45 }}
                    className="mt-5 text-[clamp(1.45rem,1.1rem+1vw,1.95rem)] font-medium leading-[1.15] tracking-[-0.03em]"
                  >
                    {it.t}
                  </motion.h3>

                  <p className="mt-4 max-w-[44ch] text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-[var(--color-ink-3)]">
                    {it.d}
                  </p>

                  {/* below lg nothing can pin, so each item carries its own screen */}
                  <div
                    className="mt-7 grid place-items-center overflow-hidden rounded-2xl p-5 lg:hidden"
                    style={PANEL}
                  >
                    {it.ui}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* pinned screen */}
          <div className="hidden min-w-0 lg:block">
            <div className="sticky top-[max(6rem,calc(50vh-250px))]">
              <div
                className="mx-auto grid h-[calc(100vh-16rem)] max-h-[500px] min-h-[400px] w-full max-w-[464px] place-items-center overflow-hidden rounded-2xl p-6"
                style={PANEL}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {ITEMS[active].ui}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
