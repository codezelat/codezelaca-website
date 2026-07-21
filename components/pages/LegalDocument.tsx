import type { LegalSection } from "@/types/pages";

import { InnerHero } from "./InnerHero";
import { PageShell } from "./PageShell";

interface LegalDocumentProps {
  label: string;
  title: string;
  updatedAt: string;
  sections: LegalSection[];
}

export function LegalDocument({ label, title, updatedAt, sections }: LegalDocumentProps) {
  return (
    <PageShell>
      <InnerHero eyebrow={label} title={title} variant="legal" />

      <article className="relative overflow-hidden bg-white px-5 pb-28 pt-8 lg:pb-40 lg:pt-16">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[44%] aspect-square w-[1300px] -translate-x-1/2 rounded-full bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_95px,rgba(192,38,211,.04)_96px,rgba(192,38,211,.04)_97px)]" />
        <div className="relative mx-auto max-w-[1160px] space-y-5">
          <p className="font-body text-[15px] leading-6 text-muted-foreground lg:text-[16px]">
            <strong>Last Updated:</strong> {updatedAt}
          </p>
          {sections.map((section) => (
            <section key={section.title} aria-labelledby={`legal-${section.title.split(".")[0]}`}>
              <h2 id={`legal-${section.title.split(".")[0]}`} className="text-[20px] leading-7 font-semibold text-black lg:text-[24px]">
                {section.title}
              </h2>
              <div className="mt-2 space-y-3 font-body text-[15px] leading-7 text-muted-foreground lg:text-[16px] lg:leading-[25px]">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul className="ml-5 list-disc space-y-2 pl-3">
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}

          <p className="font-body text-[15px] leading-7 text-muted-foreground lg:text-[16px] lg:leading-[25px]">
            Email: <a href="mailto:ca@codezela.com" className="font-semibold text-primary-deep underline decoration-primary-bright/40 underline-offset-4 transition hover:text-primary-bright">ca@codezela.com</a>
          </p>
        </div>
      </article>
    </PageShell>
  );
}
