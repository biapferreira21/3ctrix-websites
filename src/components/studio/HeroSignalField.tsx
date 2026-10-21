"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_POSITIONS = [
  new THREE.Vector3(-2.7, 1.55, 0.1),
  new THREE.Vector3(2.75, 1.05, -0.1),
  new THREE.Vector3(-2.55, -1.55, 0.15),
  new THREE.Vector3(2.65, -1.65, -0.15),
];

export default function HeroSignalField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.15, 9.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const system = new THREE.Group();
    system.position.y = -0.05;
    scene.add(system);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#3E855A",
      transparent: true,
      opacity: 0.4,
    });
    const connections = NODE_POSITIONS.map((position) => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(position.x * 0.42, position.y * 0.16, 0.45),
        position
      );
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(42));
      const line = new THREE.Line(geometry, lineMaterial);
      system.add(line);
      return { curve, geometry };
    });

    const stageGeometry = new THREE.CylinderGeometry(1.2, 1.35, 0.28, 48);
    const stageMaterial = new THREE.MeshBasicMaterial({ color: "#F6DFB6" });
    const stage = new THREE.Mesh(stageGeometry, stageMaterial);
    stage.rotation.x = Math.PI / 2;
    system.add(stage);

    const stageOutlineGeometry = new THREE.TorusGeometry(1.28, 0.045, 12, 80);
    const stageOutlineMaterial = new THREE.MeshBasicMaterial({ color: "#16180F" });
    const stageOutline = new THREE.Mesh(stageOutlineGeometry, stageOutlineMaterial);
    system.add(stageOutline);

    const screenGeometry = new THREE.BoxGeometry(1.45, 0.9, 0.14);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.18, 0.32);
    system.add(screen);

    const screenLineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-0.45, 0.32, 0.41),
      new THREE.Vector3(0.45, 0.32, 0.41),
      new THREE.Vector3(-0.45, 0.08, 0.41),
      new THREE.Vector3(0.18, 0.08, 0.41),
    ]);
    const screenLineMaterial = new THREE.LineBasicMaterial({ color: "#3E855A" });
    const screenLines = new THREE.LineSegments(screenLineGeometry, screenLineMaterial);
    system.add(screenLines);

    const nodeGeometry = new THREE.CircleGeometry(0.34, 32);
    const nodeRingGeometry = new THREE.RingGeometry(0.4, 0.46, 32);
    const nodeColors = ["#68AE82", "#E1C079", "#B7A6EA", "#8FA38A"];
    const nodeMaterials: THREE.MeshBasicMaterial[] = [];
    const nodes = NODE_POSITIONS.map((position, index) => {
      const material = new THREE.MeshBasicMaterial({ color: nodeColors[index] });
      const ringMaterial = new THREE.MeshBasicMaterial({ color: "#16180F", side: THREE.DoubleSide });
      nodeMaterials.push(material, ringMaterial);
      const node = new THREE.Mesh(nodeGeometry, material);
      const ring = new THREE.Mesh(nodeRingGeometry, ringMaterial);
      node.position.copy(position);
      ring.position.copy(position);
      system.add(node, ring);
      return node;
    });

    const signalGeometry = new THREE.SphereGeometry(0.11, 18, 18);
    const signalMaterials = nodeColors.map((color) => new THREE.MeshBasicMaterial({ color }));
    const signals = connections.map(({ curve }, index) => {
      const signal = new THREE.Mesh(signalGeometry, signalMaterials[index]);
      signal.position.copy(curve.getPoint(index * 0.18));
      system.add(signal);
      return signal;
    });

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    mount.addEventListener("pointermove", onPointerMove);

    let visible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(mount);

    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      if (visible) {
        const time = reduceMotion ? 1.1 : clock.getElapsedTime();
        signals.forEach((signal, index) => {
          const directionOut = index % 2 === 0;
          const rawProgress = (time * (0.14 + index * 0.012) + index * 0.19) % 1;
          const progress = directionOut ? rawProgress : 1 - rawProgress;
          signal.position.copy(connections[index].curve.getPoint(progress));
        });
        nodes.forEach((node, index) => {
          const pulse = reduceMotion ? 1 : 1 + Math.sin(time * 1.6 + index) * 0.045;
          node.scale.setScalar(pulse);
        });
        system.rotation.y += (pointer.x * 0.045 - system.rotation.y) * 0.035;
        system.rotation.x += (-pointer.y * 0.025 - system.rotation.x) * 0.035;
        renderer.render(scene, camera);
      }
      frame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      mount.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      connections.forEach(({ geometry }) => geometry.dispose());
      lineMaterial.dispose();
      stageGeometry.dispose();
      stageMaterial.dispose();
      stageOutlineGeometry.dispose();
      stageOutlineMaterial.dispose();
      screenGeometry.dispose();
      screenMaterial.dispose();
      screenLineGeometry.dispose();
      screenLineMaterial.dispose();
      nodeGeometry.dispose();
      nodeRingGeometry.dispose();
      nodeMaterials.forEach((material) => material.dispose());
      signalGeometry.dispose();
      signalMaterials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
