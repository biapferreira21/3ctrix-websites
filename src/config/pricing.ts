/**
 * PREÇOS
 * -------------------------------------------------------------
 * Altere aqui os preços "a partir de" mostrados na secção de preços.
 *
 * ⚠️ Nota importante do briefing: o valor de €275 NÃO deve aparecer
 * em nenhuma parte pública do website.
 */

export type PriceItem = {
  id: string;
  title: string;
  price: string;
  description: string;
  highlights: string[];
  featured?: boolean;
};

export const pricing: PriceItem[] = [
  {
    id: "redesign",
    title: "Redesign de website",
    price: "A partir de €350",
    description: "Para modernizar um website que já existe e fazê-lo trabalhar melhor.",
    highlights: ["Novo design responsivo", "Conteúdos reorganizados", "SEO básico"],
    featured: true,
  },
  {
    id: "raiz",
    title: "Website criado de raiz",
    price: "A partir de €500",
    description: "Uma presença digital completa, pensada desde o primeiro ecrã.",
    highlights: ["Estrutura à medida", "Até 5 páginas ou secções", "Publicação incluída"],
  },
  {
    id: "manutencao",
    title: "Manutenção opcional",
    price: "A partir de €100/mês",
    description: "Apoio contínuo para quem prefere não gerir alterações técnicas.",
    highlights: ["Atualizações", "Pequenas alterações", "Apoio técnico"],
  },
  {
    id: "seo",
    title: "SEO e funcionalidades específicas",
    price: "Orçamento personalizado",
    description: "Para necessidades como marcações, integrações ou maior visibilidade.",
    highlights: ["Análise individual", "Integrações específicas", "Plano personalizado"],
  },
];

export const pricingNote =
  "Cada negócio é diferente. O preço final depende da dimensão do website, dos conteúdos e das funcionalidades necessárias.";
