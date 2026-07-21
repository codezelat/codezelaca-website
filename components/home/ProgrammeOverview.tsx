import Image from "next/image";

import { programmeOutcomes } from "@/data/home";

import { SectionLabel } from "./SectionLabel";

export function ProgrammeOverview() {
  return (
    <section
      aria-labelledby="programme-overview-title"
      className="my-20 p-2.5 min-[1025px]:h-[746px]"
    >
      <div className="mx-auto grid h-full w-full max-w-[1280px] gap-5 min-[1025px]:grid-cols-2">
        <div className="flex h-[428px] min-w-0 flex-col gap-5 p-2.5 sm:h-auto">
          <SectionLabel className="self-center sm:self-start">
            About the Programme
          </SectionLabel>

          <h2
            id="programme-overview-title"
            className="text-[32px] leading-[32px] font-semibold tracking-[-0.5px] min-[1025px]:text-[42px] min-[1025px]:leading-[45px] min-[1025px]:tracking-normal"
          >
            What is CodeZela Career Accelerator?
          </h2>

          <p className="font-sans text-[15px] leading-[24px] text-[#4a5565] sm:text-[16px] min-[1025px]:text-[18px] min-[1025px]:leading-[27px]">
            The Codezela Career Accelerator is a premium, outcomes-driven
            programme that transforms ambitious learners into skilled
            professionals through real-world projects, expert mentorship, and a
            proven curriculum.
          </p>

          <p className="font-sans text-[15px] leading-[24px] text-[#4a5565] sm:text-[16px] min-[1025px]:text-[18px] min-[1025px]:leading-[27px]">
            Every learner finishes with verified work experience, a job-ready
            portfolio, and clear pathways to international certification. This
            is practical training built for real careers, not theory.
          </p>

          <Image
            src="/images/cca/Frame-1000001114-2-1024x503.png"
            alt="CodeZela Career Accelerator learner testimonials"
            width={1024}
            height={503}
            unoptimized
            sizes="(min-width: 1025px) 610px, (min-width: 640px) calc(100vw - 40px), 0px"
            className="hidden h-auto w-full sm:block"
          />
        </div>

        <div className="flex h-[1272px] min-w-0 items-start p-2.5 sm:h-auto sm:items-center">
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
            {programmeOutcomes.map((outcome) => (
              <article
                key={outcome.title}
                className="h-[302px] min-w-0 rounded-[20px] border border-black bg-white p-[5px]"
              >
                <div className="flex h-[290px] min-w-0 flex-col gap-5 rounded-[20px] border border-black p-2.5">
                  <div className="relative h-[142px] w-full shrink-0 overflow-hidden rounded-[18px]">
                    <Image
                      src={outcome.image}
                      alt={outcome.alt}
                      fill
                      quality={90}
                      sizes="(min-width: 1025px) 261px, (min-width: 640px) calc((100vw - 86px) / 2), calc(100vw - 74px)"
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-[18px] leading-[18px] font-semibold">
                    {outcome.title}
                  </h3>

                  <p className="font-sans text-[14px] leading-[18px] text-[#4a5565]">
                    {outcome.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
