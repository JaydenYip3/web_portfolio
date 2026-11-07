import { Reveal } from "@/components/effects/Reveal";
import { MessageComposer } from "@/components/sections/MessageComposer";
import { Section } from "@/components/ui/Section";
import { Sigil } from "@/components/ui/Sigil";
import { portfolio } from "@/data/portfolio";

/** Contact: a glowing summon sign, email, socials, and the message composer. */
export function Summon() {
  const { profile, contact, sections } = portfolio;
  const showComposer = contact.messageTemplates.length > 0 && contact.messageWords.length > 0;

  return (
    <Section id="summon" copy={sections.summon}>
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="summon-sign" aria-hidden>
            <Sigil strokeWidth={2.2} className="summon-sigil" />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-xl text-parchment/85 italic text-pretty">{contact.blurb}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {contact.emailCta}
            </a>
            {profile.resume && (
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Résumé
              </a>
            )}
          </div>
          {profile.socials.length > 0 && (
            <ul className="mt-8 flex flex-wrap justify-center gap-1">
              {profile.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noreferrer" className="menu-link px-4 py-2">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {showComposer && (
          <Reveal className="mt-16" delay={100}>
            <MessageComposer email={profile.email} templates={contact.messageTemplates} words={contact.messageWords} />
          </Reveal>
        )}
      </div>
    </Section>
  );
}
