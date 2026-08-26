"use client";

import { useState } from "react";

type Status = "editing" | "sending" | "sent" | "error";

const SIZES = [
  "Solo practitioner",
  "2 to 5 lawyers",
  "6 to 20 lawyers",
  "More than 20 lawyers",
];

const FIELD =
  "h-11 w-full rounded-xl border border-[var(--color-line)] bg-white px-3.5 text-[15px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-3)]/70 focus:border-[var(--color-brand)]";

const LABEL = "text-[13px] font-medium text-[var(--color-ink-2)]";

export function DemoForm() {
  const [status, setStatus] = useState<Status>("editing");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "We could not send that. Try again in a moment.");
      }

      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send that. Try again in a moment.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-canvas)] p-8">
        <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
          Thanks, we&rsquo;ll be in touch.
        </h2>
        <p className="mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
          We&rsquo;ll email you within one business day to arrange a time. If anything is
          urgent in the meantime, reply straight to that email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className={LABEL}>First name</span>
          <input name="firstName" required autoComplete="given-name" className={FIELD} />
        </label>
        <label className="flex flex-col gap-1">
          <span className={LABEL}>Last name</span>
          <input name="lastName" required autoComplete="family-name" className={FIELD} />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className={LABEL}>Work email</span>
        <input name="email" type="email" required autoComplete="email" className={FIELD} />
      </label>

      <label className="flex flex-col gap-1">
        <span className={LABEL}>Firm name</span>
        <input name="firm" required autoComplete="organization" className={FIELD} />
      </label>

      <label className="flex flex-col gap-1">
        <span className={LABEL}>Firm size</span>
        <select name="size" required defaultValue="" className={`${FIELD} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 fill=%22none%22 stroke=%22%236b7688%22 stroke-width=%222.4%22 stroke-linecap=%22round%22><polyline points=%223,5 7,9 11,5%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10`}>
          <option value="" disabled>Select one</option>
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      {error && <p role="alert" className="text-[13.5px] text-[#b4232a]">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 h-12 rounded-full bg-[#1c2027] text-[15.5px] font-semibold text-white transition-colors hover:bg-black disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Book demo"}
      </button>

      <p className="text-center text-[13px] text-[var(--color-ink-3)]">
        By submitting this form you agree to Jural&rsquo;s{" "}
        <a href="/privacy" className="underline underline-offset-2 transition-colors hover:text-[var(--color-ink)]">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
