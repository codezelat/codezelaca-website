import Image from "next/image";

import { differences } from "@/data/home";

import { SectionLabel } from "./SectionLabel";

const LEFT_COLUMN_COUNT = 3;

function DifferenceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="w-full max-w-[488px] rounded-[20px] border border-[rgba(74,85,101,0.31)] p-[2px]">
      <div className="flex min-h-[166px] flex-col items-center justify-center rounded-[20px] border border-[rgba(74,85,101,0.32)] px-[15px] py-[15px] text-center md:min-h-[118px] md:flex-row md:justify-start md:gap-[clamp(8px,1.53vw,22px)] md:text-left">
        <Image
          src="/images/cca/icon-aa.png"
          alt=""
          aria-hidden="true"
          width={84}
          height={90}
          unoptimized
          className="h-auto w-14 shrink-0 md:w-[clamp(28px,3.9vw,56px)]"
        />

        <div className="mt-[10px] min-w-0 font-body md:mt-0">
          <h3 className="text-[16px] font-bold leading-[16px] text-black md:text-[18px] md:leading-[18px]">
            {title}
          </h3>
          <p className="mt-[9px] text-[16px] leading-[20px] text-muted-foreground md:leading-[19px]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Differences({ heading = "How We're Different" }: { heading?: string }) {
  const leftDifferences = differences.slice(0, LEFT_COLUMN_COUNT);
  const rightDifferences = differences.slice(LEFT_COLUMN_COUNT);

  return (
    <section
      aria-labelledby="differences-heading"
      className="min-h-[1375px] bg-white px-5 pt-5 md:min-h-[640px] md:pt-[21px]"
    >
      <div className="mx-auto flex max-w-[1260px] flex-col items-center">
        <SectionLabel>Why Us?</SectionLabel>

        <h2
          id="differences-heading"
          className="mt-[17px] text-center font-sans text-[32px] font-semibold leading-[38px] text-black md:text-[42px] md:leading-[45px]"
        >
          {heading}
        </h2>

        <p className="mt-[9px] max-w-[350px] text-center font-sans text-[16px] leading-[25px] text-muted-foreground md:mt-[15px] md:max-w-none md:text-[18px] md:leading-[27px]">
          We don’t just teach theory, we build career-ready teams through real experience.
        </p>

        <div className="mt-[41px] grid w-full grid-cols-1 md:mt-[42px] md:grid-cols-[42%_16%_42%]">
          <div className="flex flex-col items-start gap-5">
            {leftDifferences.map((difference) => (
              <DifferenceCard key={difference.title} {...difference} />
            ))}
          </div>

          <div className="hidden items-center justify-center md:flex" aria-hidden="true">
            <Image
              src="/images/cca/cca-logo-768x768.png"
              alt=""
              aria-hidden="true"
              width={768}
              height={768}
              unoptimized
              className="h-auto w-full max-w-[180px] object-contain"
            />
          </div>

          <div className="mt-5 flex flex-col items-end gap-5 md:mt-0">
            {rightDifferences.map((difference) => (
              <DifferenceCard key={difference.title} {...difference} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
