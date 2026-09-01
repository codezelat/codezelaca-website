"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo } from "react";

import { useCarouselDots } from "@/components/carousel/use-carousel-dots";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    src: "/images/english/hero-discussion.webp",
    alt: "Sri Lankan adult learners taking part in an English communication workshop",
    sizes: "(min-width: 1024px) 1500px, (min-width: 640px) 1200px, 550px",
    position: "object-center",
  },
  {
    src: "/images/events/convocation-2026/hero-celebration.webp",
    alt: "CCA graduates in Sri Lanka celebrating together with their graduation scrolls",
    sizes: "(min-width: 1024px) 1100px, (min-width: 640px) 1100px, 480px",
    position: "object-center",
  },
  {
    src: "/images/events/convocation-2026/graduate-ready-portrait.webp",
    alt: "A CCA graduate in Sri Lanka wearing her graduation cap and holding her diploma scroll",
    sizes: "(min-width: 1024px) 760px, (min-width: 640px) calc(100vw - 40px), 380px",
    position: "object-[center_35%]",
  },
] as const;

export function EnglishHeroCarousel() {
  const autoplay = useMemo(
    () => Autoplay({ delay: 6_500, stopOnInteraction: false, stopOnMouseEnter: true }),
    [],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay]);
  const { selectedIndex, scrollSnaps, onDotClick } = useCarouselDots(emblaApi);

  const scrollPrevious = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateAutoplay = () => {
      if (reducedMotion.matches) autoplay.stop();
      else autoplay.play();
    };

    updateAutoplay();
    reducedMotion.addEventListener("change", updateAutoplay);
    return () => reducedMotion.removeEventListener("change", updateAutoplay);
  }, [autoplay, emblaApi]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="CCA English learning and graduate stories"
      className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[#dedaf0] bg-[#f7f4ff] shadow-[0_24px_70px_rgba(43,24,142,.14)] lg:min-h-[620px] lg:aspect-auto"
    >
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${heroSlides.length}`}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                preload={index === 0}
                fetchPriority={index === 0 ? "high" : undefined}
                loading={index === 0 ? undefined : "lazy"}
                quality={90}
                sizes={slide.sizes}
                className={cn("object-cover", slide.position)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex min-h-12 items-center gap-1 rounded-full border border-white/45 bg-[#101546]/78 p-1 text-white shadow-lg backdrop-blur-md sm:bottom-5 sm:right-5">
        <button
          type="button"
          onClick={scrollPrevious}
          aria-label="Previous hero image"
          className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>

        <div className="flex items-center px-1" aria-label="Choose a hero image">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onDotClick(index)}
              aria-label={`Show hero image ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
              className="group inline-flex size-8 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-300",
                  index === selectedIndex ? "w-5 bg-white" : "w-1.5 bg-white/50 group-hover:bg-white/80",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next hero image"
          className="inline-flex size-11 items-center justify-center rounded-full transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
