"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

/**
 * One line, one mark. The rosette is drawn from a single ellipse rotated many
 * times, so the pattern is generated rather than placed, and it turns slowly
 * behind the mark while a signal pulses out of it.
 */

const SPOKES = Array.from({ length: 44 }, (_, i) => (i * 360) / 44);
const PULSES = [0, 1.4, 2.8];

export function Statement() {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col items-center text-center">
      {/* a thread down from the section above */}
      <motion.span
        aria-hidden="true"
        className="w-px origin-top bg-gradient-to-b from-transparent to-[color:var(--color-rule-dark)]"
        initial={reduce ? false : { height: 0 }}
        whileInView={{ height: 64 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: 64 }}
      />

      <motion.div
        className="relative my-6 grid size-[220px] place-items-center md:size-[272px]"
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* the rosette, turning */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 340 340"
          className="absolute inset-0 size-full"
          fill="none"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {SPOKES.map((a) => (
            <ellipse
              key={a}
              cx="170"
              cy="170"
              rx="150"
              ry="58"
              transform={`rotate(${Math.round(a * 100) / 100} 170 170)`}
              stroke="rgba(168,214,255,0.11)"
              strokeWidth="0.7"
            />
          ))}
        </motion.svg>

        {/* signal leaving the mark */}
        {!reduce &&
          PULSES.map((delay) => (
            <motion.span
              key={delay}
              aria-hidden="true"
              className="absolute size-[96px] rounded-full border border-[color:var(--color-ios-2)]"
              initial={{ opacity: 0, scale: 1 }}
              whileInView={{ opacity: [0, 0.32, 0], scale: [1, 2.4] }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 4.2, delay, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

        <motion.span
          className="relative grid size-[84px] place-items-center rounded-full bg-white md:size-[92px]"
          animate={
            reduce
              ? undefined
              : {
                  boxShadow: [
                    "0 0 40px rgba(69,200,251,0.16)",
                    "0 0 78px rgba(69,200,251,0.30)",
                    "0 0 40px rgba(69,200,251,0.16)",
                  ],
                }
          }
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/brand/jural-mark.png"
            alt=""
            width={38}
            height={48}
            className="w-[33px] md:w-[36px]"
          />
        </motion.span>
      </motion.div>

      <p className="max-w-[24ch] text-[clamp(1.6rem,1.05rem+1.8vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.035em] text-[color:var(--color-chalk-3)]">
        An intelligence that holds your entire practice, and{" "}
        <span className="text-[color:var(--color-chalk)]">
          never leaves the device it runs on
        </span>
        .
      </p>
    </div>
  );
}
