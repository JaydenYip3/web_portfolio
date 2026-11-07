import { r1, seededRandom } from "./random";

interface RidgeOptions {
  seed: number;
  width: number;
  /** y of the bottom edge the silhouette is closed against. */
  floor: number;
  /** Average y of the ridge line. */
  base: number;
  amplitude: number;
  /** Raises the ridge toward both edges, framing the centre like a valley. */
  valley?: number;
  roughness?: number;
}

/** A mountain silhouette made by midpoint displacement, closed down to `floor`. */
export function ridgePath({ seed, width, floor, base, amplitude, valley = 0, roughness = 0.55 }: RidgeOptions) {
  const rand = seededRandom(seed);
  const n = 128;
  const heights = new Array<number>(n + 1).fill(0);
  heights[0] = rand() * 2 - 1;
  heights[n] = rand() * 2 - 1;
  for (let step = n, scale = 1; step > 1; step /= 2, scale *= roughness) {
    const half = step / 2;
    for (let i = half; i < n; i += step) {
      heights[i] = (heights[i - half] + heights[i + half]) / 2 + (rand() * 2 - 1) * scale;
    }
  }

  let d = `M0 ${floor}`;
  heights.forEach((h, i) => {
    const t = i / n;
    const rise = valley * ((t - 0.5) * 2) ** 2;
    d += `L${r1(t * width)} ${r1(base - h * amplitude - rise)}`;
  });
  return `${d}L${width} ${floor}Z`;
}
