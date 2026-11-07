import type { CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/effects/Reveal";
import { Section } from "@/components/ui/Section";
import { Sigil } from "@/components/ui/Sigil";
import { portfolio } from "@/data/portfolio";

/** About: a character sheet. Portrait and status rows on the left, biography and attributes on the right. */
export function Status() {
  const { profile, status, sections } = portfolio;

  return (
    <Section id="status" copy={sections.status}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
        <Reveal className="panel p-5 sm:p-6">
          <div className="portrait relative aspect-4/3 overflow-hidden sm:aspect-16/10 lg:aspect-4/5">
            {profile.portrait ? (
              <Image
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="grid size-full place-items-center">
                <Sigil strokeWidth={1.3} className="size-1/2 text-gold-400/45" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/50 to-transparent px-5 pt-16 pb-5">
              <p className="font-display text-xl text-gold-100">{profile.name}</p>
              <p className="mt-1 font-display text-[11px] tracking-[0.3em] text-ash uppercase">{profile.title}</p>
            </div>
          </div>

          <dl className="mt-4 divide-y divide-gold-400/10">
            {status.rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                <dt>
                  <span className="font-display text-xs tracking-[0.22em] text-ash uppercase">{row.label}</span>
                  {row.note && <span className="block text-sm text-smoke italic">{row.note}</span>}
                </dt>
                <dd className="text-right font-display text-lg text-parchment">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="panel p-6 sm:p-8" delay={120}>
          <h3 className="panel-heading">Biography</h3>
          <div className="mt-5 space-y-4 text-lg text-parchment/90">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <h3 className="panel-heading mt-10">Attributes</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {status.attributes.map((attribute, i) => (
              <li key={attribute.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-sm tracking-[0.18em] text-parchment uppercase">
                    {attribute.name}
                  </span>
                  <span className="font-display text-lg text-gold-100">{attribute.value}</span>
                </div>
                <p className="text-[15px] text-ash italic">{attribute.meaning}</p>
                <div className="mt-2 h-[3px] bg-gold-400/10">
                  <div
                    className="bar-fill h-full"
                    style={
                      {
                        width: `${(Math.min(99, Math.max(1, attribute.value)) / 99) * 100}%`,
                        "--delay": `${200 + i * 70}ms`,
                      } as CSSProperties
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
