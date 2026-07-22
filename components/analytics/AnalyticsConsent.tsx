"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const storageKey = "cca-analytics-consent";
const consentEvent = "cca:analytics-consent";

type ConsentChoice = "granted" | "denied";

function isProductionAnalyticsHost() {
  return window.location.hostname === "cca.it.com" || window.location.hostname === "www.cca.it.com";
}

function readChoice() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(consentEvent, onStoreChange);
  return () => window.removeEventListener(consentEvent, onStoreChange);
}

function getSnapshot() {
  return isProductionAnalyticsHost() && readChoice() === null;
}

export function AnalyticsConsent() {
  const isVisible = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function saveChoice(choice: ConsentChoice) {
    try {
      window.localStorage.setItem(storageKey, choice);
    } catch {
      // The consent update still applies to the current page when storage is unavailable.
    }
    const analyticsWindow = window as typeof window & { gtag?: (...args: unknown[]) => void };
    analyticsWindow.gtag?.("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: choice,
    });
    window.dispatchEvent(new Event(consentEvent));
  }

  if (!isVisible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Analytics preferences"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-[720px] flex-col gap-4 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_70px_rgba(16,24,40,.18)] sm:flex-row sm:items-center sm:gap-6"
    >
      <p className="min-w-0 flex-1 font-body text-[13px] leading-5 text-muted-foreground">
        We use privacy-conscious analytics to improve the website. Advertising storage and personalisation remain disabled. Read our{" "}
        <Link href="/privacy-policy/" className="font-semibold text-primary-deep underline underline-offset-2">Privacy Policy</Link>.
      </p>
      <div className="flex shrink-0 gap-2">
        <button type="button" onClick={() => saveChoice("denied")} className="min-h-11 rounded-lg border border-black/15 px-4 font-sans text-[13px] font-semibold text-black transition hover:bg-black/5">
          Decline
        </button>
        <button type="button" onClick={() => saveChoice("granted")} className="min-h-11 rounded-lg bg-primary-deep px-4 font-sans text-[13px] font-semibold text-white transition hover:bg-primary">
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
