"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/mj8bga3ohgj6l7l0fe35f1mqktlfob7a";
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

export default function ContactForm({ variant }: { variant: "home" | "page" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(name, email, phone);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    const params = new URLSearchParams(window.location.search);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name.trim(),
          Email: email.trim(),
          Phone: phone.trim(),
          Message: message.trim(),
          Source: "Website Contact Form",
          Status: "New",
          "Treatment Interest": "",
          "UTM Source": params.get("utm_source") ?? "",
          "UTM Campaign": params.get("utm_campaign") ?? "",
          "UTM Medium": params.get("utm_medium") ?? "",
          "Page URL": window.location.href,
          "Lead Created At": new Date().toISOString(),
          "Email Sent Status": "Pending",
          "SMS Sent Status": "Pending"
        })
      });

      if (!response.ok) {
        throw new Error("Webhook request failed");
      }

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const formClassName = variant === "home" ? "contact-form" : "contact-page-form";

  if (status === "success") {
    return (
      <div className={formClassName}>
        {variant === "home" ? <h2>let&apos;s chat!</h2> : null}
        <p className="form-success-message">Thank you! We&apos;ll be in touch with you shortly.</p>
      </div>
    );
  }

  const bookNowButton = (
    <Link className={variant === "home" ? "line-button" : "form-book-now-button"} href="/book-now">
      Book Now
    </Link>
  );

  const submitButton = (
    <button className={variant === "home" ? "line-button" : undefined} type="submit" disabled={status === "submitting"}>
      {status === "submitting" ? "Sending..." : "Send Message"}
    </button>
  );

  if (variant === "home") {
    return (
      <form className={formClassName} onSubmit={handleSubmit} noValidate>
        <h2>let&apos;s chat!</h2>
        <label>
          <span>name</span>
          <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        {errors.name ? <p className="form-field-error">{errors.name}</p> : null}
        <div className="split">
          <label>
            <span>email</span>
            <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            <span>phone</span>
            <input type="tel" name="phone" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </label>
        </div>
        {errors.email ? <p className="form-field-error">{errors.email}</p> : null}
        {errors.phone ? <p className="form-field-error">{errors.phone}</p> : null}
        <label>
          <span>message</span>
          <textarea name="message" rows={4} value={message} onChange={(event) => setMessage(event.target.value)} />
        </label>
        {status === "error" ? <p className="form-error-message">Something went wrong. Please try again or call us at (941) 306-3696.</p> : null}
        <div className="form-button-row">
          {submitButton}
          {bookNowButton}
        </div>
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
      <textarea
        name="message"
        placeholder="Message"
        aria-label="Message"
        rows={9}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      {status === "error" ? <p className="form-error-message">Something went wrong. Please try again or call us at (941) 306-3696.</p> : null}
      <div className="form-button-row">
        {submitButton}
        {bookNowButton}
      </div>
    </form>
  );
}
