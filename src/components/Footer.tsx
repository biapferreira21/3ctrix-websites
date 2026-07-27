import Link from "next/link";
import { Mail, MessageCircle, Instagram, Linkedin } from "lucide-react";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { navLinks } from "@/config/navigation";
import { brand, contact, social, isEmailPlaceholder } from "@/config/brand";
import { isWhatsAppConfigured, getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="relative overflow-hidden border-t-[3px] border-night bg-[#f5f1e8]">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-20" />
      <Container>
        <div className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Logo size={40} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">
              {brand.tagline}
            </p>

            {/* Contactos */}
            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-slate transition-colors hover:text-forest"
                >
                  <Mail size={16} aria-hidden />
                  {contact.email}
                  {isEmailPlaceholder && (
                    <span className="text-xs text-sage-dark">(placeholder)</span>
                  )}
                </a>
              </li>
              <li>
                {isWhatsAppConfigured && whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate transition-colors hover:text-forest"
                  >
                    <MessageCircle size={16} aria-hidden />
                    WhatsApp
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-slate/70">
                    <MessageCircle size={16} aria-hidden />
                    WhatsApp{" "}
                    <span className="text-xs text-sage-dark">(placeholder)</span>
                  </span>
                )}
              </li>
            </ul>

            {/* Redes sociais — apenas se existirem */}
            {(social.instagram || social.linkedin) && (
              <ul className="mt-5 flex gap-3">
                {social.instagram && (
                  <li>
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram da 3C Trix Studio"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist text-forest transition-colors hover:bg-sage/30"
                    >
                      <Instagram size={18} aria-hidden />
                    </a>
                  </li>
                )}
                {social.linkedin && (
                  <li>
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn da 3C Trix Studio"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist text-forest transition-colors hover:bg-sage/30"
                    >
                      <Linkedin size={18} aria-hidden />
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé — navegação">
            <h2 className="text-sm font-semibold text-ink">Navegação</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate transition-colors hover:text-forest"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Rodapé — legal">
            <h2 className="text-sm font-semibold text-ink">Legal</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-sm text-slate transition-colors hover:text-forest"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-e-condicoes"
                  className="text-sm text-slate transition-colors hover:text-forest"
                >
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-sage/20 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate">
            © {year} {brand.name}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate/80">
            {brand.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
