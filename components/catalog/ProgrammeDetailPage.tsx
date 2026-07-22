import { Award, CheckCircle2, Clock3, Laptop2, Star, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CurriculumAccordion } from "@/components/catalog/CurriculumAccordion";
import { Consultation } from "@/components/home/Consultation";
import { RecognitionCarousel } from "@/components/home/RecognitionCarousel";
import { PageShell } from "@/components/pages/PageShell";
import { ActionLink } from "@/components/ui/ActionLink";
import { divisionById } from "@/data/program-catalog";
import { whatsappRegistration } from "@/data/home";
import type { ProgrammeCatalogEntry } from "@/types/catalog";

export function ProgrammeDetailPage({ programme }: { programme: ProgrammeCatalogEntry }) {
  const division = divisionById.get(programme.divisionId);

  return (
    <PageShell>
      <section className="overflow-hidden bg-hero px-5 pb-20 pt-[170px] lg:pb-24 lg:pt-[190px]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-7 font-body text-[13px] text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-primary-bright">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/divisions/" className="hover:text-primary-bright">Divisions</Link></li>
                {division ? <><li aria-hidden="true">/</li><li><Link href={`/divisions/${division.slug}/`} className="hover:text-primary-bright">{division.shortTitle}</Link></li></> : null}
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-primary-deep">{programme.title}</li>
              </ol>
            </nav>
            <span className="inline-flex min-h-10 items-center rounded-full border border-primary-bright/35 bg-white px-5 font-sans text-[14px] font-bold text-primary-deep shadow-sm">Career Accelerator Programme</span>
            <h1 className="mt-7 max-w-[720px] font-sans text-[44px] font-semibold leading-[1.05] tracking-[-0.05em] text-black sm:text-[58px] lg:text-[72px]">{programme.title}</h1>
            <p className="mt-7 max-w-[720px] font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">{programme.heroDescription}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ActionLink href={whatsappRegistration} showArrow className="min-w-[168px]">Register Now</ActionLink>
              <ActionLink href="#course-breakdown" variant="outline" className="min-w-[220px]">View Course Breakdown</ActionLink>
            </div>
            <div className="mt-9 grid max-w-[620px] gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-[16px] border border-black/10 bg-white/80 px-4 py-3">
                <div className="flex -space-x-1 text-[#ffb000]"><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /></div>
                <span className="font-sans text-[12px] font-semibold text-primary-deep">Trusted by Experts</span>
              </div>
              <div className="flex items-center gap-3 rounded-[16px] border border-black/10 bg-white/80 px-4 py-3">
                <UsersRound aria-hidden="true" className="size-5 text-primary-bright" />
                <span className="font-sans text-[12px] font-semibold text-primary-deep">Taught by Senior Professionals</span>
              </div>
            </div>
          </div>
          <div className="relative min-h-[440px] overflow-hidden rounded-[28px_120px_28px_28px] bg-white shadow-[0_24px_70px_rgba(113,11,192,.18)] sm:min-h-[570px] lg:min-h-[640px]">
            <Image src={programme.image} alt={programme.imageAlt} fill priority quality={90} sizes="(min-width: 1024px) 570px, calc(100vw - 40px)" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section aria-labelledby="role-title" className="bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[26px_90px_26px_26px] bg-hero">
            <Image src={programme.image} alt={`Professional working as a ${programme.title}`} fill loading="eager" quality={90} sizes="(min-width: 1024px) 500px, calc(100vw - 40px)" className="object-cover" />
          </div>
          <div>
            <span className="font-sans text-[14px] font-semibold uppercase tracking-[.16em] text-primary-readable">The Career</span>
            <h2 id="role-title" className="mt-4 font-sans text-[36px] font-semibold leading-[1.12] tracking-[-0.04em] text-black sm:text-[48px]">Who is a {programme.title}?</h2>
            <p className="mt-7 font-body text-[16px] leading-8 text-muted-foreground lg:text-[18px]">{programme.roleDescription}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Production-ready technical skills", "Real portfolio evidence", "Professional team workflows", "Career preparation and mentoring"].map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 font-body text-[14px] leading-6 text-muted-foreground">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary-bright" />{outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="programme-format-title" className="bg-hero px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="programme-format-title" className="text-center font-sans text-[32px] font-semibold tracking-[-0.035em] text-black sm:text-[42px]">Built Around Real Career Outcomes</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Clock3, "6 Months", "Structured career sprint"],
              [Laptop2, "Hybrid & Online", "Flexible guided learning"],
              [Award, "Verified Work", "Portfolio-ready evidence"],
              [UsersRound, "Expert Mentors", "Professional feedback"],
            ].map(([Icon, title, description]) => {
              const ItemIcon = Icon as typeof Clock3;
              return <article key={String(title)} className="rounded-[20px] border border-black/10 bg-white p-6 text-center shadow-sm"><span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-primary-bright text-white"><ItemIcon aria-hidden="true" className="size-6" /></span><h3 className="mt-5 font-sans text-[19px] font-semibold text-black">{String(title)}</h3><p className="mt-2 font-body text-[13px] leading-5 text-muted-foreground">{String(description)}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section id="course-breakdown" aria-labelledby="course-breakdown-title" className="scroll-mt-28 bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-[980px]">
          <div className="text-center">
            <span className="inline-flex min-h-10 items-center rounded-full border border-primary-bright/30 px-5 font-sans text-[14px] font-semibold text-primary-deep">Course Breakdown</span>
            <h2 id="course-breakdown-title" className="mt-7 font-sans text-[34px] font-semibold leading-[1.12] tracking-[-0.04em] text-black sm:text-[48px]">Your Complete Learning Path</h2>
            <p className="mx-auto mt-5 max-w-[760px] font-body text-[16px] leading-7 text-muted-foreground">A practical progression from foundations to a portfolio-ready industrial project, with feedback throughout the journey.</p>
          </div>
          <div className="mt-12"><CurriculumAccordion modules={programme.modules} /></div>
        </div>
      </section>

      <RecognitionCarousel />
      <Consultation />
    </PageShell>
  );
}
