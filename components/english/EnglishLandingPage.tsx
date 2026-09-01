import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Laptop2,
  MessageCircleMore,
  MessagesSquare,
  PenLine,
  Presentation,
  Speech,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";

import { EnglishFooter } from "@/components/english/EnglishFooter";
import { EnglishHeader } from "@/components/english/EnglishHeader";
import { EnglishJourney } from "@/components/english/EnglishJourney";
import { englishAdmissionsUrl, englishFaqs, englishOutcomes } from "@/data/english";

const outcomeIcons = {
  message: MessageCircleMore,
  write: PenLine,
  present: Presentation,
  work: BriefcaseBusiness,
} as const;

const audiences = [
  [BookOpenCheck, "School leavers"],
  [BookOpenCheck, "University students"],
  [BriefcaseBusiness, "Early-career professionals"],
  [UserRoundCheck, "Adults building confidence"],
] as const;

const learningFormat = [
  [Laptop2, "100% Online", "Study from anywhere with your lessons, activities and guidance in one place."],
  [Speech, "Live guided learning", "Join interactive sessions and practise with tutors and fellow learners."],
  [CheckCircle2, "Practice-based assessment", "Apply your English through useful speaking, writing and presentation tasks."],
  [MessagesSquare, "Tutor feedback", "Receive clear, personal guidance to help you improve and progress."],
] as const;

function AdmissionsLink({ children, outline = false }: { children: React.ReactNode; outline?: boolean }) {
  return (
    <a
      href={englishAdmissionsUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-[10px] px-6 font-sans text-[15px] font-semibold transition hover:-translate-y-0.5 ${outline ? "border border-[#3216b8] bg-white text-[#3216b8] hover:bg-[#f4f1ff]" : "bg-[#3216b8] text-white hover:bg-[#4a28d6]"}`}
    >
      {children}<ArrowRight aria-hidden="true" className="size-4" />
    </a>
  );
}

export function EnglishLandingPage() {
  return (
    <>
      <EnglishHeader />
      <main className="overflow-hidden bg-white text-[#15123f]">
        <section aria-labelledby="english-hero-title" className="relative px-5 pb-20 pt-[135px] sm:pt-[150px] lg:min-h-[940px] lg:pb-24 lg:pt-[160px]">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-0 h-[210px] bg-[#f7f4ff] [clip-path:ellipse(85%_58%_at_50%_100%)]" />
          <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
            <div>
              <h1 id="english-hero-title" className="max-w-[680px] text-balance font-sans text-[46px] font-semibold leading-[1.04] tracking-[-0.055em] text-[#17125c] sm:text-[62px] lg:text-[76px] xl:text-[84px]">
                English that moves your future <span className="text-[#3216b8]">forward.</span>
              </h1>
              <p className="mt-7 max-w-[620px] font-body text-[17px] leading-8 text-[#5f5b78] lg:text-[19px]">
                A practical Diploma in English designed to help you communicate clearly, study confidently, and step into professional life.
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <AdmissionsLink>Talk to Admissions</AdmissionsLink>
                <a href="#the-diploma" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[10px] border border-[#3216b8] bg-white px-6 font-sans text-[15px] font-semibold text-[#3216b8] transition hover:-translate-y-0.5 hover:bg-[#f4f1ff]">
                  Explore the Diploma <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-[#dedaf0] bg-[#f7f4ff] shadow-[0_24px_70px_rgba(43,24,142,.14)] lg:min-h-[620px] lg:aspect-auto">
              <Image src="/images/english/hero-discussion.webp" alt="Sri Lankan adult learners taking part in an English communication workshop" fill priority quality={90} sizes="(min-width: 1024px) 1500px, (min-width: 640px) 1450px, 620px" className="object-cover object-center" />
            </div>
          </div>
        </section>

        <section id="the-diploma" aria-labelledby="diploma-title" className="scroll-mt-28 bg-[#f7f4ff] px-5 py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h2 id="diploma-title" className="max-w-[520px] text-balance font-sans text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#17125c] sm:text-[54px]">
                A Diploma built for real <span className="text-[#3216b8]">communication.</span>
              </h2>
              <div className="mt-7 h-1 w-16 rounded-full bg-[#f02c85]" />
              <p className="mt-8 max-w-[470px] font-body text-[16px] leading-8 text-[#5f5b78] lg:text-[18px]">
                Build the practical English skills you need for study, work and life through interactive learning and real-world practice.
              </p>
            </div>

            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[#dedaf0] bg-white">
                <Image src="/images/english/conversation-practice.webp" alt="Two Sri Lankan learners practising spoken English together" fill quality={90} sizes="(min-width: 1024px) 760px, calc(100vw - 40px)" className="object-cover object-center" />
              </div>
              <h3 className="mt-10 font-sans text-[27px] font-semibold tracking-[-0.03em] text-[#17125c] sm:text-[34px]">What you will be able to do</h3>
              <div className="mt-5 divide-y divide-[#dcd7ef] border-y border-[#dcd7ef]">
                {englishOutcomes.map((outcome) => {
                  const Icon = outcomeIcons[outcome.icon];
                  return (
                    <article key={outcome.title} className="grid gap-4 py-6 sm:grid-cols-[52px_1fr_1.15fr] sm:items-center sm:gap-6">
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-white text-[#3216b8]"><Icon aria-hidden="true" className="size-5" /></span>
                      <h4 className="font-sans text-[18px] font-semibold text-[#17125c]">{outcome.title}</h4>
                      <p className="font-body text-[14px] leading-6 text-[#68647f] sm:text-[15px]">{outcome.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="learning-journey" aria-labelledby="journey-title" className="scroll-mt-24 bg-[#101546] px-5 py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px]">
            <h2 id="journey-title" className="font-sans text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-[56px]">Your learning journey</h2>
            <p className="mt-5 max-w-[800px] font-body text-[16px] leading-8 text-white/70 lg:text-[18px]">Progress from strong foundations to confident academic and professional communication.</p>
            <div className="mt-10"><EnglishJourney /></div>
          </div>
        </section>

        <section aria-labelledby="how-you-learn-title" className="bg-white px-5 py-16 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-9 lg:grid-cols-[.82fr_1fr_1fr_1fr] lg:gap-0">
            <div className="lg:pr-10">
              <h2 id="how-you-learn-title" className="font-sans text-[32px] font-semibold tracking-[-0.04em] text-[#17125c]">How you learn</h2>
              <p className="mt-4 font-body text-[15px] leading-7 text-[#68647f]">Practical, interactive and personalised learning every step of the way.</p>
            </div>
            {[
              [Speech, "Live guided lessons", "Learn with real-time explanation and communication practice."],
              [CheckCircle2, "Practical assessments", "Complete authentic tasks that show how your skills are developing."],
              [MessagesSquare, "Personal feedback", "Receive clear guidance that helps you improve with purpose."],
            ].map(([Icon, title, description]) => {
              const ItemIcon = Icon as typeof Speech;
              return (
                <article key={String(title)} className="border-t border-[#dedaf0] pt-7 lg:border-l lg:border-t-0 lg:px-8 lg:pt-0">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#f4f1ff] text-[#3216b8]"><ItemIcon aria-hidden="true" className="size-5" /></span>
                  <h3 className="mt-5 font-sans text-[18px] font-semibold text-[#17125c]">{String(title)}</h3>
                  <p className="mt-3 font-body text-[14px] leading-6 text-[#68647f]">{String(description)}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="milestone-title" className="bg-[#f7f4ff] px-5 py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
            <figure className="relative grid aspect-[4/3] grid-cols-[1.35fr_.65fr] gap-2 overflow-hidden rounded-[24px_90px_24px_24px] bg-[#17125c] p-2">
              <div className="relative overflow-hidden rounded-[17px_60px_17px_17px]">
                <Image src="/images/events/convocation-2026/presentation-handshake.webp" alt="A CCA graduate being congratulated during the 2026 convocation" fill quality={90} sizes="(min-width: 1024px) 720px, 100vw" className="object-cover object-center" />
              </div>
              <div className="relative overflow-hidden rounded-[14px_70px_14px_14px]">
                <Image src="/images/events/convocation-2026/graduation-keepsakes.webp" alt="Graduation scroll, flowers and celebration keepsakes from the CCA convocation" fill quality={90} sizes="(min-width: 1024px) 320px, 50vw" className="object-cover object-center" />
              </div>
              <figcaption className="absolute bottom-5 left-5 rounded-full border border-white/35 bg-[#101546]/85 px-4 py-2 font-body text-[12px] text-white backdrop-blur-sm sm:text-[13px]">Real CCA graduation moments from 2026</figcaption>
            </figure>
            <div>
              <h2 id="milestone-title" className="text-balance font-sans text-[38px] font-semibold leading-[1.1] tracking-[-0.045em] text-[#17125c] sm:text-[52px]">Learn with the finish line in view.</h2>
              <p className="mt-7 font-body text-[16px] leading-8 text-[#5f5b78] lg:text-[18px]">Your diploma represents practical progress, clearer communication and the confidence to take your next step. The School of English brings CCA&apos;s learner-focused approach to language development.</p>
              <div className="mt-9"><AdmissionsLink outline>Ask About the Diploma</AdmissionsLink></div>
            </div>
          </div>
        </section>

        <section id="who-it-is-for" aria-labelledby="audience-title" className="scroll-mt-24 bg-white px-5 py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1280px] overflow-hidden rounded-[26px] border border-[#dedaf0] lg:grid-cols-2">
            <div className="p-7 sm:p-10 lg:p-14">
              <h2 id="audience-title" className="font-sans text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#17125c] sm:text-[52px]">Made for your next step</h2>
              <ul className="mt-9 divide-y divide-[#dedaf0] border-y border-[#dedaf0]">
                {audiences.map(([Icon, label]) => (
                  <li key={label} className="flex min-h-16 items-center gap-4 font-sans text-[17px] font-semibold text-[#272354]"><Icon aria-hidden="true" className="size-5 text-[#7059db]" />{label}</li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[480px] bg-[#f7f4ff] lg:min-h-[610px]">
              <Image src="/images/english/online-learner.webp" alt="Sri Lankan learner studying English online with a laptop and notebook" fill quality={90} sizes="(min-width: 1024px) 640px, calc(100vw - 40px)" className="object-cover object-center" />
            </div>
          </div>
        </section>

        <section aria-labelledby="format-title" className="bg-[#f7f4ff] px-5 py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <h2 id="format-title" className="max-w-[900px] font-sans text-[36px] font-semibold leading-[1.12] tracking-[-0.04em] text-[#17125c] sm:text-[48px]">A flexible, practical learning experience</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {learningFormat.map(([Icon, title, description]) => (
                <article key={title} className="border-t border-[#d8d2ef] pt-7 lg:border-l lg:border-t-0 lg:px-8 lg:first:border-l-0 lg:first:pl-0">
                  <Icon aria-hidden="true" className="size-8 text-[#7059db]" />
                  <h3 className="mt-5 font-sans text-[18px] font-semibold text-[#17125c]">{title}</h3>
                  <p className="mt-3 font-body text-[14px] leading-6 text-[#68647f]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faqs" aria-labelledby="faqs-title" className="scroll-mt-24 bg-white px-5 py-20 lg:py-28">
          <div className="mx-auto max-w-[1040px]">
            <h2 id="faqs-title" className="font-sans text-[40px] font-semibold tracking-[-0.045em] text-[#17125c] sm:text-[54px]">Questions, answered</h2>
            <div className="mt-9 divide-y divide-[#dedaf0] border-y border-[#dedaf0]">
              {englishFaqs.map((item, index) => (
                <details key={item.question} open={index === 0} className="group">
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-6 font-sans text-[17px] font-semibold text-[#17125c] marker:content-none sm:text-[19px] [&::-webkit-details-marker]:hidden">
                    {item.question}<span aria-hidden="true" className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f4f1ff] text-[#3216b8] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-[850px] pb-7 pr-12 font-body text-[15px] leading-7 text-[#68647f] sm:text-[16px]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 pb-20 lg:pb-28">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 overflow-hidden rounded-[26px] bg-[#101546] px-7 py-12 text-white sm:px-12 lg:flex-row lg:items-center lg:px-16 lg:py-16">
            <h2 className="max-w-[780px] text-balance font-sans text-[34px] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[46px]">Ready to speak, write and move forward with confidence?</h2>
            <a href={englishAdmissionsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-[10px] bg-[#d8d0ff] px-6 font-sans text-[15px] font-semibold text-[#17125c] transition hover:-translate-y-0.5 hover:bg-white">Talk to Admissions <ArrowRight aria-hidden="true" className="size-4" /></a>
          </div>
        </section>
      </main>
      <EnglishFooter />
    </>
  );
}
