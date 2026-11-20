"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { CalendarDays, Check, MessageSquare, Phone, Search } from "lucide-react";
import { trackLead, trackPurchaseLinkClick } from "@/lib/analytics";
import { ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import {
  BF_OFFER_CODE, BF_SOURCE, TEXT_HREF, deviceGroups, formatUsd, memberStatusOptions, offerById,
  treatmentChips, type TreatmentChip,
} from "@/lib/data/blackFriday2026";
import { nextBoundary } from "@/lib/promotions/blackFriday";
import { useBlackFridayPhase } from "@/lib/promotions/useBlackFridayPhase";
import { formatUsPhoneE164, submitLeadPayload } from "@/lib/submitLead";
import noir from "@/components/promotions/noir/Noir.module.css";
import styles from "./BlackFriday.module.css";

const SELECT_EVENT = "harmony:bf-select";
const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
}

/* ---------- Countdown ---------- */

const noSubscription = () => () => {};
function subscribeSecond(onChange: () => void) {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
}
const nowSecond = () => Math.floor(Date.now() / 1000);

const COUNTDOWN_LABEL = { pre: "Early access opens in", early: "Public sale opens in", public: "Sale ends in", ended: "" } as const;

/** Live countdown to the next phase boundary. The slot keeps its width, so nothing shifts. */
export function PhaseCountdown() {
  const phase = useBlackFridayPhase();
  const mounted = useSyncExternalStore(noSubscription, () => true, () => false);
  const now = useSyncExternalStore(subscribeSecond, nowSecond, () => 0);
  const target = nextBoundary(phase);
  if (!target) return null;
  let text = "";
  if (mounted && now) {
    const left = Math.max(0, Math.floor(target / 1000) - now);
    const d = Math.floor(left / 86400), h = Math.floor((left % 86400) / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
    text = `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  }
  return (
    <span className={styles.countdown}>
      <span className={styles.countdownDot} aria-hidden="true" />
      <span>{COUNTDOWN_LABEL[phase]}</span>
      <span className={styles.countdownTime} role="timer" aria-live="off">{text}</span>
    </span>
  );
}

/* ---------- Category navigator with scroll-spy ---------- */

export function CategoryNav({ items }: { items: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-140px 0px -55% 0px", threshold: 0 });
    items.forEach((item) => { const el = document.getElementById(item.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);
  useEffect(() => {
    const chip = listRef.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    const list = listRef.current;
    if (chip && list) list.scrollTo({ left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2, behavior: reduceMotion() ? "auto" : "smooth" });
  }, [active]);
  return (
    <nav className={styles.catNav} aria-label="Black Friday categories">
      <div className={styles.catList} ref={listRef}>
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`} data-chip={item.id}
            className={`${styles.catChip} ${active === item.id ? styles.catChipActive : ""}`}
            aria-current={active === item.id ? "true" : undefined}
            onClick={(event) => { event.preventDefault(); setActive(item.id); scrollToId(item.id); history.replaceState(null, "", `${location.pathname}${location.search}#${item.id}`); }}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ---------- Offer actions: Call / Text / Book Online ---------- */

/**
 * There are no online purchase links: patients claim an offer by calling, texting or booking.
 * tel: taps are tracked sitewide by PhoneClickTracker; Text and Book clicks are tracked here.
 */
export function OfferActions({ offerId, compact = false, tone = "light" }: { offerId: string; interest?: TreatmentChip; compact?: boolean; tone?: "light" | "dark" }) {
  const offer = offerById(offerId);
  return (
    <div className={`${styles.offerActions} ${compact ? styles.offerActionsCompact : ""} ${tone === "dark" ? styles.offerActionsDark : ""}`}>
      <a href={`tel:+1${PHONE_TEL}`} className={styles.ctaCall}>
        <Phone size={16} aria-hidden="true" /> Call {PHONE_DISPLAY}
      </a>
      <a href={TEXT_HREF} className={styles.ctaGhost} onClick={() => trackPurchaseLinkClick(`${offer.id}:text`, TEXT_HREF)}>
        <MessageSquare size={16} aria-hidden="true" /> Text Us
      </a>
      <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaGhost}
        onClick={() => trackPurchaseLinkClick(`${offer.id}:book`, ONLINE_BOOKING_URL)}>
        <CalendarDays size={16} aria-hidden="true" /> Book Online
      </a>
    </div>
  );
}

/** Call / Text / Book Online for the light pricing cards. The wrapper class styles the buttons. */
export function ContactActions({ id, className }: { id: string; className: string }) {
  return (
    <div className={className}>
      <a href={`tel:+1${PHONE_TEL}`}><Phone size={15} aria-hidden="true" /> Call {PHONE_DISPLAY}</a>
      <a href={TEXT_HREF} onClick={() => trackPurchaseLinkClick(`${id}:text`, TEXT_HREF)}><MessageSquare size={15} aria-hidden="true" /> Text Us</a>
      <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackPurchaseLinkClick(`${id}:book`, ONLINE_BOOKING_URL)}>
        <CalendarDays size={15} aria-hidden="true" /> Book Online
      </a>
    </div>
  );
}

/** A tracked outbound link (e.g. the Mailchimp early-access signup), opened in a new tab. */
export function TrackedLink({ id, href, className, children }: { id: string; href: string; className: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener" className={className} onClick={() => trackPurchaseLinkClick(id, href)}>{children}</a>;
}

/* ---------- Animated price ---------- */

function useAnimatedNumber(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduceMotion()) { from.current = value; const f = requestAnimationFrame(() => setShown(value)); return () => cancelAnimationFrame(f); }
    const start = performance.now(), begin = from.current;
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / 520, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(begin + (value - begin) * eased);
      if (t < 1) frame = requestAnimationFrame(step); else from.current = value;
    };
    frame = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(frame); from.current = value; };
  }, [value]);
  return shown;
}

function Money({ value, className }: { value: number; className?: string }) {
  const shown = useAnimatedNumber(value);
  return <span className={className} aria-label={formatUsd(value)}><span aria-hidden="true">{formatUsd(shown)}</span></span>;
}

/* ---------- Sculptra 2 / 4 / 6 vials ---------- */

const SCULPTRA = [
  { vials: 2, id: "sculptra-2", off: "$250 off" },
  { vials: 4, id: "sculptra-4", off: "$600 off" },
  { vials: 6, id: "sculptra-6", off: "$1,000 off" },
] as const;

export function SculptraSelector() {
  const [index, setIndex] = useState(0);
  const choice = SCULPTRA[index];
  const offer = offerById(choice.id);
  const provisional = offer.provisional || offer.nonmember === null || offer.member === null;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (next: number) => { const i = (next + SCULPTRA.length) % SCULPTRA.length; setIndex(i); refs.current[i]?.focus(); };
  return (
    <div className={styles.sculptra}>
      <div className={styles.segmented} role="radiogroup" aria-label="Sculptra package size">
        {SCULPTRA.map((option, i) => (
          <button key={option.id} ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={index === i}
            tabIndex={index === i ? 0 : -1} className={`${styles.segment} ${index === i ? styles.segmentOn : ""}`}
            onClick={() => setIndex(i)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); move(i + 1); }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); move(i - 1); }
            }}>
            {option.vials} vials
          </button>
        ))}
      </div>
      <p className={styles.sculptraOff}>{choice.off} · {offer.name.replace("Sculptra: ", "")}</p>
      {provisional ? (
        <div className={styles.prices}>
          <div className={styles.priceCol}><span className={styles.priceLabel}>Nonmember</span><span className={styles.priceNon}>{offer.nonmemberLabel}</span></div>
          <div className={styles.priceCol}><span className={styles.priceLabel}>Member</span><span className={styles.priceMember}>{offer.memberLabel}</span></div>
          <span className={styles.saveChip}>Package total confirmed when you call</span>
        </div>
      ) : (
        <PriceBlock nonmember={offer.nonmember ?? 0} member={offer.member ?? 0} animated />
      )}
      <p className={styles.terms}>{offer.terms}</p>
    </div>
  );
}

/** Nonmember (ivory) and member (gold) prices with a computed "Members save" chip. */
export function PriceBlock({ nonmember, member, animated = false }: { nonmember: number; member: number; animated?: boolean }) {
  const save = Math.round((nonmember - member) * 100) / 100;
  return (
    <div className={styles.prices}>
      <div className={styles.priceCol}>
        <span className={styles.priceLabel}>Nonmember</span>
        {animated ? <Money value={nonmember} className={styles.priceNon} /> : <span className={styles.priceNon}>{formatUsd(nonmember)}</span>}
      </div>
      <div className={styles.priceCol}>
        <span className={styles.priceLabel}>Member</span>
        {animated ? <Money value={member} className={styles.priceMember} /> : <span className={styles.priceMember}>{formatUsd(member)}</span>}
      </div>
      {save > 0 ? (
        <span className={styles.saveChip}>Members save {animated ? <Money value={save} /> : formatUsd(save)}</span>
      ) : null}
    </div>
  );
}

/* ---------- Devices & laser explorer ---------- */

export function DeviceExplorer() {
  const [tab, setTab] = useState(deviceGroups[0].id);
  const [query, setQuery] = useState("");
  const group = deviceGroups.find((item) => item.id === tab) ?? deviceGroups[0];
  const q = query.trim().toLowerCase();
  const rows = useMemo(() => group.rows.filter((row) => !q || row.area.toLowerCase().includes(q)), [group, q]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusTab = (i: number) => { const n = (i + deviceGroups.length) % deviceGroups.length; setTab(deviceGroups[n].id); tabRefs.current[n]?.focus(); };
  return (
    <div className={styles.devices}>
      <div className={styles.deviceTabs} role="tablist" aria-label="Device and laser packages">
        {deviceGroups.map((item, i) => (
          <button key={item.id} ref={(el) => { tabRefs.current[i] = el; }} id={`tab-${item.id}`} type="button" role="tab"
            aria-selected={tab === item.id} aria-controls="device-panel" tabIndex={tab === item.id ? 0 : -1}
            className={`${styles.deviceTab} ${tab === item.id ? styles.deviceTabOn : ""}`}
            onClick={() => setTab(item.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); focusTab(i + 1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); focusTab(i - 1); }
            }}>
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.deviceTools}>
        <label className={styles.searchLabel} htmlFor="device-search">Find your treatment area</label>
        <div className={styles.searchBox}>
          <Search size={17} aria-hidden="true" />
          <input id="device-search" type="search" className={styles.searchInput} placeholder="e.g. Face, Neck, Underarms" value={query}
            onChange={(event) => setQuery(event.target.value)} autoComplete="off" />
        </div>
        <p className={styles.sessionsNote} aria-live="polite">
          {group.sessions} sessions per package · {rows.length} {rows.length === 1 ? "area" : "areas"}{q ? ` matching “${query.trim()}”` : ""}
        </p>
      </div>
      <div id="device-panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} className={styles.devicePanel}>
        {rows.length ? (
          <table className={styles.deviceTable}>
            <caption className={styles.srOnly}>{group.label}: package totals for {group.sessions} sessions</caption>
            <thead>
              <tr><th scope="col">Treatment area</th><th scope="col">Sessions</th><th scope="col">Nonmember</th><th scope="col">Member</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.area}>
                  <th scope="row">{row.area}</th>
                  <td data-label="Sessions">{group.sessions}</td>
                  <td data-label="Nonmember" className={styles.cellNon}>{formatUsd(row.nonmember)}</td>
                  <td data-label="Member" className={styles.cellMember}>{formatUsd(row.member)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noResults}>No {group.label} areas match “{query.trim()}”. Try another tab, or call {PHONE_DISPLAY}.</p>
        )}
      </div>
      <OfferActions offerId="devices" tone="dark" />
    </div>
  );
}

/* ---------- Lead form ---------- */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Errors = Partial<Record<"first" | "last" | "phone" | "email", string>>;

function validUsPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return (digits.startsWith("1") && digits.length >= 11 ? digits.slice(1) : digits).length >= 10;
}

export function BlackFridayLeadForm() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [chips, setChips] = useState<TreatmentChip[]>([]);
  const [member, setMember] = useState<(typeof memberStatusOptions)[number] | "">("");
  const [consent, setConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [announce, setAnnounce] = useState("");
  const busy = useRef(false);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      if ((treatmentChips as readonly string[]).includes(value)) {
        setChips((current) => current.includes(value as TreatmentChip) ? current : [...current, value as TreatmentChip]);
        setAnnounce(`${value} added to your request.`);
      }
    };
    window.addEventListener(SELECT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_EVENT, onSelect);
  }, []);

  const toggle = (chip: TreatmentChip) => setChips((current) => current.includes(chip) ? current.filter((c) => c !== chip) : [...current, chip]);

  function validate(): Errors {
    const next: Errors = {};
    if (!first.trim()) next.first = "Please enter your first name.";
    if (!last.trim()) next.last = "Please enter your last name.";
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
    if (Object.keys(next).length) {
      setAnnounce(`Please fix ${Object.keys(next).length} field${Object.keys(next).length > 1 ? "s" : ""}: ${Object.values(next).join(" ")}`);
      document.getElementById(`bf-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    busy.current = true;
    setStatus("submitting");
    setAnnounce("Sending your request…");
    try {
      const response = await submitLeadPayload({
        Name: `${first.trim()} ${last.trim()}`,
        Email: email.trim(),
        Phone: formatUsPhoneE164(phone),
        Source: BF_SOURCE,
        Status: "New",
        "Offer Code": BF_OFFER_CODE,
        "Treatment Interest": chips.join(", "),
        Message: `Member status: ${member || "Not answered"}`,
        // Kept separate, per Harmony's handoff: email and promotional SMS consent are recorded independently.
        "SMS Consent": consent,
        "Email Consent": emailConsent,
        "SMS Sent Status": consent ? "Pending" : "Not Requested",
        "Email Sent Status": "Pending",
        "Page URL": window.location.href,
        "Landing URL": "/black-friday",
        "Lead Created At": new Date().toISOString(),
      });
      trackLead(response);
      setStatus("success");
      setAnnounce("Thank you. Our team will contact you shortly to help you claim your Black Friday offer.");
    } catch {
      setStatus("error");
      setAnnounce(`We couldn't send your request. Please call ${PHONE_DISPLAY}.`);
    } finally {
      busy.current = false;
    }
  }

  const live = <p className={styles.srOnly} aria-live="polite" role="status">{announce}</p>;

  if (status === "success") {
    return (
      <div className={styles.formSuccess}>
        {live}
        <span className={styles.successCheck} aria-hidden="true"><Check size={30} strokeWidth={2.4} /></span>
        <h3 className={`${noir.display} ${styles.successTitle}`}>Thank you.</h3>
        <p className={noir.lead}>Our team will contact you shortly to help you claim your Black Friday offer.</p>
        <p className={styles.successPhone}>Ready now? Call or text <a href={`tel:+1${PHONE_TEL}`}>{PHONE_DISPLAY}</a></p>
      </div>
    );
  }

  const field = (id: keyof Errors, label: string, input: ReactNode) => (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={`bf-${id}`}>{label} <span aria-hidden="true" className={styles.req}>*</span></label>
      {input}
      {errors[id] ? <p id={`bf-${id}-error`} className={styles.fieldError}>{errors[id]}</p> : null}
    </div>
  );
  const inputProps = (id: keyof Errors) => ({
    id: `bf-${id}`, className: `${styles.input} ${errors[id] ? styles.inputError : ""}`, "aria-required": true as const,
    "aria-invalid": Boolean(errors[id]), "aria-describedby": errors[id] ? `bf-${id}-error` : undefined,
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Claim a Black Friday offer">
      {live}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="bf-website">Leave this blank</label>
        <input id="bf-website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} autoComplete="off" tabIndex={-1} />
      </div>
      <div className={styles.fieldRow}>
        {field("first", "First name", <input {...inputProps("first")} type="text" name="first" autoComplete="given-name" value={first} onChange={(e) => setFirst(e.target.value)} />)}
        {field("last", "Last name", <input {...inputProps("last")} type="text" name="last" autoComplete="family-name" value={last} onChange={(e) => setLast(e.target.value)} />)}
      </div>
      <div className={styles.fieldRow}>
        {field("phone", "Mobile phone", <input {...inputProps("phone")} type="tel" name="phone" inputMode="tel" autoComplete="tel" placeholder="(941) 555-0123" value={phone} onChange={(e) => setPhone(e.target.value)} />)}
        {field("email", "Email", <input {...inputProps("email")} type="email" name="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />)}
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>Treatments of interest <span className={styles.optional}>Choose any</span></legend>
        <div className={styles.chips}>
          {treatmentChips.map((chip) => {
            const on = chips.includes(chip);
            return (
              <button key={chip} type="button" className={`${styles.chip} ${on ? styles.chipOn : ""}`} aria-pressed={on} onClick={() => toggle(chip)}>
                {on ? <Check size={14} aria-hidden="true" /> : null}{chip}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.label}>Are you a Harmony member?</legend>
        <div className={styles.memberOptions}>
          {memberStatusOptions.map((option) => (
            <label key={option} className={`${styles.memberOption} ${member === option ? styles.memberOptionOn : ""}`}>
              <input type="radio" name="member" value={option} checked={member === option} onChange={() => setMember(option)} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <label className={styles.consent}>
        <input type="checkbox" checked={emailConsent} onChange={(e) => setEmailConsent(e.target.checked)} />
        <span>Yes, email me Black Friday offers and reminders from Harmony Med Spa. Unsubscribe anytime.</span>
      </label>
      <label className={styles.consent}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Yes, Harmony Med Spa may text me about my request and Black Friday offers. Msg &amp; data rates may apply. Reply STOP to opt out. Consent is not a condition of purchase.</span>
      </label>

      <button type="submit" className={`${noir.btnPrimary} ${styles.submit}`} disabled={status === "submitting"} aria-busy={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Claim My Offer"}
      </button>
      {status === "error" ? (
        <p className={styles.formError} role="alert">We couldn&apos;t send your request. Please call <a href={`tel:+1${PHONE_TEL}`}>{PHONE_DISPLAY}</a> and we&apos;ll help directly.</p>
      ) : null}
      <p className={styles.privacy}>Your details are used only to follow up about your request.</p>
    </form>
  );
}

