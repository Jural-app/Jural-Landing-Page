/**
 * Three panels, three guarantees. These were previously a row of small cards
 * at the foot of the privacy section, which is the weakest placement on the
 * page for the most differentiated claims Jural has.
 *
 * The line art is drawn, not illustrated stock: one geometric motif per panel,
 * built from the same stroke weight so the three read as a set.
 */

function Sunburst() {
  const lines = Array.from({ length: 40 }, (_, i) => {
    const a = (i / 40) * Math.PI * 2;
    return {
      x1: 60 + Math.cos(a) * 17,
      y1: 60 + Math.sin(a) * 17,
      x2: 60 + Math.cos(a) * (i % 2 ? 40 : 52),
      y2: 60 + Math.sin(a) * (i % 2 ? 40 : 52),
    };
  });
  return (
    <svg viewBox="0 0 120 120" fill="none" className="size-[104px]" aria-hidden="true">
      <circle cx="60" cy="60" r="13" stroke="currentColor" strokeWidth="0.9" />
      {lines.map((l, i) => (
        <line key={i} {...l} stroke="currentColor" strokeWidth="0.9" />
      ))}
    </svg>
  );
}

function Nested() {
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return `${60 + Math.cos(a) * r},${60 + Math.sin(a) * r}`;
    }).join(" ");
  return (
    <svg viewBox="0 0 120 120" fill="none" className="size-[104px]" aria-hidden="true">
      {[52, 42, 32, 22, 12].map((r) => (
        <polygon key={r} points={hex(r)} stroke="currentColor" strokeWidth="0.9" />
      ))}
    </svg>
  );
}

function Lattice() {
  const rows = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 120 120" fill="none" className="size-[104px]" aria-hidden="true">
      {rows.map((r) => {
        const y = 26 + r * 23;
        return (
          <g key={r}>
            <polygon
              points={`60,${y - 13} 96,${y} 60,${y + 13} 24,${y}`}
              stroke="currentColor"
              strokeWidth="0.9"
            />
            {[0, 1, 2, 3, 4].map((c) => (
              <line
                key={c}
                x1={24 + c * 18}
                y1={y}
                x2={60}
                y2={y - 13}
                stroke="currentColor"
                strokeWidth="0.55"
                strokeOpacity="0.6"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

const PANELS = [
  {
    t: "Privilege stays intact",
    d: "No third party ever processes a client confidence. Nothing to audit, no sub-processor list, no breach notice to write.",
    art: <Nested />,
    bg: "bg-[color:var(--color-blue-wash)]",
    fg: "text-[color:var(--color-ink)]",
    sub: "text-[color:var(--color-ink-3)]",
    art_c: "text-[color:var(--color-blue)]",
  },
  {
    t: "No AI surcharge",
    d: "Nobody is metering tokens behind the product, so there is no intelligence tier to add to your bill.",
    art: <Sunburst />,
    bg: "bg-[color:var(--color-theatre)]",
    fg: "text-[color:var(--color-chalk)]",
    sub: "text-[color:var(--color-chalk-2)]",
    art_c: "text-[color:var(--color-ios-2)]",
  },
  {
    t: "Works with no signal",
    d: "Courthouse basements, flights, elevators. The model is already on the device and never goes looking for a network.",
    art: <Lattice />,
    bg: "bg-[color:var(--color-paper-2)]",
    fg: "text-[color:var(--color-ink)]",
    sub: "text-[color:var(--color-ink-3)]",
    art_c: "text-[color:var(--color-ink-3)]",
  },
];

const TICKER = ["Your practice", "Your device", "Your call"];

export function Pillars() {
  return (
    <section aria-label="What running on your own device buys you">
      <div className="grid md:grid-cols-3">
        {PANELS.map((p) => (
          <div
            key={p.t}
            className={`flex min-h-[420px] flex-col justify-between p-8 md:min-h-[480px] md:p-10 ${p.bg} ${p.fg}`}
          >
            <div className={p.art_c}>{p.art}</div>

            <div>
              <h3 className="text-[clamp(1.35rem,1.1rem+0.7vw,1.7rem)] font-medium tracking-[-0.03em]">
                {p.t}
              </h3>
              <p className={`mt-3 max-w-[34ch] text-[15.5px] leading-relaxed ${p.sub}`}>{p.d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ticker */}
      <div className="overflow-hidden border-y border-[color:var(--color-rule)] bg-[color:var(--color-paper)] py-7">
        <div className="marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1 || undefined}>
              {TICKER.concat(TICKER, TICKER).map((t, i) => (
                <span key={`${copy}-${i}`} className="flex items-center">
                  <span className="whitespace-nowrap text-[clamp(2rem,1.2rem+3vw,4rem)] font-medium tracking-[-0.04em]">
                    {t}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-8 size-2 shrink-0 rounded-full bg-[color:var(--color-blue)] md:mx-12"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
