import { ActionLink } from "@/components/ui/ActionLink";
import { cn } from "@/lib/utils";
import type { PageAction } from "@/types/pages";

interface InnerHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: PageAction[];
  anchorLinks?: { label: string; href: string }[];
  updatedAt?: string;
  variant?: "marketing" | "legal";
}

export function InnerHero({
  eyebrow,
  title,
  description,
  actions = [],
  anchorLinks = [],
  updatedAt,
  variant = "marketing",
}: InnerHeroProps) {
  const legal = variant === "legal";

  return (
    <section
      aria-labelledby="inner-page-title"
      className={cn(
        "relative isolate overflow-hidden bg-white px-5",
        legal ? "min-h-[510px] pb-16 pt-[170px] lg:min-h-[570px] lg:pt-[205px]" : "min-h-[820px] pb-20 pt-[180px] lg:min-h-[930px] lg:pt-[225px]",
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className={cn(
            "absolute left-1/2 top-[54%] hidden aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full sm:block",
            legal ? "w-[1040px] opacity-0 lg:w-[1280px]" : "w-[1040px] opacity-85 lg:w-[1500px]",
          )}
          style={{
            background:
              "repeating-radial-gradient(circle at center, transparent 0, transparent 78px, rgba(192,38,211,.055) 79px, rgba(192,38,211,.055) 80px)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_center,rgba(253,242,248,.72),transparent_58%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
        <p className="inline-flex min-h-10 items-center rounded-full border border-black/20 bg-white px-5 font-sans text-[17px] font-bold leading-5 text-primary-deep shadow-[0_2px_8px_rgba(0,0,0,.06)]">
          {eyebrow}
        </p>

        <h1
          id="inner-page-title"
          className={cn(
            "font-sans font-semibold tracking-[-0.035em]",
            legal
              ? "mt-10 max-w-[1000px] text-[40px] leading-[1.08] text-[#710bc0] sm:text-[52px] lg:text-[62px]"
              : "mt-10 max-w-[1050px] bg-gradient-to-r from-[#710bc0] via-[#a712df] to-[#cb00f8] bg-clip-text text-[42px] leading-[1.08] text-transparent sm:text-[58px] lg:text-[76px]",
          )}
        >
          {title}
        </h1>

        {description ? (
          <p className="mt-8 max-w-[980px] font-body text-[16px] leading-7 text-muted-foreground sm:text-[17px] lg:text-[19px] lg:leading-8">
            {description}
          </p>
        ) : null}

        {updatedAt ? <span className="sr-only">Last Updated: {updatedAt}</span> : null}

        {actions.length ? (
          <div className="mt-10 flex w-full max-w-[520px] flex-col justify-center gap-4 sm:flex-row">
            {actions.map((action) => (
              <ActionLink
                key={action.label}
                href={action.href}
                variant={action.variant}
                showArrow={action.variant !== "outline"}
                className="min-w-[210px]"
              >
                {action.label}
              </ActionLink>
            ))}
          </div>
        ) : null}

        {anchorLinks.length ? (
          <nav aria-label="Division sections" className="mt-12 w-full">
            <ul className="flex flex-wrap justify-center gap-3">
              {anchorLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-full border border-primary-bright/35 bg-white px-5 font-sans text-[14px] font-semibold text-primary-deep shadow-sm transition hover:border-primary-bright hover:bg-primary-bright hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
