"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { personalProjects, projectPreviewFlows } from "@/content/personalProjects";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import { Container } from "@/components/ui/Container";

export function PersonalProjects() {
  const reducedMotion = useReducedMotionPreference();
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative isolate overflow-hidden border-b border-night/20 bg-[#f5f1e8] py-16 sm:py-24">
      <motion.div aria-hidden className="pointer-events-none absolute -right-24 top-0 -z-10 h-96 w-96 rounded-full border-[50px] border-lilac/20" initial={false} whileInView={reducedMotion ? {} : { rotate: [0, 65], scale: [.7, 1.1] }} viewport={{ once: true }} transition={{ duration: 1.8 }} />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">02 / Selected projects</p><h2 id="projects-heading" className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">From an idea to something real.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate">Three things I’ve built, for participation, training and learning.</p></div>
          <a href="https://github.com/biapferreira21" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-forest underline underline-offset-4">My GitHub <ArrowUpRight size={16} aria-hidden /></a>
        </div>
        <div className="mt-10 grid items-start gap-7 md:grid-cols-3" data-project-grid>
          {personalProjects.map((project, index) => (
            <motion.article key={project.id} initial={reducedMotion ? false : { opacity: 0, y: 50, rotateX: 6 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .7, delay: index * .12, ease: [.22, 1, .36, 1] }} whileHover={reducedMotion ? {} : { y: -8, rotate: index === 1 ? .6 : -.6 }} className="overflow-hidden rounded-3xl border border-night/25 bg-white shadow-[0_12px_36px_#0e17120b]">
              {project.image ? <figure className={`flex h-[19.5rem] flex-col justify-center p-5 lg:h-[23.5rem] ${project.id === "alphavote" ? "bg-[#07110d]" : "bg-[#efebdf]"}`}><Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 768px) 85vw, 360px" className="h-60 w-full object-contain lg:h-[19rem]" /><figcaption className={`mt-3 text-center text-[10px] ${project.id === "alphavote" ? "text-sage-light" : "text-slate"}`}>{project.image.caption}</figcaption></figure> : <div className="flex h-[19.5rem] flex-col justify-center bg-night px-6 text-white lg:h-[23.5rem]">
                <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-sage-light">A path, not a pile of links.</p>
                <ol className="relative space-y-4 border-l border-sage-dark pl-5">
                  {projectPreviewFlows["ai-research-roadmap"].map((step, stepIndex) => <motion.li key={step.title} initial={false} whileInView={reducedMotion ? {} : { x: [12, 0], opacity: [.35, 1] }} viewport={{ once: true }} transition={{ duration: .7, delay: stepIndex * .2 }}><span className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full bg-lilac" /><p className="text-lg font-semibold">{step.title}</p><p className="mt-1 text-[11px] text-sage-light">{step.items.slice(0, 2).join(" · ")}</p></motion.li>)}
                </ol><p className="mt-5 text-[10px] text-sage-light">Learning-path illustration</p>
              </div>}
              <div className="p-5 lg:p-6"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-forest">{project.category}</p><h3 className="mt-3 text-2xl font-semibold text-ink">{project.title}</h3><p className="mt-3 text-sm leading-7 text-slate">{project.summary}</p>
                <details name="personal-project-details" className="group mt-5 border-t border-night/15">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 text-xs font-bold text-forest [&::-webkit-details-marker]:hidden">Details & links<ChevronDown size={16} aria-hidden className="transition-transform duration-300 group-open:rotate-180" /></summary>
                  <div className="pb-2"><ul className="space-y-2 text-xs leading-6 text-slate">{project.features.map((feature) => <li key={feature}>— {feature}</li>)}</ul>{project.id === "alpha-tkd-pro" && <p className="mt-3 text-[11px] leading-6 text-slate">Direct Android test release, not a Google Play listing.</p>}<div className="mt-4 flex flex-col items-start gap-1">{project.action && <a href={project.action.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold text-forest underline underline-offset-4">{project.action.label}<ArrowUpRight size={14} aria-hidden /></a>}<a href={`${project.repository}/blob/main/README.md`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-forest underline underline-offset-4">Code & README<ArrowUpRight size={14} aria-hidden /></a></div></div>
                </details>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
