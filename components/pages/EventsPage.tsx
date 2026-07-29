import { BookOpen, Code2, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";

import { EventGallery } from "@/components/events/EventGallery";
import { ActionLink } from "@/components/ui/ActionLink";
import { graduationGallery } from "@/data/events";
import { whatsappRegistration } from "@/data/home";

import { PageShell } from "./PageShell";

const journey = [
  {
    title: "Learn",
    description: "Build a strong foundation through focused, career-led learning.",
    icon: BookOpen,
  },
  {
    title: "Build",
    description: "Turn knowledge into practical work and a portfolio you can show.",
    icon: Code2,
  },
  {
    title: "Grow",
    description: "Develop confidence, professional habits and a clearer direction.",
    icon: TrendingUp,
  },
  {
    title: "Graduate",
    description: "Celebrate the milestone and step forward into what comes next.",
    icon: GraduationCap,
  },
] as const;

export function EventsPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-hero px-5 pt-[165px] pb-20 sm:pt-[180px] lg:pt-[195px] lg:pb-28">
        <div aria-hidden="true" className="absolute -top-24 -right-28 -z-10 size-[360px] rounded-full bg-primary-bright/8 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[-150px] left-[-120px] -z-10 size-[420px] rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep sm:text-[14px]">
              CCA Events &amp; Moments
            </p>
            <h1 className="mt-5 text-[42px] leading-[1.05] font-semibold tracking-[-0.045em] text-footer sm:text-[56px] lg:text-[52px] xl:text-[64px]">
              Celebrating the CCA Graduating Batch
            </h1>
            <p className="mx-auto mt-7 max-w-[610px] font-body text-[16px] leading-7 text-muted-foreground sm:text-[18px] sm:leading-8 lg:mx-0">
              A proud chapter shaped by learning, determination and growth—shared with the graduates, families, mentors and community who made the moment meaningful.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <ActionLink href="#gallery" showArrow className="min-w-[190px]">
                Explore the Moments
              </ActionLink>
              <ActionLink href="/events/graduation-2026/" variant="outline" className="min-w-[190px]">
                View Event Story
              </ActionLink>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-[24px_80px_24px_24px] bg-footer shadow-[0_22px_70px_rgba(113,11,192,.18)] sm:rounded-[28px_120px_28px_28px]">
            <div className="relative aspect-[4/3] sm:aspect-[16/10]">
              <Image
                src="/images/events/convocation-2026/hero-celebration.webp"
                alt="CCA graduates celebrating together with certificates after the 2026 convocation"
                fill
                loading="eager"
                fetchPriority="high"
                quality={75}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-footer/76 px-4 py-2 font-body text-[13px] font-medium text-white backdrop-blur-sm sm:bottom-5 sm:left-5 sm:text-[14px]">
              <Sparkles aria-hidden="true" className="size-4 text-fuchsia-300" />
              2026 Graduation Celebration
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="milestone-title" className="bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">
              The 2026 Convocation
            </p>
            <h2 id="milestone-title" className="mt-5 text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-footer sm:text-[46px] lg:text-[56px]">
              A milestone worth celebrating
            </h2>
            <div className="mt-7 space-y-5 font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">
              <p>
                CCA graduates joined the SITC General Convocation 2026 to mark the work, discipline and persistence behind their achievement.
              </p>
              <p>
                More than a closing ceremony, the day recognised a transition: from learning and building to taking the next step with confidence.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px_100px_24px_24px] bg-hero shadow-[0_16px_50px_rgba(16,24,40,.12)] sm:rounded-[28px_140px_28px_28px] lg:min-h-[560px] lg:aspect-auto">
            <Image
              src="/images/events/convocation-2026/venue-arrival.webp"
              alt="Flags lining the approach to the convocation venue"
              fill
              quality={75}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="day-in-moments-title" className="bg-white px-5 py-4 lg:py-8">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[24px] bg-footer shadow-[0_22px_70px_rgba(16,24,40,.2)] sm:rounded-[28px]">
          <div className="relative aspect-[4/3] min-h-[520px] sm:aspect-[16/10] lg:aspect-[2/1] lg:min-h-0">
            <Image
              src="/images/events/convocation-2026/auditorium-panorama.webp"
              alt="A panoramic view of the auditorium during the 2026 convocation"
              fill
              quality={75}
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,rgba(16,24,40,.86),transparent)] lg:hidden" />
          </div>

          <div className="absolute right-4 bottom-4 left-4 rounded-[20px] border border-white/40 bg-white/94 p-6 shadow-2xl backdrop-blur-md sm:right-7 sm:bottom-7 sm:left-auto sm:max-w-[470px] sm:p-8 lg:right-10 lg:bottom-10">
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[.2em] text-primary-deep">Inside the ceremony</p>
            <h2 id="day-in-moments-title" className="mt-3 text-[30px] leading-[1.12] font-semibold tracking-[-0.03em] text-footer sm:text-[38px]">
              The day, in moments
            </h2>
            <p className="mt-4 font-body text-[15px] leading-7 text-muted-foreground sm:text-[16px]">
              From the arrival and procession to recognition on stage, each photograph holds a different part of the same shared achievement.
            </p>
            <a href="#gallery" className="mt-6 inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-primary-readable transition hover:gap-3 hover:text-primary-deep">
              View the gallery <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="mt-20 bg-hero px-5 py-20 lg:mt-28 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">The path to the milestone</p>
            <h2 id="journey-title" className="mt-5 text-[36px] leading-[1.1] font-semibold tracking-[-0.04em] text-footer sm:text-[46px]">
              Every graduation begins before the ceremony
            </h2>
          </div>

          <ol className="mt-14 grid gap-0 overflow-hidden rounded-[24px] border border-primary-deep/15 bg-white shadow-[0_14px_45px_rgba(113,11,192,.09)] sm:grid-cols-2 lg:grid-cols-4">
            {journey.map(({ title, description, icon: Icon }, index) => (
              <li key={title} className="group relative border-b border-primary-deep/12 p-7 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-r lg:border-b-0 lg:last:border-r-0 lg:p-8">
                <span className="font-body text-[12px] font-semibold tabular-nums text-primary-deep">0{index + 1}</span>
                <span className="mt-5 flex size-12 items-center justify-center rounded-[15px] bg-primary-deep/8 text-primary-deep transition duration-300 group-hover:-translate-y-1 group-hover:bg-primary-deep group-hover:text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 text-[22px] font-semibold text-footer">{title}</h3>
                <p className="mt-3 font-body text-[14px] leading-6 text-muted-foreground">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-32 bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">Graduation gallery</p>
              <h2 id="gallery-title" className="mt-5 text-[38px] leading-[1.08] font-semibold tracking-[-0.04em] text-footer sm:text-[50px] lg:text-[58px]">
                The moments that made the day
              </h2>
            </div>
            <p className="max-w-[410px] font-body text-[15px] leading-7 text-muted-foreground lg:pb-1 lg:text-[16px]">
              A curated view of the ceremony, recognition and celebration. Select any photograph to open the full gallery.
            </p>
          </div>

          <div className="mt-12">
            <EventGallery photos={graduationGallery} />
          </div>
        </div>
      </section>

      <section aria-labelledby="next-chapter-title" className="bg-white px-5 pt-4 pb-8 lg:pt-8 lg:pb-12">
        <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[24px] bg-primary-deep text-white shadow-[0_22px_70px_rgba(113,11,192,.22)] lg:min-h-[570px] lg:grid-cols-[.8fr_1.2fr]">
          <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-14 lg:py-16">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-fuchsia-200">Begin your own journey</p>
            <h2 id="next-chapter-title" className="mt-5 text-[38px] leading-[1.08] font-semibold tracking-[-0.04em] sm:text-[48px] lg:text-[56px]">
              Your next chapter can start here
            </h2>
            <p className="mt-6 max-w-[520px] font-body text-[16px] leading-7 text-white/78 lg:text-[18px] lg:leading-8">
              Explore the available career paths, speak with our team and find the programme that fits where you want to go next.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/divisions/" className="min-w-[180px] bg-white text-primary-deep hover:bg-fuchsia-100">
                Explore Divisions
              </ActionLink>
              <ActionLink href={whatsappRegistration} variant="outline" className="min-w-[180px] border-white/60 bg-transparent text-white hover:border-primary-bright">
                Register Now
              </ActionLink>
            </div>
          </div>

          <div className="relative min-h-[390px] lg:min-h-full">
            <Image
              src="/images/events/convocation-2026/stage-wide.webp"
              alt="Graduates and academic representatives gathered on the convocation stage"
              fill
              quality={90}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
