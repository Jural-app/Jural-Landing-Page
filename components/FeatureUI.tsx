/**
 * Coded UI for the features grid, rebuilt from the app's real screens in a
 * light variant. No device frames and no screenshots, this is the app's own
 * furniture as page DOM, cropped by its cell rather than shrunk to fit.
 *
 * One kit for all eight so they read as the same product: an iOS grouped-list
 * surface, uppercase section labels, white cells, inset separators.
 *
 * Every name, matter and figure below is fictional.
 */

const BLUE = "var(--color-blue)";

/* ------------------------------------------------------------------- kit */

function Screen({ children }: { children: React.ReactNode }) {
  // Fixed width so every fragment crops identically at its cell edge.
  return (
    <div className="w-full max-w-[392px] rounded-2xl bg-[color:var(--color-surface)] p-3.5">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-1.5 pb-2 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[color:var(--color-ink-4)]">
      {children}
    </p>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-[12px] bg-white">{children}</div>;
}

function Cell({
  children,
  last,
  inset = 12,
}: {
  children: React.ReactNode;
  last?: boolean;
  inset?: number;
}) {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5"
      style={
        last
          ? undefined
          : { boxShadow: `inset 0 -1px 0 0 rgba(14,17,22,0.08)`, marginLeft: 0, paddingLeft: 12 }
      }
    >
      {children}
      {inset === -1 && null}
    </div>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 8 14" className="size-[11px] shrink-0" aria-hidden="true">
      <path
        d="M1 1l6 6-6 6"
        fill="none"
        stroke="rgba(14,17,22,.28)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tinted rounded-square glyph, the way the app tints its list icons. */
function Glyph({ tint, d, fill }: { tint: string; d: string; fill?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-[26px] shrink-0 place-items-center rounded-[7px]"
      style={{ background: `color-mix(in oklab, ${tint} 15%, white)` }}
    >
      <svg viewBox="0 0 20 20" className="size-[13px]">
        <path
          d={d}
          fill={fill ? tint : "none"}
          stroke={tint}
          strokeWidth={fill ? 0 : 1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export const ICON = {
  clock: "M10 4.6v5.4l3.4 2M10 1.8a8.2 8.2 0 100 16.4 8.2 8.2 0 000-16.4z",
  bell: "M10 2.4a4.8 4.8 0 00-4.8 4.8c0 4-1.6 5.2-1.6 5.2h12.8s-1.6-1.2-1.6-5.2A4.8 4.8 0 0010 2.4zM8.4 15.4a1.9 1.9 0 003.2 0",
  doc: "M11.4 2.2H5.6a1.6 1.6 0 00-1.6 1.6v12.4a1.6 1.6 0 001.6 1.6h8.8a1.6 1.6 0 001.6-1.6V6.8zM11.4 2.2v4.6H16",
  person: "M16 17v-1.7a3.4 3.4 0 00-3.4-3.4H7.4A3.4 3.4 0 004 15.3V17M10 8.9a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8z",
  phone:
    "M17.6 14.3v2.2a1.5 1.5 0 01-1.6 1.5 14.6 14.6 0 01-6.4-2.3 14.4 14.4 0 01-4.4-4.4A14.6 14.6 0 013 4.9a1.5 1.5 0 011.5-1.6h2.2a1.5 1.5 0 011.5 1.3c.1.8.3 1.5.5 2.2a1.5 1.5 0 01-.3 1.6l-.9.9a11.6 11.6 0 004.4 4.4l.9-.9a1.5 1.5 0 011.6-.3c.7.3 1.4.4 2.2.5a1.5 1.5 0 011.3 1.5z",
  chat: "M17.4 12.2a1.6 1.6 0 01-1.6 1.6H6.2L3 17V4.4a1.6 1.6 0 011.6-1.6h11.2a1.6 1.6 0 011.6 1.6z",
  card: "M16.4 4.4H3.6A1.6 1.6 0 002 6v8a1.6 1.6 0 001.6 1.6h12.8A1.6 1.6 0 0018 14V6a1.6 1.6 0 00-1.6-1.6zM2 8.4h16",
  chart: "M10 17V8.4M4.4 17v-4.6M15.6 17V4.4",
  users:
    "M13.6 17v-1.6a3.2 3.2 0 00-3.2-3.2H5.6a3.2 3.2 0 00-3.2 3.2V17M8 9.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM17.6 17v-1.6a3.2 3.2 0 00-2.4-3.1M13.2 2.9a3.2 3.2 0 010 6.2",
  photo: "M15.6 2.8H4.4A1.6 1.6 0 002.8 4.4v11.2a1.6 1.6 0 001.6 1.6h11.2a1.6 1.6 0 001.6-1.6V4.4a1.6 1.6 0 00-1.6-1.6zM7.2 8a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM17.2 12.4L13.2 8.4 4.4 17.2",
};

/**
 * Coded portrait avatars. Drawn rather than photographed: nobody depicted is a
 * real person, which keeps the fixture data as fictional as the case names.
 */
const FACES = [
  { bg: "#dfe7f2", skin: "#e0ab86", shade: "#cf9b78", hair: "#3b2a22", cloth: "#3f5f86" },
  { bg: "#f0e4e4", skin: "#8d5a3f", shade: "#7d4e35", hair: "#241a15", cloth: "#7b4a63" },
  { bg: "#e3ecdf", skin: "#f0c9a8", shade: "#dfb694", hair: "#8a6a3a", cloth: "#4a6b58" },
  { bg: "#e9e3f2", skin: "#c98f68", shade: "#b87f5b", hair: "#4a3328", cloth: "#5a5183" },
];

const HAIR = [
  // cropped
  "M11.4 17.6c0-6 3.8-9.4 8.6-9.4s8.6 3.4 8.6 9.4c0-3.4-2.4-5.2-8.6-5.2s-8.6 1.8-8.6 5.2z",
  // to the jaw
  "M10.8 26V17c0-5.6 4-9.2 9.2-9.2s9.2 3.6 9.2 9.2v9c-1.2 0-2.2-1-2.2-2.4V17c0-2.6-1.6-3.8-7-3.8s-7 1.2-7 3.8v6.6c0 1.4-1 2.4-2.2 2.4z",
  // swept
  "M11.4 18.2c-.6-6.2 3.4-10.4 8.8-10.4 5 0 8.6 3.2 8.6 8.6-2 0-3.2-1.2-4-2.8-1.8 2.2-4.6 3.2-8.6 3.2-2.6 0-3.8.6-4.8 1.4z",
  // tied back
  "M11.4 17.6c0-6 3.8-9.4 8.6-9.4s8.6 3.4 8.6 9.4c0-3.4-2.4-5.2-8.6-5.2s-8.6 1.8-8.6 5.2zM28.4 15.4c2 .4 3.2 1.8 3.2 3.6s-1.4 3-3.2 3z",
];

function Avatar({ i = 0 }: { i?: number }) {
  const f = FACES[i % FACES.length];
  return (
    <span
      aria-hidden="true"
      className="size-[30px] shrink-0 overflow-hidden rounded-full"
      style={{ background: f.bg }}
    >
      <svg viewBox="0 0 40 40" className="size-full">
        <path d="M4.5 40c0-8.4 7-13 15.5-13s15.5 4.6 15.5 13z" fill={f.cloth} />
        <rect x="16.2" y="21" width="7.6" height="9" rx="3.8" fill={f.shade} />
        <circle cx="20" cy="17.4" r="8.2" fill={f.skin} />
        <path d={HAIR[i % HAIR.length]} fill={f.hair} />
      </svg>
    </span>
  );
}

function Pill({ children, tint }: { children: React.ReactNode; tint: string }) {
  return (
    <span
      className="shrink-0 rounded-full px-2 py-[3px] text-[10.5px] font-medium"
      style={{ background: `color-mix(in oklab, ${tint} 13%, white)`, color: tint }}
    >
      {children}
    </span>
  );
}

function Action({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block rounded-[10px] py-2.5 text-center text-[13px] font-semibold text-white"
      style={{ background: BLUE }}
    >
      {children}
    </span>
  );
}

const T = "text-[13.5px] font-medium";
const S = "text-[11.5px] text-[color:var(--color-ink-4)]";

/* ---------------------------------------------------------------- 1 cases */

export function CasesUI() {
  const rows = [
    { t: "Alvarez v. Northline", s: "2026-0117 · Ada Chen", stage: "Pleadings", tint: "#8b5cf6" },
    { t: "Chen, Ada", s: "2026-0121 · Commercial", stage: "Intake", tint: "#7d8794" },
    { t: "Draper Holdings", s: "2026-0104 · Corporate", stage: "Filed", tint: "#0c6fc4" },
  ];
  return (
    <Screen>
      <div className="mb-2.5 flex items-center gap-2 rounded-[10px] bg-white px-3 py-2">
        <svg viewBox="0 0 20 20" className="size-[13px] shrink-0" aria-hidden="true">
          <path
            d="M9 15.4A6.4 6.4 0 109 2.6a6.4 6.4 0 000 12.8zM17.4 17.4l-3.9-3.9"
            fill="none"
            stroke="rgba(14,17,22,.35)"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[13px] text-[color:var(--color-ink-4)]">Search</span>
      </div>

      <div className="mb-2.5 flex gap-1.5">
        {["All", "Intake", "Investigation"].map((f, i) => (
          <span
            key={f}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
            style={
              i === 0
                ? { background: BLUE, color: "#fff" }
                : { background: "#fff", color: "var(--color-ink-2)" }
            }
          >
            {i > 0 && (
              <span
                className="size-1.5 rounded-full"
                style={{ background: i === 1 ? "#7d8794" : "#8b5cf6" }}
              />
            )}
            {f}
          </span>
        ))}
      </div>

      <Group>
        {rows.map((r, i) => (
          <Cell key={r.t} last={i === rows.length - 1}>
            <Avatar i={i} />
            <span className="min-w-0 flex-1">
              <span className={`block truncate ${T}`}>{r.t}</span>
              <span className={`num block truncate ${S}`}>{r.s}</span>
            </span>
            <Pill tint={r.tint}>{r.stage}</Pill>
            <Chevron />
          </Cell>
        ))}
      </Group>
    </Screen>
  );
}

/* ------------------------------------------------------------ 2 case file */

export function CaseFileUI() {
  return (
    <Screen>
      <Label>Reminders</Label>
      <Group>
        <Cell last>
          <Glyph tint="#d4a017" d={ICON.bell} />
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${T}`}>Directions hearing</span>
            <span className={`block truncate ${S}`}>4 Mar · 10:00 AM</span>
          </span>
          <Chevron />
        </Cell>
      </Group>

      <div className="h-3.5" />
      <Label>Time logs</Label>
      <Group>
        <Cell>
          <Glyph tint="#1a9e5f" d={ICON.clock} />
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${T}`}>Court session</span>
            <span className={`block truncate ${S}`}>1h · Yesterday</span>
          </span>
          <span className="shrink-0 text-[15px] leading-none text-[color:var(--color-ink-4)]">···</span>
        </Cell>
        <Cell last>
          <Glyph tint="#1a9e5f" d={ICON.clock} />
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${T}`}>Call with client</span>
            <span className={`block truncate ${S}`}>0.7h · 3 Feb</span>
          </span>
          <span className="shrink-0 text-[15px] leading-none text-[color:var(--color-ink-4)]">···</span>
        </Cell>
      </Group>

      <div className="h-3.5" />
      <Label>Media</Label>
      <Group>
        <Cell last>
          <Glyph tint="#0c6fc4" d={ICON.photo} />
          <span className={`min-w-0 flex-1 truncate ${T}`}>Filed copy · stamped</span>
          <Chevron />
        </Cell>
      </Group>
    </Screen>
  );
}

/* -------------------------------------------------------------- 3 clients */

export function ClientsUI() {
  return (
    <Screen>
      <Group>
        <Cell last>
          <Avatar i={1} />
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${T}`}>Ada Chen</span>
            <span className={`block truncate ${S}`}>Client · 2 matters</span>
          </span>
        </Cell>
      </Group>

      <div className="h-2.5" />
      <Group>
        <Cell>
          <Glyph tint="#1a9e5f" d={ICON.phone} fill />
          <span className="flex-1 text-[13.5px] font-medium" style={{ color: BLUE }}>
            Call
          </span>
        </Cell>
        <Cell last>
          <Glyph tint="#0c6fc4" d={ICON.chat} />
          <span className="flex-1 text-[13.5px] font-medium" style={{ color: BLUE }}>
            Message
          </span>
        </Cell>
      </Group>

      <div className="h-3.5" />
      <Label>Add a client</Label>
      <Group>
        <Cell>
          <Glyph tint="#0c6fc4" d={ICON.person} />
          <span className="flex-1 text-[13.5px] font-medium" style={{ color: BLUE }}>
            Select from Contacts
          </span>
        </Cell>
        <Cell last>
          <Glyph tint="#0c6fc4" d={ICON.person} />
          <span className="flex-1 text-[13.5px] font-medium" style={{ color: BLUE }}>
            New Contact
          </span>
        </Cell>
      </Group>
    </Screen>
  );
}

/* --------------------------------------------------------- 4 time & bills */

export function BillingUI() {
  const rows = [
    { t: "Call with client", s: "0.7 h · 3 Feb", v: "$238.00" },
    { t: "Review of disclosure", s: "2.1 h · 5 Feb", v: "$714.00" },
    { t: "Draft demand letter", s: "1.4 h · 11 Feb", v: "$476.00" },
  ];
  return (
    <Screen>
      <Label>Unbilled · February</Label>
      <Group>
        {rows.map((r) => (
          <Cell key={r.t}>
            <Glyph tint="#1a9e5f" d={ICON.clock} />
            <span className="min-w-0 flex-1">
              <span className={`block truncate ${T}`}>{r.t}</span>
              <span className={`num block truncate ${S}`}>{r.s}</span>
            </span>
            <span className="num shrink-0 text-[13px] font-semibold">{r.v}</span>
          </Cell>
        ))}
        <Cell last>
          <span className="flex-1 text-[13.5px] font-semibold">Total · 18 entries</span>
          <span className="num shrink-0 text-[13.5px] font-semibold">$4,626.00</span>
        </Cell>
      </Group>

      <div className="mt-2.5">
        <Action>Create &amp; send invoice</Action>
      </div>

      <div className="mt-3.5 flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5">
        <Glyph tint="#0c6fc4" d={ICON.card} />
        <span className="min-w-0 flex-1">
          <span className={`block truncate ${T}`}>Payments</span>
          <span className={`block truncate ${S}`}>Paid through Stripe</span>
        </span>
        <Pill tint="#1a9e5f">Connected</Pill>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------ 5 documents */

export function DocumentsUI() {
  return (
    <Screen>
      <Label>Documents</Label>
      <Group>
        <Cell>
          <Glyph tint="#0c6fc4" d={ICON.doc} />
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${T}`}>Engagement letter.pdf</span>
            <span className={`block truncate ${S}`}>Read · 14 Jan</span>
          </span>
          <Chevron />
        </Cell>
        <Cell>
          <Glyph tint="#0c6fc4" d={ICON.doc} />
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${T}`}>Invoice 12 Nov.pdf</span>
            <span className={`block truncate ${S}`}>Read · 3 Feb</span>
          </span>
          <Chevron />
        </Cell>
        <Cell last>
          <Glyph tint="#c2409a" d={ICON.doc} />
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${T}`}>Demand for payment</span>
            <span className={`block truncate ${S}`}>Drafted from the file</span>
          </span>
          <Pill tint="#c2409a">Out for signature</Pill>
        </Cell>
      </Group>

      <div className="mt-3.5 rounded-[12px] bg-white p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[color:var(--color-ink-4)]">
          Draft
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-[color:var(--color-ink-2)]">
          Further to our letter of 12 November, our client&rsquo;s invoice
          remains unpaid in the sum of <span className="num font-medium">$4,626.00</span>…
        </p>
      </div>
    </Screen>
  );
}

/* ------------------------------------------------------------ 6 deadlines */

export function DeadlinesUI() {
  return (
    <Screen>
      <div className="rounded-[12px] bg-white p-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
          style={{ background: "color-mix(in oklab, #d4a017 13%, white)", color: "#8a6a0b" }}
        >
          <svg viewBox="0 0 20 20" className="size-[11px]" aria-hidden="true">
            <path d={ICON.bell} fill="none" stroke="#8a6a0b" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          Reminder
        </span>

        <div className="mt-3 space-y-2.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className={S}>What</span>
            <span className="text-[13.5px] font-semibold">Response to defence</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className={S}>Date</span>
            <span className="num rounded-[7px] bg-[color:var(--color-surface-fill)] px-2.5 py-1 text-[13px] font-medium">
              24 Feb 2026
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className={S}>Time</span>
            <span className="num rounded-[7px] bg-[color:var(--color-surface-fill)] px-2.5 py-1 text-[13px] font-medium">
              9:00 AM
            </span>
          </div>
        </div>

        <p className="mt-3 text-[11.5px] leading-relaxed text-[color:var(--color-ink-4)]">
          21 days from service on 3 Feb, counted from the date in this file.
        </p>

        <div className="mt-3">
          <Action>Approve</Action>
        </div>
      </div>

      <div className="h-3.5" />
      <Label>Upcoming</Label>
      <Group>
        <Cell>
          <Glyph tint="#d4a017" d={ICON.bell} />
          <span className={`min-w-0 flex-1 truncate ${T}`}>Directions hearing</span>
          <span className={`num shrink-0 ${S}`}>4 Mar</span>
        </Cell>
        <Cell last>
          <Glyph tint="#c2409a" d={ICON.bell} />
          <span className={`min-w-0 flex-1 truncate ${T}`}>Limitation date</span>
          <span className={`num shrink-0 ${S}`}>14 Nov 28</span>
        </Cell>
      </Group>
    </Screen>
  );
}

/* -------------------------------------------------------------- 7 reports */

export function ReportsUI() {
  const rows = [
    { t: "Hours worked", s: "This month", v: "12.4" },
    { t: "Unbilled work", s: "18 entries", v: "$4,626.00" },
    { t: "Outstanding", s: "3 invoices", v: "$1,980.00" },
  ];
  return (
    <Screen>
      <Label>February</Label>
      <Group>
        {rows.map((r, i) => (
          <Cell key={r.t} last={i === rows.length - 1}>
            <Glyph tint="#0c6fc4" d={ICON.chart} />
            <span className="min-w-0 flex-1">
              <span className={`block truncate ${T}`}>{r.t}</span>
              <span className={`block truncate ${S}`}>{r.s}</span>
            </span>
            <span className="num shrink-0 text-[13.5px] font-semibold">{r.v}</span>
          </Cell>
        ))}
      </Group>

      <div className="mt-3.5 rounded-[12px] bg-white p-3">
        <p className={S}>Billed vs unbilled</p>
        <div className="mt-2.5 flex h-[46px] items-end gap-1.5">
          {[38, 52, 30, 64, 44, 72, 58, 80].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-[3px]"
              style={{
                height: `${h}%`,
                background: i > 5 ? "color-mix(in oklab, #0c6fc4 25%, white)" : BLUE,
              }}
            />
          ))}
        </div>
      </div>
    </Screen>
  );
}

/* ----------------------------------------------------------------- 8 team */

export function TeamUI() {
  const roles = [
    { t: "Attorney", s: "Full case & document work", on: true },
    { t: "Paralegal", s: "Create & edit cases and documents", on: false },
    { t: "Viewer", s: "Read-only access", on: false },
  ];
  return (
    <Screen>
      <Label>Choose a role</Label>
      <div className="space-y-2">
        {roles.map((r) => (
          <div key={r.t} className="flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5">
            <span className="min-w-0 flex-1">
              <span className={`block truncate ${T}`}>{r.t}</span>
              <span className={`block truncate ${S}`}>{r.s}</span>
            </span>
            <span
              className="grid size-[17px] shrink-0 place-items-center rounded-full border-[1.5px]"
              style={{ borderColor: r.on ? BLUE : "rgba(14,17,22,.22)" }}
            >
              {r.on && <span className="size-[9px] rounded-full" style={{ background: BLUE }} />}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2.5">
        <Action>Create invite link</Action>
      </div>

      <div className="mt-3.5 flex items-center gap-3 rounded-[12px] bg-white px-3 py-2.5">
        <Glyph tint="#0c6fc4" d={ICON.users} />
        <span className="min-w-0 flex-1">
          <span className={`block truncate ${T}`}>Alvarez v. Northline</span>
          <span className={`block truncate ${S}`}>Shared with 2 people</span>
        </span>
        <Pill tint="#7d8794">Private</Pill>
      </div>
    </Screen>
  );
}
