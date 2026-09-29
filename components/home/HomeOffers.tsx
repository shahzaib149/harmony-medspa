"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { activeHomeOffers, homeOffers, type HomeOffer } from "@/lib/home-offers";
import { trackEvent, trackLead } from "@/lib/analytics";
import { submitLead } from "@/lib/submitLead";
import { ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import styles from "./HomeOffers.module.css";

function useOffers(catalog: HomeOffer[]) {
  const [offers, setOffers] = useState<HomeOffer[]>([]);
  useEffect(() => {
    const refresh = () => setOffers(activeHomeOffers(catalog));
    refresh();
    const interval = window.setInterval(refresh, 15000);
    window.addEventListener("focus", refresh);
    return () => { window.clearInterval(interval); window.removeEventListener("focus", refresh); };
  }, [catalog]);
  return offers;
}

function selectOffer(offer: HomeOffer, action: string) {
  trackEvent("select_content", { content_type: "homepage_offer", item_id: offer.id, action });
}

function expiry(offer: HomeOffer) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${offer.endsOn}T12:00:00Z`));
}

export function HomeOfferBand({ catalog = homeOffers }: { catalog?: HomeOffer[] }) {
  const offers = useOffers(catalog);
  const offer = offers.find(item => item.featured) ?? offers[0];
  if (!offer) return null;
  return <aside className={styles.band} aria-label="Featured Harmony offer">
    <div><span className={styles.eyebrow}>A little more care, this month</span><strong>{offer.title}</strong><span>{offer.eligibility} · Ends {expiry(offer)}</span></div>
    <a href="#homepage-offers" onClick={() => selectOffer(offer, "view")}>View offer <span aria-hidden="true">↗</span></a>
  </aside>;
}

function OfferForm({ offer }: { offer: HomeOffer }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const busy = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => { nameRef.current?.focus(); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || status === "success") return;
    if (!activeHomeOffers([offer]).length) { setError("This offer has ended. Please call us for current options."); setStatus("error"); return; }
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^(1)?\d{10}$/.test(phone.replace(/\D/g, ""))) {
      setError("Enter your name, a valid email and a 10-digit US phone number."); setStatus("error"); return;
    }
    busy.current = true; setStatus("sending"); setError("");
    try {
      const response = await submitLead({ name, email, phone, source: "Website Offer Enquiry", treatmentInterest: offer.treatment,
        message: `Offer: ${offer.title}\nOffer ID: ${offer.id}\nOffer ends: ${offer.endsOn}\nEnquiry only; confirm terms and availability.\n${String(data.get("message") ?? "").trim()}` });
      setStatus("success");
      // Analytics failure must not turn an accepted enquiry into a retry.
      try { trackLead(response); } catch { /* Submission has already succeeded. */ }
    } catch { setError(`We couldn't send your enquiry. Please retry or call ${PHONE_DISPLAY}.`); setStatus("error"); }
    finally { busy.current = false; }
  }
  if (status === "success") return <div className={styles.confirmation} role="status">
    <h4>Your enquiry is with Harmony.</h4><p>Our team will confirm eligibility and availability. Your appointment and offer are not reserved yet.</p>
    <div className={styles.actions}><a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">Book an appointment ↗</a><a href={`tel:${PHONE_TEL}`}>Call Harmony</a></div>
  </div>;
  return <form className={styles.form} onSubmit={submit} aria-label={`Enquire about ${offer.treatment}`}>
    <p>Interested in <strong>{offer.treatment}</strong>? Our team will confirm the offer terms and appointment availability.</p>
    <label>Name<input ref={nameRef} name="name" autoComplete="name" required maxLength={120} /></label>
    <div className={styles.fields}><label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required maxLength={25} /></label></div>
    <label>Message <span>(optional)</span><textarea name="message" rows={3} maxLength={2000} /></label>
    <p className={styles.fine}>By submitting, you ask Harmony to contact you about this enquiry. This is not a marketing subscription.</p>
    {error && <p role="alert" className={styles.error}>{error}</p>}
    <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending enquiry…" : "Request this offer"}</button>
  </form>;
}

export default function HomeOffers({ catalog = homeOffers }: { catalog?: HomeOffer[] }) {
  const offers = useOffers(catalog);
  const [selected, setSelected] = useState<string | null>(null);
  if (!offers.length) return null;
  return <section id="homepage-offers" className={styles.section} aria-labelledby="offers-heading">
    <header><span className={styles.eyebrow}>Selected monthly specials</span><h2 id="offers-heading">A moment for you.<br /><em>A little extra from us.</em></h2><p>Two ways to make time for your skin, with care from the Harmony team.</p></header>
    <div className={styles.panels}>{offers.map(offer => <article key={offer.id} className={`${styles.panel} ${offer.featured ? styles.featured : ""}`}>
      <span className={styles.eyebrow}>{offer.treatment}</span><h3>{offer.title}</h3><p>{offer.description}</p>
      <div className={styles.terms}><strong>{offer.eligibility}</strong><span>Ends {expiry(offer)}</span><p>{offer.terms}</p></div>
      <button aria-expanded={selected === offer.id} aria-controls={`enquiry-${offer.id}`} onClick={() => { setSelected(selected === offer.id ? null : offer.id); selectOffer(offer, "enquire"); }}>{selected === offer.id ? "Close enquiry" : "Enquire about this offer"} <span aria-hidden="true">↗</span></button>
      <div id={`enquiry-${offer.id}`}>{selected === offer.id && <OfferForm offer={offer} />}</div>
    </article>)}</div>
  </section>;
}
