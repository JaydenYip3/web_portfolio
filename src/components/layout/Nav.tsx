"use client";

import { useEffect, useState } from "react";
import { Sigil } from "@/components/ui/Sigil";
import { cn } from "@/lib/cn";

interface NavProps {
  name: string;
  items: { id: string; label: string }[];
}

/** Fixed top bar with scroll-spy highlighting and a full-screen menu on small screens. */
export function Nav({ name, items }: NavProps) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid backdrop once the page leaves the very top.
  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Highlight whichever section crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target;
          if (entry.isIntersecting) setActive(id);
          // Scrolled back above the first section: nothing is current.
          else if (entry.boundingClientRect.top > 0) setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of items) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  // The full-screen menu locks scrolling and closes on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.dataset.menu = "open";
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      delete root.dataset.menu;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <div id="nav-sentinel" className="pointer-events-none absolute inset-x-0 top-0 h-6" aria-hidden />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-gold-400/15 bg-abyss/80 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <Sigil strokeWidth={7} className="size-7 text-gold-300 transition-colors group-hover:text-gold-100" />
            <span className="font-display text-[13px] tracking-[0.28em] text-parchment uppercase transition-colors group-hover:text-gold-100">
              {name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="menu-link px-3 py-2"
                  aria-current={active === item.id ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="flex items-center gap-3 px-1 py-2 font-display text-[11px] tracking-[0.35em] text-ash uppercase transition-colors hover:text-gold-100 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
            <span className="relative block h-2.5 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
                  open && "translate-y-[4.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300",
                  open && "-translate-y-[4.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-30 bg-abyss/95 pt-16 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-2 pb-16">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="menu-link px-10 py-3 text-base"
                aria-current={active === item.id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
