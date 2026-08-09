"use client";

import {
  Gauge,
  MousePointerClick,
  Navigation,
  PlugZap,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { problems } from "@/config/websites-en/content";

const icons = [Sparkles, Smartphone, Navigation, MousePointerClick, Gauge, PlugZap];
const tones = [
  "bg-emerald/15 text-emerald-dark",
  "bg-lilac/25 text-lilac-deep",
  "bg-gold/20 text-gold-deep",
  "bg-forest-deep text-white",
  "bg-lilac-deep text-white",
  "bg-gold text-night",
];
const cardTones = [
  "border-emerald/25 bg-emerald/10",
  "border-lilac/30 bg-lilac/15",
  "border-gold/30 bg-gold/15",
  "border-forest/20 bg-mint-soft",
  "border-lilac-deep/25 bg-[#eee9fb]",
  "border-gold-deep/20 bg-[#f6ead7]",
];

export function Problems() {
  const reduce = useReducedMotion();

  return (
    <section id="problema" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-lilac/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-8 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />

      <Container>
        <SectionHeading eyebrow="Quick review" title={problems.title} />
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-slate sm:text-base">
          Pequenos atritos acumulam-se. O resultado é um website que exige
          esforço quando devia facilitar a decisão.
        </p>

        <div className="relative mx-auto mt-14 max-w-6xl rounded-[2rem] border border-sage/25 bg-white p-4 shadow-[0_35px_90px_-45px_rgba(14,23,18,.35)] sm:p-7">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <div className="absolute inset-0 bg-grid opacity-45" />
            <motion.div
              className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-lilac/25 blur-3xl"
              animate={reduce ? undefined : { scale: [1, 1.2, 1], x: [0, -18, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-emerald/20 blur-3xl"
              animate={reduce ? undefined : { scale: [1.15, 1, 1.15], y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problems.items.map((item, index) => {
              const Icon = icons[index];
              return (
                <motion.article
                  key={item.title}
                  initial={reduce ? false : { opacity: 0, y: 24, rotate: index % 2 ? 1 : -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  whileHover={reduce ? undefined : { y: -7, rotate: index % 2 ? 0.6 : -0.6 }}
                  className={`group relative min-h-44 overflow-hidden rounded-2xl border p-5 transition-shadow hover:shadow-soft ${cardTones[index]}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${tones[index]}`}>
                      <Icon size={20} strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="font-display text-4xl font-semibold text-forest-deep/[0.09] transition-colors group-hover:text-forest-deep/[0.16]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">
                    {item.text}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <div className="relative mt-4 flex flex-col items-center justify-between gap-3 rounded-2xl border-2 border-forest-deep bg-forest-deep px-5 py-4 text-center shadow-[5px_5px_0_#9985DC] sm:flex-row sm:text-left">
            <p className="font-display text-base font-semibold text-white">
              Recognise any of these signs?
            </p>
            <a
              href="#contacto"
              className="inline-flex min-h-11 items-center rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-night transition-all hover:-translate-y-0.5 hover:bg-emerald-bright"
            >
              Request a free review
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
