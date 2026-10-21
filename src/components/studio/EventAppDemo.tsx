"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, Bookmark, CalendarDays, Check, ChevronRight, Clock3, FileText, MapPin, MessageSquareText, MousePointer2, Pause, Play, Search, ThumbsUp, Users, Wifi } from "lucide-react";
import { conferenceSessions as sessions } from "@/content/interactiveDemos";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";

const views = [
  { label: "Build your agenda", short: "Agenda", icon: CalendarDays, title: "Find your next conversation.", text: "Search the programme, filter by topic and tap a bookmark to create your own agenda.", hint: "Try saving a session", task: "saved", tone: "bg-mint" },
  { label: "Ask & participate", short: "Session", icon: MessageSquareText, title: "Bring your question into the room.", text: "Open a session, add a question or support one you would like the speaker to explore.", hint: "Try adding a question", task: "question", tone: "bg-[#e8e0fb]" },
  { label: "Meet the speakers", short: "People", icon: Users, title: "Know who you want to meet.", text: "Explore speaker profiles and save an introduction you would like to make during a break.", hint: "Save an introduction", task: "person", tone: "bg-[#f6dfb6]" },
  { label: "Find your way", short: "Map", icon: MapPin, title: "Get to the right room.", text: "Tap a room on the sample floor plan to see what is happening there and how to get there.", hint: "Tap a room on the map", task: "room", tone: "bg-mint" },
  { label: "Keep the useful bits", short: "Notes", icon: FileText, title: "Take the ideas with you.", text: "Open a session recap, revisit your saved programme and keep a personal note for later.", hint: "Open a recap & write a note", task: "notes", tone: "bg-[#e8e0fb]" },
] as const;

const rooms = [
  { name: "Main stage", description: "Follow the central corridor from reception. The stage entrance is at the far end.", route: "Reception → Central corridor → Main stage", tone: "bg-mint", position: "col-span-2" },
  { name: "Studio room", description: "Take the left corridor after reception. The workshop room is on your left.", route: "Reception → Left corridor → Studio room", tone: "bg-[#e8e0fb]", position: "" },
  { name: "Meet-up lounge", description: "Turn right at reception for the conversation and coffee area.", route: "Reception → Right corridor → Meet-up lounge", tone: "bg-[#f6dfb6]", position: "" },
] as const;

const tinyButton = "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border-2 border-night px-3 text-[11px] font-semibold text-forest transition-colors hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:opacity-40";

type DemoQuestion = { id: string; sessionId: string; text: string; own: boolean };

export function EventAppDemo() {
  const root = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { amount: 0.2 });
  const reduceMotion = useReducedMotionPreference();
  const [view, setView] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All topics");
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedSession, setSelectedSession] = useState(0);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<DemoQuestion[]>([]);
  const [supported, setSupported] = useState<string[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [introductions, setIntroductions] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [openRecap, setOpenRecap] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!playing || reduceMotion || !visible) return;
    const timer = window.setInterval(() => setView((current) => (current + 1) % views.length), 7500);
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion, visible]);

  useEffect(() => { screen.current?.scrollTo({ top: 0, behavior: "instant" }); }, [view]);

  const complete = (task: string, message: string) => {
    setPlaying(false);
    setTasks((items) => items.includes(task) ? items : [...items, task]);
    setNotice(message);
  };
  const chooseView = (index: number) => { setView(index); setPlaying(false); setNotice(""); };
  const openSession = (index: number) => { setSelectedSession(index); setQuestion(""); chooseView(1); };
  const current = views[view];
  const session = sessions[selectedSession];
  const filtered = sessions.filter((item) => (!savedOnly || saved.includes(item.id)) && (topic === "All topics" || item.topic === topic) && `${item.title} ${item.speaker} ${item.room}`.toLowerCase().includes(search.toLowerCase()));
  const sessionQuestions: DemoQuestion[] = [
    { id: `${session.id}-starting`, sessionId: session.id, text: "What is one useful first step someone could try after this session?", own: false },
    ...questions.filter((item) => item.sessionId === session.id),
  ];

  return (
    <div ref={root} className="relative mt-14 overflow-hidden rounded-[2rem] border-[3px] border-night bg-[#f5f1e8] shadow-[8px_8px_0_#8FA38A]" aria-label="Interactive conference app demo">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b-2 border-night bg-white px-5 py-4 sm:px-8">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-forest"><span className="h-2 w-2 rounded-full bg-emerald" /> A conference, in your pocket</span>
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-night bg-mint px-3 py-1.5 text-xs font-bold text-forest"><MousePointer2 size={15} aria-hidden />Interactive demo · click to explore</span>
      </div>
      <div className="relative border-b-2 border-night bg-[#fbefd8] px-5 py-4 sm:px-8">
        <p className="flex items-start gap-2 text-sm font-semibold leading-6 text-ink"><MousePointer2 size={19} className="mt-0.5 shrink-0 text-forest" aria-hidden />Yes, you can use the phone below. Tap the buttons, save a session or ask a question.</p>
        <p className="mt-1 pl-7 text-[11px] leading-5 text-slate">A fictional conference to explore freely. Your actions stay in this demo.</p>
        <a href="#conference-demo-phone" className="ml-7 mt-2 inline-flex min-h-11 items-center gap-2 text-xs font-bold text-forest underline underline-offset-4">Try the app below <ArrowRight size={14} className="rotate-90" aria-hidden /></a>
      </div>

      <div className="relative grid items-center gap-10 p-5 sm:p-8 lg:grid-cols-[1fr_1fr] lg:p-12">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-dark">One event. Your own journey.</p>
          <h3 className="mt-4 max-w-sm text-3xl font-semibold leading-tight text-ink sm:text-4xl">Less searching.<br />More being there.</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate">Explore five parts of a simple event app. Choose a feature here, then try it inside the phone.</p>
          <div className="mt-6 space-y-2.5" aria-label="Conference app views">
            {views.map((item, index) => {
              const Icon = item.icon;
              return <button key={item.short} type="button" aria-pressed={view === index} aria-controls="event-demo-screen" onClick={() => chooseView(index)} className={`flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 border-night p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest ${view === index ? `${item.tone} shadow-[3px_3px_0_#16180F]` : "bg-white hover:bg-mint-soft"}`}><Icon className="shrink-0 text-forest" size={21} aria-hidden /><span className="flex-1"><span className="block text-sm font-semibold text-ink">{item.label}</span><span className="mt-0.5 block text-[10px] text-slate">{item.hint}</span></span>{tasks.includes(item.task) ? <Check size={17} className="shrink-0 text-forest" aria-label="Tried" /> : <ArrowRight size={17} className="shrink-0 text-forest" aria-hidden />}</button>;
            })}
          </div>
          <div className="mt-6 min-h-24"><p className="text-base font-semibold text-ink">{current.title}</p><p className="mt-2 max-w-md text-sm leading-6 text-slate">{current.text}</p></div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={() => setPlaying(!playing)} disabled={reduceMotion} className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest underline underline-offset-4 disabled:no-underline disabled:opacity-70">{playing && !reduceMotion ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}{reduceMotion ? "Choose a view above" : playing ? "Pause walkthrough" : "Play walkthrough"}</button>
            <span className="rounded-full border border-night/30 bg-white px-3 py-2 text-[10px] font-semibold text-forest">{tasks.length} / 5 features tried</span>
          </div>
        </div>

        <div id="conference-demo-phone" className="relative mx-auto w-full max-w-[360px] scroll-mt-28 pb-2 pr-2">
          <div className="pointer-events-none absolute -inset-6 hidden rounded-full border border-forest/15 sm:block" />
          <div className="relative mb-4 flex items-center justify-center gap-2 text-xs font-bold text-forest"><MousePointer2 size={16} aria-hidden /><span>Tap inside — it works!</span><motion.span aria-hidden animate={reduceMotion ? {} : { y: [0, 3, 0] }} transition={{ duration: 1.4, repeat: 2 }}>↓</motion.span></div>
          <div className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-night bg-white shadow-[8px_8px_0_#16180F]">
            <div className="flex items-center justify-between bg-night px-6 py-3 text-white" aria-hidden="true"><span className="text-[10px] font-semibold">09:24</span><span className="h-3 w-16 rounded-full bg-white/15" /><Wifi size={12} /></div>
            <div className="border-b-2 border-night bg-mint px-4 pb-4 pt-4"><div className="flex items-center justify-between gap-2"><span className="text-sm font-bold text-forest-deep">3C Trix / Gather</span><span className="rounded-full border border-night bg-white px-2 py-1 text-[8px] font-bold uppercase tracking-wider">Try me</span></div><p className="mt-3 text-xl font-semibold text-ink">Hello, curious mind.</p><p className="mt-1 text-[10px] text-forest">Sample conference · Day 01</p></div>

            <div ref={screen} id="event-demo-screen" className="h-[420px] overflow-y-auto overscroll-contain p-4" onFocusCapture={() => setPlaying(false)} onPointerDownCapture={() => setPlaying(false)}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={view} initial={reduceMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
                  {view === 0 && <div>
                    <h4 className="text-lg font-semibold text-ink">Your agenda</h4>
                    <label className="mt-3 flex items-center gap-2 rounded-xl border-2 border-night bg-white px-3"><Search size={15} className="shrink-0 text-forest" aria-hidden /><input aria-label="Search demo sessions" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search sessions or speakers" className="min-h-11 w-full min-w-0 bg-transparent text-[11px] text-ink outline-none focus-visible:underline" /></label>
                    <div className="mt-3 flex flex-wrap gap-2"><button type="button" aria-pressed={!savedOnly} onClick={() => setSavedOnly(false)} className={`${tinyButton} ${!savedOnly ? "bg-mint" : "bg-white"}`}>All sessions</button><button type="button" aria-pressed={savedOnly} onClick={() => setSavedOnly(true)} className={`${tinyButton} ${savedOnly ? "bg-mint" : "bg-white"}`}><Bookmark size={12} aria-hidden />Saved ({saved.length})</button></div>
                    <label className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-slate">Topic<select value={topic} onChange={(event) => setTopic(event.target.value)} className="min-h-11 min-w-0 flex-1 rounded-lg border border-night/40 bg-white px-2 text-[11px] text-ink"><option>All topics</option>{["AI", "Product", "Crypto", "Media"].map((item) => <option key={item}>{item}</option>)}</select></label>
                    <div className="mt-4 space-y-3">{filtered.map((item) => <article key={item.id} className="rounded-2xl border-2 border-night bg-[#f0ebfb] p-3"><div className="flex items-center justify-between"><span className="flex items-center gap-1 text-[10px] font-bold text-forest"><Clock3 size={11} aria-hidden />{item.time} · {item.topic}</span><button type="button" aria-label={`${saved.includes(item.id) ? "Unsave" : "Save"} ${item.title}`} aria-pressed={saved.includes(item.id)} onClick={() => { const hasSaved = saved.includes(item.id); setSaved((items) => hasSaved ? items.filter((value) => value !== item.id) : [...items, item.id]); complete("saved", hasSaved ? "Removed from your demo agenda." : "Session saved. Tap Saved to find it again."); }} className="-m-1 inline-flex h-11 w-11 items-center justify-center rounded-xl text-forest hover:bg-white"><Bookmark size={17} fill={saved.includes(item.id) ? "currentColor" : "none"} aria-hidden /></button></div><p className="mt-1 text-sm font-semibold leading-5 text-ink">{item.title}</p><p className="mt-2 flex items-center gap-1 text-[10px] text-slate"><MapPin size={11} aria-hidden />{item.room}</p><button type="button" onClick={() => openSession(sessions.findIndex((value) => value.id === item.id))} className="mt-2 inline-flex min-h-11 items-center gap-1 text-[11px] font-bold text-forest underline underline-offset-4">View session<ChevronRight size={14} aria-hidden /></button></article>)}</div>
                    {filtered.length === 0 && <p role="status" className="mt-4 rounded-xl bg-mint-soft p-4 text-xs leading-6 text-slate">{savedOnly && saved.length === 0 ? "No saved sessions yet. Choose All sessions and tap a bookmark." : "No sessions match. Try another topic or clear your search."}</p>}
                  </div>}

                  {view === 1 && <div>
                    <label className="text-[10px] font-semibold text-forest">Choose a session<select value={selectedSession} onChange={(event) => { setSelectedSession(Number(event.target.value)); setQuestion(""); setNotice(""); }} className="mt-2 min-h-11 w-full rounded-lg border-2 border-night bg-white px-2 text-[11px] text-ink">{sessions.map((item, index) => <option key={item.id} value={index}>{item.time} · {item.title}</option>)}</select></label>
                    <h4 className="mt-4 text-lg font-semibold leading-tight text-ink">{session.title}</h4><p className="mt-2 text-[10px] font-medium text-forest">{session.speaker} · {session.room}</p><p className="mt-3 text-xs leading-5 text-slate">{session.description}</p>
                    <form className="mt-4 rounded-xl border-2 border-night bg-[#e8e0fb] p-3" onSubmit={(event) => { event.preventDefault(); const text = question.trim(); if (!text) return; setQuestions((items) => [...items, { id: `own-${items.length}`, sessionId: session.id, text, own: true }]); setQuestion(""); complete("question", "Your demo question was added below."); }}><label htmlFor="demo-session-question" className="text-xs font-semibold text-ink">What would you ask?</label><textarea id="demo-session-question" value={question} maxLength={180} required onChange={(event) => setQuestion(event.target.value)} placeholder="Bring your question to the panel…" className="mt-2 min-h-20 w-full resize-none rounded-lg border border-night/40 bg-white p-2 text-xs text-ink focus:outline-forest" /><button type="submit" disabled={!question.trim()} className={`${tinyButton} mt-2 bg-emerald`}><MessageSquareText size={13} aria-hidden />Add demo question</button></form>
                    <h5 className="mt-5 text-xs font-bold text-forest">Questions in the room</h5><div className="mt-3 space-y-2">{sessionQuestions.map((item) => <div key={item.id} className="rounded-xl border border-night/30 bg-[#f5f1e8] p-3"><p className="text-[9px] font-bold uppercase tracking-wider text-forest">{item.own ? "Your question" : "Sample question"}</p><p className="mt-1 text-xs leading-5 text-ink">{item.text}</p><button type="button" aria-pressed={supported.includes(item.id)} onClick={() => { setSupported((items) => items.includes(item.id) ? items.filter((value) => value !== item.id) : [...items, item.id]); complete("question", "Your question preference was updated in the demo."); }} className={`${tinyButton} mt-2 bg-white`}><ThumbsUp size={12} fill={supported.includes(item.id) ? "currentColor" : "none"} aria-hidden />{supported.includes(item.id) ? "Supported by you" : "I’d like to hear this"}</button></div>)}</div>
                  </div>}

                  {view === 2 && <div>
                    <h4 className="text-lg font-semibold text-ink">People & ideas</h4><p className="mt-2 text-[10px] leading-5 text-slate">Fictional speakers. Tap a profile to explore.</p>
                    <div className="mt-4 space-y-2">{sessions.map((item, index) => <div key={item.id} className="overflow-hidden rounded-xl border-2 border-night bg-white"><button type="button" aria-expanded={selectedPerson === index} onClick={() => setSelectedPerson(selectedPerson === index ? null : index)} className="flex min-h-16 w-full items-center gap-3 p-3 text-left hover:bg-mint-soft"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-night bg-[#e8e0fb] text-[11px] font-bold text-forest" aria-hidden>{item.speaker.split(" ").map((part) => part[0]).join("")}</span><span className="min-w-0 flex-1"><span className="block text-xs font-bold text-ink">{item.speaker}</span><span className="mt-1 block text-[9px] text-slate">{item.role}</span></span><ChevronRight size={14} className={`shrink-0 text-forest transition-transform ${selectedPerson === index ? "rotate-90" : ""}`} aria-hidden /></button>{selectedPerson === index && <div className="border-t border-night/20 bg-[#fbefd8] p-3"><p className="text-xs leading-5 text-slate">{item.bio}</p><button type="button" onClick={() => openSession(index)} className="mt-2 min-h-11 text-[11px] font-bold text-forest underline underline-offset-4">See their session</button><button type="button" aria-pressed={introductions.includes(item.id)} onClick={() => { const exists = introductions.includes(item.id); setIntroductions((items) => exists ? items.filter((value) => value !== item.id) : [...items, item.id]); complete("person", exists ? "Introduction removed from your demo list." : "Introduction saved for your next break. No message was sent."); }} className={`${tinyButton} mt-2 w-full bg-white`}>{introductions.includes(item.id) ? <Check size={13} aria-hidden /> : <Users size={13} aria-hidden />}{introductions.includes(item.id) ? "Introduction saved" : "Save an introduction"}</button></div>}</div>)}</div>
                  </div>}

                  {view === 3 && <div>
                    <h4 className="text-lg font-semibold text-ink">Find your room</h4><p className="mt-2 text-[10px] leading-5 text-slate">Tap a room on this illustrative floor plan.</p>
                    <div className="mt-4 rounded-2xl border-2 border-night bg-[#f5f1e8] p-3"><div className="grid grid-cols-2 gap-3">{rooms.map((room, index) => <button key={room.name} type="button" aria-pressed={selectedRoom === index} onClick={() => { setSelectedRoom(index); complete("room", `${room.name} selected on the sample map.`); }} className={`flex min-h-20 items-center justify-center rounded-xl border-2 border-night p-2 text-center text-[11px] font-bold text-forest ${room.position} ${room.tone} ${selectedRoom === index ? "ring-2 ring-forest ring-offset-2 shadow-[2px_2px_0_#16180F]" : "hover:bg-white"}`}>{selectedRoom === index && <MapPin size={13} className="mr-1 shrink-0" aria-hidden />}{room.name}</button>)}</div><div className="mt-4 rounded-xl border-2 border-dashed border-night/40 bg-white p-3 text-center text-[10px] font-semibold text-slate">↑ Reception & entrance</div></div>
                    <div className="mt-4 rounded-xl border-2 border-night bg-mint-soft p-3"><p className="text-xs font-bold text-forest">{rooms[selectedRoom].name}</p><p className="mt-2 text-xs leading-5 text-slate">{rooms[selectedRoom].description}</p><p className="mt-3 border-t border-night/20 pt-2 text-[10px] font-semibold leading-5 text-forest">{rooms[selectedRoom].route}</p></div>
                    {sessions.filter((item) => item.room === rooms[selectedRoom].name).map((item) => <button key={item.id} type="button" onClick={() => openSession(sessions.findIndex((value) => value.id === item.id))} className="mt-3 flex min-h-11 w-full items-center gap-2 text-left text-[11px] font-semibold text-forest"><Clock3 size={13} className="shrink-0" aria-hidden /><span className="flex-1">{item.time} · {item.title}</span><ChevronRight size={13} className="shrink-0" aria-hidden /></button>)}
                  </div>}

                  {view === 4 && <div>
                    <h4 className="text-lg font-semibold text-ink">Your takeaways</h4><p className="mt-2 text-[10px] leading-5 text-slate">Open a recap and keep a thought for later.</p>
                    <div className="mt-4 space-y-2">{sessions.map((item) => <div key={item.id} className="overflow-hidden rounded-xl border-2 border-night bg-[#fbefd8]"><button type="button" aria-expanded={openRecap === item.id} onClick={() => { setOpenRecap(openRecap === item.id ? null : item.id); }} className="flex min-h-16 w-full items-center gap-2 p-3 text-left text-[11px] font-semibold text-ink hover:bg-mint"><FileText size={16} className="shrink-0 text-forest" aria-hidden /><span className="flex-1">{item.title}</span><ChevronRight size={13} className={`shrink-0 text-forest transition-transform ${openRecap === item.id ? "rotate-90" : ""}`} aria-hidden /></button>{openRecap === item.id && <div className="border-t border-night/20 bg-white p-3"><p className="text-[9px] font-bold uppercase tracking-wider text-forest">Sample recap</p><p className="mt-2 text-xs leading-5 text-slate">{item.takeaway}</p><p className="mt-3 text-[9px] font-bold uppercase tracking-wider text-forest">Reading prompt</p><p className="mt-2 text-xs leading-5 text-slate">{item.reading}</p></div>}</div>)}</div>
                    <div className="mt-4 rounded-xl border-2 border-night bg-[#e8e0fb] p-3"><label htmlFor="demo-personal-note" className="text-xs font-bold text-forest">A note to take home</label><textarea id="demo-personal-note" rows={3} maxLength={300} value={note} onChange={(event) => setNote(event.target.value)} placeholder="One idea I want to explore next…" className="mt-2 w-full rounded-lg border border-night/40 bg-white p-2 text-xs leading-5 text-ink focus:outline-forest" /><button type="button" disabled={!note.trim()} onClick={() => { setSavedNote(note.trim()); complete("notes", "Your note is saved for this demo visit."); }} className={`${tinyButton} mt-2 bg-white`}><Check size={13} aria-hidden />{savedNote && savedNote === note.trim() ? "Note saved" : "Save demo note"}</button></div>
                    {savedNote && <p className="mt-3 rounded-xl bg-mint-soft p-3 text-xs leading-5 text-forest">Your saved note: {savedNote}</p>}
                    <button type="button" onClick={() => { setSavedOnly(true); setSearch(""); setTopic("All topics"); chooseView(0); }} className="mt-4 inline-flex min-h-11 items-center gap-2 text-[11px] font-bold text-forest"><Bookmark size={13} aria-hidden />Return to saved sessions ({saved.length})<ChevronRight size={13} aria-hidden /></button>
                  </div>}
                </motion.div>
              </AnimatePresence>
            </div>
            <div role="status" className="min-h-12 border-t border-night/20 bg-mint-soft px-4 py-2 text-[10px] leading-4 text-forest">{notice || <span className="inline-flex items-center gap-1.5"><MousePointer2 size={12} aria-hidden />{current.hint} · scroll inside for more</span>}</div>
            <nav aria-label="Demo app navigation" className="grid grid-cols-5 gap-0.5 border-t-2 border-night bg-[#f5f1e8] p-2">{views.map((item, index) => { const Icon = item.icon; return <button key={item.short} type="button" aria-pressed={view === index} onClick={() => chooseView(index)} className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest ${view === index ? "bg-mint text-forest-deep" : "text-slate hover:bg-white"}`}><Icon size={16} aria-hidden />{item.short}</button>; })}</nav>
          </div>
        </div>
      </div>
    </div>
  );
}
