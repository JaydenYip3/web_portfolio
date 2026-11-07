import type { ReactNode } from "react";
import { Embers } from "@/components/effects/Embers";
import { OpeningCinematic } from "@/components/intro/OpeningCinematic";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Armaments } from "@/components/sections/Armaments";
import { Feats } from "@/components/sections/Feats";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Origins } from "@/components/sections/Origins";
import { Spells } from "@/components/sections/Spells";
import { Status } from "@/components/sections/Status";
import { Summon } from "@/components/sections/Summon";
import { portfolio } from "@/data/portfolio";
import type { SectionId } from "@/types/portfolio";

// Page order. Sections with no entries in src/data/portfolio.ts are left out, nav link included.
const SECTIONS: { id: SectionId; Component: () => ReactNode; hasContent: boolean }[] = [
  { id: "status", Component: Status, hasContent: true },
  { id: "journey", Component: Journey, hasContent: portfolio.experience.length > 0 },
  { id: "armaments", Component: Armaments, hasContent: portfolio.projects.length > 0 },
  { id: "spells", Component: Spells, hasContent: portfolio.skills.length > 0 },
  { id: "feats", Component: Feats, hasContent: portfolio.feats.length > 0 },
  { id: "origins", Component: Origins, hasContent: portfolio.education.length > 0 },
  { id: "summon", Component: Summon, hasContent: true },
];

export default function Home() {
  const { profile, intro, effects, sections } = portfolio;
  const visible = SECTIONS.filter((section) => section.hasContent);

  return (
    <>
      <OpeningCinematic config={intro} name={profile.name} title={profile.title} />

      <div id="site">
        <Nav name={profile.name} items={visible.map(({ id }) => ({ id, label: sections[id].nav }))} />
        <main>
          <Hero />
          {visible.map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </main>
        <Footer name={profile.name} />
      </div>

      {effects.embers && <Embers className="pointer-events-none fixed inset-0 z-30 size-full" />}
    </>
  );
}
