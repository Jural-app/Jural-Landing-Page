/**
 * FAQ, display heading on the left, accordion on the right.
 *
 * Built on <details name="faq">, so the accordion behaviour (one open at a
 * time), keyboard support and find-in-page all come from the platform rather
 * than from state. No client component needed.
 */

const QA: { q: string; a: string[] }[] = [
  {
    q: "Where does my client data actually live?",
    a: [
      "On your devices. The case on the device is the source of truth, and when you add a second device the two synchronise over end-to-end encryption. The backend relays ciphertext, so it is not sitting on a readable copy of your firm's files.",
      "That is an architectural decision rather than a policy one, which is the point: it does not depend on us promising not to look.",
    ],
  },
  {
    q: "Can Jural read my clients' documents?",
    a: [
      "Documents are read on the device. Text layers and OCR are extracted locally, and the index the assistant searches is built and kept there too, so the raw file does not leave unencrypted.",
      "Where a cloud model is used for harder drafting, it receives extracted text only, and nothing is retained after the request.",
    ],
  },
  {
    q: "Can my paralegal work in the same case?",
    a: [
      "Yes. A case can be shared with your team or kept private to you, with a membership roster you control. Shared cases run over Signal-protocol group encryption, and the server routes ciphertext without storing message content.",
    ],
  },
  {
    q: "Is invoicing really free?",
    a: [
      "Yes. Jural takes 0% of what you invoice. Billing runs on Stripe Connect with your firm as the merchant of record, so payments land in your account directly and Stripe's own processing fee is the only deduction.",
      "Jural is paid for by a flat subscription instead, which is the whole reason we can leave your invoices alone.",
    ],
  },
  {
    q: "Do I have to migrate off what I use now?",
    a: [
      "No. There is no implementation project and no administrator to appoint. You open a matter and the file fills as you work, so you can run Jural beside your current system and decide later how much of the work moves across.",
    ],
  },
  {
    q: "Does Jural give legal advice?",
    a: [
      "No. It finds what is in your files, drafts from them, and proposes the next step. Every output is yours to review and settle, which is why nothing is filed, sent or billed until you approve it.",
    ],
  },
];

export function Faq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-20">
          <h2 className="max-w-[11ch] text-[clamp(2.1rem,1.1rem+3.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            Frequently asked questions
          </h2>

          <div className="min-w-0 border-t border-[var(--color-line)]">
            {QA.map((item, i) => (
              <details
                key={item.q}
                name="faq"
                open={i === 0}
                className="group border-b border-[var(--color-line)]"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="max-w-[46ch] text-[17.5px] font-medium leading-snug tracking-[-0.015em] text-[var(--color-ink)] transition-colors group-open:text-[var(--color-brand)]">
                    {item.q}
                  </span>

                  {/* + that loses its upright stroke when the item opens */}
                  <span
                    aria-hidden="true"
                    className="relative mt-1.5 size-[15px] shrink-0 text-[var(--color-ink-3)] transition-colors group-open:text-[var(--color-brand)]"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>

                <div className="max-w-[70ch] space-y-4 pb-8 pr-8 text-[15.5px] leading-relaxed text-[var(--color-ink-3)]">
                  {item.a.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
