import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Facebook, Instagram, MapPin, Phone, Printer } from "lucide-react";
import PoweredByCodeSquad from "@/components/layout/PoweredByCodeSquad";
import styles from "./SiteFooter.module.css";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  FACEBOOK_URL,
  FAX_DISPLAY,
  GOOGLE_MAPS_BUSINESS_URL,
  GOOGLE_MAPS_LOCATION_URL,
  INSTAGRAM_URL,
  LOGO_PATH,
  ONLINE_BOOKING_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_NAME,
  TWITTER_X_URL,
  WEEKDAY_HOURS_DISPLAY,
  YELP_URL
} from "@/lib/constants";

const exploreLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Meet the Team", href: "/our-team" },
  { label: "All Services", href: "/services" },
  { label: "Treatment Pricing", href: "/pricing" },
  { label: "Memberships", href: "/membership" },
  { label: "Before & After", href: "/before-and-afters" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" }
];

const treatmentLinks = [
  { label: "Daxxify", href: "/daxxify" },
  { label: "Dermal Fillers", href: "/dermal-fillers" },
  { label: "RF Microneedling", href: "/rf-microneedling" },
  { label: "Fractional CO2 Laser", href: "/fractional-co2-laser-treatments" },
  { label: "Glo2Facial", href: "/glo2facials" },
  { label: "IV Therapy", href: "/iv-therapy" },
  { label: "Medical Weight Loss", href: "/medical-weight-loss" },
  { label: "Hormone Therapy", href: "/hormone-replacement-therapy" }
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.4-1.66 4.1-5.27 4.1-3.17 0-5.76-2.63-5.76-5.87s2.59-5.87 5.76-5.87c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.83 3.97 14.73 3 12.18 3 7.03 3 2.86 7.17 2.86 12.31s4.17 9.31 9.32 9.31c5.38 0 8.95-3.78 8.95-9.1 0-.61-.07-1.08-.16-1.42z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.18 10.95L15.34 2.8a.72.72 0 0 0-.96-.91l-7.23 4.8a.72.72 0 0 0-.17.97l3.2 5.08a.72.72 0 0 0 1-.79zm-2.47 2.05l-8.08-2.2a.72.72 0 0 0-.85 1.02l4.98 7.1a.72.72 0 0 0 .98.15l4.19-4.35a.72.72 0 0 0-1.22-1.72zm2.96 1.45l4.35 4.19a.72.72 0 0 0 1.13-.56l.46-8.67a.72.72 0 0 0-.82-.75l-6.3 1.83a.72.72 0 0 0 1.18 3.96z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: FACEBOOK_URL, icon: <Facebook size={18} aria-hidden="true" /> },
  { label: "Google reviews", href: GOOGLE_MAPS_BUSINESS_URL, icon: <GoogleIcon /> },
  { label: "Instagram", href: INSTAGRAM_URL, icon: <Instagram size={18} aria-hidden="true" /> },
  { label: "X (Twitter)", href: TWITTER_X_URL, icon: <XIcon /> },
  { label: "Yelp", href: YELP_URL, icon: <YelpIcon /> }
];

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav className={styles.column} aria-label={title}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.links}>
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Site-wide footer: booking band, brand and social, quick links, and visit details. */
export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cta}>
          <div>
            <p className={styles.kicker}>Gulf Gate · Sarasota, FL</p>
            <h2 className={styles.ctaTitle}>Book your next visit</h2>
            <p className={styles.ctaText}>Schedule online in minutes, or call and our team will help plan your treatment.</p>
          </div>
          <div className={styles.ctaActions}>
            <a className={styles.primary} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book Online
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className={styles.secondary} href={`tel:${PHONE_TEL}`}>
              <Phone size={17} aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label={`${SITE_NAME} home`}>
              <Image src={LOGO_PATH} alt={SITE_NAME} width={337} height={97} />
            </Link>
            <p className={styles.tagline}>Hormones, aesthetics and wellness with natural-looking results, in the heart of Gulf Gate.</p>
            <ul className={styles.social} aria-label="Follow Harmony Med Spa">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.awards}>
              <Image src="/images/footer/main.png" alt="2024 Best in Business award, medical weight loss and skin rejuvenation in Sarasota" width={212} height={212} className={styles.award} />
              <Image src="/images/footer/bbb.png" alt="BBB Accredited Business, A+ rating" width={293} height={61} className={styles.bbb} />
            </div>
          </div>

          <FooterLinks title="Explore" links={exploreLinks} />
          <FooterLinks title="Treatments" links={treatmentLinks} />

          <div className={styles.column}>
            <h2 className={styles.heading}>Visit us</h2>
            <ul className={styles.contact}>
              <li>
                <MapPin size={18} aria-hidden="true" />
                <a href={GOOGLE_MAPS_LOCATION_URL} target="_blank" rel="noreferrer">
                  {SITE_NAME}
                  <br />
                  {ADDRESS_LINE_1}
                  <br />
                  {ADDRESS_LINE_2}
                </a>
              </li>
              <li>
                <Phone size={18} aria-hidden="true" />
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <Printer size={18} aria-hidden="true" />
                <span>Fax {FAX_DISPLAY}</span>
              </li>
            </ul>
            <dl className={styles.hours}>
              <div>
                <dt>Monday – Friday</dt>
                <dd>{WEEKDAY_HOURS_DISPLAY}</dd>
              </div>
              <div>
                <dt>Saturday – Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © 2026 {SITE_NAME}. All rights reserved.
            <span aria-hidden="true"> · </span>
            Accessibility Statement
            <span aria-hidden="true"> · </span>
            Privacy Policy
            <span aria-hidden="true"> · </span>
            <a href="/sitemap.xml">Sitemap</a>
          </p>
          <PoweredByCodeSquad />
        </div>
      </div>
    </footer>
  );
}
