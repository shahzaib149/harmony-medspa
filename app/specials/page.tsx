import Image from "next/image";
import { Facebook, Instagram, Mail } from "lucide-react";

const specials = [
  {
    src: "/images/specials/summer-drips.jpg",
    alt: "Stars, Stripes and Summer Drips IV and vitamin injection specials",
    actions: [
      { label: "Book an IV Therapy Session or Vitamin Shot", href: "/book-now", variant: "blue" }
    ]
  },
  {
    src: "/images/specials/memberships.jpg",
    alt: "Harmony Med Spa memberships built for your glow",
    actions: [
      { label: "Request a Membership", href: "#specials-interest", variant: "black" }
    ]
  },
  {
    src: "/images/specials/peptide-therapy.jpg",
    alt: "Peptide therapy at Harmony Med Spa",
    actions: [
      { label: "Book Now", href: "/book-now", variant: "black" },
      { label: "Request Pricing on Peptides", href: "#specials-interest", variant: "black" }
    ]
  }
];

export default function SpecialsPage() {
  return (
    <main className="specials-page">
      <header className="specials-header">
        <a className="specials-brand" href="/" aria-label="Harmony Med Spa home">
          <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
        </a>
        <address>
          2184 Gulf Gate Dr. Unit B Sarasota, FL 34231
          <br />
          <a href="tel:9419238990">(941)-923-8990</a> | Fax: <a href="tel:9419239024">(941)-923-9024</a> | <a href="https://harmonymedspafl.com">Harmonymedspafl.com</a>
        </address>
      </header>

      <section className="specials-list" aria-label="Current specials">
        {specials.map((special) => (
          <article className="specials-offer" key={special.src}>
            <Image src={special.src} alt={special.alt} width={720} height={486} priority={special.src.includes("summer")} />
            <div className="specials-actions">
              {special.actions.map((action) => (
                <a className={`specials-action specials-action-${action.variant}`} href={action.href} key={action.label}>
                  {action.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="specials-interest" id="specials-interest" aria-labelledby="specials-interest-title">
        <h1 id="specials-interest-title">Interested? Tell Us How to Contact You!</h1>
        <p>Please enter your email address (required) and your mobile number if you&apos;d like us to text you for the fastest response.</p>
        <p>A member of our team will follow up as soon as possible to help you choose the perfect package, answer any questions, and reserve your spot before these limited-time offers end.</p>

        <form className="specials-form">
          <label>
            <span>First Name</span>
            <input type="text" name="firstName" />
          </label>
          <label>
            <span>Last Name</span>
            <input type="text" name="lastName" />
          </label>
          <label>
            <span>Email Address</span>
            <input type="email" name="email" />
          </label>
          <label>
            <span>SMS Phone Number</span>
            <div className="specials-phone-input">
              <select name="country" aria-label="Country code" defaultValue="US">
                <option value="US">US</option>
              </select>
              <input type="tel" name="phone" placeholder="+1" aria-label="SMS phone number" />
            </div>
          </label>
          <p className="specials-disclaimer">
            Harmony Med Spa - By providing your phone number, you agree to receive promotional and marketing messages, notifications, and customer service communications from Harmony Med Spa. Message and data rates may apply. Consent is not a condition of purchase. Message frequency varies. Text HELP for help. Text STOP to cancel. <a href="#">See terms</a>, <a href="#">See Privacy Policy</a>.
          </p>
          <button type="submit">Submit</button>
        </form>
      </section>

      <footer className="specials-footer" aria-label="Social links">
        <a href="#" aria-label="Facebook"><Facebook size={14} fill="currentColor" /></a>
        <a href="#" aria-label="Instagram"><Instagram size={14} /></a>
        <a href="mailto:management@harmonymedspafl.com" aria-label="Email"><Mail size={14} /></a>
      </footer>
    </main>
  );
}
