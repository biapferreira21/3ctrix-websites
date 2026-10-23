"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, Download, Expand, ExternalLink, X } from "lucide-react";
import type { StoryChapter, StoryLink, StoryMoment } from "@/content/about";
import { moveStoryIndex, storyIndexFromKey } from "@/lib/storyNavigation";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import { cn } from "@/lib/cn";

export function StoryGallery({ chapters }: { chapters: readonly StoryChapter[] }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [momentIndex, setMomentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const chapterContent = useRef<HTMLDivElement>(null);
  const id = useId();
  const chapter = chapters[chapterIndex];
  const moment = chapter?.moments[momentIndex];

  useEffect(() => {
    const element = dialog.current;
    if (!element || !expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    closeButton.current?.focus();
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, [expanded]);

  if (!chapter || !moment) return null;
  function chooseChapter(index: number) {
    setChapterIndex(index); setMomentIndex(0);
    chapterContent.current?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  }
  function move(direction: number) { setMomentIndex((current) => moveStoryIndex(current, direction, chapter.moments.length)); }
  function navigateWithKeys(event: KeyboardEvent<HTMLElement>) {
    // Native selects and links keep their own keyboard behaviour.
    if ((event.target as HTMLElement).closest("select, button, a, input, summary")) return;
    const next = storyIndexFromKey(event.key, momentIndex, chapter.moments.length);
    if (next === null) return;
    event.preventDefault(); setMomentIndex(next);
  }
  const previousDisabled = momentIndex === 0;
  const nextDisabled = momentIndex === chapter.moments.length - 1;
  const controlClass = "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-night/25 transition-colors disabled:cursor-default disabled:opacity-30";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10">
      <nav aria-label="Story chapters" className="sticky top-[5.25rem] z-20 bg-mint-soft py-2 lg:top-28 lg:bg-transparent lg:py-0">
        <div className="lg:hidden"><label htmlFor={`${id}-chapter-select`} className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-forest">Choose a chapter</label><select id={`${id}-chapter-select`} value={chapterIndex} onChange={(event) => chooseChapter(Number(event.target.value))} className="min-h-12 w-full rounded-xl border border-night/30 bg-white px-3 text-sm font-semibold text-forest">{chapters.map((item, index) => <option value={index} key={item.id}>{String(index + 1).padStart(2, "0")} / {item.title}</option>)}</select></div>
        <ol className="hidden space-y-1 border-l border-night/20 lg:block">
          {chapters.map((item, index) => <li key={item.id} className="relative"><button type="button" aria-current={chapterIndex === index ? "step" : undefined} aria-controls={`${id}-chapter`} onClick={() => chooseChapter(index)} className={cn("relative w-full py-4 pl-5 pr-2 text-left text-sm leading-6 transition-colors", chapterIndex === index ? "font-semibold text-forest" : "text-slate hover:text-forest")}><span className="mb-1 block font-mono text-[10px] opacity-60">0{index + 1}</span>{item.title}{chapterIndex === index && <motion.span layoutId={`${id}-chapter-indicator`} transition={{ type: "spring", stiffness: 250, damping: 28, duration: reducedMotion ? 0 : undefined }} aria-hidden className="absolute -left-[2px] top-3 bottom-3 w-[3px] rounded-full bg-forest" />}</button></li>)}
        </ol>
      </nav>

      <div ref={chapterContent} id={`${id}-chapter`} className="min-w-0 scroll-mt-[12rem] lg:scroll-mt-24">
        <motion.div key={chapter.id} initial={reducedMotion ? false : { opacity: 0, y: 22, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reducedMotion ? 0 : .65, ease: [.22, 1, .36, 1] }}>
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">{chapter.eyebrow}</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{chapter.title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate">{chapter.introduction}</p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-night/25 bg-white shadow-[0_16px_44px_#0e17120c]" data-story-gallery>
            <div role="region" aria-label={`Photo story: ${moment.title}`} tabIndex={0} onKeyDown={navigateWithKeys} className="grid xl:grid-cols-[1fr_1fr]">
              <div className="relative min-w-0 bg-[#e4e9df] p-4 sm:p-5">
                <button type="button" onClick={() => setExpanded(true)} aria-label={`Enlarge image: ${moment.title}`} className="relative block w-full overflow-hidden rounded-2xl bg-white">
                  <span className="relative block h-[min(52svh,26rem)] min-h-64 sm:h-[28rem]">
                    <motion.span key={moment.id} className="absolute inset-0 block" initial={reducedMotion ? false : { opacity: 0, scale: 1.055 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0 : .8, ease: [.22, 1, .36, 1] }}><StoryImage image={moment.image} sizes="(max-width: 1280px) 90vw, 460px" priority={chapterIndex === 0 && momentIndex === 0} /></motion.span>
                  </span><span className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-forest"><Expand size={16} aria-hidden /></span>
                </button>
              </div>
              <div className="flex min-w-0 flex-col justify-center p-5 sm:p-7">
                <motion.div key={moment.id} aria-live="polite" aria-atomic="true" initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .5, delay: reducedMotion ? 0 : .1 }}>
                  {moment.eventRole && <p className="mb-3 text-xs font-bold text-forest">{moment.eventRole} · 3C Trix founder</p>}
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-forest">{moment.label}</p><h4 className="mt-4 text-2xl font-semibold leading-tight text-ink sm:text-3xl">{moment.title}</h4><p className="mt-4 text-sm leading-7 text-slate">{moment.text}</p><p className="mt-4 text-[11px] leading-6 text-slate">{moment.caption}</p>
                  {moment.links && <div className="mt-4 grid gap-1">{moment.links.map((link) => <StoryResourceLink key={`${link.href}-${link.label}`} link={link} />)}</div>}
                  {moment.resourceNote && <p className="mt-3 text-xs leading-6 text-slate">{moment.resourceNote}</p>}
                </motion.div>
              </div>
            </div>
            <div className="flex items-end gap-3 border-t border-night/15 p-4 sm:px-5" role="group" aria-label="Photo navigation">
              <div className="min-w-0 flex-1"><label htmlFor={`${id}-photo-select`} className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-forest">Photo {momentIndex + 1} / {chapter.moments.length}</label><select id={`${id}-photo-select`} value={momentIndex} onChange={(event) => setMomentIndex(Number(event.target.value))} className="min-h-11 w-full truncate rounded-lg border border-night/20 bg-paper px-2 text-xs text-ink">{chapter.moments.map((item, index) => <option key={item.id} value={index}>{index + 1}. {item.group ? `${item.group} — ` : ""}{item.title}</option>)}</select></div>
              <button type="button" aria-label="Previous photo" onClick={() => move(-1)} disabled={previousDisabled} className={cn(controlClass, "bg-white text-forest hover:bg-mint")}><ArrowLeft size={17} aria-hidden /></button><button type="button" aria-label="Next photo" onClick={() => move(1)} disabled={nextDisabled} className={cn(controlClass, "bg-night text-white hover:bg-forest")}><ArrowRight size={17} aria-hidden /></button>
            </div>
            <motion.div aria-hidden className="h-[3px] origin-left bg-forest" initial={false} animate={{ scaleX: (momentIndex + 1) / chapter.moments.length }} transition={{ duration: reducedMotion ? 0 : .45 }} />
          </div>

          {(chapter.results || chapter.highlights) && <details key={chapter.id} className="group mt-6 border-y border-night/20"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest [&::-webkit-details-marker]:hidden">Details & milestones<ChevronDown size={16} aria-hidden className="transition-transform duration-300 group-open:rotate-180" /></summary><div className="pb-6">
            {chapter.results && <dl aria-label="Academic results" className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">{chapter.results.map((result) => <div key={result.label}><dt className="text-[10px] font-bold text-forest">{result.label}</dt><dd className="mt-1 text-xl font-semibold">{result.value}</dd></div>)}</dl>}
            <div className="grid gap-5 sm:grid-cols-2">{chapter.highlights?.map((highlight) => <div key={highlight.title}><h4 className="text-sm font-semibold text-ink">{highlight.title}</h4><p className="mt-2 text-xs leading-6 text-slate">{highlight.text}</p>{highlight.links?.map((link) => <StoryResourceLink key={link.href} link={link} />)}</div>)}</div>
          </div></details>}
        </motion.div>
      </div>

      <dialog ref={dialog} aria-labelledby={`${id}-viewer-title`} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }} className="fixed inset-0 m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-5xl overflow-y-auto rounded-2xl border border-night bg-paper p-4 text-ink shadow-2xl backdrop:bg-night/90 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4"><p id={`${id}-viewer-title`} className="text-sm font-semibold">{moment.title}</p><button type="button" ref={closeButton} aria-label="Close photo viewer" onClick={() => setExpanded(false)} className={cn(controlClass, "bg-white text-forest")}><X size={19} aria-hidden /></button></div>
        {expanded && <div className="relative h-[65dvh] w-full rounded-xl bg-white" tabIndex={0} onKeyDown={navigateWithKeys}><StoryImage image={moment.image} sizes="95vw" /></div>}
        <div className="mt-4 flex items-center justify-between gap-3"><p className="text-xs text-slate">{momentIndex + 1} / {chapter.moments.length}</p><div className="flex gap-2"><button type="button" aria-label="Previous enlarged photo" disabled={previousDisabled} onClick={() => move(-1)} className={cn(controlClass, "bg-white text-forest")}><ArrowLeft size={16} aria-hidden /></button><button type="button" aria-label="Next enlarged photo" disabled={nextDisabled} onClick={() => move(1)} className={cn(controlClass, "bg-night text-white")}><ArrowRight size={16} aria-hidden /></button></div></div>
      </dialog>
    </div>
  );
}

function StoryImage({ image, sizes, priority = false }: { image: StoryMoment["image"]; sizes: string; priority?: boolean }) {
  const clipId = useId().replace(/:/g, "");
  if (!image.crop) return <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-contain" />;
  const { x, y, width, height } = image.crop;
  return <svg viewBox={`${x} ${y} ${width} ${height}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={image.alt} focusable="false" className="absolute inset-0 h-full w-full overflow-hidden"><defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs><image href={image.src} width={image.width} height={image.height} clipPath={`url(#${clipId})`} /></svg>;
}

function StoryResourceLink({ link }: { link: StoryLink }) {
  const Icon = link.download ? Download : ExternalLink;
  return <a href={link.href} download={link.download || undefined} target={link.download ? undefined : "_blank"} rel={link.download ? undefined : "noopener noreferrer"} className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold leading-6 text-forest underline underline-offset-4">{link.label}<Icon size={13} aria-hidden className="shrink-0" /></a>;
}
