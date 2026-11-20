"use client";

import { useEffect, useRef } from "react";

export type BookTurn = { sequence: number; direction: number; title: string; lines: string[] };

/** A curved paper mesh, rendered only during a page turn. The readable book is HTML. */
export function BookPageTurn({ turn, disabled }: { turn: BookTurn; disabled: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef(turn);
  const play = useRef<((turn: BookTurn) => void) | null>(null);
  latest.current = turn;

  useEffect(() => {
    if (disabled || !host.current) return;
    const mount = host.current;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    void import("three").then((THREE) => {
      if (cancelled) return;
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.domElement.setAttribute("aria-hidden", "true");
      mount.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 4000);
      camera.position.z = 1800;
      const geometry = new THREE.PlaneGeometry(1, 1, 32, 1);
      const original = new Float32Array(geometry.attributes.position.array);
      const paper = document.createElement("canvas");
      paper.width = 768; paper.height = 1200;
      const texture = new THREE.CanvasTexture(paper);
      texture.colorSpace = THREE.SRGBColorSpace;
      const backTexture = texture.clone();
      backTexture.repeat.x = -1; backTexture.offset.x = 1;
      const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.FrontSide, roughness: 1, transparent: true });
      const backMaterial = new THREE.MeshStandardMaterial({ map: backTexture, side: THREE.BackSide, roughness: 1, transparent: true });
      const sheet = new THREE.Group();
      sheet.add(new THREE.Mesh(geometry, material), new THREE.Mesh(geometry, backMaterial));
      scene.add(sheet, new THREE.AmbientLight(0xffffff, 2));
      const light = new THREE.DirectionalLight(0xffffff, 2.2);
      light.position.set(-400, 700, 1500); scene.add(light);
      let frame = 0;
      play.current = (next) => {
        cancelAnimationFrame(frame);
        if (!next.sequence || mount.clientWidth < 760 || document.hidden) return;
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        renderer.setSize(width, height, false);
        camera.left = -width / 2; camera.right = width / 2;
        camera.top = height / 2; camera.bottom = -height / 2;
        camera.updateProjectionMatrix();
        const context = paper.getContext("2d");
        if (!context) return;
        context.fillStyle = "#faf9f2"; context.fillRect(0, 0, 768, 1200);
        const shadow = context.createLinearGradient(0, 0, 140, 0);
        shadow.addColorStop(0, "#cfcfc0"); shadow.addColorStop(1, "#faf9f2");
        context.fillStyle = shadow; context.fillRect(0, 0, 140, 1200);
        context.fillStyle = "#285540"; context.font = "24px sans-serif";
        context.fillText("BEATRIZ FERREIRA / CURRICULUM VITAE", 64, 85);
        context.font = "44px Georgia";
        context.fillText(next.title, 64, 160, 630);
        next.lines.forEach((line, index) => {
          context.font = "25px sans-serif"; context.fillStyle = "#283c32";
          context.fillText(line, 64, 270 + index * 180, 630);
          context.fillStyle = "#e1e3d9"; context.fillRect(64, 310 + index * 180, 600, 2);
        });
        texture.needsUpdate = true;
        backTexture.needsUpdate = true;
        mount.style.opacity = "1";
        const start = performance.now();
        const render = (time: number) => {
          const t = Math.min((time - start) / 720, 1);
          const ease = t * t * (3 - 2 * t);
          const positions = geometry.attributes.position;
          for (let index = 0; index < positions.count; index++) {
            const u = original[index * 3] + .5;
            positions.setXYZ(index, next.direction * u * width / 2, original[index * 3 + 1] * height, Math.sin(u * Math.PI) * Math.sin(t * Math.PI) * width * .11);
          }
          positions.needsUpdate = true; geometry.computeVertexNormals();
          sheet.rotation.y = -next.direction * Math.PI * ease;
          material.opacity = Math.min(t * 12, 1, (1 - t) * 12);
          backMaterial.opacity = material.opacity;
          renderer.render(scene, camera);
          if (t < 1) frame = requestAnimationFrame(render);
          else mount.style.opacity = "0";
        };
        frame = requestAnimationFrame(render);
      };
      play.current(latest.current);
      dispose = () => { cancelAnimationFrame(frame); play.current = null; geometry.dispose(); material.dispose(); backMaterial.dispose(); texture.dispose(); backTexture.dispose(); renderer.dispose(); renderer.domElement.remove(); };
    }).catch(() => { /* The HTML book remains fully functional without WebGL. */ });
    return () => { cancelled = true; dispose?.(); };
  }, [disabled]);

  useEffect(() => { play.current?.(turn); }, [turn]);
  return <div ref={host} className="cv-page-turn" aria-hidden="true" />;
}
