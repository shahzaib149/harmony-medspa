"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CONTACT_WEBHOOK_URL, ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { formatUsPhoneE164 } from "@/lib/submitLead";
import { trackLeadConversion } from "@/lib/analytics/gtag";

// ─── Constants ────────────────────────────────────────────────────────────────

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SESSION_KEY = "wml_utm_params";

// UTM / click-id query-string params we capture
const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_adgroup",
  "utm_content",
  "utm_term",
  "matchtype",
  "device",
  "network",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

type TrackedParam = (typeof TRACKED_PARAMS)[number];
type CapturedParams = Partial<Record<TrackedParam, string>>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readAndPersistParams(): CapturedParams {
  if (typeof window === "undefined") return {};

  const qs = new URLSearchParams(window.location.search);
  let fromSession: CapturedParams = {};

  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) fromSession = JSON.parse(raw) as CapturedParams;
  } catch {
    // sessionStorage unavailable or corrupt — proceed without it
  }

  // Prefer live query string; fall back to sessionStorage for each param
  const merged: CapturedParams = {};
  for (const key of TRACKED_PARAMS) {
    const live = qs.get(key);
    merged[key] = live ?? fromSession[key] ?? "";
  }

  // Persist merged values — survives soft navigations and refreshes
  try {
    // Only write if there is at least one non-empty value (don't clobber a
    // genuine session with an empty landing)
    const hasValues = TRACKED_PARAMS.some((k) => merged[k]);
    if (hasValues) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(merged));
    }
  } catch {
    // ignore write failures
  }

  return merged;
}

function isValidUsPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  // Accept 10-digit national or 11-digit with leading 1
  const national = digits.startsWith("1") && digits.length >= 11 ? digits.slice(1) : digits;
  return national.length >= 10;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Errors = {
  name?: string;
  phone?: string;
  email?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

type BestTime = "" | "Morning" | "Afternoon" | "Evening" | "Any time";

// ─── Component ────────────────────────────────────────────────────────────────

export default function WeightLossForm({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bestTime, setBestTime] = useState<BestTime>("");
  const [honeypot, setHoneypot] = useState(""); // must stay empty
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Captured on mount; stable for the life of the component
  const capturedParams = useRef<CapturedParams>({});
  const hasFiredConversion = useRef(false);

  useEffect(() => {
    capturedParams.current = readAndPersistParams();
  }, []);

  // ── Validation ──────────────────────────────────────────────────────────────

  function validate(): Errors {
    const errs: Errors = {};

    if (!name.trim()) {
      errs.name = "Please enter your name.";
    }

    if (!phone.trim()) {
      errs.phone = "Please enter your phone number.";
    } else if (!isValidUsPhone(phone)) {
      errs.phone = "Please enter a valid US phone number.";
    }

    if (email.trim() && !EMAIL_PATTERN.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    return errs;
  }

  // ── Submission ──────────────────────────────────────────────────────────────

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Silently discard honeypot-filled submissions
    if (honeypot) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");

    const p = capturedParams.current;

    const payload = {
      // ── Core lead fields (matching existing Airtable schema exactly) ──
      Name: name.trim(),
      Email: email.trim(),
      Phone: formatUsPhoneE164(phone),
      Source: "Medical Weight Loss Landing Page",
      Status: "New",
      "Treatment Interest": "Medical Weight Loss",
      "Best Time to Reach": bestTime,
      "Email Sent Status": "Pending",
      "SMS Sent Status": "Pending",

      // ── UTM fields (matching existing schema) ──
      "UTM Source": p.utm_source ?? "",
      "UTM Medium": p.utm_medium ?? "",
      "UTM Campaign": p.utm_campaign ?? "",

      // ── Extended attribution fields (new — confirm Airtable columns exist) ──
      "UTM Ad Group": p.utm_adgroup ?? "",
      "UTM Content": p.utm_content ?? "",
      "UTM Term": p.utm_term ?? "",
      "Match Type": p.matchtype ?? "",
      Device: p.device ?? "",
      Network: p.network ?? "",
      GCLID: p.gclid ?? "",
      GBRAID: p.gbraid ?? "",
      WBRAID: p.wbraid ?? "",

      // ── Page context ──
      "Page URL": typeof window !== "undefined" ? window.location.href : "",
      "Landing URL": "/landing/medical-weight-loss",
      "Lead Created At": new Date().toISOString(),
    };

    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Webhook returned non-OK status");

      // ── Fire conversion exactly once, only on confirmed success ──
      if (!hasFiredConversion.current) {
        hasFiredConversion.current = true;
        trackLeadConversion();
      }

      setStatus("success");
    } catch {
      setStatus("error");
      // Intentionally no conversion fire on failure
    }
  }

  // ── Success state ────────────────────────────────────────────────────────────

  if (status === "success") {
    return (
      <div className="wml-form-card" id={id}>
        <div className="wml-success">
          <div className="wml-success-icon" aria-hidden="true">✓</div>
          <h3 className="wml-success-heading">Thanks — we&apos;ve got your details.</h3>
          <p className="wml-success-body">
            Someone from our team will be in touch shortly. If you&apos;d rather book a time now, you can do that here:
          </p>
          <a
            className="wml-submit-btn"
            href={ONLINE_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book an Appointment
          </a>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  return (
    <div className="wml-form-card" id={id}>
      <h2 className="wml-form-heading">Request Your Consultation</h2>
      <p className="wml-form-subheading">Fill in the form and we&apos;ll call you back.</p>

      <form className="wml-form" onSubmit={handleSubmit} noValidate aria-label="Consultation request form">

        {/* Honeypot — visually hidden, must stay empty */}
        <div className="wml-honeypot" aria-hidden="true">
          <label htmlFor={`${id}-website`}>Leave this blank</label>
          <input
            id={`${id}-website`}
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        {/* Name */}
        <div className="wml-field">
          <label className="wml-label" htmlFor={`${id}-name`}>
            Name <span className="wml-required" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            className={`wml-input${errors.name ? " wml-input-error" : ""}`}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
          />
          {errors.name ? (
            <p id={`${id}-name-err`} className="wml-field-error" role="alert">{errors.name}</p>
          ) : null}
        </div>

        {/* Phone */}
        <div className="wml-field">
          <label className="wml-label" htmlFor={`${id}-phone`}>
            Phone <span className="wml-required" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-phone`}
            className={`wml-input${errors.phone ? " wml-input-error" : ""}`}
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="(941) 555-0123"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-required="true"
            aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
          />
          {errors.phone ? (
            <p id={`${id}-phone-err`} className="wml-field-error" role="alert">{errors.phone}</p>
          ) : null}
        </div>

        {/* Email (optional) */}
        <div className="wml-field">
          <label className="wml-label" htmlFor={`${id}-email`}>
            Email <span className="wml-optional">(optional)</span>
          </label>
          <input
            id={`${id}-email`}
            className={`wml-input${errors.email ? " wml-input-error" : ""}`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Optional"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
          />
          {errors.email ? (
            <p id={`${id}-email-err`} className="wml-field-error" role="alert">{errors.email}</p>
          ) : null}
        </div>

        {/* Best time to reach */}
        <div className="wml-field">
          <label className="wml-label" htmlFor={`${id}-time`}>
            Best time to reach you <span className="wml-optional">(optional)</span>
          </label>
          <select
            id={`${id}-time`}
            className="wml-select"
            name="best_time"
            value={bestTime}
            onChange={(e) => setBestTime(e.target.value as BestTime)}
          >
            <option value="">Select a time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Any time">Any time</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          id={`${id}-submit`}
          className="wml-submit-btn"
          type="submit"
          disabled={status === "submitting"}
          aria-disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending\u2026" : "Request Your Consultation"}
        </button>

        <p className="wml-form-disclaimer">
          We&apos;ll call or text you back. No obligation, and no pressure to book anything.
        </p>

        {/* Error state */}
        {status === "error" ? (
          <p className="wml-form-error" role="alert">
            Something went wrong. Please call us on{" "}
            <a href={`tel:+1${PHONE_TEL}`}>{PHONE_DISPLAY}</a> and we&apos;ll take your details.
          </p>
        ) : null}
      </form>
    </div>
  );
}
