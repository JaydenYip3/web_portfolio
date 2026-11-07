"use client";

import { useEffect, useState } from "react";

interface GraceBannerProps {
  /** Section whose arrival triggers the banner. */
  targetId: string;
  text: string;
}

/** The "Lost Grace Discovered" banner, shown once when the target section first scrolls into view. */
export function GraceBanner({ targetId, text }: GraceBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setVisible(true);
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 4200);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-1/2 z-50 -translate-y-1/2" role="status">
      <div className="grace-banner flex min-h-28 items-center justify-center py-6 sm:min-h-32">
        <p className="grace-banner-text text-gilded px-6 text-center font-display text-xl font-semibold uppercase text-balance sm:text-4xl">
          {text}
        </p>
      </div>
    </div>
  );
}
