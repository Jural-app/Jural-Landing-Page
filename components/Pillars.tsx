import { LuSmartphone, LuMessagesSquare, LuShieldCheck } from "react-icons/lu";

/**
 * Three feature panels. Premium Lucide icons, one per panel. Three distinct
 * panel colors from the brand palette. The centered panel carries a white icon;
 * the outer two carry an icon in their own text color.
 */

const ICON = "h-[68px] w-[68px]";

const PANELS = [
  {
    t: "Your firm, in your pocket",
    d: "Jural is built mobile-first, so your clients, matters, tasks, documents, and day-to-day work are always close at hand. Whether you’re in court, travelling, or meeting a client, your firm moves with you.",
    art: <LuSmartphone className={ICON} strokeWidth={1.4} aria-hidden="true" />,
    bg: "bg-[var(--color-brand-wash)]", // light blue wash
    fg: "text-[var(--color-ink)]",
    sub: "text-[var(--color-ink-3)]",
    art_c: "text-[var(--color-ink)]",
  },
  {
    t: "Every case is a conversation",
    d: "Open a matter and simply message it. Ask for case information, add notes, schedule tasks, create documents, or find what you need, all through a familiar chat-style experience designed to feel natural from the first use.",
    art: <LuMessagesSquare className={ICON} strokeWidth={1.4} aria-hidden="true" />,
    bg: "bg-[#0763b7]", // deep brand blue
    fg: "text-white",
    sub: "text-white/70",
    art_c: "text-white",
  },
  {
    t: "Private by architecture",
    d: "Your sensitive client data is protected with end-to-end encryption and designed to stay under your control. Jural is built without relying on a traditional central application database holding your firm’s confidential information.",
    art: <LuShieldCheck className={ICON} strokeWidth={1.4} aria-hidden="true" />,
    bg: "bg-[var(--color-canvas)]", // warm off-white
    fg: "text-[var(--color-ink)]",
    sub: "text-[var(--color-ink-3)]",
    art_c: "text-[var(--color-ink)]",
  },
];

export function Pillars() {
  return (
    <section aria-label="Core features">
      <div className="grid md:grid-cols-3">
        {PANELS.map((p) => (
          <div
            key={p.t}
            className={`flex min-h-[380px] flex-col justify-between p-8 md:min-h-[440px] md:p-10 ${p.bg} ${p.fg}`}
          >
            <div className={p.art_c}>{p.art}</div>

            <div>
              <h3 className="text-[clamp(1.35rem,1.1rem+0.7vw,1.7rem)] font-medium tracking-[-0.03em]">
                {p.t}
              </h3>
              <p className={`mt-3 max-w-[34ch] text-[15.5px] leading-relaxed ${p.sub}`}>{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
