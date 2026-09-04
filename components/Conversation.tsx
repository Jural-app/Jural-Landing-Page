import Image from "next/image";
import { MessageBarDemo } from "./MessageBarDemo";

/**
 * Conversation: the thesis section, where the chat IS the interface.
 *
 * Built on the Intercom reference, matching its actual structure:
 *   · cards run nearly the full viewport width, not inside the page container
 *   · each card is title / bold subtitle / body
 *   · LEFT card is dark and holds one device
 *   · RIGHT card is vivid and holds the desktop app
 *   · artwork bleeds off the bottom edge, never cropped at the sides
 *
 * The phone is /iphone.webp, the same framed, alpha-channel device used in the
 * Start section, so the two read as one product rather than two treatments.
 * It brings its own rounded frame, which is why there is no clipped top radius
 * here and the shadow is a drop-shadow filter following the real silhouette.
 *
 * ⚠ PLACEHOLDER ARTWORK, replace before launch:
 *   iphone.webp: contains a real, identifiable dispute (named individual,
 *     named company, amounts). Re-capture with fictional data, matching the
 *     Mac shot's "Hale v. Northshore" framing.
 *   _placeholder-mac-case.webp: AI-generated mockup, not the real Mac app.
 */

const PHONE = {
  src: "/iphone.webp",
  alt: "Jural on iPhone showing a completed client intake written up inside the case thread",
  w: 1290,
  h: 2639,
};

const MAC = {
  src: "/screens/_placeholder-mac-case.webp",
  alt: "Jural on macOS showing a case thread with a generated engagement letter",
  w: 1448,
  h: 979,
};


export function Conversation() {
  return (
    <section
      id="solution"
      aria-label="One conversation, every device"
      className="relative bg-white py-20 sm:py-24"
    >
      {/* Full-bleed wash: starts above the heading, fades to white behind
          the two cards, so the demo sits on a ground instead of in a box. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[720px] sm:h-[820px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 30%, rgba(14,130,232,0.14) 0%, rgba(14,130,232,0) 70%), linear-gradient(180deg, var(--color-brand-wash) 0%, var(--color-brand-wash) 45%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* ---- Centred headline ------------------------------------- */}
      <div className="relative mx-auto max-w-[1240px] px-5 text-center sm:px-8">
        <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
          What we built instead
        </div>
        <h2 className="mx-auto max-w-4xl text-[clamp(1.9rem,1rem+2.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
          You already know how to use it.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-[var(--color-ink-2)]">
          Jural replaces the modules and the forms with one conversation per
          matter. Say what you need, typed or spoken, and the work gets done.
        </p>

      </div>

      {/* The entire interface, working: it types, then records, then
          transcribes. Same component the iPhone page closes on, given a
          stage here so it reads as the demo it is, not a search box. */}
      <div className="relative mx-auto mt-10 max-w-[1240px] px-4 sm:mt-12">
        <MessageBarDemo size="lg" />
        <p className="mt-6 text-center text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
          This is the entire interface
        </p>
      </div>

      {/* ---- Two full-bleed cards --------------------------------- */}
      <div className="relative mt-12 grid grid-cols-[minmax(0,1fr)] gap-3 px-4 sm:mt-16 lg:grid-cols-2">
        {/* ============ LEFT: dark, phone only ===================== */}
        <div
          className="relative flex h-[600px] flex-col overflow-hidden rounded-xl sm:h-[710px]"
          style={{
            background:
              "radial-gradient(75% 45% at 50% 100%, rgba(56,192,248,0.26) 0%, rgba(56,192,248,0) 70%), linear-gradient(180deg, #0b1524 0%, #060b14 100%)",
          }}
        >
          <div className="px-6 pt-8 sm:px-10 sm:pt-10">
            <div>
              <h3 className="text-[clamp(1.5rem,1.1rem+1.1vw,2.1rem)] font-semibold tracking-[-0.03em] text-white [font-family:var(--font-display)]">
                In your pocket
              </h3>
              <p className="mt-1 text-[15px] font-semibold text-white/85">
                The iPhone app
              </p>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-white/60">
                Your whole practice, wherever you are. If you have your phone,
                you have every matter, and a minute between meetings is enough
                to move one forward.
              </p>
            </div>
          </div>

          {/* Phone: sized to the space left under the copy, so the whole
              frame shows with a little floor beneath it. */}
          <div className="relative mt-8 flex-1">
            <Image
              src={PHONE.src}
              alt={PHONE.alt}
              width={PHONE.w}
              height={PHONE.h}
              sizes="(min-width: 640px) 240px, 190px"
              quality={90}
              className="absolute left-1/2 top-0 h-[calc(100%-28px)] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>

        {/* ============ RIGHT: vivid, the Mac app ================== */}
        <div className="relative flex h-[600px] flex-col overflow-hidden rounded-xl sm:h-[710px]">
          {/* Rich background, the counterpart to the reference's scenic card */}
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            aria-hidden="true"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[68%_45%]"
          />
          {/* Scrim so the copy stays legible over the bright areas */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(3,20,46,0.74) 0%, rgba(3,20,46,0.30) 40%, rgba(3,20,46,0.02) 100%)",
            }}
          />

          <div className="relative px-6 pt-8 sm:px-10 sm:pt-10">
            <div>
              <h3 className="text-[clamp(1.5rem,1.1rem+1.1vw,2.1rem)] font-semibold tracking-[-0.03em] text-white [font-family:var(--font-display)]">
                One interface, every device
              </h3>
              <p className="mt-1 text-[15px] font-semibold text-white/85">
                The same conversation on iPhone and Mac
              </p>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/70">
                No modules, menus or forms to learn. Every matter is a thread,
                and the thread is the whole interface. Type or speak, on your
                phone or your Mac, always in step.
              </p>
            </div>
          </div>

          {/* Mac sits full-width inside the card, no side cropping. */}
          <div className="relative mt-8 flex-1">
            <Image
              src={MAC.src}
              alt={MAC.alt}
              width={MAC.w}
              height={MAC.h}
              sizes="(min-width: 1024px) 46vw, 92vw"
              quality={90}
              className="absolute left-1/2 top-0 h-auto w-[calc(100%-32px)] -translate-x-1/2 rounded-lg shadow-[0_18px_60px_-18px_rgba(0,0,0,0.7)] sm:w-[calc(100%-56px)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
