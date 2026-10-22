export const researchContent = {
  hero: {
    eyebrow: "Research & Information Quality",
    title: "Clear research. Visible sources.",
    text:
      "Articles, interviews and briefings on AI, technology and digital finance. Sources, context and open questions stay visible.",
    primary: { label: "Explore research services", href: "#research-services" },
    secondary: { label: "Explore the method", href: "#method" },
  },
  themes: [
    "Information Quality",
    "Artificial Intelligence",
    "Digital Assets",
    "Stablecoins & Payments",
    "Technology Regulation",
  ],
  services: [
    ["Articles & briefings", "Explain a complex topic with evidence and clear takeaways."],
    ["Interviews & event coverage", "Conversations, previews and reports from the people in the room."],
    ["Research reports", "Go deeper into a question and check the claims behind it."],
    ["Editorial support", "Choose topics, plan a series and turn research into useful content."],
  ],
  experience: [
    ["The Big Whale", "Technology and crypto writing."],
    ["Stablecoin Insider", "Research and articles on stablecoins and payments."],
    ["The Block", "Researcher in digital assets; supported Emergence while working with the research team."],
  ],
  directions: [
    [
      "What disappears in a summary?",
      "Explore how complex statements lose evidence, caveats and disagreement when they are compressed for speed.",
      "Design aim: concise information that still lets a reader inspect what matters.",
    ],
    [
      "How should uncertainty be shown?",
      "Look for ways to represent what is known, unknown or contested without forcing a false true-or-false answer.",
      "Design aim: help people judge confidence and limits for themselves.",
    ],
    [
      "Can context travel with a claim?",
      "Study how source, date, speaker and original conditions can remain visible as information moves between media and tools.",
      "Design aim: source history that survives copying, sharing and reuse.",
    ],
    [
      "Did the event create information gain?",
      "Explore whether a session changed what participants understand, question or want to learn next.",
      "Design aim: feedback that improves follow-up and future event content.",
    ],
  ],
  process: [
    ["Ask", "Agree on the question, audience and format."],
    ["Investigate", "Check sources, compare evidence and flag gaps."],
    ["Explain", "Deliver clear content with the context intact."],
  ],
  principles: [
    "Sources close to factual claims",
    "Source history that remains visible",
    "Clear separation between evidence, interpretation and opinion",
    "Uncertainty and disagreement shown honestly",
    "Important caveats preserved in summaries",
    "No simplistic truth scores",
    "Accessible explanations without unnecessary jargon",
  ],
  faq: [
    ["What does information quality mean here?", "It means making sources, dates, context, uncertainty and important qualifications easier to inspect before information is used."],
    ["Does 3C Trix determine what is true?", "No. Research and tools can improve traceability and reveal missing context, but they do not guarantee truth or replace human judgement."],
    ["How does information theory inform the work?", "It provides a lens for thinking about compression, information loss, uncertainty, information gain, source traceability and change over time."],
    ["Can you cover events?", "Yes. Work can include previews, interviews, session summaries, daily coverage, explainers and post-event reports."],
    ["Can research become part of an event app?", "Yes. Research can inform participant guides, session context, voting cards, resource libraries and post-event follow-up."],
    ["Do you provide sources?", "Yes. Sources can be included in the appropriate format, prioritising primary and authoritative material where available."],
  ],
} as const;
