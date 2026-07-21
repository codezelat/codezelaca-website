import { Brand } from "@/components/home/Brand";
import { ActionLink } from "@/components/ui/ActionLink";
import { whatsappRegistration } from "@/data/home";

export function Consultation() {
  return (
    <section aria-labelledby="consultation-title" className="content-visibility-auto mt-20 h-[727px] bg-white px-5 py-[30px] lg:h-[555px] lg:px-0 lg:py-[10px]">
      <div className="relative mx-auto flex h-[667px] max-w-[1280px] overflow-hidden rounded-[20px] border border-[rgba(0,0,0,0.18)] bg-white px-5 shadow-[0_0_10px_rgba(0,0,0,0.5)] lg:h-[535px] lg:px-[60px] lg:py-[60px]">
        <div className="relative z-10 mx-auto h-full w-full max-w-[1160px] text-center lg:flex lg:flex-col lg:items-center lg:justify-start">
          <div className="absolute inset-x-0 top-[11px] flex h-[191px] items-center justify-center lg:static lg:h-[160px] lg:w-full">
            <Brand />
          </div>
          <h2 id="consultation-title" className="absolute top-[232px] left-1/2 w-[235px] -translate-x-1/2 rounded-full bg-white font-sans text-[26px] font-bold leading-[31.2px] text-primary-deep lg:static lg:mt-5 lg:w-auto lg:max-w-[900px] lg:translate-x-0 lg:px-4 lg:py-2.5 lg:text-[28px] lg:leading-[28px]">
            Want to make sure which path fits you?
          </h2>
          <p className="absolute inset-x-0 top-[350px] w-full font-sans text-[15px] leading-6 text-muted-foreground lg:static lg:mt-5 lg:max-w-[1160px] lg:text-[18px] lg:leading-[28px]">
            Let us walk you through the curriculum, career outcomes, and the exact skills you’ll build so you can decide with clarity. Whether you’re starting fresh or leveling up, we’ll help you choose the track that matches your goals.
          </p>
          <div className="absolute inset-x-0 top-[534px] flex w-full flex-col justify-center gap-3 lg:static lg:mt-10 lg:max-w-[480px] lg:flex-row lg:gap-5">
            <ActionLink href={whatsappRegistration} showArrow className="min-w-[163px]">Register Now</ActionLink>
            <ActionLink href="/contact-us/" variant="outline" className="min-w-[230px]">Book a Free Consultation</ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
