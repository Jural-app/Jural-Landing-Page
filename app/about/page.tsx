import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { BeliefIndex } from "@/components/BeliefIndex";

export const metadata: Metadata = {
  title: "About | Jural",
  description:
    "Jural began with a pattern: lawyers kept asking for custom CRMs while already paying for one. The reason changed what we built.",
};

/**
 * About, rebuilt on one editorial grammar:
 *
 *   ▸ every section sits on the 1240px rail with a fixed 200px label column;
 *     text, images and numbers all hang off the same left lines
 *   ▸ structure comes from ground changes (white → canvas → photo → navy),
 *     never from rules, borders or cards
 *   ▸ pacing follows the researched enterprise pattern: mission, story,
 *     numbers, audience, convictions, and the human quote LAST as the closer
 *
 * ⚠ Two placeholders that must be resolved before production:
 *   the stats are invented dev-branch figures, and the quote is attributed
 *   to "The founders" pending a real name.
 */

/** The page's one layout grammar: label rail left, content right. */
function Sect({
  label,
  bg = "",
  children,
}: {
  label: string;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={label} className={bg || "bg-white"}>
      <div className="mx-auto grid max-w-[1340px] gap-6 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-3)]">
          {label}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

const BODY = "space-y-4 text-[16.5px] leading-[1.75] text-[var(--color-ink-2)]";

export default function AboutPage() {
  return (
    <main>
      <Header />

      {/* ------------------------------------------------------------ hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1340px] px-5 pb-14 pt-14 sm:px-6 sm:pt-20">
          <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
            About Jural
          </div>
          <h1 className="mt-6 text-[clamp(2.6rem,1.2rem+4.8vw,5.4rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            We didn&rsquo;t set out to build
            <br className="hidden sm:block" /> another CRM.
          </h1>
          <p className="mt-7 max-w-[46ch] text-[clamp(1.3rem,1rem+1.3vw,2rem)] font-normal leading-[1.4] tracking-[-0.015em] text-[var(--color-ink-3)] [font-family:var(--font-display)]">
            We set out to understand why lawyers kept walking away from the
            ones they had.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------ what we do */}
      <section aria-label="What we build" className="bg-white">
        <div className="grid items-center lg:grid-cols-2">
          {/* device cutout on its wash ground, running to the left screen edge */}
          <div
            className="relative order-last h-[340px] w-full lg:order-first lg:h-full lg:min-h-[560px] lg:self-stretch"
            style={{ background: "linear-gradient(180deg, var(--color-brand-wash) 0%, #f7fafd 100%)" }}
          >
            <Image
              src="/about-story.webp"
              alt="Jural open on a MacBook and an iPhone"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={95}
              className="scale-[1.2] object-contain"
            />
          </div>

          <div className="px-5 py-16 sm:px-6 sm:py-20 lg:py-24 lg:pl-20 lg:pr-[max(1.5rem,calc((100vw-1340px)/2+1.5rem))]">
            <h2 className="text-[clamp(1.7rem,1.2rem+1.6vw,2.4rem)] font-semibold tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              What we build
            </h2>
            <p className="mt-5 max-w-[30ch] text-[clamp(1.25rem,1rem+1vw,1.7rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-[var(--color-brand)] [font-family:var(--font-display)]">
              We build the practice platform that fits in a lawyer&rsquo;s
              pocket.
            </p>
            <div className={`mt-6 max-w-[54ch] ${BODY}`}>
              <p>
                For over a decade we built custom software, and the same
                client kept appearing: a lawyer, asking for a custom CRM,
                while already paying for an established one. The reason was
                not cost, and it was not privacy. The software was built
                around a desk, and a lawyer&rsquo;s day is not.
              </p>
              <p>
                So we built Jural around the day instead: mobile-first from
                the ground up, cases living on your own devices, synced end
                to end encrypted, readable by no one else, including us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- numbers */}
      <section aria-label="By the numbers" className="bg-[var(--color-navy-deep)]">
        <div className="mx-auto grid max-w-[1340px] gap-6 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">
            By the numbers
          </div>
          <div>
            {/* ⚠ PLACEHOLDER FIGURES: dev-branch stand-ins, not verified. */}
            <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
              {[
                {
                  n: "1,400+",
                  label: "Matters managed in Jural",
                  body: "From intake to invoice, in one thread.",
                },
                {
                  n: "$2.4M",
                  label: "Invoiced by firms through Jural",
                  body: "Our cut of it: zero.",
                },
                {
                  n: "12,000+",
                  label: "Documents read on-device",
                  body: "Digested into case knowledge without leaving the firm.",
                },
              ].map((st) => (
                <div key={st.label}>
                  <p className="text-[clamp(3.4rem,2.4rem+3vw,5.2rem)] font-semibold leading-none tracking-[-0.04em] text-white [font-family:var(--font-display)]">
                    {st.n}
                  </p>
                  <p className="mt-4 text-[15.5px] font-semibold tracking-[-0.015em] text-white [font-family:var(--font-display)]">
                    {st.label}
                  </p>
                  <p className="mt-1.5 max-w-[26ch] text-[14px] leading-relaxed text-white/70">
                    {st.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- who we build for */}
      {/* The one full-bleed moment: text on the rail, photograph running
          sharp off the right edge of the screen. */}
      <section aria-label="Who we build for" className="bg-white">
        <div className="grid items-center lg:grid-cols-2">
          <div className="px-5 py-16 sm:px-6 sm:py-20 lg:py-24 lg:pl-[max(1.5rem,calc((100vw-1340px)/2+1.5rem))] lg:pr-20">
            <h2 className="text-[clamp(1.7rem,1.2rem+1.6vw,2.4rem)] font-semibold tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Who we build for
            </h2>
            <p className="mt-5 max-w-[30ch] text-[clamp(1.25rem,1rem+1vw,1.7rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-[var(--color-brand)] [font-family:var(--font-display)]">
              For the lawyers whose office is wherever the matter takes
              them.
            </p>
            <div className={`mt-6 max-w-[54ch] ${BODY}`}>
              <p>
                Most legal software is shaped for the firms with an
                operations team to feed it. Jural is for the firms where the
                lawyer is the operations team: where the real decisions
                happen in hallways, between hearings, on the way to the next
                thing.
              </p>
              <p>
                We build for the people who do the work, not the people who
                administer it. That is who taught us the problem, and that is
                who Jural answers to.
              </p>
            </div>
          </div>

          <div className="relative h-[340px] w-full sm:h-[420px] lg:h-full lg:min-h-[560px] lg:self-stretch">
            <Image
              src="/lawyers.webp"
              alt="Three lawyers conferring in a hallway between meetings"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={92}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- purpose */}
      {/* The thesis at architectural scale: one sentence staggered across
          the page in ghost type, with two small prose counterpoints. */}
      <section aria-label="Our purpose" className="overflow-hidden bg-white">
        <div className="mx-auto max-w-[1340px] px-5 py-20 sm:px-6 sm:py-28">
          <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-3)]">
            Our purpose
          </div>

          <p className="mt-6 max-w-[36ch] text-[15px] leading-[1.75] text-[var(--color-ink-2)]">
            Everything we build starts from one conviction about how this
            work should feel.
          </p>

          {/* the purpose, spoken in the product's own grammar */}
          <div className="mt-14 flex flex-col gap-6 [font-family:var(--font-display)] sm:gap-8">
            <div className="flex justify-start">
              <p className="max-w-[92%] rounded-[2.2rem] rounded-bl-lg bg-[rgba(14,21,36,0.05)] px-8 py-5 text-[clamp(1.9rem,1rem+3.4vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-ink-2)] sm:px-12 sm:py-7">
              Where does the firm live now?
              </p>
            </div>
            <div className="flex justify-end">
              <p className="max-w-[92%] rounded-[2.2rem] rounded-br-lg bg-[var(--color-brand)] px-8 py-5 text-[clamp(1.9rem,1rem+3.4vw,4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:px-12 sm:py-7">
              Wherever the lawyer is.
              </p>
            </div>
          </div>

          <p className="mt-14 max-w-[40ch] text-[15px] leading-[1.75] text-[var(--color-ink-2)]">
            Not the other way around. Wherever the day goes, the cases, the
            documents and the deadlines are already there: private, current,
            and asking nothing of you.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- what we believe */}
      <Sect label="What we believe" bg="bg-[var(--color-canvas)]">
        <BeliefIndex />
      </Sect>

      {/* --------------------------------------------------- the closing */}
      {/* The page's only centered composition: every other section hangs
          left, so the quote reads as its own moment, not an echo. */}
      <section aria-label="From the founders" className="bg-white">
        <div className="mx-auto max-w-[860px] px-5 py-20 text-center sm:px-6 sm:py-28">
          <blockquote className="mx-auto text-[clamp(1.5rem,1.05rem+1.7vw,2.3rem)] font-medium leading-[1.45] tracking-[-0.015em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            &ldquo;For ten years we watched brilliant lawyers apologize for
            their own software. Jural is what happened when we stopped
            building workarounds and asked what the work actually
            deserves.&rdquo;
          </blockquote>
          <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
            The founders, Jural
          </p>
        </div>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
