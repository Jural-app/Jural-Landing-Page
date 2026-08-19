import { Access } from "@/components/Access";
import { Boundary } from "@/components/Boundary";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Chrome";
import { Graph } from "@/components/Graph";
import { HeroDemo } from "@/components/HeroDemo";
import { Pillars } from "@/components/Pillars";
import { Rise } from "@/components/Rise";
import { Statement } from "@/components/Statement";
import { Surfaces } from "@/components/Surfaces";

export default function Page() {
  return (
    <>
      <Nav />

      <main id="main">
        {/* ============================================ hero */}
        <section className="relative isolate">
          {/* soft wash behind the demo so the right half reads as a stage */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 -z-10 h-[820px] w-[72%] bg-[radial-gradient(58%_54%_at_72%_38%,rgba(12,111,196,0.12)_0%,rgba(69,200,251,0.07)_40%,rgba(251,250,248,0)_74%)]"
          />

          <div className="wrap grid items-center gap-14 pb-28 pt-32 md:min-h-[calc(100dvh-4rem)] md:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-20">
            <div>
              <Rise now>
                <h1 className="d1 max-w-[14ch]">Your whole practice, in one thread.</h1>
              </Rise>

              <Rise now delay={0.06}>
                <p className="lead mt-7 max-w-[48ch]">
                  Cases, documents, deadlines, drafting and billing, run by an
                  intelligence that has read the whole file. It runs on your own
                  device, so nothing has to leave it.
                </p>
              </Rise>

              <Rise now delay={0.12}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="#access"
                    className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[color:var(--color-blue)] px-6 text-[14.5px] font-medium text-white transition-colors hover:bg-[color:var(--color-blue-deep)]"
                  >
                    Request access
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                  <a
                    href="#features"
                    className="inline-flex min-h-11 items-center rounded-full border border-[color:var(--color-ink)]/20 px-6 text-[14.5px] font-medium text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-ink)]/45"
                  >
                    See what it does
                  </a>
                </div>
              </Rise>
            </div>

            <Rise now delay={0.14}>
              <HeroDemo />
            </Rise>
          </div>
        </section>

        {/* ============================================ statement */}
        <section className="bg-[color:var(--color-theatre)] pb-20 pt-0 md:pb-24">
          <div className="wrap">
            <Rise>
              <Statement />
            </Rise>
          </div>
        </section>

        {/* ============================================ features */}
        <section id="features" className="rule scroll-mt-20">
          <div className="wrap py-24 md:py-32">
            <Rise>
              <Features />
            </Rise>
          </div>
        </section>

        <Pillars />

        {/* ============================================ surfaces */}
        <section id="surfaces" className="rule scroll-mt-20">
          <div className="wrap py-24 md:py-32">
            <Rise>
              <Surfaces />
            </Rise>
          </div>
        </section>

        {/* ============================================ intelligence */}
        <section id="knows" className="scroll-mt-20 bg-[color:var(--color-theatre-2)] py-24 text-[color:var(--color-chalk)] md:py-32">
          <div className="wrap">
            <Rise>
              <h2 className="d2 max-w-[20ch] text-[color:var(--color-chalk)]">
                It remembers the case, not just the documents.
              </h2>
            </Rise>

            <div className="mt-10 grid gap-x-16 gap-y-6 md:grid-cols-2">
              <Rise delay={0.1}>
                <p className="text-[17px] leading-relaxed text-[color:var(--color-chalk-2)]">
                  Most legal AI is a general model with your documents
                  attached. It answers in the abstract and hedges on anything
                  specific. Jural builds a map of the case instead: who the
                  parties are, what they owe each other, and what falls due
                  when. It keeps your forum&rsquo;s procedure right next to that.
                </p>
              </Rise>
              <Rise delay={0.14}>
                <p className="text-[17px] leading-relaxed text-[color:var(--color-chalk-2)]">
                  That&rsquo;s why the answers are specific. Ask when a response is
                  due and it counts from the service date in your file. Ask
                  what was agreed on notice and it quotes the clause.
                  Everything it has worked out is listed in plain English on
                  the case screen, and you can swipe any of it away.
                </p>
              </Rise>
            </div>

            <div className="mt-14">
              <Graph />
            </div>
          </div>
        </section>

        {/* ============================================ boundary */}
        <section id="boundary" className="rule scroll-mt-20">
          <div className="wrap py-24 md:py-32">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,44ch)] md:items-end md:gap-16">
              <Rise delay={0.06}>
                <h2 className="d2 max-w-[14ch]">Your cases never leave your device.</h2>
              </Rise>
              <Rise delay={0.12}>
                <p className="body">
                  Jural&rsquo;s model runs through Apple Intelligence on the
                  device in front of you, on the phone and at the desk alike.
                  We&rsquo;re not promising to handle your client data carefully.
                  We never get it.
                </p>
              </Rise>
            </div>

            <div className="mt-16">
              <Boundary />
            </div>

          </div>
        </section>

        {/* ============================================ faq */}
        <section id="faq" className="rule scroll-mt-20">
          <div className="wrap py-24 md:py-32">
            <Rise>
              <Faq />
            </Rise>
          </div>
        </section>

        {/* ============================================ access */}
        <section id="access" className="bg-[color:var(--color-theatre)] py-20 text-[color:var(--color-chalk)] md:py-24">
          <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
            <div>
              <Rise>
                <h2 className="d2 max-w-[15ch]">
                  <span className="block text-[color:var(--color-chalk-3)]">Open the matter.</span>
                  <span className="block text-[color:var(--color-chalk-2)]">Record it as you go.</span>
                  <span className="block text-[color:var(--color-chalk)]">Get paid.</span>
                </h2>
              </Rise>

              <Rise delay={0.16}>
                <div className="mt-9">
                  <Access dark pill />
                </div>
              </Rise>
            </div>

            {/* the last thing worth saying before someone types their address */}
            <Rise delay={0.22}>
              <div className="lg:border-l lg:border-[color:var(--color-rule-dark)] lg:pl-16">
                <p className="text-[clamp(4rem,3rem+4vw,6.5rem)] font-medium leading-[0.85] tracking-[-0.06em] text-[color:var(--color-chalk)]">
                  0
                </p>
                <p className="mt-5 max-w-[22ch] text-[17px] font-medium leading-snug text-[color:var(--color-chalk)]">
                  requests ever leave your device
                </p>
                <p className="mt-3 max-w-[30ch] text-[14.5px] leading-relaxed text-[color:var(--color-chalk-3)]">
                  Not while you are trying it, and not after. There is no upload
                  step to secure and no copy of a matter anywhere you cannot
                  delete yourself.
                </p>
              </div>
            </Rise>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
