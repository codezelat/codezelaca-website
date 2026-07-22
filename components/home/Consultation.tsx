import { Brand } from "@/components/home/Brand";
import { ActionLink } from "@/components/ui/ActionLink";
import { whatsappRegistration } from "@/data/home";

export function Consultation() {
  return (
    <section aria-labelledby="consultation-title" className="mt-20 bg-white px-5 py-8 sm:py-10 lg:px-0 lg:py-[10px]">
      <div className="mx-auto flex max-w-[1280px] overflow-hidden rounded-[20px] border border-black/20 bg-white px-6 py-12 shadow-[0_14px_44px_rgba(16,24,40,0.14)] sm:px-10 sm:py-14 lg:min-h-[535px] lg:px-[60px] lg:py-12">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col items-center justify-center text-center">
          <div className="flex min-h-[112px] w-full items-center justify-center sm:min-h-[132px] lg:min-h-[150px]">
            <Brand />
          </div>
          <h2 id="consultation-title" className="mt-7 max-w-[900px] font-sans text-[26px] font-bold leading-[1.2] text-primary-deep sm:text-[28px] lg:mt-5 lg:px-4 lg:py-2.5 lg:leading-[1.15]">
            Want to make sure which path fits you?
          </h2>
          <p className="mt-6 max-w-[1040px] font-sans text-[15px] leading-6 text-muted-foreground sm:text-[16px] lg:mt-5 lg:text-[18px] lg:leading-7">
            Let us walk you through the curriculum, career outcomes, and the exact skills you’ll build so you can decide with clarity. Whether you’re starting fresh or leveling up, we’ll help you choose the track that matches your goals.
          </p>
          <div className="mt-8 flex w-full max-w-[520px] flex-col justify-center gap-3 sm:flex-row sm:gap-5 lg:mt-10">
            <ActionLink href={whatsappRegistration} showArrow className="min-w-[163px]">Register Now</ActionLink>
            <ActionLink href="/contact-us/" variant="outline" className="min-w-[230px]">Book a Free Consultation</ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
