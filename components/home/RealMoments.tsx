import Image from "next/image";

import { ActionLink } from "@/components/ui/ActionLink";

import { SectionLabel } from "./SectionLabel";

export function RealMoments() {
  return (
    <section aria-labelledby="real-moments-title" className="bg-hero px-5 py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-[1260px] items-center gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
        <div className="max-w-[570px]">
          <SectionLabel>Life at CCA</SectionLabel>
          <h2
            id="real-moments-title"
            className="mt-5 font-sans text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-footer sm:text-[48px] lg:text-[56px]"
          >
            Real people. Real milestones.
          </h2>
          <p className="mt-6 font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">
            The work matters because of where it leads. Meet the community behind CCA and see a real milestone from the 2026 graduating class.
          </p>
          <ActionLink href="/events/" showArrow className="mt-8 min-w-[190px]">
            Explore CCA Events
          </ActionLink>
        </div>

        <div className="grid grid-cols-[1.3fr_.7fr] items-end gap-4 sm:gap-5">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[24px_72px_24px_24px] bg-footer shadow-[0_18px_55px_rgba(16,24,40,.14)] sm:rounded-[28px_100px_28px_28px]">
            <Image
              src="/images/events/convocation-2026/hero-celebration.webp"
              alt="CCA graduates celebrating together after the 2026 convocation"
              fill
              quality={90}
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 52vw, 70vw"
              className="object-cover object-center"
            />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-full border border-white/30 bg-footer/78 px-4 py-2 text-center font-body text-[12px] font-medium text-white backdrop-blur-sm sm:left-5 sm:right-auto sm:text-[13px]">
              The 2026 graduating community
            </figcaption>
          </figure>

          <figure className="relative aspect-[3/4] overflow-hidden rounded-[70px_22px_22px_22px] bg-footer shadow-[0_16px_45px_rgba(16,24,40,.13)] sm:rounded-[94px_24px_24px_24px]">
            <Image
              src="/images/events/convocation-2026/graduate-ready-portrait.webp"
              alt="A CCA graduate in academic dress holding flowers and her graduation scroll"
              fill
              quality={90}
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 24vw, 35vw"
              className="object-cover object-center"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
