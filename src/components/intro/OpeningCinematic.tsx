"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Embers } from "@/components/effects/Embers";
import { Sigil } from "@/components/ui/Sigil";
import { decideIntro, INTRO_SEEN_KEY, type IntroMode } from "@/lib/intro";
import { forceMotion } from "@/lib/motion";
import type { IntroConfig } from "@/types/portfolio";

type Phase = "narration" | "title" | "leaving" | "done";

// Decided once per page load, so finishing the intro (which writes sessionStorage)
// can't flip the answer mid-animation.
let decided: IntroMode | undefined;
const getMode = (config: IntroConfig) => (decided ??= decideIntro(config));
const subscribe = () => () => {};
const getServerMode = () => undefined;

// Narration pacing: a beat of darkness, then each line holds long enough to read.
const FIRST_LINE_AT = 700;
const LINE_GAP = 1100;
const lineDuration = (text: string) => Math.min(4800, Math.max(2400, 1200 + text.length * 32));

interface OpeningCinematicProps {
  config: IntroConfig;
  name: string;
  title: string;
}

/**
 * The opening: narration fades in and out over drifting embers, the sigil draws
 * itself, your name rises, and the page waits for any button.
 */
export function OpeningCinematic({ config, name, title }: OpeningCinematicProps) {
  const mode = useSyncExternalStore(subscribe, () => getMode(config), getServerMode);
  const [phase, setPhase] = useState<Phase>("narration");
  const [line, setLine] = useState(-1);
  const lastAdvance = useRef(0);

  const playing = mode === "play" && (phase === "narration" || phase === "title");

  // <html data-intro> drives the scroll lock and the hero's entrance (and data-motion,
  // the ?intro=1 preview). The inline head script sets them before first paint; this
  // keeps them current, and restores them after React's development-mode remount
  // clears attributes on <html>.
  useLayoutEffect(() => {
    if (!mode) return;
    const root = document.documentElement;
    root.dataset.intro = mode === "skip" ? "skipped" : playing ? "playing" : "done";
    if (forceMotion()) root.dataset.motion = "full";
  }, [mode, playing]);

  // Keep keyboard focus and screen readers inside the overlay while it plays.
  useEffect(() => {
    const site = document.getElementById("site");
    if (!site || !playing) return;
    site.inert = true;
    return () => {
      site.inert = false;
    };
  }, [playing]);

  // Narration timeline: each line fades in, holds long enough to read, fades out.
  useEffect(() => {
    if (mode !== "play" || phase !== "narration") return;
    const timers: number[] = [];
    let at = FIRST_LINE_AT;
    config.narration.forEach((text, i) => {
      timers.push(window.setTimeout(() => setLine(i), at));
      at += lineDuration(text);
      timers.push(window.setTimeout(() => setLine(-1), at));
      at += LINE_GAP;
    });
    timers.push(window.setTimeout(() => setPhase("title"), at));
    return () => timers.forEach(clearTimeout);
  }, [mode, phase, config.narration]);

  // Remember the visit, then unmount once the fade-out has finished.
  useEffect(() => {
    if (phase !== "leaving") return;
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Storage can be unavailable (private mode); the intro just plays again next time.
    }
    const timer = window.setTimeout(() => setPhase("done"), 1700);
    return () => clearTimeout(timer);
  }, [phase]);

  // "Any button": skips the narration, then dismisses the title card.
  const advance = useCallback(() => {
    const now = performance.now();
    if (now - lastAdvance.current < 700) return;
    lastAdvance.current = now;
    setPhase((p) => (p === "narration" ? "title" : p === "title" ? "leaving" : p));
  }, []);

  useEffect(() => {
    if (!playing) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key === "Tab" || e.key === "Shift") return;
      const onSkip = e.target instanceof Element && e.target.closest("[data-intro-skip]");
      if (onSkip && (e.key === "Enter" || e.key === " ")) return;
      e.preventDefault();
      advance();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [playing, advance]);

  if (mode === "skip" || phase === "done") return null;

  const titleCard = phase !== "narration";

  return (
    <div
      className="intro-overlay fixed inset-0 z-100 cursor-pointer overflow-hidden bg-void select-none"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label="Opening"
      onClick={advance}
    >
      {mode === "play" && <Embers className="absolute inset-0 size-full" density={5} max={90} />}
      <div className="intro-vignette absolute inset-0" aria-hidden />

      <div className="absolute inset-0 grid place-items-center px-6" aria-live="polite">
        {config.narration.map((text, i) => (
          <p
            key={i}
            className="intro-line col-start-1 row-start-1 max-w-3xl text-center font-body text-2xl leading-relaxed text-parchment italic text-balance sm:text-3xl"
            data-active={line === i || undefined}
            aria-hidden={line !== i}
          >
            {text}
          </p>
        ))}
      </div>

      {titleCard && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-16 text-center">
          <div className="relative">
            <div className="intro-sigil-glow absolute inset-0" aria-hidden />
            <Sigil animated strokeWidth={1.1} className="relative size-40 text-gold-200 sm:size-52" />
          </div>
          <p className="intro-name text-gilded mt-10 font-display text-4xl font-semibold sm:text-6xl">
            {name}
          </p>
          <p className="intro-class mt-5 font-display text-xs tracking-[0.5em] text-ash uppercase sm:text-sm">
            {title}
          </p>
          <p className="intro-prompt absolute inset-x-0 bottom-[11%] font-display text-xs tracking-[0.45em] text-gold-100 uppercase sm:text-sm">
            {config.prompt}
          </p>
        </div>
      )}

      {phase === "leaving" && <div className="intro-bloom absolute inset-0" aria-hidden />}

      <button
        type="button"
        data-intro-skip
        className="intro-skip absolute top-5 right-5 px-3 py-2 font-display text-[11px] tracking-[0.35em] text-ash uppercase transition-colors hover:text-gold-100"
        onClick={(e) => {
          e.stopPropagation();
          setPhase("leaving");
        }}
      >
        Skip
      </button>
    </div>
  );
}
