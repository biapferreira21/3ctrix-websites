/**
 * Central public-site configuration.
 *
 * Replace the *_PLACEHOLDER values below before publishing them visibly.
 * Environment variables take precedence so contact details can be configured
 * without duplicating them across components.
 */
export const siteConfig = {
  companyName: "3C Trix Studio",
  shortName: "3C Trix",
  founderName: "Beatriz Ferreira",
  tagline: "Information, people and ideas — connected through events, media and technology.",
  positioning:
    "3C Trix helps people and organisations understand emerging technology, get more from important events and make better-informed decisions through media, research and tailored digital tools.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://3ctrix.com",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "beatrizferreira@3ctrix.com",
  phone:
    process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || "935477498",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ||
    "351935477498",
  urls: {
    home: "/",
    research: "/research",
    automations: "/automations",
    websites: "/websites",
    alphaVote: "https://alphavote.app",
    alphaVoteContent: "https://alphavote.app/3CTrix-content",
    privacy: "/politica-de-privacidade",
    terms: "/termos-e-condicoes",
  },
  social: {
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "https://www.linkedin.com/in/beatriz-pereira-ferreira/",
  },
} as const;

export function isPlaceholder(value: string) {
  return value.endsWith("_PLACEHOLDER");
}
