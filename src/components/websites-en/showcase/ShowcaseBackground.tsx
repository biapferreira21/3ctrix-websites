"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

/**
 * Fundo WebGL (Three.js): campo de pontos com ondulação fluida,
 * em gradiente verde-esmeralda → lilás soft, sobre verde profundo.
 * Loop conduzido pelo ticker do GSAP. Respeita "reduced motion" e
 * pausa quando fora do ecrã. Renderizado apenas no cliente.
 */
export default function ShowcaseBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
    camera.position.set(0, 20, 34);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    // --- Geometria: grelha de pontos ---
    const COLS = 64;
    const ROWS = 64;
    const SPREAD = 62;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const base = new Float32Array(count * 2); // x,z base para as ondas

    // Paleta: verde natural → dourado → lilás (sóbria, não elétrica)
    const cGreen = new THREE.Color("#3E855A");
    const cGold = new THREE.Color("#C69A44");
    const cLilac = new THREE.Color("#9985DC");
    const tmp = new THREE.Color();

    let p = 0;
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const x = (i / (COLS - 1) - 0.5) * SPREAD;
        const z = (j / (ROWS - 1) - 0.5) * SPREAD;
        positions[p * 3] = x;
        positions[p * 3 + 1] = 0;
        positions[p * 3 + 2] = z;
        base[p * 2] = x;
        base[p * 2 + 1] = z;
        // gradiente diagonal: verde → dourado → lilás
        const t = (i / (COLS - 1)) * 0.6 + (j / (ROWS - 1)) * 0.4;
        if (t < 0.5) tmp.copy(cGreen).lerp(cGold, t * 2);
        else tmp.copy(cGold).lerp(cLilac, (t - 0.5) * 2);
        colors[p * 3] = tmp.r;
        colors[p * 3 + 1] = tmp.g;
        colors[p * 3 + 2] = tmp.b;
        p++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -0.12;
    scene.add(points);

    // --- Dimensões ---
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // --- Ponteiro (parallax subtil) ---
    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;

    const updateWave = (time: number) => {
      for (let k = 0; k < count; k++) {
        const x = base[k * 2];
        const z = base[k * 2 + 1];
        const y =
          Math.sin(x * 0.18 + time * 0.9) * 1.7 +
          Math.cos(z * 0.16 - time * 0.7) * 1.5 +
          Math.sin((x + z) * 0.1 + time * 0.5) * 1.0;
        posAttr.array[k * 3 + 1] = y;
      }
      posAttr.needsUpdate = true;
    };

    // --- Loop (GSAP ticker) ---
    let paused = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const start = performance.now();
    const render = () => {
      if (paused) return;
      const time = reduce ? 0.6 : (performance.now() - start) / 1000;
      if (!reduce) updateWave(time);
      else if (posAttr.array[1] === 0) updateWave(time); // uma passagem estática
      // parallax da câmara
      camera.position.x += (pointer.x * 4 - camera.position.x) * 0.03;
      camera.position.y += (20 - pointer.y * 3 - camera.position.y) * 0.03;
      camera.lookAt(0, -2, 0);
      points.rotation.z = Math.sin(time * 0.05) * 0.06;
      renderer.render(scene, camera);
    };

    if (reduce) {
      updateWave(0.6);
      renderer.render(scene, camera);
    } else {
      gsap.ticker.add(render);
    }

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
