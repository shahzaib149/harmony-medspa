"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { formatUsPhoneE164, submitLeadPayload } from "@/lib/submitLead";
import { trackLead } from "@/lib/analytics";
import styles from "./WeightLossForm.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Errors = { name?: string; phone?: string; email?: string };
type Status = "idle" | "submitting" | "success" | "error";
type BestTime = "" | "Morning" | "Afternoon" | "Evening" | "Any time";

function isValidUsPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  const national = digits.startsWith("1") && digits.length >= 11 ? digits.slice(1) : digits;
  return national.length >= 10;
}

type WeightLossFormProps = {
  id: string;
  source?: string;
  treatmentInterest?: string;
  landingUrl?: string;
  ariaLabel?: string;
  kicker?: string;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  treatmentOptions?: readonly string[];
};

export default function WeightLossForm({
  id,
  source = "Medical Weight Loss Landing Page",
  treatmentInterest = "Medical Weight Loss",
  landingUrl = "/landing/medical-weight-loss",
  ariaLabel = "Medical weight loss consultation request",
  kicker = "Private consultation request",
  heading = "Let's talk about your options.",
  subheading = "Share the best way to reach you. Our Sarasota team will follow up personally.",
  submitLabel = "Request my consultation",
  treatmentOptions,
}: WeightLossFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bestTime, setBestTime] = useState<BestTime>("");
  const [selectedTreatment, setSelectedTreatment] = useState(treatmentInterest);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const availableTreatments = treatmentOptions?.length
    ? treatmentOptions
    : [treatmentInterest, "Not sure — I’d like guidance"];


  function validate(): Errors {
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!phone.trim()) nextErrors.phone = "Please enter your phone number.";
    else if (!isValidUsPhone(phone)) nextErrors.phone = "Please enter a valid US phone number.";
    if (!email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = "Please enter a valid email address.";
    return nextErrors;
  }

  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    if (honeypot || status === "submitting" || status === "success") return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    submitting.current = true;
    setStatus("submitting");

    const payload = {
      Name: name.trim(),
      Email: email.trim(),
      Phone: formatUsPhoneE164(phone),
      Source: source,
      Status: "New",
      "Treatment Interest": selectedTreatment || treatmentInterest,
      Message: message.trim(),
      "Best Time to Reach": bestTime,
      "Email Sent Status": "Pending",
      "SMS Sent Status": "Pending",
      "Page URL": typeof window !== "undefined" ? window.location.href : "",
      "Landing URL": landingUrl,
      "Lead Created At": new Date().toISOString(),
    };

    try {
      const response = await submitLeadPayload(payload);
      trackLead(response);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className={styles.card} id={id} role="status" aria-live="polite">
        <div className={styles.successIcon} aria-hidden="true"><Check size={22} /></div>
        <p className={styles.kicker}>Request received</p>
        <h2 className={styles.successHeading}>We&apos;ll be in touch shortly.</h2>
        <p className={styles.successBody}>A member of the Harmony team will contact you about the next step. Prefer to choose a time now?</p>
        <a className={styles.submitButton} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Book an appointment <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className={styles.card} id={id}>
      <p className={styles.kicker}>{kicker}</p>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.subheading}>{subheading}</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label={ariaLabel}>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={`${id}-website`}>Leave this blank</label>
          <input id={`${id}-website`} name="website" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} autoComplete="off" tabIndex={-1} />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${id}-name`}>Full name <span aria-hidden="true">*</span></label>
          <input id={`${id}-name`} className={`${styles.input} ${errors.name ? styles.inputError : ""}`} type="text" name="name" autoComplete="name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-error` : undefined} />
          {errors.name ? <p id={`${id}-name-error`} className={styles.fieldError} role="alert">{errors.name}</p> : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${id}-phone`}>Phone <span aria-hidden="true">*</span></label>
          <input id={`${id}-phone`} className={`${styles.input} ${errors.phone ? styles.inputError : ""}`} type="tel" name="phone" autoComplete="tel" placeholder="(941) 555-0123" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} aria-required="true" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${id}-phone-error` : undefined} />
          {errors.phone ? <p id={`${id}-phone-error`} className={styles.fieldError} role="alert">{errors.phone}</p> : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${id}-email`}>Email <span aria-hidden="true">*</span></label>
          <input id={`${id}-email`} className={`${styles.input} ${errors.email ? styles.inputError : ""}`} type="email" name="email" autoComplete="email" placeholder="you@example.com" inputMode="email" value={email} onChange={(event) => setEmail(event.target.value)} required aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${id}-email-error` : undefined} />
          {errors.email ? <p id={`${id}-email-error`} className={styles.fieldError} role="alert">{errors.email}</p> : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${id}-treatment`}>What are you interested in?</label>
          <select id={`${id}-treatment`} className={styles.select} name="treatment_interest" value={selectedTreatment} onChange={(event) => setSelectedTreatment(event.target.value)}>
            {availableTreatments.map((option) => <option value={option} key={option}>{option}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${id}-message`}>Anything you&apos;d like us to know? <span className={styles.optional}>Optional</span></label>
          <textarea id={`${id}-message`} className={styles.textarea} name="message" rows={3} maxLength={1000} placeholder="Tell us about your goals, questions, or what you booked." value={message} onChange={(event) => setMessage(event.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${id}-time`}>Best time to reach you <span className={styles.optional}>Optional</span></label>
          <select id={`${id}-time`} className={styles.select} name="best_time" value={bestTime} onChange={(event) => setBestTime(event.target.value as BestTime)}>
            <option value="">Select a time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Any time">Any time</option>
          </select>
        </div>

        <button className={styles.submitButton} type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"}>
          {status === "submitting" ? "Sending…" : submitLabel}
          {status !== "submitting" ? <ArrowUpRight size={18} aria-hidden="true" /> : null}
        </button>

        <p className={styles.privacy}><LockKeyhole size={13} aria-hidden="true" /> Your information is sent securely and used only to follow up about your request.</p>
        <p className={styles.consent}>By submitting, you agree Harmony Med Spa may contact you by phone or text. Message and data rates may apply. Consent is not a condition of purchase.</p>
        {status === "error" ? <p className={styles.formError} role="alert">We couldn&apos;t send your request. Please call <a href={`tel:+1${PHONE_TEL}`}>{PHONE_DISPLAY}</a> and we&apos;ll help directly.</p> : null}
      </form>
    </div>
  );
}
