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
import { ADDRESS_LINE_1, ADDRESS_LINE_2, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import styles from "../medical-weight-loss/page.module.css";

const pageUrl = "https://www.harmonymedspafl.com/landing/advanced-skin-and-wellness-treatments";
const socialImage = "https://www.harmonymedspafl.com/images/blogs/harmony-editorial/harmony-medspa-sarasota-consultation-room.png";

export const metadata: Metadata = {
  title: "Advanced Skin & Wellness Treatments in Sarasota | Harmony Med Spa",
  description:
    "Explore personalized skin, aesthetic, and wellness treatments with Harmony Med Spa's experienced Sarasota team.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Advanced Skin & Wellness Treatments in Sarasota | Harmony Med Spa",
    description: "Thoughtful treatment planning for your skin, appearance, and overall wellbeing.",
    url: pageUrl,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Skin & Wellness Treatments in Sarasota | Harmony Med Spa",
    description: "Thoughtful treatment planning for your skin, appearance, and overall wellbeing.",
    images: [socialImage],
  },
  robots: { index: false, follow: false },
};

const phoneHref = `tel:+1${PHONE_TEL}`;

const trustPoints = [
  { icon: ShieldCheck, title: "Experienced clinical team", detail: "Provider-led care with clear guidance" },
  { icon: MapPin, title: "Local Sarasota practice", detail: "Personal care in Gulf Gate" },
  { icon: ClipboardCheck, title: "Plan before treatment", detail: "Recommendations shaped around you" },
];

const pathway = [
  {
    number: "01",
    label: "Listen",
    title: "Begin with what matters to you",
    body: "Share your priorities, past treatments, lifestyle, sensitivities, and the changes you would like to explore.",
  },
  {
    number: "02",
    label: "Assess",
    title: "Look at the complete picture",
    body: "Your Harmony provider evaluates your concerns and explains which options may be appropriate for your skin and wellness goals.",
  },
  {
    number: "03",
    label: "Plan",
    title: "Choose a thoughtful next step",
    body: "Leave with clear recommendations, realistic expectations, and a plan that can evolve with your needs.",
  },
];

const treatmentOptions = [
  "Personalized skin analysis and treatment planning",
  "Advanced facials and professional chemical peels",
  "RF microneedling and fractional skin resurfacing",
  "Natural-looking injectable treatment planning",
  "Laser and light-based treatment options",
  "Provider-guided wellness consultations",
];

const articles = [
  {
    href: "/blog/benefits-of-rf-microneedling-skin-texture-firmness",
    image: "/images/services/catalog/rf-microneedling.jpg",
    category: "Skin renewal",
    title: "How RF Microneedling Supports Skin Texture",
    description: "Understand what the treatment is designed to address and what to discuss during a consultation.",
  },
  {
    href: "/blog/the-benefits-of-chemical-peels-for-acne-sun-damage-and-aging",
    image: "/images/services/catalog/chemical-peels.jpg",
    category: "Professional skincare",
    title: "A Practical Guide to Chemical Peels",
    description: "Learn how peel depth, skin goals, and recovery time shape a personalized recommendation.",
  },
  {
    href: "/blog/who-is-a-good-candidate-for-injectables",
    image: "/images/services/catalog/dermal-fillers.jpg",
    category: "Aesthetic planning",
    title: "Is an Injectable Consultation Right for You?",
    description: "Explore the questions a careful provider considers before recommending an aesthetic treatment.",
  },
];

const faqs = [
  {
    question: "What happens during my first consultation?",
    answer:
      "Your visit begins with a conversation about your concerns, previous treatments, preferences, and goals. Your provider will assess the relevant areas, explain suitable options, and help you understand the next step before you decide on treatment.",
  },
  {
    question: "Do I need to know which treatment I want?",
    answer:
      "No. Many patients arrive with a goal rather than a specific treatment in mind. The consultation is designed to compare appropriate options and help you avoid choosing a service that does not fit your needs.",
  },
  {
    question: "Can skin and wellness goals be discussed together?",
    answer:
      "Yes. Harmony offers aesthetic, skin, and medically guided wellness services in one practice. Recommendations are individualized, and some goals may require separate evaluations or appointments.",
  },
  {
    question: "Will I receive treatment on the same day?",
    answer:
      "Same-day treatment may be possible for some services, but it is not guaranteed. Timing depends on your evaluation, the selected treatment, preparation requirements, and appointment availability.",
  },
  {
    question: "How much do treatments cost?",
    answer:
      "Pricing depends on the service and the personalized plan. The Harmony team will explain relevant costs and recommended timing before you commit to treatment.",
  },
  {
    question: "Where is Harmony Med Spa located?",
    answer: `${ADDRESS_LINE_1}, ${ADDRESS_LINE_2}. The office is open Monday through Friday, 9:00 a.m. to 5:00 p.m.`,
  },
];

export default function AdvancedSkinWellnessLandingPage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">Skip to main content</a>

      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Harmony Med Spa advanced skin and wellness treatments">
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
              src="/images/blogs/harmony-editorial/harmony-medspa-sarasota-consultation-room.png"
              alt="A personalized consultation at Harmony Med Spa in Sarasota"
              fill
              sizes="(max-width: 900px) 100vw, 62vw"
              className={styles.heroImage}
              priority
            />
            <div className={styles.heroShade} />
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Advanced skin &amp; wellness · Sarasota</p>
              <h1 id="hero-heading">Look refreshed. Feel supported. Stay entirely yourself.</h1>
              <p className={styles.heroLead}>
                Explore personalized skin, aesthetic, and wellness care with a team that listens first and recommends thoughtfully.
              </p>
              <div className={styles.heroLinks}>
                <a className={styles.primaryCta} href="#consultation">
                  Request a consultation <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className={styles.textLink} href={phoneHref}>Prefer to talk? {PHONE_DISPLAY}</a>
              </div>
            </div>
            <p className={styles.heroCaption}>Advanced options. Personal recommendations.</p>
          </div>

          <div className={styles.formColumn} id="consultation">
            <WeightLossForm
              id="advanced-consultation-form"
              source="Advanced Skin and Wellness Landing Page"
              treatmentInterest="Advanced Skin and Wellness Treatments"
              landingUrl="/landing/advanced-skin-and-wellness-treatments"
              ariaLabel="Advanced skin and wellness consultation request"
              kicker="Personal consultation request"
              heading="Let's find the right next step."
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
          <div className={styles.sectionNumber} aria-hidden="true">01 / CARE, CONNECTED</div>
          <div className={styles.introStatement}>
            <p className={styles.eyebrowDark}>More than a treatment menu</p>
            <h2 id="different-heading">The best option is the one that makes sense for you.</h2>
          </div>
          <div className={styles.introBody}>
            <p>
              Advanced technology matters, but thoughtful selection matters more. Harmony begins by understanding what you want to improve, how you want to look and feel, and what fits your comfort level.
            </p>
            <p>
              Your provider can then connect the right skin, aesthetic, or wellness options into a clear plan—with no pressure to do everything at once.
            </p>
          </div>
        </section>

        <section className={styles.pathwaySection} aria-labelledby="pathway-heading">
          <div className={styles.pathwayHeading}>
            <p className={styles.eyebrowLight}>Your consultation pathway</p>
            <h2 id="pathway-heading">Listen first.<br />Recommend second.</h2>
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
              <HeartPulse size={20} aria-hidden="true" /><span>Skin &amp; wellness<br />under one roof</span>
            </div>
          </div>
          <div className={styles.providerCopy}>
            <p className={styles.sectionNumber}>02 / MEET YOUR PROVIDER</p>
            <p className={styles.eyebrowDark}>Jessica Simone, AGNP-C</p>
            <h2 id="provider-heading">Clinical experience with an eye for natural results.</h2>
            <p>
              Jessica is the owner of Harmony Med Spa and an advanced practice nurse board-certified by the American Academy of Nurse Practitioners. Her background spans aesthetic and integrative care, allowing consultations to look beyond a single treatment.
            </p>
            <p className={styles.providerPrinciple}>Understand the goal. Explain the options. Build the plan together.</p>
            <a className={styles.inlineCta} href="#consultation">
              Request a consultation <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className={styles.includesSection} aria-labelledby="includes-heading">
          <div className={styles.includesHeading}>
            <p className={styles.sectionNumber}>03 / EXPLORE YOUR OPTIONS</p>
            <h2 id="includes-heading">Care that can meet you from more than one angle</h2>
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
              <h2 id="articles-heading">Clear guidance for thoughtful choices.</h2>
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
            <p>Request a private consultation with Harmony&apos;s Sarasota team and get a clearer view of your options.</p>
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
        </div>
      </footer>

      <nav className={styles.mobileBar} aria-label="Quick contact actions">
        <a href={phoneHref}><Phone size={17} aria-hidden="true" /> Call</a>
        <a href="#consultation">Request consultation <ArrowRight size={17} aria-hidden="true" /></a>
      </nav>
    </div>
  );
}
