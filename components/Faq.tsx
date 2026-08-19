/**
 * FAQ, display heading on the left, accordion on the right.
 *
 * Built on <details name="faq">, so the accordion behaviour (one open at a
 * time), keyboard support and find-in-page all come from the platform rather
 * than from state. No client component needed.
 */

const QA: { q: string; a: string[] }[] = [
  {
    q: "Do I have to drop the system I use now?",
    a: [
      "No. Jural runs on its own, or alongside whatever you already have. Plenty of practices will run both for a while, and that is a sensible way to start. Keep your current system as the record while you decide how much of the work moves across.",
      "There is no implementation project and no administrator to appoint. You open a matter, and the file starts filling as you work.",
    ],
  },
  {
    q: "What do I need to run it?",
    a: [
      "An iPhone that supports Apple Intelligence, and a Mac that supports it if you want the desk version too. Both run the model locally through Apple Intelligence, which is the trade for keeping your client material off anyone else\u2019s server.",
    ],
  },
  {
    q: "What does it cost?",
    a: [
      "Pricing is not public yet. One commitment we have already made: there is no separate AI add-on fee. Nobody is metering tokens behind the product, so there is no intelligence tier to add to your bill.",
    ],
  },
  {
    q: "Can my paralegal use it?",
    a: [
      "Yes. A matter can be shared with your team or kept private to you. Roles are attorney for full case and document work, paralegal to create and edit, and viewer for read-only access. People join by invite link, with no seat provisioning and no onboarding call.",
    ],
  },
  {
    q: "Is there an Android version?",
    a: [
      "Not yet. We would rather get the on-device experience right on one platform than ship a watered-down version of it on two. Android follows iOS.",
    ],
  },
  {
    q: "Does Jural give legal advice?",
    a: [
      "No. It finds what is in your files, tells you what the rules say, and it drafts. Every output is yours to review and settle, which is why nothing is filed, sent or billed until you approve it.",
    ],
  },
];

export function Faq() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-20">
      <h2 className="d2 max-w-[11ch]">Frequently asked questions</h2>

      <div className="border-t border-[color:var(--color-rule)]">
        {QA.map((item, i) => (
          <details
            key={item.q}
            name="faq"
            open={i === 0}
            className="group border-b border-[color:var(--color-rule)]"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
              <span className="max-w-[46ch] text-[17.5px] font-medium leading-snug tracking-[-0.015em] transition-colors group-open:text-[color:var(--color-blue)]">
                {item.q}
              </span>

              {/* + that loses its upright stroke when the item opens */}
              <span
                aria-hidden="true"
                className="relative mt-1.5 size-[15px] shrink-0 text-[color:var(--color-ink-3)] transition-colors group-open:text-[color:var(--color-blue)]"
              >
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>

            <div className="max-w-[70ch] space-y-4 pb-8 pr-8 text-[15.5px] leading-relaxed text-[color:var(--color-ink-3)]">
              {item.a.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
