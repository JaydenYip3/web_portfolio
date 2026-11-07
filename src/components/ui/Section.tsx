import type { ReactNode } from "react";
import { Reveal } from "@/components/effects/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { cn } from "@/lib/cn";
import type { SectionCopy, SectionId } from "@/types/portfolio";

interface SectionProps {
  id: SectionId;
  copy: SectionCopy;
  className?: string;
  children: ReactNode;
}

/** A titled page section: plain-language caption, gilded title, ornament, then content. */
export function Section({ id, copy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">{copy.caption}</p>
          <h2
            id={`${id}-title`}
            className="text-gilded mt-4 font-display text-4xl font-semibold tracking-[0.06em] text-balance sm:text-5xl"
          >
            {copy.title}
          </h2>
          <Ornament className="mt-6" />
          {copy.description && (
            <p className="mx-auto mt-6 max-w-xl text-lg italic text-ash text-pretty">{copy.description}</p>
          )}
        </Reveal>
        <div className="mt-14 sm:mt-20">{children}</div>
      </div>
    </section>
  );
}
