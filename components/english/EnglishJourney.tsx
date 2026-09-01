"use client";

import { BookOpen, BriefcaseBusiness, MessageSquareText } from "lucide-react";
import { useState } from "react";

import { englishJourneyStages } from "@/data/english";
import { cn } from "@/lib/utils";

const stageIcons = [BookOpen, MessageSquareText, BriefcaseBusiness] as const;

export function EnglishJourney() {
  const [selectedStage, setSelectedStage] = useState(0);
  const stage = englishJourneyStages[selectedStage];

  const selectAndFocusStage = (index: number) => {
    const nextIndex = (index + englishJourneyStages.length) % englishJourneyStages.length;
    setSelectedStage(nextIndex);
    window.requestAnimationFrame(() => document.getElementById(`english-tab-${englishJourneyStages[nextIndex].id}`)?.focus());
  };

  return (
    <div>
      <div role="tablist" aria-label="Diploma learning stages" className="grid gap-2 border-b border-white/20 sm:grid-cols-3">
        {englishJourneyStages.map((item, index) => {
          const Icon = stageIcons[index];
          const selected = selectedStage === index;
          return (
            <button
              key={item.id}
              id={`english-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`english-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setSelectedStage(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  selectAndFocusStage(index + 1);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectAndFocusStage(index - 1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  selectAndFocusStage(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  selectAndFocusStage(englishJourneyStages.length - 1);
                }
              }}
              className={cn(
                "relative inline-flex min-h-16 items-center gap-3 px-4 text-left font-sans text-[17px] font-semibold text-white/70 transition hover:text-white sm:justify-center",
                selected && "text-white after:absolute after:inset-x-0 after:-bottom-px after:h-1 after:rounded-full after:bg-[#f02c85]",
              )}
            >
              <Icon aria-hidden="true" className={cn("size-5", selected && "text-[#ff5aa1]")} />{item.label}
            </button>
          );
        })}
      </div>

      <div id={`english-panel-${stage.id}`} role="tabpanel" aria-labelledby={`english-tab-${stage.id}`} className="mt-8 grid gap-8 rounded-[20px] border border-white/20 bg-white/[.07] p-6 sm:p-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14 lg:p-10">
        <div>
          <p className="font-sans text-[13px] font-semibold uppercase tracking-[.16em] text-[#ff78b2]">Stage {selectedStage + 1}</p>
          <h3 className="mt-4 text-balance font-sans text-[28px] font-semibold leading-[1.15] text-white sm:text-[34px]">{stage.title}</h3>
          <p className="mt-5 max-w-[460px] font-body text-[15px] leading-7 text-white/70 sm:text-[16px]">{stage.description}</p>
        </div>
        <div className="divide-y divide-white/15">
          {stage.modules.map(([title, description], index) => (
            <article key={title} className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[44px_1fr] sm:gap-4">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-white font-sans text-[12px] font-bold text-[#3216b8]">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h4 className="font-sans text-[17px] font-semibold text-white">{title}</h4>
                <p className="mt-2 font-body text-[14px] leading-6 text-white/65">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
