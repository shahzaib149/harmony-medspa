import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import GiftCardBonusBanner from "@/components/promotions/GiftCardBonusBanner";
import GiftCardRequest from "@/components/gift-cards/GiftCardRequest";
import { PhaseScope } from "@/components/promotions/noir/NoirParts";
import { giftCardFaq } from "@/lib/data/blackFriday2026";
import { displayFont } from "@/lib/fonts";
import { buildFaqPageSchema } from "@/lib/schema";
import { openGraphFor } from "@/lib/seo/metadata";
import styles from "@/components/gift-cards/GiftCards.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Gift Cards | Harmony Med Spa Sarasota" },
  description:
    "Request a Harmony Med Spa gift card in Sarasota for any amount. We contact only you, never the recipient, to finalize your gift and arrange secure payment. Purchased gift cards never expire.",
  alternates: { canonical: "/gift-cards" },
  openGraph: openGraphFor("/gift-cards", { title: "Gift Cards | Harmony Med Spa Sarasota" }),
};

const STEPS = [
  { title: "Submit your request", body: "Tell us who the gift is for, the amount, and how you'd like us to reach you." },
  { title: "We contact you to arrange secure payment", body: "A member of our team contacts you, never the recipient, to finalize your gift card." },
  { title: "Your gift card is prepared", body: "We prepare your Harmony Med Spa gift card, ready to give." },
];

export default function GiftCardsPage() {
  const faqSchema = buildFaqPageSchema(giftCardFaq);
  return (
    <main className={`${displayFont.variable} ${styles.page}`}>
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <SiteHeader className="site-header" />
      <div className={styles.headerSpace} />
      <GiftCardBonusBanner />
      <PhaseScope as="box">
        <section className={styles.hero} aria-label="Request a gift card" data-no-reveal>
          <div className={styles.container}>
            <GiftCardRequest />
          </div>
        </section>
      </PhaseScope>

      <section className={styles.how} aria-labelledby="gc-how">
        <div className={styles.container}>
          <p className={styles.eyebrow}>How It Works</p>
          <h2 id="gc-how" className={styles.h2}>Simple, Personal <em>&amp; Private</em></h2>
          <ol className={styles.howList}>
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className={styles.howNum}>{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="gc-faq">
        <div className={`${styles.container} ${styles.narrow}`}>
          <p className={styles.eyebrow}>Questions</p>
          <h2 id="gc-faq" className={styles.h2}>Gift Card <em>FAQ</em></h2>
          <div className={styles.faq}>
            {giftCardFaq.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
