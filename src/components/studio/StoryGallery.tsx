"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Expand, Hand, X } from "lucide-react";
import type { StoryChapter } from "@/content/about";
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
  const thumbnailButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const chapter = chapters[chapterIndex];
  const moment = chapter?.moments[momentIndex];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (expanded) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      element.showModal();
      closeButton.current?.focus();
      return () => {
        element.close();
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [expanded]);

  if (!chapter || !moment) return null;

  function chooseMoment(index: number) {
    setMomentIndex(moveStoryIndex(index, 0, chapter.moments.length));
  }

  function move(direction: number) {
    setMomentIndex((current) => moveStoryIndex(current, direction, chapter.moments.length));
  }

  function navigateWithKeys(event: KeyboardEvent<HTMLElement>, focusThumbnail = false) {
    const next = storyIndexFromKey(event.key, momentIndex, chapter.moments.length);
    if (next === null) return;
    event.preventDefault();
    event.stopPropagation();
    chooseMoment(next);
    if (focusThumbnail) {
      thumbnailButtons.current[next]?.focus({ preventScroll: true });
      thumbnailButtons.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reducedMotion ? "instant" : "smooth" });
    }
  }

  const previousDisabled = momentIndex === 0;
  const nextDisabled = momentIndex === chapter.moments.length - 1;
  const controlClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-night px-4 py-2 text-xs font-bold transition-colors disabled:cursor-default disabled:opacity-35";

  return (
    <div>
      <nav aria-label="Story chapters" className="sticky top-[5.25rem] z-30 mb-8 flex flex-wrap gap-3 bg-mint-soft/95 py-3 backdrop-blur-sm">
        {chapters.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={chapterIndex === index} aria-controls={`${id}-chapter`} onClick={() => { setChapterIndex(index); setMomentIndex(0); }}
            className={cn("inline-flex min-h-12 items-center gap-3 rounded-full border-2 border-night px-5 py-3 text-sm font-semibold", chapterIndex === index ? "bg-night text-white shadow-[3px_3px_0_#8FA38A]" : "bg-white text-ink hover:bg-mint")}>
            <span className="text-[10px] opacity-60">{String(index + 1).padStart(2, "0")}</span>{item.title}
          </button>
        ))}
      </nav>

      <div id={`${id}-chapter`}>
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">{chapter.eyebrow}</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{chapter.title}</h3>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-7 text-slate">{chapter.introduction}</p>
            <ul aria-label="Topics in this chapter" className="mt-4 flex flex-wrap gap-2">
              {chapter.topics.map((topic) => <li key={topic} className="rounded-full border border-night/25 bg-white px-3 py-1 text-[11px] font-semibold text-forest">{topic}</li>)}
            </ul>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border-[3px] border-night bg-white shadow-[7px_7px_0_#16180F]" data-story-gallery>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-night bg-[#f5f1e8] px-4 py-3 sm:px-6">
            <p className="flex items-center gap-2 text-xs font-semibold text-forest"><Hand size={15} aria-hidden /> Choose a photo. Read its story.</p>
            <span className="font-mono text-[11px] font-bold text-slate" aria-live="polite" aria-atomic="true">Photo {momentIndex + 1} of {chapter.moments.length}</span>
          </div>

          <div role="tabpanel" id={`${id}-story`} aria-labelledby={`${id}-photo-${momentIndex}`} tabIndex={0} onKeyDown={(event) => navigateWithKeys(event)} className="grid lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-w-0 border-b-2 border-night bg-mint-soft p-4 sm:p-6 lg:border-b-0 lg:border-r-2">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
              <button type="button" onClick={() => setExpanded(true)} aria-label={`Enlarge photograph: ${moment.title}`} className="relative block w-full rounded-2xl border-2 border-night bg-white shadow-[4px_4px_0_#8FA38A]">
                <span className="relative block h-[min(56svh,28rem)] min-h-64 overflow-hidden rounded-[.8rem] sm:h-[30rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={moment.id} className="absolute inset-0 block" initial={reducedMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0, x: -10 }} transition={{ duration: reducedMotion ? 0 : .22 }}>
                      <Image src={moment.image.src} alt={moment.image.alt} fill sizes="(max-width: 1024px) 90vw, 580px" priority={chapterIndex === 0 && momentIndex === 0} className="object-contain" />
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-2 rounded-full border-2 border-night bg-white/95 px-3 py-2 text-[10px] font-bold text-forest"><Expand size={13} aria-hidden /> Enlarge photo</span>
              </button>
            </div>

            <div className="flex min-w-0 flex-col p-6 sm:p-9">
              <div className="min-h-48" aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={moment.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .2 }}>
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">{moment.label}</p>
                    <h4 className="mt-5 max-w-sm text-3xl font-semibold leading-tight text-ink sm:text-4xl">{moment.title}</h4>
                    <p className="mt-6 max-w-md text-base leading-8 text-slate">{moment.text}</p>
                    <p className="mt-5 text-xs leading-6 text-slate">{moment.caption}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 border-t-2 border-night/10 pt-5 lg:mt-auto lg:pt-6">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-forest"><BookOpen size={14} aria-hidden /> Photographs in this chapter</p>
                <div role="tablist" aria-label={`${chapter.title} photographs`} className="flex gap-3 overflow-x-auto p-1 pb-3" onKeyDown={(event) => navigateWithKeys(event, true)}>
                  {chapter.moments.map((item, index) => (
                    <button key={item.id} ref={(node) => { thumbnailButtons.current[index] = node; }} type="button" role="tab" id={`${id}-photo-${index}`} aria-selected={momentIndex === index} aria-controls={`${id}-story`} tabIndex={momentIndex === index ? 0 : -1} onClick={() => chooseMoment(index)} aria-label={`Photo ${index + 1}: ${item.title}`}
                      className={cn("relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-mint-soft", momentIndex === index ? "border-forest ring-2 ring-forest ring-offset-2" : "border-night/25 opacity-60 transition-opacity hover:opacity-100")}>
                      <Image src={item.image.thumbnail} alt="" fill sizes="64px" className="object-contain" loading="lazy" />
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3" role="group" aria-label="Photo navigation">
                  <button type="button" onClick={() => move(-1)} disabled={previousDisabled} className={cn(controlClass, "bg-white text-forest hover:bg-mint")}><ArrowLeft size={15} aria-hidden />Previous</button>
                  <button type="button" onClick={() => move(1)} disabled={nextDisabled} className={cn(controlClass, "bg-night text-white hover:bg-forest")}>Next<ArrowRight size={15} aria-hidden /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog ref={dialog} aria-labelledby={`${id}-viewer-title`} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }} onKeyDown={(event) => navigateWithKeys(event)} className="fixed inset-0 m-auto w-[calc(100%-1.5rem)] max-w-5xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border-[3px] border-night bg-paper p-4 text-ink shadow-2xl backdrop:bg-night/90 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p id={`${id}-viewer-title`} className="text-sm font-semibold">{moment.title}</p>
          <button type="button" ref={closeButton} aria-label="Close photo viewer" onClick={() => setExpanded(false)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-night bg-white text-forest"><X size={19} aria-hidden /></button>
        </div>
        {expanded && <div className="relative h-[65dvh] w-full rounded-xl bg-white"><Image src={moment.image.src} alt={moment.image.alt} fill sizes="95vw" className="object-contain" /></div>}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate">{moment.caption} · {momentIndex + 1} / {chapter.moments.length}</p>
          <div className="flex gap-2" role="group" aria-label="Enlarged photo navigation">
            <button type="button" aria-label="Previous enlarged photo" disabled={previousDisabled} onClick={() => move(-1)} className={cn(controlClass, "bg-white text-forest")}><ArrowLeft size={15} aria-hidden />Previous</button>
            <button type="button" aria-label="Next enlarged photo" disabled={nextDisabled} onClick={() => move(1)} className={cn(controlClass, "bg-night text-white")}>Next<ArrowRight size={15} aria-hidden /></button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
