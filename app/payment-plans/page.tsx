import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone, Search } from "lucide-react";
import AboutDropdown from "../ui/AboutDropdown";
import PatientCenterDropdown from "../ui/PatientCenterDropdown";
import PaymentCalculator from "./PaymentCalculator";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

const youtubeEmbedUrl = "https://www.youtube.com/embed/4gueRZVcjCs?start=26";

export default function PaymentPlansPage() {
  return (
    <main className="payment-plans-page">
      <header className="contact-page-header">
        <nav className="nav-left" aria-label="Primary left">
          <Link href="/">home</Link>
          <AboutDropdown />
          <Link href="/services">services</Link>
        </nav>
        <Link className="brand" href="/" aria-label="Harmony Med Spa home">
          <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
        </Link>
        <nav className="nav-right" aria-label="Primary right">
          <Link href="/shop">shop</Link>
          <PatientCenterDropdown />
          <Link href="/contact-us">contact us</Link>
        </nav>
      </header>

      <section className="payment-plans-hero">
        <h1>payment plans</h1>
      </section>

      <section className="payment-plans-content">
        <article className="payment-plans-main">
          <section className="payment-section payment-cherry" aria-labelledby="cherry-title">
            <h2 id="cherry-title">Cherry Payment Plans</h2>
            <p>Get treated now and pay over time with Cherry.</p>
            <p>
              Cherry is a payment plan designed for your health, beauty, and wellness needs and procedures and allows you to make
              convenient monthly payments.
            </p>
            <a
              className="line-button payment-line-button"
              href="https://pay.withcherry.com/harmonymedspafl?utm_source=merchant&utm_medium=website*"
              target="_blank"
              rel="noreferrer"
            >
              Apply With Cherry
            </a>

            <div className="payment-cherry-grid">
              <Image src="/images/about-us/Img_3.jpg" alt="Cherry payment plans preview" width={460} height={307} />
              <div>
                <h3>3 Reasons Why Patients Love Cherry:</h3>
                <ol>
                  <li>Cherry qualifies patients for up to $10,000.00.</li>
                  <li>There is no hard credit check.</li>
                  <li>Cherry offers zero percent financing options*</li>
                </ol>
                <p className="payment-note">
                  *0% promo APR is subject to approval. Regular APR 9.99% - 35.99%. Down payment may be required.
                </p>
              </div>
            </div>

            <div className="payment-requirements">
              <div>
                <h3>Patient Requirements</h3>
                <ol>
                  <li>Patients must be at least 18 years of age</li>
                  <li>Patients must have a valid bank issued debit card</li>
                </ol>
              </div>
              <Image src="/images/about-us/Img_3.jpg" alt="" width={392} height={262} />
            </div>
          </section>

          <section className="payment-section payment-care-credit" aria-labelledby="care-credit-title">
            <h2 id="care-credit-title">Care Credit</h2>
            <p>
              <strong>
                Harmony Med Spa proudly accepts the CareCredit credit card for all your health, wellness and beauty wants or needs.
              </strong>
            </p>
            <p>
              Help fit the care you want or need into your budget with the CareCredit health and wellness credit card. It offers flexible
              financing options that allow you to pay over time.*
            </p>
            <ul>
              <li>Promotional financing options available</li>
              <li>See if you prequalify with no impact to your credit score</li>
              <li>Instant credit decisions</li>
              <li>No annual fee&dagger;</li>
            </ul>
            <p>
              CareCredit also helps make care possible for you and your family. It&apos;s accepted at 266,000+ locations, so you can pay
              for chiropractic, dentistry, dermatology, cosmetic, hearing, prescriptions, pet care and more. It&apos;s a convenient way to
              help cover expenses not covered by insurance into your budget.
            </p>
            <p>Learn more by visiting carecredit.com or contacting our office.</p>
            <p className="payment-disclaimer">
              *Subject to credit approval. Visit carecredit.com for details.
              <br />
              &dagger; For new accounts as of 5/30/24: Purchase APR is 32.99%. Penalty APR is 39.99%. Minimum Interest Charge is $2.
              <br />
              CareCredit is a Synchrony solution. When you go to the CareCredit website you will be subject to the Synchrony privacy
              policy, which differs from the Harmony Med Spa privacy policy.
            </p>
            <a className="line-button payment-apply-button" href="https://www.carecredit.com/" target="_blank" rel="noreferrer">
              Apply Now
            </a>
          </section>

          <div className="payment-video" aria-label="CareCredit video">
            <iframe
              src={youtubeEmbedUrl}
              title="CareCredit: Your Way to Pay for Health and Wellness"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <section className="payment-section payment-calculator-section" aria-labelledby="calculator-title">
            <h2 id="calculator-title">Care Credit Calculator</h2>
            <PaymentCalculator />
          </section>
        </article>

        <aside className="payment-plans-sidebar" aria-label="Payment plans links">
          <label className="about-search">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={18} />
          </label>

          <Link className="about-side-card" href="/services">
            <Image src="/images/about-us/img_1.png" alt="" fill sizes="390px" />
            <span>
              All
              <br />
              Services
            </span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card" href="/contact-us">
            <Image src="/images/about-us/Img_2.png" alt="" fill sizes="390px" />
            <span>
              Keep
              <br />
              In Touch
            </span>
            <small>Contact Us</small>
          </Link>
        </aside>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="awards">
            <div className="award-circle">2024<br /><strong>BNS</strong><span>Best in Business</span></div>
            <div className="bbb">BBB Accredited Business</div>
          </div>
          <div className="footer-contact">
            <p>
              <MapPin size={18} />
              <a className="footer-address" href={googleMapsLocationUrl} target="_blank" rel="noreferrer">
                2184 Gulf Gate Dr.<br />Sarasota, FL 34231
              </a>
            </p>
            <p><Phone size={18} />Phone:<br />(941) 923-8990</p>
            <p><Building2 size={18} />Fax:<br />(941) 923-9024</p>
          </div>
          <div className="hours">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <p key={day}><span>{day}</span><strong>9:00am to 5:00pm</strong></p>
            ))}
            <p><span>Saturday</span><strong>Closed</strong></p>
            <p><span>Sunday</span><strong>Closed</strong></p>
          </div>
          <div className="social">
            <p>Follow Us On</p>
            <div>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Google"><Mail size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Book"><CalendarDays size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
