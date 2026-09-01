"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { englishAdmissionsUrl } from "@/data/english";

const links = [
  ["The Diploma", "#the-diploma"],
  ["What You Learn", "#learning-journey"],
  ["Who It Is For", "#who-it-is-for"],
  ["FAQs", "#faqs"],
] as const;

function EnglishBrand() {
  return (
    <span className="inline-flex items-baseline gap-2 whitespace-nowrap font-sans text-[#17125c]">
      <span className="text-[25px] font-extrabold tracking-[-0.05em] sm:text-[29px]">CCA</span>
      <span className="text-[15px] font-semibold tracking-[-0.025em] sm:text-[18px]">School of English</span>
    </span>
  );
}

export function EnglishHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const keepFocusInMenu = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-[15px] z-50 px-[10px]">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between rounded-[20px] border border-black/10 bg-white/92 px-5 shadow-[0_10px_35px_rgba(24,18,85,.10)] backdrop-blur-md sm:px-7">
          <Link href="/english/" aria-label="CCA School of English home" className="rounded-lg">
            <EnglishBrand />
          </Link>

          <nav aria-label="School of English navigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="inline-flex min-h-11 items-center rounded-lg px-4 font-sans text-[14px] font-semibold text-[#272354] transition hover:bg-[#f4f1ff] hover:text-[#3216b8]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href={englishAdmissionsUrl} target="_blank" rel="noreferrer" className="hidden min-h-12 items-center gap-3 rounded-[10px] bg-[#3216b8] px-5 font-sans text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4a28d6] lg:inline-flex">
            Talk to Admissions <ArrowRight aria-hidden="true" className="size-4" />
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open English school navigation"
            aria-expanded={menuOpen}
            aria-controls="english-mobile-navigation"
            onClick={() => setMenuOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full text-[#3216b8] transition hover:bg-[#f4f1ff] lg:hidden"
          >
            <Menu aria-hidden="true" className="size-7" />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] bg-[#11103d]/82 px-5 py-6 lg:hidden" onMouseDown={(event) => event.target === event.currentTarget && closeMenu()}>
          <div id="english-mobile-navigation" role="dialog" aria-modal="true" aria-label="School of English navigation" onKeyDown={keepFocusInMenu} className="mx-auto max-w-[420px] rounded-[24px] bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[#dedaf0] pb-5">
              <Link href="/english/" onClick={closeMenu}><EnglishBrand /></Link>
              <button ref={closeButtonRef} type="button" aria-label="Close English school navigation" onClick={closeMenu} className="inline-flex size-11 items-center justify-center rounded-full bg-[#f4f1ff] text-[#3216b8] transition hover:bg-[#3216b8] hover:text-white">
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <nav aria-label="Mobile School of English navigation" className="pt-4">
              <ul className="space-y-1">
                {links.map(([label, href]) => (
                  <li key={href}><a href={href} onClick={closeMenu} className="block rounded-xl px-4 py-3.5 font-sans text-[16px] font-semibold text-[#272354] transition hover:bg-[#f4f1ff] hover:text-[#3216b8]">{label}</a></li>
                ))}
              </ul>
            </nav>
            <a href={englishAdmissionsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[10px] bg-[#3216b8] px-5 font-sans text-[14px] font-semibold text-white">
              Talk to Admissions <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
