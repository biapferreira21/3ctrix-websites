"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Bookmark, CalendarDays, Check, ChevronRight, Clock3, FileText, MapPin, MessageSquareText, Pause, Play, Radio, Wifi } from "lucide-react";

const views = [
  { label: "Plan your day", short: "Agenda", icon: CalendarDays, title: "Find your next conversation.", text: "Browse the programme, find the right room and save the sessions that matter to you.", tone: "bg-mint" },
  { label: "Join the session", short: "Session", icon: MessageSquareText, title: "Take part while you are there.", text: "Bring a question into the room, explore the topic and contribute your own perspective.", tone: "bg-[#e8e0fb]" },
  { label: "Keep exploring", short: "Resources", icon: FileText, title: "Take the ideas with you.", text: "Return to session notes, source material and questions worth following after the conference.", tone: "bg-[#f6dfb6]" },
] as const;

const sessions = [
  { time: "09:30", title: "AI, people & the next question", room: "Main stage", type: "Conversation" },
  { time: "11:00", title: "From idea to useful product", room: "Studio room", type: "Workshop" },
];

export function EventAppDemo() {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [view, setView] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [saved, setSaved] = useState<number[]>([]);
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);

  useEffect(() => {
    if (!playing || reduceMotion !== false || !visible) return;
    const timer = window.setInterval(() => setView((current) => (current + 1) % views.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion, visible]);

  const chooseView = (index: number) => {
    setView(index);
    setPlaying(false);
  };
  const current = views[view];

  return (
    <div ref={root} className="relative mt-14 overflow-hidden rounded-[2rem] border-[3px] border-night bg-[#f5f1e8] shadow-[8px_8px_0_#8FA38A]" aria-label="Interactive conference app illustration">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b-2 border-night bg-white px-5 py-4 sm:px-8">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-forest"><span className="h-2 w-2 rounded-full bg-emerald" /> A conference, in your pocket</span>
        <span className="text-[10px] font-medium text-slate">Interactive illustration · sample programme</span>
      </div>

      <div className="relative grid items-center gap-10 p-5 sm:p-8 lg:grid-cols-[1fr_1fr] lg:p-12">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-dark">One event. Your own journey.</p>
          <h3 className="mt-4 max-w-sm text-3xl font-semibold leading-tight text-ink sm:text-4xl">Less searching.<br />More being there.</h3>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate">A simple, branded companion participants can open on their phone. Explore three moments of the experience below.</p>
          <div className="mt-8 space-y-3" aria-label="Conference app views">
            {views.map((item, index) => {
              const Icon = item.icon;
              return (
                <button key={item.short} type="button" aria-pressed={view === index} aria-controls="event-demo-screen" onClick={() => chooseView(index)} className={`flex w-full items-center gap-4 rounded-2xl border-2 border-night p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest ${view === index ? `${item.tone} shadow-[3px_3px_0_#16180F]` : "bg-white hover:bg-mint-soft"}`}>
                  <Icon className="shrink-0 text-forest" size={21} aria-hidden />
                  <span className="flex-1 text-sm font-semibold text-ink">{item.label}</span>
                  <ArrowRight size={17} className="text-forest" aria-hidden />
                </button>
              );
            })}
          </div>
          <div className="mt-7 min-h-24">
            <p className="text-base font-semibold text-ink">{current.title}</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate">{current.text}</p>
          </div>
          <button type="button" onClick={() => setPlaying(!playing)} disabled={reduceMotion !== false} className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest underline underline-offset-4 disabled:no-underline disabled:opacity-70">
            {playing && !reduceMotion ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
            {reduceMotion ? "Motion reduced · choose a view above" : playing ? "Pause walkthrough" : "Play walkthrough"}
          </button>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] pb-2 pr-2">
          <div className="pointer-events-none absolute -inset-6 hidden rounded-full border border-forest/15 sm:block" />
          <div className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-night bg-white shadow-[8px_8px_0_#16180F]">
            <div className="flex items-center justify-between bg-night px-6 py-3 text-white" aria-hidden="true">
              <span className="text-[10px] font-semibold">09:24</span><span className="h-3 w-16 rounded-full bg-white/15" /><Wifi size={12} />
            </div>
            <div className="border-b-2 border-night bg-mint px-5 pb-5 pt-4">
              <div className="flex items-center justify-between"><span className="text-sm font-bold text-forest-deep">3C Trix / Gather</span><span className="rounded-full border border-night bg-white px-2 py-1 text-[8px] font-bold uppercase tracking-wider">Concept</span></div>
              <p className="mt-4 text-2xl font-semibold text-ink">Hello, curious mind.</p>
              <p className="mt-1 text-[11px] text-forest">Ideas, people and your next session.</p>
            </div>

            <div id="event-demo-screen" className="h-[390px] overflow-y-auto p-4" onFocusCapture={() => setPlaying(false)}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={view} initial={reduceMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                  {view === 0 && (
                    <div>
                      <div className="flex items-center justify-between"><h4 className="text-lg font-semibold text-ink">Your agenda</h4><span className="text-[10px] font-medium text-slate">Day 01</span></div>
                      <div className="mt-3 flex gap-2 text-[9px] font-bold"><span className="rounded-full bg-night px-3 py-1.5 text-white">All sessions</span><span className="rounded-full bg-mint-soft px-3 py-1.5 text-forest">{saved.length} saved</span></div>
                      <div className="mt-4 space-y-3">
                        {sessions.map((session, index) => (
                          <div key={session.time} className={`rounded-2xl border-2 border-night p-3 ${index === 0 ? "bg-[#e8e0fb]" : "bg-[#fbefd8]"}`}>
                            <div className="flex items-center justify-between"><span className="flex items-center gap-1 text-[10px] font-bold text-forest"><Clock3 size={11} aria-hidden />{session.time}</span><button type="button" aria-label={`${saved.includes(index) ? "Unsave" : "Save"} ${session.title}`} aria-pressed={saved.includes(index)} onClick={() => { setPlaying(false); setSaved((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]); }} className="-m-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-forest hover:bg-white/60"><Bookmark size={17} fill={saved.includes(index) ? "currentColor" : "none"} aria-hidden /></button></div>
                            <p className="mt-1 text-sm font-semibold leading-5 text-ink">{session.title}</p>
                            <p className="mt-2 flex items-center gap-1 text-[10px] text-slate"><MapPin size={11} aria-hidden />{session.room} · {session.type}</p>
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={() => chooseView(1)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest">Open the next session <ChevronRight size={14} aria-hidden /></button>
                    </div>
                  )}
                  {view === 1 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-dark"><Radio size={12} aria-hidden /> Session preview · Main stage</p>
                      <h4 className="mt-3 text-xl font-semibold leading-tight text-ink">AI, people & the next question</h4>
                      <p className="mt-3 text-xs leading-5 text-slate">What would make an AI tool useful in your everyday work?</p>
                      <div className="mt-4 rounded-xl border-2 border-night bg-[#e8e0fb] p-3">
                        <label htmlFor="demo-session-question" className="text-xs font-semibold text-ink">Bring a question</label>
                        <textarea id="demo-session-question" value={question} maxLength={180} onChange={(event) => { setQuestion(event.target.value); setSubmitted(false); }} placeholder="What would you ask the panel?" className="mt-2 min-h-20 w-full resize-none rounded-lg border border-night/40 bg-white p-2 text-xs text-ink focus:outline-forest" />
                        <button type="button" disabled={!question.trim()} onClick={() => { setSubmitted(true); setPlaying(false); }} className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-night bg-emerald px-3 text-[11px] font-bold text-night disabled:opacity-40">{submitted ? <Check size={13} aria-hidden /> : <MessageSquareText size={13} aria-hidden />}{submitted ? "Added to your demo" : "Try adding a question"}</button>
                      </div>
                      <p role="status" className="mt-3 text-[10px] leading-4 text-slate">{submitted ? "Your question stays in this browser preview. Nothing was sent." : "Try it here. Questions in this illustration are never sent."}</p>
                    </div>
                  )}
                  {view === 2 && (
                    <div>
                      <h4 className="text-lg font-semibold text-ink">Keep the conversation.</h4>
                      <p className="mt-2 text-xs leading-5 text-slate">A useful place to return after the room.</p>
                      <div className="mt-4 space-y-3">
                        {["Session reading list", "Key questions & next steps", "Your saved sessions"].map((title, index) => (
                          <button type="button" key={title} onClick={() => { setResourceOpen(true); setPlaying(false); }} className="flex min-h-16 w-full items-center gap-3 rounded-xl border-2 border-night bg-[#fbefd8] p-3 text-left text-xs font-semibold text-ink hover:bg-mint"><FileText size={18} className="shrink-0 text-forest" aria-hidden /><span className="flex-1">{title}</span><span className="text-[9px] text-slate">0{index + 1}</span></button>
                        ))}
                      </div>
                      {resourceOpen && <p role="status" className="mt-4 rounded-xl border border-night/20 bg-mint-soft p-3 text-[11px] leading-5 text-forest">In your event app, this opens the organiser’s reading list, session notes or saved programme. This preview uses sample content.</p>}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <nav aria-label="Demo app navigation" className="grid grid-cols-3 border-t-2 border-night bg-[#f5f1e8] p-2">
              {views.map((item, index) => {
                const Icon = item.icon;
                return <button key={item.short} type="button" aria-pressed={view === index} onClick={() => chooseView(index)} className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-bold ${view === index ? "bg-mint text-forest-deep" : "text-slate hover:bg-white"}`}><Icon size={17} aria-hidden />{item.short}</button>;
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
