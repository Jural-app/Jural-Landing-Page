import Image from "next/image";
import { LuCheck } from "react-icons/lu";

/**
 * Two panels with the phone straddling the gap between them, on the Popcorn
 * reference.
 *
 * Left carries the three steps that open a matter. Right carries the sharpest
 * number we have: Jural takes 0% of what you invoice. The reference used that
 * slot for a price, and since pricing is not public yet, the 0% claim is the
 * better occupant anyway. It is the one figure a competitor cannot match.
 *
 * The phone is a grid child on small screens, so the three blocks simply stack.
 * From lg its wrapper goes absolute and centres over the gutter, which is why
 * both panels reserve ~145px of inner padding on the facing side: without it
 * the copy would run underneath the device.
 *
 * The wrapper needs an explicit lg width. Preflight sets `max-width:100%` on
 * images, so an absolutely positioned wrapper with no width shrink-to-fits to
 * zero and the phone collapses to 0x0 even with an explicit width set on it.
 *
 * /iphone.webp carries a real alpha channel, so the rounded frame cuts cleanly
 * against whatever sits behind it and drop-shadow follows the actual silhouette.
 * Keep it that way: an opaque export shows its square corners as black wedges
 * once the phone is rotated.
 *
 * ⚠ It still carries the real Droppgroup dispute. Same replacement needed as
 * the other placeholders before launch.
 */

const STEPS = [
  { n: "1", t: "Open the case" },
  { n: "2", t: "Send the intake link" },
  { n: "3", t: "It writes itself up" },
];

export function Start() {
  return (
    <section id="start" aria-label="Getting started" className="bg-white">
      <div className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="relative grid items-center gap-5 lg:grid-cols-2 lg:gap-16">
          {/* ------------------------------------------ left: the steps */}
          <div
            className="rounded-[28px] p-8 sm:p-10 lg:min-h-[430px] lg:pr-[145px]"
            style={{
              background:
                "linear-gradient(155deg, #e8f2fd 0%, #cfe3fa 55%, #bcd8f6 100%)",
            }}
          >
            <h2 className="max-w-[13ch] text-[clamp(1.7rem,1.1rem+1.8vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              A matter opens in three steps
            </h2>

            <ol className="mt-8 space-y-3">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="flex items-center gap-4 rounded-2xl bg-white/55 px-4 py-3.5"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-[13px] font-semibold text-[var(--color-ink-2)]">
                    {s.n}
                  </span>
                  <span className="text-[16px] font-medium tracking-[-0.015em] text-[var(--color-ink)]">
                    {s.t}
                  </span>
                </li>
              ))}
            </ol>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-[13px] font-medium text-[var(--color-ink-2)]">
              No forms anywhere
              <LuCheck size={14} strokeWidth={2.6} className="text-[var(--color-brand)]" />
            </span>
          </div>

          {/* ------------------------------------------ the phone */}
          <div className="flex justify-center lg:pointer-events-none lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:block lg:w-[310px] lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Image
              src="/iphone.webp"
              alt="Jural on iPhone, showing a completed client intake inside the case"
              width={1290}
              height={2639}
              sizes="(min-width: 1024px) 310px, 240px"
              quality={90}
              className="h-auto w-[240px] rotate-[8deg] drop-shadow-[0_28px_50px_rgba(14,21,36,0.28)] sm:w-[280px] lg:w-full"
            />
          </div>

          {/* ------------------------------------------ right: the number */}
          <div className="flex flex-col justify-center rounded-[28px] bg-[#12161d] p-8 text-right sm:p-10 lg:min-h-[560px] lg:pl-[145px]">
            <h2 className="ml-auto max-w-[14ch] text-[clamp(1.7rem,1.1rem+1.8vw,2.5rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white [font-family:var(--font-display)]">
              You keep what you bill.
            </h2>

            <p className="mt-6 text-[clamp(4.5rem,2.5rem+7vw,8rem)] font-semibold leading-[0.86] tracking-[-0.05em] text-white [font-family:var(--font-display)]">
              0%
            </p>
            <p className="mt-3 text-[15px] text-white/60">
              taken from your invoices
            </p>

            <a
              href="/demo"
              className="mt-9 ml-auto inline-flex w-fit items-center rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-[var(--color-ink)] transition-colors hover:bg-white/90"
            >
              Get 14 Days Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
