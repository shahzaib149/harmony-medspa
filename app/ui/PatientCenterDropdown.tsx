import Link from "next/link";

const monthlySpecialsUrl = "https://mailchi.mp/harmonymedspafl/monthly-specials";
const newsletterOptInUrl = "https://mailchi.mp/harmonymedspafl/newsletter-opt-in";
const giftCardsUrl = "https://mailchi.mp/harmonymedspafl/gift_cards";

const patientLinks = [
  { label: "patient forms", href: "/patient-forms" },
  { label: "payment plans", href: "/payment-plans" },
  { label: "gift cards", href: giftCardsUrl },
  { label: "testimonials", href: "/testimonials" },
  { label: "specials", href: monthlySpecialsUrl },
  { label: "events", href: "/events" },
  { label: "blog", href: "/blog" },
  { label: "newsletter", href: newsletterOptInUrl },
  { label: "membership", href: "/membership" }
];

export default function PatientCenterDropdown() {
  return (
    <div className="nav-dropdown patient-dropdown">
      <button className="nav-dropdown-trigger" type="button" aria-haspopup="true">
        patient center
      </button>
      <div className="nav-dropdown-menu">
        {patientLinks.map((item) =>
          item.href.startsWith("/") ? (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ) : (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          )
        )}
      </div>
    </div>
  );
}
