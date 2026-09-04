"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The "entire interface, drawn once" moment on /product/iphone, animated: the
 * bar types two messages, then records a voice note with a live transcription
 * running under a small equalizer. One quiet loop, no user interaction.
 *
 * Under prefers-reduced-motion the loop never starts and the bar stays the
 * static placeholder it was before this component existed.
 */

const SCRIPT = [
  { kind: "type" as const, text: "Remind me to chase the demand letter Friday" },
  { kind: "type" as const, text: "Draft an engagement letter for Alex" },
  {
    kind: "voice" as const,
    text: "Hearing moved to the 14th, stipulate the payment ledger exhibits and chase opposing counsel this week.",
  },
];

const TYPE_MS = 38;
const WORD_MS = 170;
const HOLD_MS = 1500;
const REST_MS = 550;

export function MessageBarDemo({ size = "md" }: { size?: "md" | "lg" }) {
  const lg = size === "lg";
  const [text, setText] = useState("");
  const [voice, setVoice] = useState(false);
  const [secs, setSecs] = useState(0);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  /* Long lines behave like a real input: the tail stays visible. */
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [text]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      await sleep(900);
      while (alive) {
        for (const step of SCRIPT) {
          if (!alive) return;

          if (step.kind === "type") {
            setTyping(true);
            for (let i = 1; i <= step.text.length; i += 1) {
              if (!alive) return;
              setText(step.text.slice(0, i));
              await sleep(TYPE_MS);
            }
            await sleep(HOLD_MS);
            setTyping(false);
            setText("");
            await sleep(REST_MS);
          } else {
            setVoice(true);
            setText("");
            const started = Date.now();
            const timer = setInterval(
              () => setSecs(Math.floor((Date.now() - started) / 1000)),
              250
            );
            const words = step.text.split(" ");
            for (let i = 1; i <= words.length; i += 1) {
              if (!alive) { clearInterval(timer); return; }
              setText(words.slice(0, i).join(" "));
              await sleep(WORD_MS);
            }
            await sleep(HOLD_MS);
            clearInterval(timer);
            setVoice(false);
            setSecs(0);
            setText("");
            await sleep(REST_MS);
          }
        }
      }
    })();

    return () => { alive = false; };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`mx-auto flex w-full items-center rounded-full border border-[var(--color-line)] bg-white shadow-[0_18px_44px_-18px_rgba(14,21,36,0.28)] ${
        lg
          ? "mt-0 max-w-[640px] gap-3.5 py-3 pl-6 pr-3"
          : "mt-10 max-w-[440px] gap-3 py-2.5 pl-5 pr-2.5"
      }`}
    >
      {/* recording cluster, only while the voice note runs */}
      {voice && (
        <span className="flex shrink-0 items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-[12px] font-medium tabular-nums text-[var(--color-ink-3)]">
            0:{String(secs).padStart(2, "0")}
          </span>
          <span className="flex h-4 items-center gap-[2.5px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="h-full w-[2.5px] origin-center rounded-full bg-[var(--color-brand)]"
                style={{ animation: `jural-eq 0.9s ease-in-out ${i * 0.12}s infinite` }}
              />
            ))}
          </span>
        </span>
      )}

      {/* the line itself: typed text, live transcript, or the placeholder */}
      <div
        ref={scroller}
        className={`flex-1 overflow-hidden whitespace-nowrap text-left ${lg ? "text-[17px]" : "text-[14.5px]"}`}
      >
        {text === "" && !voice ? (
          <span className="text-[var(--color-ink-3)]">Message the case&hellip;</span>
        ) : (
          <span className={voice ? "text-[var(--color-ink-2)]" : "text-[var(--color-ink)]"}>
            {text}
            {typing && (
              <span className="ml-[1px] inline-block h-[1.05em] w-[1.5px] translate-y-[2px] animate-pulse bg-[var(--color-ink)]" />
            )}
          </span>
        )}
      </div>

      <span className={`grid shrink-0 place-items-center rounded-full bg-[var(--color-brand)] text-white ${lg ? "h-11 w-11" : "h-9 w-9"}`}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </span>
    </div>
  );
}
