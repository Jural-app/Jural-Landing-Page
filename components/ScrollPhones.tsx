"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Scroll-linked device showcase: the trio rises and settles as the reader
 * arrives, annotations a beat behind.
 *
 * ▸ INTERIM. The scroll-scrubbed frame sequence (a phone lying flat and
 *   standing up as you scroll) is built and validated; the frames in
 *   /screens/anim/ carry the Rotato free-plan watermark, so the section runs
 *   the static composite until the licensed re-export lands. To restore the
 *   sequence, see ScrollPhones in git history (canvas scrub over
 *   frame-000..139.webp); the extraction pipeline is one command against
 *   screens/animation.mov.
 */
export function ScrollPhones() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 0.6"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  const sideOpacity = useTransform(scrollYProgress, [0.55, 0.95], [0, 1]);
  const leftX = useTransform(scrollYProgress, [0.55, 0.95], [-24, 0]);
  const rightX = useTransform(scrollYProgress, [0.55, 0.95], [24, 0]);

  return (
    <section aria-label="The app" className="overflow-hidden bg-white">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1340px] items-center gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_minmax(0,960px)_1fr] lg:gap-2"
      >
        {/* left annotation */}
        <motion.p
          style={still ? undefined : { opacity: sideOpacity, x: leftX }}
          className="mx-auto max-w-[24ch] text-center text-[15px] leading-relaxed text-[var(--color-ink-2)] lg:mx-0 lg:max-w-[17ch] lg:text-right"
        >
          <span className="font-semibold text-[var(--color-ink)]">
            Built as an iPhone app,
          </span>{" "}
          not a desktop product shrunk to fit one.
        </motion.p>

        {/* the phones */}
        <div className="order-first lg:order-none">
          <motion.div style={still ? undefined : { y, scale, opacity }}>
            <Image
              src="/screens/mockup.webp"
              alt="Three iPhones running Jural, a client intake arriving into the case thread on the centre screen"
              width={3000}
              height={2000}
              sizes="(min-width: 1024px) 960px, 96vw"
              quality={92}
              className="h-auto w-full"
            />
          </motion.div>
          <motion.p
            style={still ? undefined : { opacity: sideOpacity }}
            className="mt-5 text-center text-[13px] text-[var(--color-ink-3)]"
          >
            Jural for iOS. Every case, wherever the day takes you.
          </motion.p>
        </div>

        {/* right annotation */}
        <motion.p
          style={still ? undefined : { opacity: sideOpacity, x: rightX }}
          className="mx-auto max-w-[24ch] text-center text-[15px] leading-relaxed text-[var(--color-ink-2)] lg:mx-0 lg:max-w-[17ch] lg:text-left"
        >
          <span className="font-semibold text-[var(--color-ink)]">
            The whole case rides along:
          </span>{" "}
          documents, tasks, billing and signatures, in one thread.
        </motion.p>
      </div>
    </section>
  );
}
