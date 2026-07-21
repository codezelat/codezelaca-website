import { CircleCheck } from "lucide-react";
import Image from "next/image";

import { Consultation } from "@/components/home/Consultation";
import { ActionLink } from "@/components/ui/ActionLink";
import { divisions } from "@/data/pages";
import { whatsappRegistration } from "@/data/home";
import { cn } from "@/lib/utils";

import { InnerHero } from "./InnerHero";
import { PageShell } from "./PageShell";

export function DivisionsPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="Our Divisions"
        title="Five Divisions Built for Real Careers"
        description="The Codezela Career Accelerator is organised into five specialist schools, each focused on powerful career paths in tech, data, design, marketing and systems. Every school is led by industry professionals, aligned with global hiring demand and built around real projects, internships and verified work experience."
        anchorLinks={divisions.map((division) => ({ label: division.shortTitle, href: `#${division.id}` }))}
      />

      <section aria-label="Career divisions" className="bg-white px-5 py-10 lg:py-20">
        <div className="mx-auto max-w-[1280px] space-y-24 lg:space-y-32">
          {divisions.map((division, index) => (
            <article
              id={division.id}
              key={division.id}
              className="scroll-mt-32 lg:grid lg:min-h-[630px] lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <div className={cn("flex min-w-0 flex-col items-start", index % 2 === 1 && "lg:order-2")}>
                <h2 className="inline-flex min-h-14 items-center rounded-full border border-primary-bright/35 bg-white px-6 text-[20px] leading-6 font-semibold text-primary-deep sm:text-[24px] lg:text-[28px]">
                  {division.title}
                </h2>
                <p className="mt-8 font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">
                  {division.description}
                </p>
                <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                  {division.programmes.map((programme) => (
                    <li key={programme} className="flex items-start gap-3 font-body text-[15px] leading-6 text-muted-foreground lg:text-[16px]">
                      <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 fill-primary-bright text-white" />
                      {programme}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row">
                  <ActionLink href={division.href} showArrow className="min-w-[190px]">View Program Details</ActionLink>
                  <ActionLink href={whatsappRegistration} variant="outline" className="min-w-[210px]">Reserve Your Seat Now!</ActionLink>
                </div>
              </div>

              <div className={cn("relative mt-12 aspect-[4/3] min-w-0 overflow-hidden rounded-[24px_120px_24px_24px] lg:mt-0 lg:h-[590px] lg:aspect-auto", index % 2 === 1 && "lg:order-1 lg:rounded-[120px_24px_24px_24px]")}>
                <Image
                  src={division.image}
                  alt={division.imageAlt}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 600px, calc(100vw - 40px)"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <Consultation />
    </PageShell>
  );
}

