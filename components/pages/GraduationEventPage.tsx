import { ArrowLeft, Camera, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ActionLink } from "@/components/ui/ActionLink";

import { PageShell } from "./PageShell";

const eventMoments = [
  {
    src: "/images/events/convocation-2026/venue-arrival.webp",
    alt: "Flags lining the approach to the 2026 convocation venue",
    caption: "The arrival",
    description: "A setting prepared to welcome graduates, families and guests.",
    className: "lg:col-span-7",
  },
  {
    src: "/images/events/convocation-2026/graduates-standing.webp",
    alt: "Graduates standing together during the convocation programme",
    caption: "The ceremony",
    description: "A shared moment of recognition inside the auditorium.",
    className: "lg:col-span-5",
  },
  {
    src: "/images/events/convocation-2026/formal-graduate-group.webp",
    alt: "Graduates gathered together after the ceremony",
    caption: "The celebration",
    description: "A milestone remembered with the people who made the journey.",
    className: "lg:col-span-12",
  },
] as const;

export function GraduationEventPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-hero px-5 pt-[165px] pb-20 sm:pt-[180px] lg:pt-[195px] lg:pb-28">
        <div aria-hidden="true" className="absolute -top-28 -right-24 -z-10 size-[380px] rounded-full bg-primary-bright/8 blur-3xl" />
        <div className="mx-auto max-w-[1280px]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-body text-[14px] text-muted-foreground">
            <Link href="/events/" className="inline-flex items-center gap-2 font-semibold text-primary-deep transition hover:text-primary-bright">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Events &amp; Moments
            </Link>
            <span aria-hidden="true">/</span>
            <span>Graduation 2026</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
            <div>
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">
                2026 Graduation Event Story
              </p>
              <h1 className="mt-5 text-[42px] leading-[1.05] font-semibold tracking-[-0.045em] text-footer sm:text-[58px] lg:text-[64px]">
                A proud chapter, celebrated together
              </h1>
              <p className="mt-7 max-w-[620px] font-body text-[16px] leading-7 text-muted-foreground sm:text-[18px] sm:leading-8">
                CCA graduates joined the SITC General Convocation 2026 to recognise the work behind their achievement and the possibilities waiting beyond it.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="/events/#gallery" showArrow className="min-w-[190px]">
                  View Full Gallery
                </ActionLink>
                <ActionLink href="/divisions/" variant="outline" className="min-w-[190px]">
                  Explore Career Paths
                </ActionLink>
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-[24px_100px_24px_24px] bg-footer shadow-[0_22px_70px_rgba(113,11,192,.2)] sm:rounded-[28px_140px_28px_28px]">
              <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                <Image
                  src="/images/events/convocation-2026/presentation-handshake.webp"
                  alt="A graduate receiving recognition during the 2026 convocation"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  quality={75}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-footer/76 px-4 py-2 font-body text-[13px] font-medium text-white backdrop-blur-sm sm:bottom-5 sm:left-5 sm:text-[14px]">
                <Sparkles aria-hidden="true" className="size-4 text-fuchsia-300" />
                Recognition on stage
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="event-story-title" className="bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[100px_24px_24px_24px] bg-footer shadow-[0_18px_55px_rgba(16,24,40,.15)] sm:rounded-[140px_28px_28px_28px] lg:min-h-[650px] lg:aspect-auto">
            <Image
              src="/images/events/convocation-2026/convocation-stage.webp"
              alt="The 2026 convocation stage as a graduate receives recognition"
              fill
              quality={90}
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">The event story</p>
            <h2 id="event-story-title" className="mt-5 text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-footer sm:text-[48px] lg:text-[56px]">
              The moment behind the milestone
            </h2>
            <div className="mt-7 space-y-5 font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">
              <p>
                Graduation carries every lesson, project, challenge and breakthrough into one visible moment. For this graduating batch, the ceremony marked both a finish and a beginning.
              </p>
              <p>
                Recognition on stage belonged to the graduates, while the celebration around them reflected the families, mentors and community who supported the journey.
              </p>
            </div>

            <dl className="mt-10 divide-y divide-primary-deep/12 border-y border-primary-deep/12">
              <div className="grid gap-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                <dt className="font-sans text-[14px] font-semibold text-primary-deep">The occasion</dt>
                <dd className="font-body text-[15px] leading-6 text-muted-foreground">SITC General Convocation 2026</dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                <dt className="font-sans text-[14px] font-semibold text-primary-deep">The focus</dt>
                <dd className="font-body text-[15px] leading-6 text-muted-foreground">Recognition, community and the next chapter</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="event-moments-title" className="bg-hero px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[790px] text-center">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">A day in three chapters</p>
            <h2 id="event-moments-title" className="mt-5 text-[38px] leading-[1.08] font-semibold tracking-[-0.04em] text-footer sm:text-[50px] lg:text-[58px]">
              From arrival to achievement
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {eventMoments.map((moment, index) => (
              <figure
                key={moment.src}
                className={`${moment.className} group overflow-hidden rounded-[22px] bg-white shadow-[0_16px_45px_rgba(16,24,40,.12)]`}
              >
                <div className={`relative overflow-hidden ${index === 2 ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
                  <Image
                    src={moment.src}
                    alt={moment.alt}
                    fill
                    quality={90}
                    sizes={index === 2 ? "100vw" : "(min-width: 1024px) 58vw, 100vw"}
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>
                <figcaption className="p-6 sm:p-7">
                  <h3 className="text-[22px] font-semibold text-footer">{moment.caption}</h3>
                  <p className="mt-2 font-body text-[15px] leading-7 text-muted-foreground">{moment.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="event-gallery-cta-title" className="bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 rounded-[24px] bg-primary-deep px-7 py-12 text-center text-white shadow-[0_20px_65px_rgba(113,11,192,.2)] sm:px-12 lg:flex-row lg:px-16 lg:py-14 lg:text-left">
          <div className="max-w-[760px]">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-fuchsia-200">The complete collection</p>
            <h2 id="event-gallery-cta-title" className="mt-4 text-[34px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[46px]">
              Continue through every graduation moment
            </h2>
          </div>
          <ActionLink href="/events/#gallery" className="min-w-[210px] bg-white text-primary-deep hover:bg-fuchsia-100">
            <Camera aria-hidden="true" className="size-5" />
            Open Photo Gallery
          </ActionLink>
        </div>
      </section>
    </PageShell>
  );
}
