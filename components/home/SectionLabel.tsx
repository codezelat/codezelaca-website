import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex min-h-10 items-center rounded-full border border-black/20 bg-white px-4 font-sans text-[18px] font-bold leading-[18px] text-primary-deep", className)}>
      {children}
    </span>
  );
}
