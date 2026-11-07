import type { Portfolio } from "@/types/portfolio";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  YOUR PORTFOLIO: everything on the site comes from this one object.
 *
 *  • Replace the placeholder text with your own.
 *  • An empty array hides its section and its nav link (e.g. `feats: []`).
 *  • Images and your résumé go in /public and are referenced as "/file.ext".
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const portfolio: Portfolio = {
  site: {
    title: "Your Name · Software Engineer",
    description:
      "Portfolio of Your Name, a software engineer who builds fast, resilient products for the web.",
    // url: "https://your-domain.com",
  },

  profile: {
    name: "Your Name",
    title: "Software Engineer",
    tagline:
      "I build fast, resilient software for the web, and I never give up on a hard boss.",
    location: "City, Country",
    availability: "Open to new quests",
    bio: [
      "Introduce yourself here. Who are you, what do you build, and what are you best at? Two or three sentences is the sweet spot.",
      "Use a second paragraph for how you work, what you care about, or what you're exploring right now. Keep it human; this is the part people remember.",
    ],
    // portrait: "/portrait.jpg",
    email: "you@example.com",
    // resume: "/resume.pdf",
    socials: [
      { label: "GitHub", href: "https://github.com/your-handle" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
      { label: "X", href: "https://x.com/your-handle" },
    ],
  },

  intro: {
    enabled: true,
    oncePerSession: true,
    narration: [
      "The codebase was once whole. Then came the Shattering.",
      "Monoliths crumbled. Deadlines fell like stars. Builds broke across the Lands Between.",
      "And so one Tarnished arose, guided by grace, to forge something new.",
    ],
    prompt: "Press any button",
  },

  effects: {
    embers: true,
    graceBanner: "Lost Grace Discovered",
    // false: everyone sees the animations, even with "Reduce motion" turned on in their OS.
    // Set to true to switch them off for those visitors.
    respectReducedMotion: false,
  },

  hero: {
    greeting: "Guided by grace",
    primaryCta: "Begin the journey",
    secondaryCta: "Summon me",
  },

  status: {
    rows: [
      { label: "Level", value: "5", note: "years in the field" },
      { label: "Class", value: "Software Engineer" },
      { label: "Origin", value: "City, Country" },
      { label: "Runes Held", value: "24", note: "projects shipped" },
      { label: "Great Runes", value: "3", note: "certifications" },
    ],
    // Rename `meaning` to whatever each attribute stands for. Values run 1–99.
    attributes: [
      { name: "Vigor", meaning: "Resilience & debugging", value: 42 },
      { name: "Mind", meaning: "Problem solving", value: 48 },
      { name: "Endurance", meaning: "Shipping under pressure", value: 36 },
      { name: "Strength", meaning: "Backend & systems", value: 45 },
      { name: "Dexterity", meaning: "Frontend & UI craft", value: 60 },
      { name: "Intelligence", meaning: "Algorithms & data", value: 52 },
      { name: "Faith", meaning: "Teamwork & communication", value: 40 },
      { name: "Arcane", meaning: "Creative experiments", value: 27 },
    ],
  },

  experience: [
    {
      role: "Senior Software Engineer",
      company: "Company Name",
      companyUrl: "https://example.com",
      period: "2023 — Present",
      location: "Remote",
      lore: "Where the greatest battles were fought.",
      summary:
        "One or two sentences on the team, the product, and what you owned. Lead with the problem you solved, not the tools you used.",
      highlights: [
        "Quantified win: shipped X, which raised Y by Z%.",
        "Led the migration from A to B, cutting build times by 60%.",
        "Mentored N engineers and introduced a review practice the team kept.",
      ],
      tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
    },
    {
      role: "Software Engineer",
      company: "Another Company",
      companyUrl: "https://example.com",
      period: "2021 — 2023",
      location: "City, Country",
      lore: "The roundtable of many trials.",
      summary:
        "Describe the scope of your work here. What did you build, who used it, and what changed because of it?",
      highlights: [
        "Built the feature that did the thing, used by N people a day.",
        "Reduced p95 latency from 800ms to 120ms by reworking the data layer.",
      ],
      tech: ["Python", "Django", "Redis", "Docker"],
    },
    {
      role: "Software Engineering Intern",
      company: "First Company",
      period: "Summer 2020",
      location: "City, Country",
      lore: "The first step.",
      summary:
        "Your first site of grace. What did you learn, and what did you ship before the summer ended?",
      highlights: ["Shipped an internal tool that saved the team hours every week."],
      tech: ["JavaScript", "Vue", "Firebase"],
    },
  ],

  projects: [
    {
      name: "Ashen Ledger",
      type: "Full-Stack Web App",
      icon: "sword",
      rarity: "legendary",
      description:
        "Replace this with a real project: what it does, who it's for, and what made it technically interesting.",
      effect: "Serves 10k monthly users at 99.9% uptime.",
      lore: "Forged over a single sleepless weekend, it has not dulled since.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      links: [
        { label: "Visit", href: "https://example.com" },
        { label: "Source", href: "https://github.com/your-handle/project" },
      ],
    },
    {
      name: "Runebound CLI",
      type: "Developer Tool",
      icon: "tome",
      rarity: "rare",
      description:
        "A command-line tool that does one thing very well. Describe the problem it solves in a sentence.",
      effect: "Cut a 20-minute chore down to 5 seconds.",
      lore: "A tome of incantations, recited from the terminal.",
      tech: ["Go", "Cobra", "GitHub Actions"],
      links: [{ label: "Source", href: "https://github.com/your-handle/project" }],
    },
    {
      name: "Grace Atlas",
      type: "Data Visualization",
      icon: "lantern",
      rarity: "rare",
      description:
        "An interactive map or dashboard. Mention the dataset, the scale, and the insight it reveals.",
      effect: "Featured in a newsletter with 50k readers.",
      lore: "It lights the way for those who wander.",
      tech: ["D3.js", "React", "Python"],
      links: [{ label: "Visit", href: "https://example.com" }],
    },
    {
      name: "Sentinel",
      type: "Mobile App",
      icon: "shield",
      rarity: "common",
      description:
        "A mobile app you built end to end. Note the platform, your role, and one hard problem you cracked.",
      effect: "4.8★ average across 300 reviews.",
      tech: ["React Native", "Expo", "Supabase"],
      links: [{ label: "Source", href: "https://github.com/your-handle/project" }],
    },
    {
      name: "Glintstone Model",
      type: "Machine Learning",
      icon: "staff",
      rarity: "common",
      description:
        "A model, experiment, or research project. What did you train, on what, and how well did it do?",
      effect: "92% accuracy on a held-out test set.",
      tech: ["PyTorch", "FastAPI", "Hugging Face"],
      links: [{ label: "Paper", href: "https://example.com" }],
    },
    {
      name: "Open Source Talisman",
      type: "Open Source Library",
      icon: "talisman",
      rarity: "common",
      description:
        "A library or a meaningful contribution to someone else's. Link the PRs you're proud of.",
      effect: "1.2k GitHub stars · 40 contributors.",
      tech: ["TypeScript", "Rollup", "Vitest"],
      links: [{ label: "Source", href: "https://github.com/your-handle/project" }],
    },
  ],

  skills: [
    {
      school: "Sorceries",
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
    },
    {
      school: "Incantations",
      category: "Frameworks & Libraries",
      skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "Django"],
    },
    {
      school: "Talismans",
      category: "Tools & Platforms",
      skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "Linux"],
    },
    {
      school: "Ashes of War",
      category: "Practices",
      skills: ["System design", "Testing", "CI/CD", "Accessibility", "Code review"],
    },
  ],

  feats: [
    {
      title: "Hackathon Champion",
      event: "Hackathon Name",
      date: "2025",
      description: "What you built in 36 hours, and what you won for it.",
      href: "https://example.com",
    },
    {
      title: "Conference Speaker",
      event: "Conference or Meetup",
      date: "2024",
      description: "The talk you gave and the idea at its core.",
    },
    {
      title: "Certified Cloud Practitioner",
      event: "Certifying Body",
      date: "2023",
      description: "Any certification, award, scholarship, or publication worth a banner.",
    },
    {
      title: "Open Source Maintainer",
      event: "Project Name",
      date: "2022 — Present",
      description: "Recognition from a community you contribute to.",
    },
  ],

  education: [
    {
      institution: "University Name",
      degree: "B.S. in Computer Science",
      period: "2017 — 2021",
      location: "City, Country",
      details: [
        "Relevant coursework: Algorithms, Distributed Systems, Human-Computer Interaction.",
        "Honors, GPA, thesis, clubs, or teaching assistant roles.",
      ],
    },
  ],

  contact: {
    blurb:
      "Seeking an ally for your next quest? Whether it's a role, a collaboration, or a conversation, place your sign and I'll answer the summons.",
    emailCta: "Summon via email",
    messageTemplates: [
      "Seeking ____",
      "Try ____",
      "____ ahead",
      "Praise the ____",
      "Could this be ____?",
      "If only I had ____...",
    ],
    messageWords: [
      "collaboration",
      "opportunity",
      "hiring",
      "coffee",
      "freelance work",
      "side quests",
      "feedback",
      "mentorship",
    ],
  },

  sections: {
    status: { nav: "Status", title: "The Tarnished", caption: "About" },
    journey: {
      nav: "Journey",
      title: "Sites of Grace",
      caption: "Experience",
      description: "Each place I rested along the way, and what I forged there.",
    },
    armaments: {
      nav: "Armaments",
      title: "Armaments",
      caption: "Projects",
      description: "Select an item to inspect it.",
    },
    spells: { nav: "Spells", title: "Sorceries & Incantations", caption: "Skills" },
    feats: { nav: "Feats", title: "Great Enemies Felled", caption: "Achievements" },
    origins: { nav: "Origins", title: "Origins", caption: "Education" },
    summon: { nav: "Summon", title: "Summoning Pool", caption: "Contact" },
  },
};
