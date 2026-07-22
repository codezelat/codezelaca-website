import Image from "next/image";

import { MetricIcon } from "@/components/icons";
import { ActionLink } from "@/components/ui/ActionLink";
import { metrics, navigation, whatsappRegistration } from "@/data/home";
import type { Metric } from "@/types/home";

const metricTone: Record<Metric["tone"], string> = {
  violet: "bg-[#5848ff]",
  pink: "bg-[#f80f7c]",
  purple: "bg-gradient-to-br from-[#7d3cff] to-[#bc08f2]",
};

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-[40px] h-[1383px] overflow-hidden bg-hero lg:-mt-[80px] lg:h-[1000px]"
    >
      <div className="absolute inset-x-[10px] top-[210px] mx-auto max-w-[1280px]">
        <div className="grid h-[733px] grid-cols-1 gap-[20px] lg:h-[514px] lg:grid-cols-2">
          <div className="relative h-[451px] min-w-0 p-[10px] lg:h-[514px]">
            <div className="absolute top-[31px] left-[10px] hidden h-[45px] w-[470px] items-center rounded-[40px] border border-black/25 bg-white px-[18px] text-[14px] leading-[20px] text-[#4915ff] shadow-[0_2px_8px_rgba(0,0,0,0.10)] lg:flex">
              <span aria-hidden="true" className="mr-[11px] inline-flex h-[14px] w-[21px] shrink-0 items-center rounded-full bg-[#7918d4] p-[3px]">
                <span className="size-[8px] rounded-full bg-white" />
              </span>
              Next Cohort Starts August 2026 - Limited Seats Available
            </div>

            <h1
              id="hero-heading"
              className="absolute top-[10px] left-[10px] w-[265px] font-sans text-[36px] leading-[39.6px] font-semibold tracking-[-0.5px] text-black lg:top-[101px] lg:w-[495px] lg:text-[42px] lg:leading-[45px] lg:tracking-normal"
            >
              Start Your Tech Career in{" "}
              <span className="bg-gradient-to-r from-[#cb00f8] to-[#8a08d1] bg-clip-text text-transparent">
                6 Months
              </span>
            </h1>

            <p className="absolute top-[157px] left-[10px] w-[340px] font-sans text-[16px] leading-[19.2px] font-normal text-muted-foreground lg:top-[216px] lg:w-[520px] lg:text-[17px] lg:leading-[27px]">
              Learn from industry professionals, build real projects employers care about, and follow a curriculum shaped by global tech standards with government recognition.
            </p>

            <div className="absolute top-[256px] left-[10px] flex flex-col items-start gap-[10px] lg:top-[377px] lg:flex-row lg:gap-[20px]">
              <ActionLink
                href={whatsappRegistration}
                showArrow
                className="h-[55px] min-h-[55px] w-[163px] px-[20px] leading-[15px]"
              >
                Register Now
              </ActionLink>
              <ActionLink
                href={navigation[1].href}
                variant="outline"
                className="h-[57px] min-h-[57px] w-[232px] px-[20px] leading-[15px]"
              >
                Explore Career Tracks
              </ActionLink>
            </div>

            <div className="absolute top-[404px] left-[10px] flex flex-col items-start gap-[5px] font-sans text-[14px] leading-[20px] text-muted-foreground lg:top-[465px] lg:flex-row lg:items-center lg:gap-[18px]">
              <span className="whitespace-nowrap">1000+ Student Applications</span>
              <span aria-hidden="true" className="hidden h-[17px] w-px bg-[#98a2b3] lg:block" />
              <Image
                src="/images/cca/stars.png"
                alt="Five star rating"
                width={88}
                height={16}
                unoptimized
                className="hidden h-[16px] w-[88px] object-contain lg:block"
              />
              <span className="whitespace-nowrap">100% Job-Ready Skills</span>
            </div>
          </div>

          <div className="relative h-[262px] min-w-0 lg:h-[514px] lg:p-[10px]">
            <div className="absolute inset-x-0 bottom-0 h-[322px] lg:inset-[10px] lg:h-auto">
              <Image
                src="/images/cca/Hero-BG.png"
                alt="Learner celebrating while holding a laptop, surrounded by technology icons"
                fill
                preload
                fetchPriority="high"
                quality={90}
                sizes="(min-width: 1024px) 610px, calc(100vw - 20px)"
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-[10px] h-[350px] w-full rounded-[20px] border-[5px] border-white bg-gradient-to-b from-[#cb00f8] to-[#710bc0] p-[10px] shadow-[0_0_10px_rgba(0,0,0,0.08)] lg:h-[152px] lg:w-[1088px]">
          <ul aria-label="Program metrics" className="grid h-full grid-cols-2 gap-[20px] lg:grid-cols-4">
            {metrics.map((metric) => (
              <li
                key={metric.label}
                className="flex min-w-0 flex-col items-center justify-center rounded-[20px] bg-white px-[10px] text-center lg:flex-row lg:justify-start lg:px-[16px] lg:text-left"
              >
                <span
                  className={`inline-flex size-[60px] shrink-0 items-center justify-center rounded-full text-white lg:size-[58px] ${metricTone[metric.tone]}`}
                >
                  <MetricIcon icon={metric.icon} />
                </span>
                <span className="mt-[7px] min-w-0 lg:mt-0 lg:ml-[7px]">
                  <strong className="block font-sans text-[24px] leading-[27px] font-semibold tracking-[-0.5px] text-black lg:text-[36px] lg:leading-[40px] lg:tracking-[-1px]">
                    {metric.value}
                  </strong>
                  <span className="mt-[1px] block font-sans text-[14px] leading-[17px] font-semibold text-muted-foreground lg:whitespace-nowrap">
                    {metric.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
