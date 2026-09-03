import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import WeightLossForm from "@/components/landing/WeightLossForm";
import PoweredByCodeSquad from "@/components/layout/PoweredByCodeSquad";
import { ADDRESS_LINE_1, ADDRESS_LINE_2, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import styles from "../medical-weight-loss/page.module.css";

const pageUrl = "https://www.harmonymedspafl.com/landing/injectables";
const socialImage = "https://www.harmonymedspafl.com/images/landing/injectables.jpg";

export const metadata: Metadata = {
  title: "Injectables in Sarasota, FL | Harmony Med Spa",
  description:
    "Explore personalized injectable treatments in Sarasota with a careful facial assessment and a plan designed around natural-looking results.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Injectables in Sarasota, FL | Harmony Med Spa",
    description: "A thoughtful, provider-led approach to refreshed, natural-looking results.",
    url: pageUrl,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Injectables in Sarasota, FL | Harmony Med Spa",
    description: "A thoughtful, provider-led approach to refreshed, natural-looking results.",
    images: [socialImage],
  },
  robots: { index: false, follow: false },
};

const phoneHref = `tel:+1${PHONE_TEL}`;

const trustPoints = [
  { icon: ShieldCheck, title: "Provider-led care", detail: "Every plan begins with an assessment" },
  { icon: MapPin, title: "Local Sarasota practice", detail: "Personal care in Gulf Gate" },
  { icon: ClipboardCheck, title: "Natural-looking approach", detail: "Recommendations shaped around your face" },
];

const pathway = [
  { number: "01", label: "Consult", title: "Start with how you want to feel", body: "Tell us what you notice, what you would like to preserve, and how subtle or visible you want any change to be." },
  { number: "02", label: "Assess", title: "Look at movement, balance, and structure", body: "Your provider evaluates facial anatomy, expression, skin quality, and medical history before discussing suitable options." },
  { number: "03", label: "Personalize", title: "Build a plan that still looks like you", body: "Receive clear recommendations, realistic expectations, and aftercare guidance before choosing whether to proceed." },
];

const treatmentOptions = [
  "Expression-line consultation and neuromodulator options",
  "Dermal filler planning for facial balance and volume",
  "Sculptra consultations for gradual collagen support",
  "Lip, cheek, chin, and lower-face assessment",
  "Personalized treatment timing and maintenance planning",
  "Clear preparation, aftercare, and follow-up guidance",
];

const articles = [
  { href: "/blog/who-is-a-good-candidate-for-injectables", image: "/images/blogs/good-candidate-injectables/1.jpg", category: "Getting started", title: "Who Is a Good Candidate for Injectables?", description: "Learn what providers consider when deciding whether an injectable treatment fits your goals." },
  { href: "/blog/what-areas-can-be-treated-with-dermal-fillers", image: "/images/services/catalog/dermal-fillers.jpg", category: "Facial balance", title: "What Areas Can Be Treated With Dermal Fillers?", description: "Explore common treatment areas and why a full-face assessment matters before making a plan." },
  { href: "/blog/the-collagen-comeback-how-sculptra-rebuilds-your-skin-from-within", image: "/images/blogs/harmony-editorial/sculptra-vs-dermal-fillers-sarasota.webp", category: "Collagen support", title: "A Thoughtful Guide to Sculptra", description: "Understand the gradual approach and the questions to discuss during your consultation." },
];

const faqs = [
  { question: "Which injectable treatment is right for me?", answer: "That depends on your anatomy, goals, medical history, and the type of change you want. Your consultation is designed to compare appropriate options and explain why a particular approach may or may not fit you." },
  { question: "Will I still look like myself?", answer: "Harmony's approach prioritizes facial balance and natural-looking results. Your provider will discuss your preferences, recommend a conservative plan when appropriate, and set realistic expectations before treatment." },
  { question: "What injectable options does Harmony offer?", answer: "Harmony offers consultations for expression-line treatments, dermal fillers, and collagen-supporting injectables, including DAXXIFY, Jeuveau, and Sculptra. Availability and suitability are confirmed during an individual evaluation." },
  { question: "Is there downtime after treatment?", answer: "Recovery varies by treatment and individual. Temporary redness, swelling, tenderness, or bruising can occur. Your provider will explain preparation, aftercare, and when to contact the practice about a concern." },
  { question: "Can I receive treatment at my first visit?", answer: "Same-day treatment may be possible, but it is not guaranteed. Timing depends on your assessment, medical history, the selected service, preparation requirements, and appointment availability." },
  { question: "How much do injectables cost?", answer: "Pricing depends on the selected treatment and personalized plan. The Harmony team will explain recommended amounts, timing, and costs before you choose to proceed." },
];

export default function InjectablesLandingPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">Skip to main content</a>

      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Harmony Med Spa injectables in Sarasota">
          <Image src="/images/logo-transparent.png" alt="Harmony Med Spa" width={180} height={74} priority />
        </a>
        <div className={styles.headerActions}>
          <a className={styles.phoneLink} href={phoneHref}>
            <Phone size={15} aria-hidden="true" /><span>{PHONE_DISPLAY}</span>
          </a>
          <a className={styles.headerCta} href="#consultation">
            Request a consultation <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className={styles.hero} id="top" aria-labelledby="hero-heading">
          <div className={styles.heroMedia}>
            <Image
              src="/images/landing/injectables.jpg"
              alt="A professional injectable consultation at Harmony Med Spa"
              fill
              sizes="(max-width: 900px) 100vw, 62vw"
              className={styles.heroImage}
              priority
            />
            <div className={styles.heroShade} />
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Personalized injectables · Sarasota</p>
              <h1 id="hero-heading">Refreshed—not changed.</h1>
              <p className={styles.heroLead}>
                Thoughtful injectable care begins with your face, your preferences, and a plan designed to keep the result naturally yours.
              </p>
              <div className={styles.heroLinks}>
                <a className={styles.primaryCta} href="#consultation">
                  Request a consultation <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className={styles.textLink} href={phoneHref}>Prefer to talk? {PHONE_DISPLAY}</a>
              </div>
            </div>
            <p className={styles.heroCaption}>Subtle decisions. Personal results.</p>
          </div>

          <div className={styles.formColumn} id="consultation">
            <WeightLossForm
              id="injectables-consultation-form"
              source="Injectables Landing Page"
              treatmentInterest="Injectables"
              landingUrl="/landing/injectables"
              ariaLabel="Injectables consultation request"
              kicker="Private injectables consultation"
              heading="Let's talk about your goals."
              subheading="Tell us how to reach you. Our Sarasota team will follow up personally."
              submitLabel="Request my consultation"
            />
          </div>
        </section>

        <section className={styles.trustRail} aria-label="Harmony Med Spa highlights">
          <div className={styles.awardItem} aria-label="Harmony Med Spa awards and accreditation">
            <Image className={styles.bnsBadge} src="/images/footer/main.png" alt="BNS Best in Business 2024" width={84} height={84} />
            <Image className={styles.bbbBadge} src="/images/footer/bbb.png" alt="BBB Accredited Business" width={132} height={28} />
          </div>
          {trustPoints.map(({ icon: Icon, title, detail }) => (
            <div className={styles.trustItem} key={title}>
              <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
              <div><strong>{title}</strong><span>{detail}</span></div>
            </div>
          ))}
        </section>

        <section className={styles.introSection} aria-labelledby="different-heading">
          <div className={styles.sectionNumber} aria-hidden="true">01 / YOUR FACE, CONSIDERED</div>
          <div className={styles.introStatement}>
            <p className={styles.eyebrowDark}>A more intentional approach</p>
            <h2 id="different-heading">Your treatment should begin with a conversation.</h2>
          </div>
          <div className={styles.introBody}>
            <p>
              Injectable care is not one-size-fits-all. Harmony begins by understanding the expressions, features, or changes you want to address—and what you do not want to lose.
            </p>
            <p>
              Your provider considers facial movement, proportion, structure, and skin quality before recommending any treatment, amount, or timing.
            </p>
          </div>
        </section>

        <section className={styles.pathwaySection} aria-labelledby="pathway-heading">
          <div className={styles.pathwayHeading}>
            <p className={styles.eyebrowLight}>Your consultation pathway</p>
            <h2 id="pathway-heading">Listen closely.<br />Treat precisely.</h2>
          </div>
          <ol className={styles.pathwayList} role="list">
            {pathway.map((step) => (
              <li className={styles.pathwayStep} key={step.number}>
                <div className={styles.pathMarker}><span>{step.number}</span></div>
                <p className={styles.pathLabel}>{step.label}</p>
                <h3>{step.title}</h3>
                <p className={styles.pathBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.providerSection} aria-labelledby="provider-heading">
          <div className={styles.providerImageWrap}>
            <Image
              src="/images/providers/clear_team_1.jpg"
              alt="Jessica Simone, AGNP-C, Harmony Med Spa owner and medical provider"
              fill
              sizes="(max-width: 760px) 100vw, 44vw"
              className={styles.providerImage}
            />
            <div className={styles.providerStamp}>
              <HeartPulse size={20} aria-hidden="true" /><span>Anatomy-led<br />treatment planning</span>
            </div>
          </div>
          <div className={styles.providerCopy}>
            <p className={styles.sectionNumber}>02 / MEET YOUR PROVIDER</p>
            <p className={styles.eyebrowDark}>Jessica Simone, AGNP-C</p>
            <h2 id="provider-heading">Clinical judgment. An eye for balance.</h2>
            <p>
              Jessica is the owner of Harmony Med Spa and an advanced practice nurse board-certified by the American Academy of Nurse Practitioners. Her approach combines careful assessment, clear education, and aesthetic restraint.
            </p>
            <p className={styles.providerPrinciple}>Preserve expression. Respect proportion. Make every recommendation personal.</p>
            <a className={styles.inlineCta} href="#consultation">
              Request a consultation <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className={styles.includesSection} aria-labelledby="includes-heading">
          <div className={styles.includesHeading}>
            <p className={styles.sectionNumber}>03 / EXPLORE YOUR OPTIONS</p>
            <h2 id="includes-heading">One consultation. A plan made for your face.</h2>
            <p>Every recommendation follows an individual consultation. Not every service is appropriate for every patient.</p>
          </div>
          <ul className={styles.includesList}>
            {treatmentOptions.map((item, index) => (
              <li key={item}>
                <span className={styles.itemNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.testimonialSection} aria-labelledby="patient-heading">
          <div className={styles.quoteMark} aria-hidden="true">“</div>
          <div className={styles.testimonialCopy}>
            <p className={styles.eyebrowLight}>A patient perspective</p>
            <h2 id="patient-heading">Trust begins with being heard.</h2>
            <blockquote>
              “Jessica is absolutely the best. She truly cares about providing exceptional service and I am thrilled to have finally found a practitioner I can trust.”
            </blockquote>
            <p className={styles.attribution}>Ariel F. · Harmony patient</p>
            <p className={styles.resultsNote}>Individual experiences and results vary.</p>
          </div>
          <div className={styles.testimonialAside}><span>01</span><p>Published patient feedback featured by Harmony Med Spa.</p></div>
        </section>

        <section className={styles.articlesSection} aria-labelledby="articles-heading">
          <div className={styles.articlesHeader}>
            <div>
              <p className={styles.eyebrowDark}>Learn before your visit</p>
              <h2 id="articles-heading">Good decisions begin with clear information.</h2>
            </div>
            <Link className={styles.allArticles} href="/blog">
              Explore all articles <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.articleGrid}>
            {articles.map((article, index) => (
              <Link className={styles.articleCard} href={article.href} key={article.href}>
                <div className={styles.articleImageWrap}>
                  <Image src={article.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" className={styles.articleImage} />
                </div>
                <div className={styles.articleContent}>
                  <p>{String(index + 1).padStart(2, "0")} · {article.category}</p>
                  <h3>{article.title}</h3>
                  <span>{article.description}</span>
                  <strong>Read guide <ArrowUpRight size={15} aria-hidden="true" /></strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.faqIntro}>
            <p className={styles.sectionNumber}>04 / BEFORE YOU BEGIN</p>
            <h2 id="faq-heading">Questions worth asking.</h2>
            <p>Clear information matters. If your question is not here, call the Harmony team and ask directly.</p>
            <a href={phoneHref}>{PHONE_DISPLAY}</a>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details className={styles.faqItem} key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {faq.question}
                  <i aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="final-heading">
          <div>
            <p className={styles.eyebrowLight}>A more personal starting point</p>
            <h2 id="final-heading">Ready to explore what fits you?</h2>
          </div>
          <div>
            <p>Request a private consultation with Harmony&apos;s Sarasota team and get a clearer view of your injectable options.</p>
            <a className={styles.primaryCta} href="#consultation">
              Request a consultation <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <Image src="/images/logo-transparent.png" alt="Harmony Med Spa" width={150} height={62} />
          <p>Medical aesthetics and wellness care in Sarasota, Florida.</p>
        </div>
        <div>
          <p className={styles.footerLabel}>Visit</p>
          <address>{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</address>
        </div>
        <div>
          <p className={styles.footerLabel}>Contact</p>
          <a href={phoneHref}>{PHONE_DISPLAY}</a>
          <span>Monday–Friday · 9:00 a.m.–5:00 p.m.</span>
        </div>
        <div className={styles.footerLegal}>
          <p>© {new Date().getFullYear()} Harmony Med Spa.</p>
          <p>This page provides general information and is not medical advice. Recommendations follow an individual evaluation.</p>
          <PoweredByCodeSquad className="mt-3" />
        </div>
      </footer>

      <nav className={styles.mobileBar} aria-label="Quick contact actions">
        <a href={phoneHref}><Phone size={17} aria-hidden="true" /> Call</a>
        <a href="#consultation">Request consultation <ArrowRight size={17} aria-hidden="true" /></a>
      </nav>
    </div>
  );
}
