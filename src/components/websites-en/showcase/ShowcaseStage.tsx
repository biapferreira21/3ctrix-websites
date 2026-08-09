"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Carrega o carrossel 3D (GSAP) apenas quando a secção se aproxima do
 * ecrã — mantém o JavaScript inicial leve (melhor Lighthouse).
 */
const Carousel = dynamic(
  () => import("./ShowcaseCarousel").then((m) => m.ShowcaseCarousel),
  { ssr: false, loading: () => <Skeleton /> }
);

function Skeleton() {
  return (
    <div className="mx-auto flex h-[214px] w-[300px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
    </div>
  );
}

export function ShowcaseStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <Carousel /> : <Skeleton />}</div>;
}
