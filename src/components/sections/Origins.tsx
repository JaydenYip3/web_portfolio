import { Reveal } from "@/components/effects/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";

/** Education. */
export function Origins() {
  const { education, sections } = portfolio;

  return (
    <Section id="origins" copy={sections.origins}>
      <div className="mx-auto grid max-w-4xl gap-6">
        {education.map((school, i) => (
          <Reveal
            key={`${school.institution}-${school.period}`}
            as="article"
            className="panel grid gap-x-8 gap-y-4 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-8"
            delay={i * 90}
          >
            <div>
              <h3 className="font-display text-xl text-parchment sm:text-2xl">{school.institution}</h3>
              <p className="mt-1 text-lg text-gold-200 italic">{school.degree}</p>
            </div>
            <div className="sm:text-right">
              <p className="font-display text-xs tracking-[0.3em] text-gold-300 uppercase">{school.period}</p>
              {school.location && <p className="mt-1 text-[15px] text-ash">{school.location}</p>}
            </div>
            {school.details.length > 0 && (
              <ul className="space-y-2 sm:col-span-2">
                {school.details.map((detail) => (
                  <li key={detail} className="diamond-bullet text-parchment/85">
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
