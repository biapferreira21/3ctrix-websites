/**
 * SERVIÇOS
 * -------------------------------------------------------------
 * Altere aqui os textos e os preços "a partir de" dos serviços.
 * O nome do ícone corresponde a um ícone do lucide-react
 * (ver mapeamento em src/components/Serviços.tsx).
 */

export type Service = {
  id: string;
  icon: "RefreshCw" | "LayoutTemplate" | "Search" | "Wrench";
  title: string;
  description: string;
  price: string | null; // null = sem preço fixo
};

export const services: Service[] = [
  {
    id: "redesign",
    icon: "RefreshCw",
    title: "Redesign de websites",
    description:
      "Modernizamos o design, a navegação, a experiência móvel e as funcionalidades do website existente.",
    price: "A partir de €350",
  },
  {
    id: "raiz",
    icon: "LayoutTemplate",
    title: "Website de raiz",
    description:
      "Um website completo para negócios que ainda não têm presença digital adequada.",
    price: "A partir de €500",
  },
  {
    id: "seo",
    icon: "Search",
    title: "SEO",
    description:
      "Estrutura, conteúdos e elementos essenciais para o negócio ser encontrado online.",
    price: null,
  },
  {
    id: "manutencao",
    icon: "Wrench",
    title: "Manutenção",
    description:
      "Atualizações, pequenas alterações e apoio técnico contínuo quando necessário.",
    price: "A partir de €100/mês",
  },
];

export const servicesNote =
  "O orçamento final depende das necessidades, dimensão e funcionalidades de cada projeto.";
