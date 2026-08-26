"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { LuCalendarClock, LuCheck, LuFileText, LuMic, LuSignature } from "react-icons/lu";
import { Bubble, Card, Chip, I, Row, Screen } from "./FeatureUI";

/**
 * Coded screens for the iPhone page's day narrative. Same primitives as the
 * homepage Features section, same fictional matter (Hale v. Northshore
 * Logistics), so a visitor who has scrolled the homepage recognises the case
 * instead of meeting a fresh cast per page.
 *
 * Each scene plays itself: its elements arrive in conversation order once the
 * scene scrolls into view, hold, then replay. Nothing moves or resizes, so
 * the layout is identical to the static version; hidden steps keep their
 * space and simply have not faded in yet. Under prefers-reduced-motion every
 * step renders immediately and nothing loops.
 */

const STEP_MS = 950;
const HOLD_MS = 2800;
const FADE_MS = 450;

/** Sequenced visibility: how many steps of the scene are on screen. */
function useScenePlay(steps: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [dim, setDim] = useState(false);
  const [active, setActive] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setShown(steps);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [steps]);

  useEffect(() => {
    if (!active || still) return;
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        setDim(false);
        setShown(0);
        await sleep(400);
        for (let i = 1; i <= steps; i += 1) {
          if (!alive) return;
          setShown(i);
          await sleep(STEP_MS);
        }
        await sleep(HOLD_MS);
        if (!alive) return;
        setDim(true);
        await sleep(FADE_MS);
      }
    })();
    return () => { alive = false; };
  }, [active, still, steps]);

  return { ref, shown, dim };
}

/** Fades a step in place; space is reserved either way, so nothing shifts. */
function Step({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <div
      className={`transition-all duration-500 ease-out motion-reduce:transition-none ${
        on ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

/** A voice note, drawn: bars, not audio. They pulse while it records. */
function Waveform({ recording }: { recording: boolean }) {
  const bars = [5, 9, 13, 8, 11, 15, 10, 6, 12, 9, 14, 7, 10, 5, 8, 12, 6, 9];
  return (
    <div className="flex justify-end">
      <div className="flex max-w-[86%] items-center gap-2 rounded-2xl bg-[var(--color-brand)] px-3 py-2.5">
        <LuMic size={12} strokeWidth={2.2} className="shrink-0 text-white/80" />
        <span className="flex items-center gap-[2.5px]" aria-hidden="true">
          {bars.map((h, idx) => (
            <span
              key={idx}
              style={{
                height: h,
                animation: recording
                  ? `jural-eq 0.8s ease-in-out ${idx * 0.07}s infinite`
                  : "none",
              }}
              className="w-[2.5px] origin-center rounded-full bg-white/85"
            />
          ))}
        </span>
        <span className="text-[10px] font-medium text-white/80">0:41</span>
      </div>
    </div>
  );
}

/** 9:40 AM. The hearing files itself. */
export function CourthouseUI() {
  const { ref, shown, dim } = useScenePlay(3);
  return (
    <div ref={ref} className={`transition-opacity duration-500 ${dim ? "opacity-0" : "opacity-100"}`}>
      <Screen title="Hale v. Northshore Logistics">
        <div className="space-y-2">
          <Step on={shown >= 1}>
            <Waveform recording={shown === 1} />
          </Step>
          <Step on={shown >= 2}>
            <p className="pr-1 text-right text-[10px] italic leading-snug text-[var(--color-ink-3)]">
              &ldquo;Judge continued us to the 14th, she wants the payment ledger
              exhibits stipulated, chase Northshore&rsquo;s counsel this week&hellip;&rdquo;
            </p>
          </Step>
        </div>
        <div className="mt-3">
          <Step on={shown >= 3}>
            <Card icon={<LuCheck {...I} />} title="Noted, on the record" tone="good">
              <div className="flex flex-wrap gap-1.5">
                <Chip>Hearing note filed</Chip>
                <Chip>2 tasks created</Chip>
                <Chip>0.4 hr logged</Chip>
              </div>
            </Card>
          </Step>
        </div>
      </Screen>
    </div>
  );
}

/** 12:15 PM. Ask the case, not your memory. */
export function AskTheCaseUI() {
  const { ref, shown, dim } = useScenePlay(5);
  return (
    <div ref={ref} className={`transition-opacity duration-500 ${dim ? "opacity-0" : "opacity-100"}`}>
      <Screen title="Hale v. Northshore Logistics">
        <div className="space-y-2">
          <Step on={shown >= 1}>
            <Bubble me>When did Northshore last actually pay us?</Bubble>
          </Step>
          <Step on={shown >= 2}>
            <Bubble>
              Nov 12, 2023. $6,250 against invoice 1041, cleared in full. Nothing
              since.
            </Bubble>
          </Step>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <Step on={shown >= 3}>
            <Chip>Source: Invoice 1041.pdf</Chip>
          </Step>
        </div>
        <div className="mt-2.5 space-y-2">
          <Step on={shown >= 4}>
            <Bubble me>Do we have a signed W-9 from them?</Bubble>
          </Step>
          <Step on={shown >= 5}>
            <Bubble>Not on file.</Bubble>
          </Step>
        </div>
      </Screen>
    </div>
  );
}

/** 3:05 PM. Paper moves at hallway speed. */
export function HallwayUI() {
  const { ref, shown, dim } = useScenePlay(3);
  return (
    <div ref={ref} className={`transition-opacity duration-500 ${dim ? "opacity-0" : "opacity-100"}`}>
      <Screen title="Hale v. Northshore Logistics">
        <div className="space-y-2">
          <Step on={shown >= 1}>
            <Bubble me>Send Alex the engagement letter for signature</Bubble>
          </Step>
        </div>
        <div className="mt-3 space-y-2.5">
          <Step on={shown >= 2}>
            <Card icon={<LuSignature {...I} />} title="Engagement letter" meta="Sent 3:07 PM">
              <Row label="Signer" value="Alex Morgan" />
              <Row label="Drafted from" value="Case record" />
            </Card>
          </Step>
          <Step on={shown >= 3}>
            <Card icon={<LuCheck {...I} />} title="Executed" tone="good" meta="3:19 PM">
              <p className="text-[10px] text-[var(--color-ink-3)]">
                Certificate issued. Filed back into the case.
              </p>
            </Card>
          </Step>
        </div>
      </Screen>
    </div>
  );
}

/** 6:30 PM. The day bills itself. */
export function KitchenCounterUI() {
  const { ref, shown, dim } = useScenePlay(3);
  return (
    <div ref={ref} className={`transition-opacity duration-500 ${dim ? "opacity-0" : "opacity-100"}`}>
      <Screen title="Invoice 1044">
        <Step on={shown >= 1}>
          <Card icon={<LuCalendarClock {...I} />} title="Captured today" meta="Tue">
            <Row label="Hearing + note" value="0.4 hr" />
            <Row label="Client call" value="0.3 hr" />
            <Row label="Engagement letter" value="0.5 hr" />
          </Card>
        </Step>
        <div className="mt-2.5">
          <Step on={shown >= 2}>
            <div className="rounded-xl border border-[var(--color-line)] p-3">
              <Row label="1.2 hrs at $320" value="$384.00" />
              <Row label="Prior unbilled" value="$4,026.00" />
              <div className="mt-1.5 flex items-center justify-between border-t border-[var(--color-line)] pt-2">
                <p className="text-[11.5px] font-semibold text-[var(--color-ink)]">Total</p>
                <p className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-brand)]">
                  $4,410.00
                </p>
              </div>
              <button
                type="button"
                tabIndex={-1}
                className="mt-2.5 w-full rounded-lg bg-[var(--color-brand)] py-1.5 text-[11px] font-semibold text-white"
              >
                Send invoice
              </button>
            </div>
          </Step>
        </div>
        <Step on={shown >= 3}>
          <p className="mt-2.5 flex items-center gap-1.5 text-[10px] text-[var(--color-ink-3)]">
            <LuFileText size={11} strokeWidth={2.2} />
            You keep all of it. Jural takes 0%.
          </p>
        </Step>
      </Screen>
    </div>
  );
}
