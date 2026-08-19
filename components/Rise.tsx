"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Entrance. Motion's `whileInView` handles the observer, and `once` keeps it
 * from replaying on scroll-back, repeated animation is what makes a page feel
 * like a demo reel rather than a document.
 */
export function Rise({
  children,
  delay = 0,
  className = "",
  now = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Above the fold: animate on load with CSS instead of waiting for an
      in-view observer, so the hero never sits at opacity 0 while JS boots. */
  now?: boolean;
}) {
  const reduce = useReducedMotion();

  if (now) {
    return (
      <div
        className={`rise-now ${className}`}
        style={{ "--rise-delay": `${delay * 1000}ms` } as React.CSSProperties}
      >
        {children}
      </div>
    );
  }

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
