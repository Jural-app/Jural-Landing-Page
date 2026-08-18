"use client";

import { useState } from "react";

/**
 * The matter's knowledge graph, drawn live.
 *
 * Hovering or focusing a node isolates what Jural has inferred about it —
 * which makes the "it knows the file" claim inspectable instead of asserted.
 */

type Node = { id: string; label: string; kind: string; x: number; y: number };

const NODES: Node[] = [
  { id: "chen", label: "Ada Chen", kind: "Client", x: 176, y: 96 },
  { id: "whit", label: "Whitfield Ltd", kind: "Opposing party", x: 470, y: 92 },
  { id: "reyes", label: "M. Reyes", kind: "Opposing counsel", x: 610, y: 236 },
  { id: "inv", label: "Invoice · 12 Nov", kind: "Document", x: 300, y: 250 },
  { id: "lim", label: "14 Nov 2028", kind: "Limitation date", x: 118, y: 268 },
  { id: "hear", label: "Directions hearing", kind: "Event · 4 Mar", x: 452, y: 348 },
];

const EDGES: { a: string; b: string; label: string }[] = [
  { a: "chen", b: "whit", label: "claims against" },
  { a: "whit", b: "reyes", label: "represented by" },
  { a: "chen", b: "inv", label: "relies on" },
  { a: "inv", b: "whit", label: "issued to" },
  { a: "chen", b: "lim", label: "must file by" },
  { a: "whit", b: "hear", label: "must attend" },
  { a: "reyes", b: "hear", label: "appearing at" },
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

export function Graph() {
  const [hot, setHot] = useState<string | null>(null);

  const isLive = (e: { a: string; b: string }) => !hot || e.a === hot || e.b === hot;
  const nodeLive = (id: string) =>
    !hot || id === hot || EDGES.some((e) => (e.a === hot && e.b === id) || (e.b === hot && e.a === id));

  return (
    <div>
      <svg
        viewBox="0 0 740 430"
        className="w-full"
        role="img"
        aria-label="Knowledge graph for the Chen matter: Ada Chen claims against Whitfield Ltd, who are represented by M. Reyes; the 12 November invoice is relied on by Chen and was issued to Whitfield; Chen must file by 14 November 2028; Whitfield and Reyes are appearing at the directions hearing on 4 March."
      >
        {/* edges */}
        {EDGES.map((e) => {
          const a = byId(e.a);
          const b = byId(e.b);
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const live = isLive(e);
          return (
            <g key={`${e.a}-${e.b}`} style={{ opacity: live ? 1 : 0.12, transition: "opacity .3s" }}>
              {/* Drawn statically. Animating pathLength from 0 looks nice but
                  leaves every edge invisible if the animation never runs —
                  and an edgeless graph is just a scatter of dots. The entrance
                  is handled by the section fade instead. */}
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={hot && live ? "var(--color-ios)" : "rgba(255,255,255,.22)"}
                strokeWidth={hot && live ? 1.6 : 1}
                style={{ transition: "stroke .25s, stroke-width .25s" }}
              />
              {live && hot && (
                <text
                  x={mx}
                  y={my - 6}
                  textAnchor="middle"
                  className="fill-white/55"
                  style={{ fontSize: 10.5, fontFamily: "var(--font-mono)", letterSpacing: ".04em" }}
                >
                  {e.label}
                </text>
              )}
            </g>
          );
        })}

        {/* nodes */}
        {NODES.map((n) => {
          const live = nodeLive(n.id);
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={`${n.label}, ${n.kind}`}
              onMouseEnter={() => setHot(n.id)}
              onMouseLeave={() => setHot(null)}
              onFocus={() => setHot(n.id)}
              onBlur={() => setHot(null)}
              style={{ cursor: "pointer", opacity: live ? 1 : 0.2, transition: "opacity .3s" }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={hot === n.id ? 9 : 6}
                fill={hot === n.id ? "var(--color-ios)" : "#fff"}
                style={{ transition: "r .2s" }}
              />
              {hot === n.id && (
                <circle cx={n.x} cy={n.y} r={17} fill="none" stroke="var(--color-ios)" strokeWidth="1" opacity=".45" />
              )}
              <text
                x={n.x}
                y={n.y + 28}
                textAnchor="middle"
                className="fill-white"
                style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-.01em" }}
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={n.y + 44}
                textAnchor="middle"
                className="fill-white/60"
                style={{ fontSize: 10.5, fontFamily: "var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase" }}
              >
                {n.kind}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mono mt-2 text-center text-[color:var(--color-chalk-3)]">
        {hot ? "Inferred from your documents — swipe to forget" : "Hover a party to see what Jural inferred"}
      </p>
    </div>
  );
}
