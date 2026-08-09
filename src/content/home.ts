import { siteConfig } from "@/config/site";

export const homeContent = {
  hero: {
    eyebrow: "Research. Content. AI Implementation.",
    title:
      "Turning emerging technology into knowledge, products and business solutions.",
    text:
      "3C Trix Studio researches artificial intelligence and emerging technology, transforms complex developments into clear content and applies that knowledge through digital products, automation and practical implementation.",
    primary: { label: "Explore our work", href: "#business-areas" },
    secondary: { label: "Work with 3C Trix", href: "#contact" },
    note: siteConfig.tagline,
  },
  evolution: {
    eyebrow: "Our evolution",
    title: "From understanding technology to building with it.",
    paragraphs: [
      "3C Trix Studio began with research and editorial work focused on artificial intelligence, digital assets, stablecoins, blockchain and emerging financial infrastructure.",
      "As our work developed, research moved beyond publication. It became the foundation for products, automation systems and practical digital implementation.",
      "Today, 3C Trix operates across research, content, AI automation, websites and original products.",
    ],
    stages: [
      {
        number: "01",
        title: "Research",
        text: "Understand the technology, market and context.",
      },
      {
        number: "02",
        title: "Communicate",
        text: "Transform complex developments into clear and credible content.",
      },
      {
        number: "03",
        title: "Implement",
        text: "Apply the knowledge through products, workflows and digital solutions.",
      },
    ],
  },
  areas: [
    {
      index: "01",
      title: "Research & Content",
      description:
        "Research-led articles, reports, SEO content and editorial strategy focused on artificial intelligence, digital assets and emerging technology.",
      cta: "Explore Research",
      href: siteConfig.urls.research,
      external: false,
      theme: "research",
    },
    {
      index: "02",
      title: "AI Automation & Implementation",
      description:
        "Practical workflows and internal tools that reduce repetitive work, organise information and improve business processes.",
      cta: "Explore Automations",
      href: siteConfig.urls.automations,
      external: false,
      theme: "automation",
    },
    {
      index: "03",
      title: "Website Creation & Redesign",
      description:
        "Modern, responsive websites and business-specific digital functionality for micro and small companies.",
      cta: "Explore Websites",
      href: siteConfig.urls.websites,
      external: false,
      theme: "websites",
    },
    {
      index: "04",
      title: "Media & Products",
      description:
        "Original technology content and digital products designed to transform passive information into active participation.",
      cta: "Discover AlphaVote",
      href: siteConfig.urls.alphaVote,
      secondaryCta: {
        label: "Read 3C Trix Content",
        href: siteConfig.urls.alphaVoteContent,
      },
      external: true,
      theme: "product",
    },
  ],
  alphaVote: {
    eyebrow: "A 3C Trix product",
    title: "Research can become a product.",
    paragraphs: [
      "AlphaVote is a social knowledge platform that transforms news, products and complex debates into structured voting experiences.",
      "Users form an opinion before seeing the position of the wider community, encouraging independent reasoning and turning passive content consumption into active participation.",
    ],
  },
  experience: [
    "The Big Whale",
    "European Blockchain Convention Barcelona",
    "Digital Assets Forum London",
    "Stablecoin Insider",
    "The Block",
  ],
  principles: [
    {
      title: "Research-led",
      text: "Every project begins by understanding the technology, business and actual problem.",
    },
    {
      title: "Practical",
      text: "We focus on useful systems and outputs rather than adding technology without a clear purpose.",
    },
    {
      title: "Adaptable",
      text: "Solutions are designed around the organisation’s existing processes, tools and level of technical maturity.",
    },
    {
      title: "Human-centred",
      text: "Technology should make work clearer and more effective, not create unnecessary complexity.",
    },
  ],
} as const;
