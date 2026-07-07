import MembershipForm from "@/components/forms/MembershipForm";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { ONLINE_BOOKING_URL } from "@/lib/constants";

const facialMemberships = [
  {
    name: "Facial Membership",
    benefits: ["1 Monthly Facial (60mins)+1 Enhancement with Every Facial", "Get $10/unit tox while a Member", "Get 10% off Skincare while a Member"],
    monthly: "$149",
    semiAnnual: "$700",
    semiSavings: "Save $194",
    annual: "$1400",
    annualSavings: "Save $388"
  },
  {
    name: "Glo2 Facial Membership",
    benefits: ["1 Monthly Glo2Facial (45mins) with Red-Light Lymphatic Massage", "Get $10/unit tox while a Member", "Get 10% off Skincare while a Member"],
    monthly: "$199",
    semiAnnual: "$1000",
    annual: "$2000"
  }
];

const harmonyMemberships = [
  {
    name: "Vip Membership",
    details: ["$159/Month Beauty Bank", "Monthly Benefit: +1 Free Vitamin Shot per Month"],
    injectables: "10%",
    skincare: "10%",
    devices: "10%"
  },
  {
    name: "Vip Elite Membership",
    details: ["$259/Month Beauty Bank", "Monthly Benefit:+1 Free Vitamin Shot per Month", "Annual Benefit: 1 Free Device /Laser Treatment Per Year"],
    injectables: "10%",
    skincare: "10%",
    devices: "15%"
  }
];

export default function MembershipPage() {
  return (
    <main className="membership-page">
      <SiteHeader className="contact-page-header" />

      <section className="membership-hero">
        <h1>membership</h1>
      </section>

      <section className="membership-section membership-facials" aria-labelledby="facial-memberships">
        <h2 id="facial-memberships">facial memberships</h2>
        <p>Choose between our Signature Facials or the advanced Glo2Facial.</p>

        <div className="membership-pricing-table membership-facial-table">
          <div className="membership-table-head" aria-hidden="true">
            <span />
            <span />
            <strong>Monthly</strong>
            <strong>Semi-Annual</strong>
            <strong>Annual</strong>
          </div>
          {facialMemberships.map((membership) => (
            <article className="membership-table-row" key={membership.name}>
              <h3>{membership.name}</h3>
              <div className="membership-details">
                {membership.benefits.map((benefit) => (
                  <p key={benefit}>{benefit}</p>
                ))}
              </div>
              <div className="membership-price">
                <small>Monthly</small>
                <strong>{membership.monthly}</strong>
              </div>
              <div className="membership-price">
                <small>Semi-Annual</small>
                <strong>{membership.semiAnnual}</strong>
                {membership.semiSavings ? <span>{membership.semiSavings}</span> : null}
              </div>
              <div className="membership-price">
                <small>Annual</small>
                <strong>{membership.annual}</strong>
                {membership.annualSavings ? <span>{membership.annualSavings}</span> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="membership-section membership-harmony" aria-labelledby="harmony-memberships">
        <h2 id="harmony-memberships">harmony memberships</h2>
        <p>Exclusive member benefits and beauty bank for year-round beauty and wellness.</p>

        <div className="membership-discount-head" aria-hidden="true">
          <span />
          <span />
          <span>Discount on<br />Injectables &amp; Facials</span>
          <span>Discount on<br />Medical-Grade Skincare</span>
          <span>Discount on Device/<br />Laser Treatments</span>
        </div>

        <div className="membership-pricing-table membership-benefit-table">
          {harmonyMemberships.map((membership) => (
            <article className="membership-table-row" key={membership.name}>
              <h3>{membership.name}</h3>
              <div className="membership-details">
                {membership.details.map((detail, index) => (
                  <p key={detail}>{index === 0 ? <strong>{detail}</strong> : detail}</p>
                ))}
              </div>
              <div className="membership-price">
                <small>Injectables &amp; Facials</small>
                <strong>{membership.injectables}</strong>
              </div>
              <div className="membership-price">
                <small>Medical-Grade Skincare</small>
                <strong>{membership.skincare}</strong>
              </div>
              <div className="membership-price">
                <small>Device/Laser Treatments</small>
                <strong>{membership.devices}</strong>
              </div>
            </article>
          ))}
        </div>

        <div className="beauty-bank">
          <h3>*What Is A<br />Beauty Bank?</h3>
          <p>
            Our Beauty Bank is a flexible savings program that lets you set aside money each month toward your favorite beauty services.
            Think of it as a personal beauty savings account- your monthly contribution builds up over time and can be used for any service
            or product.
          </p>
        </div>
      </section>

      <section className="membership-cta" aria-label="Book a membership consultation">
        <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">book now <span aria-hidden="true">&gt;</span></a>
      </section>

      <section className="membership-forms" aria-label="Membership forms">
        <MembershipForm kind="pricing" />
        <MembershipForm kind="membership" />
      </section>

      <SiteFooter variant="membership-footer" social="membership" />
    </main>
  );
}
