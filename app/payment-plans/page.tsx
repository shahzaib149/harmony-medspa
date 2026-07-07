import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import PaymentCalculator from "@/components/ui/PaymentCalculator";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const youtubeEmbedUrl = "https://www.youtube.com/embed/4gueRZVcjCs?start=26";

export default function PaymentPlansPage() {
  return (
    <main className="payment-plans-page">
      <SiteHeader className="contact-page-header" />

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

      <SiteFooter />
    </main>
  );
}
