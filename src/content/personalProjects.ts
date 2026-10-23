export type PersonalProject = {
  id: string;
  title: string;
  category: string;
  summary: string;
  features: string[];
  repository: string;
  readmeSha: string;
  action?: { label: string; href: string };
  image?: { src: string; alt: string; width: number; height: number; caption: string };
};

// Copy is grounded in the public READMEs reviewed on 23 October 2026.
// Keep the Content Hub's relationship to AlphaVote explicit: it is an extension,
// not an unrelated product or a second implementation of the voting platform.
export const personalProjects: PersonalProject[] = [
  {
    id: "alphavote",
    title: "AlphaVote",
    category: "Community participation · Web",
    summary: "I built AlphaVote to turn clear questions into informed participation: balanced choices, community discussion and voting that keeps the context visible.",
    features: ["Structured questions and live voting", "Public and private communities", "Discussion, learning cards and consensus signals"],
    repository: "https://github.com/biapferreira21/alphavote",
    readmeSha: "21358b01f17008beff5894af675a8f53b04992ee",
    action: { label: "Explore AlphaVote", href: "https://alphavote.app/" },
    image: { src: "/about/alphavote-project.webp", width: 1003, height: 1568, alt: "AlphaVote concept artwork: fragmented information becomes connected cards along a green path.", caption: "AlphaVote · concept artwork" },
  },
  {
    id: "alpha-tkd-pro",
    title: "Alpha TKD Pro",
    category: "Taekwondo training · Android",
    summary: "I designed a training app that brings guided workouts, custom sessions and step-by-step Poomsae together, so the phone can support the training rather than interrupt it.",
    features: ["Custom workouts with exercise timers and rests", "Taegeuk 1–8 and Koryo, step by step", "Offline exercise references and on-device history"],
    repository: "https://github.com/biapferreira21/tkd-coach-android",
    readmeSha: "897df5eefafaab6b5c664a4cd2efad2ee13f7563",
    action: { label: "Android test release", href: "https://github.com/biapferreira21/tkd-coach-android/releases/latest" },
    image: { src: "/about/alpha-tkd-pro-project.webp", width: 1080, height: 1946, alt: "Alpha TKD Pro Android app showing workout selection and step-by-step Poomsae in its illustrated interface.", caption: "Alpha TKD Pro · supplied app screenshot" },
  },
  {
    id: "ai-research-roadmap",
    title: "AI Research Roadmap",
    category: "Learning & research · Web",
    summary: "I built a study workspace that connects university AI courses, prerequisites and research resources with personal progress, bookmarks and notes.",
    features: ["A prerequisite-aware university course roadmap", "Lesson resources, progress and a resume workflow", "A research library and Information Theory × AI path"],
    repository: "https://github.com/biapferreira21/master-ai-research-roadmap",
    readmeSha: "d2376c02bb76410d811723de20bf781bf97d6db8",
  },
  {
    id: "content-hub",
    title: "3C Trix Content Hub",
    category: "Editorial workflow · AlphaVote extension",
    summary: "I extended AlphaVote with a sourced article archive and an AI-assisted editorial workflow: from an article to a balanced debate and an editable social draft, with human approval.",
    features: ["Searchable articles with visible sources", "Article-to-Debate cards with shared voting", "AI suggestions and a human-controlled publishing flow"],
    repository: "https://github.com/biapferreira21/3ctrix-content-hub",
    readmeSha: "5e10436b26ef14048e853e4e666b48e3fd12f424",
    action: { label: "Read the Content Hub", href: "https://alphavote.app/3CTrix-content/" },
  },
];

export const projectPreviewFlows = {
  "ai-research-roadmap": [
    { title: "Foundations", detail: "Start with programming and mathematical foundations. The roadmap makes prerequisites part of the learning path.", items: ["Programming", "Mathematics", "Prerequisites"] },
    { title: "Machine learning", detail: "Move through university lessons with their videos, readings and assignments, while keeping track of personal progress.", items: ["University lessons", "Original resources", "Study progress"] },
    { title: "Research", detail: "Connect study to papers, concepts and a dedicated Information Theory × AI path. Keep bookmarks and personal notes together.", items: ["Papers & concepts", "Information theory", "Personal notes"] },
  ],
  "content-hub": [
    { title: "Sources", detail: "Begin with source material and write a structured article. Original sources remain visible to the reader.", items: ["Named sources", "Structured article", "Public reader"] },
    { title: "Debate", detail: "AI can suggest a neutral question and balanced options. A human reviews the proposal before publishing a real AlphaVote Debate card.", items: ["AI proposal", "Human review", "Shared voting"] },
    { title: "Approval", detail: "Generate an editable LinkedIn draft for final human approval. Nothing is posted automatically to LinkedIn.", items: ["Editable draft", "Final approval", "Manual publication"] },
  ],
} as const;
