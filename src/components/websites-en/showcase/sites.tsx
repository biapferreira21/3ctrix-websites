/**
 * Mockups de websites PREENCHIDOS, desenhados à medida.
 * Cada um representa um tipo de negócio real, com navegação, títulos,
 * imagens (formas/gradientes), preços e botões — como um website
 * verdadeiro em miniatura. Não são screenshots de terceiros.
 *
 * Escala: desenhados numa base de 320x240 e reduzidos pelo contentor.
 */

type Palette = {
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  panel: string;
  line: string;
};

/* ---------------------------- Primitivas ---------------------------- */

function Chrome({
  pal,
  domain,
  photoIndex,
  children,
}: {
  pal: Palette;
  domain: string;
  photoIndex: number;
  children: React.ReactNode;
}) {
  const column = photoIndex % 4;
  const row = Math.floor(photoIndex / 4);
  const photoPosition = {
    "--photo-x": `${column * 33.333}%`,
    "--photo-y": `${row * 100}%`,
  } as React.CSSProperties;

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{ background: pal.bg, color: pal.ink, ...photoPosition }}
    >
      <div
        className="flex shrink-0 items-center gap-1.5 px-2"
        style={{ height: 18, background: pal.panel, borderBottom: `1px solid ${pal.line}` }}
      >
        <span style={{ width: 4, height: 4, borderRadius: 99, background: pal.line }} />
        <span style={{ width: 4, height: 4, borderRadius: 99, background: pal.line }} />
        <span style={{ width: 4, height: 4, borderRadius: 99, background: pal.line }} />
        <div
          className="ml-1 flex-1 truncate rounded px-1.5"
          style={{
            fontSize: 5,
            lineHeight: "9px",
            background: pal.bg,
            color: pal.muted,
            border: `1px solid ${pal.line}`,
          }}
        >
          {domain}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function Nav({
  pal,
  brand,
  items,
  cta,
}: {
  pal: Palette;
  brand: string;
  items: string[];
  cta?: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-2.5"
      style={{ height: 16, borderBottom: `1px solid ${pal.line}` }}
    >
      <span style={{ fontSize: 6, fontWeight: 700, letterSpacing: -0.1 }}>{brand}</span>
      <div className="flex items-center gap-1.5">
        {items.map((it) => (
          <span key={it} style={{ fontSize: 4.5, color: pal.muted }}>
            {it}
          </span>
        ))}
        {cta && (
          <span
            className="rounded-full px-1.5"
            style={{
              fontSize: 4.5,
              lineHeight: "8px",
              background: pal.accent,
              color: pal.bg,
              fontWeight: 700,
            }}
          >
            {cta}
          </span>
        )}
      </div>
    </div>
  );
}

/** "Fotografia" abstrata — gradiente + formas, sem imagens externas. */
function Photo({
  from,
  to,
  className,
  style,
}: {
  from: string;
  to: string;
  className?: string;
  style?: React.CSSProperties;
  shapes?: "food" | "person" | "product" | "space" | "none";
}) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{
        backgroundColor: from,
        backgroundImage:
          `linear-gradient(135deg, ${from}22, ${to}55), url("${withBasePath(
            "/business-photo-sprite.png"
          )}")`,
        backgroundSize: "cover, 400% 200%",
        backgroundPosition: "center, var(--photo-x, 0%) var(--photo-y, 0%)",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    >
      <span className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/10" />
    </div>
  );
}

function Btn({ pal, label, solid = true }: { pal: Palette; label: string; solid?: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2"
      style={{
        fontSize: 5,
        lineHeight: "10px",
        fontWeight: 700,
        background: solid ? pal.accent : "transparent",
        color: solid ? pal.bg : pal.ink,
        border: solid ? "none" : `1px solid ${pal.line}`,
      }}
    >
      {label}
    </span>
  );
}

/* ------------------------- Paletas por site ------------------------- */

const pRestaurante: Palette = { bg: "#12100E", ink: "#F6F1E8", muted: "#A79C8C", accent: "#E0A64B", panel: "#1B1815", line: "#2C2621" };
const pClinica: Palette = { bg: "#FFFFFF", ink: "#0F2A3D", muted: "#7C93A3", accent: "#1B84C7", panel: "#F1F7FB", line: "#DDE9F0" };
const pGinasio: Palette = { bg: "#0D0F12", ink: "#F2F5F7", muted: "#8C949E", accent: "#C8F24C", panel: "#161A1F", line: "#252B33" };
const pLoja: Palette = { bg: "#FFFFFF", ink: "#1E1B18", muted: "#8C837A", accent: "#B4553C", panel: "#FAF6F1", line: "#EAE2D8" };
const pCabeleireiro: Palette = { bg: "#FBF7F7", ink: "#2A1F26", muted: "#93818C", accent: "#B5638A", panel: "#F3E9EE", line: "#E8DAE1" };
const pOficina: Palette = { bg: "#14181B", ink: "#EDF1F4", muted: "#8A959D", accent: "#F2A33C", panel: "#1D2328", line: "#2B333A" };
const pAssociacao: Palette = { bg: "#FFFFFF", ink: "#10281A", muted: "#6E8377", accent: "#1E7A47", panel: "#F0F6F1", line: "#DCE9E0" };
const pImobiliaria: Palette = { bg: "#FFFFFF", ink: "#14213A", muted: "#7A849B", accent: "#20509E", panel: "#F3F6FB", line: "#E1E7F0" };

/* ------------------------------ Sites ------------------------------ */

export function SiteRestaurante() {
  const p = pRestaurante;
  return (
    <Chrome pal={p} domain="tascadobairro.pt" photoIndex={0}>
      <Nav pal={p} brand="Tasca do Bairro" items={["Menu", "Reservas"]} cta="Reservar" />
      <div className="relative" style={{ height: 78 }}>
        <Photo from="#5A3A1E" to="#241610" className="absolute inset-0" shapes="food" />
        <div className="absolute inset-0 flex flex-col justify-center px-2.5" style={{ background: "linear-gradient(90deg, rgba(18,16,14,.88), rgba(18,16,14,.15))" }}>
          <span style={{ fontSize: 11, fontWeight: 700, lineHeight: "12px", maxWidth: "62%" }}>
            Cozinha portuguesa de sempre
          </span>
          <span style={{ fontSize: 5, color: p.muted, marginTop: 3, maxWidth: "56%" }}>
            Aberto de terça a domingo · Almoços e jantares
          </span>
          <div className="mt-1.5 flex gap-1">
            <Btn pal={p} label="Ver menu" />
            <Btn pal={p} label="Como chegar" solid={false} />
          </div>
        </div>
      </div>
      <div className="px-2.5 pt-2">
        <span style={{ fontSize: 5.5, fontWeight: 700 }}>Pratos do dia</span>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {[["Bacalhau à Brás", "12,50 €"], ["Polvo à lagareiro", "16,00 €"], ["Arroz de pato", "11,00 €"]].map(([n, pr]) => (
            <div key={n} className="overflow-hidden rounded" style={{ background: p.panel, border: `1px solid ${p.line}` }}>
              <Photo from="#7A5326" to="#3A2415" style={{ height: 20 }} shapes="food" />
              <div className="px-1 py-1">
                <div style={{ fontSize: 4.5, fontWeight: 600 }}>{n}</div>
                <div style={{ fontSize: 4.5, color: p.accent, fontWeight: 700 }}>{pr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export function SiteClinica() {
  const p = pClinica;
  return (
    <Chrome pal={p} domain="clinicasorriso.pt" photoIndex={1}>
      <Nav pal={p} brand="Clínica Sorriso" items={["Services", "Equipa"]} cta="Marcar" />
      <div className="flex gap-2 px-2.5 pt-2.5">
        <div style={{ width: "56%" }}>
          <span style={{ fontSize: 10, fontWeight: 700, lineHeight: "11px", display: "block" }}>
            Cuidamos do seu sorriso
          </span>
          <span style={{ fontSize: 5, color: p.muted, display: "block", marginTop: 3 }}>
            Medicina dentária em Lisboa, com marcação online e horário alargado.
          </span>
          <div className="mt-2 flex gap-1">
            <Btn pal={p} label="Marcar consulta" />
            <Btn pal={p} label="Learn more" solid={false} />
          </div>
        </div>
        <Photo from="#8FD0F2" to="#1B84C7" className="rounded" style={{ width: "44%", height: 56 }} shapes="person" />
      </div>
      <div className="mt-2 px-2.5">
        <div className="grid grid-cols-4 gap-1.5">
          {["Implantes", "Ortodontia", "Branqueamento", "Check-up"].map((s) => (
            <div key={s} className="rounded px-1 py-1.5 text-center" style={{ background: p.panel, border: `1px solid ${p.line}` }}>
              <div className="mx-auto mb-1 rounded-full" style={{ width: 8, height: 8, background: p.accent, opacity: 0.85 }} />
              <div style={{ fontSize: 4.2, fontWeight: 600 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between px-2.5">
        <span style={{ fontSize: 4.5, color: p.muted }}>Seg–Sáb · 9h–20h</span>
        <span style={{ fontSize: 4.5, color: p.accent, fontWeight: 700 }}>+351 21 000 0000</span>
      </div>
    </Chrome>
  );
}

export function SiteGinasio() {
  const p = pGinasio;
  return (
    <Chrome pal={p} domain="formafit.pt" photoIndex={2}>
      <Nav pal={p} brand="FORMA FIT" items={["Aulas", "Preços"]} cta="Aderir" />
      <div className="relative" style={{ height: 82 }}>
        <Photo from="#2A3140" to="#0D0F12" className="absolute inset-0" shapes="person" />
        <div className="absolute inset-0 flex flex-col justify-center px-2.5">
          <span style={{ fontSize: 13, fontWeight: 800, lineHeight: "13px", letterSpacing: -0.4 }}>
            TREINA
            <br />
            <span style={{ color: p.accent }}>SEM DESCULPAS</span>
          </span>
          <div className="mt-2">
            <Btn pal={p} label="1ª aula grátis" />
          </div>
        </div>
      </div>
      <div className="px-2.5 pt-2">
        <div className="grid grid-cols-3 gap-1.5">
          {[["Musculação", "24h"], ["Aulas de grupo", "12/dia"], ["PT", "1-a-1"]].map(([t, s]) => (
            <div key={t} className="rounded px-1.5 py-1.5" style={{ background: p.panel, border: `1px solid ${p.line}` }}>
              <div style={{ fontSize: 5, fontWeight: 700 }}>{t}</div>
              <div style={{ fontSize: 4.2, color: p.muted }}>{s}</div>
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex items-center justify-between rounded px-1.5 py-1" style={{ background: p.accent }}>
          <span style={{ fontSize: 5, fontWeight: 800, color: "#0D0F12" }}>Mensalidade desde 24,90 €</span>
          <span style={{ fontSize: 4.5, fontWeight: 700, color: "#0D0F12" }}>Ver planos →</span>
        </div>
      </div>
    </Chrome>
  );
}

export function SiteLoja() {
  const p = pLoja;
  return (
    <Chrome pal={p} domain="mercearia-flor.pt" photoIndex={3}>
      <Nav pal={p} brand="Mercearia Flor" items={["Loja", "Sobre"]} cta="Cesto (2)" />
      <div className="flex items-center gap-2 px-2.5 pt-2">
        <div style={{ width: "52%" }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, lineHeight: "10px", display: "block" }}>
            Produtos locais, entregues em casa
          </span>
          <div className="mt-1.5">
            <Btn pal={p} label="Comprar agora" />
          </div>
        </div>
        <Photo from="#E3B98F" to="#B4553C" className="rounded" style={{ width: "48%", height: 44 }} shapes="product" />
      </div>
      <div className="px-2.5 pt-2">
        <div className="grid grid-cols-4 gap-1.5">
          {[["Azeite", "8,90 €"], ["Queijo", "6,50 €"], ["Mel", "5,20 €"], ["Compota", "4,10 €"]].map(([n, pr]) => (
            <div key={n} className="overflow-hidden rounded" style={{ border: `1px solid ${p.line}`, background: p.panel }}>
              <Photo from="#EBD9C2" to="#C9A882" style={{ height: 22 }} shapes="product" />
              <div className="px-1 py-1">
                <div style={{ fontSize: 4.3, fontWeight: 600 }}>{n}</div>
                <div style={{ fontSize: 4.6, fontWeight: 700, color: p.accent }}>{pr}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1.5 rounded px-1.5 py-1 text-center" style={{ background: p.panel, border: `1px dashed ${p.line}` }}>
          <span style={{ fontSize: 4.5, color: p.muted }}>Entregas grátis acima de 30 € · Lisboa</span>
        </div>
      </div>
    </Chrome>
  );
}

export function SiteCabeleireiro() {
  const p = pCabeleireiro;
  return (
    <Chrome pal={p} domain="studioane.pt" photoIndex={4}>
      <Nav pal={p} brand="Studio Ané" items={["Services", "Equipa", "Galeria"]} cta="Marcar" />
      <div className="relative" style={{ height: 82 }}>
        <Photo from="#4b302f" to="#2a1f26" className="absolute inset-0" />
        <div
          className="absolute inset-0 flex flex-col justify-center px-3"
          style={{ background: "linear-gradient(90deg,rgba(42,31,38,.88),rgba(42,31,38,.08))" }}
        >
          <span
            style={{
              maxWidth: "58%",
              fontSize: 11,
              fontWeight: 750,
              lineHeight: "11px",
              color: "#fff",
            }}
          >
            O seu cabelo, com mais personalidade.
          </span>
          <span
            style={{
              maxWidth: "52%",
              fontSize: 4.8,
              color: "rgba(255,255,255,.76)",
              marginTop: 4,
            }}
          >
            Corte, cor e tratamentos num espaço pensado para si.
          </span>
          <div className="mt-2 flex gap-1">
            <Btn pal={p} label="Marcar online" />
            <span
              className="rounded-full border border-white/35 px-2 text-white"
              style={{ fontSize: 4.5, lineHeight: "10px", fontWeight: 700 }}
            >
              Ver serviços
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.35fr_.85fr] gap-2 px-2.5 pt-2">
        <div>
          <span style={{ fontSize: 5.5, fontWeight: 700 }}>Services mais marcados</span>
          <div className="mt-1 space-y-1">
            {[
              ["Corte & brushing", "28 €"],
              ["Coloração", "45 €"],
              ["Tratamento nutritivo", "22 €"],
            ].map(([service, price]) => (
              <div
                key={service}
                className="flex items-center justify-between rounded px-1.5 py-1"
                style={{ background: p.panel, border: `1px solid ${p.line}` }}
              >
                <span style={{ fontSize: 4.3, fontWeight: 600 }}>{service}</span>
                <span style={{ fontSize: 4.4, color: p.accent, fontWeight: 750 }}>{price}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded p-1.5"
          style={{ background: "#fff", border: `1px solid ${p.line}` }}
        >
          <span style={{ fontSize: 4.5, fontWeight: 700 }}>Próxima vaga</span>
          <div
            className="mt-1 rounded px-1.5 py-1.5 text-center"
            style={{ background: p.accent, color: "#fff" }}
          >
            <span style={{ display: "block", fontSize: 7, fontWeight: 800 }}>Hoje</span>
            <span style={{ display: "block", fontSize: 5, marginTop: 1 }}>16:30</span>
          </div>
          <span
            className="mt-1 block text-center"
            style={{ fontSize: 4, color: p.muted }}
          >
            Confirmação imediata
          </span>
        </div>
      </div>
    </Chrome>
  );
}

export function SiteOficina() {
  const p = pOficina;
  return (
    <Chrome pal={p} domain="autocentral.pt" photoIndex={5}>
      <Nav pal={p} brand="Auto Central" items={["Services", "Contacts"]} cta="Orçamento" />
      <div className="flex gap-2 px-2.5 pt-2.5">
        <div style={{ width: "58%" }}>
          <span style={{ fontSize: 10, fontWeight: 700, lineHeight: "11px", display: "block" }}>
            A sua oficina de confiança
          </span>
          <span style={{ fontSize: 4.8, color: p.muted, display: "block", marginTop: 3 }}>
            Revisões, travões e diagnóstico. Orçamento em 24h.
          </span>
          <div className="mt-2 flex gap-1">
            <Btn pal={p} label="Pedir orçamento" />
            <Btn pal={p} label="WhatsApp" solid={false} />
          </div>
        </div>
        <Photo from="#3B434B" to="#14181B" className="rounded" style={{ width: "42%", height: 50 }} shapes="space" />
      </div>
      <div className="mt-2 px-2.5">
        <div className="grid grid-cols-3 gap-1.5">
          {[["Revisão", "desde 79 €"], ["Travões", "desde 55 €"], ["Diagnóstico", "gratuito"]].map(([t, pr]) => (
            <div key={t} className="rounded px-1.5 py-1.5" style={{ background: p.panel, border: `1px solid ${p.line}` }}>
              <div style={{ fontSize: 4.8, fontWeight: 700 }}>{t}</div>
              <div style={{ fontSize: 4.4, color: p.accent, fontWeight: 700 }}>{pr}</div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export function SiteAssociacao() {
  const p = pAssociacao;
  return (
    <Chrome pal={p} domain="clubedoparque.org" photoIndex={6}>
      <Nav pal={p} brand="Clube do Parque" items={["Atividades", "News"]} cta="Aderir" />
      <div className="relative" style={{ height: 62 }}>
        <Photo from="#8FCBA4" to="#1E7A47" className="absolute inset-0" shapes="space" />
        <div className="absolute inset-0 flex flex-col justify-center px-2.5">
          <span style={{ fontSize: 10, fontWeight: 700, lineHeight: "11px", color: "#FFF", maxWidth: "70%" }}>
            Uma comunidade ativa desde 1978
          </span>
          <div className="mt-1.5">
            <Btn pal={p} label="Ver atividades" />
          </div>
        </div>
      </div>
      <div className="px-2.5 pt-2">
        <span style={{ fontSize: 5.5, fontWeight: 700 }}>Próximos eventos</span>
        <div className="mt-1.5 space-y-1">
          {[["12 JUL", "Caminhada no parque"], ["19 JUL", "Torneio de petanca"], ["02 AGO", "Assembleia geral"]].map(([d, t]) => (
            <div key={t} className="flex items-center gap-1.5 rounded px-1.5 py-1" style={{ background: p.panel, border: `1px solid ${p.line}` }}>
              <span className="rounded px-1" style={{ fontSize: 4, lineHeight: "9px", fontWeight: 800, background: p.accent, color: "#FFF" }}>{d}</span>
              <span style={{ fontSize: 4.6, fontWeight: 600 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export function SiteImobiliaria() {
  const p = pImobiliaria;
  return (
    <Chrome pal={p} domain="casaviva.pt" photoIndex={7}>
      <Nav pal={p} brand="Casa Viva" items={["Imóveis", "Vender"]} cta="Contactar" />
      <div className="px-2.5 pt-2">
        <span style={{ fontSize: 9.5, fontWeight: 700, lineHeight: "10px", display: "block" }}>
          Encontre a casa certa
        </span>
        <div className="mt-1.5 flex items-center gap-1 rounded px-1.5 py-1" style={{ background: p.panel, border: `1px solid ${p.line}` }}>
          <span style={{ fontSize: 4.4, color: p.muted, flex: 1 }}>Lisboa · T2 · até 400.000 €</span>
          <span className="rounded px-1.5" style={{ fontSize: 4.4, lineHeight: "9px", fontWeight: 700, background: p.accent, color: "#FFF" }}>Procurar</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[["T2 · Alvalade", "395.000 €"], ["T3 · Benfica", "420.000 €"], ["T1 · Baixa", "285.000 €"]].map(([t, pr]) => (
            <div key={t} className="overflow-hidden rounded" style={{ border: `1px solid ${p.line}` }}>
              <Photo from="#AFC3E6" to="#20509E" style={{ height: 26 }} shapes="space" />
              <div className="px-1 py-1">
                <div style={{ fontSize: 4.3, fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 4.8, fontWeight: 700, color: p.accent }}>{pr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export type SiteEntry = { label: string; Component: () => React.ReactElement };

export const sites: SiteEntry[] = [
  { label: "Restaurante", Component: SiteRestaurante },
  { label: "Clínica", Component: SiteClinica },
  { label: "Ginásio", Component: SiteGinasio },
  { label: "Loja online", Component: SiteLoja },
  { label: "Cabeleireiro", Component: SiteCabeleireiro },
  { label: "Oficina", Component: SiteOficina },
  { label: "Associação", Component: SiteAssociacao },
  { label: "Imobiliária", Component: SiteImobiliaria },
];
import { withBasePath } from "@/config/deployment";
