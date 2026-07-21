import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter } from "react-icons/fa6";

import { Brand } from "@/components/home/Brand";

const divisions = [
  ["School of AI and Data Science", "/divisions/#ai-and-data-science"],
  ["School of Software and Development", "/divisions/#software-and-development"],
  ["School of Systems Engineering", "/divisions/#systems-engineering"],
  ["School of Creative Media and Design", "/divisions/#creative-media-and-design"],
  ["School of Marketing and Business", "/divisions/#marketing-and-business"],
] as const;

const siteMenu = [
  ["Divisions", "/divisions/"],
  ["About Us", "/about-us/"],
  ["Contact Us", "/contact-us/"],
  ["Privacy Policy", "/privacy-policy/"],
  ["Terms and Conditions", "/terms-and-conditions/"],
  ["Refund Policy", "/refund-policy/"],
] as const;

const socialLinks = [
  ["Facebook", "https://www.facebook.com/codezelaca", FaFacebook],
  ["Instagram", "https://www.instagram.com/codezelaca", FaInstagram],
  ["LinkedIn", "https://www.linkedin.com/company/codezelaca/", FaLinkedin],
  ["X", "https://x.com/CodezelaCA", FaXTwitter],
  ["TikTok", "https://www.tiktok.com/@codezelaca", FaTiktok],
] as const;

export function Footer() {
  return (
    <footer className="content-visibility-auto flex min-h-[1480px] items-start bg-white px-5 pt-20 lg:mt-px lg:min-h-[682px] lg:px-0">
      <div className="mx-auto flex min-h-[1400px] w-full max-w-[1280px] flex-col rounded-[20px] bg-footer px-5 py-12 text-white lg:min-h-[582px] lg:px-5 lg:py-[10px]">
        <div className="grid flex-1 gap-12 px-0 py-6 text-center lg:grid-cols-[1fr_1fr_1fr] lg:gap-10 lg:px-[10px] lg:py-[40px] lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" aria-label="CodeZela Career Accelerator home"><Brand inverse compact /></Link>
            <p className="mt-8 max-w-[380px] font-body text-[16px] leading-6 text-white">Transform your career in months with expert mentorship, real projects, and a proven curriculum.</p>
            <div className="mt-8 space-y-4 font-body text-[16px]">
              <a href="mailto:ca@codezela.com" className="flex items-center justify-center gap-3 transition-colors hover:text-primary-bright lg:justify-start"><Mail aria-hidden="true" className="size-5" />ca@codezela.com</a>
              <a href="https://wa.me/94766772923" className="flex items-center justify-center gap-3 transition-colors hover:text-primary-bright lg:justify-start"><MessageCircle aria-hidden="true" className="size-5" />+94 76 677 2923</a>
              <a href="https://wa.me/94766778438" className="flex items-center justify-center gap-3 transition-colors hover:text-primary-bright lg:justify-start"><MessageCircle aria-hidden="true" className="size-5" />+94 76 677 8438</a>
            </div>
            <div className="mt-8 flex gap-6">
              {socialLinks.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-xl transition-colors hover:text-primary-bright"><Icon aria-hidden="true" /></a>)}
            </div>
          </div>

          <div>
            <h2 className="font-sans text-[18px] font-bold">Divisions</h2>
            <ul className="mt-6 space-y-5 font-sans text-[14px] leading-6">
              {divisions.map(([label, href]) => <li key={label}><a href={href} className="transition-colors hover:text-primary-bright">{label}</a></li>)}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-[18px] font-bold">Site Menu</h2>
            <ul className="mt-6 space-y-5 font-sans text-[14px] leading-6">
              {siteMenu.map(([label, href]) => <li key={label}><a href={href} className="transition-colors hover:text-primary-bright">{label}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="flex min-h-[84px] flex-col items-center justify-between gap-6 border-t border-white/20 px-[10px] pb-10 pt-8 font-body text-[14px] sm:flex-row lg:pb-6">
          <p>© 2026 <a href="https://codezela.com/" className="hover:text-primary-bright">Codezela Technologies</a>. All rights reserved.</p>
          <a href="/sitemap.xml" className="text-white/70 transition-colors hover:text-primary-bright">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
