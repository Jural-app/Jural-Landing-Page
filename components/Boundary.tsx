"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The privacy argument, drawn.
 *
 * A file starts on your phone and crosses a line it cannot come back from, and
 * every hop it reaches keeps a copy. The copies piling up on the track are the
 * argument. Jural's side is the same track with one copy on it and nothing
 * moving, because nothing does.
 */

const ALERT = "#b3253a";

const ICON = {
  phone:
    "M13.4 2.2H6.6A1.7 1.7 0 004.9 3.9v12.2a1.7 1.7 0 001.7 1.7h6.8a1.7 1.7 0 001.7-1.7V3.9a1.7 1.7 0 00-1.7-1.7zM8.9 15.3h2.2",
  cloud: "M14.6 15.6H5.7a3.7 3.7 0 01-.4-7.4 5.3 5.3 0 0110.1-1.5 4 4 0 01-.8 8.9z",
  chip: "M7 7h6v6H7zM4.4 8.6h2.6M4.4 11.4h2.6M13 8.6h2.6M13 11.4h2.6M8.6 4.4V7M11.4 4.4V7M8.6 13v2.6M11.4 13v2.6",
  laptop:
    "M15.6 12.6V4.9a1.3 1.3 0 00-1.3-1.3H5.7a1.3 1.3 0 00-1.3 1.3v7.7M1.6 12.6h16.8v1.5a1.9 1.9 0 01-1.9 1.9H3.5a1.9 1.9 0 01-1.9-1.9z",
  logs: "M10 6.2c3.4 0 6.2-1 6.2-2.1S13.4 2 10 2 3.8 3 3.8 4.1 6.6 6.2 10 6.2zM3.8 4.1v11.8c0 1.2 2.8 2.1 6.2 2.1s6.2-.9 6.2-2.1V4.1M3.8 10c0 1.2 2.8 2.1 6.2 2.1s6.2-.9 6.2-2.1",
};

const HOPS = [
  { t: "Your phone", d: ICON.phone },
  { t: "Vendor API", d: ICON.cloud },
  { t: "Model provider", d: ICON.chip },
  { t: "Training logs", d: ICON.logs },
];

/** Four equal columns, so every mark lands on a known centre. */
const AT = ["12.5%", "37.5%", "62.5%", "87.5%"];
const TRIP = {
  duration: 4.2,
  times: [0, 0.34, 0.67, 1],
  repeat: Infinity,
  repeatDelay: 2.2,
};

/** The file itself, not a dot. */
function File({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 14 17" className="size-[15px]" aria-hidden="true">
      <path
        d="M8.6 1H2.8A1.8 1.8 0 001 2.8v11.4A1.8 1.8 0 002.8 16h8.4a1.8 1.8 0 001.8-1.8V5.4z"
        fill={tone}
        stroke={tone}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M8.6 1v4.4H13M4 9.4h6M4 12h4"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.9"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Hop({ t, d, first }: { t: string; d: string; first?: boolean }) {
  return (
    <div className="relative flex flex-col items-center gap-2.5 text-center">
      <span
        className={`relative grid size-12 place-items-center rounded-xl border ${
          first
            ? "border-[color:var(--color-blue)]/30 bg-[color:var(--color-blue-wash)]"
            : "border-[color:var(--color-rule)] bg-white"
        }`}
      >
        <svg viewBox="0 0 20 20" className="size-[21px]" aria-hidden="true">
          <path
            d={d}
            fill="none"
            stroke={first ? "var(--color-blue)" : "var(--color-ink-3)"}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[11.5px] leading-tight text-[color:var(--color-ink-3)]">{t}</span>
    </div>
  );
}

export function Boundary() {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-14">
      {/* ------------------------------------------------------- cloud */}
      <figure className="min-w-0">
        <h3 className="text-[20px] font-medium tracking-[-0.025em]">Cloud legal AI</h3>

        <div className="relative mt-6 grid h-[188px] items-center rounded-2xl border border-dashed border-[color:var(--color-rule)] bg-[color:var(--color-paper-2)] px-5">
          {/* the line it cannot come back from */}
          <span
            aria-hidden="true"
            className="absolute inset-y-5 w-px"
            style={{ left: "25%", background: `${ALERT}59` }}
          />
          <div className="relative">
            {/* the line the file travels, behind the row */}
            <span
              aria-hidden="true"
              className="absolute left-[12.5%] right-[12.5%] top-6 h-px bg-[color:var(--color-rule)]"
            />

            <div className="relative grid grid-cols-4">
              {HOPS.map((h, i) => (
                <Hop key={h.t} t={h.t} d={h.d} first={i === 0} />
              ))}
            </div>

            {/* the file, making the trip */}
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="absolute top-6 -translate-x-1/2 -translate-y-1/2"
                initial={{ left: AT[0], opacity: 0 }}
                whileInView={{ left: AT, opacity: [0, 1, 1, 1] }}
                viewport={{ once: false, margin: "-100px" }}
                transition={TRIP}
              >
                <span className="grid size-6 place-items-center rounded-full bg-[color:var(--color-paper-2)]">
                  <File tone={ALERT} />
                </span>
              </motion.span>
            )}
          </div>

        </div>

        <p className="small mt-5 max-w-[52ch] leading-relaxed">
          Once the file leaves, its safety is a contract someone else wrote:
          retention windows, sub-processors, and a breach notice you&rsquo;d be
          the last to hear about.
        </p>
      </figure>

      {/* ------------------------------------------------------- jural */}
      <figure className="min-w-0">
        <h3 className="text-[20px] font-medium tracking-[-0.025em]">Jural</h3>

        <div className="relative mt-6 grid h-[188px] place-items-center overflow-hidden rounded-2xl bg-[color:var(--color-theatre)] px-5">
          <div className="flex flex-col items-center gap-2.5 text-center">
            <span className="flex h-12 items-center gap-3.5 rounded-xl border border-white/20 bg-white/10 px-4">
              {[ICON.laptop, ICON.phone].map((d) => (
                <svg key={d} viewBox="0 0 20 20" className="size-[21px]" aria-hidden="true">
                  <path
                    d={d}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ))}
            </span>
            <span className="text-[11.5px] leading-tight text-white/85">
              Your devices
            </span>
          </div>

          <p className="absolute inset-x-0 bottom-4 text-center text-[11px] tracking-[0.04em] text-white/70">
            it never leaves this box
          </p>
        </div>

        <p className="small mt-5 leading-relaxed">
          The model runs on the phone. There&rsquo;s no upload to secure, no
          retention policy to take on faith, and no copy of the case sitting
          anywhere you can&rsquo;t delete yourself.
        </p>
      </figure>
    </div>
  );
}
