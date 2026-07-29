import { Camera, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EventGallery } from "@/components/events/EventGallery";
import { ActionLink } from "@/components/ui/ActionLink";
import { graduationStoryGallery } from "@/data/events";

import { PageShell } from "./PageShell";

const ceremonyChapters = [
  {
    src: "/images/events/convocation-2026/ceremony-hosts.webp",
    alt: "The convocation hosts speaking from the flower-lined podium",
    title: "The welcome",
    description: "The programme opened with a shared sense of occasion.",
    position: "object-center",
    sizes: "(min-width: 1280px) 413px, (min-width: 1024px) 32vw, calc(100vw - 40px)",
  },
  {
    src: "/images/events/convocation-2026/auditorium-community.webp",
    alt: "Graduates and guests seated together inside the auditorium",
    title: "The gathering",
    description: "Graduates, families and guests filled the auditorium together.",
    position: "object-center",
    sizes: "(min-width: 1280px) 800px, (min-width: 1024px) 55vw, 100vw",
  },
  {
    src: "/images/events/convocation-2026/convocation-identity.webp",
    alt: "The SITC General Convocation 2026 stage during a graduate presentation",
    title: "The recognition",
    description: "Every presentation made the achievement visible.",
    position: "object-center",
    sizes: "(min-width: 1280px) 413px, (min-width: 1024px) 32vw, calc(100vw - 40px)",
  },
] as const;

export function GraduationEventPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-hero px-5 pt-[170px] pb-20 lg:pt-[190px] lg:pb-24">
        <div aria-hidden="true" className="absolute -top-28 -right-24 -z-10 size-[380px] rounded-full bg-primary-bright/8 blur-3xl" />
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-7 font-body text-[13px] text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" prefetch={false} className="transition hover:text-primary-bright">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/events/" className="transition hover:text-primary-bright">
                    Events
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-primary-deep">Graduation 2026</li>
              </ol>
            </nav>

            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">
              2026 Graduation Event Story
            </p>
            <h1 className="mt-5 max-w-[720px] text-[42px] leading-[1.05] font-semibold tracking-[-0.045em] text-footer sm:text-[58px] lg:text-[64px]">
              A proud chapter, celebrated together
            </h1>
            <p className="mt-7 max-w-[650px] font-body text-[16px] leading-7 text-muted-foreground sm:text-[18px] sm:leading-8">
              CCA graduates joined the SITC General Convocation 2026 to recognise the work behind their achievement and the possibilities waiting beyond it.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="#photo-story" showArrow className="min-w-[190px]">
                Explore the Photo Story
              </ActionLink>
              <ActionLink href="/events/" variant="outline" className="min-w-[190px]">
                Back to Events
              </ActionLink>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-[28px_120px_28px_28px] bg-footer shadow-[0_24px_70px_rgba(113,11,192,.18)]">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:min-h-[610px] lg:aspect-auto">
              <Image
                src="/images/events/convocation-2026/graduate-friends.webp"
                alt="A group of graduates celebrating together with their graduation scrolls"
                fill
                priority
                quality={90}
                sizes="(min-width: 1280px) 920px, (min-width: 1024px) 70vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-footer/76 px-4 py-2 font-body text-[13px] font-medium text-white backdrop-blur-sm sm:text-[14px]">
              <Sparkles aria-hidden="true" className="size-4 text-fuchsia-300" />
              The graduating community
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="event-story-title" className="bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid items-end gap-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
            <div>
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">The event story</p>
              <h2 id="event-story-title" className="mt-5 text-[36px] leading-[1.08] font-semibold tracking-[-0.04em] text-footer sm:text-[48px] lg:text-[56px]">
                The day began before the doors opened
              </h2>
            </div>
            <div className="space-y-4 font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">
              <p>
                Before the formal procession, graduates and guests arrived with anticipation, collected their academic dress and found the people who had shared the journey.
              </p>
              <p>
                Those quieter moments gave the ceremony its meaning: preparation becoming presence, and years of work becoming something everyone could celebrate together.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:items-end">
            <figure className="group relative min-h-[430px] overflow-hidden rounded-[24px_90px_24px_24px] bg-footer shadow-[0_18px_55px_rgba(16,24,40,.14)] sm:min-h-[560px] lg:col-span-8 lg:min-h-[650px]">
              <Image
                src="/images/events/convocation-2026/guest-arrivals.webp"
                alt="Graduates and guests gathering before the convocation ceremony"
                fill
                quality={90}
                sizes="(min-width: 1280px) 1000px, (min-width: 1024px) 75vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
              />
              <figcaption className="absolute right-5 bottom-5 left-5 z-10 font-sans text-[18px] font-semibold text-white drop-shadow-lg sm:text-[22px]">
                Arrival, preparation and anticipation
              </figcaption>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-[linear-gradient(to_top,rgba(16,24,40,.72),transparent)]" />
            </figure>

            <figure className="group relative min-h-[500px] overflow-hidden rounded-[90px_24px_24px_24px] bg-footer shadow-[0_18px_55px_rgba(16,24,40,.14)] sm:min-h-[620px] lg:col-span-4 lg:min-h-[560px]">
              <Image
                src="/images/events/convocation-2026/academic-portrait.webp"
                alt="A graduate in academic dress photographed with international flags"
                fill
                quality={90}
                sizes="(min-width: 1280px) 417px, (min-width: 1024px) 32vw, calc(100vw - 40px)"
                className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.02]"
              />
              <figcaption className="absolute right-5 bottom-5 left-5 z-10 font-sans text-[18px] font-semibold text-white drop-shadow-lg sm:text-[22px]">
                Ready for the ceremony
              </figcaption>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-[linear-gradient(to_top,rgba(16,24,40,.72),transparent)]" />
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="ceremony-chapters-title" className="bg-hero px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[820px] text-center">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">Inside the ceremony</p>
            <h2 id="ceremony-chapters-title" className="mt-5 text-[38px] leading-[1.08] font-semibold tracking-[-0.04em] text-footer sm:text-[50px] lg:text-[58px]">
              One occasion, seen from every side
            </h2>
            <p className="mx-auto mt-6 max-w-[690px] font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">
              The welcome, the gathered community and the formal recognition each carried a different part of the day.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {ceremonyChapters.map((chapter, index) => (
              <figure
                key={chapter.src}
                className={`group overflow-hidden rounded-[22px] bg-white shadow-[0_16px_45px_rgba(16,24,40,.12)] ${index === 1 ? "lg:mt-12" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={chapter.src}
                    alt={chapter.alt}
                    fill
                    quality={90}
                    sizes={chapter.sizes}
                    className={`object-cover ${chapter.position} transition duration-700 ease-out group-hover:scale-[1.025]`}
                  />
                </div>
                <figcaption className="p-6 sm:p-7">
                  <h3 className="text-[22px] font-semibold text-footer">{chapter.title}</h3>
                  <p className="mt-2 font-body text-[15px] leading-7 text-muted-foreground">{chapter.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="photo-story" aria-labelledby="photo-story-title" className="scroll-mt-32 bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[800px]">
              <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-primary-deep">The complete photo story</p>
              <h2 id="photo-story-title" className="mt-5 text-[38px] leading-[1.08] font-semibold tracking-[-0.04em] text-footer sm:text-[50px] lg:text-[58px]">
                More moments from the 2026 graduating class
              </h2>
            </div>
            <p className="max-w-[390px] font-body text-[15px] leading-7 text-muted-foreground lg:pb-1 lg:text-[16px]">
              A separate collection of portraits, ceremony details and celebrations from the day. Select any photograph to view it in full.
            </p>
          </div>

          <div className="mt-12">
            <EventGallery photos={graduationStoryGallery} />
          </div>
        </div>
      </section>

      <section aria-labelledby="event-gallery-cta-title" className="bg-white px-5 pt-4 pb-20 lg:pt-8 lg:pb-28">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 overflow-hidden rounded-[24px] bg-primary-deep px-7 py-12 text-center text-white shadow-[0_20px_65px_rgba(113,11,192,.2)] sm:px-12 lg:flex-row lg:px-16 lg:py-14 lg:text-left">
          <div className="max-w-[760px]">
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.2em] text-fuchsia-200">Events &amp; moments</p>
            <h2 id="event-gallery-cta-title" className="mt-4 text-[34px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[46px]">
              Return to the full graduation celebration
            </h2>
          </div>
          <ActionLink href="/events/#gallery" className="min-w-[210px] bg-white text-primary-deep hover:bg-fuchsia-100">
            <Camera aria-hidden="true" className="size-5" />
            View Events Gallery
          </ActionLink>
        </div>
      </section>
    </PageShell>
  );
}
