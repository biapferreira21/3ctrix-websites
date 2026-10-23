"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Pause, Play } from "lucide-react";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";

/** Decorative, progressively enhanced Three.js scene. No scroll capture.
 * One lightweight renderer; pause off-screen, in hidden tabs or on request.
 * No WebGL is required to read or navigate any content. */
export function AboutVisual() {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const hero = mount.closest("section");
    const choreography = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from("[data-about-reveal]", { y: 32, opacity: 0, stagger: .13, duration: 1, ease: "power3.out", clearProps: "all" });
        gsap.from("[data-about-portrait]", { rotate: -7, y: 45, scale: .92, duration: 1.35, ease: "power3.out", clearProps: "all" });
      }
    }, hero ?? mount);

    void import("three").then((THREE) => {
      if (cancelled) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); }
      catch { return; } // Static CSS artwork remains when WebGL is unavailable.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
      renderer.domElement.setAttribute("aria-hidden", "true");
      mount.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, .1, 50);
      camera.position.z = 9;
      const group = new THREE.Group();
      scene.add(group);
      const ringGeometry = new THREE.TorusGeometry(2.35, .009, 5, 110);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: "#3e855a", transparent: true, opacity: .5 });
      for (let index = 0; index < 3; index++) {
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.set(index * .85, index * .6, index * .4);
        group.add(ring);
      }
      const wireGeometry = new THREE.IcosahedronGeometry(1.55, 1);
      const wireMaterial = new THREE.MeshBasicMaterial({ color: "#9985dc", wireframe: true, transparent: true, opacity: .25 });
      group.add(new THREE.Mesh(wireGeometry, wireMaterial));
      const nodeGeometry = new THREE.SphereGeometry(.055, 8, 8);
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: "#946a2a" });
      for (let index = 0; index < 12; index++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        const angle = index / 12 * Math.PI * 2;
        node.position.set(Math.cos(angle) * 2.35, Math.sin(angle) * 2.35, Math.sin(index * 1.8) * .7);
        group.add(node);
      }
      const pointer = { x: 0, y: 0 };
      const onPointer = (event: PointerEvent) => { const bounds = mount.getBoundingClientRect(); pointer.x = ((event.clientX - bounds.left) / bounds.width - .5) * .45; pointer.y = ((event.clientY - bounds.top) / bounds.height - .5) * .3; };
      hero?.addEventListener("pointermove", onPointer);
      let visible = true;
      let time = 0;
      let lastFrame = performance.now();
      const render = () => {
        const now = performance.now();
        const delta = Math.min((now - lastFrame) / 1000, .05);
        lastFrame = now;
        if (!visible || document.hidden || pausedRef.current) return;
        time += delta;
        group.rotation.y = time * .16 + pointer.x;
        group.rotation.x = Math.sin(time * .3) * .2 + pointer.y;
        group.rotation.z = time * .045;
        renderer.render(scene, camera);
      };
      const resize = () => { const { clientWidth: width, clientHeight: height } = mount; if (!width || !height) return; renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.render(scene, camera); };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount); resize();
      const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
      visibilityObserver.observe(mount);
      if (!reducedMotion) gsap.ticker.add(render);
      cleanup = () => { gsap.ticker.remove(render); resizeObserver.disconnect(); visibilityObserver.disconnect(); hero?.removeEventListener("pointermove", onPointer); ringGeometry.dispose(); ringMaterial.dispose(); wireGeometry.dispose(); wireMaterial.dispose(); nodeGeometry.dispose(); nodeMaterial.dispose(); renderer.dispose(); renderer.domElement.remove(); };
    }).catch(() => { /* Decorative enhancement only; the page remains usable. */ });
    return () => { cancelled = true; cleanup?.(); choreography.revert(); };
  }, [reducedMotion]);

  return <>
    <div aria-hidden className="pointer-events-none absolute -right-44 top-0 h-full w-[min(80vw,950px)] opacity-80 sm:-right-24"><div className="absolute inset-[20%] rounded-full bg-lilac/15 blur-3xl" /><div ref={mountRef} className="absolute inset-0" /></div>
    {!reducedMotion && <button type="button" onClick={() => { pausedRef.current = !paused; setPaused(!paused); }} aria-label={paused ? "Play background animation" : "Pause background animation"} aria-pressed={paused} className="absolute bottom-5 right-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-night/20 bg-paper/90 text-forest">{paused ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}</button>}
  </>;
}
