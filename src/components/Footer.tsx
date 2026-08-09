import Link from "next/link";
import { ExternalLink, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { isPlaceholder, siteConfig } from "@/config/site";

const footerLinks = [
  { label: "Research", href: siteConfig.urls.research },
  { label: "Automations", href: siteConfig.urls.automations },
  { label: "Websites", href: siteConfig.urls.websites },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const hasEmail = !isPlaceholder(siteConfig.email);
  const hasPhone = !isPlaceholder(siteConfig.phone);
  const hasLinkedIn = !isPlaceholder(siteConfig.social.linkedin);
  const hasWhatsApp = !isPlaceholder(siteConfig.whatsapp);

  return (
    <footer className="relative overflow-hidden border-t-[3px] border-night bg-[#f5f1e8]">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-20" />
      <Container>
        <div className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo size={42} />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate">
              {siteConfig.tagline}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-slate">
              {hasEmail ? (
                <a className="inline-flex items-center gap-2 hover:text-forest" href={`mailto:${siteConfig.email}`}>
                  <Mail size={16} aria-hidden /> {siteConfig.email}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-slate/65">
                  <Mail size={16} aria-hidden /> Professional email to be configured
                </span>
              )}
              {hasPhone && (
                <a className="inline-flex items-center gap-2 hover:text-forest" href={`tel:${siteConfig.phone}`}>
                  <Phone size={16} aria-hidden /> {siteConfig.phone}
                </a>
              )}
              {hasWhatsApp ? (
                <a
                  className="inline-flex items-center gap-2 hover:text-forest"
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} aria-hidden /> WhatsApp
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-slate/65">
                  <MessageCircle size={16} aria-hidden /> WhatsApp to be configured
                </span>
              )}
              {hasLinkedIn && (
                <a
                  className="inline-flex items-center gap-2 hover:text-forest"
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} aria-hidden /> LinkedIn
                </a>
              )}
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold text-ink">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-sm text-slate hover:text-forest" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-forest"
                  href={siteConfig.urls.alphaVote}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AlphaVote <ExternalLink size={13} aria-hidden />
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-forest"
                  href={siteConfig.urls.alphaVoteContent}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  3C Trix Content <ExternalLink size={13} aria-hidden />
                </a>
              </li>
              <li>
                <Link className="text-sm text-slate hover:text-forest" href="/#contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Legal navigation">
            <h2 className="text-sm font-semibold text-ink">Legal</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link className="text-sm text-slate hover:text-forest" href={siteConfig.urls.privacy}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-sm text-slate hover:text-forest" href={siteConfig.urls.terms}>
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="relative flex flex-col gap-3 border-t border-sage/30 py-6 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.companyName}. All rights reserved.</p>
          <p>From emerging technology to real-world implementation.</p>
        </div>
      </Container>
    </footer>
  );
}
