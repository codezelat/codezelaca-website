import type { Metadata } from "next";
import { Compass, Home, MessageCircle } from "lucide-react";

import { PageShell } from "@/components/pages/PageShell";
import { ActionLink } from "@/components/ui/ActionLink";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you requested could not be found. Explore CodeZela Career Accelerator programmes or return to the homepage.",
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-hero px-5 pb-24 pt-[165px] sm:min-h-[820px] lg:pt-[185px]">
        <div aria-hidden="true" className="absolute left-[-120px] top-[180px] -z-10 size-[360px] rounded-full bg-primary-bright/10 blur-3xl" />
        <div aria-hidden="true" className="absolute bottom-[80px] right-[-150px] -z-10 size-[420px] rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto w-full max-w-[920px] text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-[26px] border border-primary-bright/25 bg-white text-primary-bright shadow-[0_20px_60px_rgba(113,11,192,.14)]">
            <Compass aria-hidden="true" className="size-9" strokeWidth={1.8} />
          </div>
          <p className="mt-8 font-sans text-[14px] font-semibold uppercase tracking-[.22em] text-primary-readable">Error 404</p>
          <h1 className="mx-auto mt-5 max-w-[780px] font-sans text-[46px] font-semibold leading-[1.04] tracking-[-0.05em] text-black sm:text-[64px] lg:text-[76px]">
            This page took a wrong turn.
          </h1>
          <p className="mx-auto mt-7 max-w-[650px] font-body text-[16px] leading-7 text-muted-foreground sm:text-[18px] sm:leading-8">
            The address may have changed, or the page may no longer exist. Your next career move is still right here.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ActionLink href="/" className="min-w-[190px]" showArrow>
              <Home aria-hidden="true" className="size-4" />
              Back to Home
            </ActionLink>
            <ActionLink href="/divisions/" variant="outline" className="min-w-[190px]">
              <Compass aria-hidden="true" className="size-4" />
              Explore Divisions
            </ActionLink>
          </div>

          <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 font-body text-[14px] text-muted-foreground">
            <MessageCircle aria-hidden="true" className="size-4 text-primary-bright" />
            Need help? <a href="/contact-us/" className="font-semibold text-primary-readable underline decoration-primary-bright/30 underline-offset-4 transition-colors hover:text-primary-deep">Contact our team</a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
