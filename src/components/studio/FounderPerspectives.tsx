"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, Box, Mic2, Sparkles } from "lucide-react";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import { cn } from "@/lib/cn";

const perspectives = [
  { label: "Product", icon: Box, context: "Product management · Repsol", text: "Understanding how technology is built, used and improved." },
  { label: "Research", icon: BookOpen, context: "Research & writing · The Block, The Big Whale, Stablecoin Insider", text: "Examining evidence, asking better questions and explaining complex topics." },
  { label: "Media & events", icon: Mic2, context: "Content, interviews & event ambassadorship", text: "Connecting ideas with the people building, discussing and using technology." },
  { label: "3C Trix", icon: Sparkles, context: "Founder · 3C Trix", text: "Bringing these perspectives together through research, media and tailored tools. Motivated by how technology and information shape what people believe, decide and build." },
] as const;

export function FounderPerspectives() {
  const [selected, setSelected] = useState(3);
  const reducedMotion = useReducedMotionPreference();
  const id = useId();
  const perspective = perspectives[selected];
  return (
    <div className="mt-7">
      <p className="text-[10px] font-bold uppercase tracking-[.15em] text-forest">Explore the connection</p>
      <div role="group" aria-label="Beatriz’s connected experience" className="mt-3 flex flex-wrap gap-2">
        {perspectives.map((item, index) => (
          <button key={item.label} type="button" aria-pressed={selected === index} aria-controls={`${id}-perspective`} onClick={() => setSelected(index)} className={cn("inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-night px-3 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-forest", index === selected ? "bg-night text-white" : "bg-white text-ink hover:bg-mint")}>
            <item.icon size={15} aria-hidden />{item.label}{index === selected && <ArrowRight size={13} aria-hidden />}
          </button>
        ))}
      </div>
      <div id={`${id}-perspective`} aria-live="polite" aria-atomic="true" className="mt-4 min-h-44 rounded-2xl border-2 border-night bg-white p-5 shadow-[4px_4px_0_#8FA38A]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .15 }}>
            <p className="text-xs font-semibold leading-5 text-forest">{perspective.context}</p>
            <p className="mt-3 text-sm leading-6 text-slate">{perspective.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
