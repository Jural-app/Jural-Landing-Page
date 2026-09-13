/**
 * Trust: the security argument, centred. No awards or badges until there is a
 * real one to show; an attorney audience checks.
 *
 * Links point to the real domains:
 *   trust.jural.app  : Trust Center
 *   status.jural.app : API and system status
 */
export function Trust() {
  return (
    <section id="security" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              Security
            </div>

            <h2 className="text-[clamp(1.75rem,1rem+2.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Your firm&rsquo;s data. Protected at every layer.
            </h2>

            <div className="mx-auto mt-6 max-w-xl space-y-4 text-[16px] leading-relaxed text-[var(--color-ink-2)]">
              <p>
                Device sync, case chat and attachments are end-to-end encrypted
                with the Signal protocol, readable only on your firm&rsquo;s
                authorized devices.
              </p>
              <p>
                Case and client records are kept on Microsoft Azure in the US,
                encrypted in transit and at rest, isolated to your firm and
                gated by role.
              </p>
              <p className="font-semibold text-[var(--color-ink)]">
                Privacy isn&rsquo;t an add-on. It&rsquo;s part of the architecture.
              </p>
            </div>

            <a
              href="https://trust.jural.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-deep)]"
            >
              Visit the Trust Center
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
