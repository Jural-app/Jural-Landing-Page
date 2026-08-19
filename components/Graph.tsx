"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * The matter's knowledge graph, drawn as it is worked out.
 *
 * Nodes arrive in the order Jural would infer them and edges draw once both
 * of their ends exist. Every node carries an icon and a colour keyed to what
 * kind of thing it is, so the shape of the case is readable before any of the
 * labels are.
 */

const FAMILY = {
  party: "#45c8fb", // people and organisations
  paper: "#e6edf6", // documents
  time: "#ffb84d", // dates and events
} as const;

/** 20x20 icons, drawn to the same 1.5 stroke so the set reads as one. */
const ICON = {
  person:
    "M16 16.5v-1.4a3.2 3.2 0 00-3.2-3.2H7.2A3.2 3.2 0 004 15.1v1.4M10 8.9a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z",
  building:
    "M3.4 17h13.2M5.2 17V4.2a1.2 1.2 0 011.2-1.2h7.2a1.2 1.2 0 011.2 1.2V17M8.2 6.4h1M11 6.4h1M8.2 9.6h1M11 9.6h1M8.2 12.8h3.8V17",
  doc: "M11.6 2.6H6.2A1.6 1.6 0 004.6 4.2v11.6a1.6 1.6 0 001.6 1.6h7.6a1.6 1.6 0 001.6-1.6V6.6zM11.6 2.6v4h3.8M7.6 10.4h4.8M7.6 13.4h4.8",
  clock: "M10 5.6V10l2.8 1.7M10 2.4a7.6 7.6 0 100 15.2 7.6 7.6 0 000-15.2z",
  calendar:
    "M15.2 3.8H4.8a1.4 1.4 0 00-1.4 1.4v10.4a1.4 1.4 0 001.4 1.4h10.4a1.4 1.4 0 001.4-1.4V5.2a1.4 1.4 0 00-1.4-1.4zM13.2 2.4v2.8M6.8 2.4v2.8M3.4 8h13.2",
} as const;

/** `place` keeps a node's labels off whichever side its edges leave from. */
type Node = {
  id: string;
  label: string;
  kind: string;
  x: number;
  y: number;
  icon: keyof typeof ICON;
  family: keyof typeof FAMILY;
  place?: "below" | "above" | "right";
};

const NODES: Node[] = [
  { id: "chen", label: "Ada Chen", kind: "Client", x: 176, y: 96, icon: "person", family: "party", place: "above" },
  { id: "whit", label: "Whitfield Ltd", kind: "Opposing party", x: 470, y: 92, icon: "building", family: "party", place: "above" },
  { id: "inv", label: "Invoice · 12 Nov", kind: "Document", x: 300, y: 252, icon: "doc", family: "paper" },
  { id: "reyes", label: "M. Reyes", kind: "Opposing counsel", x: 588, y: 228, icon: "person", family: "party", place: "right" },
  { id: "lim", label: "14 Nov 2028", kind: "Limitation date", x: 112, y: 272, icon: "clock", family: "time" },
  { id: "hear", label: "Directions hearing", kind: "Event · 4 Mar", x: 446, y: 352, icon: "calendar", family: "time" },
];

const EDGES: { a: string; b: string; label: string; from: string }[] = [
  { a: "chen", b: "whit", label: "claims against", from: "engagement letter" },
  { a: "chen", b: "inv", label: "relies on", from: "engagement letter" },
  { a: "inv", b: "whit", label: "issued to", from: "invoice, 12 Nov" },
  { a: "whit", b: "reyes", label: "represented by", from: "notice of acting" },
  { a: "chen", b: "lim", label: "must file by", from: "engagement ltr, cl. 7.2" },
  { a: "whit", b: "hear", label: "must attend", from: "court order, 2 Feb" },
  { a: "reyes", b: "hear", label: "appearing at", from: "court order, 2 Feb" },
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;
const order = (id: string) => NODES.findIndex((n) => n.id === id);

const labelX = (n: Node) => (n.place === "right" ? n.x + 26 : n.x);
const labelY = (n: Node) =>
  n.place === "right" ? n.y + 2 : n.place === "above" ? n.y - 34 : n.y + 38;
const kindY = (n: Node) =>
  n.place === "right" ? n.y + 18 : n.place === "above" ? n.y - 19 : n.y + 54;

/** A node lands, then every edge whose two ends have both landed draws. */
const NODE_STEP = 0.34;
const edgeDelay = (e: { a: string; b: string }) =>
  (Math.max(order(e.a), order(e.b)) + 1) * NODE_STEP + 0.15;

/** Halo in the section ground, so nothing behind a label runs through it. */
const KNOCKOUT = {
  paintOrder: "stroke" as const,
  stroke: "var(--color-theatre-2)",
  strokeWidth: 6,
  strokeLinejoin: "round" as const,
};

export function Graph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const run = inView || reduce;

  return (
    <div ref={ref}>
      <svg
        viewBox="0 0 740 440"
        className="w-full"
        role="img"
        aria-label="Knowledge graph for the Chen matter: Ada Chen claims against Whitfield Ltd, who are represented by M. Reyes; the 12 November invoice is relied on by Chen and was issued to Whitfield; Chen must file by 14 November 2028; Whitfield and Reyes are appearing at the directions hearing on 4 March."
      >
        {/* edges draw once both of their ends exist */}
        {EDGES.map((e) => {
          const a = byId(e.a);
          const b = byId(e.b);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const d = edgeDelay(e);
          // Rounded: the raw value differs in its last digit between the
          // server and the client, which trips a hydration mismatch.
          const angle =
            Math.round(((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI) * 100) / 100;
          const flip = angle > 90 || angle < -90;

          return (
            <g key={`${e.a}-${e.b}`}>
              <motion.line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(255,255,255,.22)"
                strokeWidth="1"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={run ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.5, delay: d, ease: "easeOut" }}
              />
              <motion.g
                transform={`rotate(${flip ? angle + 180 : angle} ${mx} ${my})`}
                initial={reduce ? false : { opacity: 0 }}
                animate={run ? { opacity: 1 } : undefined}
                transition={{ duration: 0.35, delay: d + 0.35 }}
              >
                <text
                  x={mx}
                  y={my - 6}
                  textAnchor="middle"
                  className="fill-white/65"
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: ".06em",
                    ...KNOCKOUT,
                  }}
                >
                  {e.label}
                </text>
                {/* where the inference came from, so none of it is a guess */}
                <text
                  x={mx}
                  y={my + 8}
                  textAnchor="middle"
                  className="fill-white/35"
                  style={{
                    fontSize: 8.5,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: ".04em",
                    ...KNOCKOUT,
                  }}
                >
                  {e.from}
                </text>
              </motion.g>
            </g>
          );
        })}

        {/* nodes arrive one at a time */}
        {NODES.map((n, i) => {
          const tint = FAMILY[n.family];
          return (
            <motion.g
              key={n.id}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={run ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.4, delay: i * NODE_STEP, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="20"
                fill="none"
                stroke={tint}
                strokeWidth="1"
                initial={reduce ? false : { opacity: 0.6, scale: 0.5 }}
                animate={run ? { opacity: 0, scale: 1.7 } : undefined}
                transition={{ duration: 1, delay: i * NODE_STEP, ease: "easeOut" }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />

              <circle
                cx={n.x}
                cy={n.y}
                r="17"
                fill="var(--color-theatre-2)"
                stroke={tint}
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <g transform={`translate(${n.x - 9} ${n.y - 9}) scale(0.9)`}>
                <path
                  d={ICON[n.icon]}
                  fill="none"
                  stroke={tint}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              <text
                x={labelX(n)}
                y={labelY(n)}
                textAnchor={n.place === "right" ? "start" : "middle"}
                className="fill-white"
                style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-.01em", ...KNOCKOUT }}
              >
                {n.label}
              </text>
              <text
                x={labelX(n)}
                y={kindY(n)}
                textAnchor={n.place === "right" ? "start" : "middle"}
                className="fill-white/55"
                style={{
                  fontSize: 10.5,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  ...KNOCKOUT,
                }}
              >
                {n.kind}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-[color:var(--color-chalk-3)]">
        Every inference traces back to a document in the file. All of it is
        listed in plain English on the case screen, and anything it should not
        have kept, you can swipe away and it forgets.
      </p>
    </div>
  );
}
