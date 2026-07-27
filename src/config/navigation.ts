/**
 * Navegação principal do site.
 * Links absolutos (começam por "/") para funcionarem a partir de
 * qualquer página. "Como funciona" é agora uma página própria.
 */
export const navLinks = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Preços", href: "/precos" },
  { label: "Perguntas frequentes", href: "/#faq" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export const primaryCta = {
  label: "Pedir análise gratuita",
  href: "/#contacto",
} as const;
