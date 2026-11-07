import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { getTree } from "@/lib/tree";

// When each vein's pulse first sets off (an order that hops around the crown) and how often it repeats.
const VEIN_ORDER = [3, 6, 1, 7, 0, 4, 2, 5];
const vein = (i: number) =>
  ({
    "--vein-delay": `${3.2 + VEIN_ORDER[i % VEIN_ORDER.length] * 1.15}s`,
    "--vein-duration": `${8.5 + (i % 3) * 1.6}s`,
  }) as CSSProperties;
const sparkle = (i: number) =>
  ({
    "--twinkle-delay": `${3 + i * 0.9}s`,
    "--twinkle-duration": `${3.6 + ((i * 7) % 4) * 0.8}s`,
  }) as CSSProperties;

/**
 * The golden tree on the hero horizon, generated at build time. It grows out from
 * its roots, then light rises through its veins and the leaves twinkle. The
 * moving light lives on its own layer so the blurred tree is only painted once.
 */
export function ErdTree({ className }: { className?: string }) {
  const tree = getTree();
  const reach = Math.hypot(tree.width / 2, tree.top) * 1.15;

  return (
    <div className={cn("erdtree", className)} style={{ aspectRatio: `${tree.width} / ${tree.height}` }} aria-hidden>
      <svg viewBox={tree.viewBox} preserveAspectRatio="xMidYMax meet" className="absolute inset-0 size-full" fill="none">
        <defs>
          <linearGradient
            id="erdtree-gold"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={tree.top}
          >
            <stop offset="0" stopColor="#7a5c27" />
            <stop offset="0.3" stopColor="#d9b25f" />
            <stop offset="0.7" stopColor="#f4d996" />
            <stop offset="1" stopColor="#fff3cf" />
          </linearGradient>
          <filter id="erdtree-bloom" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          {/* Growth: a soft-edged disc centred on the roots widens until the whole tree shows. */}
          <radialGradient id="erdtree-grow-fade">
            <stop offset="0.78" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="erdtree-grow">
            <circle className="erdtree-grow" r={Math.round(reach)} fill="url(#erdtree-grow-fade)" />
          </mask>
          <g id="erdtree-structure" strokeLinecap="round">
            <g stroke="url(#erdtree-gold)">
              {tree.trunk.map((strand, i) => (
                <path key={i} d={strand.d} strokeWidth={strand.width} />
              ))}
              {tree.branches.map((layer, i) => (
                <path key={i} d={layer.d} strokeWidth={layer.width} />
              ))}
            </g>
            <g stroke="#ffe7a6">
              {tree.leaves.map((layer, i) => (
                <path key={i} d={layer.d} strokeWidth={layer.size} strokeOpacity={layer.opacity} />
              ))}
            </g>
          </g>
        </defs>

        <g mask="url(#erdtree-grow)">
          <use href="#erdtree-structure" filter="url(#erdtree-bloom)" opacity="0.85" />
          <use href="#erdtree-structure" />
        </g>
      </svg>

      <svg
        viewBox={tree.viewBox}
        preserveAspectRatio="xMidYMax meet"
        className="erdtree-life absolute inset-0 size-full"
        fill="none"
        strokeLinecap="round"
      >
        <g stroke="#fff1c4">
          {tree.veins.map((d, i) => (
            <g key={i} className="erdtree-vein" style={vein(i)}>
              <path d={d} pathLength={1} strokeWidth={10} strokeOpacity={0.3} />
              <path d={d} pathLength={1} strokeWidth={3} />
            </g>
          ))}
        </g>
        {tree.sparkles.map((d, i) => (
          <g key={i} className="erdtree-sparkle" style={sparkle(i)}>
            <path d={d} stroke="#ffd98a" strokeWidth={11} strokeOpacity={0.2} />
            <path d={d} stroke="#fffaf0" strokeWidth={3.4} />
          </g>
        ))}
      </svg>
    </div>
  );
}
