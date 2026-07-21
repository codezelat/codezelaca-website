import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useSyncExternalStore } from "react";

const getServerSnapshot = () => 0;

export function useCarouselDots(emblaApi: EmblaCarouselType | undefined) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (!emblaApi) return () => undefined;
    emblaApi.on("select", onStoreChange).on("reInit", onStoreChange);
    return () => {
      emblaApi.off("select", onStoreChange).off("reInit", onStoreChange);
    };
  }, [emblaApi]);

  const getSnapshot = useCallback(() => emblaApi?.selectedScrollSnap() ?? 0, [emblaApi]);
  const selectedIndex = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const scrollSnaps = emblaApi?.scrollSnapList() ?? [];

  const onDotClick = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return { selectedIndex, scrollSnaps, onDotClick };
}
