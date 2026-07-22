"use client";

import { FormEvent, useState } from "react";

const fieldClass =
  "min-h-[52px] w-full rounded-[12px] border border-black/15 bg-white px-4 font-body text-[15px] text-black outline-none transition placeholder:text-[#7b8490] hover:border-black/25 focus:border-primary-bright focus:ring-4 focus:ring-primary-bright/10";

const labelClass = "mb-2 block font-sans text-[13px] font-semibold text-[#2d2434]";

export function ConsultationForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const message = [
      "Hello CodeZela Career Accelerator, I would like a free consultation.",
      "",
      `Full Name: ${formData.get("fullName")}`,
      `Mobile Number: ${formData.get("mobile")}`,
      `Email: ${formData.get("email")}`,
      `Preferred Time: ${formData.get("preferredTime")}`,
      `Interested Pathway: ${formData.get("pathway") || "Not specified"}`,
      `Message: ${formData.get("message") || "Not provided"}`,
    ].join("\n");

    const popup = window.open(`https://wa.me/94766772923?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setStatus(
      popup
        ? "Your consultation details are ready in WhatsApp. Send the message there to complete your request."
        : "WhatsApp was blocked by your browser. Please allow pop-ups and submit again, or call +94 76 677 2923.",
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8" aria-describedby="consultation-form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Full name <span aria-hidden="true" className="text-primary-bright">*</span></span>
          <input className={fieldClass} type="text" name="fullName" autoComplete="name" required placeholder="Your full name" />
        </label>
        <label className="block">
          <span className={labelClass}>Mobile number <span aria-hidden="true" className="text-primary-bright">*</span></span>
          <input className={fieldClass} type="tel" name="mobile" autoComplete="tel" inputMode="tel" required placeholder="+94 7X XXX XXXX" />
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Email address <span aria-hidden="true" className="text-primary-bright">*</span></span>
          <input className={fieldClass} type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className={labelClass}>Preferred time <span aria-hidden="true" className="text-primary-bright">*</span></span>
          <select className={fieldClass} name="preferredTime" required defaultValue="">
            <option value="" disabled>Select a time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className={labelClass}>Interested pathway <span className="font-normal text-muted-foreground">(optional)</span></span>
        <input className={fieldClass} type="text" name="pathway" placeholder="For example: AI/ML Engineer" />
      </label>

      <label className="mt-5 block">
        <span className={labelClass}>How can we help? <span className="font-normal text-muted-foreground">(optional)</span></span>
        <textarea className={`${fieldClass} min-h-[120px] resize-y py-3`} name="message" placeholder="Tell us about your goals or questions" />
      </label>

      <button type="submit" className="mt-6 inline-flex min-h-[54px] w-full items-center justify-center rounded-[12px] bg-primary px-7 font-sans text-[15px] font-semibold text-white shadow-[0_10px_28px_rgba(192,38,211,.24)] transition hover:-translate-y-0.5 hover:bg-primary-bright focus-visible:-translate-y-0.5">
        Request Consultation
      </button>

      <p id="consultation-form-status" role="status" aria-live="polite" className="mt-3 min-h-6 font-body text-[13px] leading-5 text-muted-foreground">
        {status}
      </p>
    </form>
  );
}
