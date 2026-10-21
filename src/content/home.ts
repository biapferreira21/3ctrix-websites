import { siteConfig } from "@/config/site";

export const homeContent = {
  hero: {
    eyebrow: "Events. Media. Research. Technology.",
    title:
      "Research, media and tools for better events.",
    text:
      "For events and startups in AI, technology and crypto.",
    primary: { label: "Explore our work", href: "#business-areas" },
    secondary: { label: "Start a conversation", href: "#contact" },
  },
  evolution: {
    eyebrow: "Our mission",
    title: "Make the conversation count.",
    paragraphs: [
      "Important ideas deserve more than a moment on stage. We help people understand them, take part and carry them forward.",
    ],
    stages: [
      {
        number: "01",
        title: "Understand",
        text: "Research the technology, context, evidence and questions that matter.",
      },
      {
        number: "02",
        title: "Connect",
        text: "Bring people and ideas together through events, media and clear content.",
      },
      {
        number: "03",
        title: "Build",
        text: "Create practical tools that improve participation, workflows and information quality.",
      },
    ],
  },
  audiences: {
    eyebrow: "Who we work with",
    title: "Events. Startups. Curious people.",
    text:
      "Across AI, technology and crypto.",
    items: [
      ["Event organisers", "Content and participant experiences."],
      ["Startups", "Research, reviews and event collaboration."],
      ["Event participants", "Context, questions and useful takeaways."],
      ["Media partners", "Interviews, explainers and coverage."],
      ["Organisations", "Better workflows and clearer information."],
    ],
  },
  areas: [
    {
      index: "01",
      title: "Events, Media & Content",
      description:
        "Bring your event and its ideas to the right audience.",
      points: [
        "Ambassador work and event coverage",
        "Interviews, explainers and newsletters",
        "Hands-on product reviews",
      ],
      cta: "See selected experience",
      href: "#experience",
      external: false,
      theme: "events",
    },
    {
      index: "02",
      title: "Event Websites & Apps",
      description:
        "A useful companion before, during and after the conference.",
      points: [
        "Agendas, speakers and venue guides",
        "Questions, polls and participation",
        "Resources and follow-up",
      ],
      cta: "Explore the event app experience",
      href: "#event-tools",
      external: false,
      theme: "event-tools",
    },
    {
      index: "03",
      title: "Workflow Automation",
      description:
        "Spend less time on repeat tasks and scattered information.",
      points: [
        "Connect research and content workflows",
        "Build focused tools and automations",
        "Keep people in control of key decisions",
      ],
      cta: "Explore Automations",
      href: siteConfig.urls.automations,
      external: false,
      theme: "automation",
    },
    {
      index: "04",
      title: "Research & Information Quality",
      description:
        "Understand complex topics and the evidence behind them.",
      points: [
        "Articles, reports and briefings",
        "Visible sources and important context",
        "Clear limits and open questions",
      ],
      cta: "Explore Research",
      href: siteConfig.urls.research,
      external: false,
      theme: "research",
    },
  ],
  alphaVote: {
    eyebrow: "An independent experiment · AlphaVote",
    title: "Your view. Before the crowd’s.",
    paragraphs: [
      "Beatriz created AlphaVote to make room for independent thinking in a feed driven by popularity. Answer first, then compare perspectives.",
      "Its voting cards are one feature that can inspire participation in an event app. Try the experiment here.",
    ],
    cardTypes: [
      ["Agree / disagree / unsure", "Capture a position without forcing false certainty."],
      ["Rank priorities", "Reveal which topics, needs or trade-offs matter most to participants."],
      ["Rate confidence", "Explore confidence in an idea, forecast or claim."],
      ["Allocate points", "Make trade-offs visible by distributing limited points between options."],
      ["Before / after", "Explore whether perspectives changed following a session."],
      ["Questions & learning goals", "Surface what participants want to understand or discuss next."],
    ],
  },
  eventTools: {
    eyebrow: "Event apps and tools",
    title: "Your event. In their pocket.",
    text:
      "Explore a simple conference app, built around the people using it.",
    stages: [
      ["Before", "Help participants understand the themes, speakers, sessions and questions worth bringing."],
      ["During", "Provide practical information, resources, questions, voting cards and ways to share perspectives."],
      ["After", "Preserve summaries, sources, resources and follow-up so the event’s value does not end at the venue."],
    ],
  },
  experience: [
    { name: "Proof of Talk", role: "Ambassador · Paris" },
    { name: "Lisbon AI Week", role: "Ambassador · Lisbon" },
    { name: "European Blockchain Convention", role: "Ambassador · Barcelona" },
    { name: "Digital Assets Forum", role: "Ambassador · London" },
    { name: "AI Summit Barcelona", role: "Ambassador · Barcelona" },
  ],
  informationSystem: {
    eyebrow: "From signal to decision",
    title: "Treat an event as a living information system.",
    text:
      "A useful event experience does more than publish an agenda. It connects what speakers say, what sources support it, what participants question and what organisers learn — without flattening everything into a score or a slogan.",
    stages: [
      {
        label: "01 · Event signal",
        title: "Capture what matters",
        text: "Themes, claims, sources, questions and practical information enter the experience with their context attached.",
        artifact: "Speaker → claim",
      },
      {
        label: "02 · Editorial context",
        title: "Make it understandable",
        text: "Research and media turn complexity into useful context while retaining evidence, caveats and disagreement.",
        artifact: "Claim + source",
      },
      {
        label: "03 · Participation",
        title: "Invite a real response",
        text: "Questions, voting cards and participant input reveal priorities, uncertainty and what people want to explore next.",
        artifact: "Question + response",
      },
      {
        label: "04 · Learning loop",
        title: "Continue after the room",
        text: "Resources, follow-up and structured feedback help organisers and participants carry the conversation forward.",
        artifact: "Summary + next step",
      },
    ],
    inputs: [
      "Speaker statements and session themes",
      "Primary sources, reports and documents",
      "Participant questions and learning goals",
      "Practical event information and updates",
    ],
    safeguards: [
      "Source, date and original context",
      "Evidence separated from interpretation",
      "Uncertainty, disagreement and missing information",
      "Human review before consequential use",
    ],
    outcomes: [
      "Clearer preparation before a session",
      "More meaningful participation during the event",
      "Research and resources people can revisit",
      "Feedback that can inform future content and offers",
    ],
  },
  informationQuality: {
    eyebrow: "Information quality",
    title: "Keep the source. Keep the meaning.",
    paragraphs: [
      "A useful summary keeps the evidence and its limits visible. Here’s a small example.",
    ],
    questions: [
      "What context is lost when complex information becomes a short summary?",
      "How can a summary preserve evidence, meaning and important caveats?",
      "How can tools show uncertainty without forcing a simplistic true/false label?",
      "How does new information change a participant’s understanding of a question?",
      "How can sources remain visible as information moves between speakers, media, apps and decision-makers?",
      "How can event feedback help organisers improve future sessions and offers?",
    ],
    concepts: [
      ["Compression", "Shorten information while trying to preserve its essential meaning."],
      ["Information loss", "Identify evidence, context or qualifications that disappear in transmission or summary."],
      ["Uncertainty", "Show what remains unknown, unresolved or contested."],
      ["Information gain", "Explore whether new evidence or an event changed someone’s understanding."],
      ["Source traceability", "Preserve where information came from and the conditions around it."],
      ["Change over time", "Track how ideas, claims and evidence develop between conversations and events."],
    ],
  },
  profile: {
    eyebrow: "About the founder",
    title: "Meet Beatriz Ferreira.",
    paragraphs: [
      "Founder, researcher and media contributor, with product management experience at Repsol and research experience at The Block.",
      "She brings these perspectives together at 3C Trix to help people understand technology and make better-informed decisions.",
      "Her background includes applied mathematics and a master’s degree in accounting, taxation and finance.",
    ],
    motivation:
      "Beatriz is motivated by understanding how technology shapes society and how the quality of information shapes what people believe, decide and build.",
    journey: [
      ["Product", "Product management experience at Repsol."],
      ["Research", "Research and writing across technology, crypto and digital finance."],
      ["Media & events", "Content, coverage and conversations around emerging technology."],
      ["3C Trix", "A studio connecting information, people, events and digital tools."],
    ],
  },
  principles: [
    {
      title: "Evidence-aware",
      text: "Claims, interpretation and opinion are kept distinct, with sources and important caveats visible where relevant.",
    },
    {
      title: "Human-centred",
      text: "Content and tools are designed around what participants, organisers and teams actually need to understand or do.",
    },
    {
      title: "Practical",
      text: "Technology is used for a defined purpose, not added as a layer of empty complexity.",
    },
    {
      title: "Transparent",
      text: "Prototypes, commissioned work and ambassador relationships are labelled clearly rather than overstated.",
    },
  ],
} as const;
