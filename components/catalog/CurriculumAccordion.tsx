"use client";

import { ChevronDown } from "lucide-react";

import type { CurriculumModule } from "@/types/catalog";

export function CurriculumAccordion({ modules }: { modules: CurriculumModule[] }) {
  return (
    <div className="divide-y divide-black/10 overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_14px_50px_rgba(20,10,35,.08)]">
      {modules.map((module, index) => (
        <details key={module.title} className="group" open={index === 0}>
          <summary className="flex min-h-[82px] cursor-pointer list-none items-center gap-4 px-5 py-5 marker:content-none sm:px-8 [&::-webkit-details-marker]:hidden">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-hero font-sans text-[13px] font-bold text-primary-deep">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="min-w-0 flex-1 font-sans text-[16px] font-semibold leading-6 text-black sm:text-[18px]">
              {module.title}
            </h3>
            <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-primary-deep transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-7 pl-[76px] pr-6 sm:pl-[92px] sm:pr-12">
            <p className="font-body text-[15px] leading-7 text-muted-foreground sm:text-[16px]">{module.description}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
