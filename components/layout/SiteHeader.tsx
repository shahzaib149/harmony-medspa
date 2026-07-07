import Link from "next/link";
import AboutDropdown from "@/components/layout/AboutDropdown";
import PatientCenterDropdown from "@/components/layout/PatientCenterDropdown";

type SiteHeaderProps = {
  className: "site-header" | "team-header" | "contact-page-header";
  homeHref?: string;
  servicesHref?: string;
  contactHref?: string;
};

function NavLink({ href, className, ariaLabel, children }: { href: string; className?: string; ariaLabel?: string; children: React.ReactNode }) {
  if (href.startsWith("#")) {
    return (
      <a className={className} href={href} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export default function SiteHeader({ className, homeHref = "/", servicesHref = "/services", contactHref = "/contact-us" }: SiteHeaderProps) {
  return (
    <header className={className}>
      <nav className="nav-left" aria-label="Primary left">
        <NavLink href={homeHref}>home</NavLink>
        <AboutDropdown />
        <NavLink href={servicesHref}>services</NavLink>
      </nav>
      <NavLink className="brand" href={homeHref} ariaLabel="Harmony Med Spa home">
        <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
      </NavLink>
      <nav className="nav-right" aria-label="Primary right">
        <NavLink href="/shop">shop</NavLink>
        <PatientCenterDropdown />
        <NavLink href={contactHref}>contact us</NavLink>
      </nav>
    </header>
  );
}
