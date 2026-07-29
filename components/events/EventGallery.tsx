"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { EventPhoto } from "@/data/events";
import { cn } from "@/lib/utils";

const desktopLayouts = [
  "lg:col-span-7 lg:min-h-[560px]",
  "lg:col-span-5 lg:min-h-[560px]",
  "lg:col-span-5 lg:min-h-[380px]",
  "lg:col-span-7 lg:min-h-[380px]",
  "lg:col-span-4 lg:min-h-[380px]",
  "lg:col-span-4 lg:min-h-[380px]",
  "lg:col-span-4 lg:min-h-[380px]",
  "lg:col-span-6 lg:min-h-[420px]",
  "lg:col-span-6 lg:min-h-[420px]",
  "lg:col-span-4 lg:min-h-[380px]",
  "lg:col-span-4 lg:min-h-[380px]",
  "lg:col-span-4 lg:min-h-[380px]",
] as const;

export function EventGallery({ photos }: { photos: EventPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const showPhoto = useCallback((index: number) => {
    setActiveIndex((index + photos.length) % photos.length);
  }, [photos.length]);

  const openPhoto = (index: number) => {
    setActiveIndex(index);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  };

  const closeGallery = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") showPhoto(activeIndex - 1);
      if (event.key === "ArrowRight") showPhoto(activeIndex + 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, showPhoto]);

  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  return (
    <>
      <div className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Open photo ${index + 1}: ${photo.caption}`}
            onClick={() => openPhoto(index)}
            className={cn(
              "group relative isolate min-h-[310px] overflow-hidden rounded-[20px] bg-footer text-left shadow-[0_12px_34px_rgba(16,24,40,.12)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(16,24,40,.2)] focus-visible:-translate-y-1 sm:min-h-[360px]",
              photo.layout === "portrait" && "sm:min-h-[500px]",
              desktopLayouts[index] ?? "lg:col-span-4 lg:min-h-[380px]",
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 60vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
            />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(16,24,40,.82),transparent)]" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
              <span className="font-sans text-[16px] font-semibold leading-6 sm:text-[18px]">{photo.caption}</span>
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/14 backdrop-blur-sm transition group-hover:bg-white group-hover:text-primary-deep">
                <Expand aria-hidden="true" className="size-4" />
              </span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="event-gallery-caption"
        onClose={() => setActiveIndex(null)}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-black/92"
      >
        {activePhoto ? (
          <div className="relative flex h-full w-full flex-col items-center justify-center px-4 py-20 sm:px-16">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close photo gallery"
              onClick={closeGallery}
              className="absolute top-5 right-5 z-10 inline-flex size-12 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white transition hover:rotate-6 hover:bg-white hover:text-footer sm:top-8 sm:right-8"
            >
              <X aria-hidden="true" className="size-6" />
            </button>

            <div className="flex min-h-0 w-full flex-1 items-center justify-center">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                width={activePhoto.width}
                height={activePhoto.height}
                quality={90}
                sizes="100vw"
                className="max-h-[calc(100dvh-150px)] w-auto max-w-full rounded-[14px] object-contain shadow-2xl"
              />
            </div>

            <div className="mt-5 flex w-full max-w-[1000px] items-center justify-between gap-4">
              <button
                type="button"
                aria-label="Show previous photo"
                onClick={() => showPhoto(activeIndex! - 1)}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white hover:text-footer"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <p id="event-gallery-caption" className="text-center font-body text-[14px] leading-6 text-white/90 sm:text-[16px]">
                <span className="font-semibold text-white">{activePhoto.caption}</span>
                <span className="mt-0.5 block text-white/60">{activeIndex! + 1} of {photos.length}</span>
              </p>
              <button
                type="button"
                aria-label="Show next photo"
                onClick={() => showPhoto(activeIndex! + 1)}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white hover:text-footer"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
