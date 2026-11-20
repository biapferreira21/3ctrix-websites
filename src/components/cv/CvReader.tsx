"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useScroll } from "framer-motion";
import { BookOpen, FileText, Images } from "lucide-react";
import documentPages from "@/content/cvDocument.json";
const documentMarkup = documentPages.map((content) => ({ __html: content }));

export function CvReader({ still, onOpen, onExplore }: {
  still: boolean;
  onOpen: (chapter: string, entry: string, trigger: HTMLElement) => void;
  onExplore: () => void;
}) {
  const reader = useRef<HTMLDivElement>(null);
  const pages = useRef<(HTMLElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: reader, offset: ["start start", "end end"] });
  function openStory(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (element.closest("a")) return;
    const story = element.closest<HTMLElement>("[data-cv-story]");
    if (!story) return;
    const [chapter, entry] = story.dataset.cvStory!.split("/");
    const trigger = element.closest<HTMLButtonElement>("button") ?? story.querySelector<HTMLButtonElement>("button");
    if (trigger) onOpen(chapter, entry, trigger);
  }
  return <div ref={reader} className="cv-reader">
    <nav className="cv-reader-nav" aria-label="Full CV pages">
      <div><BookOpen size={18} aria-hidden /><span>The complete CV</span></div>
      <div className="cv-reader-page-links">{["Experience", "Background"].map((label, index) => <button type="button" key={label} onClick={() => pages.current[index]?.scrollIntoView({ behavior: still ? "instant" : "smooth", block: "start" })}><span>Page {index + 1}</span>{label}</button>)}</div>
      <motion.span className="cv-read-progress" aria-hidden style={{ scaleX: scrollYProgress }} />
    </nav>
    <div className="cv-reader-intro"><p>Read the full CV. <span>Open any highlighted experience to see its photographs and story.</span></p><span><Images size={16} aria-hidden />Click a title to explore</span></div>
    <div className="cv-document" onClick={openStory}>
      {documentPages.map((content, index) => <motion.article key={index} ref={(element) => { pages.current[index] = element; }} className="cv-document-page" aria-label={`CV page ${index + 1} of 2: ${index === 0 ? "Experience" : "Background"}`} initial={still ? false : { opacity: 1, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }} transition={{ duration: still ? 0 : .7 }}>
        <div className="cv-document-folio"><FileText size={16} aria-hidden /><span>{index === 0 ? "Experience & interests" : "Background & development"}</span><strong>{index + 1} / 2</strong></div>
        {/* Trusted, reviewed snapshot of the approved CV. No scripts or editable fields. */}
        <div className="cv-document-columns" dangerouslySetInnerHTML={documentMarkup[index]} />
        <div className="cv-document-bottom"><span>Beatriz Pereira Ferreira</span>{index === 0 ? <button type="button" onClick={() => pages.current[1]?.scrollIntoView({ behavior: still ? "instant" : "smooth", block: "start" })}>Continue to page 2</button> : <button type="button" onClick={onExplore}>Explore the stories</button>}</div>
      </motion.article>)}
    </div>
  </div>;
}
