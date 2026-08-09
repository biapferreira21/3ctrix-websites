"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { Container } from "./ui/Container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

const studioLinks = [
  { label: "Home", href: siteConfig.urls.home, external: false },
  { label: "Research", href: siteConfig.urls.research, external: false },
  { label: "Automations", href: siteConfig.urls.automations, external: false },
  { label: "Websites", href: siteConfig.urls.websites, external: false },
  { label: "AlphaVote", href: siteConfig.urls.alphaVote, external: true },
] as const;
const websitesLinksPt = [
  { label: "Serviços", href: "/websites#servicos", external: false },
  { label: "Projetos", href: "/websites#projetos", external: false },
  { label: "Como funciona", href: "/websites/como-funciona", external: false },
  { label: "Preços", href: "/websites/precos", external: false },
  { label: "Perguntas frequentes", href: "/websites#faq", external: false },
] as const;

const websitesLinksEn = [
  { label: "Services", href: "/websites/en#servicos", external: false },
  { label: "Projects", href: "/websites/en#projetos", external: false },
  { label: "How it works", href: "/websites/en/how-it-works", external: false },
  { label: "Pricing", href: "/websites/en/pricing", external: false },
  { label: "FAQ", href: "/websites/en#faq", external: false },
] as const;

export function Header({ variant: _variant }: { variant?: "auto" | "solid" } = {}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const inWebsites = pathname.startsWith("/websites");
  const websitesEnglish = pathname.startsWith("/websites/en");
  const links = inWebsites
    ? websitesEnglish
      ? websitesLinksEn
      : websitesLinksPt
    : studioLinks;
  const contactHref = inWebsites
    ? websitesEnglish
      ? "/websites/en#contacto"
      : "/websites#contacto"
    : `${pathname === "/" ? "" : "/"}#contact`;
  const contactLabel = inWebsites
    ? websitesEnglish
      ? "Contact"
      : "Contacto"
    : "Contact";
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-night bg-[#f5f1e8]/95 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" aria-label="3C Trix Studio home" className="rounded-md">
            <Logo size={44} />
          </Link>
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate transition-colors hover:bg-mint hover:text-forest-deep"
                    >
                      {link.label}
                      <ExternalLink size={13} aria-hidden />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={cn(
                        "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-mint hover:text-forest-deep",
                        pathname === link.href ? "bg-mint text-forest-deep" : "text-slate"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={contactHref}
            className="hidden min-h-11 items-center justify-center rounded-full border-[3px] border-night bg-emerald px-5 py-2 text-sm font-bold text-night shadow-[3px_3px_0_#16180F] transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            {contactLabel}
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-night bg-white text-night lg:hidden"
          >
            <span className="relative h-4 w-5" aria-hidden>
              <span className={cn("absolute left-0 top-0.5 h-0.5 w-5 bg-current transition-transform", open && "translate-y-[6px] rotate-45")} />
              <span className={cn("absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity", open && "opacity-0")} />
              <span className={cn("absolute left-0 top-[13px] h-0.5 w-5 bg-current transition-transform", open && "-translate-y-[6px] -rotate-45")} />
            </span>
          </button>
        </div>
      </Container>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="overflow-hidden border-t-2 border-night bg-[#f5f1e8] lg:hidden"
          >
            <Container>
              <ul className="space-y-1 py-5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-mint"
                      >
                        {link.label} <ExternalLink size={16} aria-hidden />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-mint"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href={contactHref}
                    className="flex min-h-12 items-center justify-center rounded-full border-[3px] border-night bg-emerald px-5 py-3 text-sm font-bold text-night"
                  >
                    {contactLabel}
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
