"use client";

import { useId, useRef, useState } from "react";

export function Access({ dark, pill }: { dark?: boolean; pill?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();
  const note = `${id}-note`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "busy") return;
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setState("err");
      setMsg("That address doesn't look right.");
      ref.current?.focus();
      return;
    }
    setState("busy");
    try {
      const r = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: v }),
      });
      if (!r.ok) throw new Error();
      setState("ok");
      setMsg("You're on the list. We'll be in touch when a place opens.");
    } catch {
      setState("err");
      setMsg("Something failed on our end. Try again?");
      ref.current?.focus();
    }
  }

  const line = dark ? "border-white/25" : "border-[color:var(--color-ink)]/25";
  const text = dark ? "text-[color:var(--color-chalk)]" : "text-[color:var(--color-ink)]";
  const ph = dark ? "placeholder:text-white/55" : "placeholder:text-[color:var(--color-ink-4)]";

  if (state === "ok") {
    return (
      <p role="status" aria-live="polite" className={`text-[16px] ${text}`}>
        <span className="mr-2 inline-block">✓</span>
        {msg}
      </p>
    );
  }

  if (pill) {
    return (
      <form onSubmit={submit} noValidate>
        <label htmlFor={id} className="sr-only">
          Email address
        </label>

        <div className="flex w-full max-w-[26rem] items-center gap-2 rounded-full bg-white py-2 pl-6 pr-2 shadow-[0_1px_2px_rgba(6,24,43,0.25)]">
          <input
            ref={ref}
            id={id}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@yourfirm.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === "err") setState("idle");
            }}
            aria-invalid={state === "err"}
            aria-describedby={note}
            disabled={state === "busy"}
            className="min-h-[40px] w-full bg-transparent text-[15.5px] text-[color:var(--color-ink)] outline-none placeholder:text-[color:var(--color-ink-4)]"
          />
          <button
            type="submit"
            disabled={state === "busy"}
            aria-label="Request access"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-[color:var(--color-blue)] text-white transition-colors hover:bg-[color:var(--color-blue-deep)] disabled:opacity-40"
          >
            <svg viewBox="0 0 16 16" className="size-[15px]" aria-hidden="true">
              <path
                d="M4 12L12 4M12 4H5.5M12 4v6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <p
          id={note}
          aria-live="polite"
          className={`mt-4 pl-1 text-[13.5px] ${
            state === "err" ? "text-[#ff8a9b]" : "text-[color:var(--color-chalk-3)]"
          }`}
        >
          {state === "err" ? msg : "US attorneys. Invites go out in small batches."}
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      {/* An underline, not a boxed input, the form should read as a line of
          type on the page rather than a widget dropped onto it. */}
      <div className={`flex items-center gap-3 border-b ${line} pb-2 transition-colors focus-within:border-current`}>
        <input
          ref={ref}
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@yourfirm.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "err") setState("idle");
          }}
          aria-invalid={state === "err"}
          aria-describedby={note}
          disabled={state === "busy"}
          className={`min-h-[44px] w-full bg-transparent text-[17px] outline-none ${text} ${ph}`}
        />
        <button
          type="submit"
          disabled={state === "busy"}
          className={`min-h-[44px] shrink-0 cursor-pointer whitespace-nowrap text-[15px] font-medium transition-opacity hover:opacity-60 disabled:opacity-40 ${
            dark ? "text-[color:var(--color-ios-2)]" : "text-[color:var(--color-blue)]"
          }`}
        >
          {state === "busy" ? "Sending…" : "Request access →"}
        </button>
      </div>
      <p
        id={note}
        aria-live="polite"
        className={`mt-3 text-[13.5px] ${
          state === "err"
            ? "text-[#d1495b]"
            : dark
              ? "text-[color:var(--color-chalk-3)]"
              : "text-[color:var(--color-ink-3)]"
        }`}
      >
        {state === "err" ? msg : "US attorneys. Invites go out in small batches."}
      </p>
    </form>
  );
}
