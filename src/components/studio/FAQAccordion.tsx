"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function FAQAccordion({
  items,
}: {
  items: readonly (readonly [string, string])[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y-2 divide-night border-y-2 border-night">
      {items.map(([question, answer], index) => {
        const isOpen = open === index;
        const panelId = `studio-faq-panel-${index}`;
        const triggerId = `studio-faq-trigger-${index}`;
        return (
          <div key={question}>
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left text-base font-semibold text-ink hover:text-forest"
              >
                <span>{question}</span>
                <Plus
                  size={20}
                  aria-hidden
                  className={cn(
                    "shrink-0 transition-transform",
                    isOpen && "rotate-45"
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-6 pr-10 text-sm leading-7 text-slate sm:text-base"
            >
              {answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
