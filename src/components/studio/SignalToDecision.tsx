"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, FileSearch, MessageSquareText, Mic2, RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/Container";

type SignalContent = {
  eyebrow: string;
  title: string;
  text: string;
  stages: readonly { label: string; title: string; text: string; artifact: string }[];
  inputs: readonly string[];
  safeguards: readonly string[];
  outcomes: readonly string[];
};

const icons = [Mic2, FileSearch, MessageSquareText, RefreshCw];
const stageTones = [
  "bg-mint shadow-[5px_5px_0_#3E855A]",
  "bg-[#e8e0fb] shadow-[5px_5px_0_#8f7ac7]",
  "bg-[#f6dfb6] shadow-[5px_5px_0_#c69a44]",
  "bg-[#dfece2] shadow-[5px_5px_0_#8FA38A]",
];

export function SignalToDecision({ content }: { content: SignalContent }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="information-system" className="relative overflow-hidden border-b-[3px] border-night bg-white py-20 text-ink sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-mint/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-lilac/25 blur-3xl" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">{content.eyebrow}</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">{content.title}</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate sm:text-lg">{content.text}</p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-8 right-8 top-8 hidden h-[3px] bg-night/15 lg:block" />
          <motion.div
            aria-hidden="true"
            className="absolute left-8 top-[31px] hidden h-[3px] rounded-full bg-gradient-to-r from-emerald via-gold to-lilac lg:block"
            initial={{ width: 0 }}
            whileInView={{ width: "calc(100% - 4rem)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="grid gap-4 lg:grid-cols-4">
            {content.stages.map((stage, index) => {
              const Icon = icons[index];
              return (
                <motion.article
                  key={stage.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.12 }}
                  className={`relative rounded-[1.5rem] border-[3px] border-night p-5 ${stageTones[index]}`}
                >
                  <div className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-night bg-white text-forest shadow-[3px_3px_0_#16180F]">
                    <Icon size={23} aria-hidden />
                  </div>
                  <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-dark">{stage.label}</p>
                  <h3 className="mt-3 text-xl font-semibold">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{stage.text}</p>
                  <p className="mt-5 inline-flex rounded-full border-2 border-night bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-forest-deep">
                    {stage.artifact}
                  </p>
                  {index < content.stages.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-6 z-20 hidden rounded-full border-2 border-night bg-white p-1 text-forest lg:block" size={30} aria-hidden />
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            ["Signals we can work with", content.inputs, "bg-mint-soft shadow-[5px_5px_0_#8FA38A]"],
            ["What the system should preserve", content.safeguards, "bg-[#f0ebfb] shadow-[5px_5px_0_#b7a6ea]"],
            ["What becomes more useful", content.outcomes, "bg-[#fbefd8] shadow-[5px_5px_0_#e1c079]"],
          ].map(([title, items, tone]) => (
            <div key={title as string} className={`rounded-[1.5rem] border-[3px] border-night p-6 ${tone}`}>
              <h3 className="text-sm font-bold uppercase tracking-[0.13em] text-ink">{title as string}</h3>
              <ul className="mt-5 space-y-3">
                {(items as readonly string[]).map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate">
                    <Check size={16} className="mt-1 shrink-0 text-emerald-dark" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
