import Image from "next/image";

import { cn } from "@/lib/utils";

export function EnglishBrand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap text-[#17125c]">
      <Image
        src="/images/english/cca-wide-logo.png"
        alt=""
        aria-hidden="true"
        width={2038}
        height={678}
        sizes={compact ? "108px" : "(min-width: 640px) 120px, 84px"}
        className={cn("w-auto shrink-0 object-contain", compact ? "h-9" : "h-7 sm:h-10")}
      />
      <span aria-hidden="true" className={cn("mx-2.5 w-px shrink-0 bg-[#d7d1eb]", compact ? "h-6" : "h-5 sm:h-7")} />
      <span className={cn("font-sans font-semibold tracking-[-0.025em]", compact ? "text-[16px]" : "text-[13px] sm:text-[18px]")}>School of English</span>
    </span>
  );
}
