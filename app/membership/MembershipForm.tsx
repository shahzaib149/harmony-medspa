"use client";

import { FormEvent, useState } from "react";

const WEBHOOK_URL = "https://hook.us2.make.com/mj8bga3ohgj6l7l0fe35f1mqktlfob7a";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";
type FormKind = "pricing" | "membership";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
};

const formCopy: Record<FormKind, { title: string; source: string; interest: string }> = {
  pricing: {
    title: "contact us for pricing",
    source: "Membership Pricing Form",
    interest: "Membership Pricing"
  },
  membership: {
    title: "request a membership",
    source: "Membership Request Form",
    interest: "Membership"
  }
};

function validate(name: string, email: string, phone: string) {
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

export default function MembershipForm({ kind }: { kind: FormKind }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const copy = formCopy[kind];

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
          Message: copy.title,
          Source: copy.source,
          Status: "New",
          "Treatment Interest": copy.interest,
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
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="membership-form-card">
        <h2>{copy.title}</h2>
        <p>A staff member will respond within 24 hours</p>
        <p className="membership-form-success">Thank you! We&apos;ll be in touch with you shortly.</p>
      </div>
    );
  }

  return (
    <form className="membership-form-card" onSubmit={handleSubmit} noValidate>
      <h2>{copy.title}</h2>
      <p>A staff member will respond within 24 hours</p>

      <input
        type="text"
        name={`${kind}-name`}
        placeholder="Enter Name *"
        aria-label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {errors.name ? <span className="membership-form-error">{errors.name}</span> : null}

      <div className="membership-form-split">
        <input
          type="email"
          name={`${kind}-email`}
          placeholder="Enter Email *"
          aria-label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="tel"
          name={`${kind}-phone`}
          placeholder="Enter Phone *"
          aria-label="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>
      {errors.email ? <span className="membership-form-error">{errors.email}</span> : null}
      {errors.phone ? <span className="membership-form-error">{errors.phone}</span> : null}
      {status === "error" ? <span className="membership-form-error">Something went wrong. Please try again or call us.</span> : null}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "sending..." : "submit"}
      </button>
    </form>
  );
}
