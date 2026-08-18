import type { Metadata } from "next";
import Image from "next/image";
import WeightLossForm from "@/components/landing/WeightLossForm";
import { PHONE_DISPLAY, PHONE_TEL, ADDRESS_LINE_1, ADDRESS_LINE_2 } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Medical Weight Loss in Sarasota | Harmony Med Spa",
  description:
    "Meet with a board-certified nurse practitioner for an individualized medical weight loss plan built around your health history and goals. Serving Sarasota, FL.",
  robots: { index: false, follow: false },
};

const PHONE_HREF = `tel:+1${PHONE_TEL}`;

// ── FAQ data (rendered as static HTML — no JS injection) ────────────────────

const faqs = [
  {
    q: "What happens at the first appointment?",
    a: "Mostly conversation. We'll go through your health history, what you've tried before, and what you're hoping for, then talk through what's realistically available for your situation. You'll leave understanding your options.",
  },
  {
    q: "Is the consultation free?",
    a: "[CONFIRM — Harmony currently advertises a free consultation elsewhere on the site. State the position for this program clearly and keep it accurate.]",
  },
  {
    q: "Do I have to take medication?",
    a: "No. Medication is one option among several and is only considered when it's medically appropriate for you. Plenty of patients are managed without it.",
  },
  {
    q: "How much does it cost?",
    a: "Cost depends on what your plan involves. We'll go through it in full during your consultation, before you commit to anything.",
  },
  {
    q: "How long until I see results?",
    a: "This varies considerably between individuals, and anyone who gives you a specific number before meeting you is guessing. Your provider can give you a realistic picture once they understand your situation.",
  },
  {
    q: "Where are you located?",
    a: `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}. Monday to Friday, 9:00am to 5:00pm.`,
  },
];

// ── What program may include ─────────────────────────────────────────────────

const programItems = [
  "Initial medical evaluation and relevant lab work",
  "Review of current medications that may affect weight",
  "Assessment of thyroid and hormone factors, where indicated",
  "Nutritional guidance built around your actual routine",
  "Regular weigh-ins and progress monitoring",
  "Medication options, when medically appropriate",
  "Plan adjustments based on how you respond",
];

// ── How it works steps ───────────────────────────────────────────────────────

const steps = [
  {
    n: "1",
    title: "Medical evaluation",
    body: "We review your health history, current medications, and what you've already tried. Lab work is arranged where it's relevant.",
  },
  {
    n: "2",
    title: "Your individualized plan",
    body: "Your provider builds a plan around what your evaluation actually shows, not a template. What's appropriate varies from person to person.",
  },
  {
    n: "3",
    title: "Ongoing check-ins",
    body: "Regular visits with weigh-ins and progress review, so the plan can be adjusted when something isn't working.",
  },
];

export default function MedicalWeightLossLandingPage() {
  return (
    <main className="wml-page" id="main-content">

      {/* ── Section 1: Hero ─────────────────────────────────────────────────── */}
      <section className="wml-hero" id="hero" aria-labelledby="wml-h1">
        <div className="wml-hero-inner">

          {/* Left column */}
          <div className="wml-hero-copy">
            {/* Logo — image only, not a link */}
            <div className="wml-logo" aria-label="Harmony Med Spa">
              <Image
                src="/images/logo-transparent.png"
                alt="Harmony Med Spa"
                width={260}
                height={70}
                priority
              />
            </div>

            <h1 id="wml-h1" className="wml-h1">
              Medical Weight Loss in Sarasota
            </h1>

            <p className="wml-hero-sub">
              Meet with a board-certified nurse practitioner for an individualized plan built around your health,
              your history, and your goals.
            </p>

            {/* Trust row */}
            <ul className="wml-trust-row" aria-label="Trust indicators">
              <li className="wml-trust-item">
                <span className="wml-trust-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                </span>
                In-person Sarasota care
              </li>
              <li className="wml-trust-item">
                <span className="wml-trust-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z"/></svg>
                </span>
                Board-certified nurse practitioner
              </li>
              <li className="wml-trust-item">
                <span className="wml-trust-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                </span>
                Ongoing progress support
              </li>
            </ul>

            {/* Phone CTA */}
            <a className="wml-phone-cta" href={PHONE_HREF} aria-label={`Call ${PHONE_DISPLAY}`}>
              {PHONE_DISPLAY}
            </a>
            <p className="wml-phone-sub">
              Prefer to talk first? Call us — we&apos;re happy to answer questions before you book anything.
            </p>
          </div>

          {/* Right column — hero form */}
          <WeightLossForm id="hero-form" />
        </div>
      </section>

      {/* ── Section 2: How it works ──────────────────────────────────────────── */}
      <section className="wml-section wml-steps-section" aria-labelledby="wml-steps-heading">
        <div className="wml-section-inner">
          <h2 id="wml-steps-heading" className="wml-section-heading">
            A Medical Plan, Not a One-Size-Fits-All Program
          </h2>
          <ol className="wml-steps" aria-label="How the program works">
            {steps.map((step) => (
              <li key={step.n} className="wml-step">
                <span className="wml-step-number" aria-hidden="true">{step.n}</span>
                <h3 className="wml-step-title">{step.title}</h3>
                <p className="wml-step-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Section 3: What program may include ─────────────────────────────── */}
      <section className="wml-section wml-includes-section" aria-labelledby="wml-includes-heading">
        <div className="wml-section-inner">
          <h2 id="wml-includes-heading" className="wml-section-heading">
            What Your Program May Include
          </h2>
          <ul className="wml-includes-list">
            {programItems.map((item) => (
              <li key={item} className="wml-includes-item">{item}</li>
            ))}
          </ul>
          <p className="wml-includes-disclaimer">
            Not every element applies to every patient. What&apos;s appropriate is determined during your evaluation.
          </p>
        </div>
      </section>

      {/* ── Section 4: Your provider ─────────────────────────────────────────── */}
      <section className="wml-section wml-provider-section" aria-labelledby="wml-provider-heading">
        <div className="wml-section-inner wml-provider-inner">
          <Image
            className="wml-provider-photo"
            src="/images/providers/clear_team_1.jpg"
            alt="Jessica Simone, AGNP-C, board-certified nurse practitioner at Harmony Med Spa"
            width={280}
            height={280}
          />
          <div className="wml-provider-copy">
            <h2 id="wml-provider-heading" className="wml-section-heading wml-section-heading-left">
              Care From a Board-Certified Nurse Practitioner
            </h2>
            <p className="wml-provider-name">Jessica Simone, AGNP-C</p>
            <p className="wml-provider-bio">
              Jessica is a board-certified adult-gerontology nurse practitioner and leads care at Harmony Med Spa in
              Sarasota. Your evaluation, your plan, and your follow-up visits are handled by a medical provider —
              not a coach or a sales consultant.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Testimonial ───────────────────────────────────────────── */}
      <section className="wml-section wml-testimonial-section" aria-labelledby="wml-testimonial-heading">
        <div className="wml-section-inner">
          <h2 id="wml-testimonial-heading" className="wml-section-heading">
            What Patients Say
          </h2>
          <figure className="wml-testimonial">
            <span className="wml-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="wml-quote-body">
              I&apos;ve been to a few Med Spas in Sarasota, and Jessica is absolutely the best. She truly cares about
              providing exceptional service and I am thrilled to have finally found a practitioner I can trust.
              Her staff is fantastic and I couldn&apos;t be happier with my decision.
            </blockquote>
            <figcaption className="wml-quote-attribution">
              <span className="wml-stars" aria-label="Five stars">★★★★★</span>
              <span className="wml-quote-name">Ariel F.</span>
            </figcaption>
          </figure>
          <p className="wml-results-disclaimer">Individual results vary.</p>
        </div>
      </section>

      {/* ── Section 6: FAQs ─────────────────────────────────────────────────── */}
      <section className="wml-section wml-faq-section" aria-labelledby="wml-faq-heading">
        <div className="wml-section-inner">
          <h2 id="wml-faq-heading" className="wml-section-heading">
            Common Questions
          </h2>
          <dl className="wml-faq-list">
            {faqs.map((faq) => (
              <div key={faq.q} className="wml-faq-item">
                <dt className="wml-faq-q">{faq.q}</dt>
                <dd className="wml-faq-a">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Section 7: Footer ────────────────────────────────────────────────── */}
      <footer className="wml-footer" role="contentinfo">
        <div className="wml-section-inner">
          
          <div className="wml-footer-grid">

            {/* Bottom Left: BNS & BBB Badges */}
            <div className="wml-footer-awards">
              <div
                className="wml-award-bns"
                role="img"
                aria-label="BNS Best in Business 2024"
              />
              <div
                className="wml-award-bbb"
                role="img"
                aria-label="BBB Accredited Business"
              />
            </div>

            {/* Center Column: Google Maps (Zoomed In + Zoom Button) + Contact Info */}
            <div className="wml-footer-center">
              {/* Google Maps Location (Zoomed in view: 1d1000.0) */}
              <div className="wml-footer-map">
                <iframe
                  title="Harmony Med Spa location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000.0!2d-82.5174315!3d27.2585249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c341675072d051%3A0x57ec31e9ba2b5cac!2sHarmony%20Med%20Spa!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="210"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Contact Info (Blue Circled Area in Bottom Center) */}
              <div className="wml-footer-contact">
                <p className="wml-footer-company"><strong>Harmony Med Spa</strong></p>
                <p className="wml-footer-address">
                  {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
                </p>
                <p className="wml-footer-phone">
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                </p>
                <p className="wml-footer-hours">
                  Monday – Friday, 9:00am to 5:00pm
                </p>
              </div>
            </div>

            {/* Right Column: Privacy Policy & Legal */}
            <div className="wml-footer-legal">
              <nav aria-label="Legal navigation">
                <a href="/privacy-policy">Privacy Policy</a>
                {" · "}
                <a href="/accessibility">Accessibility Statement</a>
              </nav>
              <p className="wml-footer-copyright">
                © {new Date().getFullYear()} Harmony Med Spa. All rights reserved.
              </p>
              <p className="wml-footer-disclaimer">
                This page is for general information and is not medical advice. Treatment recommendations are made
                following an individual medical evaluation.
              </p>
            </div>

          </div>

        </div>
      </footer>

    </main>
  );
}
