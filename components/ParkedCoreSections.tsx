/**
 * ⏸ PARKED, imported nowhere. Two sections built for /product/mac and then
 * pulled because they are core-product truths, not platform truths:
 *
 *   CollaborationSection ("Two chairs, one case") belongs on /product/chat
 *   when that page is built.
 *
 *   CaseMemorySection ("The case remembers") belongs wherever the
 *   intelligence story is told, likely /product/chat or /product/documents.
 *
 * Kept compiling so they are a paste away, not an archaeology dig.
 */

export function CollaborationSection() {
  return (
    <>
      {/* -------------------------------------------------- collaboration */}
      <section aria-label="Case collaboration" className="bg-white">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              Collaboration
            </div>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Two chairs, one case.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              Bring your paralegal into the matter and work the same thread.
              Everyone sees the case; the work lands where it happened, under
              the name of whoever did it.
            </p>
            <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              The conversation between your devices is end-to-end encrypted,
              the same protocol Signal uses. Jural&rsquo;s server passes the
              messages along; it cannot read them.
            </p>
          </div>

          {/* the shared thread and the roster */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-center">
            <div className="w-[300px] overflow-hidden rounded-[18px] bg-white shadow-[0_18px_50px_-16px_rgba(14,21,36,0.4)] ring-1 ring-[rgba(14,21,36,0.08)] sm:w-[320px]">
              <div className="border-b border-[var(--color-line)] px-4 py-2.5">
                <p className="truncate text-[14px] font-semibold text-[var(--color-ink)]">
                  Hale v. Northshore Logistics
                </p>
              </div>
              <div className="space-y-2.5 px-4 py-4">
                {/* paralegal */}
                <div className="flex items-end gap-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-paper-blue)] text-[9px] font-bold text-[var(--color-brand-dark)]">
                    MR
                  </span>
                  <p className="max-w-[80%] rounded-2xl bg-[rgba(14,21,36,0.05)] px-3 py-2 text-[11.5px] leading-snug text-[var(--color-ink-2)]">
                    Uploaded the payment ledger exports for the stipulation.
                  </p>
                </div>
                {/* lawyer */}
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl bg-[var(--color-brand)] px-3 py-2 text-[11.5px] leading-snug text-white">
                    Thanks. Task: exhibits list by Friday.
                  </p>
                </div>
                {/* the case answers both */}
                <div className="rounded-xl border border-[var(--color-line)] bg-[rgba(14,21,36,0.02)] p-3">
                  <p className="text-[11.5px] font-semibold text-[var(--color-ink)]">
                    Task created
                  </p>
                  <p className="mt-1 text-[10.5px] text-[var(--color-ink-3)]">
                    Exhibits list, due Fri. Assigned to M. Rivera.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[240px] rounded-[18px] border border-[var(--color-line)] bg-[var(--color-canvas)] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
                In this case
              </p>
              <div className="mt-3 space-y-3">
                {[
                  ["SH", "S. Hale", "Attorney"],
                  ["MR", "M. Rivera", "Paralegal"],
                ].map(([initials, name, role]) => (
                  <div key={name} className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[9.5px] font-bold text-[var(--color-brand-dark)] ring-1 ring-[var(--color-line)]">
                      {initials}
                    </span>
                    <div>
                      <p className="text-[12px] font-medium text-[var(--color-ink)]">{name}</p>
                      <p className="text-[10.5px] text-[var(--color-ink-3)]">{role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-[var(--color-line)] pt-3 text-[10.5px] leading-relaxed text-[var(--color-ink-3)]">
                End-to-end encrypted. 3 devices in this case.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export function CaseMemorySection() {
  return (
    <>
      {/* ------------------------------------------------------ case memory */}
      <section aria-label="Case memory" className="bg-white">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          {/* the knowledge panel */}
          <div className="order-last lg:order-first">
            <div className="mx-auto w-full max-w-[460px] rounded-[18px] bg-white p-5 shadow-[0_18px_50px_-16px_rgba(14,21,36,0.4)] ring-1 ring-[rgba(14,21,36,0.08)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
                What Jural knows
              </p>
              <div className="mt-3 divide-y divide-[var(--color-line)]">
                {[
                  {
                    fact: "Northshore's last payment cleared Nov 12, 2023: $6,250 against invoice 1041.",
                    source: "Invoice 1041.pdf",
                    updated: false,
                  },
                  {
                    fact: "Alex Morgan engaged the firm over unpaid consulting fees under the Nov 10, 2023 agreement.",
                    source: "Client intake",
                    updated: false,
                  },
                  {
                    fact: "Hearing continued to Sep 14; payment ledger exhibits to be stipulated.",
                    source: "Voice note, Aug 26",
                    updated: true,
                  },
                ].map((row) => (
                  <div key={row.source} className="py-3 first:pt-0 last:pb-0">
                    <p className="text-[12.5px] leading-relaxed text-[var(--color-ink)]">
                      {row.fact}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-[var(--color-brand-wash)] px-2 py-[3px] text-[10px] font-medium text-[var(--color-brand-dark)]">
                        From: {row.source}
                      </span>
                      {row.updated && (
                        <span className="rounded-full bg-[rgba(14,21,36,0.05)] px-2 py-[3px] text-[10px] font-medium text-[var(--color-ink-3)]">
                          Updated. Supersedes Aug 12 entry
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-[var(--color-line)] pt-3 text-[10.5px] leading-relaxed text-[var(--color-ink-3)]">
                Every fact keeps a line back to where it came from.
              </p>
            </div>
          </div>

          <div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              Case memory
            </div>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              The case remembers.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              Every message, voice note and document quietly becomes the
              case&rsquo;s knowledge. Facts are kept with their source, and
              when something changes, the old fact is superseded, not
              overwritten. Nothing silently disappears.
            </p>
            <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              That is why answers get sharper the longer a matter runs. And
              when something was never filed, you get the honest answer: not
              on file.
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
