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
    question: "Quanto tempo demora a criação do website?",
    answer:
      "O prazo normal máximo é de 15 dias, desde que o cliente forneça os conteúdos, fotografias e feedback dentro dos prazos acordados.",
  },
  {
    question: "O domínio e o alojamento ficam em nome de quem?",
    answer:
      "Ficam sempre em nome do cliente. A 3C Trix Studio pode apoiar a configuração e publicação.",
  },
  {
    question: "Tenho de pagar manutenção mensal?",
    answer:
      "Não. A manutenção é um serviço opcional, indicado apenas quando o negócio necessita de apoio contínuo.",
  },
  {
    question: "Posso pedir alterações?",
    answer:
      "O projeto inclui uma revisão durante o período de desenvolvimento. Alterações adicionais podem ser orçamentadas separadamente.",
  },
  {
    question: "Quem fornece os textos e fotografias?",
    answer:
      "O cliente fornece as fotografias e informações principais. A 3C Trix Studio pode ajudar a escrever, melhorar e reorganizar os textos.",
  },
  {
    question: "O mockup é gratuito?",
    answer:
      "A proposta visual inicial de uma secção pode ser apresentada gratuitamente a negócios selecionados. O desenvolvimento do website completo começa após a aprovação e confirmação do projeto.",
  },
  {
    question: "Trabalham apenas com empresas de Lisboa?",
    answer:
      "A 3C Trix Studio trabalha com negócios de Lisboa e de outras regiões de Portugal.",
  },
  {
    question: "Que tipos de negócios podem contratar o serviço?",
    answer:
      "Restaurantes, cafés, clínicas, cabeleireiros, ginásios, lojas, oficinas, associações, escolas, centros de estudo, mercearias e outros pequenos negócios.",
  },
];
