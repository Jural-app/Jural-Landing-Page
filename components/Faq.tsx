/**
 * FAQ, display heading on the left, accordion on the right.
 *
 * Built on <details name="faq">, so the accordion behaviour (one open at a
 * time), keyboard support and find-in-page all come from the platform rather
 * than from state. No client component needed.
 */

/** Exported so the homepage can publish the same questions as FAQPage structured data. */
export const QA: { q: string; a: string[] }[] = [
  {
    q: "Where does my client data actually live?",
    a: [
      "On your devices, and on Jural's servers, each protected for the work it does. Your iPhone and Mac stay in step with Signal-protocol end-to-end encryption, so the relay between them carries only ciphertext it cannot read.",
      "Case and client records are also kept in Microsoft Azure in the US, encrypted in transit and at rest, isolated to your firm and gated by role. Those records are not end-to-end encrypted, and we would rather tell you that plainly.",
    ],
  },
  {
    q: "Can Jural read my clients' documents?",
    a: [
      "Documents are read on your device. Text layers and OCR are extracted locally, and the search index is built and kept there too. Documents you store in a case are held on Jural's servers, encrypted and isolated to your firm, and no support tool gives our staff access to them.",
      "When you ask Luna, Jural's assistant, to summarise or draft, the extracted text and case context go to OpenAI in the cloud, not the raw file. Requests are sent with storage turned off, and never used to train models.",
    ],
  },
  {
    q: "Can my paralegal work in the same case?",
    a: [
      "Yes. Everyone in your firm works from the same cases, with roles that decide who can edit and who can only view. Case chat is end-to-end encrypted with the Signal protocol, and the relay forwards ciphertext it cannot read.",
    ],
  },
  {
    q: "How does billing work?",
    a: [
      "Time is captured as you go, in the thread. When you are ready, turn the unbilled time into an invoice and send it from the matter. The client pays by card, and the payment is recorded against the matter.",
      "Jural itself is a flat subscription for the firm.",
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
      "No. It finds what is in your files, drafts from them, and proposes the next step. Every draft is yours to review and settle: emails, documents and signature requests go out only when you send them.",
    ],
  },
];

export function Faq() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
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
