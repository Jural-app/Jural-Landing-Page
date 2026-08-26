import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { MessageBarDemo } from "@/components/MessageBarDemo";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import {
  AskTheCaseUI,
  CourthouseUI,
  HallwayUI,
  KitchenCounterUI,
} from "@/components/PocketUI";

export const metadata: Metadata = {
  title: "iPhone app | Jural",
  description:
    "Jural on iPhone is not a companion app. It is the whole firm: cases, documents, signatures and billing, working wherever your day happens.",
};

/**
 * The iPhone page argues one claim: the phone is the firm, not a porthole into
 * a desktop product. The spine is a single working day on one matter, told in
 * four scenes; capabilities appear as consequences of the day, never as a
 * feature grid.
 *
 * ▸ The scene panels are drawn skies. One gradient system, four hours: the
 *   light warms, peaks, deepens and sets as you scroll, and the sun's glow
 *   moves across the panels like a sundial. All CSS, no images.
 *
 */

type Scene = {
  time: string;
  place: string;
  title: string;
  body: string;
  ui: React.ReactNode;
  /** Drawn sky behind the screen; see SKY below. */
  sky: React.CSSProperties;
};

/**
 * Four skies, one system. Each is a horizon gradient plus one radial glow for
 * the sun; the glow's anchor walks left to right and finally drops below the
 * frame, so the set reads as a single day rather than four decorated boxes.
 * Hues stay inside the site's blue family; the only warmth is the sun itself.
 */
const SKY = {
  morning: {
    background: [
      "radial-gradient(60% 55% at 16% 92%, rgba(255,214,156,0.55) 0%, rgba(255,214,156,0) 60%)",
      "linear-gradient(180deg, #cfe6f7 0%, #e4f1fb 52%, #f6efe2 100%)",
    ].join(", "),
  },
  noon: {
    background: [
      "radial-gradient(55% 45% at 50% -12%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 58%)",
      "linear-gradient(180deg, #56b3f2 0%, #8fd0f8 58%, #d3ecfc 100%)",
    ].join(", "),
  },
  afternoon: {
    background: [
      "radial-gradient(52% 48% at 84% 34%, rgba(255,231,178,0.5) 0%, rgba(255,231,178,0) 62%)",
      "linear-gradient(180deg, #0a6fd0 0%, #2ea6f0 62%, #8ed4f8 100%)",
    ].join(", "),
  },
  evening: {
    background: [
      "radial-gradient(70% 42% at 55% 108%, rgba(242,142,96,0.5) 0%, rgba(242,142,96,0) 64%)",
      "linear-gradient(180deg, #05294d 0%, #0a3c6e 58%, #2c5f92 100%)",
    ].join(", "),
  },
} satisfies Record<string, React.CSSProperties>;

/** The index between the day and the close: every feature the scenes ran on. */
const FEATURES = [
  { label: "AI client intake", href: "/product/intake", blurb: "An interview, not a form." },
  { label: "Case chat & assistant", href: "/product/chat", blurb: "Answers grounded in the file." },
  { label: "Document intelligence", href: "/product/documents", blurb: "Every document read, not just filed." },
  { label: "Document generation", href: "/product/drafting", blurb: "Drafts filled from the case." },
  { label: "E-signatures", href: "/product/esign", blurb: "Signed and filed back in minutes." },
  { label: "Time & billing", href: "/product/billing", blurb: "Captured in passing. Invoiced at 0%." },
  { label: "Follow-up assistant", href: "/product/follow-up", blurb: "Check-ins that keep matters moving." },
];

const SCENES: Scene[] = [
  {
    time: "9:40 AM",
    place: "County courthouse, walking out",
    title: "The hearing files itself.",
    body: "Talk to the case on the way to your car. The note lands in the matter, the follow-ups become tasks, and the time is logged before you reach the parking meter.",
    ui: <CourthouseUI />,
    sky: SKY.morning,
  },
  {
    time: "12:15 PM",
    place: "Between meetings",
    title: "Ask the case, not your memory.",
    body: "A client wants a number you last saw three weeks ago. The answer comes from the file with its source attached. And when something is not on file, Jural says so instead of guessing.",
    ui: <AskTheCaseUI />,
    sky: SKY.noon,
  },
  {
    time: "3:05 PM",
    place: "A hallway, six spare minutes",
    title: "Paper moves at hallway speed.",
    body: "An engagement letter drafted from what the case already knows, sent for signature, executed and filed back before the next meeting starts.",
    ui: <HallwayUI />,
    sky: SKY.afternoon,
  },
  {
    time: "6:30 PM",
    place: "Kitchen counter",
    title: "The day bills itself.",
    body: "Every minute captured in passing is already an invoice line. Read it once, send it. Your client pays you directly, and you keep all of it.",
    ui: <KitchenCounterUI />,
    sky: SKY.evening,
  },
];

export default function IPhonePage() {
  return (
    <main>
      <Header />

      {/* ------------------------------------------------------------ hero */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1340px] items-center gap-12 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:pb-16 lg:pt-12">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              The iPhone app
            </div>

            <h1 className="mt-5 max-w-[14ch] text-[clamp(2.3rem,1.2rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Your whole firm, off the desk.
            </h1>

            <p className="mt-6 max-w-[46ch] text-[clamp(1.02rem,0.97rem+0.4vw,1.18rem)] leading-relaxed text-[var(--color-ink-2)]">
              This is not a companion to the real thing. It is the real thing:
              every case, document, signature and invoice, working wherever your
              day happens to put you.
            </p>

            <a
              href="/demo"
              className="group mt-9 inline-flex items-center rounded-full bg-[var(--color-brand)] text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-brand-deep)]"
            >
              <span className="py-3 pl-5 pr-4">Get 14 Days Demo</span>
              <span aria-hidden="true" className="h-5 w-px bg-white/30" />
              <span aria-hidden="true" className="px-4 transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </div>

          {/* Photograph, not a device render: the product appears as a card
              floating off the photo's edge, which is where it lives in real
              life too. */}
          <div className="relative">
            <div className="relative h-[420px] w-full overflow-hidden rounded-[28px] sm:h-[480px] lg:h-[560px]">
              <Image
                src="/product-mobile-app.webp"
                alt="An attorney working a matter from her phone between buildings"
                fill
                priority
                sizes="(min-width: 1024px) 900px, 130vw"
                quality={88}
                /* The height-capped frame shows about three quarters of the
                   source width; 55% keeps her right of centre with the
                   buildings on the left, clear of the card. */
                className="object-cover object-[55%_center]"
              />
            </div>

            {/* The overlap card: one message, and what happened because of it */}
            <div className="absolute left-0 top-[14%] w-[300px] rounded-[20px] bg-white p-4 shadow-[0_34px_80px_-26px_rgba(14,21,36,0.5)] ring-1 ring-[rgba(14,21,36,0.07)] lg:-left-8">
              <div className="flex justify-end">
                <p className="max-w-[92%] rounded-2xl bg-[var(--color-brand)] px-3.5 py-2.5 text-[13px] leading-snug text-white">
                  Send Alex the engagement letter for signature
                </p>
              </div>
              <div className="mt-3 space-y-2 border-t border-[var(--color-line)] pt-3">
                <p className="flex items-center gap-2 text-[12px] font-medium text-[var(--color-ink-2)]">
                  <span className="grid h-4.5 w-4.5 place-items-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Sent for signature
                  <span className="ml-auto font-normal tabular-nums text-[var(--color-ink-3)]">3:07 PM</span>
                </p>
                <p className="flex items-center gap-2 text-[12px] font-medium text-[var(--color-ink-2)]">
                  <span className="grid h-4.5 w-4.5 place-items-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Executed, filed to the case
                  <span className="ml-auto font-normal tabular-nums text-[var(--color-ink-3)]">3:19 PM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- the reframe */}
      <section aria-label="The porthole problem" className="bg-[var(--color-canvas)]">
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <p className="mx-auto max-w-[34ch] text-center text-[clamp(1.5rem,1rem+1.8vw,2.4rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            Every practice tool has a phone app. Almost all of them are
            portholes: check a date, log a call,{" "}
            <span className="text-[var(--color-ink-3)]">
              finish the real work at a desk.
            </span>
          </p>
          <p className="mx-auto mt-6 max-w-[34ch] text-center text-[clamp(1.5rem,1rem+1.8vw,2.4rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-[var(--color-brand)] [font-family:var(--font-display)]">
            Jural is built the other way around. The desk is the companion.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- the device */}
      <section aria-label="The app" className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-[1340px] items-center gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_minmax(0,960px)_1fr] lg:gap-2">
          {/* left annotation */}
          <p className="mx-auto max-w-[24ch] text-center text-[15px] leading-relaxed text-[var(--color-ink-2)] lg:mx-0 lg:max-w-[17ch] lg:text-right">
            <span className="font-semibold text-[var(--color-ink)]">
              Built as an iPhone app,
            </span>{" "}
            not a desktop product shrunk to fit one.
          </p>

          {/* the phones */}
          <div className="order-first lg:order-none">
            <Image
              src="/screens/mockup.webp"
              alt="Three iPhones running Jural, a client intake arriving into the case thread on the centre screen"
              width={3000}
              height={2000}
              sizes="(min-width: 1024px) 960px, 96vw"
              quality={92}
              className="h-auto w-full"
            />
            <p className="mt-5 text-center text-[13px] text-[var(--color-ink-3)]">
              Jural for iOS. Every case, wherever the day takes you.
            </p>
          </div>

          {/* right annotation */}
          <p className="mx-auto max-w-[24ch] text-center text-[15px] leading-relaxed text-[var(--color-ink-2)] lg:mx-0 lg:max-w-[17ch] lg:text-left">
            <span className="font-semibold text-[var(--color-ink)]">
              The whole case rides along:
            </span>{" "}
            documents, tasks, billing and signatures, in one thread.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------ the Tuesday */}
      <section aria-label="One working day" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mb-16 sm:mb-20">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              One matter, one Tuesday
            </div>
            <h2 className="mt-4 max-w-[24ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              A day in Hale v. Northshore, without a desk in it.
            </h2>
          </div>

          <div className="flex flex-col gap-20 sm:gap-24">
            {SCENES.map((scene, i) => (
              <div
                key={scene.time}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* text column; odd scenes swap sides on desktop */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[14px] font-semibold tabular-nums tracking-[-0.01em] text-[var(--color-brand-dark)]">
                      {scene.time}
                    </span>
                    <span className="text-[12.5px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                      {scene.place}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[clamp(1.45rem,1rem+1.2vw,1.9rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
                    {scene.title}
                  </h3>

                  <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
                    {scene.body}
                  </p>
                </div>

                {/* screen column: a drawn sky tells the hour */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div
                    className="flex justify-center rounded-[20px] px-6 py-10 sm:py-12"
                    style={scene.sky}
                  >
                    {scene.ui}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- zero learning curve */}
      <section aria-label="No training required" className="bg-white">
        <div className="mx-auto max-w-[1240px] border-t border-[var(--color-line)] px-5 py-20 text-center sm:px-8 sm:py-24">
          <h2 className="mx-auto max-w-[18ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            If you can text, you&rsquo;re trained.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-2)]">
            There is no admin mode to learn and no form waiting behind any of
            this. You saw the whole interface in the scenes above: a thread, and
            a firm that listens to it.
          </p>

          {/* The entire interface, drawn once more, working: it types, then
              records, then transcribes. */}
          <MessageBarDemo />
        </div>
      </section>

      {/* --------------------------------------------------- feature index */}
      <section aria-label="What the thread can do" className="bg-white">
        <div className="mx-auto grid max-w-[1340px] gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          {/* image column: stretches to whatever height the index needs */}
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] lg:min-h-0">
            <Image
              src="/cta-2.webp"
              alt="An attorney reading a case on his phone"
              fill
              /* The tall cover crop scales the landscape source to ~2x the
                 column width before cropping; the hint must cover that. */
              sizes="(min-width: 1024px) 1250px, 140vw"
              quality={95}
              /* Subject stands left of centre in the source; anchoring there
                 keeps him in frame across the tall crop. */
              className="object-cover object-[28%_center]"
            />
          </div>

          {/* index column */}
          <div>
            <div className="pb-8">
              <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
                Under the thread
              </div>
              <h2 className="mt-4 max-w-[16ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
                Seven jobs, one conversation.
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
                Everything the day above ran on. Each has a page of its own.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 sm:gap-x-10">
              {FEATURES.map((f) => (
                <a
                  key={f.href}
                  href={f.href}
                  className="group flex items-center gap-6 border-t border-[var(--color-line)] py-5"
                >
                  <div>
                    <p className="text-[17px] font-semibold tracking-[-0.015em] text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-brand)] [font-family:var(--font-display)]">
                      {f.label}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--color-ink-3)]">
                      {f.blurb}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="ml-auto shrink-0 text-[var(--color-ink-3)] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-brand)]"
                  >
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ privacy band */}
      <section aria-label="Privacy" className="bg-[var(--color-navy-deep)]">
        <div className="mx-auto max-w-[1240px] px-5 py-20 text-center sm:px-8 sm:py-24">
          <h2 className="mx-auto max-w-[20ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white [font-family:var(--font-display)]">
            In your pocket. Literally.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            The case file on your iPhone is the real file, on your device,
            behind Face ID. Not a window into somebody else&rsquo;s server.
          </p>
          <a
            href="/security"
            className="group mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
          >
            How Jural protects client work
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </div>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
