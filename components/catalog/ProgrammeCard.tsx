import { Clock3, Laptop2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { ProgrammeCatalogEntry } from "@/types/catalog";

export function ProgrammeCard({ programme }: { programme: ProgrammeCatalogEntry }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-black/10 bg-white p-[10px] shadow-[0_12px_40px_rgba(22,14,34,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(113,11,192,.14)]">
      <Link href={`/programs/${programme.slug}/`} className="relative block aspect-[4/3] overflow-hidden rounded-[17px] bg-hero">
        <Image
          src={programme.image}
          alt={programme.imageAlt}
          fill
          quality={90}
          sizes="(max-width: 767px) calc(100vw - 60px), (max-width: 1199px) 45vw, 360px"
          className="object-cover object-center transition duration-500 group-hover:scale-[1.035]"
        />
      </Link>
      <div className="flex flex-1 flex-col px-3 pb-4 pt-6 sm:px-4">
        <h2 className="font-sans text-[24px] font-bold leading-[1.15] tracking-[-0.03em] text-black sm:text-[27px]">
          <Link href={`/programs/${programme.slug}/`} className="transition-colors hover:text-primary-bright">
            {programme.title}
          </Link>
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 font-sans text-[12px] font-semibold text-primary-deep">
            <Clock3 aria-hidden="true" className="size-4" />6 Months
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 font-sans text-[12px] font-semibold text-primary-deep">
            <Laptop2 aria-hidden="true" className="size-4" />Hybrid &amp; Online
          </span>
        </div>
        <Link
          href={`/programs/${programme.slug}/`}
          className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-[10px] bg-primary px-5 font-sans text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-bright"
        >
          Learn More
        </Link>
      </div>
    </article>
  );
}
