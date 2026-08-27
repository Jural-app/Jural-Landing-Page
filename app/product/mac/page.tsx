import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { MacWindowUI } from "@/components/MacWindowUI";

export const metadata: Metadata = {
  title: "Mac app | Jural",
  description:
    "Jural for Mac is a real Mac application: drafting, review and billing on the big screen, in step with your iPhone over end-to-end encryption.",
};

/**
 * The Mac page owns the other half of the platform thesis. The iPhone page
 * argues the firm leaves the desk; this one argues that when you do sit down,
 * you deserve a real instrument rather than a browser tab. Centerpiece is one
 * interactive drawn macOS window doing the arguing; no feature index here,
 * that lives on the iPhone page.
 */


export default function MacPage() {
  return (
    <main>
      <Header />

      {/* ------------------------------------------------------------ hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-16 text-center sm:px-8 sm:pb-14 sm:pt-24">
          <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
            The Mac app
          </div>

          <h1 className="mx-auto mt-5 text-[clamp(2.3rem,1.2rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            For the days at the desk.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[clamp(1.02rem,0.97rem+0.4vw,1.18rem)] leading-relaxed text-[var(--color-ink-2)]">
            Your phone captures the day. The Mac turns it into work product:
            drafting, review and billing.
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
      </section>

      {/* ----------------------------------------------------- centerpiece */}
      {/* A drawn sky, same system as the iPhone page's scene panels but its
          own hour: morning light through the office window, the hour the desk
          takes over. CSS only, no reused artwork. */}
      <section
        aria-label="One window, the whole firm"
        style={{
          background: [
            "radial-gradient(55% 60% at 84% 90%, rgba(255,214,156,0.42) 0%, rgba(255,214,156,0) 62%)",
            "linear-gradient(180deg, #c2ddf2 0%, #dfeefa 55%, #f4eee0 100%)",
          ].join(", "),
        }}
      >
        <div className="mx-auto max-w-[1340px] px-5 py-16 sm:px-6 sm:py-20">
          <MacWindowUI />
        </div>
      </section>

      {/* ------------------------------------------------- side by side */}
      <section aria-label="The thread and the work, side by side" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-12">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              Side by side
            </div>
            <h2 className="mt-4 max-w-[16ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Words get a desk.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              Ask for a draft in the thread and it opens beside the
              conversation as a real, paginated document. The case fills the
              fields; you shape the words. A phone can ask for this. Only a
              screen can hold both.
            </p>
          </div>

          {/* the split: conversation left, canvas right */}
          <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_28px_70px_-28px_rgba(14,21,36,0.4)] ring-1 ring-[rgba(14,21,36,0.1)]">
            <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              {/* thread half */}
              <div className="flex flex-col justify-center gap-2.5 border-b border-[var(--color-line)] p-6 lg:border-b-0 lg:border-r sm:p-8">
                <div className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl bg-[var(--color-brand)] px-3.5 py-2 text-[12.5px] leading-snug text-white">
                    Draft the demand letter for Northshore
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-[85%] rounded-2xl bg-[rgba(14,21,36,0.05)] px-3.5 py-2 text-[12.5px] leading-snug text-[var(--color-ink-2)]">
                    Draft ready. Opening it beside the thread.
                  </p>
                </div>
                <div className="mt-1 flex justify-end">
                  <p className="max-w-[85%] rounded-2xl bg-[var(--color-brand)] px-3.5 py-2 text-[12.5px] leading-snug text-white">
                    Make the tone firmer and cite the ledger
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="max-w-[85%] rounded-2xl bg-[rgba(14,21,36,0.05)] px-3.5 py-2 text-[12.5px] leading-snug text-[var(--color-ink-2)]">
                    Revised. Paragraph two now cites the exhibits.
                  </p>
                </div>
              </div>

              {/* canvas half: the document as an artifact pane, chrome and all */}
              <div className="flex flex-col bg-[rgba(14,21,36,0.03)]">
                <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-white/70 px-5 py-2.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-brand)]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <p className="text-[12px] font-semibold text-[var(--color-ink)]">
                    Demand letter, draft
                  </p>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="rounded-full bg-[var(--color-brand-wash)] px-2 py-[3px] text-[10px] font-medium text-[var(--color-brand-dark)]">
                      PDF
                    </span>
                    {/* download */}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-ink-3)]">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {/* expand */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-ink-3)]">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 p-6 sm:p-10">
                {/* Paper: a sheet, not a card. Nearly square corners, a warm
                    white with a faint top sheen, a tight contact shadow under
                    a soft lift, page two peeking from behind, and the letter
                    set in a serif because letters are. */}
                <div className="relative mx-auto max-w-[400px]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-[7px] translate-y-[7px] rounded-[3px] bg-white ring-1 ring-[rgba(14,21,36,0.08)]"
                  />
                  <div
                    className="relative rounded-[3px] p-7 shadow-[0_1px_2px_rgba(14,21,36,0.14),0_18px_44px_-20px_rgba(14,21,36,0.4)] ring-1 ring-[rgba(14,21,36,0.1)] [font-family:Georgia,'Times_New_Roman',serif]"
                    style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdfcf9 60%, #fbf9f4 100%)" }}
                  >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-3)]">
                    Hale Law Group
                  </p>
                  <p className="mt-3 text-[12.5px] font-semibold text-[var(--color-ink)]">
                    Demand for payment of outstanding invoices
                  </p>
                  <div className="mt-3 space-y-2 text-[11.5px] leading-relaxed text-[var(--color-ink-2)]">
                    <p>
                      Counsel for{" "}
                      <span className="rounded bg-[var(--color-brand-wash)] px-1 font-medium text-[var(--color-brand-dark)]">
                        Northshore Logistics
                      </span>
                      ,
                    </p>
                    <p className="text-[var(--color-ink-3)]">
                      This firm represents{" "}
                      <span className="rounded bg-[var(--color-brand-wash)] px-1 font-medium text-[var(--color-brand-dark)]">
                        Alex Morgan
                      </span>{" "}
                      regarding unpaid consulting fees under the agreement
                      dated{" "}
                      <span className="rounded bg-[var(--color-brand-wash)] px-1 font-medium text-[var(--color-brand-dark)]">
                        Nov 10, 2023
                      </span>
                      .
                    </p>
                    <p className="text-[var(--color-ink-3)]">
                      Demand is made for the full outstanding balance within
                      fourteen days of the date of this letter.
                    </p>
                    <div className="space-y-1.5 pt-1">
                      <span className="block h-1.5 w-full rounded-full bg-[rgba(14,21,36,0.07)]" />
                      <span className="block h-1.5 w-[94%] rounded-full bg-[rgba(14,21,36,0.07)]" />
                      <span className="block h-1.5 w-[88%] rounded-full bg-[rgba(14,21,36,0.07)]" />
                      <span className="block h-1.5 w-full rounded-full bg-[rgba(14,21,36,0.07)]" />
                      <span className="block h-1.5 w-[76%] rounded-full bg-[rgba(14,21,36,0.07)]" />
                      <span className="block h-1.5 w-[58%] rounded-full bg-[rgba(14,21,36,0.07)]" />
                    </div>
                    <div className="pt-3">
                      <p>Very truly yours,</p>
                      <p className="mt-1.5 font-semibold text-[var(--color-ink)]">S. Hale</p>
                      <p className="text-[10px] text-[var(--color-ink-3)]">Hale Law Group</p>
                    </div>
                  </div>
                  </div>
                </div>
                <p className="mt-4 text-center text-[10.5px] text-[var(--color-ink-3)]">
                  Page 1 of 2, live PDF preview
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ while you were out */}
      <section aria-label="Continuity" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              Continuity
            </div>
            <h2 className="mx-auto mt-4 max-w-[16ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              While you were out.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[var(--color-ink-2)]">
              A practice is lived standing up: courtrooms, hallways, calls
              between things. When you sit back down, the loose threads are
              already tied: notes filed, signatures returned, intakes written
              up.
            </p>
          </div>

        </div>

        {/* the desk itself, full bleed; the digest floats on the quiet side */}
        <div className="relative flex min-h-[600px] items-center overflow-hidden py-14 sm:min-h-[760px]">
          <Image
            src="/laptop.webp"
            alt="Sitting down at the desk with Jural open on a MacBook"
            fill
            sizes="100vw"
            quality={90}
            /* Subject sits centre-left in the source; keeping the anchor there
               leaves the pale right side free for the card. */
            className="object-cover object-[35%_28%]"
          />

          <div className="relative mx-auto flex w-full max-w-[1360px] justify-center px-5 sm:px-8 lg:justify-end">
            {/* macOS notification banners: the one shape every Mac owner
                already reads as "this arrived while you were away". Newest
                first, the way the system stacks them. */}
            <div className="flex w-full max-w-[340px] flex-col gap-2.5 self-start pt-2 sm:pt-6">
              {[
                {
                  title: "New intake completed",
                  body: "Reyes Family Trust, written up and ready to review.",
                  when: "9:41 PM",
                },
                {
                  title: "Engagement letter executed",
                  body: "Signed by Alex Morgan. Filed into the case.",
                  when: "3:19 PM",
                },
                {
                  title: "Hearing note filed",
                  body: "2 tasks created, 0.4 hr logged.",
                  when: "9:40 AM",
                },
              ].map((n) => (
                <div
                  key={n.title}
                  className="flex items-start gap-3 rounded-[14px] bg-white/85 p-3 shadow-[0_10px_30px_-14px_rgba(14,21,36,0.35)] ring-1 ring-[rgba(14,21,36,0.05)] backdrop-blur-md"
                >
                  <Image
                    src="/jural-logo.png"
                    alt=""
                    width={482}
                    height={601}
                    className="mt-0.5 h-7 w-7 shrink-0 object-contain"
                  />
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-[12.5px] font-semibold text-[var(--color-ink)]">
                        {n.title}
                      </p>
                      <p className="shrink-0 text-[10.5px] tabular-nums text-[var(--color-ink-3)]">
                        {n.when}
                      </p>
                    </div>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--color-ink-2)]">
                      {n.body}
                    </p>
                  </div>
                </div>
              ))}
              <p className="pr-1 text-right text-[11px] text-[var(--color-ink-3)]">
                Synced overnight, end-to-end encrypted.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------- one firm, two shapes */}
      <section aria-label="iPhone and Mac" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-20 text-center sm:px-8 sm:py-24">
          <h2 className="mx-auto max-w-[18ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            One firm, two shapes.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--color-ink-2)]">
            The same case, the same thread, the same memory, on the screen in
            your pocket and the one on your desk. Pick either up; nothing
            needs catching up.
          </p>

          {/* Cropped to the devices: the render carries generous margins, so
              the frame trims them and lets the pair fill the width. */}
          <div className="relative mx-auto mt-10 aspect-[2.15/1] w-full max-w-[1400px] overflow-hidden">
            <Image
              src="/screens/mockup-2.webp"
              alt="The same Jural case open on a MacBook and an iPhone"
              fill
              sizes="(min-width: 1024px) 1400px, 96vw"
              quality={92}
              className="object-cover object-[center_58%]"
            />
          </div>

          <a
            href="/product/iphone"
            className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-ink)] underline-offset-4 hover:underline"
          >
            Explore the iPhone app
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------ privacy band */}
      <section aria-label="Privacy" className="bg-[var(--color-navy-deep)]">
        <div className="mx-auto max-w-[1240px] px-5 py-20 text-center sm:px-8 sm:py-24">
          <h2 className="mx-auto max-w-[20ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white [font-family:var(--font-display)]">
            The file cabinet is your Mac.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            Cases live on your machine and sync to your iPhone end-to-end
            encrypted. Jural&rsquo;s servers relay ciphertext; they cannot read
            a word of your client work.
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
