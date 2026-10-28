import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * Shared shell for plain reading pages (privacy, support): the site header, a
 * single 720px reading column, the site footer. No illustrations, no motion;
 * these pages are read, not browsed.
 */
export function LegalDoc({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <article className="bg-white">
        <div className="mx-auto max-w-[760px] px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
          <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
            {eyebrow}
          </div>
          <h1 className="mt-5 text-[clamp(2.2rem,1.4rem+3vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            {title}
          </h1>
          {intro ? (
            <div className="mt-6 text-[17px] leading-[1.7] text-[var(--color-ink-2)]">{intro}</div>
          ) : null}
          <div className="mt-12 space-y-12">{children}</div>
        </div>
      </article>
      <Footer />
    </main>
  );
}

export function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold leading-snug tracking-[-0.015em] text-[var(--color-ink)] [font-family:var(--font-display)]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[16px] leading-[1.75] text-[var(--color-ink-2)] [&_a]:text-[var(--color-brand-deep)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-[var(--color-ink)]">
        {children}
      </div>
    </section>
  );
}

export function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 className="pt-2 text-[17px] font-semibold text-[var(--color-ink)]">{children}</h3>;
}

export function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-[var(--color-ink-3)]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Table({ head, rows }: { head: [string, string]; rows: [React.ReactNode, React.ReactNode][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-line)]">
      <table className="w-full min-w-[520px] border-collapse text-left text-[15px] leading-[1.6]">
        <thead>
          <tr className="bg-[var(--color-canvas)] text-[var(--color-ink)]">
            <th className="px-4 py-3 font-semibold">{head[0]}</th>
            <th className="px-4 py-3 font-semibold">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i} className="border-t border-[var(--color-line)] align-top">
              <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{a}</td>
              <td className="px-4 py-3">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
