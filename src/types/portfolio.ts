/**
 * The content model for the whole site. Every section renders from the object
 * exported by `src/data/portfolio.ts` — fill that in and the components follow.
 */

/** Glyphs available for project inventory slots. */
export type ItemIcon =
  | "sword"
  | "staff"
  | "shield"
  | "tome"
  | "talisman"
  | "flask"
  | "lantern"
  | "crown";

/** Tints a project's inventory slot: ash grey, sapphire, or gold. */
export type Rarity = "common" | "rare" | "legendary";

export interface NamedLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  /** Your "starting class": the job title shown under your name. */
  title: string;
  /** One line under the title in the hero. */
  tagline: string;
  location: string;
  /** Glowing status line in the hero, e.g. "Open to new quests". Omit to hide. */
  availability?: string;
  /** Paragraphs for the About ("Status") section. */
  bio: string[];
  /** Image in /public, e.g. "/portrait.jpg". Without one, an emblem is shown. */
  portrait?: string;
  email: string;
  /** PDF in /public, e.g. "/resume.pdf". Omit to hide the résumé buttons. */
  resume?: string;
  socials: NamedLink[];
}

export interface IntroConfig {
  /** Set to false to remove the opening cinematic entirely. */
  enabled: boolean;
  /** true: play once per browser tab. false: play on every page load. */
  oncePerSession: boolean;
  /** Narration shown line by line before the title card. Three or four short lines is plenty. */
  narration: string[];
  /** The blinking prompt on the title card. */
  prompt: string;
}

export interface HeroCopy {
  /** Small line above your name. */
  greeting: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface StatusRow {
  label: string;
  value: string;
  /** Plain-language hint under the label, e.g. "years of experience". */
  note?: string;
}

export interface Attribute {
  /** The in-world name, e.g. "Vigor". */
  name: string;
  /** What it stands for on your résumé, e.g. "Backend & Systems". */
  meaning: string;
  /** 1–99, like the real thing. */
  value: number;
}

export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  /** Free text, e.g. "Jan 2023 — Present" or "Summer 2021". */
  period: string;
  location?: string;
  /** Optional flavour line shown in italics beside the entry. */
  lore?: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  name: string;
  /** Category line, e.g. "Full-Stack Web App". */
  type: string;
  icon: ItemIcon;
  rarity: Rarity;
  description: string;
  /** The headline result, shown as the item's "Passive Effect". */
  effect?: string;
  /** Flavour text shown in italics, like an item description. */
  lore?: string;
  tech: string[];
  links: NamedLink[];
  /** Optional screenshot in /public, e.g. "/projects/my-app.png" (16:9 works best). */
  image?: string;
}

export interface SkillGroup {
  /** Thematic name, e.g. "Sorceries". */
  school: string;
  /** Plain-language category, e.g. "Languages". */
  category: string;
  skills: string[];
}

export interface Feat {
  title: string;
  event: string;
  date: string;
  description: string;
  href?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  details: string[];
}

export interface ContactCopy {
  blurb: string;
  emailCta: string;
  /** In-game style message builder. Use ____ where the chosen word goes. */
  messageTemplates: string[];
  messageWords: string[];
}

export type SectionId =
  | "status"
  | "journey"
  | "armaments"
  | "spells"
  | "feats"
  | "origins"
  | "summon";

export interface SectionCopy {
  /** Label in the navigation bar. */
  nav: string;
  /** Large thematic heading. */
  title: string;
  /** Small plain-language caption above the heading, so visitors know where they are. */
  caption: string;
  /** Optional line under the heading. */
  description?: string;
}

export interface Portfolio {
  site: {
    title: string;
    description: string;
    /** Your deployed URL, used for social-card metadata. */
    url?: string;
  };
  profile: Profile;
  intro: IntroConfig;
  effects: {
    /** Drifting golden embers across the page. */
    embers: boolean;
    /** "Lost Grace Discovered" banner the first time the Journey section scrolls into view. */
    graceBanner: string | false;
    /**
     * `true` turns the opening, embers and animations off for visitors whose
     * operating system asks for reduced motion. `false` plays them for everyone.
     */
    respectReducedMotion: boolean;
  };
  hero: HeroCopy;
  status: {
    rows: StatusRow[];
    attributes: Attribute[];
  };
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  feats: Feat[];
  education: Education[];
  contact: ContactCopy;
  sections: Record<SectionId, SectionCopy>;
}
