import Image from "next/image";

import { Consultation } from "@/components/home/Consultation";
import { Differences } from "@/components/home/Differences";
import { RecognitionCarousel } from "@/components/home/RecognitionCarousel";

import { InnerHero } from "./InnerHero";
import { MetricsBand } from "./MetricsBand";
import { PageShell } from "./PageShell";

interface EditorialSectionProps {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

function EditorialSection({ title, paragraphs, image, imageAlt, reverse = false }: EditorialSectionProps) {
  return (
    <section aria-labelledby={`${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-title`} className="bg-white px-5 py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={reverse ? "lg:order-2" : undefined}>
          <h2 id={`${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-title`} className="text-[34px] leading-[1.12] font-semibold tracking-[-0.03em] text-black lg:text-[52px]">
            {title}
          </h2>
          <div className="mt-7 space-y-6">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={`relative aspect-[4/3] overflow-hidden rounded-[24px_120px_24px_24px] lg:h-[570px] lg:aspect-auto ${reverse ? "lg:order-1 lg:rounded-[120px_24px_24px_24px]" : ""}`}>
          <Image src={image} alt={imageAlt} fill quality={90} sizes="(min-width: 1024px) 600px, calc(100vw - 40px)" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <PageShell>
      <InnerHero
        eyebrow="About Us"
        title="where your potential becomes your profession"
        description="Codezela Career Accelerator is the education programme built for one purpose: turning beginners into job-ready professionals with the skills, confidence and experience employers actually want."
        actions={[
          { label: "Contact Us Now", href: "/contact-us/" },
          { label: "View Available Pathways", href: "/divisions/", variant: "outline" },
        ]}
      />

      <EditorialSection
        title="Who Are We?"
        paragraphs={[
          "Codezela Technologies, located in Western, Sri Lanka, is a leading computer software company with a diverse global client base. Specializing in web design, development, graphic design, and digital marketing, our highly qualified team, certified by international companies, delivers tailored solutions.",
          "At Codezela Technologies, we are driven by a passion for innovation and excellence. Our team thrives on creating solutions that empower businesses to succeed in today’s competitive digital world. With expertise across industries like healthcare, finance, e-commerce, and education, we understand the unique challenges of each sector and craft strategies to overcome them. Our commitment to quality ensures every project is handled with precision, creativity, and professionalism.",
        ]}
        image="/images/cca/man-using-tablet-work-connect-with-others-1536x1025.jpeg"
        imageAlt="Codezela professionals collaborating"
      />

      <EditorialSection
        title="What is CCA?"
        paragraphs={[
          "Codezela Technologies is a UK-based technology company operating across the EU, UAE, Australia and Sri Lanka, with teams working for clients in the US, UK, Canada, Australia, New Zealand, countries in Europe and more.",
          "The CodeZela Career Accelerator is our education arm, created to fix a simple but painful truth: too many students study for years yet never gain the skills required for real industry work. We built a programme that closes that gap.",
        ]}
        image="/images/cca/night-programmer-man-office-typing-overlay-interface-keyboard-software-dark-dashboard-coder-agency-information-technology-ideas-programming-data-web-1024x686.jpg"
        imageAlt="Technology professional working with software systems"
        reverse
      />

      <Differences heading="What Makes Us Different" />

      <section aria-labelledby="promise-title" className="bg-white px-5 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <h2 id="promise-title" className="text-[34px] leading-[1.12] font-semibold tracking-[-0.03em] text-black lg:text-[52px]">What We Promise?</h2>
            <p className="mt-7 font-body text-[16px] leading-7 text-muted-foreground lg:text-[18px] lg:leading-8">
              We prepare you for jobs that exist right now. We cut out the outdated theory and replace it with real industry skills, modern workflows and a portfolio employers can trust. Every graduate walks away with confidence, capability and a clear path forward.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <article className="rounded-[22px] border border-black/15 bg-hero p-7">
                <h3 className="text-[24px] font-semibold text-primary-deep">Vision</h3>
                <p className="mt-4 font-body text-[15px] leading-7 text-muted-foreground">To empower Sri Lankan students to build global careers through industry-standard training, academic recognition and verified work experience.</p>
              </article>
              <article className="rounded-[22px] border border-black/15 bg-hero p-7">
                <h3 className="text-[24px] font-semibold text-primary-deep">Mission</h3>
                <p className="mt-4 font-body text-[15px] leading-7 text-muted-foreground">A future where Sri Lankan talent competes confidently on the world stage.</p>
              </article>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[120px_24px_24px_24px] lg:h-[600px] lg:aspect-auto">
            <Image src="/images/cca/happy-smiling-man-working-with-laptop2-1536x1024.jpg" alt="Learner confidently building a technology career" fill quality={90} sizes="(min-width: 1024px) 550px, calc(100vw - 40px)" className="object-cover" />
          </div>
        </div>
      </section>

      <MetricsBand />
      <RecognitionCarousel />
      <Consultation />
    </PageShell>
  );
}

