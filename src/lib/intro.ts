import { prefersReducedMotion } from "@/lib/motion";
import type { IntroConfig } from "@/types/portfolio";

export const INTRO_SEEN_KEY = "tarnished:intro-seen";

export type IntroMode = "play" | "skip";

/**
 * Decides whether the opening cinematic plays. `?intro=1` forces it, with full
 * motion (see lib/motion.ts), and `?intro=0` skips it (handy for links you send out).
 * `?motion=1` lifts reduced motion without forcing the intro.
 *
 * Keep in sync with `introScript` below, which makes the same call before first paint.
 */
export function decideIntro({ enabled, oncePerSession }: IntroConfig): IntroMode {
  try {
    const param = new URLSearchParams(window.location.search).get("intro");
    if (param === "1") return "play";
    if (param === "0" || !enabled) return "skip";
    if (prefersReducedMotion()) return "skip";
    if (oncePerSession && sessionStorage.getItem(INTRO_SEEN_KEY)) return "skip";
    return "play";
  } catch {
    return "skip";
  }
}

/**
 * Inline <head> script. It tags <html> with `data-intro` while the document is
 * still parsing, so visitors who skip the intro never see the overlay flash and
 * visitors who get it never see the page underneath first. In preview mode
 * (`?intro=1` or `?motion=1`), or when the site ignores reduced motion, it also
 * sets `data-motion="full"`, which lifts the reduced-motion CSS.
 */
export function introScript({ enabled, oncePerSession }: IntroConfig, respectReducedMotion: boolean) {
  const key = JSON.stringify(INTRO_SEEN_KEY);
  return `(function(){var m="skip",f=false;try{var q=new URLSearchParams(location.search),p=q.get("intro");f=${!respectReducedMotion}||p==="1"||q.get("motion")==="1";if(p==="1")m="play";else if(p!=="0"&&${enabled}&&(f||!matchMedia("(prefers-reduced-motion: reduce)").matches)&&!(${oncePerSession}&&sessionStorage.getItem(${key})))m="play"}catch(e){}var d=document.documentElement;d.setAttribute("data-intro",m==="play"?"playing":"skipped");if(f)d.setAttribute("data-motion","full")})()`;
}
