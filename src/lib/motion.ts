import { portfolio } from "@/data/portfolio";

/**
 * Whether every animation plays regardless of the operating system's reduced-motion
 * setting: always when `effects.respectReducedMotion` is false, and otherwise only in
 * the `?intro=1` (opening + animations) and `?motion=1` (animations) previews.
 */
export function forceMotion() {
  if (!portfolio.effects.respectReducedMotion) return true;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("intro") === "1" || params.get("motion") === "1";
  } catch {
    return false;
  }
}

export function prefersReducedMotion() {
  return !forceMotion() && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
