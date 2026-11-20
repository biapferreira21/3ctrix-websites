import { storyChapters } from "./about";
import { personalProjects } from "./personalProjects";

export type CvPhoto = { src: string; alt: string; caption: string; width: number; height: number };
export type CvEntry = {
  id: string; title: string; organisation?: string; date?: string; summary: string;
  paragraphs?: string[]; points?: string[]; photos: CvPhoto[];
  links?: { label: string; href: string }[];
};
export type CvChapter = {
  id: string; label: string; title: string; introduction: string;
  color: string; paper: string; photo: CvPhoto; photoEntry: string;
  note: string; entries: CvEntry[];
};

// Reuse the About assets, with CV-specific copy and dates. No duplicated gallery files.
const moments = storyChapters.flatMap((chapter) => chapter.moments);
function photos(...ids: string[]): CvPhoto[] {
  return ids.map((id) => {
    const moment = moments.find((item) => item.id === id);
    if (!moment) throw new Error(`Missing CV photograph: ${id}`);
    return { ...moment.image, caption: id === "my-repsol-product-manager" ? "My Repsol · Consumer app" : moment.caption };
  });
}
function projectPhoto(id: string): CvPhoto[] {
  const image = personalProjects.find((project) => project.id === id)?.image;
  return image ? [image] : [];
}

export const cvContact = {
  name: "Beatriz Pereira Ferreira",
  email: "beatrizferreira2176@gmail.com",
  linkedin: "https://www.linkedin.com/in/beatriz-pereira-ferreira/",
  github: "https://github.com/biapferreira21",
  pdf: "/cv/Beatriz-Ferreira-CV.pdf",
};

const portrait: CvPhoto = { src: "/cv/beatriz.webp", alt: "Portrait of Beatriz Pereira Ferreira.", caption: "Beatriz Pereira Ferreira · Lisbon, Portugal", width: 1046, height: 777 };

export const cvChapters: CvChapter[] = [
  {
    id: "about", label: "About me", title: "Curiosity,\nput to work.",
    introduction: "I’m Beatriz. An applied mathematics graduate who understands stakeholders, breaks down complex problems and builds practical solutions.",
    color: "#285540", paper: "#edf2e5", photo: portrait, photoEntry: "approach",
    note: "Product · Research · Artificial intelligence",
    entries: [
      { id: "approach", title: "From a question to a working solution", organisation: "My approach", summary: "Understand the need. Break down the problem. Investigate, build and learn.", photos: [portrait], paragraphs: ["As Product Manager for My Repsol, I connect stakeholders with developers to turn needs into delivered features. I combine research, critical thinking and hands-on experimentation to improve workflows.", "I’m interested in information theory, AI and how people engage with and retain information online. I enjoy investigating how technology can address problems in the way people work."], links: [{ label: "3ctrix.com/about", href: "/about" }] },
      { id: "focus", title: "Research, product & people", organisation: "Focus & skills", summary: "Research · AI · Product management · Stakeholder engagement", photos: photos("iseg-study-desk"), points: ["Problem-solving and critical thinking", "Stakeholder engagement and product management", "Research, information theory and artificial intelligence", "Workflow improvement and practical experimentation"] },
      { id: "tools", title: "A toolkit that keeps evolving", organisation: "Tools & learning", summary: "Atlassian, Microsoft, Claude Code, OpenAI, Gemini and Figma.", photos: [], points: ["Atlassian and Microsoft tools for product coordination and workflows", "Claude Code, Anthropic tools, OpenAI, Gemini and other AI models", "Figma for product concepts and collaboration", "Completed courses: Excel (6 hours, Skills and Lead), Python (24 hours, School of Python — Magma) and Power BI"] },
      { id: "languages", title: "Across languages", organisation: "Languages", summary: "Portuguese · English · Spanish · French", photos: [], points: ["Portuguese — native", "English — C1", "Spanish — A2", "French — A1, reading only"], paragraphs: ["Eager to learn more languages."] },
    ],
  },
  {
    id: "building", label: "Things I build", title: "Learning\nby building.",
    introduction: "Independent research becomes websites, research platforms, AI experiments and tools I can actually use.",
    color: "#5b4179", paper: "#eee8f4", photo: projectPhoto("alphavote")[0], photoEntry: "alphavote", note: "Independent learning & personal projects",
    entries: [
      { id: "alphavote", title: "AlphaVote", organisation: "Social-network prototype", summary: "Interactive voting cards to explore how information spreads, engages and stays with us.", photos: projectPhoto("alphavote"), paragraphs: ["I built a social-network prototype around interactive voting cards to investigate information propagation, engagement and retention. The aim was to make participation more thoughtful and interactive.", "I integrated Supabase, GitHub Actions, Cloudflare and PostHog, and created marketing videos. This was a learning project, later discontinued."], links: [{ label: "github.com/biapferreira21/alphavote", href: "https://github.com/biapferreira21/alphavote" }] },
      { id: "research-platforms", title: "Websites & research platforms", organisation: "Independent development", summary: "Turning research resources and learning paths into usable digital workspaces.", photos: photos("reading-mathematics"), paragraphs: ["I develop websites and research platforms as a way to learn by solving real problems. My AI Research Roadmap connects university courses, prerequisites and research resources with personal progress, bookmarks and notes."], links: [{ label: "AI Research Roadmap · GitHub", href: "https://github.com/biapferreira21/master-ai-research-roadmap" }, { label: "3ctrix.com", href: "/" }] },
      { id: "agent-harness", title: "An experimental agent harness", organisation: "AI experimentation", summary: "Exploring a framework for creating AI agents and organising their work.", photos: [], paragraphs: ["An independent experiment in how to create and coordinate AI agents. I use projects like this to investigate the tools, understand their limitations and learn through implementation."], links: [{ label: "github.com/biapferreira21", href: cvContact.github }] },
      { id: "taekwondo-app", title: "Alpha TKD Pro", organisation: "Taekwondo training app", summary: "An app inspired by my own practice, with workouts and step-by-step Poomsae.", photos: projectPhoto("alpha-tkd-pro"), points: ["Guided and custom workouts with exercise timers and rests", "Step-by-step Poomsae references", "Offline exercise references and on-device history"], links: [{ label: "Code & README", href: "https://github.com/biapferreira21/tkd-coach-android" }, { label: "Android test release", href: "https://github.com/biapferreira21/tkd-coach-android/releases/latest" }] },
    ],
  },
  {
    id: "product", label: "Product & business", title: "Between people\nand product.",
    introduction: "Connecting what stakeholders need with what a development team can deliver — from the first question to the release.",
    color: "#8b492e", paper: "#f6e9dc", photo: photos("my-repsol-product-manager")[0], photoEntry: "my-repsol", note: "My Repsol · 1M+ downloads in Portugal",
    entries: [
      { id: "my-repsol", title: "Digital Product Manager", organisation: "Repsol · My Repsol app", date: "Sep 2025 — present", summary: "The link between stakeholder needs and the team delivering a consumer app with 1M+ downloads in Portugal.", photos: photos("my-repsol-product-manager", "repsol-trainee-experiences"), paragraphs: ["I turn stakeholder requirements into feature concepts and coordinate delivery with engineering, UX/design and business teams. Recent delivery includes prize draws and the “Stars” feature.", "I present concepts to senior stakeholders and coordinate app and web QA in pre-production and production. My tools include Jira, Confluence and Figma."] },
      { id: "repsol-ai", title: "AI & employee workflows", organisation: "Repsol · Early-stage initiative", summary: "Exploring practical AI adoption with Repsol Portugal’s CEO and HR.", photos: [], paragraphs: ["I’m starting an initiative with Repsol Portugal’s CEO and HR to explore AI adoption and improve employee workflows.", "Alongside product delivery, I’m exploring agents and workflows with Atlassian, Microsoft and Anthropic tools to make better use of the AI capabilities available to the team."] },
      { id: "repsol-pricing", title: "Pricing", organisation: "Repsol", date: "Apr — Sep 2025", summary: "Weekly oil-product pricing strategy and variance analysis.", photos: photos("repsol-joining-trainee-programme", "repsol-university-visit", "repsol-trainee-training"), paragraphs: ["Supported weekly oil-product pricing strategy and variance analysis, developing an understanding of customer-centric commercial strategy in the energy sector."] },
      { id: "3ctrix", title: "Founder", organisation: "3C Trix · Independent practice", summary: "Research, media and tailored tools connecting technology, information and people.", photos: photos("proof-of-talk-founder-pass"), links: [{ label: "3ctrix.com", href: "/" }, { label: "Research portfolio", href: "/research" }] },
    ],
  },
  {
    id: "research", label: "Research & writing", title: "Make the complex\nunderstandable.",
    introduction: "Research into AI, digital assets and financial infrastructure, translated into clear narratives for readers and decision-makers.",
    color: "#28505d", paper: "#e6eff0", photo: photos("stablecoin-insider-year-end")[0], photoEntry: "stablecoin-insider", note: "Analysis · Publications · Emerging technology",
    entries: [
      { id: "big-whale", title: "Research Analyst", organisation: "The Big Whale", date: "Jun 2025 — Feb 2026", summary: "5+ in-depth analyses of AI agents, stablecoins, derivatives regulation and blockchain compliance.", photos: photos("the-big-whale-defi"), paragraphs: ["Published analyses covering stablecoins and AI agents in autonomous commerce, crypto derivatives regulation, blockchain compliance tools including Chainalysis, Elliptic and TRM, Travel Rule frameworks and crypto IPOs.", "Translated technical and regulatory subjects into clear narratives for institutional and retail readers."], links: [{ label: "Research portfolio", href: "/research" }] },
      { id: "stablecoin-insider", title: "Researcher & report co-author", organisation: "Stablecoin Insider", date: "2025 — 2026", summary: "Co-authored the 2025 Stablecoin Year-End Report.", photos: photos("stablecoin-insider-year-end", "stablecoin-insider-credits"), paragraphs: ["Researched stablecoins, tokenisation and traditional-finance adoption, including the implications for digital payments infrastructure."], links: [{ label: "2025 Stablecoin Year-End Report", href: "https://stablecoininsider.org/2025-stablecoin-year-end-report/" }] },
      { id: "the-block", title: "Research Analyst", organisation: "The Block", date: "Oct 2024 — Feb 2025", summary: "Data-driven research on crypto, blockchain, AI and emerging agentic systems.", photos: photos("the-block-emergence"), paragraphs: ["Used institutional data to produce insight-led analysis for a global B2B audience, exploring trends in agentic and autonomous systems."], links: [{ label: "Research portfolio", href: "/research" }] },
    ],
  },
  {
    id: "events", label: "Events & media", title: "Ideas meet\nthe room.",
    introduction: "Connecting research, communities and conversations through content, events and on-site work.",
    color: "#664473", paper: "#f1e8f0", photo: photos("ebc-barcelona-ambassador")[0], photoEntry: "event-content", note: "Barcelona · London · Paris · Prague · Lisbon",
    entries: [
      { id: "event-content", title: "Event Ambassador & Content Lead", organisation: "Technology & digital-asset events", summary: "Marketing, content planning and on-site activation across European events.", photos: photos("ebc-barcelona-ambassador", "proof-of-talk-ambassador", "the-block-emergence", "research-to-events-ebc-daf"), points: ["Emergence — Prague", "European Blockchain Convention — Barcelona", "Digital Asset Forum — London", "Proof of Talk — Paris"], links: [{ label: "DAF research & event publications", href: "https://eblockchainconvention.com/where-institutional-digital-asset-budgets-are-flowing-in-2026/" }] },
      { id: "ai-events", title: "AI event ambassador", organisation: "AI Summit Barcelona · Lisbon AI Week", summary: "Helping connect people and conversations around artificial intelligence.", photos: photos("ai-summit-barcelona-ambassador", "ai-summit-barcelona-founder-pass", "lisbon-ai-week-ambassador"), paragraphs: ["Ambassador for AI Summit Barcelona and Lisbon AI Week." ] },
      { id: "ai-engineer", title: "AI Engineer Code Summit", organisation: "Staff", summary: "Worked as staff; ambassador selection process ongoing.", photos: [], paragraphs: ["Supported the event as a member of staff. The process to become an ambassador is ongoing."] },
      { id: "agentiq", title: "Agentiq World · Berlin", organisation: "Upcoming ambassador role", summary: "An upcoming chapter in the AI event community.", photos: [] },
    ],
  },
  {
    id: "fellowships", label: "Fellowships & communities", title: "A wider\nperspective.",
    introduction: "Learning with people who bring different experiences — in Silicon Valley and in Portugal.",
    color: "#7b4939", paper: "#f4e9df", photo: { ...photos("silicon-valley-fellowship-november-2026")[0], caption: "Silicon Valley Fellowship · programme artwork", alt: "Golden Gate Bridge artwork introducing the Silicon Valley Fellowship." }, photoEntry: "svf", note: "Silicon Valley · Portugal",
    entries: [
      { id: "svf", title: "Silicon Valley Fellowship · Alumna", organisation: "Silicon Valley, California", date: "Nov 2026", summary: "Completed the programme in Silicon Valley. Acceptance rate below 3%.", photos: [{ ...photos("silicon-valley-fellowship-november-2026")[0], caption: "Silicon Valley Fellowship · programme artwork", alt: "Golden Gate Bridge with Silicon Valley Fellowship lettering." }], paragraphs: ["Completed the Silicon Valley Fellowship in November 2026, learning with a cohort from different professional backgrounds.", "Recent programme updates I shared on LinkedIn include visits to Google and Stanford, conversations with founders and a design-thinking session at the University of San Francisco."], links: [{ label: "siliconvalleyfellowship.com", href: "https://www.siliconvalleyfellowship.com/" }, { label: "Recent posts & programme updates · LinkedIn", href: "https://www.linkedin.com/in/beatriz-pereira-ferreira/recent-activity/all/" }] },
      { id: "amcham", title: "AmCham Next Generation", organisation: "Member", date: "Nov 2026 — present", summary: "American Chamber of Commerce programme engaging young people in initiatives.", photos: [], paragraphs: ["Part of the American Chamber of Commerce’s Next Generation programme, bringing young professionals into conversations and initiatives."] },
      { id: "yec", title: "Youth Economic Circle", organisation: "YEC Portugal · Member", date: "Feb 2025 — present", summary: "A community connecting young people with leading Portuguese professionals through dinners.", photos: photos("yec-portugal-sofia-lufinha", "yec-portugal-patricia-barao", "yec-portugal-francisco-jalles-meneses"), links: [{ label: "YEC Portugal · LinkedIn", href: "https://pt.linkedin.com/company/yec-portugal" }] },
    ],
  },
  {
    id: "education", label: "Education", title: "A mathematical\nfoundation.",
    introduction: "Applied mathematics, finance and research shaped how I investigate questions and work through complex problems.",
    color: "#285540", paper: "#edf2e5", photo: photos("iseg-graduation")[0], photoEntry: "masters", note: "ISEG · University of Lisbon",
    entries: [
      { id: "masters", title: "Accounting, Taxation & Corporate Finance", organisation: "ISEG · Master’s degree", date: "Sep 2023 — Jan 2025 · thesis Jun 2025", summary: "Average 17/20 · Thesis 18/20. An Essay on Underpricing in ICOs.", photos: photos("masters-thesis", "iseg-diploma", "iseg-graduation"), paragraphs: ["My thesis, An Essay on Underpricing in ICOs, used event-study analysis of 343 token projects from 2014 to 2024."], links: [{ label: "Dissertation · hdl.handle.net/10400.5/102404", href: "https://hdl.handle.net/10400.5/102404" }, { label: "Read the dissertation PDF", href: "/about/beatriz-ferreira-masters-thesis.pdf" }] },
      { id: "bachelors", title: "Mathematics Applied to Economics & Management", organisation: "ISEG · Bachelor’s degree", date: "Sep 2020 — Jun 2023", summary: "Average 17.06/20 · Honours list · Dean’s List, second-year merit award.", photos: photos("iseg-first-year-2020", "iseg-study-desk", "iseg-exam-studying"), paragraphs: ["Developed problem-solving, critical thinking and a strong work ethic through applied mathematics, economics and management."] },
      { id: "secondary", title: "Secondary education", organisation: "Secondary School of Restelo · Lisbon", date: "Sep 2017 — Jul 2020", summary: "Average 19.1/20 · Merit and excellence awards throughout all three years.", photos: [] },
      { id: "grades", title: "Selected grades", organisation: "All grades out of 20", summary: "Economics, programming, financial markets, accounting and finance.", photos: [], points: ["Economics 1 — 20/20", "Macroeconomics — 20/20", "Financial Markets & Investments — 20/20", "Programming Languages · C++ — 19/20", "Accounting 1 — 19/20", "Auditing — 18/20", "Corporate Finance — 18/20", "Fiscal Management — 18/20", "Alternative Investments — 18/20", "Mathematical Finance — 17/20", "Derivatives — 16/20"] },
    ],
  },
  {
    id: "early-career", label: "Early career & leadership", title: "Learning to\ntake the lead.",
    introduction: "Early professional experience, student leadership and volunteering — different ways of working with people and taking responsibility.",
    color: "#5c497b", paper: "#eeeaf3", photo: photos("iseg-yes")[0], photoEntry: "leadership", note: "Finance · Entrepreneurship · Community",
    entries: [
      { id: "sypar", title: "External Advisor", organisation: "Sypar · First entrepreneurial experience", date: "2024", summary: "Co-authored the Artificial Intelligence Q3 2024 Review.", photos: [], paragraphs: ["Contributed to a review of regulatory and non-regulatory developments in artificial intelligence."] },
      { id: "bnp", title: "Summer Intern & University Ambassador", organisation: "BNP Paribas", date: "Internship Jul 2024 · Ambassador 2023–2024", summary: "Financial controls and banking exposure, alongside university representation.", photos: [], points: ["Summer internship: gained exposure to Financial Controls and Systems and banking operations.", "University ambassador at ISEG: represented BNP Paribas and connected students with the company."] },
      { id: "kpmg", title: "Summer Intern & University Ambassador", organisation: "KPMG", date: "Internship Jul 2023 · Ambassador 2022–2023", summary: "Audit experience and a bridge between the company and university community.", photos: photos("kpmg-ambassador-group", "kpmg-ambassador"), points: ["Summer internship: gained exposure to audit procedures and corporate practice while developing Excel skills.", "University ambassador: organised company presentations, answered students’ questions and facilitated contact with KPMG."] },
      { id: "leadership", title: "Leadership & volunteering", organisation: "ISEG YES · Nova Blockchain Club · Food Bank", summary: "HR leadership, content leadership and working with volunteer teams.", photos: photos("iseg-yes"), points: ["ISEG YES: progressed from member to Human Resources Director, leading the association’s HR department.", "Nova Blockchain Club, NOVA SBE: progressed from Content Department member to Head of Content.", "Food Bank: worked with diverse volunteer teams to prepare food pallets for delivery to institutions."], links: [{ label: "Nova Blockchain Club · Example article", href: "https://www.linkedin.com/posts/novablockchainclub_moneylaundering-cryptocurrency-kyc-activity-7127638460709879808-DBxl" }] },
    ],
  },
  {
    id: "sport", label: "Sport & interests", title: "The discipline\nto keep going.",
    introduction: "Training, competition and curiosity are part of my life too — in the pool, on the mat and between the pages of a book.",
    color: "#435c36", paper: "#edf0e0", photo: photos("taekwondo-green-belt-2026")[0], photoEntry: "taekwondo", note: "Sport & competition",
    entries: [
      { id: "kickboxing", title: "Kickboxing", organisation: "2.5 years", summary: "National runner-up in Portugal.", photos: photos("kickboxing-nationals-2025", "kickboxing-training-group", "kickboxing-competition-group"), paragraphs: ["Training and competition have become an ongoing part of my life. I continue to practise kickboxing alongside taekwondo."] },
      { id: "taekwondo", title: "Taekwondo", organisation: "8 months · Green belt", summary: "My practice also inspired a training app of my own.", photos: photos("taekwondo-green-belt-2026"), links: [{ label: "Alpha TKD Pro · GitHub", href: "https://github.com/biapferreira21/tkd-coach-android" }] },
      { id: "swimming-shooting", title: "Swimming & sport shooting", organisation: "11 years swimming · 1.5 years sport shooting", summary: "Two more disciplines that have shaped my sporting life.", photos: photos("swimming-years") },
      { id: "interests", title: "Books, puzzles & the outdoors", organisation: "Personal interests", summary: "Mathematics, philosophy, puzzles, running and time in nature.", photos: photos("reading-mathematics", "reading-philosophy", "puzzles-free-time", "running-race-day", "nature-resilience"), paragraphs: ["I enjoy reading across mathematics, philosophy and the social sciences, solving puzzles, and walking in nature. I’ve also taken part in 5 km and 10 km running events."] },
    ],
  },
];
