"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";

import { useCarouselDots } from "@/components/carousel/use-carousel-dots";
import { SectionLabel } from "@/components/home/SectionLabel";
import { ActionLink } from "@/components/ui/ActionLink";
import { programs } from "@/data/home";
import { cn } from "@/lib/utils";

export function ProgramsCarousel() {
  const autoplay = useMemo(() => Autoplay({ delay: 5_000, stopOnInteraction: true, stopOnMouseEnter: true }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 }, [autoplay]);
  const { selectedIndex, scrollSnaps, onDotClick } = useCarouselDots(emblaApi);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) autoplay.stop();
  }, [autoplay]);

  return (
    <section id="programs" aria-labelledby="programs-title" className="content-visibility-auto mt-[79px] h-[903px] bg-white px-5 py-[30px] lg:h-[846px] lg:px-0 lg:py-[20px]">
      <div className="mx-auto flex max-w-[1260px] flex-col items-center">
        <SectionLabel>Our Programs</SectionLabel>
        <h2 id="programs-title" className="mt-[30px] max-w-[1180px] text-center font-sans text-[32px] font-semibold leading-[38.4px] tracking-[-0.02em] text-black lg:text-[42px] lg:leading-[45px]">
          Industry Built Paths That Make You Job Ready
        </h2>

        <div className="mt-[30px] w-full overflow-hidden" ref={emblaRef} aria-roledescription="carousel">
          <div className="flex touch-pan-y gap-[10px]">
            {programs.map((program, index) => (
              <div
                key={program.slug}
                className="flex h-[547px] min-w-0 flex-[0_0_100%] items-center justify-center p-[5px] md:flex-[0_0_calc(50%-5px)] lg:h-[560px] lg:flex-[0_0_calc(33.333333%-6.667px)]"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${programs.length}`}
              >
                <article className="flex h-[535px] w-full flex-col rounded-[20px] border border-black/15 p-[10px] lg:h-[550px]">
                  <div className="relative h-[300px] shrink-0 overflow-hidden rounded-[18px]">
                    <Image src={program.image} alt={program.alt} fill quality={90} sizes="(max-width: 767px) calc(100vw - 70px), (max-width: 1023px) 44vw, 381px" className="object-cover object-center" />
                  </div>
                  <div className="flex min-h-[213px] flex-1 flex-col pt-8 lg:min-h-[228px]">
                    <h3 className="font-sans text-[28px] font-bold leading-[32px] tracking-[-0.03em] text-black">{program.title}</h3>
                    <div className="mt-8 flex flex-wrap gap-[10px]">
                      <span className="rounded-full border border-black/20 px-4 py-2 font-sans text-[14px] font-semibold text-primary-deep">6 Months</span>
                      <span className="rounded-full border border-black/20 px-4 py-2 font-sans text-[14px] font-semibold text-primary-deep">Hybrid &amp; 100% Online</span>
                    </div>
                    <ActionLink href={`https://cca.it.com/programs/${program.slug}/`} className="mt-auto w-fit px-5">Learn More</ActionLink>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[10px] flex min-h-5 items-center justify-center gap-3" aria-label="Choose a program slide">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show program ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
              onClick={() => onDotClick(index)}
              className={cn("size-[6px] rounded-full transition-colors", index === selectedIndex ? "bg-black" : "bg-black/20 hover:bg-primary-bright")}
            />
          ))}
        </div>

        <ActionLink href="/divisions/" variant="deep" className="mt-[18px] min-w-[264px]">Explore All Learning Programs</ActionLink>
      </div>
    </section>
  );
}
