"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconCheck } from "./ui/icons";
import { SiteClinica, SiteRestaurante } from "./showcase/sites";

function ScaledBox({
  width,
  height,
  children,
  className,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setScale(element.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        aspectRatio: `${width} / ${height}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PhoneContent() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0c1712] text-[#eaf3ec]">
      <div className="flex items-center justify-between px-3 pt-2 text-[6px] text-[#8fa096]">
        <span>9:41</span>
        <span>● ● ●</span>
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[7px] font-extrabold">Café Aurora</span>
        <span className="text-[7px] text-lilac">Menu</span>
      </div>
      <div className="relative mx-2.5 h-[74px] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#73512f,#153d2b)]">
        <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gold/30" />
        <span className="absolute bottom-3 left-3 max-w-[72px] text-[9px] font-extrabold leading-[10px]">
          Brunch & café de especialidade
        </span>
      </div>
      <div className="mt-2.5 px-2.5">
        <span className="inline-flex rounded-full bg-emerald px-2.5 py-1.5 text-[6px] font-bold text-night">
          Reservar mesa
        </span>
      </div>
      <div className="mt-2.5 space-y-1.5 px-2.5">
        {[
          ["Ovos benedict", "8,50 €"],
          ["Panquecas", "6,90 €"],
          ["Cappuccino", "2,40 €"],
        ].map(([name, price]) => (
          <div
            key={name}
            className="flex items-center justify-between rounded-lg bg-[#152019] px-2 py-1.5"
          >
            <span className="text-[6px]">{name}</span>
            <span className="text-[6px] font-bold text-lilac">{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatChip({
  label,
  className,
  delay,
  tone,
}: {
  label: string;
  className?: string;
  delay: number;
  tone: "green" | "purple" | "gold";
}) {
  const reduce = useReducedMotion();
  const toneClass = {
    green: "border-emerald/30 text-emerald-dark",
    purple: "border-lilac/40 text-lilac-deep",
    gold: "border-gold/40 text-gold-deep",
  }[tone];

  return (
    <motion.div
      className={`absolute z-30 inline-flex items-center gap-1.5 rounded-full border bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-lift backdrop-blur ${toneClass} ${className ?? ""}`}
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <IconCheck size={13} />
      {label}
    </motion.div>
  );
}

export function ResponsiveMockup() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-xl pb-12">
      <div className="absolute -left-10 top-0 -z-10 h-64 w-64 rounded-full bg-emerald/20 blur-3xl" />
      <div className="absolute -right-8 bottom-0 -z-10 h-64 w-64 rounded-full bg-lilac/25 blur-3xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26, rotateY: 6 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[90%] overflow-hidden rounded-2xl border-[6px] border-[#1a211d] bg-[#1a211d] shadow-[0_35px_80px_-24px_rgba(0,0,0,0.75)] ring-1 ring-lilac/20"
      >
        <div className="flex h-6 items-center gap-1.5 px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d47d58]" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
        </div>
        <ScaledBox width={320} height={240} className="rounded-lg">
          <SiteRestaurante />
        </ScaledBox>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: -25, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        className="absolute -bottom-1 left-3 z-20 w-[44%] overflow-hidden rounded-xl border-[5px] border-[#202722] bg-[#202722] shadow-[0_22px_50px_-18px_rgba(0,0,0,0.75)]"
      >
        <ScaledBox width={320} height={240} className="rounded-md">
          <SiteClinica />
        </ScaledBox>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
        className="absolute -bottom-7 right-0 z-20 w-[29%] overflow-hidden rounded-[1.4rem] border-4 border-[#0a0f0c] bg-[#0a0f0c] shadow-[0_24px_50px_-16px_rgba(0,0,0,0.7)]"
      >
        <div className="overflow-hidden rounded-[1.05rem]">
          <ScaledBox width={150} height={300}>
            <PhoneContent />
          </ScaledBox>
        </div>
      </motion.div>

      <FloatChip label="Responsivo" className="-right-2 -top-3" delay={0} tone="green" />
      <FloatChip label="Rápido" className="-left-3 top-1/3" delay={1.2} tone="purple" />
      <FloatChip label="Acessível" className="bottom-1 left-[42%]" delay={2.1} tone="gold" />
    </div>
  );
}
