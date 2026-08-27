"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * ⏸ PARKED, not rendered anywhere: the scroll-scrubbed frame sequence for the
 * iPhone page's device section (a phone lying flat, standing up under the
 * reader's scroll). Built and validated 2026-08-27; benched only because the
 * frames carry the Rotato free-plan watermark.
 *
 * To bring it back once the licensed 60fps re-export lands as
 * public/screens/animation.mov:
 *   1. re-run the extraction (AVAssetImageGenerator script + union-bbox crop
 *      + cwebp, see the session notes; one command end to end)
 *   2. update FRAME_COUNT / FRAME_W / FRAME_H below to match
 *   3. in app/product/iphone/page.tsx, render <ScrollPhonesSequence /> in
 *      place of <ScrollPhones />
 */

const FRAME_COUNT = 140;
const FRAME_W = 668;
const FRAME_H = 986;

const frameSrc = (i: number) =>
  `/screens/anim/frame-${String(i).padStart(3, "0")}.webp`;

export function ScrollPhonesSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    /* Starts once the section's top climbs to 62% of the viewport; ends with
       the standing phone resting near centre. */
    offset: ["start 0.62", "center 0.42"],
  });

  const sideOpacity = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);
  const leftX = useTransform(scrollYProgress, [0.6, 0.95], [-24, 0]);
  const rightX = useTransform(scrollYProgress, [0.6, 0.95], [24, 0]);

  useEffect(() => {
    if (still) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frames: HTMLImageElement[] = [];
    let current = -1;
    let queued = -1;
    let raf = 0;

    const draw = (i: number) => {
      const img = frames[i];
      if (!img?.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, FRAME_W, FRAME_H);
      ctx.drawImage(img, 0, 0, FRAME_W, FRAME_H);
      current = i;
    };

    const request = (i: number) => {
      queued = i;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (queued !== current) draw(queued);
      });
    };

    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (current === -1 && i === 0) draw(0);
        else if (i === queued) draw(i);
      };
      frames.push(img);
    }

    const unsub = scrollYProgress.on("change", (v) => {
      const i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(v * (FRAME_COUNT - 1))));
      request(i);
    });

    request(Math.round(scrollYProgress.get() * (FRAME_COUNT - 1)));

    return () => {
      unsub();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [still, scrollYProgress]);

  return (
    <section aria-label="The app" className="overflow-hidden bg-white">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1340px] items-center gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_minmax(0,960px)_1fr] lg:gap-2"
      >
        <motion.p
          style={still ? undefined : { opacity: sideOpacity, x: leftX }}
          className="mx-auto max-w-[24ch] text-center text-[15px] leading-relaxed text-[var(--color-ink-2)] lg:mx-0 lg:max-w-[17ch] lg:text-right"
        >
          <span className="font-semibold text-[var(--color-ink)]">
            Built as an iPhone app,
          </span>{" "}
          not a desktop product shrunk to fit one.
        </motion.p>

        <div className="order-first lg:order-none">
          {still ? (
            <Image
              src={frameSrc(FRAME_COUNT - 1)}
              alt="Jural on iPhone, a client intake arriving into the case thread"
              width={FRAME_W}
              height={FRAME_H}
              sizes="520px"
              className="mx-auto h-auto w-full max-w-[520px]"
            />
          ) : (
            <canvas
              ref={canvasRef}
              width={FRAME_W}
              height={FRAME_H}
              role="img"
              aria-label="Jural on iPhone, a client intake arriving into the case thread"
              className="mx-auto h-auto w-full max-w-[520px]"
            />
          )}
          <motion.p
            style={still ? undefined : { opacity: sideOpacity }}
            className="mt-5 text-center text-[13px] text-[var(--color-ink-3)]"
          >
            Jural for iOS. Every case, wherever the day takes you.
          </motion.p>
        </div>

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
