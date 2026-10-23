"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Code2, ExternalLink, GitBranch, BookOpen, FileText } from "lucide-react";
import { personalProjects, projectPreviewFlows } from "@/content/personalProjects";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import { Container } from "@/components/ui/Container";

function ParticipationPreview() {
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <div className="mt-6 rounded-2xl border-2 border-night bg-mint-soft p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-forest">Try a local preview · not a live poll</p>
      <p className="mt-2 text-sm font-semibold text-ink">When exploring a new topic, where would you start?</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {["Read the evidence", "Explore different views"].map((option) => (
          <button key={option} type="button" aria-pressed={choice === option} onClick={() => setChoice(option)} className={`flex min-h-11 items-center justify-between gap-2 rounded-xl border-2 border-night px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest ${choice === option ? "bg-night text-white" : "bg-white text-ink hover:bg-mint"}`}>
            {option}{choice === option && <Check size={15} aria-hidden />}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-3 min-h-8 text-xs leading-5 text-slate">{choice ? `Preview choice: ${choice}. No vote has been submitted or saved.` : "Choose an option to explore the interaction. This preview has no real votes or results."}</p>
    </div>
  );
}

function WorkflowPreview({ projectId }: { projectId: "ai-research-roadmap" | "content-hub" }) {
  const [step, setStep] = useState(0);
  const steps = projectPreviewFlows[projectId];
  const active = steps[step];
  const isRoadmap = projectId === "ai-research-roadmap";
  const Icon = isRoadmap ? BookOpen : FileText;
  return (
    <div className="flex h-full min-h-[420px] flex-col justify-center bg-night p-5 text-white sm:p-8">
      <div className="flex items-center gap-3 text-sage-light"><Icon size={25} aria-hidden /><p className="text-[10px] font-bold uppercase tracking-[.15em]">{isRoadmap ? "From foundations to research" : "From sources to participation"}</p></div>
      <p className="mt-7 text-2xl font-semibold leading-tight sm:text-3xl">{isRoadmap ? "A path, not a pile of links." : "AI assists. A human decides."}</p>
      <div className="mt-7 grid grid-cols-3 gap-2" role="group" aria-label={isRoadmap ? "Learning path preview" : "Editorial workflow preview"}>
        {steps.map((item, index) => (
          <button key={item.title} type="button" aria-pressed={step === index} onClick={() => setStep(index)} className={`min-h-20 rounded-xl border-2 px-2 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${step === index ? "border-lilac bg-lilac text-night" : "border-sage-dark text-white hover:bg-forest-deep"}`}>
            <span className="block text-[10px] font-bold opacity-75">0{index + 1}</span><span className="mt-2 block text-xs font-bold">{item.title}</span>
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-5 min-h-36 rounded-xl border border-sage-dark bg-forest-deep p-4">
        <p className="text-sm leading-6 text-mint-soft">{active.detail}</p>
        <div className="mt-4 flex flex-wrap gap-2">{active.items.map((item) => <span key={item} className="rounded-full border border-sage-dark px-2 py-1 text-[10px] text-mint">{item}</span>)}</div>
      </div>
      <p className="mt-5 text-[10px] leading-5 text-sage-light">Interactive workflow illustration, not a screenshot or a connected app session.</p>
    </div>
  );
}

export function PersonalProjects() {
  const [selected, setSelected] = useState(0);
  const project = personalProjects[selected];
  const reducedMotion = useReducedMotionPreference();
  const baseId = useId();

  function selectWithKeyboard(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = (index + 1) % personalProjects.length;
    if (event.key === "ArrowLeft") next = (index - 1 + personalProjects.length) % personalProjects.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = personalProjects.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 border-b-[3px] border-night bg-[#f5f1e8] py-14 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">Selected personal projects</p><h2 id="projects-heading" className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">Ideas I’ve turned into products.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate">Participation, training, learning and publishing. A few things I’ve built — and the thinking behind them.</p></div>
          <a href="https://github.com/biapferreira21" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-forest underline underline-offset-4">Explore my GitHub <ExternalLink size={14} aria-hidden /></a>
        </div>
        <div role="tablist" aria-label="Selected projects" className="mt-8 flex gap-2 overflow-x-auto pb-3 pr-1">
          {personalProjects.map((item, index) => <button key={item.id} type="button" role="tab" id={`${baseId}-tab-${index}`} aria-selected={selected === index} aria-controls={`${baseId}-panel-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => selectWithKeyboard(event, index)} className={`flex min-h-12 shrink-0 items-center gap-3 whitespace-nowrap rounded-full border-2 border-night px-4 py-3 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest ${selected === index ? "bg-night text-white shadow-[3px_3px_0_#B7A6EA]" : "bg-white text-forest hover:bg-mint"}`}><span className={selected === index ? "text-lilac" : "text-slate"}>0{index + 1}</span>{item.title}</button>)}
        </div>
        <motion.div key={project.id} role="tabpanel" id={`${baseId}-panel-${selected}`} aria-labelledby={`${baseId}-tab-${selected}`} tabIndex={0} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }} className="mt-3 grid overflow-hidden rounded-3xl border-[3px] border-night bg-white shadow-[6px_6px_0_#8FA38A] lg:grid-cols-[.9fr_1.1fr]">
          <div className="min-w-0 border-b-[3px] border-night lg:border-b-0 lg:border-r-[3px]">
            {project.image ? <figure className={`flex h-full min-h-[420px] flex-col items-center justify-center px-4 py-5 ${project.id === "alphavote" ? "bg-[#07110d]" : "bg-[#efebdf]"}`}><Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 1024px) 85vw, 460px" className="h-[350px] w-full object-contain sm:h-[410px]" /><figcaption className={`mt-4 text-center text-[10px] ${project.id === "alphavote" ? "text-sage-light" : "text-slate"}`}>{project.image.caption}</figcaption></figure> : <WorkflowPreview key={project.id} projectId={project.id as "ai-research-roadmap" | "content-hub"} />}
          </div>
          <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-forest">{project.category}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{project.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate">{project.summary}</p>
            <ul className="mt-5 space-y-3">{project.features.map((feature) => <li key={feature} className="flex gap-2 text-xs leading-5 text-ink"><ChevronRight size={15} aria-hidden className="mt-0.5 shrink-0 text-forest" />{feature}</li>)}</ul>
            {project.id === "alphavote" && <ParticipationPreview />}
            {project.id === "alpha-tkd-pro" && <p className="mt-6 rounded-xl border border-sage-light bg-mint-soft p-3 text-xs leading-6 text-slate">An Android app distributed as a direct test release, not a Google Play listing. The screenshot shows the app’s Portuguese interface.</p>}
            {project.id === "ai-research-roadmap" && <p className="mt-6 flex items-center gap-2 text-xs text-forest"><GitBranch size={16} aria-hidden /> Select a stage to explore the learning path.</p>}
            {project.id === "content-hub" && <p className="mt-6 flex items-center gap-2 text-xs text-forest"><GitBranch size={16} aria-hidden /> Built inside the AlphaVote ecosystem.</p>}
            <div className="mt-7 flex flex-wrap gap-3">
              {project.action && <a href={project.action.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-night bg-night px-4 py-2 text-xs font-bold text-white">{project.action.label}<ArrowRight size={15} aria-hidden /></a>}
              <a href={`${project.repository}/blob/main/README.md`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-night px-4 py-2 text-xs font-bold text-forest"><Code2 size={15} aria-hidden /> Code & README</a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
