"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

interface RevealProps {
  as?: "div" | "li" | "article";
  className?: string;
  style?: CSSProperties;
  /** Stagger in milliseconds. */
  delay?: number;
  children: ReactNode;
}

/**
 * Fades its children up as they scroll into view. Children can also style
 * themselves off `[data-reveal="hidden"]` (the timeline's graces and the
 * attribute bars do). Anything already on screen at load is never hidden, and
 * without JavaScript everything simply stays visible.
 */
export function Reveal({ as: Tag = "div", className, style, delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      if (el.dataset.reveal) el.dataset.reveal = "shown";
      return;
    }

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement & HTMLLIElement>}
      className={cn("reveal", className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
