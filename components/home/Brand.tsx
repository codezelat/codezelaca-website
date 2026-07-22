import Image from "next/image";

import { cn } from "@/lib/utils";

interface BrandProps {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}

export function Brand({ inverse = false, compact = false, className }: BrandProps) {
  return (
    <span className={cn("inline-flex items-center", compact ? "gap-2" : "gap-4", className)}>
      <Image
        src="/images/cca/cca-logo-300x300.png"
        alt=""
        aria-hidden="true"
        width={300}
        height={300}
        unoptimized
        className={cn("shrink-0 object-contain", compact ? "size-14" : "size-24")}
      />
      <span className="flex min-w-0 flex-col text-left leading-none">
        <span className={cn("font-sans font-bold", inverse ? "text-[#dc6cff]" : "text-primary-readable", compact ? "text-lg" : "text-4xl lg:text-5xl")}>CodeZela</span>
        <span className={cn("mt-1 font-sans", inverse ? "text-white" : "text-muted-foreground", compact ? "text-sm" : "text-xl lg:text-2xl")}>Career Accelerator</span>
      </span>
    </span>
  );
}
