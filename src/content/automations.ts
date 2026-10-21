export const automationsContent = {
  hero: {
    eyebrow: "Workflow Automation & Event Tools",
    title: "Less repeat work. More time for people.",
    text:
      "Connect scattered information, simplify handoffs and build tools that fit how your team works.",
    primary: { label: "Discuss a workflow", href: "#contact" },
    secondary: { label: "See practical use cases", href: "#use-cases" },
    note:
      "Your team stays in control.",
  },
  problems: [
    ["Information is scattered", "Agendas, sources and updates are hard to find."],
    ["Tasks keep repeating", "Reports, answers and handoffs are rebuilt manually."],
    ["Follow-up gets lost", "Questions, feedback and next steps fall between people."],
  ],
  useCases: [
    ["Event support", "Keep schedules, resources and participant questions together."],
    ["Research & content", "Move from sources to drafts, review and publication."],
    ["Reports & follow-up", "Prepare updates and next steps from approved information."],
    ["Internal tools", "Connect existing systems through a clear interface."],
  ],
  process: [
    ["Map the task", "Agree on the problem, people and approval steps."],
    ["Build & test", "Try a focused solution in the real workflow."],
    ["Hand over", "Give your team a working tool and clear instructions."],
  ],
  principles: [
    "Human approval at key steps",
    "Your data and accounts stay yours",
    "Clear error handling",
    "Instructions your team can use",
  ],
  caseStudy: {
    title: "One participation feature, inspired by AlphaVote.",
    text:
      "AlphaVote explores independent judgement through a commit-before-reveal interaction. That single feature can inspire conference questions and discussion within a tailored event app.",
    steps: [
      "Ask participants to agree, disagree or express uncertainty",
      "Rank priorities or allocate points between trade-offs",
      "Capture questions and learning goals",
      "Compare responses before and after a session",
      "Allow an optional reason or source",
      "Separate opinion, prediction and evidence",
      "Show uncertainty without forcing a binary answer",
      "Review results as input, not as proof of truth",
    ],
    note:
      "The event app is a separate service, with its own agenda, sessions, resources and participant journey. Voting cards are one optional feature.",
  },
  technologies: [
    "Connected information",
    "Automated handoffs",
    "Human review",
    "Research support",
    "Participant resources",
    "Custom interfaces",
    "Clear reporting",
  ],
  audiences: [
    "Event organisers",
    "AI and technology startups",
    "Media and content teams",
    "Research teams",
    "Event participants",
    "Operations teams",
    "Founders",
    "Professional organisations",
  ],
  faq: [
    ["What types of workflows can be improved?", "Repetitive, rules-based and information-heavy processes are often strong candidates. Every workflow is assessed before a tool is proposed."],
    ["Does every workflow use artificial intelligence?", "No. Some needs are better solved with standard automation, APIs or structured databases. AI is used only when it adds clear value."],
    ["Can you build tools for an event?", "Yes. Possible work includes participant information, questions, voting cards, resources, follow-up and internal event workflows, tailored to the event’s needs."],
    ["Will automation replace human judgement?", "No. The purpose is to reduce repetitive work and support understanding. Human review remains essential where context, judgement or responsibility is required."],
    ["Are all the event features already available?", "No. Some are prototypes or possible custom integrations. Scope and readiness are made clear for each project."],
    ["Can you work with existing tools?", "Yes. Existing systems are assessed first, with integration prioritised where it is practical and responsible."],
  ],
} as const;
