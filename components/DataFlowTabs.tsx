/**
 * The sync diagram: iPhone and Mac exchanging encrypted edits through a relay
 * that cannot read them. One picture, one caption, nothing to operate. Static
 * markup, so the section ships as a server component with no client JS.
 */

const STROKE = { fill: "none", stroke: "var(--color-ink-2)", strokeWidth: 1.4 } as const;
const DASH = {
  fill: "none",
  stroke: "var(--color-ink-3)",
  strokeWidth: 1.2,
  strokeDasharray: "3 5",
  opacity: 0.55,
} as const;
const BRAND = { fill: "none", stroke: "var(--color-brand)", strokeWidth: 1.5 } as const;

export function DataFlowTabs() {
  return (
    <div>
      {/* panel */}
      <div className="rounded-[20px] bg-[var(--color-brand-wash)]/60 px-6 py-10 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <svg viewBox="0 0 760 280" className="h-auto w-full" aria-hidden="true">
            {/* iPhone */}
            <rect {...STROKE} x="96" y="88" width="44" height="84" rx="8" />
            <line {...STROKE} x1="111" y1="96" x2="125" y2="96" />
            <text
              x="118"
              y="200"
              textAnchor="middle"
              fill="var(--color-ink-3)"
              fontSize="13"
              fontFamily="var(--font-sans)"
            >
              Your iPhone
            </text>

            {/* Mac */}
            <rect {...STROKE} x="584" y="94" width="88" height="58" rx="4" />
            <line {...STROKE} x1="574" y1="166" x2="682" y2="166" strokeLinecap="round" />
            <line {...STROKE} x1="628" y1="152" x2="628" y2="166" />
            <text
              x="628"
              y="200"
              textAnchor="middle"
              fill="var(--color-ink-3)"
              fontSize="13"
              fontFamily="var(--font-sans)"
            >
              Your Mac
            </text>

            {/* encrypted flow */}
            <line {...DASH} x1="156" y1="130" x2="286" y2="130" />
            <line {...DASH} x1="474" y1="130" x2="568" y2="130" />

            {/* the relay: a disc that never holds a readable copy */}
            <circle cx="380" cy="130" r="86" fill="white" />
            <circle {...DASH} cx="310" cy="130" r="86" />
            <circle {...DASH} cx="450" cy="130" r="86" />
            <rect {...BRAND} x="371" y="126" width="18" height="14" rx="3" />
            <path {...BRAND} d="M375 126v-4.5a5 5 0 0 1 10 0V126" />
            <line {...DASH} x1="380" y1="216" x2="380" y2="232" />
            <text
              x="380"
              y="250"
              textAnchor="middle"
              fill="var(--color-ink-3)"
              fontSize="13"
              fontFamily="var(--font-sans)"
            >
              Zero-knowledge relay
            </text>
          </svg>
        </div>
      </div>

      {/* caption */}
      <p className="mx-auto mt-9 max-w-md text-center text-[16.5px] leading-relaxed text-[var(--color-ink)]">
        Edits leave one device already encrypted and arrive at the other still
        encrypted. The relay in the middle forwards what it cannot open.
      </p>
    </div>
  );
}
