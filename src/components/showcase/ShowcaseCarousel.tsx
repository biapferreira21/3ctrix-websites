"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { sites } from "./sites";

const CARD_W = 360;
const CARD_H = 270;
const SITE_W = 320;
const SITE_H = 240;
const SITE_SCALE = CARD_W / SITE_W;
const N = sites.length;
const STEP = 360 / N;
const RADIUS = Math.round(CARD_W / 2 / Math.tan(Math.PI / N)) + 36;

function SitePreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full overflow-hidden bg-white">
      <div
        style={{
          width: SITE_W,
          height: SITE_H,
          transform: `scale(${SITE_SCALE})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Card({
  index,
  label,
  children,
}: {
  index: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <article
      aria-label={`Exemplo de website: ${label}`}
      className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.15rem] border-[5px] border-[#1a211d] bg-[#1a211d] ring-1 ring-white/15"
      style={{
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        transform: `rotateY(${index * STEP}deg) translateZ(${RADIUS}px)`,
        backfaceVisibility: "hidden",
        boxShadow:
          "0 30px 70px rgba(0,0,0,.58), 0 0 0 1px rgba(183,166,234,.08)",
      }}
    >
      <SitePreview>{children}</SitePreview>
      <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/15 bg-night/85 px-3 py-1 text-[0.66rem] font-semibold text-white shadow-lg backdrop-blur-md">
        {label}
      </span>
    </article>
  );
}

function StaticGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {sites.slice(0, 6).map((site) => {
        const Site = site.Component;
        return (
          <article
            key={site.label}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-[#1a211d] bg-[#1a211d] ring-1 ring-white/10"
          >
            <SitePreview>
              <Site />
            </SitePreview>
            <span className="absolute bottom-3 left-3 rounded-full bg-night/85 px-3 py-1 text-[0.66rem] font-semibold text-white">
              {site.label}
            </span>
          </article>
        );
      })}
    </div>
  );
}

export function ShowcaseCarousel() {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [displayScale, setDisplayScale] = useState(1);
  const rotation = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const hovering = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const update = () => setDisplayScale(Math.min(1, wrapper.clientWidth / CARD_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    const ring = ringRef.current;
    if (!ring) return;

    const apply = () => {
      ring.style.transform = `translateZ(-${RADIUS}px) rotateY(${rotation.current}deg)`;
    };
    apply();

    const AUTO_SPEED = -5.5;
    let previous = performance.now();
    const tick = () => {
      const now = performance.now();
      const deltaTime = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      if (dragging.current) {
        // O movimento é controlado diretamente pelo ponteiro.
      } else if (Math.abs(velocity.current) > 0.02) {
        rotation.current += velocity.current * deltaTime;
        velocity.current *= 0.94;
      } else if (!hovering.current) {
        rotation.current += AUTO_SPEED * deltaTime;
      }
      apply();
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [reduce]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    dragging.current = true;
    lastX.current = event.clientX;
    velocity.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const movement = event.clientX - lastX.current;
    lastX.current = event.clientX;
    const delta = movement * 0.34;
    rotation.current += delta;
    velocity.current = delta / 0.016;
  };

  const endDrag = () => {
    dragging.current = false;
  };

  if (reduce) return <StaticGrid />;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-night to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-night to-transparent sm:w-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lilac/10 blur-3xl" />

      <div ref={wrapperRef} className="relative mx-auto w-full max-w-[360px]">
        <div style={{ height: CARD_H * displayScale }}>
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerEnter={() => (hovering.current = true)}
            onPointerLeave={() => {
              hovering.current = false;
              endDrag();
            }}
            className="relative cursor-grab touch-pan-y active:cursor-grabbing"
            style={{
              width: CARD_W,
              height: CARD_H,
              perspective: "1450px",
              transform: `scale(${displayScale})`,
              transformOrigin: "top left",
            }}
          >
            <div
              ref={ringRef}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {sites.map((site, index) => {
                const Site = site.Component;
                return (
                  <Card key={site.label} index={index} label={site.label}>
                    <Site />
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-30 mt-8 flex items-center justify-center gap-3 text-xs text-white/50">
        <span className="h-px w-8 bg-lilac/40" />
        <span>Arraste para rodar os websites</span>
        <span className="h-px w-8 bg-emerald/40" />
      </div>
    </div>
  );
}
