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

      <article className="bg-white px-5 pb-28 pt-14 sm:px-8 lg:pb-40 lg:pt-24">
        <div className="mx-auto max-w-[820px]">
          <div className="border-b border-black/10 pb-8">
            <p className="font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Last updated <span className="ml-1 normal-case tracking-normal text-black">{updatedAt}</span>
            </p>
          </div>

          <div className="mt-12 space-y-12 lg:mt-16 lg:space-y-16">
            {sections.map((section) => (
              <section key={section.title} aria-labelledby={`legal-${section.title.split(".")[0]}`}>
                <h2 id={`legal-${section.title.split(".")[0]}`} className="text-[21px] leading-8 font-semibold tracking-[-0.015em] text-black lg:text-[25px]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 font-body text-[15px] leading-7 text-muted-foreground sm:text-[16px] sm:leading-8">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets ? (
                    <ul className="list-disc space-y-3 pl-6 marker:text-primary-bright">
                      {section.bullets.map((bullet) => <li key={bullet} className="pl-1">{bullet}</li>)}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <aside aria-label="Policy contact" className="mt-16 border-t border-black/10 pt-8 lg:mt-20">
            <p className="font-body text-[15px] leading-7 text-muted-foreground sm:text-[16px] sm:leading-8">
              Questions about this document? Email <a href="mailto:ca@codezela.com" className="font-semibold text-primary-deep underline decoration-primary-bright/40 underline-offset-4 transition hover:text-primary-bright">ca@codezela.com</a>.
            </p>
          </aside>
        </div>
      </article>
    </PageShell>
  );
}
