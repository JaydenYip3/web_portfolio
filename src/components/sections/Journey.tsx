import { GraceBanner } from "@/components/effects/GraceBanner";
import { Reveal } from "@/components/effects/Reveal";
import { Section } from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";

/** Experience as a path of Sites of Grace; each one kindles as it scrolls into view. */
export function Journey() {
  const { experience, sections, effects } = portfolio;

  return (
    <Section id="journey" copy={sections.journey}>
      <ol className="relative mx-auto max-w-5xl">
        <span className="journey-line" aria-hidden />
        {experience.map((job) => (
          <Reveal
            as="li"
            key={`${job.company}-${job.period}`}
            className="relative grid gap-4 pb-14 pl-12 last:pb-0 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-20 md:pl-0"
          >
            <span className="grace-node" aria-hidden>
              <span />
            </span>

            <div className="md:pt-6 md:text-right">
              <p className="font-display text-xs tracking-[0.3em] text-gold-300 uppercase">{job.period}</p>
              {job.location && <p className="mt-1 text-[15px] text-ash">{job.location}</p>}
              {job.lore && <p className="mt-3 hidden text-smoke italic md:block">“{job.lore}”</p>}
            </div>

            <article className="panel p-6 sm:p-7">
              <h3 className="font-display text-xl text-parchment sm:text-2xl">{job.role}</h3>
              <p className="mt-1.5 font-display text-sm tracking-[0.18em] text-gold-200 uppercase">
                {job.companyUrl ? (
                  <a href={job.companyUrl} target="_blank" rel="noreferrer" className="link-gold">
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </p>
              <p className="mt-4 text-parchment/85">{job.summary}</p>
              {job.highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="diamond-bullet text-parchment/85">
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              {job.tech.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {job.tech.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </ol>
      {effects.graceBanner && <GraceBanner targetId="journey" text={effects.graceBanner} />}
    </Section>
  );
}
