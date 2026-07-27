/**
 * ============================================================
 * CONFIGURAÇÃO DA MARCA — 3C Trix Studio
 * ------------------------------------------------------------
 * Ficheiro central. Altere aqui:
 *   - email de contacto
 *   - número de WhatsApp
 *   - links (redes sociais, etc.)
 *   - textos base da marca
 * sem precisar de procurar em vários componentes.
 * ============================================================
 */

export const brand = {
  name: "3C Trix Studio",
  shortName: "3C Trix",
  tagline: "Websites modernos para pequenos negócios.",
  logo: {
    // Logótipo real da marca em /public/3ctrix-logo.jpg.
    // (Existe também uma versão vetorial em /public/3ctrix-logo.svg como alternativa.)
    src: withBasePath("/3ctrix-logo-refined.png"),
    alt: "Logótipo da 3C Trix Studio",
  },
} as const;

/**
 * CONTACTOS
 * -------------------------------------------------------------
 * Estes valores são lidos preferencialmente das variáveis de
 * ambiente (ver .env.example). Caso não estejam definidas, são
 * usados os PLACEHOLDERS abaixo — claramente identificados.
 *
 * ⚠️ Nenhum contacto real foi inventado. Substitua os
 * placeholders pelos dados verdadeiros antes de publicar.
 */
export const contact = {
  // Email público mostrado no site.
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "websites@3ctrix.com",

  // WhatsApp em formato internacional (apenas dígitos), ex.: "351912345678".
  // Enquanto estiver vazio, o botão de WhatsApp fica desativado.
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "351935477498",

  // Mensagem pré-preenchida do WhatsApp.
  whatsappMessage:
    "Olá, vi o website da 3C Trix Studio e gostaria de saber como podem melhorar o website do meu negócio.",
} as const;

/**
 * Indica se o email atual ainda é um placeholder por preencher.
 */
export const isEmailPlaceholder = false;

/**
 * REDES SOCIAIS
 * -------------------------------------------------------------
 * Adicione os URLs quando existirem. Enquanto estiverem a null,
 * as ligações não são mostradas no site (nada é inventado).
 */
export const social = {
  instagram: null as string | null, // ex.: "https://instagram.com/3ctrixstudio"
  linkedin: null as string | null, // ex.: "https://linkedin.com/company/3ctrixstudio"
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://3ctrix.com/websites";
import { withBasePath } from "./deployment";
