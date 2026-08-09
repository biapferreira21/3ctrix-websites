/**
 * PERGUNTAS FREQUENTES
 * -------------------------------------------------------------
 * Altere aqui as perguntas e respostas do accordion.
 * A mesma lista alimenta também os dados estruturados (FAQPage)
 * para SEO — ver src/app/page.tsx.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "How long does a website project take?",
    answer:
      "The normal maximum delivery time is 15 days, provided content, images and feedback are supplied on schedule.",
  },
  {
    question: "Who owns the domain and hosting?",
    answer:
      "Ficam sempre em nome do cliente. A 3C Trix Studio pode apoiar a configuração e publicação.",
  },
  {
    question: "Is monthly maintenance required?",
    answer:
      "Não. A manutenção é um serviço opcional, indicado apenas quando o negócio necessita de apoio contínuo.",
  },
  {
    question: "Can I request changes?",
    answer:
      "O projeto inclui uma revisão durante o período de desenvolvimento. Alterações adicionais podem ser orçamentadas separadamente.",
  },
  {
    question: "Who provides the copy and photographs?",
    answer:
      "O cliente fornece as fotografias e informações principais. A 3C Trix Studio pode ajudar a escrever, melhorar e reorganizar os textos.",
  },
  {
    question: "Is the mockup free?",
    answer:
      "A proposta visual inicial de uma secção pode ser apresentada gratuitamente a negócios selecionados. O desenvolvimento do website completo começa após a aprovação e confirmação do projeto.",
  },
  {
    question: "Do you only work with businesses in Lisbon?",
    answer:
      "A 3C Trix Studio trabalha com negócios de Lisboa e de outras regiões de Portugal.",
  },
  {
    question: "What types of businesses can use the service?",
    answer:
      "Restaurantes, cafés, clínicas, cabeleireiros, ginásios, lojas, oficinas, associações, escolas, centros de estudo, mercearias e outros pequenos negócios.",
  },
];
