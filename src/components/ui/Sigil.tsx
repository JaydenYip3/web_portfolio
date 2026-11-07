import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { r1 } from "@/lib/random";

const point = (r: number, degrees: number) => {
  const a = (degrees * Math.PI) / 180;
  return `${r1(Math.sin(a) * r)} ${r1(-Math.cos(a) * r)}`;
};
const arc = (r: number, from: number, to: number) =>
  `M${point(r, from)}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${point(r, to)}`;
const ring = (r: number, cy = 0) =>
  `M0 ${cy - r}A${r} ${r} 0 1 1 0 ${cy + r}A${r} ${r} 0 1 1 0 ${cy - r}`;

/** Drawn in this order when animated. */
const STROKES = [
  "M0 -87V92",
  ring(50),
  ring(33, -17),
  ring(11, 33),
  arc(78, -22, 48),
  arc(81, 56, 116),
  arc(78, 124, 196),
  arc(82, 204, 262),
  arc(78, 270, 330),
];

/** Splinters flying off the broken outer ring, and the diamond crowning the axis. */
const FLOURISHES = [
  [52, 120, 200, 266, 334].map((a) => `M${point(87, a)}L${point(94, a)}`).join(""),
  "M0 -101L5 -94L0 -87L-5 -94Z",
];

interface SigilProps {
  className?: string;
  /** Stroke width in viewBox units (the emblem is ~200 units across). */
  strokeWidth?: number;
  /** Draws itself stroke by stroke, for the opening title card. */
  animated?: boolean;
}

/** An original "shattered ring" emblem used across the site. */
export function Sigil({ className, strokeWidth = 1.6, animated = false }: SigilProps) {
  return (
    <svg
      viewBox="-104 -104 208 208"
      className={cn(animated && "sigil-draw", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {STROKES.map((d, i) => (
        <path key={d} d={d} pathLength={1} style={{ "--i": i } as CSSProperties} />
      ))}
      {FLOURISHES.map((d) => (
        <path key={d} d={d} className="sigil-flourish" />
      ))}
    </svg>
  );
}
