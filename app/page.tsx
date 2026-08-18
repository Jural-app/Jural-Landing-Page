import { Access } from "@/components/Access";
import { Boundary } from "@/components/Boundary";
import { Marker, Nav } from "@/components/Chrome";
import { Graph } from "@/components/Graph";
import { Reel } from "@/components/Reel";
import { ThreadControls, ThreadDemo, ThreadPhone } from "@/components/ThreadDemo";
import { Rise } from "@/components/Rise";

export default function Page() {
  return (
    <>
      <Nav />

      <main id="main">
        {/* ============================================ hero */}
        <section className="wrap pb-20 pt-28 md:pt-32">
          <ThreadDemo>
            <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              {/* Copy + controls */}
              <div className="max-w-[38rem]">
                <Rise now>
                  <p className="mono text-[color:var(--color-ink-4)]">Jural — private beta</p>
                </Rise>

                <Rise now delay={0.06}>
                  <h1 className="d1 mt-6 max-w-[13ch]">Your practice, minus the software.</h1>
                </Rise>

                <Rise now delay={0.12}>
                  <p className="lead mt-7 max-w-[50ch]">
                    Jural holds every matter you have, every document inside them
                    and the law that governs them — then runs the operations
                    while you practise. It answers, drafts, files, remembers and
                    bills, from a single thread on your iPhone. And because the
                    intelligence runs on the device itself, nothing it learns can
                    leave.
                  </p>
                </Rise>

                <Rise now delay={0.18}>
                  <div className="mt-9 max-w-[34rem]">
                    <Access />
                  </div>
                </Rise>

                <Rise now delay={0.24}>
                  <div className="mt-11 max-w-[30rem]">
                    <ThreadControls />
                  </div>
                </Rise>
              </div>

              {/* Phone — pinned alongside the copy so the fold is never half empty */}
              <Rise now delay={0.14} className="justify-self-center lg:sticky lg:top-24">
                <ThreadPhone width={302} />
                <p className="small mx-auto mt-5 max-w-[19rem] text-center text-[13.5px]">
                  Four different records, one box. Nothing is filed, sent or
                  billed until you approve it.
                </p>
              </Rise>
            </div>
          </ThreadDemo>
        </section>

        {/* ============================================ premise */}
        <section id="premise" className="rule scroll-mt-20">
          <div className="wrap py-24 md:py-32">
            <Rise>
              <Marker n="01" label="The premise" />
            </Rise>

            <Rise delay={0.06}>
              <h2 className="d2 mt-8 max-w-[19ch]">
                You bill in six-minute units. You reconstruct them in hour-long
                guesses.
              </h2>
            </Rise>

            <div className="mt-12 grid gap-x-16 gap-y-8 md:grid-cols-2">
              <Rise delay={0.1}>
                <p className="body">
                  The margin of a small practice is not lost in the work. It is
                  lost in the gap between doing the work and recording it —
                  the call taken in a corridor, the letter read on the train,
                  the twenty minutes that never reach a file because reaching
                  for the file costs more than the entry is worth.
                </p>
              </Rise>

              <Rise delay={0.16}>
                <p className="body">
                  Every system built for firms has answered this with more
                  surface: another module, another mandatory field, another
                  afternoon of training. It is the wrong direction. A tool
                  you have to decide to open has already lost to the tool
                  that is open.
                </p>
              </Rise>
            </div>

            <Rise delay={0.2}>
              <p className="d3 mt-16 max-w-[24ch] text-[color:var(--color-ink)]">
                The right interface for a six-minute task is the one already in
                your hand.
              </p>
            </Rise>
          </div>
        </section>

        {/* ============================================ reel (theatre) */}
        <section id="matter" className="scroll-mt-20 bg-[color:var(--color-theatre)] py-24 text-[color:var(--color-chalk)] md:py-28">
          <div className="wrap">
            <Rise>
              <Marker n="02" label="A matter, end to end" dark />
            </Rise>
            <Rise delay={0.06}>
              <h2 className="d2 mt-8 max-w-[18ch] text-[color:var(--color-chalk)]">
                One file, from letter of engagement to paid.
              </h2>
            </Rise>
          </div>

          <div className="mt-2">
            <Reel />
          </div>
        </section>

        {/* ============================================ intelligence */}
        <section id="knows" className="scroll-mt-20 bg-[color:var(--color-theatre-2)] py-24 text-[color:var(--color-chalk)] md:py-32">
          <div className="wrap">
            <Rise>
              <Marker n="03" label="What it knows" dark />
            </Rise>

            <Rise delay={0.06}>
              <h2 className="d2 mt-8 max-w-[20ch] text-[color:var(--color-chalk)]">
                It has read everything you ever put in front of it.
              </h2>
            </Rise>

            <div className="mt-10 grid gap-x-16 gap-y-6 md:grid-cols-2">
              <Rise delay={0.1}>
                <p className="text-[17px] leading-relaxed text-[color:var(--color-chalk-2)]">
                  Most legal AI is a general model holding your documents at
                  arm&rsquo;s length, answering in the abstract and hedging on
                  the specifics. Jural works the other way round: it builds a
                  private model of the matter — the parties, what they owe each
                  other, what falls due and when — and keeps the procedure of
                  your forum beside it.
                </p>
              </Rise>
              <Rise delay={0.14}>
                <p className="text-[17px] leading-relaxed text-[color:var(--color-chalk-2)]">
                  So the answers are not general. Ask when a response is due and
                  it counts from the service date sitting in your own file. Ask
                  what was agreed on notice and it quotes the clause. Every
                  inference is listed in plain language, and anything it should
                  not have kept, you can make it forget.
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
            <Rise>
              <Marker n="04" label="The boundary" />
            </Rise>

            <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,44ch)] md:items-end md:gap-16">
              <Rise delay={0.06}>
                <h2 className="d2 max-w-[14ch]">Nothing it knows can leave.</h2>
              </Rise>
              <Rise delay={0.12}>
                <p className="body">
                  An intelligence this close to a practice is only acceptable if
                  it is sealed. Jural&rsquo;s model runs on the iPhone through
                  Apple Intelligence — which is not a promise about how we
                  handle your data, but a description of a system that never
                  receives it.
                </p>
              </Rise>
            </div>

            <div className="mt-16">
              <Boundary />
            </div>

            <dl className="mt-20 grid gap-px overflow-hidden rounded-xl bg-[color:var(--color-rule)] md:grid-cols-3">
              {[
                {
                  t: "Privilege survives it",
                  d: "No third party processes a client confidence, so there is no sub-processor to audit and no notification to write.",
                },
                {
                  t: "No AI line item",
                  d: "Nobody is metering tokens behind the product, so there is no per-seat intelligence tier to add to your bill.",
                },
                {
                  t: "No signal required",
                  d: "Basements, flights, lifts. The model is already on the device and does not go looking for a network first.",
                },
              ].map((x, i) => (
                <Rise key={x.t} delay={0.06 * i}>
                  <div className="h-full bg-[color:var(--color-paper)] p-6">
                    <dt className="text-[16px] font-medium">{x.t}</dt>
                    <dd className="small mt-2 leading-relaxed">{x.d}</dd>
                  </div>
                </Rise>
              ))}
            </dl>
          </div>
        </section>

        {/* ============================================ honest bits */}
        <section id="faq" className="rule scroll-mt-20">
          <div className="wrap py-24 md:py-28">
            <Rise>
              <Marker n="05" label="Before you ask" />
            </Rise>

            <div className="mt-12 grid gap-x-16 md:grid-cols-2">
              {[
                {
                  q: "Do I have to leave my current system?",
                  a: "No. Jural runs on its own, or alongside what you already have. Plenty of practices will keep both for a while — that is a reasonable way to start.",
                },
                {
                  q: "Which iPhone do I need?",
                  a: "One that supports Apple Intelligence. That constraint is the price of the model being on the device rather than on someone's server.",
                },
                {
                  q: "Is there an Android version?",
                  a: "After iOS. We would rather ship the on-device experience properly on one platform than a diluted version of it on two.",
                },
                {
                  q: "Does Jural give legal advice?",
                  a: "No. It surfaces what is in your files and what the rules say, and it drafts. Every output is yours to settle — which is why nothing commits until you approve it.",
                },
              ].map((x, i) => (
                <Rise key={x.q} delay={0.05 * i}>
                  <div className="border-t border-[color:var(--color-rule)] py-7">
                    <h3 className="text-[17px] font-medium">{x.q}</h3>
                    <p className="small mt-2.5 max-w-[46ch] leading-relaxed">{x.a}</p>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ access */}
        <section id="access" className="bg-[color:var(--color-ink)] py-28 text-[color:var(--color-chalk)] md:py-40">
          <div className="wrap">
            <Rise>
              <h2 className="d2 max-w-[15ch] text-[color:var(--color-chalk)]">
                Bring the practice with you.
              </h2>
            </Rise>
            <Rise delay={0.08}>
              <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-[color:var(--color-chalk-2)]">
                Jural is opening to a small number of US attorneys at a time, so
                that the people using it early can shape what it becomes.
              </p>
            </Rise>
            <Rise delay={0.14}>
              <div className="mt-12 max-w-[34rem]">
                <Access dark />
              </div>
            </Rise>
          </div>
        </section>
      </main>

      <footer className="bg-[color:var(--color-ink)] pb-14 text-[color:var(--color-chalk-3)]">
        <div className="wrap rule-d flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px]">© {new Date().getFullYear()} Jural</p>
          <p className="max-w-[52ch] text-[12.5px] sm:text-right">
            Practice management software for licensed legal professionals. Not a
            substitute for professional judgement.
          </p>
        </div>
      </footer>
    </>
  );
}
