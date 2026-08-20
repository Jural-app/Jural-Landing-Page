import type { ReactNode } from "react";
import {
  LuCalendarClock,
  LuCheck,
  LuCreditCard,
  LuFileSearch,
  LuFileText,
  LuMessagesSquare,
  LuPenLine,
  LuShieldCheck,
  LuSignature,
} from "react-icons/lu";

/**
 * Coded screens for the Features section. Nothing here is a screenshot: every
 * pixel is markup, so it stays sharp at any size, carries no client data, and
 * never drifts out of date with a build of the app.
 *
 * All six run one fictional matter, Hale v. Northshore Logistics, so scrubbing
 * the list reads as one case moving through the firm rather than six unrelated
 * product shots.
 *
 * Light UI, because the app is light. Type is small on purpose: these read as
 * interface, not as body copy.
 */

/* ---------------------------------------------------------------- primitives */

function Screen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-[300px] overflow-hidden rounded-[18px] bg-white shadow-[0_18px_50px_-16px_rgba(14,21,36,0.4)] ring-1 ring-[rgba(14,21,36,0.08)] sm:w-[336px]">
      <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-2.5">
        <span className="h-5 w-5 shrink-0 rounded-full bg-[var(--color-brand)]/12" />
        <p className="truncate text-[11.5px] font-semibold text-[var(--color-ink)]">
          {title}
        </p>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

function Bubble({ me, children }: { me?: boolean; children: ReactNode }) {
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[86%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${
          me
            ? "bg-[var(--color-brand)] text-white"
            : "bg-[rgba(14,21,36,0.05)] text-[var(--color-ink-2)]"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function Card({
  icon,
  title,
  meta,
  children,
  tone = "plain",
}: {
  icon: ReactNode;
  title: string;
  meta?: string;
  children?: ReactNode;
  tone?: "plain" | "good";
}) {
  const good = tone === "good";
  return (
    <div
      className={`rounded-xl border p-3 ${
        good
          ? "border-emerald-200 bg-emerald-50/70"
          : "border-[var(--color-line)] bg-[rgba(14,21,36,0.02)]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={good ? "text-emerald-600" : "text-[var(--color-brand)]"}>
          {icon}
        </span>
        <p className="text-[11.5px] font-semibold text-[var(--color-ink)]">{title}</p>
        {meta ? (
          <p className="ml-auto text-[10.5px] text-[var(--color-ink-3)]">{meta}</p>
        ) : null}
      </div>
      {children ? <div className="mt-2.5">{children}</div> : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--color-line)] py-1.5 last:border-0">
      <p className="text-[11px] text-[var(--color-ink-3)]">{label}</p>
      <p className="text-[11px] font-medium text-[var(--color-ink)]">{value}</p>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-[var(--color-brand-wash)] px-2 py-[3px] text-[10px] font-medium text-[var(--color-brand-dark)]">
      {children}
    </span>
  );
}

const I = { size: 13, strokeWidth: 2.1 } as const;

/* ------------------------------------------------------------------ screens */

/** 1. Intake: an interview, not a form. */
export function IntakeUI() {
  return (
    <Screen title="New client intake">
      <div className="space-y-2">
        <Bubble>What happened, in your own words?</Bubble>
        <Bubble me>
          Northshore hasn&rsquo;t paid our consulting invoices since January.
        </Bubble>
        <Bubble>Roughly how much is outstanding, and over what period?</Bubble>
      </div>
      <div className="mt-3">
        <Card icon={<LuCheck {...I} />} title="Intake received" tone="good">
          <div className="flex flex-wrap gap-1.5">
            <Chip>12 key facts</Chip>
            <Chip>6 parties</Chip>
            <Chip>Auto-titled</Chip>
          </div>
        </Card>
      </div>
    </Screen>
  );
}

/** 2. The thread: say it, and it happens. */
export function ThreadUI() {
  return (
    <Screen title="Hale v. Northshore Logistics">
      <div className="space-y-2">
        <Bubble me>Remind me to chase the demand letter Friday</Bubble>
      </div>
      <div className="mt-3">
        <Card icon={<LuCalendarClock {...I} />} title="Reminder" meta="Draft">
          <Row label="What" value="Chase demand letter" />
          <Row label="When" value="Fri, 9:00 AM" />
          <button
            type="button"
            tabIndex={-1}
            className="mt-2.5 w-full rounded-lg bg-[var(--color-brand)] py-1.5 text-[11px] font-semibold text-white"
          >
            Approve
          </button>
        </Card>
      </div>
      <div className="mt-2 space-y-2">
        <Bubble>Scheduled. I&rsquo;ll check in Friday morning.</Bubble>
      </div>
    </Screen>
  );
}

/** 3. Documents: read on device, not just filed. */
export function DocumentsUI() {
  return (
    <Screen title="Documents">
      <Card icon={<LuFileSearch {...I} />} title="Engagement agreement.pdf" meta="Read">
        <div className="flex flex-wrap gap-1.5">
          <Chip>Agreement</Chip>
          <Chip>2 parties</Chip>
          <Chip>$18,750</Chip>
          <Chip>Nov 10, 2023</Chip>
        </div>
      </Card>
      <div className="mt-2.5">
        <Card icon={<LuFileText {...I} />} title="Invoice 1042.pdf" meta="Read">
          <Row label="Extracted total" value="$6,250.00" />
          <Row label="Due" value="Jan 31, 2024" />
        </Card>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[10px] text-[var(--color-ink-3)]">
        <LuShieldCheck size={11} strokeWidth={2.2} />
        Extracted on device
      </p>
    </Screen>
  );
}

/** 4. Drafting: known fields deterministic, narrative generated. */
export function DraftingUI() {
  return (
    <Screen title="Engagement letter">
      <div className="rounded-lg border border-[var(--color-line)] bg-white p-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-3)]">
          Hale Law Group
        </p>
        <div className="mt-2 space-y-1.5">
          <p className="text-[10.5px] text-[var(--color-ink-2)]">
            Dear <span className="rounded bg-[var(--color-brand-wash)] px-1 font-medium text-[var(--color-brand-dark)]">Alex Morgan</span>,
          </p>
          <p className="text-[10.5px] leading-relaxed text-[var(--color-ink-3)]">
            This letter confirms our engagement in connection with unpaid
            consulting fees owed by{" "}
            <span className="rounded bg-[var(--color-brand-wash)] px-1 font-medium text-[var(--color-brand-dark)]">
              Northshore Logistics
            </span>
            .
          </p>
          <span className="block h-1.5 w-full rounded-full bg-[rgba(14,21,36,0.07)]" />
          <span className="block h-1.5 w-[88%] rounded-full bg-[rgba(14,21,36,0.07)]" />
          <span className="block h-1.5 w-[72%] rounded-full bg-[rgba(14,21,36,0.07)]" />
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <Chip>Filled from the case</Chip>
        <p className="text-[10px] text-[var(--color-ink-3)]">3 fields</p>
      </div>
    </Screen>
  );
}

/** 5. Signature: in house, ESIGN and UETA. */
export function SignatureUI() {
  return (
    <Screen title="Signature request">
      <Card icon={<LuSignature {...I} />} title="Engagement letter" meta="Sent">
        <Row label="Signer" value="Alex Morgan" />
        <Row label="Identity" value="Email + passcode" />
        <Row label="Consent" value="ESIGN / UETA" />
      </Card>
      <div className="mt-2.5">
        <Card icon={<LuCheck {...I} />} title="Executed" tone="good">
          <Row label="Certificate" value="Issued" />
          <Row label="Seal" value="SHA-256" />
          <p className="mt-2 text-[10px] text-[var(--color-ink-3)]">
            Filed back into the case.
          </p>
        </Card>
      </div>
    </Screen>
  );
}

/** 6. Billing: you keep all of it. */
export function BillingUI() {
  return (
    <Screen title="Invoice 1043">
      <div className="rounded-xl border border-[var(--color-line)] p-3">
        <Row label="12.5 hrs at $320" value="$4,000.00" />
        <Row label="Filing fees" value="$410.00" />
        <Row label="Subtotal" value="$4,410.00" />
        <div className="mt-1.5 flex items-center justify-between border-t border-[var(--color-line)] pt-2">
          <p className="text-[11.5px] font-semibold text-[var(--color-ink)]">Total</p>
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-brand)]">
            $4,410.00
          </p>
        </div>
      </div>
      <div className="mt-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
        <div className="flex items-baseline justify-between">
          <p className="text-[11.5px] font-semibold text-[var(--color-ink)]">
            You receive
          </p>
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-emerald-700">
            $4,410.00
          </p>
        </div>
        <p className="mt-1 text-[10px] text-[var(--color-ink-3)]">
          Jural takes 0%. Paid out by Stripe to the firm.
        </p>
      </div>
    </Screen>
  );
}

/* -------------------------------------------------------------- list icons */

export const FEATURE_ICONS = {
  intake: LuMessagesSquare,
  thread: LuCalendarClock,
  documents: LuFileSearch,
  drafting: LuPenLine,
  signature: LuSignature,
  billing: LuCreditCard,
};
