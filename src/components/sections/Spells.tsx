import { Reveal } from "@/components/effects/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";

/** Skills, grouped into schools of magic. */
export function Spells() {
  const { skills, sections } = portfolio;

  return (
    <Section id="spells" copy={sections.spells}>
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.school} className="panel p-6 sm:p-7" delay={i * 90}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-xl text-gold-100 sm:text-2xl">{group.school}</h3>
              <p className="font-display text-[11px] tracking-[0.3em] text-ash uppercase">{group.category}</p>
            </div>
            <div className="hairline mt-4" aria-hidden />
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <li key={skill} className="spell">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
