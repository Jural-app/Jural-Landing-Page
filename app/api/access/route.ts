import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }
  if (typeof email !== "string") {
    return NextResponse.json({ error: "Email required." }, { status: 400 });
  }
  const v = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || v.length > 254) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  // ── Persist here (Resend / Airtable / Supabase / …) ──
  console.log(`[access] ${v}`);

  return NextResponse.json({ ok: true });
}
