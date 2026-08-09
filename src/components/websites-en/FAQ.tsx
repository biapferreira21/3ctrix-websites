"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { FadeIn } from "./ui/motion";
import { faqItems } from "@/config/websites-en/faq";
import { cn } from "@/lib/cn";

const faqTones = [
  "bg-[#dfece2] shadow-[5px_5px_0_#3E855A]",
  "bg-[#e8e0fb] shadow-[5px_5px_0_#9985DC]",
  "bg-[#f6dfb6] shadow-[5px_5px_0_#C69A44]",
  "bg-[#f6d5c8] shadow-[5px_5px_0_#d47d58]",
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="relative overflow-hidden bg-[#f4f0e7] py-24 sm:py-28">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative">
        <SectionHeading eyebrow="Frequently asked questions" title="Questions about the website service?" />

        <FadeIn className="mx-auto mt-14 max-w-3xl">
          <ul className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <li
                  key={item.question}
                  className={cn(
                    "overflow-hidden rounded-2xl border-[3px] border-night transition-transform hover:-translate-y-0.5",
                    faqTones[i % 4]
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-medium text-ink transition-colors hover:text-forest"
                    >
                      <span>{item.question}</span>
                      <span
                        className={cn(
                          "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                          isOpen
                            ? "border-2 border-night bg-emerald text-night"
                            : "border-2 border-night bg-white text-forest-deep"
                        )}
                        aria-hidden
                      >
                        <span className="absolute h-[2px] w-3 rounded bg-current" />
                        <span
                          className={cn(
                            "absolute h-3 w-[2px] rounded bg-current transition-transform duration-300",
                            isOpen && "scale-y-0"
                          )}
                        />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-slate">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
