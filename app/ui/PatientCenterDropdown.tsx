import Link from "next/link";

const patientLinks = [
  { label: "patient forms", href: "#" },
  { label: "payment plans", href: "#" },
  { label: "gift cards", href: "#" },
  { label: "testimonials", href: "#" },
  { label: "specials", href: "/specials" },
  { label: "events", href: "#" },
  { label: "blog", href: "#" },
  { label: "newsletter", href: "/learn-more" },
  { label: "membership", href: "/specials#specials-interest" }
];

export default function PatientCenterDropdown() {
  return (
    <details className="nav-dropdown patient-dropdown">
      <summary>patient center</summary>
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
    </details>
  );
}
