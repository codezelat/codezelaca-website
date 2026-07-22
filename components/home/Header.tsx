"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Brand } from "@/components/home/Brand";
import { ActionLink } from "@/components/ui/ActionLink";
import { navigation, whatsappRegistration } from "@/data/home";

export function Header() {
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

    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

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
      <header className="fixed inset-x-0 top-[15px] z-50 px-[10px] pt-[10px]">
        <div className="mx-auto w-full max-w-[1280px] p-[10px]">
          <div className="relative flex h-[82px] items-center justify-between gap-[10px] rounded-[80px] border border-black/25 bg-white/72 py-[10px] pr-[20px] pl-[15px] shadow-[0_0_10px_rgba(0,0,0,0.09)] backdrop-blur-[2px] lg:h-[79px] lg:p-[10px]">
            <Link
              href="/"
              aria-label="CodeZela Career Accelerator home"
              className="min-w-0 shrink-0 rounded-full"
            >
              <Brand compact className="[&_img]:size-[60px] lg:[&_img]:size-14" />
            </Link>

            <nav aria-label="Primary navigation" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
              <ul className="flex items-center">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex h-[46px] items-center px-[20px] font-sans text-[16px] leading-[20px] font-semibold text-primary-deep transition-colors duration-300 hover:text-primary-bright"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ActionLink
              href={whatsappRegistration}
              showArrow
              className="hidden h-[55px] min-h-[55px] w-[163px] shrink-0 rounded-[80px] px-[20px] leading-[15px] lg:inline-flex"
            >
              Register Now
            </ActionLink>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open navigation menu"
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-[44px] shrink-0 items-center justify-center rounded-full text-primary-bright transition-colors hover:bg-primary-bright/10 lg:hidden"
            >
              <Menu aria-hidden="true" className="size-[28px] stroke-[3.5]" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-[60] bg-black/80 px-[20px] py-[25px] lg:hidden"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={keepFocusInMenu}
            className="mx-auto w-full max-w-[420px] rounded-[30px] bg-white p-[20px] shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-black/10 pb-[18px]">
              <Link href="/" aria-label="CodeZela Career Accelerator home" onClick={closeMenu}>
                <Brand compact />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMenu}
                className="inline-flex size-[44px] items-center justify-center rounded-full bg-primary-bright/10 text-primary-deep transition-colors hover:bg-primary-bright hover:text-white"
              >
                <X aria-hidden="true" className="size-6 stroke-[2.5]" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="pt-[14px]">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block rounded-[14px] px-[16px] py-[14px] font-sans text-[17px] font-semibold text-muted-foreground transition-colors hover:bg-hero hover:text-primary-deep"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ActionLink
              href={whatsappRegistration}
              showArrow
              className="mt-[16px] h-[55px] min-h-[55px] w-full rounded-[80px]"
            >
              Register Now
            </ActionLink>
          </div>
        </div>
      ) : null}
    </>
  );
}
