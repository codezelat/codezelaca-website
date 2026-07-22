import { BadgeCheck, Clock3, Mail, MessageCircle } from "lucide-react";

import { ConsultationForm } from "./ConsultationForm";
import { InnerHero } from "./InnerHero";
import { PageShell } from "./PageShell";

export function ContactPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="Contact Us"
        title="Your journey to a global career begins here"
        description="Whether you are exploring options, ready to apply, or simply want clarity, our support team and programme advisors are here to help. We make the process simple, friendly and transparent so you can focus on what truly matters: building the skills and confidence for the career you want."
        actions={[
          { label: "WhatsApp Us Now", href: "https://wa.me/94766772923" },
          { label: "Email Us Now", href: "mailto:ca@codezela.com", variant: "outline" },
        ]}
      />

      <section aria-labelledby="consultation-form-title" className="bg-[#fbf9fc] px-5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] items-start gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
          <div className="lg:sticky lg:top-36">
            <span className="inline-flex min-h-10 items-center rounded-full border border-primary-bright/30 bg-white px-5 font-sans text-[14px] font-semibold text-primary-deep shadow-sm">
              Free Career Consultation
            </span>
            <h2 id="consultation-form-title" className="mt-7 max-w-[560px] font-sans text-[36px] font-semibold leading-[1.12] tracking-[-0.04em] text-black sm:text-[46px] lg:text-[52px]">
              Choose your next step with clarity
            </h2>
            <p className="mt-6 max-w-[560px] font-body text-[16px] leading-7 text-muted-foreground lg:text-[17px] lg:leading-8">
              Tell us where you are now and what you want to achieve. A programme advisor will help you compare suitable tracks, understand the learning format and prepare for the August 2026 cohort.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href="https://wa.me/94766772923" target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-[18px] border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-bright/40 hover:shadow-md">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f5e8ff] text-primary-deep"><MessageCircle aria-hidden="true" className="size-5" /></span>
                <span><span className="block font-sans text-[13px] font-semibold text-muted-foreground">WhatsApp admissions</span><span className="mt-1 block font-sans text-[16px] font-semibold text-black group-hover:text-primary-deep">+94 76 677 2923</span></span>
              </a>
              <a href="mailto:ca@codezela.com" className="group flex items-center gap-4 rounded-[18px] border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-bright/40 hover:shadow-md">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f5e8ff] text-primary-deep"><Mail aria-hidden="true" className="size-5" /></span>
                <span><span className="block font-sans text-[13px] font-semibold text-muted-foreground">Email our team</span><span className="mt-1 block font-sans text-[16px] font-semibold text-black group-hover:text-primary-deep">ca@codezela.com</span></span>
              </a>
            </div>

            <ul className="mt-9 space-y-4 rounded-[20px] border border-primary-bright/15 bg-hero p-6 font-body text-[14px] leading-6 text-muted-foreground">
              <li className="flex items-start gap-3"><BadgeCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary-bright" />Advice based on your goals, experience and preferred pathway.</li>
              <li className="flex items-start gap-3"><Clock3 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary-bright" />Choose a morning, afternoon or evening consultation time.</li>
            </ul>
          </div>

          <div className="rounded-[26px] border border-black/10 bg-white p-5 shadow-[0_22px_70px_rgba(35,18,52,.11)] sm:p-8 lg:p-10">
            <p className="font-sans text-[14px] font-semibold uppercase tracking-[.15em] text-primary-readable">Request a callback</p>
            <h3 className="mt-3 font-sans text-[28px] font-semibold tracking-[-0.03em] text-black sm:text-[34px]">Speak with a programme advisor</h3>
            <p className="mt-3 font-body text-[14px] leading-6 text-muted-foreground">Complete the form and your details will open securely in WhatsApp for you to review and send.</p>
            <ConsultationForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
