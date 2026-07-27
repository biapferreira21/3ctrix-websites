import { getWhatsAppUrl, isWhatsAppConfigured } from "@/lib/whatsapp";

/** Glifo do WhatsApp desenhado à medida. */
function WhatsAppGlyph({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.13c-.25.69-1.44 1.32-1.98 1.36-.53.05-.53.42-3.32-.69-2.79-1.11-4.5-3.98-4.64-4.17-.14-.19-1.11-1.48-1.11-2.82s.71-2 .96-2.28c.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.83 2.07.9 2.22.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.81.88-1.08.18-.28.37-.23.62-.14.25.09 1.59.75 1.87.89.28.14.46.21.53.32.07.12.07.65-.18 1.35Z" />
    </svg>
  );
}

/**
 * Botão flutuante de WhatsApp.
 * O número vem de NEXT_PUBLIC_WHATSAPP_NUMBER (ver .env.example).
 * Sem número configurado, o botão aparece DESATIVADO e identificado.
 */
export function WhatsAppButton() {
  const url = getWhatsAppUrl();

  if (!isWhatsAppConfigured || !url) {
    return (
      <div
        className="fixed bottom-5 right-5 z-40"
        title="WhatsApp ainda não configurado (defina NEXT_PUBLIC_WHATSAPP_NUMBER)"
      >
        <span
          aria-hidden
          className="inline-flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full bg-sage/70 text-white shadow-soft"
        >
          <WhatsAppGlyph size={24} />
        </span>
        <span className="sr-only">Botão de WhatsApp por configurar</span>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar connosco no WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-white shadow-lift transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2"
    >
      <span className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-emerald/40 blur-md" />
      <WhatsAppGlyph size={26} />
    </a>
  );
}
