/**
 * Small seeded PRNG (mulberry32). The generated artwork must render identically
 * on every build, so it never touches Math.random.
 */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Rounds to one decimal place to keep generated SVG paths compact. */
export const r1 = (n: number) => Math.round(n * 10) / 10;
