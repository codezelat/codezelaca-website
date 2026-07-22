import { CircleArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ActionLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "deep";
  showArrow?: boolean;
  className?: string;
}

export function ActionLink({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className,
}: ActionLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-14 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-5 font-sans text-[15px] font-medium transition duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5",
        variant === "primary" && "bg-primary text-white hover:bg-primary-bright",
        variant === "outline" && "border border-primary-bright bg-white text-primary-bright hover:bg-primary-bright hover:text-white",
        variant === "deep" && "bg-primary-deep text-white hover:bg-primary-bright",
        className,
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
      {showArrow ? <CircleArrowRight aria-hidden="true" className="size-4 fill-white text-primary" /> : null}
    </a>
  );
}
