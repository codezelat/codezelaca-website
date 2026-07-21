"use client";

import { FormEvent, useState } from "react";

const fieldClass =
  "min-h-[47px] w-full rounded-none border border-[#66717f] bg-white px-4 font-body text-[15px] text-black outline-none placeholder:text-[#737b86] focus:relative focus:z-10 focus:border-primary-bright focus:ring-2 focus:ring-primary-bright/20";

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
    <form onSubmit={handleSubmit} className="mt-1" aria-describedby="consultation-form-status">
      <div>
        <label className="block">
          <span className="sr-only">Full Name (required)</span>
          <input className={fieldClass} type="text" name="fullName" autoComplete="name" required placeholder="Full Name" />
        </label>
        <label className="block -mt-px">
          <span className="sr-only">Mobile Number (required)</span>
          <input className={fieldClass} type="tel" name="mobile" autoComplete="tel" inputMode="tel" required placeholder="Mobile Number" />
        </label>
      </div>

      <div>
        <label className="block -mt-px">
          <span className="sr-only">Email (required)</span>
          <input className={fieldClass} type="email" name="email" autoComplete="email" required placeholder="Email" />
        </label>
        <label className="block -mt-px">
          <span className="sr-only">Preferred Time for Consultation (required)</span>
          <select className={fieldClass} name="preferredTime" required defaultValue="">
            <option value="" disabled>Select your preferred time for consultation</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </label>
      </div>

      <label className="block -mt-px">
        <span className="sr-only">Interested Pathway? (optional)</span>
        <input className={fieldClass} type="text" name="pathway" placeholder="Interested Pathway?" />
      </label>

      <label className="block -mt-px">
        <span className="sr-only">Message (optional)</span>
        <textarea className={`${fieldClass} min-h-[105px] resize-y py-3`} name="message" placeholder="Message" />
      </label>

      <button type="submit" className="-mt-px inline-flex min-h-[47px] w-full items-center justify-center rounded-none bg-[#77828f] px-7 font-sans text-[15px] font-medium text-white transition hover:bg-primary-bright">
        Request Consultation
      </button>

      <p id="consultation-form-status" role="status" aria-live="polite" className="mx-4 mt-2 min-h-6 font-body text-[13px] leading-5 text-muted-foreground">
        {status}
      </p>
    </form>
  );
}
