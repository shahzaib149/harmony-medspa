import Link from "next/link";
import { Building2, Facebook, Instagram, Mail, MapPin, Phone, Search } from "lucide-react";
import AboutDropdown from "../ui/AboutDropdown";
import PatientCenterDropdown from "../ui/PatientCenterDropdown";
import MembershipForm from "./MembershipForm";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";
const bookNowUrl = "https://na02.patientnow.com/a/harmonymedspa/OnlineBooking.aspx";
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
        <a href={bookNowUrl} target="_blank" rel="noopener noreferrer">book now <span aria-hidden="true">&gt;</span></a>
      </section>

      <section className="membership-forms" aria-label="Membership forms">
        <MembershipForm kind="pricing" />
        <MembershipForm kind="membership" />
      </section>

      <footer className="footer membership-footer">
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
            {weekdays.map((day) => (
              <p key={day}><span>{day}</span><strong>9:00am to 5:00pm</strong></p>
            ))}
            <p><span>Saturday</span><strong>Closed</strong></p>
            <p><span>Sunday</span><strong>Closed</strong></p>
          </div>
          <div className="social">
            <p>Follow Us On</p>
            <div>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Google"><Search size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="Yelp"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
