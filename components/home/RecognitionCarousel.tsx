"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";

import { useCarouselDots } from "@/components/carousel/use-carousel-dots";
import { SectionLabel } from "@/components/home/SectionLabel";
import { recognitions } from "@/data/home";
import { cn } from "@/lib/utils";

const recognitionSlides = [0, 1].flatMap((copy) =>
  recognitions.map((recognition, originalIndex) => ({
    ...recognition,
    copy,
    originalIndex,
  })),
);

export function RecognitionCarousel() {
  const autoplay = useMemo(() => Autoplay({ delay: 2_000, stopOnInteraction: true, stopOnMouseEnter: true }), []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", containScroll: false, slidesToScroll: 1 }, [autoplay]);
  const { selectedIndex, onDotClick } = useCarouselDots(emblaApi);
  const activeRecognition = selectedIndex % recognitions.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) autoplay.stop();
  }, [autoplay]);

  return (
    <section aria-labelledby="recognition-title" className="content-visibility-auto mt-[60px] h-[371px] bg-white px-5 py-5 lg:mt-20 lg:h-[321px] lg:px-0">
      <div className="mx-auto flex max-w-[1260px] flex-col items-center">
        <SectionLabel>Why Trust?</SectionLabel>
        <h2 id="recognition-title" className="mt-[30px] max-w-[1180px] text-center font-sans text-[32px] font-semibold leading-[38.4px] tracking-[-0.02em] text-black lg:text-[42px] lg:leading-[45px]">
          Official Recognition That Gives You Credibility
        </h2>

        <div className="mt-6 w-full overflow-hidden" ref={emblaRef} aria-roledescription="carousel">
          <div className="flex touch-pan-y gap-[30px]">
            {recognitionSlides.map((recognition) => (
              <div
                key={`${recognition.name}-${recognition.copy}`}
                className="flex h-[105px] min-w-0 flex-[0_0_calc(50%-15px)] items-center justify-center px-2 md:flex-[0_0_calc(33.333333%-20px)] lg:flex-[0_0_calc(20%-24px)]"
                aria-roledescription="slide"
                aria-label={recognition.copy === 0 ? `${recognition.originalIndex + 1} of ${recognitions.length}: ${recognition.name}` : undefined}
                aria-hidden={recognition.copy === 1 ? "true" : undefined}
              >
                <Image
                  src={recognition.image}
                  alt={recognition.name}
                  width={recognition.width}
                  height={recognition.height}
                  unoptimized
                  sizes="(max-width: 767px) 42vw, (max-width: 1023px) 27vw, 220px"
                  className="max-h-[90px] w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 flex min-h-5 items-center justify-center gap-4" aria-label="Choose a recognition logo">
          {recognitions.map((recognition, index) => (
            <button
              key={recognition.name}
              type="button"
              aria-label={`Show recognition ${index + 1}`}
              aria-current={index === activeRecognition ? "true" : undefined}
              onClick={() => onDotClick(index)}
              className={cn("size-[7px] rounded-full transition-colors", index === activeRecognition ? "bg-primary-deep" : "bg-black hover:bg-primary-bright")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
