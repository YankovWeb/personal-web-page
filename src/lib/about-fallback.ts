import type { Experience, Profile, Skill } from "@/lib/types";

export interface AboutHighlightExperience extends Experience {
  location?: string;
  highlights: string[];
  storyBridge?: string;
  badge?: string;
}

export const aboutProfileFallback: Partial<Profile> = {
  name: "Grigor Yankov",
  title: "Senior React & React Native Engineer | AI-Forward Development",
  bio: "Senior Software Engineer with extensive commercial experience building scalable web and cross-platform mobile applications. I specialize in the complete React ecosystem, modern React Native architecture, monorepos, and AI-forward development — using agents like Cursor and Claude Code as engineering multipliers while keeping DDD and architectural integrity front and center.",
  location: "Sofia, Bulgaria",
  email: "YankovWeb@outlook.com",
  linkedin_url: "https://linkedin.com/in/g-yankov",
};

export const aboutExperiencesFallback: AboutHighlightExperience[] = [
  {
    id: "exp-moxx",
    company: "MOXX Advertising",
    role: "Web Developer",
    location: "Sofia, Bulgaria / Remote",
    start_date: "2021-07-01",
    end_date: "2023-04-01",
    current: false,
    sort_order: 1,
    created_at: "",
    description: null,
    highlights: [
      "Engineered and launched an internal React Native MVP dashboard for tracking website health metrics and marketing KPIs on the go.",
      "Built and maintained web applications with interactive frontends, custom WordPress components, and Puppeteer automation workflows.",
    ],
    storyBridge:
      "That first shipping rhythm — from MVP to production — set the foundation for everything that followed: owning the full stack of a feature, not just a screen.",
  },
  {
    id: "exp-step",
    company: "STEP IT Academy",
    role: "Lecturer in Software Development",
    location: "Sofia, Bulgaria",
    start_date: "2023-01-01",
    end_date: null,
    current: true,
    sort_order: 2,
    created_at: "",
    description: null,
    badge: "Part-time · Ongoing",
    highlights: [
      "Develop and deliver curricula focused on React.js, JavaScript, ES6+, AJAX, HTML, and CSS.",
      "Mentor students in classroom and online settings, preparing them for modern engineering roles.",
      "Evaluate progress with constructive feedback and targeted technical support.",
    ],
    storyBridge:
      "Teaching forced me to distill complex ideas into clarity — a skill that later shaped internal tech-talks, code reviews, and team standards in enterprise environments.",
  },
  {
    id: "exp-baybridge",
    company: "BayBridgeDigital | Salesforce Summit Partner",
    role: "Mid / React Native Developer",
    location: "Sofia, Bulgaria / Hybrid",
    start_date: "2023-06-01",
    end_date: "2025-05-01",
    current: false,
    sort_order: 3,
    created_at: "",
    description: null,
    badge: "Promoted to Mid-Level within 8 months",
    highlights: [
      "Core developer on Bayes Retail — a premium Salesforce AppExchange omni-channel commerce clienteling solution for Fast Retailing (Princess Tam Tam, Comptoir des Cotonniers).",
      "Replaced legacy lists with @shopify/flash-list, rewrote critical UI with react-native-reanimated, and architected an aggressive data-caching layer.",
      "Authored custom Native Modules bridging system-level capabilities; managed CI/CD and App Store / Play Store delivery for multi-tenant apps.",
      "Established internal tech-talks and knowledge-sharing; earned written recommendations from VP, Product Manager, and Team Lead.",
    ],
    storyBridge:
      "Enterprise retail at global scale taught me performance engineering under pressure — the bridge to my next challenge: migrating real users off legacy native codebases.",
  },
  {
    id: "exp-inoreader",
    company: "Inoreader",
    role: "Senior Software Engineer",
    location: "Bulgaria / Remote",
    start_date: "2025-05-01",
    end_date: "2026-02-01",
    current: false,
    sort_order: 4,
    created_at: "",
    description: null,
    highlights: [
      "Spearheaded migration of legacy Objective-C (iOS) and Java (Android) apps into a unified high-performance React Native codebase.",
      "Built custom Native Modules for background syncing and massive RSS stream parsing with platform performance parity.",
      "Engineered secure session migration via native keychain storage — users kept authenticated sessions without re-login.",
      "Created a cross-platform Design System from scratch; owned end-to-end App Store and Google Play releases.",
      "Leveraged AI coding agents (Cursor, Claude Code) for velocity while maintaining structural integrity and code validation.",
    ],
  },
];

export const aboutSkillsFallback: Skill[] = [
  { id: "s1", name: "React.js & React Native", category: "frontend-mobile", sort_order: 1 },
  { id: "s2", name: "React Native New Architecture", category: "frontend-mobile", sort_order: 2 },
  { id: "s3", name: "Turbo Modules & Nitro Modules", category: "frontend-mobile", sort_order: 3 },
  { id: "s4", name: "TypeScript / JavaScript (ES6+)", category: "frontend-mobile", sort_order: 4 },
  { id: "s5", name: "Expo Ecosystem & Unistyles", category: "frontend-mobile", sort_order: 5 },
  { id: "s6", name: "Redux.js & State Management", category: "frontend-mobile", sort_order: 6 },
  { id: "s7", name: "@shopify/flash-list & Reanimated", category: "frontend-mobile", sort_order: 7 },
  { id: "s8", name: "Cross-platform Development", category: "frontend-mobile", sort_order: 8 },
  { id: "s9", name: "AI-Forward Development", category: "ai-architecture", sort_order: 1 },
  { id: "s10", name: "AI Agents (Claude Code, Cursor)", category: "ai-architecture", sort_order: 2 },
  { id: "s11", name: "GitHub Copilot Optimization", category: "ai-architecture", sort_order: 3 },
  { id: "s12", name: "Domain-Driven Design (DDD)", category: "ai-architecture", sort_order: 4 },
  { id: "s13", name: "Universal App Architecture", category: "ai-architecture", sort_order: 5 },
  { id: "s14", name: "Monorepo Management", category: "ai-architecture", sort_order: 6 },
  { id: "s15", name: "Systems & Fluidity Architecture", category: "ai-architecture", sort_order: 7 },
  { id: "s16", name: "Rigorous Code Validation", category: "ai-architecture", sort_order: 8 },
  { id: "s17", name: "Node.js & Express.js", category: "backend-devops", sort_order: 1 },
  { id: "s25", name: "Next.js (App Router, SSR & API Routes)", category: "backend-devops", sort_order: 2 },
  { id: "s18", name: "RESTful APIs & Integrations", category: "backend-devops", sort_order: 3 },
  { id: "s19", name: "iOS & Android Native Concepts", category: "backend-devops", sort_order: 4 },
  { id: "s20", name: "App Store Connect Deployment", category: "backend-devops", sort_order: 5 },
  { id: "s21", name: "Google Play Console Deployment", category: "backend-devops", sort_order: 6 },
  { id: "s22", name: "Git & Version Control Workflow", category: "backend-devops", sort_order: 7 },
  { id: "s23", name: "Technical Mentorship & Teaching", category: "backend-devops", sort_order: 8 },
  { id: "s24", name: "Agile / Scrum Methodologies", category: "backend-devops", sort_order: 9 },
];

export const skillCategoryLabels: Record<string, string> = {
  "frontend-mobile": "Frontend & Mobile",
  "ai-architecture": "AI-Forward & Architecture",
  "backend-devops": "Backend & DevOps",
};

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  group: "architecture-ai" | "backend-devops";
}

export const aboutCertificationsFallback: Certification[] = [
  {
    id: "c1",
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2026-03",
    group: "architecture-ai",
  },
  {
    id: "c2",
    name: "Salesforce Certified AI Associate",
    issuer: "Salesforce",
    date: "2025-01",
    group: "architecture-ai",
  },
  {
    id: "c3",
    name: "Software Architecture: Domain-Driven Design",
    issuer: "LinkedIn",
    date: "2024-03",
    group: "architecture-ai",
  },
  {
    id: "c4",
    name: "Practical GitHub Copilot",
    issuer: "LinkedIn",
    date: "2024-03",
    group: "architecture-ai",
  },
  {
    id: "c5",
    name: "React Native Ecosystem and Workflow",
    issuer: "LinkedIn",
    date: "2024-03",
    group: "architecture-ai",
  },
  {
    id: "c6",
    name: "React/Next.js — The Complete Guide (Hooks, Router, Redux & Next.js)",
    issuer: "Academind GmbH",
    date: "2023-02",
    group: "backend-devops",
  },
  {
    id: "c7",
    name: "Introduction to iOS Mobile Application Development",
    issuer: "Meta",
    date: "2023-11",
    group: "backend-devops",
  },
];

export const certificationGroupLabels: Record<Certification["group"], string> = {
  "architecture-ai": "Architecture & AI",
  "backend-devops": "Backend & DevOps",
};

export const aboutSummaryShort =
  "Senior engineer building scalable React & React Native products — from enterprise mobile migrations to monorepos and AI-forward delivery with Cursor and Claude Code, always grounded in DDD and solid architecture. I also teach at STEP IT Academy and I'm open to Senior and Lead roles.";

export type RecommendationRelation =
  | "manager"
  | "colleague"
  | "client";

export interface Recommendation {
  id: string;
  name: string;
  title: string;
  relation: RecommendationRelation;
  date: string;
  quote: string;
  featured?: boolean;
}

export const recommendationRelationLabels: Record<
  RecommendationRelation,
  string
> = {
  manager: "Managed Grigor directly",
  colleague: "Worked on the same team",
  client: "Course participant",
};

/** Curated highlights from LinkedIn — leadership + tech leads + peers */
export const aboutRecommendationsFallback: Recommendation[] = [
  {
    id: "rec-michael",
    name: "Michael Zouzou",
    title: "VP, Head of Bayretail",
    relation: "manager",
    date: "2025-04",
    featured: true,
    quote:
      "It has been a pleasure to work with Grigor. He is engaged in his work and possesses amazing hard and soft skills. We will miss him.",
  },
  {
    id: "rec-alexander",
    name: "Alexander Akbashev",
    title:
      "Mobile Technical Lead · React Native, TypeScript, Scalable Architecture",
    relation: "manager",
    date: "2025-04",
    quote:
      "I've had the pleasure of working with Grigor Yankov for the past two years, and I can confidently say he's been a strong asset to our development team. Grigor consistently brought fresh ideas and innovative solutions, helping us tackle complex challenges with creativity and precision. If you're looking for a developer who combines technical skill with a drive for innovation, I highly recommend Grigor.",
  },
  {
    id: "rec-lionel",
    name: "Lionel Jourdan",
    title: "Lead Product Owner — Bayretail Consumer App",
    relation: "manager",
    date: "2025-04",
    quote:
      "I had the pleasure of working with Grigor on my Product, a talented React Native developer who consistently impressed with his deep understanding of the React Native stack. Grigor doesn't just code, he truly masters the technologies he works with. A proactive, collaborative, and skilled developer — I highly recommend Grigor for any React Native project!",
  },
  {
    id: "rec-ben",
    name: "Ben Sagir",
    title: "React-Native Software Engineer · Consumer App Dev Team Lead",
    relation: "colleague",
    date: "2024-02",
    quote:
      "Grigor consistently delivered solutions that were not only innovative but also surpassed expectations. His deep understanding of React Native and willingness to share knowledge made him an invaluable asset. I highly recommend Grigor for any React Native software development role.",
  },
  {
    id: "rec-benjamin",
    name: "Benjamin Attia",
    title: "Real Estate Debt & Equity Advisor — Sate Investment Partners",
    relation: "colleague",
    date: "2025-04",
    quote:
      "I really enjoyed working with Grigor. He was an important part of the team, always in a good mood, making jokes, and keeping the energy up. He's also a great developer, reliable and always ready to help. He brought both good work and good vibes every day.",
  },
];
