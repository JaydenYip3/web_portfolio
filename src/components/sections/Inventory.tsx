"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ItemIcon } from "@/components/ui/ItemIcon";
import { cn } from "@/lib/cn";
import type { Project, Rarity } from "@/types/portfolio";

const RARITY: Record<Rarity, string> = {
  common: "Armament",
  rare: "Rare Armament",
  legendary: "Legendary Armament",
};

const COLUMNS = 4;

/** Projects as an inventory: a grid of item slots and a detail panel for the selected one. */
export function Inventory({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const slots = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();
  const item = projects[selected];
  const totalSlots = Math.max(COLUMNS * 2, Math.ceil((projects.length + 1) / COLUMNS) * COLUMNS);

  const select = (index: number) => {
    setSelected(index);
    slots.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = projects.length - 1;
    const target: Record<string, number> = {
      ArrowLeft: selected === 0 ? last : selected - 1,
      ArrowRight: selected === last ? 0 : selected + 1,
      ArrowUp: selected - COLUMNS >= 0 ? selected - COLUMNS : selected,
      ArrowDown: selected + COLUMNS <= last ? selected + COLUMNS : selected,
      Home: 0,
      End: last,
    };
    if (!(e.key in target)) return;
    e.preventDefault();
    select(target[e.key]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
      <div className="panel self-start p-5 sm:p-6">
        <div className="flex items-center justify-between font-display text-[11px] tracking-[0.3em] text-ash uppercase">
          <span>Equipment</span>
          <span>
            {selected + 1} / {projects.length}
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Projects"
          className="mt-4 grid grid-cols-4 gap-2 sm:gap-3"
          onKeyDown={onKeyDown}
        >
          {projects.map((project, i) => (
            <button
              key={project.name}
              ref={(el) => {
                slots.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === selected}
              aria-controls={`${id}-panel`}
              tabIndex={i === selected ? 0 : -1}
              className="slot"
              data-rarity={project.rarity}
              onClick={() => setSelected(i)}
            >
              <ItemIcon name={project.icon} className="size-3/5" />
              <span className="sr-only">{project.name}</span>
            </button>
          ))}
          {Array.from({ length: totalSlots - projects.length }, (_, i) => (
            <div key={i} className="slot slot-empty" aria-hidden />
          ))}
        </div>

        <p className="mt-5 truncate text-center font-display text-sm tracking-[0.2em] text-gold-100 uppercase">
          {item.name}
        </p>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${selected}`}
        tabIndex={0}
        className="panel p-6 sm:p-8"
      >
        <div key={selected} className="item-detail">
          <div className="flex items-center gap-5">
            <div className="slot pointer-events-none size-20 shrink-0 sm:size-24" data-rarity={item.rarity} aria-hidden>
              <ItemIcon name={item.icon} className="size-3/5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-gilded font-display text-2xl font-semibold sm:text-3xl">{item.name}</h3>
              <p className="mt-1 font-display text-[11px] tracking-[0.3em] text-ash uppercase">{item.type}</p>
              <p className={cn("mt-1 text-[15px] italic", item.rarity === "common" ? "text-smoke" : "rarity-text")} data-rarity={item.rarity}>
                {RARITY[item.rarity]}
              </p>
            </div>
          </div>

          {item.image && (
            <div className="relative mt-6 aspect-video overflow-hidden border border-gold-400/15">
              <Image
                src={item.image}
                alt={`Screenshot of ${item.name}`}
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <dl className="mt-7 space-y-6">
            {item.effect && (
              <div>
                <dt className="panel-heading">Passive Effect</dt>
                <dd className="mt-2.5 text-lg text-gold-100">{item.effect}</dd>
              </div>
            )}
            {item.tech.length > 0 && (
              <div>
                <dt className="panel-heading">Forged With</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>

          <p className="mt-7 text-parchment/90">{item.description}</p>
          {item.lore && <p className="mt-4 text-ash italic">{item.lore}</p>}

          {item.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {item.links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("btn", i === 0 ? "btn-primary" : "btn-ghost")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
