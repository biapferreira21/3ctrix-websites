"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Check, FileText, Pause, Play, Scissors, TriangleAlert } from "lucide-react";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";

export function ResearchLens() {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { amount: 0.3 });
  const reducedMotion = useReducedMotionPreference();
  const [context, setContext] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!visible || reducedMotion || !playing) return;
    const timer = window.setInterval(() => setContext((value) => !value), 4500);
    return () => window.clearInterval(timer);
  }, [visible, reducedMotion, playing]);

  return (
    <div ref={root} className="overflow-hidden rounded-[1.75rem] border-[3px] border-night bg-white text-ink shadow-[6px_6px_0_#8FA38A]" aria-label="Animated example of keeping context in a summary">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-night bg-[#f5f1e8] px-5 py-4 sm:px-7">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-forest">One note. Two summaries.</span>
        <button type="button" disabled={reducedMotion} onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause summary animation" : "Play summary animation"} className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest disabled:opacity-50">{playing && !reducedMotion ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}{reducedMotion ? "Compare below" : playing ? "Pause" : "Play"}</button>
      </div>
      <div className="grid items-center gap-4 p-5 sm:p-7 md:grid-cols-[1fr_2rem_1fr]">
        <div className="rounded-2xl border-2 border-night bg-[#f5f1e8] p-5">
          <p className="flex items-center gap-2 text-xs font-bold text-forest"><FileText size={17} aria-hidden />Original note</p>
          <p className="mt-5 text-base leading-7">A new tool saved time in <span className="rounded bg-[#f6dfb6] px-1 font-semibold">one team’s small pilot</span>.</p>
          <p className="mt-3 border-t border-night/15 pt-3 text-sm leading-6 text-slate">Wider use has not been tested.</p>
          <span className="mt-4 inline-flex rounded-full border border-night/30 bg-white px-2.5 py-1 text-[10px] text-forest">Source: example note</span>
        </div>
        <div className="flex justify-center" aria-hidden>
          <motion.div animate={visible && !reducedMotion ? { x: [0, 4, 0] } : { x: 0 }} transition={{ duration: 1.6, repeat: Infinity }}><ArrowRight size={25} className="rotate-90 text-forest md:rotate-0" /></motion.div>
        </div>
        <div className={`rounded-2xl border-2 border-night p-5 transition-colors ${context ? "bg-mint" : "bg-[#fbefd8]"}`}>
          <p className="flex items-center gap-2 text-xs font-bold text-forest"><Scissors size={17} aria-hidden />Short summary</p>
          <div className="min-h-32 pt-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={String(context)} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
                <p className="text-base font-semibold leading-7">{context ? "A small pilot saved time. Wider use is untested." : "The tool saves time."}</p>
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-forest">{context ? <Check size={16} aria-hidden /> : <TriangleAlert size={16} aria-hidden />}{context ? "Scope & limits kept" : "Scope & limits missing"}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2" aria-label="Compare summary versions">
            {[false, true].map((value) => <button key={String(value)} type="button" aria-pressed={context === value} onClick={() => { setContext(value); setPlaying(false); }} className={`min-h-11 rounded-xl border-2 border-night px-2 text-[11px] font-bold transition-colors ${context === value ? "bg-night text-white" : "bg-white text-forest hover:bg-[#f5f1e8]"}`}>{value ? "Keep context" : "Quick version"}</button>)}
          </div>
        </div>
      </div>
      <p className="border-t border-night/15 px-5 py-3 text-[10px] text-slate sm:px-7">Illustrative example · select a version to compare.</p>
    </div>
  );
}
