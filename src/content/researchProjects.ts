export type ResearchProject = {
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  externalUrl: string;
  featured?: boolean;
};

const alphaVoteArticle = (slug: string) =>
  `https://alphavote.app/3CTrix-content/?article=${slug}`;

/**
 * Published articles from the public 3C Trix Content library on AlphaVote.
 * Keep the order aligned with the public publication date, newest first.
 */
export const researchProjects: ResearchProject[] = [
  {
    title: "The Real Thing in the Age of AI",
    client: "3C Trix Content · AlphaVote",
    category: "Artificial Intelligence",
    year: "2026",
    description:
      "As AI reproduces our voices, images, ideas and creations, the harder question is whether imitation can become indistinguishable from identity.",
    externalUrl: alphaVoteArticle("the-real-thing-in-the-age-of-ai"),
    featured: true,
  },
  {
    title: "Voice Is Becoming AI’s Operating Layer",
    client: "3C Trix Content · AlphaVote",
    category: "Artificial Intelligence",
    year: "2026",
    description:
      "How voice is moving beyond conversation and becoming an operating layer for real actions across computers, cars, apps and wearable devices.",
    externalUrl: alphaVoteArticle("voice-is-becoming-ai-s-operating-layer"),
  },
  {
    title: "Pinocchio Left the Sandbox. Who Is Geppetto Now?",
    client: "3C Trix Content · AlphaVote",
    category: "AI Safety",
    year: "2026",
    description:
      "A look at autonomous AI, sandbox escapes and whether guardrails can keep pace as models gain tools, access and authority.",
    externalUrl: alphaVoteArticle(
      "pinocchio-left-the-sandbox-who-is-geppetto-now"
    ),
  },
  {
    title: "The New Age of Bans: Who Is Regulation Really Protecting?",
    client: "3C Trix Content · AlphaVote",
    category: "Technology Policy",
    year: "2026",
    description:
      "From frontier models to stablecoins, an examination of whether technology bans reduce harm or reshape competition, access and power.",
    externalUrl: alphaVoteArticle(
      "the-new-age-of-bans-who-is-regulation-really-protecting"
    ),
  },
  {
    title:
      "Visa’s Stablecoin Platform: The Financial Back End for Agentic Commerce?",
    client: "3C Trix Content · AlphaVote",
    category: "Stablecoins",
    year: "2026",
    description:
      "Could Visa’s stablecoin infrastructure become the financial layer behind AI agents, automated shopping and agentic commerce?",
    externalUrl: alphaVoteArticle(
      "visa-s-stablecoin-platform-is-visa-building-the-financial-back-end-for-agentic-com"
    ),
  },
  {
    title: "After DeepSeek, Is Kimi K3 Redefining the AI Race?",
    client: "3C Trix Content · AlphaVote",
    category: "AI Models",
    year: "2026",
    description:
      "An exploration of whether AI leadership is shifting from the most powerful proprietary models towards the largest open ecosystems.",
    externalUrl: alphaVoteArticle(
      "after-deepseek-is-kimi-k3-redefining-the-ai-race"
    ),
  },
  {
    title:
      "San Francisco Pushes for Tougher Rules After the Waymo Traffic Fiasco",
    client: "3C Trix Content · AlphaVote",
    category: "Autonomous Vehicles",
    year: "2026",
    description:
      "What stalled Waymo vehicles reveal about public trust, machine failure and the barriers to adopting AI in the physical world.",
    externalUrl: alphaVoteArticle(
      "san-francisco-mayor-pushes-for-tougher-rules-after-the-waymo-traffic-fiasco"
    ),
  },
];
