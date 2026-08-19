/**
 * Clients — compact "Trusted by" bar directly below the hero.
 * Label on the left, a few client wordmarks on the right. Tight spacing.
 */
const CLIENTS = ["Marbrook", "Northgate", "Pearce Legal"];

function Mark({ i }: { i: number }) {
  const marks = [
    <circle key="0" cx="12" cy="12" r="8" />,
    <path key="1" d="M4 18 12 5l8 13z" />,
    <path key="2" d="M12 3l7 4v10l-7 4-7-4V7z" />,
  ];
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {marks[i]}
    </svg>
  );
}

export function Clients() {
  return (
    <section className="border-b border-[var(--color-line)] bg-white">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-5 px-6 py-6 sm:flex-row">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
          Trusted by
        </p>

        <div className="flex items-center gap-8 text-[var(--color-ink-3)]">
          {CLIENTS.map((name, i) => (
            <div key={name} className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100">
              <Mark i={i} />
              <span className="text-[17px] font-semibold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
