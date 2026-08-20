import { LuCloud, LuLock, LuSmartphone } from "react-icons/lu";

/**
 * How it works: the architecture drawn as three exploded slabs.
 *
 * Structure: the drawing is the centrepiece and the labels are anchored to the
 * slabs they describe, rather than sitting in a separate column. An earlier
 * version put them side by side as equal halves, which left the numbering doing
 * the work the drawing should do, and stranded the header in a narrow column
 * with an empty quadrant beside it.
 *
 * Each label carries its own `pos` classes, so the same markup flows as a plain
 * list on small screens and gets anchored beside the stack from lg. One DOM, no
 * duplication.
 *
 * The concept is the boundary. Everything about the case sits on the device.
 * When a bigger model is needed for drafting, only the words travel, never the
 * files, and nothing is kept afterwards. So the middle slab is genuinely
 * transparent: a real rgba fill with a backdrop blur, not a material trick.
 * Nothing rests on it because nothing is stored on it.
 *
 * Copy note: the blueprint's own words for this ("ciphertext", "zero-knowledge
 * relay", "retrieval index") are accurate and unreadable to an attorney.
 * Everything here is deliberately translated out of that register.
 *
 * CSS 3D rather than a modelled scene: a few KB, responsive, no client JS.
 * Keyframes live in globals.css and honour prefers-reduced-motion.
 */

/* Identity labels, set OUTSIDE the 3D transform so they stay upright and crisp
   while the geometry stays isometric. They sit clear of the slabs, to the left,
   joined by a leader line: dropping them onto the tiles buried the drawing and
   read as stickers rather than annotation.

   cx and cy are percentages of the 520px stack box, NOT of the stage, measured
   from the rendered slab left edges and centres. The box scales as one unit so
   they hold at every breakpoint. Do not convert them to stage percentages: the
   box is offset inside the stage and the two disagree.

   Below lg the leaders have nowhere to go, so these hide and the ordered list
   underneath carries the identity instead. */
const BADGES = [
  { Icon: LuCloud, t: "Cloud AI", cy: "3.9%", cx: "0.4%" },
  { Icon: LuLock, t: "Encrypted", cy: "29.6%", cx: "2.7%" },
  { Icon: LuSmartphone, t: "Your phone", cy: "53%", cx: "4.8%" },
];

const LEADER =
  "repeating-linear-gradient(90deg, rgba(255,255,255,0.45) 0 3px, transparent 3px 7px)";

const LAYERS = [
  {
    n: "03",
    t: "The cloud model",
    d: "Used only for heavy drafting. It gets the words it needs, never your files, and forgets them once it replies.",
    pos: "lg:absolute lg:left-[65.5%] lg:top-[22%] lg:w-[340px]",
  },
  {
    n: "02",
    t: "The connection",
    d: "When your devices sync, or you share a case, it travels scrambled. We pass it along and keep no copy.",
    pos: "lg:absolute lg:left-[65.5%] lg:top-[45%] lg:w-[340px]",
  },
  {
    n: "01",
    t: "Your device",
    d: "Your documents, your notes and everything Jural has learned about the case are held on the phone itself.",
    pos: "lg:absolute lg:left-[65.5%] lg:top-[68%] lg:w-[340px]",
  },
];

/* One flat chip lying on a slab. Reads as texture, not as a label. */
function Chip({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <span
      className="absolute rounded-[3px] border border-white/15 bg-white/10 px-1.5 py-1 text-[7px] font-medium uppercase tracking-[0.1em] text-white/70"
      style={{ left: x, top: y, width: w }}
    >
      {label}
    </span>
  );
}

const SLAB =
  "absolute left-1/2 top-1/2 -ml-[170px] -mt-[170px] h-[340px] w-[340px] rounded-[12px]";

export function Architecture() {
  return (
    <section id="how" aria-label="How it works" className="overflow-hidden bg-[#060c16]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24">
        {/* ---- header spans the width, so there is no empty quadrant ---- */}
        <div className="flex flex-wrap items-end justify-between gap-x-14 gap-y-5">
          <div>
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-bright)]">
              How it works
            </div>
            <h2 className="max-w-[15ch] text-[clamp(2rem,1.1rem+2.9vw,3.1rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white [font-family:var(--font-display)]">
              Nothing readable ever leaves your device.
            </h2>
          </div>

          <p className="max-w-[40ch] text-[clamp(1.02rem,0.97rem+0.4vw,1.15rem)] leading-relaxed tracking-[-0.014em] text-white/60">
            Most of the work happens on the phone in your hand. When Jural needs
            a bigger model to draft, it sends the words and not the file.
          </p>
        </div>

        {/* ---- stage: drawing centre-left, labels anchored beside it ---- */}
        <div className="mt-12 lg:relative lg:mt-4 lg:h-[560px]">
          <div className="flex justify-center lg:absolute lg:left-[17%] lg:top-1/2 lg:block lg:-translate-y-[30%]">
            <div
              aria-hidden="true"
              className="relative h-[320px] w-[320px] scale-[0.86] sm:h-[460px] sm:w-[460px] sm:scale-95 lg:h-[520px] lg:w-[520px] lg:scale-100"
              style={{ perspective: "1700px" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(57deg) rotateZ(-38deg)",
                }}
              >
                {/* ---- 01 device: solid, carries the weight ---- */}
                <div
                  className={`${SLAB} border border-[rgba(56,192,248,0.3)]`}
                  style={{
                    transform: "translateZ(0px)",
                    background:
                      "linear-gradient(140deg, rgba(14,130,232,0.38) 0%, rgba(9,76,144,0.52) 55%, rgba(5,41,77,0.68) 100%)",
                    boxShadow: "0 16px 0 -1px rgba(3,26,52,0.9)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-[12px] opacity-40"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, rgba(255,255,255,0.10) 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0 1px, transparent 1px 30px)",
                    }}
                  />
                  <Chip x={26} y={30} w={94} label="Documents" />
                  <Chip x={206} y={54} w={100} label="Case notes" />
                  <Chip x={22} y={238} w={80} label="Search" />
                  <Chip x={188} y={264} w={106} label="On-device AI" />
                </div>

                {/* ---- 02 connection: hollow. the whole argument. ---- */}
                <div
                  className={`${SLAB} border border-white/25 bg-white/[0.05] backdrop-blur-[2px]`}
                  style={{
                    transform: "translateZ(138px)",
                    boxShadow: "0 14px 0 -2px rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="jural-stream absolute inset-x-0 top-1/2 h-[10px] -translate-y-1/2 opacity-60"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 7px, transparent 7px 18px)",
                    }}
                  />
                </div>

                {/* ---- 03 cloud: empty ---- */}
                <div
                  className={`${SLAB} border border-white/18 bg-white/[0.03]`}
                  style={{
                    transform: "translateZ(276px)",
                    boxShadow: "0 14px 0 -2px rgba(255,255,255,0.05)",
                  }}
                />

                {/* ---- what actually travels: the words, not the file ---- */}
                <div
                  className="jural-rise absolute left-1/2 top-1/2 -ml-[59px] -mt-[40px] w-[118px] rounded-[6px] border border-white/45 bg-[#0b1a2c] p-[11px]"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <span className="mb-[7px] block text-[7.5px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    Text only
                  </span>
                  <span className="mb-[5px] block h-[3px] w-full rounded-full bg-white/60" />
                  <span className="mb-[5px] block h-[3px] w-[86%] rounded-full bg-white/45" />
                  <span className="mb-[5px] block h-[3px] w-[93%] rounded-full bg-white/45" />
                  <span className="block h-[3px] w-[58%] rounded-full bg-white/30" />
                </div>
              </div>

              {/* identity labels, clear of the slabs, joined by a leader */}
              {BADGES.map((b) => (
                <span
                  key={b.t}
                  className="absolute hidden -translate-x-full -translate-y-1/2 items-center gap-3 whitespace-nowrap lg:flex"
                  style={{ top: b.cy, left: b.cx }}
                >
                  <span className="flex items-center gap-2 text-[13.5px] font-medium text-white/85">
                    <b.Icon
                      size={14}
                      strokeWidth={2}
                      className="text-[var(--color-brand-bright)]"
                    />
                    {b.t}
                  </span>
                  <span aria-hidden="true" className="h-px w-12" style={{ background: LEADER }} />
                </span>
              ))}
            </div>
          </div>

          {/* ---- labels: a list on small screens, anchored from lg ---- */}
          <ol className="mt-12 space-y-6 lg:mt-0 lg:space-y-0">
            {LAYERS.map((l) => (
              <li
                key={l.n}
                className={`border-t border-white/12 pt-4 lg:border-t-0 lg:pt-0 ${l.pos}`}
              >
                {/* leader line back toward the slab this describes */}
                <span
                  aria-hidden="true"
                  className="mb-3 hidden h-px w-14 lg:block"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, rgba(255,255,255,0.45) 0 3px, transparent 3px 7px)",
                  }}
                />
                <div className="flex items-baseline gap-3">
                  <span className="text-[12px] font-medium tracking-[0.14em] text-[var(--color-brand-bright)] [font-family:var(--font-mono)]">
                    {l.n}
                  </span>
                  <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white">
                    {l.t}
                  </h3>
                </div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">
                  {l.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
