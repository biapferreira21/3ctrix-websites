"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp, BookOpen, Check, ChevronLeft, ChevronRight, CircleHelp, Gauge, Layers3, LockKeyhole, Minus, MousePointer2, Plus, RotateCcw, SlidersHorizontal, TrendingUp } from "lucide-react";
import { experimentCards, type CardFormat, type ExperimentCard } from "@/content/interactiveDemos";
import { allocatePoint, moveRankedItem } from "@/lib/demoInteractions";

const formats = [
  { id: "opinion", label: "Take a position", icon: CircleHelp },
  { id: "rank", label: "Rank priorities", icon: Layers3 },
  { id: "confidence", label: "Rate confidence", icon: Gauge },
  { id: "allocation", label: "Allocate points", icon: SlidersHorizontal },
  { id: "prediction", label: "Make a prediction", icon: TrendingUp },
  { id: "learn", label: "Learn & reveal", icon: BookOpen },
] as const;

const actionClass = "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border-2 border-night bg-white px-3 text-xs font-semibold text-forest transition-colors hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-35";

export function AlphaVoteExperiment() {
  const [format, setFormat] = useState<CardFormat>("opinion");
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const cards = experimentCards[format];
  const card = cards[index];

  const nextQuestion = () => setIndex((current) => (current + 1) % cards.length);

  return (
    <div className="overflow-hidden rounded-[2rem] border-[3px] border-night bg-[#f5f1e8] text-ink shadow-[9px_9px_0_#8FA38A]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-night bg-mint px-5 py-4 sm:px-7">
        <span className="text-lg font-semibold">AlphaVote / try the cards</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-night bg-white px-3 py-1.5 text-[10px] font-bold"><MousePointer2 size={13} aria-hidden />Click to play</span>
      </div>
      <div className="p-5 sm:p-7">
        <p className="text-sm font-semibold text-forest">Choose a card. Give it a go. See what it makes you think.</p>
        <p className="mt-2 text-xs leading-5 text-slate">6 formats · 12 sample questions · your own responses</p>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Choose a card format">
          {formats.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} type="button" aria-pressed={format === item.id} onClick={() => { setFormat(item.id); setIndex(0); }} className={`flex min-h-16 flex-col items-start justify-center gap-2 rounded-xl border-2 border-night p-3 text-left text-[10px] font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest ${format === item.id ? "bg-[#e8e0fb] shadow-[2px_2px_0_#16180F]" : "bg-white text-forest"}`}><Icon size={17} aria-hidden />{item.label}</button>;
          })}
        </div>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-night/20 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark">Question {index + 1} of {cards.length}</p>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous sample question" className={actionClass} onClick={() => setIndex((current) => (current + cards.length - 1) % cards.length)}><ChevronLeft size={15} aria-hidden /></button>
            <button type="button" className={actionClass} onClick={nextQuestion}>Next question<ChevronRight size={15} aria-hidden /></button>
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={card.id} initial={reduceMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
            <ExperimentQuestion card={card} format={format} onNext={nextQuestion} />
          </motion.div>
        </AnimatePresence>
        <p className="mt-5 border-t border-night/15 pt-4 text-[10px] leading-5 text-slate">Interactive examples of participation features. Responses stay in this demo; arguments are illustrative, with no live voting totals or prediction outcomes.</p>
      </div>
    </div>
  );
}

function ExperimentQuestion({ card, format, onNext }: { card: ExperimentCard; format: CardFormat; onNext: () => void }) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const [choice, setChoice] = useState("");
  const [confidence, setConfidence] = useState(50);
  const [confidenceTouched, setConfidenceTouched] = useState(false);
  const [ranking, setRanking] = useState([...card.options]);
  const [allocation, setAllocation] = useState(card.options.map(() => 0));
  const [reason, setReason] = useState("");
  const [revealed, setRevealed] = useState(false);
  const total = allocation.reduce((sum, value) => sum + value, 0);
  const canReveal = format === "allocation" ? total === 10 : format === "rank" ? true : format === "confidence" ? confidenceTouched : Boolean(choice);
  const reset = () => {
    setChoice(""); setConfidence(50); setConfidenceTouched(false); setRanking([...card.options]);
    setAllocation(card.options.map(() => 0)); setReason(""); setRevealed(false);
  };
  const summary = format === "rank" ? ranking.join(" → ") : format === "allocation" ? card.options.map((option, index) => `${option}: ${allocation[index]}`).join(" · ") : format === "confidence" ? `${confidence}% confidence` : format === "prediction" ? `${choice} · ${confidence}% confidence` : choice;

  return (
    <div className="mt-5">
      <h3 className="text-xl font-semibold leading-snug sm:text-2xl">{card.question}</h3>
      <p className="mt-3 text-xs leading-6 text-slate">{card.context}</p>
      {!revealed ? (
        <div>
          {["opinion", "prediction", "learn"].includes(format) && <fieldset className="mt-5 space-y-2"><legend className="sr-only">Choose your response</legend>{card.options.map((option) => <label key={option} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 border-night p-3 text-sm font-semibold transition-colors hover:bg-mint ${choice === option ? "bg-mint shadow-[2px_2px_0_#16180F]" : "bg-white"}`}><input type="radio" name={`${id}-response`} value={option} checked={choice === option} onChange={() => setChoice(option)} className="h-4 w-4 shrink-0 accent-[#3E855A]" /><span>{option}</span></label>)}</fieldset>}
          {format === "rank" && <ol className="mt-5 space-y-2" aria-label="Your priority ranking">{ranking.map((option, index) => <li key={option} className="flex items-center gap-2 rounded-xl border-2 border-night bg-white p-2"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint text-[11px] font-bold">{index + 1}</span><span className="min-w-0 flex-1 text-xs font-semibold">{option}</span><button type="button" aria-label={`Move ${option} up`} disabled={index === 0} className={`${actionClass} !px-2`} onClick={() => setRanking((items) => moveRankedItem(items, index, -1))}><ArrowUp size={15} aria-hidden /></button><button type="button" aria-label={`Move ${option} down`} disabled={index === ranking.length - 1} className={`${actionClass} !px-2`} onClick={() => setRanking((items) => moveRankedItem(items, index, 1))}><ArrowDown size={15} aria-hidden /></button></li>)}</ol>}
          {(format === "confidence" || format === "prediction") && <div className="mt-5 rounded-xl border-2 border-night bg-[#e8e0fb] p-4"><label htmlFor={`${id}-confidence`} className="flex items-center justify-between gap-3 text-xs font-semibold"><span>{format === "prediction" ? "How confident is your forecast?" : "Your confidence"}</span><span className="text-xl tabular-nums">{confidence}%</span></label><input id={`${id}-confidence`} type="range" min="0" max="100" value={confidence} onChange={(event) => { setConfidence(Number(event.target.value)); setConfidenceTouched(true); }} className="mt-4 min-h-8 w-full cursor-pointer accent-[#3E855A]" /><div className="flex justify-between text-[10px] text-slate"><span>0 · Not confident</span><span>100 · Very confident</span></div>{format === "confidence" && !confidenceTouched && <button type="button" className="mt-3 min-h-11 text-xs font-semibold text-forest underline underline-offset-4" onClick={() => setConfidenceTouched(true)}>Use 50% as my answer</button>}</div>}
          {format === "allocation" && <div className="mt-5"><p role="status" className="mb-3 text-xs font-bold text-forest">{10 - total} of 10 points left to allocate</p><div className="h-2 overflow-hidden rounded-full bg-night/10" aria-hidden="true"><motion.div animate={{ width: `${total * 10}%` }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="h-full bg-emerald" /></div><div className="mt-4 space-y-2">{card.options.map((option, index) => <div key={option} className="flex items-center gap-2 rounded-xl border-2 border-night bg-white p-2"><span className="min-w-0 flex-1 text-xs font-semibold">{option}</span><button type="button" aria-label={`Remove a point from ${option}`} disabled={allocation[index] === 0} className={`${actionClass} !px-2`} onClick={() => setAllocation((items) => allocatePoint(items, index, -1))}><Minus size={15} aria-hidden /></button><output className="w-5 text-center text-sm font-bold tabular-nums" aria-label={`Points for ${option}`}>{allocation[index]}</output><button type="button" aria-label={`Add a point to ${option}`} disabled={total === 10} className={`${actionClass} !px-2`} onClick={() => setAllocation((items) => allocatePoint(items, index, 1))}><Plus size={15} aria-hidden /></button></div>)}</div></div>}
          {format !== "learn" && <div className="mt-5"><label htmlFor={`${id}-reason`} className="text-xs font-semibold text-forest">What shaped your answer? <span className="font-normal text-slate">(optional)</span></label><textarea id={`${id}-reason`} value={reason} onChange={(event) => setReason(event.target.value)} maxLength={240} rows={2} placeholder="A reason, an assumption or something you would like to check…" className="mt-2 w-full rounded-xl border-2 border-night/50 bg-white p-3 text-xs leading-5 text-ink focus:outline-forest" /></div>}
          <button type="button" disabled={!canReveal} onClick={() => setRevealed(true)} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-night bg-emerald px-4 text-sm font-bold text-night shadow-[3px_3px_0_#16180F] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40">{format === "learn" ? "Check my answer" : "Commit & explore"}<ArrowRight size={16} aria-hidden /></button>
          <p className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-slate"><LockKeyhole size={14} className="mt-0.5 shrink-0" aria-hidden />{format === "allocation" ? "Use all 10 points to reveal the reflection." : "Choose your own response before revealing the explanation or other perspectives."}</p>
        </div>
      ) : (
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>
          <div className="mt-5 rounded-xl border-2 border-night bg-mint p-4"><p role="status" className="flex items-center gap-2 text-xs font-bold text-forest"><Check size={16} aria-hidden />{format === "learn" ? choice === card.correctAnswer ? "That’s the best answer here." : "Let’s look at the explanation." : "Your response is in."}</p><p className="mt-2 text-sm font-semibold leading-6">{summary}</p>{reason.trim() && <p className="mt-3 border-t border-night/15 pt-3 text-xs leading-6 text-slate">Your reasoning: {reason}</p>}</div>
          {format === "learn" && <p className="mt-4 text-sm font-semibold text-forest">Answer: {card.correctAnswer}</p>}
          <div className="mt-4 space-y-3">{card.perspectives.map((perspective, index) => <div key={perspective} className={`rounded-xl border-2 border-night p-4 ${index === 0 ? "bg-white" : "bg-[#e8e0fb]"}`}><p className="text-[10px] font-bold uppercase tracking-wider text-forest">{format === "learn" ? index === 0 ? "Why" : "Keep in mind" : index === 0 ? "One perspective" : "Another angle"}</p><p className="mt-2 text-xs leading-6">{perspective}</p></div>)}</div>
          <p className="mt-4 rounded-xl border border-night/20 bg-[#fbefd8] p-4 text-xs font-medium leading-6">{card.reflection}</p>
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={reset} className={actionClass}><RotateCcw size={14} aria-hidden />Try another answer</button><button type="button" onClick={onNext} className={`${actionClass} !bg-mint`}>Next question<ArrowRight size={14} aria-hidden /></button></div>
        </motion.div>
      )}
    </div>
  );
}
