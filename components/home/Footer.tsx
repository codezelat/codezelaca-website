import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter } from "react-icons/fa6";

import { Brand } from "@/components/home/Brand";

const divisions = [
  ["School of AI and Data Science", "/divisions/school-of-ai-and-data-science/"],
  ["School of Software and Development", "/divisions/school-of-software-and-development/"],
  ["School of Systems Engineering", "/divisions/school-of-systems-engineering/"],
  ["School of Creative Media and Design", "/divisions/school-of-creative-media-and-design/"],
  ["School of Marketing and Business", "/divisions/school-of-marketing-and-business/"],
] as const;

const siteMenu = [
  ["Divisions", "/divisions/"],
  ["About Us", "/about-us/"],
  ["Contact Us", "/contact-us/"],
  ["Terms and Conditions", "/terms-and-conditions/"],
] as const;

const policyLinks = [
  ["Privacy Policy", "/privacy-policy/"],
  ["Refund Policy", "/refund-policy/"],
  ["Sitemap", "/sitemap.xml"],
] as const;

const socialLinks = [
  ["Facebook", "https://www.facebook.com/codezelaca", FaFacebook],
  ["Instagram", "https://www.instagram.com/codezelaca", FaInstagram],
  ["LinkedIn", "https://www.linkedin.com/company/codezelaca/", FaLinkedin],
  ["X", "https://x.com/CodezelaCA", FaXTwitter],
  ["TikTok", "https://www.tiktok.com/@codezelaca", FaTiktok],
] as const;

const currentYear = new Date().getFullYear();
const copyrightYears = currentYear > 2025 ? `2025–${currentYear}` : "2025";

export function Footer() {
  return (
    <footer className="flex items-start bg-white px-5 py-16 sm:py-20 lg:mt-px lg:min-h-[682px] lg:px-0 lg:pt-20 lg:pb-5">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col rounded-[20px] bg-footer px-5 py-10 text-white sm:px-8 sm:py-12 lg:min-h-[582px] lg:px-5 lg:py-[10px]">
        <div className="grid flex-1 gap-12 px-0 py-2 text-center md:grid-cols-2 md:py-4 md:text-left lg:grid-cols-[1.15fr_1fr_.85fr] lg:gap-10 lg:px-[10px] lg:py-[40px]">
          <div className="flex flex-col items-center md:col-span-2 md:items-start lg:col-span-1">
            <Link href="/" prefetch={false} aria-label="CodeZela Career Accelerator home"><Brand inverse compact /></Link>
            <p className="mt-8 max-w-[380px] font-body text-[16px] leading-6 text-white">Transform your career in months with expert mentorship, real projects, and a proven curriculum.</p>
            <div className="mt-8 space-y-4 font-body text-[16px]">
              <a href="mailto:ca@codezela.com" className="flex items-center justify-center gap-3 transition-colors hover:text-primary-bright md:justify-start"><Mail aria-hidden="true" className="size-5" />ca@codezela.com</a>
              <a href="https://wa.me/94766772923" className="flex items-center justify-center gap-3 transition-colors hover:text-primary-bright md:justify-start"><MessageCircle aria-hidden="true" className="size-5" />+94 76 677 2923</a>
              <a href="https://wa.me/94766778438" className="flex items-center justify-center gap-3 transition-colors hover:text-primary-bright md:justify-start"><MessageCircle aria-hidden="true" className="size-5" />+94 76 677 8438</a>
            </div>
            <div className="mt-8 flex gap-6">
              {socialLinks.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-xl transition-colors hover:text-primary-bright"><Icon aria-hidden="true" /></a>)}
            </div>
          </div>

          <div>
            <h2 className="font-sans text-[18px] font-bold">Divisions</h2>
            <ul className="mt-6 space-y-5 font-sans text-[14px] leading-6">
              {divisions.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-primary-bright">{label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-[18px] font-bold">Site Menu</h2>
            <ul aria-label="Site menu" className="mt-6 space-y-5 font-sans text-[14px] leading-6">
              {siteMenu.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-primary-bright">{label}</Link></li>)}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/20 px-[10px] pt-8 pb-2 text-center font-body text-[14px] sm:flex-row sm:text-left lg:min-h-[84px] lg:pb-6">
          <p className="max-w-[430px]">© {copyrightYears} <a href="https://codezela.com/" className="hover:text-primary-bright">Codezela Technologies</a>. All rights reserved.</p>
          <nav aria-label="Policies and site information">
            <ul className="flex flex-wrap items-center justify-center divide-x divide-white/25 text-white/70 sm:justify-end">
              {policyLinks.map(([label, href]) => (
                <li key={label} className="px-3 first:pl-0 last:pr-0">
                  {href === "/sitemap.xml" ? (
                    <a href={href} className="transition-colors hover:text-primary-bright hover:underline hover:underline-offset-4">
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className="transition-colors hover:text-primary-bright hover:underline hover:underline-offset-4">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
