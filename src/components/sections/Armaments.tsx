import { Reveal } from "@/components/effects/Reveal";
import { Inventory } from "@/components/sections/Inventory";
import { Section } from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";

export function Armaments() {
  const { projects, sections } = portfolio;

  return (
    <Section id="armaments" copy={sections.armaments}>
      <Reveal>
        <Inventory projects={projects} />
      </Reveal>
    </Section>
  );
}
