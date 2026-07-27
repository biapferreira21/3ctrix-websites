"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { caseStudy } from "@/config/content";

type Side = typeof caseStudy.before | typeof caseStudy.after;

/** Painel de cada lado: imagem real (se existir) ou placeholder elegante. */
function Panel({ side, tone }: { side: Side; tone: "before" | "after" }) {
  if (side.imageExists) {
    return (
      <Image
        src={side.image}
        alt={`Website ${side.label.toLowerCase()} — ${caseStudy.name}`}
        fill
        sizes="(max-width: 1024px) 100vw, 900px"
        className="object-cover object-top"
        draggable={false}
      />
    );
  }

  // Placeholder: "antes" bege/datado · "depois" claro com acento esmeralda.
  // O conteúdo é encostado ao lado respetivo para não colidir no divisor.
  return (
    <div
      className={
        tone === "before"
          ? "flex h-full w-full items-center justify-start bg-[#e9e6dd] pl-[7%]"
          : "flex h-full w-full items-center justify-end bg-gradient-to-br from-white to-mint-soft pr-[7%]"
      }
    >
      <p
        className={
          tone === "before"
            ? "max-w-[40%] text-left text-xs font-medium text-[#9a927f]"
            : "max-w-[40%] text-right text-xs font-medium text-slate"
        }
      >
        {side.placeholder}
      </p>
    </div>
  );
}

export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl border-[4px] border-night bg-white shadow-[8px_8px_0_#9985DC]"
    >
      {/* Camada "depois" (fundo) */}
      <div className="absolute inset-0">
        <Panel side={caseStudy.after} tone="after" />
      </div>

      {/* Camada "antes" (recortada pela posição) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Panel side={caseStudy.before} tone="before" />
      </div>

      {/* Etiquetas */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white backdrop-blur">
        Antes
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-emerald px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white">
        Depois
      </span>

      {/* Linha + pega */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          role="slider"
          aria-label="Comparar antes e depois — arraste ou use as setas"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-sage/30 bg-white text-forest-deep shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
