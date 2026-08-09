/**
 * SERVIÇOS
 * -------------------------------------------------------------
 * Altere aqui os textos e os preços "a partir de" dos serviços.
 * O nome do ícone corresponde a um ícone do lucide-react
 * (ver mapeamento em src/components/Services.tsx).
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
    title: "Website redesign",
    description:
      "We modernise the design, navigation, mobile experience and functionality of an existing website.",
    price: "A partir de €350",
  },
  {
    id: "raiz",
    icon: "LayoutTemplate",
    title: "New website",
    description:
      "A complete website for businesses that need a clear and credible digital presence.",
    price: "A partir de €500",
  },
  {
    id: "seo",
    icon: "Search",
    title: "SEO",
    description:
      "Structure, content and essential elements that help the business be found online.",
    price: null,
  },
  {
    id: "manutencao",
    icon: "Wrench",
    title: "Maintenance",
    description:
      "Updates, small changes and ongoing technical support when needed.",
    price: "A partir de €100/mês",
  },
];

export const servicesNote =
  "The final proposal depends on the needs, scope and functionality of each project.";
