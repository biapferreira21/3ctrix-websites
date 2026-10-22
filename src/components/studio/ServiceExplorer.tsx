"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, ClipboardCheck, FileSearch, FileText, Hand, Layers3, LayoutTemplate, Mic2, MousePointer2, Smartphone, Ticket, Workflow } from "lucide-react";
import { servicePaths, researchPaths, serviceSelectionEvent, type ServicePath } from "@/content/servicePaths";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import { cn } from "@/lib/cn";

const icons = { media: Mic2, review: ClipboardCheck, app: Smartphone, workflow: Workflow, research: FileSearch, website: LayoutTemplate };
const tones = { media: "bg-[#f6dfb6]", review: "bg-[#e8e0fb]", app: "bg-[#dfece2]", workflow: "bg-[#E3EBE1]", research: "bg-[#e8e0fb]", website: "bg-[#f6dfb6]" };

export function ServiceExplorer({ research = false }: { research?: boolean }) {
  const paths: readonly ServicePath[] = research ? researchPaths : servicePaths;
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const reducedMotion = useReducedMotionPreference();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const service = paths[selected];
  const Icon = icons[service.theme];

  function choose(index: number) {
    setSelected(index);
    setStage(0);
  }

  function handleKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % paths.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + paths.length - 1) % paths.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = paths.length - 1;
    else return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mt-10" data-service-explorer={research ? "research" : "studio"}>
      <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-forest">
        <Hand size={17} aria-hidden /> Choose a goal. Explore what we can do.
      </p>
      <div className="grid items-start gap-6 lg:grid-cols-[.72fr_1.6fr]">
        <div role="tablist" aria-label={research ? "Research services" : "Services by goal"} aria-orientation="vertical" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {paths.map((path, index) => {
            const PathIcon = icons[path.theme];
            return (
              <button key={path.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab"
                id={`${id}-tab-${index}`} aria-selected={selected === index} aria-controls={`${id}-panel-${index}`} tabIndex={selected === index ? 0 : -1}
                onClick={() => choose(index)} onKeyDown={(event) => handleKeys(event, index)}
                className={cn("relative isolate flex min-h-16 items-center gap-3 rounded-2xl border-2 border-night px-4 py-4 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-forest", selected === index ? "text-white" : "bg-white text-ink hover:bg-mint")}>
                {selected === index && <motion.span aria-hidden layoutId={`${id}-selection`} transition={{ duration: reducedMotion ? 0 : .25 }} className="absolute inset-0 -z-10 rounded-[.8rem] bg-night shadow-[4px_4px_0_#8FA38A]" />}
                <PathIcon size={20} aria-hidden className="shrink-0" />
                <span className="flex-1">{path.label}</span>
                <ArrowRight size={17} aria-hidden className={selected === index ? "text-emerald-glow" : "text-slate"} />
              </button>
            );
          })}
        </div>

        <div>
          {paths.map((path, index) => (
            <div key={path.id} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={selected !== index} tabIndex={0}
              className="rounded-[1.75rem] border-[3px] border-night bg-white p-5 shadow-[7px_7px_0_#16180F] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-forest sm:p-8">
              {selected === index && (
                <motion.div key={path.id} initial={false} animate={{ opacity: 1 }}>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-forest"><Icon size={16} aria-hidden /> {path.category}</div>
                  <h3 className="mt-4 max-w-xl text-2xl font-semibold leading-tight text-ink sm:text-3xl">{path.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate">{path.description}</p>
                  <p className="mt-3 text-xs font-semibold text-forest">{path.audience}</p>

                  <ServicePreview service={path} stage={stage} setStage={setStage} reducedMotion={reducedMotion} />

                  <div className="mt-7 border-t-2 border-night/10 pt-5">
                    <p className="text-[10px] font-bold uppercase tracking-[.15em] text-forest">Possible project scope</p>
                    <ul className="mt-3 grid gap-2 text-sm text-ink">
                      {path.deliverables.map((item) => <li key={item} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-forest" aria-hidden />{item}</li>)}
                    </ul>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <a href="#contact" onClick={() => window.dispatchEvent(new CustomEvent(serviceSelectionEvent, { detail: { serviceId: path.id } }))}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-night bg-night px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-forest focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-forest">
                      Discuss this service <ArrowRight size={16} aria-hidden />
                    </a>
                    <a href={path.link.href} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest underline underline-offset-4">{path.link.label} <ArrowRight size={15} aria-hidden /></a>
                  </div>
                  <p className="mt-5 max-w-xl text-xs leading-5 text-slate">{path.note}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicePreview({ service, stage, setStage, reducedMotion }: {
  service: ServicePath; stage: number; setStage: (stage: number) => void; reducedMotion: boolean;
}) {
  const current = service.stages[stage];
  const Icon = icons[service.theme];
  return (
    <div className={cn("relative mt-6 overflow-hidden rounded-2xl border-2 border-night p-4 sm:p-5", tones[service.theme])}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-forest"><Layers3 size={14} aria-hidden /> Illustrative workflow</span>
        <span className="text-[11px] text-slate">Select a step <ArrowDown size={12} aria-hidden className="inline" /></span>
      </div>
      <div role="group" aria-label={`${service.label} workflow steps`} className="relative grid grid-cols-3 gap-2">
        {service.stages.map((item, index) => (
          <button key={item.label} type="button" aria-pressed={stage === index} onClick={() => setStage(index)}
            className={cn("relative z-10 min-h-12 rounded-xl border-2 border-night px-1 py-2 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-forest", stage === index ? "bg-forest text-white" : "bg-white text-ink hover:bg-mint-soft")}>
            <span className="mb-0.5 block text-[9px] opacity-70">0{index + 1}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="relative mx-auto mt-5 max-w-md">
        <div aria-hidden className="absolute inset-0 translate-x-1 translate-y-1 rounded-xl border-2 border-night bg-white/60" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={`${service.id}-${stage}`} initial={reducedMotion ? false : { opacity: 0, y: 10, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reducedMotion ? 0 : .2 }}
            className="relative rounded-xl border-2 border-night bg-white p-4 sm:p-5" aria-live="polite" aria-atomic="true">
            <div className="flex items-center justify-between gap-3 border-b border-night/15 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-[.12em] text-forest">{current.detail}</span>
              <Icon size={19} aria-hidden className="shrink-0 text-forest" />
            </div>
            <ServiceSignal theme={service.theme} stage={stage} reducedMotion={reducedMotion} />
            <p className="mt-1 text-base font-semibold leading-6 text-ink">{current.title}</p>
            <ul className="mt-4 space-y-2.5">
              {current.items.map((item, index) => (
                <motion.li key={item} initial={reducedMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : .25, delay: reducedMotion ? 0 : index * .07 }} className="flex items-center gap-3 text-xs leading-5 text-slate">
                  <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", index === 0 ? "bg-forest" : index === 1 ? "bg-gold" : "bg-lilac-deep")} />{item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// These small diagrams illustrate the kind of work, not product results or data.
// All movement is finite and triggered by a visitor's choice.
function ServiceSignal({ theme, stage, reducedMotion }: { theme: ServicePath["theme"]; stage: number; reducedMotion: boolean }) {
  if (theme === "website") {
    return (
      <div aria-hidden className="my-4 overflow-hidden rounded-xl border-2 border-night bg-mint-soft">
        <div className="flex items-center gap-1 border-b border-night/20 bg-white px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" /><span className="h-1.5 w-1.5 rounded-full bg-gold" /><span className="h-1.5 w-1.5 rounded-full bg-lilac-deep" />
          <span className="ml-auto text-[9px] font-semibold text-forest">EVENT WEBSITE · EXAMPLE</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-forest">{stage === 0 ? "A question. A useful post." : stage === 1 ? "Speakers. Ideas. Reasons to attend." : "Ready to join the conversation?"}</p>
            <motion.div initial={reducedMotion ? false : { scaleX: .2 }} animate={{ scaleX: 1 }} transition={{ duration: reducedMotion ? 0 : .4 }} className="mt-2 h-1.5 w-4/5 origin-left rounded bg-sage-light" />
            <div className="mt-1.5 h-1.5 w-3/5 rounded bg-sage-light/60" />
          </div>
          <motion.span initial={reducedMotion ? false : { scale: .9 }} animate={{ scale: 1 }} transition={{ duration: reducedMotion ? 0 : .3 }} className={cn("inline-flex items-center gap-1 rounded-full border-2 border-night px-2 py-2 text-[9px] font-bold", stage === 2 ? "bg-forest text-white shadow-[2px_2px_0_#8FA38A]" : "bg-white text-forest")}><Ticket size={12} />View tickets</motion.span>
        </div>
      </div>
    );
  }
  if (theme === "media") {
    return (
      <div aria-hidden className="my-4 flex h-16 items-center gap-4 rounded-xl bg-mint-soft px-4">
        <Mic2 size={24} className="shrink-0 text-forest" />
        <div className="flex h-9 flex-1 items-center gap-1">
          {[16, 28, 12, 36, 22, 14, 32, 18, 26, 36, 14, 22, 30, 12, 24, 32, 16, 28].map((height, index) => (
            <motion.span key={index} initial={reducedMotion ? false : { scaleY: .15 }} animate={{ scaleY: 1 }} transition={{ duration: reducedMotion ? 0 : .4, delay: reducedMotion ? 0 : index * .025 }} style={{ height }} className="min-w-0 flex-1 rounded-full bg-forest/70" />
          ))}
        </div>
        <FileText size={22} className="shrink-0 text-forest" />
      </div>
    );
  }
  if (theme === "review") {
    return (
      <div aria-hidden className="relative my-4 flex h-16 items-center gap-3 rounded-xl border border-night/20 bg-mint-soft px-4">
        {[0, 1, 2].map((index) => <div key={index} className={cn("flex h-9 flex-1 items-center justify-center rounded-lg border-2", stage === index ? "border-forest bg-white" : "border-night/15 bg-white/40")}><span className={cn("h-2 rounded-full", stage === index ? "w-8 bg-forest" : "w-5 bg-sage-light")} /></div>)}
        <motion.div initial={reducedMotion ? false : { x: -12, y: 8 }} animate={{ x: 0, y: 0 }} transition={{ duration: reducedMotion ? 0 : .4 }} className="absolute bottom-0 right-5 rounded-full bg-white p-1"><MousePointer2 size={20} className="text-forest" /></motion.div>
      </div>
    );
  }
  const nodes = theme === "app" ? [Smartphone, Mic2, FileText] : theme === "workflow" ? [Layers3, ClipboardCheck, FileText] : [FileSearch, Layers3, FileText];
  return (
    <div aria-hidden className="my-4 flex h-16 items-center justify-center gap-2 rounded-xl bg-mint-soft px-4">
      {nodes.map((NodeIcon, index) => (
        <div key={index} className="contents">
          <motion.span initial={reducedMotion ? false : { scale: .85 }} animate={{ scale: 1 }} transition={{ duration: reducedMotion ? 0 : .3, delay: reducedMotion ? 0 : index * .1 }} className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-night", stage === index ? "bg-forest text-white shadow-[3px_3px_0_#8FA38A]" : "bg-white text-forest")}><NodeIcon size={20} /></motion.span>
          {index < 2 && <div className="relative h-0.5 min-w-3 max-w-14 flex-1 overflow-hidden bg-night/20"><motion.span initial={reducedMotion ? false : { x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: reducedMotion ? 0 : .7, delay: reducedMotion ? 0 : index * .2 }} className="absolute inset-0 bg-forest" /></div>}
        </div>
      ))}
    </div>
  );
}
