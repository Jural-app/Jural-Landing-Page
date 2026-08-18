/**
 * Jural's interface, rebuilt in the browser.
 *
 * Everything the page shows of the product is composed from these pieces —
 * no screenshots. That means the demos can be driven, animated and read by
 * a screen reader, and the UI stays truthful to the app as it changes.
 */
import type { ReactNode } from "react";

/* ---------------------------------------------------------------- chrome */

export function Phone({
  children,
  className = "",
  width = 300,
}: {
  children: ReactNode;
  className?: string;
  width?: number;
}) {
  return (
    <div
      className={`relative shrink-0 rounded-[2.6rem] bg-[#1c1c20] p-[3px] shadow-[0_2px_8px_rgba(0,0,0,.3),0_30px_80px_-20px_rgba(0,0,0,.55)] ${className}`}
      style={{ width }}
    >
      <div className="relative overflow-hidden rounded-[2.45rem] bg-black">
        {/* status bar */}
        <div className="relative flex h-11 items-end justify-between px-6 pb-1.5 text-[12px] font-semibold text-white">
          <span className="num tracking-tight">9:41</span>
          <div className="absolute left-1/2 top-1.5 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <Signal />
            <Battery />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Signal() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 4}
          y={8 - i * 2.4}
          width="2.6"
          height={3 + i * 2.4}
          rx="0.8"
          fill="white"
          opacity={i === 3 ? 0.35 : 1}
        />
      ))}
    </svg>
  );
}

function Battery() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="20" height="11" rx="3.2" stroke="white" strokeOpacity=".4" />
      <rect x="2" y="2" width="14" height="8" rx="2" fill="white" />
      <path d="M22 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="white" fillOpacity=".4" />
    </svg>
  );
}

export function ThreadHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-white/8 bg-[#0a0a0c]/95 px-3.5 py-2.5">
      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" aria-hidden="true">
        <path d="M7.5 1 1.5 8l6 7" stroke="#0a84ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="size-8 shrink-0 rounded-full bg-gradient-to-br from-[#3a3f52] via-[#1d2333] to-[#6d5f78]" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold leading-tight text-white">{title}</p>
        <p className="truncate text-[11px] leading-tight text-white/55">{sub}</p>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-white/8 p-0.5">
        <span className="grid size-7 place-items-center rounded-full bg-[#0a84ff]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.4 3.6V16H6.5A2.5 2.5 0 0 1 4 13.5Z" fill="white" />
          </svg>
        </span>
        <span className="grid size-7 place-items-center rounded-full">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            {[0, 1].map((r) =>
              [0, 1].map((c) => (
                <rect key={`${r}${c}`} x={c * 8} y={r * 8} width="6" height="6" rx="1.6" fill="white" fillOpacity=".55" />
              ))
            )}
          </svg>
        </span>
      </div>
    </div>
  );
}

export function Composer({ hint = "Message" }: { hint?: string }) {
  return (
    <div className="flex items-center gap-2.5 border-t border-white/8 bg-[#0a0a0c] px-3 py-2.5">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-[17px] leading-none text-white/70">
        +
      </span>
      <span className="flex-1 rounded-full border border-white/12 px-3 py-1.5 text-[13px] text-white/55">
        {hint}
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <rect x="9" y="3" width="6" height="11" rx="3" fill="white" fillOpacity=".7" />
        <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" stroke="white" strokeOpacity=".7" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------- bubbles */

export function Said({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[76%] rounded-[1.15rem] rounded-br-[0.4rem] bg-[color:var(--color-ios-deep)] px-3.5 py-2 text-[14px] leading-snug text-white">
        {children}
      </p>
    </div>
  );
}

export function Thinking() {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-2 w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-white/55"
          style={{ animation: `pulse-dot 1.1s ${i * 0.16}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------- artifact cards
   These are the objects Jural returns into the thread. Each is a real
   record — editable, and inert until the lawyer approves it.            */

export function Artifact({
  kind,
  title,
  accent = "#0a84ff",
  children,
  action,
}: {
  kind: string;
  title: string;
  accent?: string;
  children?: ReactNode;
  action?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#16161a]">
      <div className="flex items-center gap-2 px-3.5 pt-3">
        <span className="size-1.5 rounded-full" style={{ background: accent }} />
        <span className="mono text-[9px] tracking-[0.14em] text-white/55">{kind}</span>
      </div>
      <p className="px-3.5 pt-1 text-[14.5px] font-semibold leading-tight text-white">{title}</p>
      {children && <div className="px-3.5 pt-2.5">{children}</div>}
      {action && (
        <div className="mt-3 border-t border-white/8 px-3.5 py-2.5">
          <span className="block rounded-lg bg-[color:var(--color-ios-deep)] py-1.5 text-center text-[13px] font-semibold text-white">
            {action}
          </span>
        </div>
      )}
    </div>
  );
}

export function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-[5px] text-[12.5px]">
      <span className="text-white/55">{k}</span>
      <span className={`num ${strong ? "font-semibold text-white" : "text-white/85"}`}>{v}</span>
    </div>
  );
}
