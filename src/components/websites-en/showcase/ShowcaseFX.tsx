"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Carrega o fundo WebGL (Three.js) apenas quando a secção se aproxima
 * do ecrã, mantendo o JavaScript inicial fora do bundle principal.
 */
const Background = dynamic(() => import("./ShowcaseBackground"), { ssr: false });

export function ShowcaseFX() {
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
      { rootMargin: "500px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
      {show && <Background />}
    </div>
  );
}
