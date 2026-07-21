import { MetricIcon } from "@/components/icons";
import { metrics } from "@/data/home";
import type { Metric } from "@/types/home";

const tones: Record<Metric["tone"], string> = {
  violet: "bg-[#5848ff]",
  pink: "bg-[#f80f7c]",
  purple: "bg-gradient-to-br from-[#7d3cff] to-[#bc08f2]",
};

export function MetricsBand() {
  return (
    <section aria-label="Programme outcomes" className="bg-white px-5 py-20">
      <div className="mx-auto max-w-[1180px] rounded-[24px] border-[5px] border-white bg-gradient-to-b from-[#cb00f8] to-[#710bc0] p-[10px] shadow-[0_0_18px_rgba(113,11,192,.24)]">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <li key={metric.label} className="flex min-h-[132px] items-center justify-center rounded-[18px] bg-white px-4 text-left">
              <span className={`inline-flex size-[58px] shrink-0 items-center justify-center rounded-full text-white ${tones[metric.tone]}`}>
                <MetricIcon icon={metric.icon} />
              </span>
              <span className="ml-3 min-w-0">
                <strong className="block text-[32px] leading-9 font-semibold tracking-[-0.04em] text-black">{metric.value}</strong>
                <span className="block text-[13px] leading-5 font-semibold text-muted-foreground">{metric.label === "Job Market" ? "Job Pathways" : metric.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

