import Image from "next/image";

/**
 * Trust: security and recognition section.
 * Left: G2 badge + live status (uptime) card. Right: security copy.
 * Balanced margins, generous whitespace.
 *
 * Links point to the real domains:
 *   trust.jural.app  : Trust Center
 *   status.jural.app : API and system status
 */
export function Trust() {
  return (
    <section id="security" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: G2 badge, centered in its column */}
          <div className="flex justify-center">
            <Image
              src="/g2-badge.png"
              alt="G2 Best Software 2026, Top 25 Legal Products"
              width={868}
              height={1000}
              className="h-[196px] w-auto"
            />
          </div>

          {/* Right: security copy */}
          <div className="text-center lg:text-left">
            <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              Security
            </div>

            <h2 className="text-[clamp(1.75rem,1rem+2.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Your firm&rsquo;s data. Your keys. Your control.
            </h2>

            <div className="mx-auto mt-6 max-w-xl space-y-4 text-[16px] leading-relaxed text-[var(--color-ink-2)] lg:mx-0">
              <p>
                Jural protects case notes, messages, documents, and client
                information with end-to-end encryption.
              </p>
              <p>
                Your data is designed to be readable only on authorized devices.
                Jural does not need access to the contents of your firm&rsquo;s
                confidential information.
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
