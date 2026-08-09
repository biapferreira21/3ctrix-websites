import { withBasePath } from "./deployment";
import { isPlaceholder, siteConfig } from "./site";

/**
 * Compatibility layer for the established Websites page.
 * New shared components should import siteConfig directly.
 */
export const brand = {
  name: siteConfig.companyName,
  shortName: siteConfig.shortName,
  tagline: siteConfig.tagline,
  logo: {
    src: withBasePath("/3ctrix-logo-refined.png"),
    alt: "3C Trix Studio logo",
  },
} as const;

export const contact = {
  email: siteConfig.email,
  whatsappNumber: siteConfig.whatsapp,
  whatsappMessage:
    "Hello, I visited the 3C Trix Studio website and would like to discuss a project.",
} as const;

export const isEmailPlaceholder = isPlaceholder(contact.email);

export const social = {
  instagram: null as string | null,
  linkedin: isPlaceholder(siteConfig.social.linkedin)
    ? null
    : siteConfig.social.linkedin,
} as const;

export const siteUrl = `${siteConfig.siteUrl}/websites`;
