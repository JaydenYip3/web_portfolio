import { ridgePath } from "@/lib/ridges";

const W = 1600;
const H = 600;

// The far ridge sits at the very top of the band so it hides the base of the tree.
const far = ridgePath({ seed: 3, width: W, floor: H, base: 72, amplitude: 20, valley: 24 });
const mid = ridgePath({ seed: 21, width: W, floor: H, base: 200, amplitude: 46, valley: 120, roughness: 0.5 });
const near = ridgePath({ seed: 8, width: W, floor: H, base: 360, amplitude: 36, valley: 100, roughness: 0.6 });

/** Layered mountain silhouettes for the hero horizon, stretched to fill a horizontal band. */
export function Ridges({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2216" />
          <stop offset="0.5" stopColor="#15110c" />
        </linearGradient>
        <linearGradient id="ridge-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9b46a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#d9b46a" stopOpacity="0.07" />
          <stop offset="1" stopColor="#d9b46a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ridge-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0806" />
          <stop offset="1" stopColor="#0b0a08" />
        </linearGradient>
      </defs>
      <path d={far} fill="url(#ridge-far)" />
      <path
        d={far}
        fill="none"
        stroke="#e2bf72"
        strokeOpacity="0.28"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <rect x="0" y="70" width={W} height="200" fill="url(#ridge-mist)" />
      <path d={mid} fill="#0f0c09" />
      <path d={near} fill="url(#ridge-near)" />
    </svg>
  );
}
