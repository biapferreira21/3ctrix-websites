import { siteConfig } from "@/config/site";

export const homeContent = {
  hero: {
    eyebrow: "Events. Media. Research. Technology.",
    title:
      "Connecting important ideas with people, events and better-informed decisions.",
    text:
      "3C Trix works with events and startups in AI, technology and crypto. We combine media, research and tailored digital tools to help people understand emerging technology and get more from the conversations shaping it.",
    primary: { label: "Explore our work", href: "#business-areas" },
    secondary: { label: "Start a conversation", href: "#contact" },
    note: siteConfig.tagline,
  },
  evolution: {
    eyebrow: "Our mission",
    title: "Make information more useful before, during and after important events.",
    paragraphs: [
      "Events bring together people, ideas, companies and decision-makers. The conversations held there can influence what founders, leaders and institutions understand, decide and build next.",
      "3C Trix contributes to that chain by helping audiences prepare for important discussions, follow complex ideas and continue the conversation after an event.",
      "The ambition is simple: connect trustworthy information with people and ideas through media, research and carefully designed technology.",
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
    title: "For people shaping — and trying to understand — emerging technology.",
    text:
      "3C Trix is designed for organisations and participants who need more than promotion: they need context, useful participation and information they can act on responsibly.",
    items: [
      ["Event organisers", "AI, technology, crypto and other high-impact events seeking stronger content and participant experiences."],
      ["Startups", "AI, technology and crypto teams looking for research-led content, product reviews or event collaboration."],
      ["Event participants", "People who want to understand what they can learn, ask and take away from an event."],
      ["Media & content partners", "Publications and teams seeking thoughtful interviews, coverage, explainers and reviews."],
      ["Organisations", "Teams exploring practical workflow automation or information-reliability tools."],
    ],
  },
  areas: [
    {
      index: "01",
      title: "Events, Media & Content",
      description:
        "Ambassador work, event coverage, interviews, previews, recaps, explainers and evidence-aware content for AI, technology and crypto audiences.",
      points: [
        "Represent and promote selected events as an ambassador",
        "Create content before, during and after an event",
        "Interview founders, speakers, builders and participants",
        "Write previews, recaps, explainers and newsletters",
        "Review technology products through hands-on testing",
        "Clearly disclose ambassador, sponsored or commissioned work",
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
        "Tailored digital experiences that help participants prepare, navigate sessions, share perspectives and continue learning after an event.",
      points: [
        "Agenda, speakers, sessions and venue information",
        "Participant guides, resources and event content",
        "Personalised session or topic suggestions",
        "Questions, surveys, polls and voting cards",
        "Participant perspectives and structured engagement",
        "Post-event resources, summaries and follow-up",
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
        "Practical automations and AI-assisted workflows for defined event, research, content and operational needs — with human judgement kept where it matters.",
      points: [
        "Identify repetitive or fragmented processes",
        "Design focused automations and AI-assisted workflows",
        "Build tools or agents for a defined need",
        "Support event information and participant workflows",
        "Test tools in the real process",
        "Keep human approval where judgement is required",
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
        "Research, explainers and tools focused on source traceability, context, uncertainty and the reliability of information used in decisions.",
      points: [
        "Show where claims and information came from",
        "Link sources, dates, speakers, sessions and documents",
        "Reveal missing context and conflicting sources",
        "Separate evidence, interpretation and opinion",
        "Make uncertainty and unresolved questions visible",
        "Compare how claims and positions change over time",
      ],
      cta: "Explore Research",
      href: siteConfig.urls.research,
      external: false,
      theme: "research",
    },
  ],
  alphaVote: {
    eyebrow: "An independent experiment · AlphaVote",
    title: "What do you think before you see what everyone else thinks?",
    paragraphs: [
      "Beatriz designed AlphaVote to explore a question: can a social experience encourage independent judgement instead of following the crowd? Participants commit a view before seeing collective results, then explore reasoning and counterarguments.",
      "The motivation is to make room for reflection, uncertainty and learning in a feed that often rewards popularity. It is an experiment in how interface design shapes thinking.",
      "Its voting cards offer one possible participation feature for a conference app: ask a question, capture an independent response, then open the discussion. Each event app has its own agenda, speakers, resources and participant journey.",
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
    title: "Designed around the participant journey, not around generic features.",
    text:
      "An event website or app can support preparation, participation and follow-up. Every feature is selected for the event’s objectives, audience and information needs; prototypes and future integrations are labelled clearly.",
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
    title: "Better decisions start with information that keeps its source and context.",
    paragraphs: [
      "3C Trix is interested in what happens to information as it is collected, transmitted, summarised, shared and used. A short summary can be useful, but it can also remove evidence, caveats, disagreement or the conditions that made a statement meaningful.",
      "The goal is not to produce a universal truth score. It is to improve traceability, preserve important context and make uncertainty easier to see before people use information in a decision.",
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
    title: "Beatriz works where product, research, media and events meet.",
    paragraphs: [
      "Beatriz Ferreira is a product professional, researcher, founder and media contributor interested in AI, technology, crypto and the ways these fields affect people, business and society.",
      "Her experience in product management helps her understand how technology is built and used. Research helps her examine evidence and ask better questions. Media and event work help her explain ideas and meet the people shaping them. 3C Trix brings these perspectives together through services, experiments and practical tools.",
      "She has a background in applied mathematics and a master’s degree in accounting, taxation and finance.",
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
