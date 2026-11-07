import { r1, seededRandom } from "./random";

/**
 * A golden world-tree, grown procedurally from a fixed seed.
 * Coordinates: the trunk stands at x = 0 with its base on y = 0; the crown grows into negative y.
 */
export interface TreeArt {
  viewBox: string;
  width: number;
  height: number;
  /** Highest point of the crown (a negative y), for gradients. */
  top: number;
  /** Braided trunk strands and roots. */
  trunk: { d: string; width: number }[];
  /** Branch paths grouped by depth; index 0 is the thickest. */
  branches: { d: string; width: number }[];
  /** Leaves as zero-length round-capped strokes, grouped by size. */
  leaves: { d: string; size: number; opacity: number }[];
  /** Root-to-tip paths (a trunk strand, then one branch per depth) for light to travel along. */
  veins: string[];
  /** A subset of the leaves, split into groups that twinkle out of step. */
  sparkles: string[];
}

const FORK_Y = -250;
const MAX_DEPTH = 5;
const BRANCH_WIDTHS = [5, 3.2, 2.1, 1.4, 1, 0.7];
const SPARKLE_GROUPS = 4;
const LEAF_SIZES = [
  { size: 2.2, opacity: 0.95 },
  { size: 3.4, opacity: 0.75 },
  { size: 5, opacity: 0.45 },
];

function generateTree(seed: number): TreeArt {
  const rand = seededRandom(seed);
  const between = (min: number, max: number) => min + (max - min) * rand();

  const layers: string[][] = BRANCH_WIDTHS.map(() => []);
  const leafLayers: string[][] = LEAF_SIZES.map(() => []);
  const sparkleGroups: string[][] = Array.from({ length: SPARKLE_GROUPS }, () => []);
  let leafCount = 0;
  let halfWidth = 0;
  let top = 0;

  const extend = (x: number, y: number) => {
    halfWidth = Math.max(halfWidth, Math.abs(x));
    top = Math.min(top, y);
  };

  const leaf = (x: number, y: number) => {
    const d = `M${r1(x)} ${r1(y)}h0`;
    leafLayers[Math.floor(rand() * LEAF_SIZES.length)].push(d);
    // Every third leaf also sparkles; chosen by count so the tree's shape stays the same.
    if (leafCount % 3 === 0) sparkleGroups[(leafCount / 3) % SPARKLE_GROUPS].push(d);
    leafCount++;
    extend(x, y);
  };

  /** Draws a branch and its children; returns the relative path from here out to one tip. */
  const grow = (x: number, y: number, angle: number, length: number, depth: number): string => {
    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;
    const bend = between(-0.16, 0.16) * length;
    const cx = (x + x2) / 2 - Math.sin(angle) * bend;
    const cy = (y + y2) / 2 + Math.cos(angle) * bend;
    const segment = `q${r1(cx - x)} ${r1(cy - y)} ${r1(x2 - x)} ${r1(y2 - y)}`;
    layers[depth].push(`M${r1(x)} ${r1(y)}${segment}`);
    extend(x2, y2);

    if (depth >= MAX_DEPTH - 1) {
      const count = depth === MAX_DEPTH ? 1 + Math.floor(rand() * 3) : rand() < 0.4 ? 1 : 0;
      for (let i = 0; i < count; i++) leaf(x2 + between(-14, 14), y2 + between(-12, 10));
    }
    if (depth === MAX_DEPTH) return segment;

    const children = rand() < 0.28 ? 3 : 2;
    let vein = "";
    for (let i = 0; i < children; i++) {
      const spread = between(0.26, 0.52);
      const offset = children === 2 ? (i === 0 ? -spread : spread) : (i - 1) * spread * 1.1;
      // Keep the crown a wide dome: branches may droop a little but never point at the ground.
      const next = Math.min(0.32, Math.max(-Math.PI - 0.32, angle + offset + between(-0.08, 0.08)));
      const tip = grow(x2, y2, next, length * between(0.7, 0.82), depth + 1);
      if (i === depth % children) vein = tip;
    }
    return segment + vein;
  };

  const crown = [-166, -142, -118, -98, -82, -62, -38, -14].map((degrees) => {
    const x = between(-6, 6);
    return `L${r1(x)} ${FORK_Y}${grow(x, FORK_Y, (degrees * Math.PI) / 180, between(135, 180), 0)}`;
  });

  // Braided trunk: strands cross over one another on the way up to the fork.
  const trunk: TreeArt["trunk"] = [];
  const strands = 9;
  for (let i = 0; i < strands; i++) {
    const t = i / (strands - 1) - 0.5;
    const baseX = t * 160 + between(-8, 8);
    const topX = t * 24;
    const twist = (i % 2 ? 1 : -1) * between(24, 42);
    trunk.push({
      d: `M${r1(baseX)} 0C${r1(baseX * 0.3 + twist)} ${r1(FORK_Y * 0.35)} ${r1(topX - twist)} ${r1(FORK_Y * 0.72)} ${r1(topX)} ${FORK_Y}`,
      width: r1(between(2.4, 4.4)),
    });
  }
  for (let i = 0; i < 8; i++) {
    const side = i % 2 ? 1 : -1;
    const start = side * between(20, 75);
    const reach = side * between(90, 230);
    trunk.push({
      d: `M${r1(start)} -4q${r1(reach * 0.5)} ${r1(between(-4, 4))} ${r1(reach)} ${r1(between(6, 18))}`,
      width: r1(between(1.4, 2.8)),
    });
    extend(start + reach, 0);
  }

  const half = Math.ceil(halfWidth + 24);
  const height = Math.ceil(-top + 24 + 24);
  return {
    viewBox: `${-half} ${Math.floor(top - 24)} ${half * 2} ${height}`,
    width: half * 2,
    height,
    top: Math.floor(top),
    trunk,
    branches: layers.map((paths, depth) => ({ d: paths.join(""), width: BRANCH_WIDTHS[depth] })),
    leaves: leafLayers.map((paths, i) => ({ d: paths.join(""), ...LEAF_SIZES[i] })),
    // Strands run left to right like the primary branches; skip the middle one so each branch gets a neighbour.
    veins: crown.map((path, i) => trunk[i < strands >> 1 ? i : i + 1].d + path),
    sparkles: sparkleGroups.map((paths) => paths.join("")),
  };
}

let cached: TreeArt | undefined;

export function getTree(): TreeArt {
  cached ??= generateTree(1337);
  return cached;
}
