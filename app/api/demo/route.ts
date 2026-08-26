import { NextResponse } from "next/server";

/**
 * Demo requests from the site-wide dialog.
 *
 * Delivery goes through Resend, which the platform already uses for
 * transactional mail. Set RESEND_API_KEY, DEMO_FROM and DEMO_TO to turn it on.
 *
 * ▸ If those are missing in production the route fails loudly with a 503 rather
 *   than returning a cheerful 200. A form that says "thanks, we'll be in touch"
 *   while dropping the lead on the floor is the worst possible failure here, so
 *   the visible error is deliberate: it surfaces the misconfiguration on the
 *   first request instead of costing weeks of leads. In development it just
 *   logs, so the dialog is usable without any secrets.
 */

const MAX = 200;
const MAX_NOTES = 2000;

const REQUIRED = ["firstName", "lastName", "email", "firm", "size"] as const;

type Payload = Record<(typeof REQUIRED)[number], string> & { notes: string };

function parse(body: unknown): Payload | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = body as Record<string, unknown>;

  const out = {} as Payload;

  for (const key of REQUIRED) {
    const value = raw[key];
    if (typeof value !== "string" || value.trim() === "" || value.length > MAX) return null;
    out[key] = value.trim();
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(out.email)) return null;

  // Optional, and the only free-text field, so it gets its own longer cap.
  const notes = raw.notes;
  if (notes !== undefined && (typeof notes !== "string" || notes.length > MAX_NOTES)) return null;
  out.notes = typeof notes === "string" ? notes.trim() : "";

  return out;
}

export async function POST(request: Request) {
  let lead: Payload | null;

  try {
    lead = parse(await request.json());
  } catch {
    lead = null;
  }

  if (!lead) {
    return NextResponse.json(
      { error: "Please check the details above and try again." },
      { status: 400 }
    );
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.DEMO_FROM;
  const to = process.env.DEMO_TO;

  if (!key || !from || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[demo] DROPPED a demo request: RESEND_API_KEY, DEMO_FROM or DEMO_TO is unset.",
        lead
      );
      return NextResponse.json(
        { error: "Demo requests are not set up yet. Please email hello@jural.app." },
        { status: 503 }
      );
    }

    console.warn("[demo] no mail credentials set, logging only:", lead);
    return NextResponse.json({ ok: true });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email,
      subject: `Demo request: ${lead.firm}`,
      text: [
        `Name:  ${lead.firstName} ${lead.lastName}`,
        `Email: ${lead.email}`,
        `Firm:  ${lead.firm}`,
        `Size:  ${lead.size}`,
        lead.notes ? `\nWants to fix:\n${lead.notes}` : "",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("[demo] Resend rejected the request:", response.status, await response.text());
    return NextResponse.json(
      { error: "We could not send that. Try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
