import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProgrammeCard } from "@/components/catalog/ProgrammeCard";
import { Consultation } from "@/components/home/Consultation";
import { MetricsBand } from "@/components/pages/MetricsBand";
import { PageShell } from "@/components/pages/PageShell";
import { ActionLink } from "@/components/ui/ActionLink";
import { programmeBySlug } from "@/data/program-catalog";
import { whatsappRegistration } from "@/data/home";
import type { DivisionCatalogEntry } from "@/types/catalog";

export function DivisionDetailPage({ division }: { division: DivisionCatalogEntry }) {
  const divisionProgrammes = division.programmeSlugs.map((slug) => programmeBySlug.get(slug)).filter(Boolean);

  return (
    <PageShell>
      <section className="overflow-hidden bg-hero px-5 pb-20 pt-[170px] lg:pb-24 lg:pt-[190px]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-7 font-body text-[13px] text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" prefetch={false} className="hover:text-primary-bright">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/divisions/" className="hover:text-primary-bright">Divisions</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-primary-deep">{division.shortTitle}</li>
              </ol>
            </nav>
            <h1 className="max-w-[680px] font-sans text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] text-black sm:text-[54px] lg:text-[66px]">
              {division.title}
            </h1>
            <p className="mt-7 max-w-[680px] font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">
              {division.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ActionLink href={whatsappRegistration} showArrow className="min-w-[168px]">Register Now</ActionLink>
              <ActionLink href="#programmes" variant="outline" className="min-w-[220px]">Explore Programmes</ActionLink>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 font-body text-[14px] text-muted-foreground">
              <li className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-5 text-primary-bright" />Real industry projects</li>
              <li className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-5 text-primary-bright" />Senior mentors</li>
              <li className="flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-5 text-primary-bright" />Career-ready portfolio</li>
            </ul>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[28px_120px_28px_28px] shadow-[0_24px_70px_rgba(113,11,192,.16)] sm:min-h-[540px] lg:min-h-[610px]">
            <Image src={division.image} alt={division.imageAlt} fill priority quality={90} sizes="(min-width: 1024px) 920px, calc(150vw - 60px)" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="programmes" aria-labelledby="division-programmes-title" className="scroll-mt-28 bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[900px] text-center">
            <span className="inline-flex min-h-10 items-center rounded-full border border-primary-bright/30 px-5 font-sans text-[14px] font-semibold text-primary-deep">Career Accelerator Programmes</span>
            <h2 id="division-programmes-title" className="mt-7 font-sans text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] text-black sm:text-[46px] lg:text-[54px]">
              Choose the Path That Fits Your Goals
            </h2>
            <p className="mt-5 font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px]">Every programme combines practical learning, mentor guidance and portfolio work designed around a real role.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {divisionProgrammes.map((item) => item ? <ProgrammeCard key={item.slug} programme={item} /> : null)}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/divisions/" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary-bright px-6 font-sans text-[14px] font-semibold text-primary-deep transition hover:bg-primary-bright hover:text-white">
              Compare All Five Divisions <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <MetricsBand />
      <Consultation />
    </PageShell>
  );
}
