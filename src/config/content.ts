/**
 * CONTEÚDOS DAS SECÇÕES
 * -------------------------------------------------------------
 * Textos centralizados e propositadamente curtos (design
 * visual-first). Altere aqui sem mexer nos componentes.
 */

/* ---------------------------- HERO ---------------------------- */
export const hero = {
  badge: "Estúdio digital · Portugal",
  titleLines: ["O seu negócio merece", "um website à altura."],
  subtitle:
    "Transformamos websites desatualizados em experiências modernas, rápidas e prontas a converter.",
  primaryCta: { label: "Pedir análise gratuita", href: "#contacto" },
  secondaryCta: { label: "Ver transformação real", href: "#projetos" },
  note: "Mockup inicial gratuito para negócios selecionados",
};

/* ------------------------- BARRA DE CONFIANÇA ------------------------- */
export const trustItems = [
  "Websites responsivos",
  "Entrega até 15 dias",
  "Funcionalidades à medida",
  "Domínio em nome do cliente",
  "Apoio nos textos",
];

/* ---------------------------- PROBLEMA ---------------------------- */
export const problems = {
  title: "O seu website ajuda ou afasta clientes?",
  items: [
    { title: "Parece parado no tempo", text: "A primeira impressão perde força." },
    { title: "Complica no telemóvel", text: "Ler, tocar e navegar torna-se um desafio." },
    { title: "Esconde o essencial", text: "Serviços e contactos ficam difíceis de encontrar." },
    { title: "Não convida a agir", text: "Sem um caminho claro, a visita termina cedo." },
    { title: "Demora demasiado", text: "A espera rouba atenção e confiança." },
    { title: "Trabalha sozinho", text: "Sem WhatsApp, mapas ou formulários úteis." },
  ],
};

/* ----------------------- O QUE ESTÁ INCLUÍDO ----------------------- */
export const included = {
  title: "Mais do que um novo design.",
  items: [
    "Até 5 páginas ou secções",
    "Adaptado a telemóvel, tablet e computador",
    "Reorganização da informação",
    "Formulário de contacto",
    "Botão de WhatsApp",
    "Mapas e contactos",
    "Ligação às redes sociais",
    "SEO básico",
    "Melhoria de velocidade",
    "Apoio na escrita dos textos",
    "Funcionalidades à medida",
    "Publicação no domínio do cliente",
    "Uma revisão incluída",
  ],
  note: "O cliente fornece as fotografias e materiais. A 3C Trix Studio pode apoiar a escrita dos textos.",
};

/* --------------- FUNCIONALIDADES ADAPTADAS AO NEGÓCIO --------------- */
export const businessFeatures = {
  title: "Funcionalidades à medida do seu negócio.",
  items: [
    "Marcações",
    "Pedidos de orçamento",
    "Formulários personalizados",
    "Menus digitais",
    "Galerias",
    "Apresentação de serviços",
    "Integração com WhatsApp",
    "Mapas",
    "Horários",
    "Notícias",
    "Eventos",
    "Áreas de contacto",
    "Redes sociais",
  ],
  highlight: "Não criamos apenas websites mais bonitos. Criamos websites mais úteis.",
};

/* -------------------- CASO DE ESTUDO — CLUBE DO PARQUE -------------------- */
export const caseStudy = {
  sectionTitle: "Uma transformação real.",
  name: "Clube do Parque",
  description:
    "O website foi transformado numa experiência moderna, organizada e adaptada a telemóvel — mantendo a identidade e a informação essencial da associação.",
  before: {
    image: withBasePath("/clube-antes.png"),
    imageExists: true,
    placeholder: "Adicionar screenshot do website anterior",
    label: "Antes",
    link: "https://clubedoparque.org/",
  },
  after: {
    image: withBasePath("/clube-depois.png"),
    imageExists: true,
    placeholder: "Adicionar screenshot do novo website",
    label: "Depois",
    link: "https://clube-do-parque.netlify.app/",
  },
  improvements: [
    "Design mais moderno",
    "Melhor organização",
    "Navegação mais clara",
    "Adaptado a telemóvel",
    "Ações mais visíveis",
    "Contactos acessíveis",
  ],
};

/* --------------------------- COMO FUNCIONA --------------------------- */
export const process = {
  title: "Do primeiro contacto ao novo website.",
  steps: [
    { number: "01", icon: "analise", title: "Análise", text: "Avaliamos o website atual e as oportunidades de melhoria." },
    { number: "02", icon: "mockup", title: "Mockup inicial", text: "Proposta visual gratuita de uma secção do website." },
    { number: "03", icon: "aprovacao", title: "Aprovação", text: "Aprovada a direção, confirmamos o orçamento e arrancamos." },
    { number: "04", icon: "dev", title: "Desenvolvimento", text: "Construímos o website à medida do negócio." },
    { number: "05", icon: "revisao", title: "Revisão", text: "Uma revisão incluída no período de desenvolvimento." },
    { number: "06", icon: "publicacao", title: "Publicação", text: "Publicamos no domínio e alojamento do cliente." },
  ],
  note: "Prazo normal máximo: 15 dias, com conteúdos e feedback entregues a tempo.",
};

/* ---------------------- PROPRIEDADE E TRANSPARÊNCIA ---------------------- */
export const ownership = {
  title: "O website é verdadeiramente seu.",
  text: "Domínio, alojamento e contas digitais ficam sempre em nome do cliente, que os paga diretamente e mantém o controlo dos seus ativos.",
  points: [
    { icon: "Globe", title: "Domínio do cliente", text: "O endereço é seu, sem intermediários." },
    { icon: "Server", title: "Alojamento do cliente", text: "O espaço é registado e pago por si." },
    { icon: "KeyRound", title: "Sem dependência", text: "Livre para seguir de forma autónoma." },
  ],
};

/* --------------------------- SOBRE A FUNDADORA --------------------------- */
export const founder = {
  title: "Quem está por detrás da 3C Trix Studio?",
  name: "Beatriz Ferreira",
  role: "Founder da 3C Trix Studio",
  text: "A 3C Trix Studio nasceu para dar a pequenos negócios websites mais modernos, profissionais e úteis — combinando design, código e análise concreta de cada negócio.",
  photo: withBasePath("/beatriz.jpg"),
  photoExists: false, // mude para true quando adicionar a fotografia
  photoPlaceholder: "Adicionar fotografia",
};

/* ---------------------------- CONTACTO ---------------------------- */
export const contactSection = {
  title: "Vamos melhorar o seu website?",
  text: "Envie o website atual e receba uma análise inicial das principais oportunidades.",
  serviceOptions: [
    "Redesign de website",
    "Website de raiz",
    "SEO",
    "Manutenção",
    "Ainda não sei",
  ],
  consentLabel: "Autorizo o contacto da 3C Trix Studio relativamente a este pedido.",
  submitLabel: "Pedir análise gratuita",
};
import { withBasePath } from "./deployment";
