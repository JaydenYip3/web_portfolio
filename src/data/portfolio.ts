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
    title: "Jayden Yip · Software Engineer",
    description:
      "Portfolio of Jayden Yip, a software engineer and Statistics & Machine Learning student at the University of Toronto.",
    // url: "https://your-domain.com",
  },

  profile: {
    name: "Jayden Yip",
    title: "Software Engineer",
    tagline:
      "I build fast, resilient software for the web, from ad systems serving millions to hackathon platforms for thousands.",
    location: "Toronto, ON",
    availability: "Open to new quests",
    bio: [
      "I'm a Statistics and Machine Learning Specialist student at the University of Toronto. Most recently I was a Software Engineer Intern on the Ads team at Wattpad, where I worked on header bidding, server-side rendering, and ad fraud across a system serving 25M+ daily ad requests.",
      "Outside of work I lead engineering for GenAI Genesis, building the platform that runs applications, judging, and check-in for 5000+ hackers. I like problems where performance, data, and real users meet.",
    ],
    // portrait: "/portrait.jpg",
    email: "jaydenyip33@gmail.com",
    // resume: "/resume.pdf",
    socials: [
      { label: "GitHub", href: "https://github.com/JaydenYip3" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/yip-jayden" },
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
      { label: "Level", value: "4", note: "year at U of T" },
      { label: "Class", value: "Software Engineer" },
      { label: "Origin", value: "Toronto, ON" },
      { label: "Runes Held", value: "25M+", note: "daily ad requests served" },
      { label: "Great Runes", value: "5000+", note: "hackathon applicants supported" },
    ],
    // Rename `meaning` to whatever each attribute stands for. Values run 1–99.
    attributes: [
      { name: "Vigor", meaning: "Resilience & debugging", value: 42 },
      { name: "Mind", meaning: "Problem solving", value: 48 },
      { name: "Endurance", meaning: "Shipping under pressure", value: 36 },
      { name: "Strength", meaning: "Backend & systems", value: 45 },
      { name: "Dexterity", meaning: "Frontend & UI craft", value: 60 },
      { name: "Intelligence", meaning: "Statistics & ML", value: 52 },
      { name: "Faith", meaning: "Teamwork & leadership", value: 40 },
      { name: "Arcane", meaning: "Creative experiments", value: 27 },
    ],
  },

  experience: [
    {
      role: "Software Engineer Intern (Ads)",
      company: "Wattpad",
      companyUrl: "https://www.wattpad.com",
      period: "Aug 2025 — Aug 2026",
      location: "Toronto, ON",
      lore: "Where the greatest battles were fought.",
      summary:
        "Worked on Wattpad's ads platform: header bidding, ad decisioning, and the performance of high-traffic pages serving 25M+ daily ad requests.",
      highlights: [
        "Increased programmatic ad revenue by 80% by integrating new SSPs and ad exchanges into the prebid.js header bidding system without increasing auction latency (380ms).",
        "Migrated high-traffic browse pages to Remix with server-side rendering and parallel data fetching, cutting URLs rated “Poor” in Core Web Vitals by 87% (~1.6M URLs), mainly by eliminating CLS and LCP issues.",
        "Reduced fraudulent ad requests by 10% with server-side validation through DoubleVerify and by gating scripts behind Cloudflare's bot detection.",
        "Scoped and prototyped moving the ad decisioning server (5.2M+ daily impressions) from Kevel to Google Ad Manager, letting prebid.js auction alongside GAM's server-side demand.",
        "Deployed language caching on AWS with S3 and CloudFront across 20+ languages, cutting translation fetch latency by 50%+, and shipped 40+ updates to internal eventing and ads platform packages via CodeArtifact.",
      ],
      tech: ["TypeScript", "Remix", "prebid.js", "AWS", "Cloudflare", "Datadog"],
    },
    {
      role: "Engineering Lead",
      company: "GenAI Genesis",
      companyUrl: "https://genaigenesis.ca",
      period: "Sep 2026 — Present",
      location: "Toronto, ON",
      lore: "The roundtable of many trials.",
      summary:
        "Leading the engineering team behind GenAI Genesis's hackathon platform.",
      highlights: [
        "Leading a team of 4 to build and maintain a full-stack hackathon platform with Next.js and Supabase, designing the architecture to support 5000+ applicants across application submission, judging, and real-time check-in.",
      ],
      tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    },
    {
      role: "Software Engineer",
      company: "GenAI Genesis",
      companyUrl: "https://genaigenesis.ca",
      period: "Sep 2024 — Sep 2026",
      location: "Toronto, ON",
      summary:
        "Built the internal systems behind admissions, data access, and judging for the GenAI Genesis hackathon.",
      highlights: [
        "Developed and managed an internal admissions system, using SQL to randomly distribute applications across 25 reviewers, balancing workloads and minimizing reviewer bias.",
        "Architected a centralized Data Access Layer across 20+ Postgres tables, enforcing server-side-only access via server actions, service role keys, and Row Level Security policies.",
        "Engineered a Python scheduling system with pandas to coordinate hybrid assignments for 250+ teams and 50+ judges in a multi-round elimination bracket, with z-score bias correction for judging variance.",
      ],
      tech: ["Next.js", "Supabase", "PostgreSQL", "SQL", "Python", "pandas"],
    },
    {
      role: "Director of Technology",
      company: "Google Developer Group",
      period: "Oct 2024 — Apr 2026",
      location: "Toronto, ON",
      summary:
        "Ran the technology behind U of T's Google Developer Group, from the club web app to its recruiting pipeline.",
      highlights: [
        "Shipped a club management web app with event postings, member opportunities, and user dashboards, built on REST and GraphQL APIs with Firebase for storage, authentication, and authorization.",
        "Reduced resume storage in the club's ATS pipeline by 95% by parsing uploaded PDFs into plain text.",
      ],
      tech: ["React", "GraphQL", "REST", "Firebase"],
    },
    {
      role: "VP of Operations",
      company: "Data Science and Statistics Society (DS3)",
      period: "Sep 2024 — Apr 2026",
      location: "Toronto, ON",
      lore: "The first step.",
      summary:
        "Ran operations for U of T's data science and statistics society.",
      highlights: [
        "Led a team of 5 to organize events engaging 1000+ students, including Databricks partnerships and ML boot camps, and raised $3000+ to host a 200+ student hackathon.",
      ],
      tech: [],
    },
  ],

  projects: [],

  skills: [
    {
      school: "Sorceries",
      category: "Languages",
      skills: [
        "TypeScript",
        "JavaScript",
        "Python",
        "SQL",
        "GraphQL",
        "Go",
        "Java",
        "C/C++",
        "R",
        "Lua",
        "HTML/CSS",
      ],
    },
    {
      school: "Incantations",
      category: "Frameworks & Libraries",
      skills: ["React", "Next.js", "Remix", "Node.js", "FastAPI", "Flask", "pandas", "prebid.js"],
    },
    {
      school: "Talismans",
      category: "Tools & Infrastructure",
      skills: [
        "AWS (S3, CloudFront, Lambda, CodeArtifact)",
        "Docker",
        "Git",
        "Supabase",
        "Firebase",
        "Datadog",
      ],
    },
  ],

  feats: [],

  education: [
    {
      institution: "University of Toronto",
      degree: "B.Sc. in Statistics, Machine Learning Specialist",
      period: "Sep 2023 — May 2028 (expected)",
      location: "Toronto, ON",
      details: [
        "Relevant coursework: Software Design, Databases & Web Applications, Theory of Computation, Numerical Algorithms, Linear Algebra, Differential Equations, Probability & Statistics, Stochastic Processes.",
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
