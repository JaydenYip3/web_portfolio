"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface Ember {
  x: number;
  y: number;
  size: number;
  rise: number;
  drift: number;
  sway: number;
  swaySpeed: number;
  flickerSpeed: number;
  phase: number;
  alpha: number;
}

interface EmbersProps {
  className?: string;
  /** Roughly embers per 100k px² of screen. */
  density?: number;
  /** Upper bound regardless of screen size. */
  max?: number;
}

/** Golden motes drifting upward. A single canvas; does nothing under reduced motion. */
export function Embers({ className, density = 3, max = 70 }: EmbersProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || prefersReducedMotion()) return;

    // One soft glow sprite, stamped for every ember (far cheaper than shadowBlur).
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sctx = sprite.getContext("2d");
    if (!sctx) return;
    const glow = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    glow.addColorStop(0, "rgba(255, 246, 214, 1)");
    glow.addColorStop(0.12, "rgba(255, 220, 140, 0.95)");
    glow.addColorStop(0.35, "rgba(232, 168, 72, 0.32)");
    glow.addColorStop(1, "rgba(232, 168, 72, 0)");
    sctx.fillStyle = glow;
    sctx.fillRect(0, 0, 64, 64);

    let width = 0;
    let height = 0;
    let embers: Ember[] = [];

    const spawn = (ember: Ember, anywhere: boolean) => {
      ember.x = Math.random() * width;
      ember.y = anywhere ? Math.random() * height : height + 20 + Math.random() * 60;
      ember.size = 4 + Math.random() ** 2 * 14;
      ember.rise = 10 + Math.random() * 26;
      ember.drift = (Math.random() - 0.5) * 8;
      ember.sway = 6 + Math.random() * 18;
      ember.swaySpeed = 0.3 + Math.random() * 0.8;
      ember.flickerSpeed = 1 + Math.random() * 3;
      ember.phase = Math.random() * Math.PI * 2;
      ember.alpha = 0.35 + Math.random() * 0.6;
      return ember;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(max, Math.round(((width * height) / 100_000) * density));
      embers = embers.slice(0, count);
      while (embers.length < count) embers.push(spawn({} as Ember, true));
    };

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const e of embers) {
        e.y -= e.rise * dt;
        e.x += (e.drift + Math.cos(t * e.swaySpeed + e.phase) * e.sway) * dt;
        if (e.y < -30 || e.x < -30 || e.x > width + 30) spawn(e, false);
        // Fade in from the bottom edge and out toward the top, flickering as they go.
        const life = Math.min(1, (height + 40 - e.y) / 160) * Math.min(1, (e.y + 30) / (height * 0.35));
        const flicker = 0.55 + 0.45 * Math.sin(t * e.flickerSpeed + e.phase);
        ctx.globalAlpha = Math.max(0, e.alpha * flicker * life);
        ctx.drawImage(sprite, e.x - e.size / 2, e.y - e.size / 2, e.size, e.size);
      }
      frame = requestAnimationFrame(tick);
    };

    resize();
    frame = requestAnimationFrame(tick);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [density, max]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
