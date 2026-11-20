"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { trackGiftCardRequest } from "@/lib/analytics";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { GIFT_CARD_BONUS_MINIMUM, GIFT_CARD_BONUS_RATE, formatUsd, giftCardBonusSmallPrint } from "@/lib/data/blackFriday2026";
import { clientBlackFridayPhase } from "@/lib/promotions/blackFriday";
import { formatUsPhoneE164, submitGiftCardRequest } from "@/lib/submitLead";
import { GiftCardArt } from "@/components/promotions/noir/NoirParts";
import noir from "@/components/promotions/noir/Noir.module.css";
import styles from "./GiftCards.module.css";

const DRAFT_KEY = "harmony_giftcard_draft_v1";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRIVACY =
  "Giving the gift of wellness? We'll help you keep it a surprise! Harmony Med Spa will only contact the person submitting this request and will not contact the gift card recipient. We request both parties' information to prepare your gift card accurately and process your request efficiently.";

type Method = "Phone Call" | "SMS";
type Draft = {
  rFirst: string; rLast: string; rEmail: string; rPhone: string;
  pFirst: string; pLast: string; pEmail: string; pPhone: string;
  amount: string; method: Method | "";
};
type FieldKey = Exclude<keyof Draft, "method"> | "method";
const EMPTY: Draft = { rFirst: "", rLast: "", rEmail: "", rPhone: "", pFirst: "", pLast: "", pEmail: "", pPhone: "", amount: "", method: "" };

function validUsPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return (digits.startsWith("1") && digits.length >= 11 ? digits.slice(1) : digits).length >= 10;
}
/** "1,250.5" → 1250.5; anything that isn't a positive amount with at most 2 decimals → NaN. */
function parseAmount(value: string): number {
  const clean = value.replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(clean)) return NaN;
  return Number(clean);
}
export function giftCardBonus(amount: number): number {
  return amount >= GIFT_CARD_BONUS_MINIMUM ? Math.round(amount * GIFT_CARD_BONUS_RATE * 100) / 100 : 0;
}

function useAnimated(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { from.current = value; const f = requestAnimationFrame(() => setShown(value)); return () => cancelAnimationFrame(f); }
    const begin = from.current, start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / 380, 1);
      setShown(begin + (value - begin) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(step); else from.current = value;
    };
    frame = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(frame); from.current = value; };
  }, [value]);
  return shown;
}

const LABELS: Record<FieldKey, string> = {
  rFirst: "Recipient first name", rLast: "Recipient last name", rEmail: "Recipient email address", rPhone: "Recipient phone number",
  pFirst: "Your first name", pLast: "Your last name", pEmail: "Your email address", pPhone: "Your phone number",
  amount: "Gift card amount", method: "Preferred method of contact",
};

export default function GiftCardRequest() {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [announce, setAnnounce] = useState("");
  const [step, setStep] = useState<"to" | "from" | "details">("to");
  const [done, setDone] = useState<{ first: string; method: Method; amount: number; bonus: number } | null>(null);
  const restored = useRef(false);
  const busy = useRef(false);

  // Restore the draft (e.g. after visiting /pricing), then autosave every change.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Draft>;
        setDraft({ ...EMPTY, ...parsed });
      }
    } catch { /* no saved draft */ }
    restored.current = true;
  }, []);
  useEffect(() => {
    if (!restored.current || status === "success") return;
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* storage unavailable */ }
  }, [draft, status]);

  const set = (key: keyof Draft) => (value: string) => setDraft((current) => ({ ...current, [key]: value }));
  const amount = parseAmount(draft.amount);
  const validAmount = Number.isFinite(amount) && amount > 0;
  const bonus = validAmount ? giftCardBonus(amount) : 0;
  const shownAmount = useAnimated(validAmount ? amount : 0);
  const shownBonus = useAnimated(bonus);

  function validate() {
    const next: Partial<Record<FieldKey, string>> = {};
    (["rFirst", "rLast", "pFirst", "pLast"] as const).forEach((key) => { if (!draft[key].trim()) next[key] = `Please enter ${LABELS[key].toLowerCase()}.`; });
    (["rEmail", "pEmail"] as const).forEach((key) => {
      if (!draft[key].trim()) next[key] = `Please enter ${LABELS[key].toLowerCase()}.`;
      else if (!EMAIL_PATTERN.test(draft[key].trim())) next[key] = "Please enter a valid email address.";
    });
    (["rPhone", "pPhone"] as const).forEach((key) => {
      if (!draft[key].trim()) next[key] = `Please enter ${LABELS[key].toLowerCase()}.`;
      else if (!validUsPhone(draft[key])) next[key] = "Please enter a valid US phone number.";
    });
    if (!draft.amount.trim()) next.amount = "Please enter a gift card amount.";
    else if (!validAmount) next.amount = "Please enter an amount greater than $0, in dollars and cents.";
    if (!draft.method) next.method = "Please choose how we should contact you.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || honeypot || status === "success") return;
    const next = validate();
    setErrors(next);
    const keys = Object.keys(next) as FieldKey[];
    if (keys.length) {
      setAnnounce(`Please fix ${keys.length} field${keys.length > 1 ? "s" : ""}: ${keys.map((k) => next[k]).join(" ")}`);
      document.getElementById(keys[0] === "method" ? "gc-method-phone" : `gc-${keys[0]}`)?.focus();
      return;
    }
    busy.current = true;
    setStatus("submitting");
    setAnnounce("Sending your gift card request…");
    const method = draft.method as Method;
    try {
      const response = await submitGiftCardRequest({
        "Recipient First Name": draft.rFirst.trim(),
        "Recipient Last Name": draft.rLast.trim(),
        "Recipient Email": draft.rEmail.trim(),
        "Recipient Phone": formatUsPhoneE164(draft.rPhone),
        "Purchaser First Name": draft.pFirst.trim(),
        "Purchaser Last Name": draft.pLast.trim(),
        "Purchaser Email": draft.pEmail.trim(),
        "Purchaser Phone": formatUsPhoneE164(draft.pPhone),
        "Gift Card Amount": amount,
        "Preferred Contact Method": method,
        "Page URL": window.location.href,
        Phase: clientBlackFridayPhase(),
        website: honeypot,
      });
      trackGiftCardRequest(response, amount);
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      setDone({ first: draft.pFirst.trim(), method, amount, bonus: clientBlackFridayPhase() === "public" ? bonus : 0 });
      setStatus("success");
      setAnnounce(`Thank you, ${draft.pFirst.trim()}! Your gift card request was received.`);
      document.getElementById("request")?.scrollIntoView({ block: "start" });
    } catch {
      setStatus("error");
      setAnnounce(`We couldn't send your request. Please call ${PHONE_DISPLAY}.`);
    } finally {
      busy.current = false;
    }
  }

  const live = <p className={styles.srOnly} role="status" aria-live="polite">{announce}</p>;

  const input = (key: Exclude<FieldKey, "method">, type: string, autoComplete: string, extra: Record<string, string> = {}) => (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={`gc-${key}`}>{LABELS[key].replace(/^(Recipient|Your) /, "").replace(/^./, (c) => c.toUpperCase())} <span aria-hidden="true" className={styles.req}>*</span></label>
      <input id={`gc-${key}`} className={`${styles.input} ${errors[key] ? styles.inputError : ""}`} type={type} autoComplete={autoComplete}
        value={draft[key]} onChange={(e) => set(key)(e.target.value)} aria-required="true" aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `gc-${key}-error` : undefined} {...extra} />
      {errors[key] ? <p id={`gc-${key}-error`} className={styles.fieldError}>{errors[key]}</p> : null}
    </div>
  );

  return (
    <div className={styles.experience}>
      {live}
      <div className={styles.left}>
        <p className={styles.eyebrow}>Gift Cards</p>
        <h1 className={styles.title}>Give the Gift of <em>Wellness</em></h1>
        <p className={styles.intro}>Treat someone you love to Harmony Med Spa. Choose any amount, and our Sarasota team will help you finalize your gift card and arrange secure payment.</p>
        <div className={styles.cardStage}>
          <GiftCardArt
            className={styles.liveCard}
            amount={<>{formatUsd(shownAmount).replace(/\.00$/, "")}</>}
            ribbon={bonus > 0 ? <span className={noir.giftRibbon} data-bf-show="public">+{formatUsd(bonus).replace(/\.00$/, "")} BONUS</span> : null}
          />
        </div>
        <div className={styles.privacy}>
          <LockKeyhole size={20} aria-hidden="true" className={styles.lock} />
          <p>{PRIVACY}</p>
        </div>
      </div>

      <div className={styles.right} id="request">
        {status === "success" && done ? (
          <div className={styles.panel}>
            <div className={styles.success}>
              <span className={styles.successCheck} aria-hidden="true"><Check size={28} strokeWidth={2.4} /></span>
              <h2 className={styles.successTitle}>Thank you, {done.first}!</h2>
              <p>We&apos;ll contact you by {done.method === "SMS" ? "text message" : "phone call"} to finalize your {formatUsd(done.amount)} gift card and arrange secure payment.</p>
              <p className={styles.successPrivacy}>We&apos;ll only ever contact you, never the gift recipient, so your surprise stays a surprise.</p>
              {done.bonus > 0 ? <p className={styles.successBonus}>Black Friday bonus: you&apos;ll receive {formatUsd(done.bonus)} in bonus promotional credit after payment, usable starting December 1, 2026.</p> : null}
              <p className={styles.successCall}>Questions? Call <a href={`tel:+1${PHONE_TEL}`}>{PHONE_DISPLAY}</a></p>
            </div>
          </div>
        ) : (
          <form className={styles.panel} onSubmit={onSubmit} noValidate aria-label="Gift card request">
            <ol className={styles.stepper} aria-label="Form sections">
              {([["to", "To"], ["from", "From"], ["details", "Details"]] as const).map(([id, label], i) => (
                <li key={id} className={step === id ? styles.stepOn : ""} aria-current={step === id ? "step" : undefined}>
                  <span className={styles.stepDot}>{i + 1}</span>{label}
                </li>
              ))}
            </ol>
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="gc-website">Leave this blank</label>
              <input id="gc-website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} autoComplete="off" tabIndex={-1} />
            </div>

            <fieldset className={styles.group} onFocus={() => setStep("to")}>
              <legend className={styles.legend}>To <span>Gift Card Recipient</span></legend>
              <div className={styles.row}>{input("rFirst", "text", "off")}{input("rLast", "text", "off")}</div>
              <div className={styles.row}>{input("rEmail", "email", "off", { inputMode: "email" })}{input("rPhone", "tel", "off", { inputMode: "tel" })}</div>
            </fieldset>

            <fieldset className={styles.group} onFocus={() => setStep("from")}>
              <legend className={styles.legend}>From <span>Gift Card Purchaser</span></legend>
              <div className={styles.row}>{input("pFirst", "text", "given-name")}{input("pLast", "text", "family-name")}</div>
              <div className={styles.row}>{input("pEmail", "email", "email", { inputMode: "email" })}{input("pPhone", "tel", "tel", { inputMode: "tel" })}</div>
            </fieldset>

            <fieldset className={styles.group} onFocus={() => setStep("details")}>
              <legend className={styles.legend}>Gift Card Details</legend>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="gc-amount">Gift Card Amount ($) <span aria-hidden="true" className={styles.req}>*</span></label>
                <div className={`${styles.money} ${errors.amount ? styles.inputError : ""}`}>
                  <span aria-hidden="true">$</span>
                  <input id="gc-amount" className={styles.moneyInput} type="text" inputMode="decimal" autoComplete="off" placeholder="250"
                    value={draft.amount} onChange={(e) => set("amount")(e.target.value.replace(/[^\d.,]/g, ""))}
                    onBlur={() => { if (validAmount) set("amount")(amount.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 })); }}
                    aria-required="true" aria-invalid={Boolean(errors.amount)} aria-describedby={`${errors.amount ? "gc-amount-error " : ""}gc-calc`} />
                </div>
                {errors.amount ? <p id="gc-amount-error" className={styles.fieldError}>{errors.amount}</p> : null}
              </div>

              <div id="gc-calc" className={styles.calc} data-bf-show="early public" aria-live="polite">
                {validAmount && amount >= GIFT_CARD_BONUS_MINIMUM ? (
                  <>
                    <p data-bf-show="public" className={styles.calcLine}>You&apos;ll receive <strong>{formatUsd(shownBonus)}</strong> in bonus promotional credit.</p>
                    <p data-bf-show="early" className={styles.calcLine}>Preview: purchase between Nov 27–30 to receive <strong>{formatUsd(shownBonus)}</strong> in bonus credit.</p>
                  </>
                ) : (
                  <p className={styles.calcLine}>A minimum gift card purchase of $100 is required to qualify for the Black Friday bonus.</p>
                )}
                <p className={styles.calcSmall}>{giftCardBonusSmallPrint}</p>
              </div>

              <div className={styles.field} role="radiogroup" aria-labelledby="gc-method-label" aria-describedby={errors.method ? "gc-method-error" : undefined}>
                <span id="gc-method-label" className={styles.label}>Preferred Method of Contact <span aria-hidden="true" className={styles.req}>*</span></span>
                <div className={styles.segmented}>
                  {(["Phone Call", "SMS"] as const).map((option) => (
                    <label key={option} className={`${styles.segment} ${draft.method === option ? styles.segmentOn : ""}`}>
                      <input id={option === "Phone Call" ? "gc-method-phone" : "gc-method-sms"} type="radio" name="method" value={option}
                        checked={draft.method === option} onChange={() => set("method")(option)} />
                      {option}
                    </label>
                  ))}
                </div>
                {errors.method ? <p id="gc-method-error" className={styles.fieldError}>{errors.method}</p> : null}
              </div>

              <a href="/pricing" target="_blank" rel="noopener" className={styles.pricingLink}>View Services &amp; Pricing <ArrowUpRight size={16} aria-hidden="true" /></a>
            </fieldset>

            <button type="submit" className={styles.submit} disabled={status === "submitting"} aria-busy={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Request My Gift Card"}
            </button>
            {status === "error" ? <p className={styles.formError} role="alert">We couldn&apos;t send your request. Please call <a href={`tel:+1${PHONE_TEL}`}>{PHONE_DISPLAY}</a> and we&apos;ll help directly.</p> : null}
            <p className={styles.note}>This is a request, not an instant purchase. We&apos;ll contact you to arrange secure payment.</p>
          </form>
        )}
      </div>
    </div>
  );
}
