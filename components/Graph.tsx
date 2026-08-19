"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * The matter's knowledge graph, drawn as it is worked out.
 *
 * Nodes arrive in the order Jural would infer them and edges draw once both of
 * their ends exist. Every node carries an icon and a colour keyed to what kind
 * of thing it is, so the shape of the case is readable before any of the
 * labels are.
 *
 * Edge labels sit horizontally rather than rotated along their line. Rotated
 * text is how diagram generators do it; it is also unreadable on a steep edge.
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

type Node = {
  id: string;
  label: string;
  kind: string;
  x: number;
  y: number;
  icon: keyof typeof ICON;
  family: keyof typeof FAMILY;
  /** Keeps a node's labels off whichever side its edges leave from. */
  place?: "below" | "above" | "left" | "right";
};

const NODES: Node[] = [
  { id: "chen", label: "Ada Chen", kind: "Client", x: 318, y: 118, icon: "person", family: "party", place: "above" },
  { id: "whit", label: "Whitfield Ltd", kind: "Opposing party", x: 706, y: 118, icon: "building", family: "party", place: "above" },
  { id: "eng", label: "Engagement letter", kind: "Document · 14 Jan", x: 96, y: 262, icon: "doc", family: "paper", place: "left" },
  { id: "inv", label: "Invoice · 12 Nov", kind: "Document", x: 452, y: 312, icon: "doc", family: "paper", place: "below" },
  { id: "reyes", label: "M. Reyes", kind: "Opposing counsel", x: 906, y: 300, icon: "person", family: "party", place: "right" },
  { id: "resp", label: "Response due · 24 Feb", kind: "Deadline", x: 318, y: 508, icon: "clock", family: "time", place: "below" },
  { id: "lim", label: "14 Nov 2028", kind: "Limitation date", x: 112, y: 470, icon: "clock", family: "time", place: "below" },
  { id: "hear", label: "Directions hearing", kind: "Event · 4 Mar", x: 688, y: 494, icon: "calendar", family: "time", place: "below" },
];

const EDGES: { a: string; b: string; label: string; from: string }[] = [
  { a: "chen", b: "whit", label: "claims against", from: "engagement letter" },
  { a: "chen", b: "eng", label: "signed", from: "14 Jan 2026" },
  { a: "eng", b: "lim", label: "sets", from: "clause 7.2" },
  { a: "chen", b: "inv", label: "relies on", from: "engagement letter" },
  { a: "inv", b: "whit", label: "issued to", from: "invoice, 12 Nov" },
  { a: "chen", b: "resp", label: "must respond by", from: "summons, served 3 Feb" },
  { a: "whit", b: "reyes", label: "represented by", from: "notice of acting" },
  { a: "whit", b: "hear", label: "must attend", from: "court order, 2 Feb" },
  { a: "reyes", b: "hear", label: "appearing at", from: "court order, 2 Feb" },
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;
const order = (id: string) => NODES.findIndex((n) => n.id === id);

const labelX = (n: Node) =>
  n.place === "right" ? n.x + 34 : n.place === "left" ? n.x - 34 : n.x;
const labelY = (n: Node) =>
  n.place === "right" || n.place === "left" ? n.y + 1 : n.place === "above" ? n.y - 55 : n.y + 50;
const kindY = (n: Node) =>
  n.place === "right" || n.place === "left" ? n.y + 19 : n.place === "above" ? n.y - 37 : n.y + 67;
const anchor = (n: Node) =>
  n.place === "right" ? "start" : n.place === "left" ? "end" : "middle";

/** A node lands, then every edge whose two ends have both landed draws. */
const NODE_STEP = 0.5;
const edgeDelay = (e: { a: string; b: string }) =>
  (Math.max(order(e.a), order(e.b)) + 1) * NODE_STEP + 0.2;

/** Halo in the section ground, so nothing behind a label runs through it. */
const KNOCKOUT = {
  paintOrder: "stroke" as const,
  stroke: "var(--color-theatre-2)",
  strokeWidth: 7,
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
        viewBox="-96 -16 1200 632"
        className="hidden w-full lg:block"
        role="img"
        aria-label="Knowledge graph for the Chen matter: Ada Chen signed the engagement letter of 14 January, which sets a limitation date of 14 November 2028. Chen claims against Whitfield Ltd, relies on the invoice of 12 November which was issued to Whitfield, and must respond by 24 February following service of the summons on 3 February. Whitfield is represented by M. Reyes, and both must attend the directions hearing on 4 March."
      >
        {/* edges draw once both of their ends exist */}
        {EDGES.map((e) => {
          const a = byId(e.a);
          const b = byId(e.b);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const d = edgeDelay(e);

          return (
            <g key={`${e.a}-${e.b}`}>
              {/* a path, not a line: pathLength is unreliable on <line> and
                  leaves the stroke dashed once the draw finishes. */}
              <motion.path
                d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                stroke="rgba(255,255,255,.2)"
                strokeWidth="1"
                fill="none"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={run ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: 0.85, delay: d, ease: "easeOut" }}
              />

              <motion.g
                initial={reduce ? false : { opacity: 0 }}
                animate={run ? { opacity: 1 } : undefined}
                transition={{ duration: 0.5, delay: d + 0.5 }}
              >
                <text
                  x={mx}
                  y={my - 5}
                  textAnchor="middle"
                  className="fill-white/70"
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: ".04em",
                    ...KNOCKOUT,
                  }}
                >
                  {e.label}
                </text>
                {/* where the inference came from, so none of it is a guess */}
                <text
                  x={mx}
                  y={my + 11}
                  textAnchor="middle"
                  className="fill-white/38"
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: ".02em",
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
              transition={{ duration: 0.6, delay: i * NODE_STEP, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="26"
                fill="none"
                stroke={tint}
                strokeWidth="1"
                initial={reduce ? false : { opacity: 0.6, scale: 0.5 }}
                animate={run ? { opacity: 0, scale: 1.7 } : undefined}
                transition={{ duration: 1.4, delay: i * NODE_STEP, ease: "easeOut" }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />

              <circle
                cx={n.x}
                cy={n.y}
                r="23"
                fill="var(--color-theatre-2)"
                stroke={tint}
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <g transform={`translate(${n.x - 12} ${n.y - 12}) scale(1.2)`}>
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
                textAnchor={anchor(n)}
                className="fill-white"
                style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-.01em", ...KNOCKOUT }}
              >
                {n.label}
              </text>
              <text
                x={labelX(n)}
                y={kindY(n)}
                textAnchor={anchor(n)}
                className="fill-white/55"
                style={{
                  fontSize: 12,
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

      {/* The diagram scales to about a third on a phone, which puts its type
          under 5px. Same information, read as a list instead. */}
      <ul className="border-t border-[color:var(--color-rule-dark)] lg:hidden">
        {EDGES.map((e) => (
          <li
            key={`${e.a}-${e.b}`}
            className="border-b border-[color:var(--color-rule-dark)] py-4"
          >
            <p className="text-[15px] leading-snug">
              <span className="font-medium text-[color:var(--color-chalk)]">
                {byId(e.a).label}
              </span>{" "}
              <span className="text-[color:var(--color-ios-2)]">{e.label}</span>{" "}
              <span className="font-medium text-[color:var(--color-chalk)]">
                {byId(e.b).label}
              </span>
            </p>
            <p className="num mt-1.5 text-[12.5px] text-[color:var(--color-chalk-3)]">{e.from}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-[color:var(--color-chalk-3)]">
        Every inference traces back to a document in the file. All of it is
        listed in plain English on the case screen, and anything it should not
        have kept, you can swipe away and it forgets.
      </p>
    </div>
  );
}
