import { contact } from "@/config/brand";

/**
 * Constrói o link do WhatsApp (wa.me) com mensagem pré-preenchida.
 * Devolve `null` quando o número ainda não foi configurado — nesse
 * caso o botão de WhatsApp deve ficar desativado.
 *
 * O número é definido em NEXT_PUBLIC_WHATSAPP_NUMBER (ver .env.example).
 */
export function getWhatsAppUrl(customMessage?: string): string | null {
  const number = contact.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;

  const message = customMessage ?? contact.whatsappMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const isWhatsAppConfigured = Boolean(
  contact.whatsappNumber.replace(/\D/g, "")
);
