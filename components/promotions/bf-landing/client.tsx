"use client";

import { FormEvent, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { trackEvent, trackLead } from "@/lib/analytics";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { BF_OFFER_CODE, BF_RESERVE_ID, BF_SOURCE, GLO2_SINGLE_REGULAR, offerById } from "@/lib/data/blackFriday2026";
import { formatUsPhoneE164, submitLeadPayload } from "@/lib/submitLead";
import { displayFont } from "@/lib/fonts";
import noir from "@/components/promotions/noir/Noir.module.css";
import styles from "./BfLanding.module.css";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth-scrolls to an on-page anchor; otherwise a normal link. Tracks the click either way. */
export function BfCta({ href, variant, className, children }: { href: string; variant: string; className: string; children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent("select_content", { content_type: "bf_landing_cta", item_id: pathname, variant });
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };
  return <a href={href} className={className} onClick={onClick}>{children}</a>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validUsPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return (digits.startsWith("1") && digits.length >= 11 ? digits.slice(1) : digits).length >= 10;
}
type Errors = { first?: string; phone?: string; email?: string };

const glo2Price = offerById("glo2facial").nonmember ?? 499;

/**
 * Short "Reserve" form for ad landing pages. Same submission path and payload keys as the
 * /black-friday request form (submitLeadPayload → Speed to Lead webhook, Offer Code BF2026,
 * which hands the lead to Black Friday Instant Reply). The lead conversion fires only after
 * Make confirms, through trackLead.
 */
export function BfReserveForm({ treatment }: { treatment: "Glo2Facial" | null }) {
  const pathname = usePathname() ?? "";
  const [first, setFirst] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [announce, setAnnounce] = useState("");
  const busy = useRef(false);

  const isGlo2 = treatment === "Glo2Facial";
  const title = isGlo2 ? `Reserve My $${glo2Price} Glo2Facial Package` : "Reserve Your Black Friday Price";
  const submitLabel = isGlo2 ? `Reserve My $${glo2Price} Glo2Facial Package` : "Reserve My Price";

  function validate(): Errors {
    const next: Errors = {};
    if (!first.trim()) next.first = "Please enter your first name.";
    if (!phone.trim()) next.phone = "Please enter your mobile phone.";
    else if (!validUsPhone(phone)) next.phone = "Please enter a valid US phone number.";
    if (!email.trim()) next.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = "Please enter a valid email address.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || honeypot || status === "success") return;
    const next = validate();
    setErrors(next);
    const keys = Object.keys(next) as (keyof Errors)[];
    if (keys.length) {
      setAnnounce(keys.map((k) => next[k]).join(" "));
      document.getElementById(`bfr-${keys[0]}`)?.focus();
      return;
    }
    busy.current = true;
    setStatus("submitting");
    setAnnounce("Sending your request…");
    try {
      const response = await submitLeadPayload({
        Name: first.trim(),
        Email: email.trim(),
        Phone: formatUsPhoneE164(phone),
        Source: BF_SOURCE,
        Status: "New",
        "Offer Code": BF_OFFER_CODE,
        "Treatment Interest": treatment ?? "Black Friday specials",
        Message: `Reserve request from ${pathname}`,
        "SMS Consent": smsConsent,
        "Email Consent": emailConsent,
        "SMS Sent Status": smsConsent ? "Pending" : "Not Requested",
        "Email Sent Status": "Pending",
        "Page URL": window.location.href,
        "Landing URL": pathname,
        "Lead Created At": new Date().toISOString(),
      });
      trackLead(response);
      setStatus("success");
      setAnnounce(`You're on the list, ${first.trim()}! We'll call you shortly to reserve your Black Friday price.`);
    } catch {
      setStatus("error");
      setAnnounce(`Something went wrong. Please call ${PHONE_DISPLAY} and we'll help right away.`);
    } finally {
      busy.current = false;
    }
  }

  const live = <p className={styles.srOnly} aria-live="polite" role="status">{announce}</p>;
  const phoneLink = <a href={`tel:+1${PHONE_TEL}`}>{PHONE_DISPLAY}</a>;

  return (
    <div className={`${styles.card} ${displayFont.variable}`}>
      {live}
      {status === "success" ? (
        <div className={styles.success}>
          <span className={styles.check} aria-hidden="true"><Check size={26} strokeWidth={2.4} /></span>
          <h2 className={`${noir.display} ${styles.formTitle}`}>You&apos;re on the list, {first.trim()}!</h2>
          <p className={styles.formSub}>We&apos;ll call you shortly to reserve your Black Friday price. Want it faster? Call {phoneLink}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-label={title}>
          <h2 className={`${noir.display} ${styles.formTitle}`}>{title}</h2>
          <p className={styles.formSub}>Leave your details and our Sarasota team will call you to lock in the price. No payment now.</p>
          {isGlo2 ? <p className={styles.formValue}>4 Glo2Facials · regularly ${GLO2_SINGLE_REGULAR * 4}</p> : null}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="bfr-website">Leave this blank</label>
            <input id="bfr-website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} autoComplete="off" tabIndex={-1} />
          </div>
          {([
            ["first", "First name", "text", "given-name", first, setFirst, undefined],
            ["phone", "Mobile phone", "tel", "tel", phone, setPhone, "tel"],
            ["email", "Email", "email", "email", email, setEmail, "email"],
          ] as const).map(([id, label, type, auto, value, set, inputMode]) => (
            <div className={styles.field} key={id}>
              <label className={styles.label} htmlFor={`bfr-${id}`}>{label} <span aria-hidden="true">*</span></label>
              <input id={`bfr-${id}`} name={id} type={type} autoComplete={auto} inputMode={inputMode} value={value}
                onChange={(e) => (set as (v: string) => void)(e.target.value)}
                className={`${styles.input} ${errors[id] ? styles.inputError : ""}`} aria-required="true"
                aria-invalid={Boolean(errors[id])} aria-describedby={errors[id] ? `bfr-${id}-error` : undefined} />
              {errors[id] ? <p id={`bfr-${id}-error`} className={styles.fieldError}>{errors[id]}</p> : null}
            </div>
          ))}
          <label className={styles.consent}>
            <input type="checkbox" checked={emailConsent} onChange={(e) => setEmailConsent(e.target.checked)} />
            <span>Yes, email me Black Friday offers and reminders from Harmony Med Spa. Unsubscribe anytime.</span>
          </label>
          <label className={styles.consent}>
            <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} />
            <span>Yes, Harmony Med Spa may text me about my request and Black Friday offers. Msg &amp; data rates may apply. Reply STOP to opt out. Consent is not a condition of purchase.</span>
          </label>
          <button type="submit" className={`${noir.btnPrimary} ${styles.submit}`} disabled={status === "submitting"} aria-busy={status === "submitting"}>
            {status === "submitting" ? <><Loader2 size={18} className={styles.spin} aria-hidden="true" /> Sending…</> : submitLabel}
          </button>
          {status === "error" ? <p className={styles.formError} role="alert">Something went wrong. Please call {phoneLink} and we&apos;ll help right away.</p> : null}
        </form>
      )}
    </div>
  );
}

/** Section wrapper for the Reserve form (Noir band, anchor for the CTAs and the call bar). */
export function BfReserveSection({ treatment }: { treatment: "Glo2Facial" | null }) {
  return (
    <section id={BF_RESERVE_ID} className={`${noir.noir} ${styles.reserveBand}`} aria-label="Reserve your Black Friday price">
      <BfReserveForm treatment={treatment} />
    </section>
  );
}
