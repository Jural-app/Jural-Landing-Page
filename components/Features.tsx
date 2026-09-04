import {
  BillingUI,
  DocumentsUI,
  DraftingUI,
  IntakeUI,
  SignatureUI,
  ThreadUI,
} from "./FeatureUI";

/**
 * The features, told as one working day on one matter: the same concept the
 * iPhone page runs, brought home. A vertical timeline carries six stops from
 * a new client's first message to the invoice going out, each stop pairing a
 * time of day with the coded screen that moment produced.
 *
 * Static markup, so the section ships as a server component with no client
 * JS. The screens alternate sides of the spine on desktop; below lg the spine
 * moves to the left edge and everything stacks.
 */

/** Panel ground for the coded screens. */
const PANEL = {
  backgroundImage: "url('/brand/features-bg.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const STOPS = [
  {
    time: "8:55 AM",
    place: "A new client reaches out",
    t: "Intake without forms",
    d: "A new client answers a short interview in plain language instead of a form. It asks its own follow-ups and reads what they upload. By the time you open the matter, it is already written up.",
    ui: <IntakeUI />,
  },
  {
    time: "10:20 AM",
    place: "Back at the case file",
    t: "Every case is a thread",
    d: "Ask what is owed, log time by saying it, set a reminder, attach a file. Each request comes back as a card you approve, in the same conversation.",
    ui: <ThreadUI />,
  },
  {
    time: "11:45 AM",
    place: "The mail brings paper",
    t: "It reads your documents",
    d: "Drop in a letter, a contract or an invoice and Jural reads it on your phone: what it is, who is in it, the dates and the amounts. The file never leaves your device unencrypted.",
    ui: <DocumentsUI />,
  },
  {
    time: "2:10 PM",
    place: "Time to put it in writing",
    t: "Drafting from the file",
    d: "Ask for an engagement letter and the names, dates and terms come straight from the matter. The AI writes only the wording, so the facts come from the file, not the model.",
    ui: <DraftingUI />,
  },
  {
    time: "3:30 PM",
    place: "Out for signature",
    t: "Signature, in house",
    d: "Send it for signature from the thread. The signer verifies by email and passcode, and the signed PDF comes back with a certificate, filed to the matter. No separate e-signature tool.",
    ui: <SignatureUI />,
  },
  {
    time: "5:45 PM",
    place: "Closing the day",
    t: "Invoiced before you leave",
    d: "Turn the day's unbilled time into an invoice and send it from the thread. The client pays by card and the payment lands against the matter.",
    ui: <BillingUI />,
  },
];

export function Features() {
  return (
    <section id="features" aria-label="What Jural does" className="bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              A day with Jural
            </div>
            <h2 className="max-w-[16ch] text-[clamp(2.1rem,1.1rem+3.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              One matter, one day
            </h2>
            <p className="mt-5 max-w-[52ch] text-[clamp(1.05rem,0.98rem+0.45vw,1.2rem)] leading-relaxed tracking-[-0.014em] text-[var(--color-ink-2)]">
              Follow a single matter from first message to paid invoice. Not a
              menu of features to learn, a sequence your day already follows.
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

        {/* timeline */}
        <div className="relative mt-16 sm:mt-20">
          {/* the spine */}
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[7px] top-1 w-px bg-[var(--color-line)] lg:left-1/2 lg:-ml-px"
          />

          <ol className="flex flex-col gap-16 lg:gap-24">
            {STOPS.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <li
                  key={s.time}
                  className="relative grid gap-8 pl-10 lg:grid-cols-2 lg:gap-0 lg:pl-0"
                >
                  {/* the node, on the spine at the row's first line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-[5px] grid -translate-x-1/2 place-items-center lg:left-1/2"
                  >
                    <span className="h-[15px] w-[15px] rounded-full bg-white ring-1 ring-[var(--color-line)]" />
                    <span className="absolute h-[7px] w-[7px] rounded-full bg-[var(--color-brand)]" />
                  </span>

                  {/* text */}
                  <div
                    className={
                      flip
                        ? "lg:order-2 lg:pl-16 xl:pl-20"
                        : "lg:pr-16 lg:text-right xl:pr-20"
                    }
                  >
                    <div
                      className={`flex items-baseline gap-3 ${
                        flip ? "" : "lg:justify-end"
                      }`}
                    >
                      <span className="text-[14px] font-semibold tabular-nums tracking-[-0.01em] text-[var(--color-brand-dark)]">
                        {s.time}
                      </span>
                      <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-3)]">
                        {s.place}
                      </span>
                    </div>

                    <h3
                      className={`mt-4 text-[clamp(1.4rem,1.05rem+1vw,1.85rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)] ${
                        flip ? "" : "lg:ml-auto"
                      } max-w-[20ch]`}
                    >
                      {s.t}
                    </h3>

                    <p
                      className={`mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)] ${
                        flip ? "" : "lg:ml-auto"
                      }`}
                    >
                      {s.d}
                    </p>
                  </div>

                  {/* screen */}
                  <div className={flip ? "lg:order-1 lg:pr-16 xl:pr-20" : "lg:pl-16 xl:pl-20"}>
                    <div
                      className="grid place-items-center overflow-hidden rounded-2xl px-5 py-8 sm:py-10"
                      style={PANEL}
                    >
                      {s.ui}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* the day closes where it was heading: paid */}
          <div className="relative mt-16 pl-10 lg:mt-20 lg:pl-0 lg:text-center">
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-[7px] h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-[var(--color-brand)] lg:left-1/2"
            />
            <p className="text-[15px] font-medium text-[var(--color-ink-2)] lg:pt-8">
              Six jobs, one case file, no desk required.{" "}
              <a
                href="/product/iphone"
                className="font-semibold text-[var(--color-brand-dark)] underline-offset-4 hover:underline"
              >
                See the whole day on iPhone
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
