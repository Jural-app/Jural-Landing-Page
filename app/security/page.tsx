import type { Metadata } from "next";
import { FaApple } from "react-icons/fa";
import { SiAuth0, SiSignal, SiStripe } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { Header } from "@/components/Header";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { CipherPanel } from "@/components/CipherPanel";
import { DataFlowTabs } from "@/components/DataFlowTabs";

export const metadata: Metadata = {
  title: "Security | Jural",
  description:
    "Jural keeps solo attorneys' and small firms' client work private by architecture: on-device AI, Signal-protocol end-to-end encryption, and a zero-knowledge relay that stores only ciphertext.",
};

/**
 * The security page argues one thing: privilege physically cannot leak,
 * because the readable copy of the caseload never exists on our side. Same
 * section system as the product pages: eyebrow, display heading, lede, one
 * drawn product panel per section. The only motion is the ciphertext panel
 * sealing itself once; on a page like this, calm is the credibility.
 */

/* --------------------------------------------------- layer illustrations */
/*
 * Large line-art drawings in the manner of enterprise trust pages: thin ink
 * strokes, dashed construction accents, one brand-blue element per drawing
 * carrying the point. Each sits in a 220x150 frame, drawn not iconified.
 */

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.2 } as const;
const DASH = { ...STROKE, strokeDasharray: "3 4" } as const;
const BRAND = { fill: "none", stroke: "var(--color-brand)", strokeWidth: 1.2 } as const;

function ArtDocuments() {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" className="h-full w-full">
      {/* the sheet, folded corner */}
      <path {...STROKE} d="M82 26h40l16 16v82H82z" strokeLinejoin="round" />
      <path {...STROKE} d="M122 26v16h16" strokeLinejoin="round" />
      {/* text lines; the highlighted one is what the index found */}
      <line {...STROKE} x1="92" y1="58" x2="128" y2="58" />
      <line {...BRAND} x1="92" y1="70" x2="120" y2="70" strokeWidth="3" opacity="0.35" />
      <line {...STROKE} x1="92" y1="82" x2="128" y2="82" />
      <line {...STROKE} x1="92" y1="94" x2="112" y2="94" />
      {/* dashed scan brackets: read here, on the device */}
      <path {...DASH} d="M64 40v-22h22" />
      <path {...DASH} d="M156 110v22h-22" />
    </svg>
  );
}

function ArtOnDeviceAI() {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" className="h-full w-full">
      {/* the phone */}
      <rect {...STROKE} x="84" y="18" width="52" height="114" rx="10" />
      <line {...STROKE} x1="102" y1="26" x2="118" y2="26" />
      {/* the model, resident inside */}
      <path
        {...BRAND}
        d="M110 55l3.4 8.6 8.6 3.4-8.6 3.4-3.4 8.6-3.4-8.6-8.6-3.4 8.6-3.4z"
        strokeLinejoin="round"
      />
      {/* thought radius, ending at the glass */}
      <circle {...DASH} cx="110" cy="67" r="16" />
      <circle {...DASH} cx="110" cy="67" r="24" opacity="0.5" />
    </svg>
  );
}

function ArtCollab() {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" className="h-full w-full">
      {/* two speakers, one thread */}
      <path {...STROKE} d="M42 40h60a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10H70l-12 12V80H42a10 10 0 0 1-10-10V50a10 10 0 0 1 10-10z" strokeLinejoin="round" />
      <line {...STROKE} x1="44" y1="54" x2="98" y2="54" opacity="0.55" />
      <line {...STROKE} x1="44" y1="64" x2="84" y2="64" opacity="0.55" />
      <path {...STROKE} d="M132 72h46a10 10 0 0 1 10 10v18a10 10 0 0 1-10 10h-6v11l-11-11h-29a10 10 0 0 1-10-10V82a10 10 0 0 1 10-10z" strokeLinejoin="round" opacity="0.8" />
      <line {...STROKE} x1="134" y1="86" x2="174" y2="86" opacity="0.45" />
      <line {...STROKE} x1="134" y1="96" x2="162" y2="96" opacity="0.45" />
      {/* the lock between them */}
      <rect {...BRAND} x="119" y="42" width="22" height="17" rx="3" />
      <path {...BRAND} d="M124 42v-6a6 6 0 0 1 12 0v6" />
    </svg>
  );
}

function ArtSync() {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" className="h-full w-full">
      {/* iPhone and Mac */}
      <rect {...STROKE} x="34" y="52" width="34" height="62" rx="7" />
      <line {...STROKE} x1="45" y1="59" x2="57" y2="59" />
      <rect {...STROKE} x="138" y="52" width="58" height="40" rx="4" />
      <line {...STROKE} x1="128" y1="102" x2="206" y2="102" strokeLinecap="round" />
      <line {...STROKE} x1="167" y1="92" x2="167" y2="102" />
      {/* ciphertext crossing, both ways */}
      <path {...DASH} d="M76 62h52" />
      <path {...STROKE} d="M122 56l8 6-8 6" strokeLinecap="round" strokeLinejoin="round" />
      <path {...DASH} d="M130 96H78" />
      <path {...STROKE} d="M84 90l-8 6 8 6" strokeLinecap="round" strokeLinejoin="round" />
      {/* the relay in the middle knows only that something passed */}
      <rect {...BRAND} x="96" y="77" width="14" height="11" rx="2.5" />
      <path {...BRAND} d="M99 77v-3a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ArtAppLock() {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" className="h-full w-full">
      {/* Face ID plate */}
      <path {...STROKE} d="M78 34h-12a8 8 0 0 0-8 8v12" strokeLinecap="round" />
      <path {...STROKE} d="M142 34h12a8 8 0 0 1 8 8v12" strokeLinecap="round" />
      <path {...STROKE} d="M78 108h-12a8 8 0 0 1-8-8V88" strokeLinecap="round" />
      <path {...STROKE} d="M142 108h12a8 8 0 0 0 8-8V88" strokeLinecap="round" />
      <line {...STROKE} x1="96" y1="60" x2="96" y2="68" strokeLinecap="round" />
      <line {...STROKE} x1="124" y1="60" x2="124" y2="68" strokeLinecap="round" />
      <path {...STROKE} d="M110 62v14h-6" strokeLinecap="round" strokeLinejoin="round" />
      <path {...STROKE} d="M96 86c4 5 9 7 14 7s10-2 14-7" strokeLinecap="round" />
      {/* PIN row, one digit in */}
      <circle {...BRAND} cx="86" cy="126" r="4" fill="var(--color-brand)" />
      <circle {...STROKE} cx="102" cy="126" r="4" />
      <circle {...STROKE} cx="118" cy="126" r="4" />
      <circle {...STROKE} cx="134" cy="126" r="4" />
    </svg>
  );
}

function ArtSignIn() {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" className="h-full w-full">
      {/* the key */}
      <circle {...BRAND} cx="58" cy="75" r="15" />
      <circle {...BRAND} cx="58" cy="75" r="5.5" />
      <path {...BRAND} d="M73 75h55M116 75v9" strokeLinecap="round" strokeLinejoin="round" />
      {/* the scope it opens, and only that */}
      <rect {...STROKE} x="132" y="60" width="56" height="30" rx="6" />
      <line {...STROKE} x1="142" y1="75" x2="170" y2="75" opacity="0.55" />
      <rect {...DASH} x="132" y="18" width="56" height="26" rx="6" opacity="0.6" />
      <rect {...DASH} x="132" y="106" width="56" height="26" rx="6" opacity="0.6" />
    </svg>
  );
}

/* -------------------------------------------------------------- section data */

const LAYERS: {
  layer: string;
  copy: string;
  Art: () => React.ReactElement;
}[] = [
  {
    layer: "Client documents",
    copy: "Read and indexed on the device. Text extraction, OCR and the search index all stay local, and the raw file never leaves unencrypted.",
    Art: ArtDocuments,
  },
  {
    layer: "Case knowledge & AI",
    copy: "On-device by default. When the cloud model takes a harder drafting step it receives extracted text only, retains nothing, and never trains on your work.",
    Art: ArtOnDeviceAI,
  },
  {
    layer: "Collaboration chat",
    copy: "Case chat with your team runs over Signal-protocol group encryption. The server relays ciphertext and stores no message content.",
    Art: ArtCollab,
  },
  {
    layer: "Device-to-device sync",
    copy: "Your iPhone and Mac keep each other current over encrypted transport. The backend is a zero-knowledge relay: it forwards what it cannot read.",
    Art: ArtSync,
  },
  {
    layer: "App access",
    copy: "The app locks behind Face ID and a PIN before any case data loads, so a lost or borrowed device shows nothing at all.",
    Art: ArtAppLock,
  },
  {
    layer: "Sign-in",
    copy: "Authentication runs on Auth0 with API-scoped tokens, so a session carries exactly the access it needs and nothing more.",
    Art: ArtSignIn,
  },
];

const QA: { q: string; a: string[] }[] = [
  {
    q: "Can Jural employees read my cases?",
    a: [
      "No. The server holds ciphertext it has no keys for, so there is nothing on our side to read. That holds for anyone with access to our systems, not just as a matter of policy but as a property of the architecture.",
    ],
  },
  {
    q: "Is my client data used to train AI models?",
    a: [
      "No. The models that read your documents run on your device. Where the cloud model helps with a harder drafting step, it receives extracted text for that request only, retains nothing afterwards, and nothing is ever used for training.",
    ],
  },
  {
    q: "What does the cloud model actually see?",
    a: [
      "Only the extracted text needed for the step you asked for, sent under a strict schema, with no retention after the response. It never receives your raw files and never has access to the broader caseload.",
    ],
  },
  {
    q: "What happens to my data if I leave?",
    a: [
      "Your cases live on your devices, not on our servers. Leaving Jural does not involve requesting your files back, because a readable copy never existed on our side.",
    ],
  },
  {
    q: "What if I lose my phone?",
    a: [
      "The app is locked behind Face ID and a PIN before any case data loads. Your other devices remain complete copies of your work, and the session on the lost device can be signed out remotely.",
    ],
  },
];

/* --------------------------------------------------------------------- page */

export default function SecurityPage() {
  return (
    <main>
      <Header />

      {/* ------------------------------------------------------------ hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-24">
          <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
            Security
          </div>

          <h1 className="mx-auto mt-5 max-w-[16ch] text-[clamp(2.3rem,1.2rem+3.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-ink)] [font-family:var(--font-display)]">
            Private by architecture, not by policy.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[clamp(1.02rem,0.97rem+0.4vw,1.18rem)] leading-relaxed text-[var(--color-ink-2)]">
            Your cases live on your devices. The AI reads them there. What
            travels between your iPhone and your Mac is end-to-end encrypted,
            so our server holds nothing it can read.
          </p>

          <a
            href="/demo"
            className="group mt-9 inline-flex items-center rounded-full bg-[var(--color-brand)] text-[14px] font-medium text-white transition-colors hover:bg-[var(--color-brand-deep)]"
          >
            <span className="py-3 pl-5 pr-4">Get 14 Days Demo</span>
            <span aria-hidden="true" className="h-5 w-px bg-white/30" />
            <span aria-hidden="true" className="px-4 transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </div>
      </section>

      {/* --------------------------------------- promise vs architecture */}
      <section aria-label="A promise versus an architecture" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-12">
          {/* one soft panel, two large blocks: the page's whole argument */}
          <div
            className="rounded-[24px] px-7 py-12 sm:px-12 sm:py-16 lg:px-16"
            style={{
              background:
                "linear-gradient(115deg, #faf7f1 0%, #f6f6f4 45%, var(--color-brand-wash) 100%)",
            }}
          >
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-3)]">
              Our approach
            </div>

            <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                {/* a policy document */}
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-[var(--color-ink-2)]"
                >
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 3 14 8 19 8" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="13" y2="17" />
                </svg>
                <h2 className="mt-6 text-[clamp(1.55rem,1rem+1.7vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
                  The industry standard
                </h2>
                <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
                  Legal software typically stores every matter in readable
                  form on the vendor&rsquo;s servers, protected by policy:
                  access controls, audits, and a commitment not to look.
                  Client confidentiality depends on that commitment holding.
                </p>
              </div>

              <div>
                {/* layers of the architecture */}
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-[var(--color-brand)]"
                >
                  <polygon points="12 2 22 8.5 12 15 2 8.5" />
                  <polyline points="2 13.5 12 20 22 13.5" />
                </svg>
                <h2 className="mt-6 text-[clamp(1.55rem,1rem+1.7vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)] [font-family:var(--font-display)]">
                  The Jural architecture
                </h2>
                <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
                  Jural is designed so that commitment is never required.
                  Cases are processed on your devices, and everything that
                  syncs between them is end-to-end encrypted. No readable
                  copy of your caseload exists outside your firm.
                </p>
                <a
                  href="#server-sees"
                  className="group mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-[var(--color-ink)] underline underline-offset-4"
                >
                  See what our server sees
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ what the server sees */}
      <section
        id="server-sees"
        aria-label="What our server sees"
        className="scroll-mt-28 bg-[var(--color-canvas)]"
      >
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              In practice
            </div>
            <h2 className="mt-4 text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              What our server sees.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              The same case note, as it exists on your iPhone and as it
              exists on Jural&rsquo;s servers. Everything is encrypted before
              it leaves your device.
            </p>
          </div>

          <CipherPanel />
        </div>
      </section>

      {/* ------------------------------------------------ your data in motion */}
      <section aria-label="Your data in motion" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mb-12 text-center">
            <h2 className="mx-auto max-w-[18ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Your data in motion.
            </h2>
          </div>

          <DataFlowTabs />
        </div>
      </section>

      {/* ------------------------------------------------- layer by layer */}
      <section aria-label="Layer by layer" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
              Layer by layer
            </div>
            <h2 className="mt-4 max-w-[18ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Security at every layer.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-[var(--color-ink-2)]">
              One principle runs through the whole product: client work stays
              on your devices, and whatever leaves them is encrypted.
            </p>
          </div>

          {/* hairline-divided grid, illustration above title and copy */}
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] bg-[var(--color-line)] ring-1 ring-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {LAYERS.map(({ layer, copy, Art }) => (
              <div key={layer} className="bg-white p-8 sm:p-9">
                <div className="mx-auto h-[150px] max-w-[240px] text-[var(--color-ink-3)]/80">
                  <Art />
                </div>
                <h3 className="mt-7 text-[16.5px] font-semibold tracking-[-0.015em] text-[var(--color-ink)]">
                  {layer}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-2)]">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ compliance */}
      {/* The deep band the Mac page ends on, doing the same job here: weight.
          Three standards stated flat; the trust center carries the detail. */}
      <section aria-label="Standards and compliance" className="bg-[var(--color-navy-deep)]">
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <div className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/50">
              Compliance
            </div>
            <h2 className="mt-4 max-w-[18ch] text-[clamp(1.8rem,1.1rem+2.2vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white [font-family:var(--font-display)]">
              Built to the standards that matter.
            </h2>
          </div>

          <div className="mt-12 grid gap-10 border-t border-white/15 pt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            <div>
              {/* certificate seal */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-white/80"
              >
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
                <polyline points="14 3 14 8 19 8" />
                <line x1="9" y1="12" x2="14" y2="12" />
                <circle cx="17" cy="17" r="3.5" />
                <path d="M15.6 17.2l1 1 1.8-2" />
              </svg>
              <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-white">
                ESIGN &amp; UETA
              </p>
              <p className="mt-2.5 max-w-[32ch] text-[14px] leading-relaxed text-white/70">
                E-signatures compliant with US federal and state
                electronic-signature law.
              </p>
            </div>
            <div>
              {/* audit seal */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-white/80"
              >
                <circle cx="12" cy="9.5" r="6.5" />
                <path d="M9.5 9.4l1.8 1.8 3.2-3.5" />
                <path d="M8.5 15.2L7 21l5-2.5L17 21l-1.5-5.8" />
              </svg>
              <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-white">
                SOC 2
              </p>
              <p className="mt-2.5 max-w-[32ch] text-[14px] leading-relaxed text-white/70">
                Security program aligned to the AICPA Trust Services
                Criteria.
              </p>
            </div>
            <div>
              {/* lock */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-white/80"
              >
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                <circle cx="12" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
              <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-white">
                Signal protocol
              </p>
              <p className="mt-2.5 max-w-[32ch] text-[14px] leading-relaxed text-white/70">
                End-to-end encryption across device sync and case
                collaboration.
              </p>
            </div>
            <div>
              {/* shield check */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-white/80"
              >
                <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z" />
                <path d="M9 11.5l2.2 2.2L15.5 9" />
              </svg>
              <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-white">
                Jural Trust Center
              </p>
              <p className="mt-2.5 max-w-[32ch] text-[14px] leading-relaxed text-white/70">
                Security documentation and practices, published for review.
              </p>
              <a
                href="https://trust.jural.app"
                className="group mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-white underline-offset-4 hover:underline"
              >
                trust.jural.app
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* the platforms under the architecture */}
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-white/15 pt-9">
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Built on
            </span>
            <span className="flex items-center gap-2.5 text-white/60">
              <FaApple size={21} aria-hidden="true" />
              <span className="text-[13.5px] font-medium">Apple</span>
            </span>
            <span className="flex items-center gap-2.5 text-white/60">
              <VscAzure size={19} aria-hidden="true" />
              <span className="text-[13.5px] font-medium">Microsoft Azure</span>
            </span>
            <span className="flex items-center gap-2.5 text-white/60">
              <SiStripe size={18} aria-hidden="true" />
              <span className="text-[13.5px] font-medium">Stripe</span>
            </span>
            <span className="flex items-center gap-2.5 text-white/60">
              <SiAuth0 size={18} aria-hidden="true" />
              <span className="text-[13.5px] font-medium">Auth0</span>
            </span>
            <span className="flex items-center gap-2.5 text-white/60">
              <SiSignal size={18} aria-hidden="true" />
              <span className="text-[13.5px] font-medium">Signal protocol</span>
            </span>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <section aria-label="Security questions" className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:pb-32 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-20">
            <h2 className="max-w-[11ch] text-[clamp(1.8rem,1.1rem+2.6vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)] [font-family:var(--font-display)]">
              Frequently asked questions
            </h2>

            <div className="min-w-0 border-t border-[var(--color-line)]">
              {QA.map((item, i) => (
                <details
                  key={item.q}
                  name="security-faq"
                  open={i === 0}
                  className="group border-b border-[var(--color-line)]"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="max-w-[46ch] text-[17.5px] font-medium leading-snug tracking-[-0.015em] text-[var(--color-ink)] transition-colors group-open:text-[var(--color-brand)]">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative mt-1.5 size-[15px] shrink-0 text-[var(--color-ink-3)] transition-colors group-open:text-[var(--color-brand)]"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <div className="max-w-[70ch] space-y-4 pb-8 pr-8 text-[15.5px] leading-relaxed text-[var(--color-ink-3)]">
                    {item.a.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
      <Footer />
    </main>
  );
}
