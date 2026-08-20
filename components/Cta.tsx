import Image from "next/image";

/**
 * Closing CTA: one full-bleed photograph with the copy in a frosted panel.
 *
 * Two things drove the design.
 *
 * The frame is 8:3 with the subject sitting around 24% from the left, so the
 * right two thirds is open background. That is where the copy goes, and
 * object-position holds her in shot as the crop tightens on narrow screens.
 *
 * The panel is frosted glass rather than a flat scrim because the photograph is
 * already full of glass, and because "private by architecture" is the argument
 * this page closes on. Borrowing the material out of the picture makes the
 * panel look intended rather than dropped on top. It also does the practical
 * work: backdrop-blur guarantees the type stays readable over foliage, which a
 * plain gradient could not promise at every crop.
 *
 * The gradient underneath is doing the opposite job to a normal scrim: it is
 * lightest over the subject so she is never muddied, and deepens to the right
 * so the panel has something solid to sit against.
 *
 * Desktop height is deliberately short. object-cover crops whichever axis
 * overflows, so a tall band would fill the height and throw away the sides of
 * an 8:3 frame. At 560px the container is 2.57:1 against the source's 2.67:1,
 * which keeps about 96% of the width on screen at 1440 and all of it wider
 * still. Raising this height crops the photograph, it does not enlarge it.
 */

export function Cta() {
  return (
    <section
      id="demo"
      aria-label="Get a demo"
      className="relative flex min-h-[780px] items-end overflow-hidden pb-8 sm:min-h-[640px] lg:min-h-[560px] lg:items-center lg:pb-0"
    >
      {/* full-bleed photograph */}
      <Image
        src="/CTA.webp"
        alt="An attorney reviewing a matter on her phone"
        fill
        priority={false}
        sizes="100vw"
        quality={88}
        /* The crop tightens hard on narrow screens: a phone-width container
           shows barely 17% of this 8:3 frame, so the anchor is doing real work
           rather than nudging. 34% lands the window on roughly 28-45% of the
           source, which is the only slice holding both her face and the phone
           she is reading. From lg the X anchor is 100%, pinning the frame's
           right edge to the right edge of the screen. */
        className="object-cover object-[34%_20%] lg:object-[100%_35%]"
      />

      {/* light over the subject, deep on the right */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(3,18,38,0.28) 0%, rgba(3,18,38,0.34) 40%, rgba(3,18,38,0.74) 100%)",
        }}
      />

      {/* a touch of brand in the deep corner, so the band belongs to the palette */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 120% at 118% 88%, rgba(9,76,144,0.55) 0%, rgba(9,76,144,0) 60%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1240px] justify-center px-5 sm:px-8 lg:justify-end">
        <div className="w-full max-w-[500px] rounded-2xl border border-white/12 bg-white/10 p-7 backdrop-blur-2xl sm:p-9">
          <h2 className="text-[clamp(1.75rem,1.05rem+2.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white [font-family:var(--font-display)]">
            Try it on your next matter
          </h2>

          <p className="mt-5 text-[clamp(1.02rem,0.97rem+0.4vw,1.15rem)] leading-relaxed tracking-[-0.014em] text-white/80">
            Fourteen days on your own cases. No setup project, no migration.
            Open a matter, message it, and watch the admin stop being your job.
          </p>

          <a
            href="#demo"
            className="group mt-8 inline-flex items-center rounded-full bg-[var(--color-brand)] text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-brand-deep)]"
          >
            <span className="py-3 pl-5 pr-4">Get 14 Days Demo</span>
            <span aria-hidden="true" className="h-5 w-px bg-white/30" />
            <span
              aria-hidden="true"
              className="px-4 transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
