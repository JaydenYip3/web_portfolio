import type { CSSProperties } from "react";
import { ErdTree } from "@/components/art/ErdTree";
import { Ridges } from "@/components/art/Ridges";
import { portfolio } from "@/data/portfolio";

const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

/** The name, one letter at a time, so it can rise and catch the light letter by letter. */
function Letters({ text, start }: { text: string; start: number }) {
  const words = text.split(" ").map((word) => Array.from(word));
  const firstIndex = words.map((_, w) => words.slice(0, w).reduce((n, chars) => n + chars.length, 0));

  return words.map((chars, w) => (
    <span key={w}>
      {w > 0 && " "}
      {/* Words never break mid-letter when the name wraps. */}
      <span className="inline-block whitespace-nowrap">
        {chars.map((char, c) => (
          <span
            key={c}
            className="hero-letter text-gilded"
            style={{ "--i": firstIndex[w] + c, ...delay(start) } as CSSProperties}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  ));
}

/**
 * Title screen: the tree stands on its own stage above the horizon, and the text
 * sits on the dark land below it, so the two never collide at any screen size.
 * The tree grows first; the text follows while its crown fills in.
 */
export function Hero() {
  const { profile, hero } = portfolio;

  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div className="hero-sky absolute inset-0 -z-30" aria-hidden />

      <div className="relative min-h-[38svh] flex-1" aria-hidden>
        <div className="hero-halo absolute top-[6%] left-1/2 -z-20 h-[125%] w-[min(160vw,1500px)] -translate-x-1/2" />
        <ErdTree className="absolute bottom-0 left-1/2 -z-20 h-[84%] max-h-[620px] -translate-x-1/2" />
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 -top-10 -z-10 h-[clamp(220px,32vh,340px)]" aria-hidden>
          <Ridges className="size-full" />
        </div>
        <div className="absolute inset-x-0 top-[calc(clamp(220px,32vh,340px)-2.5rem-1px)] bottom-0 -z-10 bg-abyss" aria-hidden />

        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-10 pb-28 text-center">
          <p className="hero-eyebrow eyebrow" style={delay(0.5)}>
            {hero.greeting}
          </p>
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-[0.08em] sm:text-7xl">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden>
              <Letters text={profile.name} start={0.8} />
            </span>
          </h1>
          <p
            className="hero-title mt-4 font-display text-xs tracking-[0.42em] text-gold-200 uppercase sm:text-sm"
            style={delay(1.6)}
          >
            {profile.title}
          </p>
          <p
            className="hero-blur mt-5 max-w-xl text-lg text-parchment/85 italic text-pretty sm:text-xl"
            style={delay(2)}
          >
            {profile.tagline}
          </p>
          <div className="hero-enter mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4" style={delay(2.4)}>
            <a href="#journey" className="btn btn-primary">
              {hero.primaryCta}
            </a>
            <a href="#summon" className="btn btn-ghost">
              {hero.secondaryCta}
            </a>
          </div>
          <div
            className="hero-enter mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-display text-[11px] tracking-[0.3em] text-ash uppercase"
            style={delay(2.7)}
          >
            <span>{profile.location}</span>
            {profile.availability && (
              <span className="flex items-center gap-2.5 text-gold-100">
                <span className="grace-dot" aria-hidden />
                {profile.availability}
              </span>
            )}
          </div>
        </div>
      </div>

      <a
        href="#status"
        className="hero-enter scroll-cue absolute bottom-5 left-1/2 -translate-x-1/2"
        style={delay(3.4)}
        aria-label="Scroll to the next section"
      />
    </section>
  );
}
