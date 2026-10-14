import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Check, Clock, HeartHandshake, MapPin, Phone, ReceiptText, Sparkles, Star } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import BeforeAfterSlider from "@/components/before-after/BeforeAfterSlider";
import { BEFORE_AFTER_CASES, BEFORE_AFTER_CATEGORIES, beforeAfterImages, casesFor, type BeforeAfterCategoryId } from "@/lib/data/beforeAfter";
import { PRICING_GENERAL_DISCLAIMER, PRICING_PATH, priceOf, requestPricingHref } from "@/lib/data/pricing";
import { providers } from "@/lib/data/providers";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  GOOGLE_MAPS_LOCATION_URL,
  ONLINE_BOOKING_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WEEKDAY_HOURS_DISPLAY
} from "@/lib/constants";
import lounge from "@/public/images/office/october-2026/harmony-lounge-logo-wall.jpg";
import providerAtWork from "@/public/images/office/october-2026/daxxify-treatment-sarasota.jpg";
import storefront from "@/public/images/office/october-2026/harmony-storefront-sunny.jpg";
import injectables from "@/public/images/blogs/harmony-editorial/sculptra-vs-dermal-fillers-sarasota.webp";
import lasers from "@/public/images/blogs/harmony-editorial/rf-microneedling-vs-co2-laser-sarasota.webp";
import facials from "@/public/images/blogs/harmony-editorial/revivamask-recovery-mask-sarasota.png";
import wellness from "@/public/images/blogs/harmony-editorial/iv-therapy-options-sarasota.png";
import skincare from "@/public/images/blogs/harmony-editorial/medical-grade-skincare-routine-sarasota.png";
import body from "@/public/images/blogs/harmony-editorial/laser-hair-removal-sarasota-guide.png";
import windowLight from "@/public/images/blogs/harmony-editorial/choosing-skin-care-provider-sarasota.png";
import styles from "./Home.module.css";

/** Keeps credentials like "AGNP-C" on one line. */
const noBreakHyphens = (text: string) => text.replace(/-/g, "\u2011");

const monthlySpecialsUrl = "https://mailchi.mp/harmonymedspafl/monthly-specials";
const newsletterOptInUrl = "https://mailchi.mp/harmonymedspafl/newsletter-opt-in";

export function HomeAbout() {
  const owner = providers[0];
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={`${styles.wrap} ${styles.aboutGrid}`}>
        <div className={styles.aboutMedia}>
          <div className={styles.aboutMain}>
            <Image src={lounge} alt="The lounge at Harmony Med Spa in Gulf Gate, Sarasota" fill placeholder="blur" sizes="(max-width: 900px) 84vw, 500px" />
          </div>
          <div className={styles.aboutSmall}>
            <Image
              src={providerAtWork}
              alt="A Harmony Med Spa provider during an injectable treatment"
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 50vw, 300px"
              style={{ objectPosition: "35% center" }}
            />
          </div>
          <p className={styles.aboutBadge}>
            <strong>AGNP-C</strong>
            <span>Board-certified nurse practitioner care</span>
          </p>
        </div>

        <div>
          <p className={styles.eyebrow}>Welcome to Harmony</p>
          <h2 id="about-title" className={styles.title}>
            Harmony Med Spa is a <em>full-service medical spa</em> in Sarasota, Florida.
          </h2>
          <p className={styles.lead}>
            Board-certified nurse practitioner Jessica Simone, AGNP-C, and her team take a natural approach to beauty that provides men and
            women of all ages the most effective and innovative aesthetic treatments available in a relaxed and welcoming setting.
          </p>
          <ul className={styles.checks}>
            <li>
              <Check aria-hidden="true" />
              Personalized, natural-looking aesthetic and wellness care
            </li>
            <li>
              <Check aria-hidden="true" />
              Advanced, evidence-based treatments with a holistic, integrative approach
            </li>
            <li>
              <Check aria-hidden="true" />A warm, welcoming office in the heart of Gulf Gate
            </li>
          </ul>
          <div className={styles.founder}>
            <Image src={`/images/providers/${owner.file}`} alt="" width={56} height={56} />
            <span>
              <strong>Jessica Simone, AGNP-C</strong>
              <span>Owner and board-certified nurse practitioner</span>
            </span>
          </div>
          <div className={styles.actions}>
            <Link className={styles.btnDark} href="/our-team">
              Meet the Team
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className={styles.btnLine} href={monthlySpecialsUrl} target="_blank" rel="noopener noreferrer">
              Monthly Specials
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type ServiceCategory = { title: string; kicker: string; href: string; image: StaticImageData; text: string };

const serviceCategories: ServiceCategory[] = [
  { title: "Injectables", kicker: "Daxxify · Fillers · Sculptra", href: "/injectables", image: injectables, text: "Soften lines and restore lost volume with results that still look like you." },
  { title: "Lasers + Lights", kicker: "CO2 · IPL · Hair removal", href: "/lasers-and-lights", image: lasers, text: "Resurface, brighten and smooth your skin with laser and light treatments." },
  { title: "Facials + Peels", kicker: "Glo2Facial · Peels", href: "/facials-and-peels", image: facials, text: "Customized medical facials, the Glo2Facial and chemical peels for a fresh glow." },
  { title: "Wellness", kicker: "Hormones · Weight loss · IV", href: "/wellness", image: wellness, text: "Hormone therapy, medical weight loss and IV nutrient infusions." },
  { title: "Skincare", kicker: "Medical-grade products", href: "/skincare", image: skincare, text: "Professional skincare and skin treatments chosen with our team." },
  { title: "Body", kicker: "Smooth · Firm · Confident", href: "/body", image: body, text: "Laser hair removal, skin tightening and body treatments, head to toe." },
];

export function HomeServices() {
  return (
    <section id="services" className={styles.services} aria-labelledby="services-title">
      <div className={`${styles.wrap} ${styles.center} ${styles.head}`}>
        <p className={styles.eyebrow}>What we offer</p>
        <h2 id="services-title" className={styles.title}>
          Treatments tailored to <em>you</em>
        </h2>
        <p className={styles.lead}>From a quick refresh to a complete plan, every treatment starts with your goals.</p>
      </div>
      <ul className={`${styles.wrap} ${styles.serviceGrid}`}>
        {serviceCategories.map((service) => (
          <li key={service.href}>
            <Link className={styles.serviceCard} href={service.href}>
              <Image src={service.image} alt="" fill placeholder="blur" sizes="(max-width: 720px) 82vw, (max-width: 1100px) 46vw, 390px" />
              <span className={styles.serviceArrow} aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
              <div className={styles.serviceInfo}>
                <small>{service.kicker}</small>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={`${styles.wrap} ${styles.moreRow}`}>
        <Link className={styles.btnDark} href="/services">
          View All Services
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

const featuredResults: BeforeAfterCategoryId[] = ["neuromodulators", "dermal-filler", "rf-microneedling"];

export function HomeResults() {
  return (
    <section className={styles.results} aria-labelledby="results-title">
      <div className={`${styles.wrap} ${styles.center} ${styles.head}`}>
        <p className={styles.eyebrow}>Real results</p>
        <h2 id="results-title" className={styles.title}>
          Real patients, <em>real results</em>
        </h2>
        <p className={styles.lead}>Drag the gold handle to compare. Every photo pair was taken at Harmony Med Spa.</p>
      </div>
      <ul className={`${styles.wrap} ${styles.resultGrid}`}>
        {featuredResults.map((categoryId) => {
          const category = BEFORE_AFTER_CATEGORIES.find((item) => item.id === categoryId);
          const item = casesFor(categoryId)[0];
          if (!category || !item) return null;
          const images = beforeAfterImages(item);
          return (
            <li key={categoryId}>
              <BeforeAfterSlider
                before={images.before}
                after={images.after}
                width={item.width}
                height={item.height}
                aspectRatio="4 / 5"
                label={`${category.label} result`}
                sizes="(max-width: 900px) 90vw, 400px"
              />
              <p>
                {category.label}
                <Link href={category.href}>View treatment</Link>
              </p>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.wrap} ${styles.resultFoot}`}>
        <Link className={styles.btnLine} href="/before-and-afters">
          See All {BEFORE_AFTER_CASES.length} Results
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <p>Individual results vary.</p>
      </div>
    </section>
  );
}

const reasons = [
  { icon: <BadgeCheck aria-hidden="true" />, title: "NP-led care", text: "Every plan is overseen by board-certified nurse practitioner Jessica Simone, AGNP-C." },
  { icon: <Sparkles aria-hidden="true" />, title: "Natural-looking results", text: "Balanced, subtle enhancements that still look and feel like you." },
  { icon: <ReceiptText aria-hidden="true" />, title: "Transparent pricing", text: "Our 2026 treatment prices are published online, before you book." },
  { icon: <HeartHandshake aria-hidden="true" />, title: "Personalized plans", text: "Treatments planned around your goals, your skin and your health." },
];

export function HomeWhy() {
  return (
    <section className={styles.why} aria-labelledby="why-title">
      <div className={`${styles.wrap} ${styles.whyGrid}`}>
        <div className={styles.whyMedia}>
          <Image
            src={storefront}
            alt="Harmony Med Spa on Gulf Gate Drive in Sarasota"
            fill
            placeholder="blur"
            sizes="(max-width: 900px) 90vw, 520px"
            style={{ objectPosition: "center 30%" }}
          />
        </div>
        <div>
          <p className={styles.eyebrow}>The Harmony difference</p>
          <h2 id="why-title" className={styles.title}>
            Care that puts <em>you</em> first
          </h2>
          <p className={styles.lead}>
            Our mission is to elevate the well-being and confidence of every patient in a warm, welcoming environment.
          </p>
          <ul className={styles.whyCards}>
            {reasons.map((reason) => (
              <li key={reason.title}>
                {reason.icon}
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Splits a display price like "$12 per unit" into the figure and its qualifier. */
function splitPrice(price: string) {
  const [amount, ...rest] = price.split(" ");
  return { amount, unit: rest.join(" ") };
}

const priceHighlights = [
  { group: "Injectables", name: "Daxxify", price: priceOf("injectables", "Daxxify"), note: "", href: "/daxxify" },
  { group: "Facials", name: "Glo2Facial", price: priceOf("facials", "Glo2Facial"), note: "per treatment", href: "/glo2facials" },
  { group: "Weight loss", name: "Semaglutide", price: priceOf("medical-weight-loss", "Semaglutide – 1 Month"), note: "1-month program", href: "/semaglutide" },
  { group: "Memberships", name: "Facial Membership", price: priceOf("facial-memberships", "Monthly"), note: "per month", href: "/membership" },
];

export function HomePricing() {
  return (
    <section className={styles.pricing} aria-labelledby="pricing-title">
      <div className={`${styles.wrap} ${styles.center} ${styles.head}`}>
        <p className={styles.eyebrow}>Transparent pricing</p>
        <h2 id="pricing-title" className={styles.title}>
          Know the price <em>before</em> you book
        </h2>
        <p className={styles.lead}>A few of our most popular treatments. Every 2026 price is on our pricing page.</p>
      </div>
      <ul className={`${styles.wrap} ${styles.priceGrid}`}>
        {priceHighlights.map((item) => {
          const { amount, unit } = splitPrice(item.price);
          return (
            <li key={item.name}>
              <Link className={styles.priceCard} href={item.href}>
                <div>
                  <small>{item.group}</small>
                  <h3>{item.name}</h3>
                </div>
                <div className={styles.priceAmount}>
                  <strong>{amount}</strong>
                  <span>{[unit, item.note].filter(Boolean).join(" · ")}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.wrap} ${styles.priceFoot}`}>
        <div>
          <Link className={styles.btnGold} href={PRICING_PATH}>
            View Full Price List
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link className={styles.btnLine} href={requestPricingHref()}>
            Request Personalized Pricing
          </Link>
        </div>
        <p>{PRICING_GENERAL_DISCLAIMER}</p>
      </div>
    </section>
  );
}

export function HomeTeam() {
  return (
    <section className={styles.team} aria-labelledby="team-title">
      <div className={`${styles.wrap} ${styles.center} ${styles.head}`}>
        <p className={styles.eyebrow}>Our team</p>
        <h2 id="team-title" className={styles.title}>
          Meet your <em>care team</em>
        </h2>
        <p className={styles.lead}>
          A caring and compassionate team committed to providing exceptional service, so you leave healthy, happy and confident.
        </p>
      </div>
      <ul className={`${styles.wrap} ${styles.teamGrid}`}>
        {providers.map((provider) => (
          <li key={provider.file}>
            <Link className={styles.teamCard} href="/our-team">
              <span className={styles.teamPhoto}>
                <Image src={`/images/providers/${provider.file}`} alt={provider.name} fill sizes="(max-width: 720px) 45vw, 240px" />
              </span>
              <span>
                <strong>{noBreakHyphens(provider.name)}</strong>
                {provider.title ? <span>{provider.title}</span> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

const reviews = [
  {
    quote:
      "I've been to a few Med Spas in Sarasota, and Jessica is absolutely the best. She truly cares about providing exceptional service and I am thrilled to have finally found a practitioner I can trust.",
    author: "Ariel F.",
  },
  {
    quote:
      "I was so pleased with my visit to Harmony Med Spa. Jessica and Haydon could not be more welcoming and professional. I felt an immediate rapport with Jessica. She is very knowledgeable and able to ask probing questions that helped me focus on the results I want to achieve. I highly recommend Harmony Med Spa.",
    author: "Leigh W.",
  },
  {
    quote:
      "I absolutely love Harmony Med Spa! The staff is friendly, kind, professional and attentive. The ambiance is welcoming and beautiful. Jessica is very knowledgeable and explains everything in detail and honestly. I highly recommend them.",
    author: "Wanda A.",
  },
];

export function HomeReviews() {
  return (
    <section className={styles.reviews} aria-labelledby="reviews-title">
      <div className={`${styles.wrap} ${styles.center} ${styles.head}`}>
        <p className={styles.eyebrow}>Patient reviews</p>
        <h2 id="reviews-title" className={styles.title}>
          What our patients <em>say</em>
        </h2>
      </div>
      <ul className={`${styles.wrap} ${styles.reviewGrid}`}>
        {reviews.map((review) => (
          <li key={review.author}>
            <figure className={styles.reviewCard}>
              <div>
                <span className={styles.stars} role="img" aria-label="Five star review">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} size={18} fill="currentColor" aria-hidden="true" />
                  ))}
                </span>
                <blockquote>{review.quote}</blockquote>
              </div>
              <figcaption className={styles.reviewer}>
                <span className={styles.avatar} aria-hidden="true">
                  {review.author.charAt(0)}
                </span>
                <span>
                  <strong>{review.author}</strong>
                  <small>Harmony Med Spa patient</small>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomeCta() {
  return (
    <section id="specials" className={styles.cta} aria-labelledby="cta-title">
      <div className={`${styles.wrap} ${styles.ctaCard}`}>
        <Image src={windowLight} alt="" fill placeholder="blur" sizes="(max-width: 1280px) 100vw, 1220px" style={{ objectPosition: "70% center" }} />
        <p className={styles.eyebrow}>Your visit starts here</p>
        <h2 id="cta-title" className={styles.title}>
          Ready to feel like <em>yourself</em> again?
        </h2>
        <p className={styles.lead}>Book online in minutes, or call our Gulf Gate team and we will help plan your first visit.</p>
        <div className={styles.actions}>
          <a className={styles.btnGold} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book Online
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className={styles.btnGlass} href={`tel:${PHONE_TEL}`}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <a className={styles.ctaNews} href={newsletterOptInUrl} target="_blank" rel="noopener noreferrer">
          Get specials and events in your inbox
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/** Contact details and a photo of the office beside the message form. */
export function HomeContact() {
  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className={`${styles.wrap} ${styles.contactCard}`}>
        <div className={styles.contactInfo}>
          <p className={styles.eyebrow}>Contact us</p>
          <h2 id="contact-title" className={styles.title}>
            Let&apos;s plan your <em>visit</em>
          </h2>
          <p className={styles.lead}>Send us a message and our team will reach out, or book online any time.</p>
          <ul className={styles.contactList}>
            <li>
              <Phone aria-hidden="true" />
              <span>
                <small>Call us</small>
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </span>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>
                <small>Visit us</small>
                <a href={GOOGLE_MAPS_LOCATION_URL} target="_blank" rel="noreferrer">
                  {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
                </a>
              </span>
            </li>
            <li>
              <Clock aria-hidden="true" />
              <span>
                <small>Hours</small>
                Mon – Fri, {WEEKDAY_HOURS_DISPLAY} · Sat – Sun closed
              </span>
            </li>
          </ul>
          <a className={styles.contactPhoto} href={GOOGLE_MAPS_LOCATION_URL} target="_blank" rel="noreferrer">
            <Image src={storefront} alt="Harmony Med Spa storefront in Gulf Gate, Sarasota" fill placeholder="blur" sizes="(max-width: 900px) 90vw, 480px" style={{ objectPosition: "center 35%" }} />
            <span>
              Get directions
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </a>
        </div>
        <div className={styles.contactForm}>
          <ContactForm variant="home" />
        </div>
      </div>
    </section>
  );
}
