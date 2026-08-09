/**
 * CONTEÚDOS DAS SECÇÕES
 * -------------------------------------------------------------
 * Textos centralizados e propositadamente curtos (design
 * visual-first). Altere aqui sem mexer nos componentes.
 */

/* ---------------------------- HERO ---------------------------- */
export const hero = {
  badge: "Digital studio · Portugal",
  titleLines: ["Your business deserves", "um website à altura."],
  subtitle:
    "Transformamos websites desatualizados em experiências modernas, rápidas e prontas a converter.",
  primaryCta: { label: "Request a free review", href: "#contacto" },
  secondaryCta: { label: "Ver transformação real", href: "#projetos" },
  note: "Free initial mockup para negócios selecionados",
};

/* ------------------------- BARRA DE CONFIANÇA ------------------------- */
export const trustItems = [
  "Responsive websites",
  "Delivery within 15 days",
  "Business-specific functionality",
  "Domain owned by the client",
  "Support with website copy",
];

/* ---------------------------- PROBLEMA ---------------------------- */
export const problems = {
  title: "Does your website help customers or push them away?",
  items: [
    { title: "It looks outdated", text: "The first impression loses impact." },
    { title: "It is difficult on mobile", text: "Reading, tapping and navigating become difficult." },
    { title: "It hides what matters", text: "Services e contactos ficam difíceis de encontrar." },
    { title: "It does not guide action", text: "Without a clear path, the visit ends early." },
    { title: "It loads too slowly", text: "Waiting costs attention and trust." },
    { title: "It is disconnected", text: "Without useful contact, map or form integrations." },
  ],
};

/* ----------------------- O QUE ESTÁ INCLUÍDO ----------------------- */
export const included = {
  title: "Mais do que um novo design.",
  items: [
    "Até 5 páginas ou secções",
    "Mobile-friendly, tablet e computador",
    "Reorganização da informação",
    "Formulário de contacto",
    "Botão de WhatsApp",
    "Maps e contactos",
    "Ligação às redes sociais",
    "SEO básico",
    "Melhoria de velocidade",
    "Apoio na escrita dos textos",
    "Business-specific functionality",
    "Publicação no domínio do cliente",
    "Uma revisão incluída",
  ],
  note: "O cliente fornece as fotografias e materiais. A 3C Trix Studio pode apoiar a escrita dos textos.",
};

/* --------------- FUNCIONALIDADES ADAPTADAS AO NEGÓCIO --------------- */
export const businessFeatures = {
  title: "Business-specific functionality do seu negócio.",
  items: [
    "Bookings",
    "Quote requests",
    "Custom forms",
    "Digital menus",
    "Galleries",
    "Service presentation",
    "WhatsApp integration",
    "Maps",
    "Opening hours",
    "News",
    "Events",
    "Contact areas",
    "Social media",
  ],
  highlight: "We do not only make websites look better. We make them more useful.",
};

/* -------------------- CASO DE ESTUDO — CLUBE DO PARQUE -------------------- */
export const caseStudy = {
  sectionTitle: "A real transformation.",
  name: "Clube do Parque",
  description:
    "The website was transformed into a modern, organised and mobile-friendly experience while preserving the association's identity and essential information.",
  before: {
    image: withBasePath("/clube-antes.png"),
    imageExists: true,
    placeholder: "Adicionar screenshot do website anterior",
    label: "Before",
    link: "https://clubedoparque.org/",
  },
  after: {
    image: withBasePath("/clube-depois.png"),
    imageExists: true,
    placeholder: "Adicionar screenshot do novo website",
    label: "After",
    link: "https://clube-do-parque.netlify.app/",
  },
  improvements: [
    "More modern design",
    "Better organisation",
    "Clearer navigation",
    "Mobile-friendly",
    "More visible actions",
    "Accessible contact details",
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
  title: "The website is genuinely yours.",
  text: "The domain, hosting and digital accounts remain in the client's name, with direct payment and full control of their digital assets.",
  points: [
    { icon: "Globe", title: "Client-owned domain", text: "The address is yours, without intermediaries." },
    { icon: "Server", title: "Client-owned hosting", text: "The hosting is registered and paid by you." },
    { icon: "KeyRound", title: "No lock-in", text: "Free to continue independently." },
  ],
};

/* --------------------------- SOBRE A FUNDADORA --------------------------- */
export const founder = {
  title: "Quem está por detrás da 3C Trix Studio?",
  name: "Beatriz Ferreira",
  role: "Founder da 3C Trix Studio",
  text: "A 3C Trix Studio nasceu para dar a pequenos negócios websites mais modernos, profissionais e úteis — combinando design, código e análise concreta de cada negócio.",
  photo: withBasePath("/beatriz-founder.png"),
  photoExists: true,
  photoPlaceholder: "Adicionar fotografia",
};

/* ---------------------------- CONTACTO ---------------------------- */
export const contactSection = {
  title: "Ready to improve your website?",
  text: "Share your current website for an initial review of the main opportunities.",
  serviceOptions: [
    "Redesign de website",
    "New website",
    "SEO",
    "Maintenance",
    "Not sure yet",
  ],
  consentLabel: "I authorise 3C Trix Studio to contact me about this request.",
  submitLabel: "Send enquiry",
};
import { withBasePath } from "@/config/deployment";
