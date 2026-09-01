"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The encryption fact, shown once: the same note on both sides of the wire.
 * The server half starts as the readable note and encrypts itself the first
 * time the panel scrolls into view: a character wavefront sweeps left to
 * right, and the lock closes behind it. It runs once, in about a second,
 * and never moves again. Reduced-motion users get the finished state.
 */

const PLAINTEXT =
  "Met with Dana Reyes. She'll settle at $85k if fees are covered. Remind me to call opposing counsel Thursday.";

const CIPHERTEXT =
  "gq7Vt2xM9zR0aKpDcE1uYfHsW4bNj8LoQiA5mTZ3vXr6BdUwCkOeJyPnI0hSGF2L9tKq0mW7uZxRb3VfN8cYpDaH1sJgE5oQiL4vTn6AyMwXrCd";

const SWEEP_MS = 1100;

export function CipherPanel() {
  const ref = useRef<HTMLDivElement>(null);
  /* how far the encryption wavefront has travelled, 0..1; 1 = fully sealed */
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        /* a beat after arrival, so the readable note registers first */
        timeout = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / SWEEP_MS, 1);
            setProgress(p);
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, 500);
      },
      { threshold: 0.5 }
    );

    io.observe(node);
    return () => {
      io.disconnect();
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  const sealed = progress >= 1;
  const cut = Math.round(progress * CIPHERTEXT.length);
  const encrypted = CIPHERTEXT.slice(0, cut);
  const remaining = PLAINTEXT.slice(Math.round(progress * PLAINTEXT.length));

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[12px] bg-white shadow-[0_28px_70px_-28px_rgba(14,21,36,0.4)] ring-1 ring-[rgba(14,21,36,0.1)]"
    >
      <div className="grid sm:grid-cols-2">
        {/* on the device */}
        <div className="flex flex-col gap-6 border-b border-[var(--color-line)] p-8 sm:border-b-0 sm:border-r sm:p-10 lg:p-12">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
            On your device
          </p>
          <p className="my-auto max-w-[38ch] text-[15px] leading-relaxed text-[var(--color-ink)]">
            {PLAINTEXT}
          </p>
        </div>

        {/* on the servers */}
        <div className="flex flex-col gap-6 bg-[var(--color-brand)] p-8 sm:p-10 lg:p-12">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
            On Jural&rsquo;s servers
          </p>
          <p
            aria-label="The same note, stored as unreadable ciphertext"
            className="my-auto max-w-[38ch] break-all font-mono text-[13px] leading-relaxed text-white/90"
          >
            {encrypted}
            {!sealed && <span className="text-white/70">{remaining}</span>}
          </p>
        </div>
      </div>

      {/* the lock on the seam, closing as the sweep finishes */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_4px_16px_rgba(14,21,36,0.12)] ring-1 ring-[var(--color-line)] sm:grid"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--color-brand)]"
        >
          <rect x="5" y="11" width="14" height="9" rx="2" />
          {/* shackle: open until the note is sealed */}
          <path
            d="M8 11V8a4 4 0 0 1 8 0v3"
            className={`origin-[16px_11px] transition-transform duration-300 motion-reduce:transition-none ${
              sealed ? "rotate-0" : "-translate-y-[1.5px] rotate-[24deg]"
            }`}
          />
        </svg>
      </div>
    </div>
  );
}
