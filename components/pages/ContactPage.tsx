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

      <section aria-labelledby="consultation-form-title" className="bg-white pb-20 pt-16 lg:pb-24">
        <div className="w-full bg-white">
          <p className="font-sans text-[28px] leading-[1.05] font-semibold text-black lg:text-[32px]">Need a Free Consultation?</p>
          <h2 id="consultation-form-title" className="text-[25px] leading-[1.05] font-semibold tracking-[-0.02em] text-black lg:text-[28px]">
            Our Mentors will help you choose the right path
          </h2>
          <p className="font-sans text-[22px] leading-[1.05] font-semibold tracking-[-0.02em] text-black lg:text-[26px]">
            Share your details and a mentor will contact you for a free consultation on the best track and next steps
          </p>
          <ConsultationForm />
        </div>
      </section>
    </PageShell>
  );
}
