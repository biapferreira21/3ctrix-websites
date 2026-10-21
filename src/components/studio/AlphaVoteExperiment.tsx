"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, LockKeyhole, RotateCcw } from "lucide-react";

export function AlphaVoteExperiment() {
  const [answer, setAnswer] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[2rem] border-[3px] border-night bg-[#f5f1e8] text-ink shadow-[9px_9px_0_#8FA38A]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-night bg-mint px-5 py-4 sm:px-7">
        <span className="text-lg font-semibold">AlphaVote / the idea</span>
        <span className="rounded-full border border-night bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-wider">Independent view first</span>
      </div>
      <div className="p-5 sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark">Try the interaction · illustrative question</p>
        <h3 className="mt-4 text-2xl font-semibold leading-tight">Should every conference session leave more time for audience questions?</h3>
        <AnimatePresence mode="wait" initial={false}>
          {!answer ? (
            <motion.div key="question" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Agree", "Disagree", "Unsure"].map((option, index) => <button type="button" key={option} onClick={() => setAnswer(option)} className={`min-h-12 rounded-xl border-2 border-night px-3 text-sm font-bold shadow-[3px_3px_0_#16180F] transition-transform hover:-translate-y-1 ${index === 0 ? "bg-mint" : index === 1 ? "bg-[#e8e0fb]" : "bg-[#f6dfb6]"}`}>{option}</button>)}
              </div>
              <p className="mt-6 flex items-center gap-2 text-xs leading-5 text-slate"><LockKeyhole size={15} className="shrink-0" aria-hidden />Form your view before comparing perspectives.</p>
            </motion.div>
          ) : (
            <motion.div key="perspectives" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <p role="status" className="mt-6 flex items-center gap-2 text-sm font-semibold text-forest">Your view: {answer}<ArrowRight size={15} aria-hidden />Now consider another angle.</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border-2 border-night bg-mint p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-forest">One reason for</p><p className="mt-2 text-sm leading-6">Questions can surface gaps and connect a talk to people’s real problems.</p></div>
                <div className="rounded-xl border-2 border-night bg-[#e8e0fb] p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-forest">A counterargument</p><p className="mt-2 text-sm leading-6">Some topics need a longer explanation first. Smaller follow-up groups may give more people a voice.</p></div>
              </div>
              <button type="button" onClick={() => setAnswer(null)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest underline underline-offset-4"><RotateCcw size={14} aria-hidden />Try again</button>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="mt-5 border-t border-night/15 pt-4 text-[10px] leading-5 text-slate">A local illustration of one feature. Your choice is not sent or counted; the example arguments are not live community responses.</p>
      </div>
    </div>
  );
}
