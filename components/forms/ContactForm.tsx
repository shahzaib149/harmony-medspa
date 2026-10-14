"use client";

import { FormEvent, Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { ONLINE_BOOKING_URL, PHONE_DISPLAY } from "@/lib/constants";
import { TREATMENT_INTEREST_OPTIONS } from "@/lib/data/pricing";
import { trackLead } from "@/lib/analytics";
import { submitLead } from "@/lib/submitLead";
import homeStyles from "./HomeContactForm.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

function validate(name: string, email: string, phone: string): Errors {
  const errors: Errors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone.trim()) {
    errors.phone = "Phone is required.";
  }

  return errors;
}

function ServiceSelect({ defaultValue }: { defaultValue: string }) {
  return (
    <select name="service" aria-label="Service or treatment of interest" defaultValue={defaultValue}>
      <option value="">Service or treatment of interest</option>
      {TREATMENT_INTEREST_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Service pages link here with ?service=<treatment>, so the lead arrives tagged with the
// page the patient asked from. Only listed treatments are accepted.
function ServiceSelectFromQuery() {
  const requested = useSearchParams().get("service")?.toLowerCase() ?? "";
  const match = TREATMENT_INTEREST_OPTIONS.find((option) => option.toLowerCase() === requested) ?? "";
  return <ServiceSelect key={match} defaultValue={match} />;
}

export default function ContactForm({ variant }: { variant: "home" | "page" | "landing" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    if (status === "submitting" || status === "success") return;

    const validationErrors = validate(name, email, phone);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const service = new FormData(event.currentTarget).get("service");

    submitting.current = true;
    setStatus("submitting");

    try {
      const response = await submitLead({
        name,
        email,
        phone,
        message,
        source: variant === "landing" ? "Landing Page Hero Form" : "Website Contact Form",
        treatmentInterest: typeof service === "string" && service ? service : undefined
      });

      trackLead(response);

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({});
      setStatus("success");

      if (variant === "landing") {
        if (typeof window !== "undefined") {
          window.location.assign(ONLINE_BOOKING_URL);
        }
      }
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  const formClassName = variant === "landing" ? "landing-contact-form" : "contact-page-form";

  if (status === "success" && variant === "home") {
    return (
      <div className={homeStyles.success} role="status">
        <Check aria-hidden="true" />
        <h3 className={homeStyles.heading}>Thank you!</h3>
        <p>We&apos;ll be in touch with you shortly. To pick a time now, you can also book online.</p>
        <a className={homeStyles.book} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Book Online
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    );
  }

  if (status === "success" && variant !== "landing") {
    return (
      <div className={formClassName}>
        <p className="form-success-message">Thank you! We&apos;ll be in touch with you shortly.</p>
      </div>
    );
  }

  const bookNowButton = (
    <a className="form-book-now-button" href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
      Book Now
    </a>
  );

  const submitButton = (
    <button
      className={variant === "landing" ? "landing-form-submit-btn" : undefined}
      type="submit"
      disabled={status === "submitting"}
    >
      {status === "submitting" ? "Sending..." : variant === "landing" ? "Request an Appointment" : "Send Message"}
    </button>
  );

  if (variant === "home") {
    return (
      <form className={homeStyles.form} onSubmit={handleSubmit} noValidate>
        <h3 className={homeStyles.heading}>Send us a message</h3>
        <p className={homeStyles.intro}>Fields marked * are required.</p>
        <label className={homeStyles.field}>
          <span>Full name *</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        {errors.name ? <p className={homeStyles.error}>{errors.name}</p> : null}
        <div className={homeStyles.row}>
          <div className={homeStyles.field}>
            <label className={homeStyles.field}>
              <span>Email *</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={errors.email ? true : undefined}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            {errors.email ? <p className={homeStyles.error}>{errors.email}</p> : null}
          </div>
          <div className={homeStyles.field}>
            <label className={homeStyles.field}>
              <span>Phone *</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="(941) 000-0000"
                aria-invalid={errors.phone ? true : undefined}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
            {errors.phone ? <p className={homeStyles.error}>{errors.phone}</p> : null}
          </div>
        </div>
        <label className={homeStyles.field}>
          <span>Treatment of interest</span>
          <ServiceSelect defaultValue="" />
        </label>
        <label className={homeStyles.field}>
          <span>Message</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Questions, goals or a good time to reach you"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
        {status === "error" ? <p className={homeStyles.error}>Something went wrong. Please try again or call us at {PHONE_DISPLAY}.</p> : null}
        <div className={homeStyles.actions}>
          <button className={homeStyles.submit} type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
          <a className={homeStyles.book} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book Online
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </form>
    );
  }

  if (variant === "landing") {
    return (
      <form className={formClassName} onSubmit={handleSubmit} noValidate>
        <input type="text" name="name" placeholder="Enter Name *" aria-label="Name" value={name} onChange={(event) => setName(event.target.value)} />
        {errors.name ? <p className="form-field-error">{errors.name}</p> : null}
        <input type="email" name="email" placeholder="Enter Email *" aria-label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        {errors.email ? <p className="form-field-error">{errors.email}</p> : null}
        <input type="tel" name="phone" placeholder="Enter Number *" aria-label="Phone number" value={phone} onChange={(event) => setPhone(event.target.value)} />
        {errors.phone ? <p className="form-field-error">{errors.phone}</p> : null}
        <textarea name="message" placeholder="Enter message" aria-label="Message" rows={5} value={message} onChange={(event) => setMessage(event.target.value)} />
        {status === "error" ? <p className="form-error-message">Something went wrong. Please try again or call us at (941) 923-8990.</p> : null}
        <div className="form-button-row">{submitButton}</div>
      </form>
    );
  }

  return (
    <form className={formClassName} onSubmit={handleSubmit} noValidate>
      <input type="text" name="name" placeholder="Name" aria-label="Name" value={name} onChange={(event) => setName(event.target.value)} />
      {errors.name ? <p className="form-field-error">{errors.name}</p> : null}
      <input type="email" name="email" placeholder="Email" aria-label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      {errors.email ? <p className="form-field-error">{errors.email}</p> : null}
      <input type="tel" name="phone" placeholder="Phone" aria-label="Phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
      {errors.phone ? <p className="form-field-error">{errors.phone}</p> : null}
      <Suspense fallback={<ServiceSelect defaultValue="" />}>
        <ServiceSelectFromQuery />
      </Suspense>
      <textarea
        name="message"
        placeholder="Additional questions or comments"
        aria-label="Additional questions or comments"
        rows={9}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      {status === "error" ? <p className="form-error-message">Something went wrong. Please try again or call us at {PHONE_DISPLAY}.</p> : null}
      <div className="form-button-row">
        {submitButton}
        {bookNowButton}
      </div>
    </form>
  );
}
