import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * Hero, from the Figma comp (Jural / node 329:830): a rounded blue panel, a
 * headline and one line of copy, the Mac app with the iPhone leaning on it,
 * and four floating notifications, lit by a spotlight from the top right.
 *
 * ▸ FIDELITY: the comp's panel is a 1473×662 canvas. From sm up the panel
 *   keeps that aspect ratio and one unit `--u` is 1/1473 of the panel width
 *   (a container-query length), so every number below is the Figma number
 *   and the composition scales as one piece, type included.
 * ▸ Type is Inter (the site's sans face), which the comp is set in.
 * ▸ Below sm the comp's type would fall below legibility, so phones get a
 *   stacked variant of the same pieces.
 *
 * /public/hero holds the comp's own assets: the transparent Mac and iPhone
 * mockups (served unoptimized, the optimizer's WebP pass flattens their
 * alpha) and the Jural mark. The lighting, glyphs and shadows are inline SVG
 * from the file. The Glass effect is rebuilt in CSS (see `glass`).
 */

const CANVAS_W = 1473;
/* The comp is 662 tall. The copy block grew (eyebrow, three-line subline,
   buttons), so the panel gets DY more units of headroom at the top and every
   comp y-coordinate is offset by it. */
const DY = 104;
const CANVAS_H = 662 + DY;
const y = (n: number) => u(n + DY);

/** A comp pixel, as a length that scales with the panel. */
const u = (n: number) => `calc(${n} * var(--u))`;

/** The comp's card shadow, in comp units. */
const CARD_SHADOW = `0 ${u(2.784)} ${u(19.114)} ${u(9.279)} rgba(0,0,0,0.09)`;
const PILL_SHADOW = `0 ${u(10)} ${u(24)} ${u(-8)} rgba(0,0,0,0.15)`;

/**
 * The comp's Glass effect (blur 3.71, refraction 0.8, light from the top
 * left): a backdrop blur over the white/30 fill, a refractive rim lit from
 * the upper left and shaded at the lower right, then the drop shadow.
 */
const glass = (shadow: string): CSSProperties => ({
  backdropFilter: `blur(${u(3.71)}) saturate(1.4)`,
  WebkitBackdropFilter: `blur(${u(3.71)}) saturate(1.4)`,
  boxShadow: [
    `inset 0 ${u(1)} 0 rgba(255,255,255,0.55)`,
    `inset ${u(1)} 0 0 rgba(255,255,255,0.3)`,
    `inset 0 ${u(-1)} 0 rgba(0,40,110,0.12)`,
    `inset ${u(-1)} 0 0 rgba(0,40,110,0.06)`,
    shadow,
  ].join(", "),
});

/** Small facts on a glass card: the same chips the app puts under an action. */
function HeroChip({ children }: { children: ReactNode }) {
  return (
    <span
      className="whitespace-nowrap rounded-full bg-white/22 font-medium text-white ring-1 ring-inset ring-white/25"
      style={{ fontSize: u(10), lineHeight: 1, padding: `${u(4)} ${u(7)}` }}
    >
      {children}
    </span>
  );
}

/** The one-tap approval the app puts on every action card. */
function HeroButton({ children }: { children: ReactNode }) {
  return (
    <span
      className="whitespace-nowrap rounded-full bg-white font-semibold text-[var(--color-brand-deep)]"
      style={{ fontSize: u(10.5), lineHeight: 1, padding: `${u(5)} ${u(9)}` }}
    >
      {children}
    </span>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 31.5474 31.5474"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <path
        d="M9.74325 15.7739L13.9186 19.9493L21.8055 11.1345"
        stroke="white"
        strokeWidth="2.41245"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Blue rounded-square icon tile used by the bell and document notifications. */
function IconTile({ children }: { children: ReactNode }) {
  return (
    <span
      className="relative grid shrink-0 place-items-center bg-[#0b7ae0]"
      style={{ width: u(31.547), height: u(31.547), borderRadius: u(10.207) }}
    >
      {children}
    </span>
  );
}

function BellGlyph() {
  return (
    <svg
      viewBox="0 0 18 20"
      fill="white"
      aria-hidden="true"
      style={{ width: u(18), height: u(20), transform: `translateY(${u(0.8)})` }}
    >
      <path d="M17.1819 9.06828C16.7302 9.06828 16.3637 8.69508 16.3637 8.235C16.3637 5.8975 15.4702 3.70086 13.8477 2.04742C13.5279 1.72164 13.5279 1.19508 13.8477 0.869141C14.1676 0.543359 14.6848 0.543359 15.0046 0.869141C16.9365 2.8366 18 5.45258 18 8.235C18 8.69508 17.6335 9.06828 17.1819 9.06828ZM0.818133 9.06828C0.36661 9.06828 0 8.69508 0 8.235C0 5.45258 1.06366 2.8366 2.9954 0.869141C3.31526 0.543359 3.8324 0.543359 4.15226 0.869141C4.47223 1.19508 4.47223 1.72164 4.15226 2.04742C2.52972 3.7 1.63642 5.89754 1.63642 8.235C1.63642 8.69508 1.26981 9.06828 0.818133 9.06828ZM16.6739 14.0943C15.4367 13.0292 14.7273 11.4725 14.7273 9.82332V7.5C14.7273 4.56758 12.5886 2.14004 9.81821 1.7334V0.833281C9.81821 0.372461 9.4516 0 9.00008 0C8.5484 0 8.18179 0.372461 8.18179 0.833281V1.7334C5.41068 2.14004 3.27269 4.56758 3.27269 7.5V9.82332C3.27269 11.4725 2.56332 13.0292 1.31898 14.1008C1.16183 14.2375 1.03567 14.4073 0.949198 14.5985C0.86273 14.7897 0.818014 14.9978 0.818133 15.2083C0.818133 16.0126 1.46038 16.6667 2.25006 16.6667H15.7501C16.5396 16.6667 17.1819 16.0126 17.1819 15.2083C17.1819 14.7816 16.9994 14.3784 16.6739 14.0943ZM9.00008 20C10.4817 20 11.7213 18.9241 12.0061 17.5H5.99406C6.27871 18.9241 7.51826 20 9.00008 20Z" />
    </svg>
  );
}

function DocumentGlyph() {
  return (
    <svg
      viewBox="0 0 14 18.3795"
      fill="white"
      aria-hidden="true"
      style={{ width: u(14), height: u(18.38) }}
    >
      <path d="M9.65641 5.38462C8.96363 5.38462 8.4 4.82099 8.4 4.12821V0H1.97436C0.885697 0 0 0.885697 0 1.97436V16.4051C0 17.4938 0.885697 18.3795 1.97436 18.3795H12.0256C13.1143 18.3795 14 17.4938 14 16.4051V5.38462H9.65641ZM2.94359 12.9231H5.55405C5.85143 12.9231 6.09251 13.1642 6.09251 13.4615C6.09251 13.7589 5.85143 14 5.55405 14H2.94359C2.64622 14 2.40513 13.7589 2.40513 13.4615C2.40513 13.1642 2.64622 12.9231 2.94359 12.9231ZM2.40513 10.5897C2.40513 10.2924 2.64622 10.0513 2.94359 10.0513H10.841C11.1384 10.0513 11.3795 10.2924 11.3795 10.5897C11.3795 10.8871 11.1384 11.1282 10.841 11.1282H2.94359C2.64622 11.1282 2.40513 10.8871 2.40513 10.5897ZM10.841 7.17949C11.1384 7.17949 11.3795 7.42057 11.3795 7.71795C11.3795 8.01532 11.1384 8.25641 10.841 8.25641H2.94359C2.64622 8.25641 2.40513 8.01532 2.40513 7.71795C2.40513 7.42057 2.64622 7.17949 2.94359 7.17949H10.841Z" />
      <path d="M9.47692 4.12796C9.47692 4.22693 9.55744 4.30745 9.65641 4.30745H13.76C13.661 4.12423 13.5336 3.95785 13.3825 3.81451L9.92119 0.539872C9.78846 0.414259 9.63896 0.307647 9.47696 0.223077L9.47692 4.12796Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="bg-white px-4 py-4 sm:px-6 sm:py-5">
      <div
        className="relative w-full overflow-hidden rounded-[32px] shadow-[0px_18px_48px_-12px_rgba(0,0,0,0.08)] sm:rounded-[44px]"
        style={{
          containerType: "inline-size",
          background:
            "linear-gradient(90deg, #0670d6 0%, #0e82e8 50%, #0670d6 100%)",
        }}
      >
        {/* ================= sm and up: the comp, in comp units ============ */}
        <div
          className="relative hidden w-full sm:block"
          style={
            {
              "--u": `calc(100cqw / ${CANVAS_W})`,
              aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
            } as CSSProperties
          }
        >
          {/* the ground: an edge vignette, a spotlight sweeping in from the
              top right, ambient light pooling behind the devices, and the
              laptop's shadow. One SVG in panel coordinates, so the blurs
              scale with the panel. */}
          <svg
            aria-hidden="true"
            viewBox={`0 ${-DY} ${CANVAS_W} ${CANVAS_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <radialGradient id="hero-vignette" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="rgb(37,110,184)" stopOpacity="0" />
                <stop offset="1" stopColor="rgb(0,102,204)" stopOpacity="1" />
              </radialGradient>
              <linearGradient
                id="hero-spot"
                gradientUnits="userSpaceOnUse"
                x1="1603"
                y1="-106.3"
                x2="1152.5"
                y2="311.2"
              >
                <stop offset="0" stopColor="white" stopOpacity="1" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <filter id="hero-blur-50" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="50" />
              </filter>
              <filter id="hero-blur-90" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="90" />
              </filter>
              <filter id="hero-blur-10" x="-20%" y="-200%" width="140%" height="500%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
            </defs>
            <rect x="0" y={-DY} width="1504" height={CANVAS_H} fill="url(#hero-vignette)" />
            <path
              d="M1521.7 -103.2L1569.7 -55.2L1252 501.2L964.5 222.7Z"
              fill="url(#hero-spot)"
              fillOpacity="0.5"
              opacity="0.8"
              filter="url(#hero-blur-50)"
            />
            <circle cx="1026" cy="462.2" r="200" fill="white" opacity="0.105" filter="url(#hero-blur-90)" />
            <ellipse cx="736" cy="605.7" rx="331" ry="16.5" fill="#0e1524" opacity="0.31" filter="url(#hero-blur-10)" />
            <circle cx="668" cy="358.2" r="200" fill="white" opacity="0.3" filter="url(#hero-blur-90)" />
          </svg>

          {/* eyebrow + headline + copy + action */}
          <div
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-center text-white"
            style={{ top: u(40.2) }}
          >
            <p
              className="font-semibold uppercase text-white/80"
              style={{ fontSize: u(12.5), letterSpacing: u(1.8), lineHeight: 1 }}
            >
              For law firms
            </p>
            <h1
              className="font-semibold"
              style={{
                marginTop: u(14),
                width: u(1425),
                fontSize: u(40),
                lineHeight: 1.2,
                letterSpacing: u(-1.968),
              }}
            >
              The legal CRM you run by talking to it.
            </h1>
            <p
              className="text-white/90"
              style={{ marginTop: u(12), width: u(840), fontSize: u(16), lineHeight: u(24.38) }}
            >
              Text or speak to a matter like you&rsquo;d message a colleague.
              The AI handles the rest: intake, documents, drafting, signatures
              and billing, all in the conversation. Private by design, native
              on iPhone and Mac.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center rounded-full bg-white font-semibold text-[var(--color-brand-deep)] transition-colors hover:bg-white/90"
              style={{ marginTop: u(22), height: u(42), padding: `0 ${u(20)}`, fontSize: u(14) }}
            >
              Get 14 Days Demo
            </a>
          </div>

          {/* Mac */}
          <Image
            src="/hero/mac.png"
            alt="Jural on Mac showing a case thread with a completed intake"
            width={1254}
            height={806}
            priority
            unoptimized
            sizes="(min-width: 640px) 43vw, 100vw"
            className="absolute max-w-none"
            style={{ left: u(379), top: y(212.2), width: u(626.428), height: u(403) }}
          />

          {/* iPhone: the comp's crop box, tilted 5.62°, leaning on the Mac */}
          <div
            className="absolute grid place-items-center"
            style={{ left: u(791), top: y(262.2), width: u(295.243), height: u(414.39) }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: u(258.225),
                height: u(391),
                transform: "rotate(-5.62deg)",
              }}
            >
              <Image
                src="/hero/iphone.png"
                alt="Jural on iPhone showing the same case"
                width={485}
                height={792}
                priority
                unoptimized
                sizes="(min-width: 640px) 17vw, 60vw"
                className="absolute top-0 max-w-none"
                style={{ left: "6.03%", width: "93.97%", height: "101.2%" }}
              />
            </div>
          </div>

          {/* Demand letter drafted, by the phone */}
          <div
            className="absolute flex items-center bg-white/30"
            style={{
              left: u(998),
              top: y(491.2),
              width: u(292),
              gap: u(6),
              borderRadius: u(22.269),
              padding: `${u(7.423)} ${u(18.557)} ${u(7.423)} ${u(7.423)}`,
              ...glass(CARD_SHADOW),
            }}
          >
            <IconTile>
              <DocumentGlyph />
            </IconTile>
            <div className="flex min-w-0 flex-col" style={{ gap: u(2) }}>
              <p
                className="whitespace-nowrap font-semibold text-white"
                style={{ fontSize: u(12), lineHeight: u(12.75) }}
              >
                Demand letter drafted
              </p>
              <p
                className="whitespace-nowrap text-[#ebedf0]"
                style={{ fontSize: u(10), lineHeight: u(10.2) }}
              >
                Filled from the case, ready to send
              </p>
            </div>
            <span className="ml-auto shrink-0">
              <HeroButton>Review</HeroButton>
            </span>
          </div>

          {/* Reminder set, bell, over the Mac's left edge */}
          <div
            className="absolute flex items-start bg-white/30"
            style={{
              left: u(222),
              top: y(231.2),
              width: u(235),
              padding: u(12),
              gap: u(6),
              borderRadius: u(22.269),
              ...glass(CARD_SHADOW),
            }}
          >
            <IconTile>
              <BellGlyph />
            </IconTile>
            <div className="flex flex-col justify-center" style={{ width: u(163), gap: u(4) }}>
              <p
                className="whitespace-nowrap font-semibold leading-normal text-white"
                style={{ fontSize: u(12) }}
              >
                Reminder set
              </p>
              <p
                className="font-medium text-white"
                style={{ fontSize: u(12), lineHeight: u(16) }}
              >
                Chase Northshore&rsquo;s counsel on the ledger exhibits.
              </p>
              <div className="flex items-center" style={{ gap: u(5), marginTop: u(3) }}>
                <HeroChip>Fri, 9:00 AM</HeroChip>
                <HeroButton>Approve</HeroButton>
              </div>
            </div>
          </div>

          {/* Intake written up, Jural mark, top right */}
          <div
            className="absolute flex items-start bg-white/30"
            style={{
              left: u(904),
              top: y(188.2),
              width: u(294),
              padding: u(12),
              gap: u(8),
              borderRadius: u(22.269),
              ...glass(CARD_SHADOW),
            }}
          >
            <Image
              src="/hero/jural-mark.png"
              alt=""
              width={71}
              height={88}
              className="shrink-0"
              style={{ width: u(29), height: u(36) }}
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              {/* keeps the row height the removed timestamp used to set */}
              <p
                className="font-semibold text-white"
                style={{ fontSize: u(12), lineHeight: u(23.373) }}
              >
                Intake written up
              </p>
              <p
                className="w-full text-white"
                style={{ fontSize: u(12), lineHeight: u(16) }}
              >
                Hale v. Northshore Logistics, from a conversation. Nothing
                typed into a form.
              </p>
              <div className="flex flex-wrap items-center" style={{ gap: u(5), marginTop: u(7) }}>
                <HeroChip>12 key facts</HeroChip>
                <HeroChip>6 parties</HeroChip>
                <HeroChip>Timeline</HeroChip>
              </div>
            </div>
          </div>

          {/* Engagement letter signed */}
          <div
            className="absolute flex items-center bg-white/30"
            style={{
              left: u(150),
              top: y(445),
              gap: u(7.423),
              borderRadius: u(22.269),
              padding: u(8),
              ...glass(PILL_SHADOW),
            }}
          >
            <IconTile>
              <CheckGlyph />
            </IconTile>
            <div className="flex flex-col" style={{ gap: u(2), paddingRight: u(6) }}>
              <p
                className="whitespace-nowrap font-semibold text-white"
                style={{ fontSize: u(12.5), lineHeight: 1.1 }}
              >
                Engagement letter signed
              </p>
              <p
                className="whitespace-nowrap text-[#ebedf0]"
                style={{ fontSize: u(10), lineHeight: 1.1 }}
              >
                Alex Morgan, 3:19 PM. Certificate issued.
              </p>
            </div>
          </div>

          {/* three more beams from the file's Section frame: they sit above the
              panel there, so they wash over the devices and cards here too */}
          <svg
            aria-hidden="true"
            viewBox={`0 ${-DY} ${CANVAS_W} ${CANVAS_H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="hero-beam-tl" gradientUnits="userSpaceOnUse" x1="-215.3" y1="-138.6" x2="281.6" y2="222.2">
                <stop offset="0" stopColor="white" stopOpacity="1" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hero-beam-bl" gradientUnits="userSpaceOnUse" x1="-199.3" y1="633.5" x2="412.4" y2="581">
                <stop offset="0" stopColor="white" stopOpacity="1" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hero-beam-br" gradientUnits="userSpaceOnUse" x1="1555.8" y1="699.8" x2="1103.7" y2="541.4">
                <stop offset="0" stopColor="white" stopOpacity="1" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <filter id="hero-beam-blur" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="50" />
              </filter>
            </defs>
            <g opacity="0.69" filter="url(#hero-beam-blur)">
              <path d="M-138.9 -138.8L-175.4 -93L217.5 406L437.75 139.4Z" fill="url(#hero-beam-tl)" />
              <path d="M-141.6 584.5L-139.3 641.7L484.1 759L476.7 421.25Z" fill="url(#hero-beam-bl)" />
              <path d="M1522.7 648.8L1508.7 694.8L1012.6 668.9L1090.3 396.2Z" fill="url(#hero-beam-br)" />
            </g>
          </svg>
        </div>

        {/* ================= below sm: stacked variant ===================== */}
        <div className="relative flex flex-col items-center px-5 pt-10 text-center text-white sm:hidden">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">
            For law firms
          </p>
          <h1 className="mt-3 text-[clamp(1.6rem,1rem+3.5vw,2.2rem)] font-semibold leading-[1.15] tracking-[-0.045em]">
            The legal CRM you run by talking to it.
          </h1>
          <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-white/90">
            Text or speak to a matter like you&rsquo;d message a colleague. The
            AI handles the rest: intake, documents, drafting, signatures and
            billing, all in the conversation. Private by design, native on
            iPhone and Mac.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="/demo"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[14px] font-semibold text-[var(--color-brand-deep)]"
            >
              Get 14 Days Demo
            </a>
          </div>
          <div className="mt-7 flex items-center gap-[6px] self-start rounded-full bg-white/30 py-[6px] pl-[6px] pr-[14px] shadow-[0px_10px_24px_-8px_rgba(0,0,0,0.15)] backdrop-blur-[3px]">
            <span className="relative grid size-[24px] shrink-0 place-items-center rounded-[8px] bg-[#0b7ae0]">
              <CheckGlyph />
            </span>
            <p className="text-[12.5px] font-semibold">Engagement letter signed</p>
          </div>
          <Image
            src="/hero/mac.png"
            alt="Jural on Mac showing a case thread with a completed intake"
            width={1254}
            height={806}
            priority
            unoptimized
            className="mt-2 w-full max-w-[460px]"
          />
        </div>
      </div>
    </section>
  );
}
