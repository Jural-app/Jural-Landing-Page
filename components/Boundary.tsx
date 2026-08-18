"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The privacy argument, drawn.
 *
 * Left: what a cloud tool does with a privileged file — it crosses a boundary
 * and keeps crossing. Right: Jural's loop closes inside the device. The point
 * is the boundary line, so the boundary is the loudest thing in the picture.
 */

export function Boundary() {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      {/* ---------------------------------------------- cloud */}
      <figure>
        <figcaption className="mono mb-5 text-[color:var(--color-ink-4)]">
          Cloud legal AI
        </figcaption>

        <div className="relative h-[210px] rounded-2xl border border-dashed border-[color:var(--color-rule)] bg-[color:var(--color-paper-2)] p-5">
          <Boundaryline label="your device ends here" />

          <div className="flex h-full items-center justify-between">
            <Node label="Your phone" solid />
            <Node label="Vendor" />
            <Node label="Model host" />
            <Node label="Logs" />
          </div>

          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute top-[92px] size-2.5 rounded-full bg-[#b3253a]"
              initial={{ left: "10%", opacity: 0 }}
              whileInView={{
                left: ["10%", "38%", "64%", "88%"],
                opacity: [0, 1, 1, 1],
              }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 3.4, times: [0, 0.33, 0.66, 1], repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
            />
          )}
        </div>

        <p className="small mt-5 leading-relaxed">
          The file leaves. After that its safety is a contract someone else
          wrote — retention windows, sub-processors, and a breach notification
          you would be the last to read.
        </p>
      </figure>

      {/* ---------------------------------------------- jural */}
      <figure>
        <figcaption className="mono mb-5 text-[color:var(--color-blue)]">Jural</figcaption>

        <div className="relative h-[210px] overflow-hidden rounded-2xl border border-[color:var(--color-ink)] bg-[color:var(--color-ink)] p-5">
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative grid size-[128px] place-items-center rounded-[2rem] border border-white/15">
              <span className="mono text-[9px] text-white/55">on device</span>

              {/* Orbit: the WRAPPER spins about the box centre and the dot
                  rides its top edge. Rotating the dot itself would only spin
                  it in place. */}
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute -top-[5px] left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-[#30d158]" />
                </motion.span>
              )}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-[2rem]"
                animate={reduce ? undefined : { boxShadow: ["0 0 0 0 rgba(48,209,88,.28)", "0 0 0 14px rgba(48,209,88,0)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
          </div>

          <span className="mono absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-white/55">
            no request ever leaves
          </span>
        </div>

        <p className="small mt-5 leading-relaxed">
          The model runs on the phone. There is no upload step to secure, no
          retention policy to trust, and no copy of the matter anywhere you
          could not delete yourself.
        </p>
      </figure>
    </div>
  );
}

function Boundaryline({ label }: { label: string }) {
  return (
    <>
      <span className="absolute inset-y-4 left-[26%] w-px bg-[#b3253a]/55" aria-hidden="true" />
      <span className="mono absolute left-[26%] top-1 ml-2 whitespace-nowrap text-[8.5px] normal-case tracking-[0.06em] text-[#b3253a]">
        {label}
      </span>
    </>
  );
}

function Node({ label, solid }: { label: string; solid?: boolean }) {
  return (
    <span className="flex w-14 flex-col items-center gap-2 text-center">
      <span
        className={`size-9 rounded-xl border ${
          solid
            ? "border-[color:var(--color-ink)] bg-[color:var(--color-ink)]"
            : "border-[color:var(--color-rule)] bg-white"
        }`}
      />
      <span className="text-[10.5px] leading-tight text-[color:var(--color-ink-3)]">{label}</span>
    </span>
  );
}
