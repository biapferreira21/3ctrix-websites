"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, FileText, Send } from "lucide-react";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";

export function WorkflowMotion() {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { amount: 0.35 });
  const reducedMotion = useReducedMotionPreference();
  const steps = [
    { title: "Collect", example: "Notes & sources", icon: FileText, tone: "bg-mint" },
    { title: "Review", example: "Your approval", icon: Check, tone: "bg-[#e8e0fb]" },
    { title: "Deliver", example: "A ready-to-share brief", icon: Send, tone: "bg-[#f6dfb6]" },
  ];

  return (
    <div ref={root} className="rounded-[1.75rem] border-[3px] border-night bg-[#f5f1e8] p-5 shadow-[6px_6px_0_#8FA38A] sm:p-8" aria-label="Example workflow: collect notes, get approval, deliver a brief">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest">Example: from event notes to a brief</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return <div key={step.title} className="relative"><motion.div initial={reducedMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: index * 0.15 }} className={`rounded-2xl border-2 border-night p-5 shadow-[3px_3px_0_#16180F] ${step.tone}`}><Icon size={24} className="text-forest" aria-hidden /><h3 className="mt-5 text-xl font-semibold text-ink">{step.title}</h3><p className="mt-2 text-xs text-slate">{step.example}</p></motion.div>{index < 2 && <span className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 rotate-90 sm:-right-5 sm:bottom-auto sm:left-auto sm:top-1/2 sm:rotate-0" aria-hidden><motion.span className="flex h-7 w-7 items-center justify-center rounded-full border border-night bg-white text-forest" animate={visible && !reducedMotion ? { x: [-2, 3, -2] } : { x: 0 }} transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.7 }}><ArrowRight size={18} /></motion.span></span>}</div>;
        })}
      </div>
    </div>
  );
}
