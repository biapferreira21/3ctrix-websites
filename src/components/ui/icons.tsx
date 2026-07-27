/**
 * Conjunto de ícones SVG desenhados à medida para a 3C Trix Studio.
 * Estilo consistente: traço 1.6, cantos redondos, sem preenchimento.
 * Evita o aspeto genérico/"AI" de bibliotecas de ícones.
 */

type IconProps = {
  size?: number;
  className?: string;
};

function Svg({
  size = 24,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Redesign — janela de browser com ciclo de transformação. */
export function IconRedesign(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18" />
      <path d="M9.5 16.2a3.2 3.2 0 1 0 .4-4.6" />
      <path d="M9.1 11v2.6h2.6" />
    </Svg>
  );
}

/** Website de raiz — grelha/blueprint com nó central. */
export function IconBuild(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 8.5v7M8.5 12h7" />
      <circle cx="12" cy="12" r="1.4" />
    </Svg>
  );
}

/** SEO — lupa sobre barras crescentes. */
export function IconSeo(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m20 20-4.7-4.7" />
      <path d="M8.5 11.8v-1M10.5 11.8V9M12.5 11.8v-2.6" />
    </Svg>
  );
}

/** Manutenção — controlos/afinações. */
export function IconMaintenance(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 7.5h9M17 7.5h3" />
      <path d="M4 16.5h3M11 16.5h9" />
      <circle cx="15" cy="7.5" r="2.1" />
      <circle cx="9" cy="16.5" r="2.1" />
    </Svg>
  );
}

/** Domínio — globo. */
export function IconDomain(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <ellipse cx="12" cy="12" rx="3.4" ry="8" />
    </Svg>
  );
}

/** Alojamento — pilha de servidores. */
export function IconHosting(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="5" width="16" height="6" rx="1.6" />
      <rect x="4" y="13" width="16" height="6" rx="1.6" />
      <path d="M7.5 8h.01M7.5 16h.01" />
    </Svg>
  );
}

/** Independência — chave. */
export function IconKey(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="8" cy="12" r="3.6" />
      <path d="M11.6 12H21M18 12v3M15 12v2" />
    </Svg>
  );
}

/** Visto — marca de verificação. */
export function IconCheck(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </Svg>
  );
}

/** Seta diagonal (ligações externas). */
export function IconArrowUpRight(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </Svg>
  );
}

/** Seta para a direita. */
export function IconArrowRight(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </Svg>
  );
}

/* --------- Ícones do processo "Como funciona" --------- */

/** Análise — lupa sobre documento. */
export function IconAnalise(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 3h8l4 4v6" />
      <path d="M6 3v9" />
      <path d="M6 21h12v-4" />
      <circle cx="8.5" cy="16.5" r="3" />
      <path d="m11 19 2.2 2.2" />
    </Svg>
  );
}

/** Mockup — janela/layout. */
export function IconMockup(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 13h5M7 16.5h8" />
    </Svg>
  );
}

/** Aprovação — visto em círculo. */
export function IconAprovacao(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12 2.6 2.6L16 9" />
    </Svg>
  );
}

/** Desenvolvimento — sinais de código. */
export function IconDev(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 6-3 12" />
    </Svg>
  );
}

/** Revisão — lápis/edição. */
export function IconRevisao(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 20h4L19 9a2 2 0 0 0-3-3L5 17z" />
      <path d="M14.5 7.5 17 10" />
    </Svg>
  );
}

/** Publicação — envio para cima. */
export function IconPublicacao(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 15V4" />
      <path d="m8 8 4-4 4 4" />
      <path d="M5 14v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
    </Svg>
  );
}

export const serviceIcons = {
  redesign: IconRedesign,
  raiz: IconBuild,
  seo: IconSeo,
  manutencao: IconMaintenance,
} as const;

export const processIcons = {
  analise: IconAnalise,
  mockup: IconMockup,
  aprovacao: IconAprovacao,
  dev: IconDev,
  revisao: IconRevisao,
  publicacao: IconPublicacao,
} as const;

export const ownershipIcons = {
  Globe: IconDomain,
  Server: IconHosting,
  KeyRound: IconKey,
} as const;
