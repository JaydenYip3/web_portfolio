import { Reveal } from "@/components/effects/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";

/** Achievements, each on a banner like a felled boss. */
export function Feats() {
  const { feats, sections } = portfolio;

  return (
    <Section id="feats" copy={sections.feats}>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        {feats.map((feat, i) => (
          <Reveal key={feat.title} as="article" className="feat px-6 py-9 text-center sm:px-10" delay={i * 90}>
            <p className="font-display text-[11px] tracking-[0.32em] text-ash uppercase">
              {feat.event} · {feat.date}
            </p>
            <h3 className="text-gilded mt-3 font-display text-2xl font-semibold tracking-[0.06em] uppercase text-balance sm:text-[1.75rem]">
              {feat.title}
            </h3>
            <p className="mx-auto mt-3 max-w-md text-parchment/80">{feat.description}</p>
            {feat.href && (
              <a
                href={feat.href}
                target="_blank"
                rel="noreferrer"
                className="link-gold mt-4 inline-block font-display text-[11px] tracking-[0.3em] uppercase"
              >
                Inspect
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
