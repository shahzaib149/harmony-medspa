import Link from "next/link";
import AboutDropdown from "@/components/layout/AboutDropdown";
import PatientCenterDropdown from "@/components/layout/PatientCenterDropdown";

type SiteHeaderProps = {
  /** Header style variant class (site-header | team-header | contact-page-header) plus utilities. */
  className: string;
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
      <nav className="nav-left flex gap-[clamp(28px,4vw,62px)] items-center pt-[12px] justify-start max-[1050px]:p-0 max-[1050px]:gap-[22px] max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:text-[length:12px]" aria-label="Primary left">
        <NavLink href={homeHref}>home</NavLink>
        <AboutDropdown />
        <NavLink href={servicesHref}>services</NavLink>
      </nav>
      <NavLink className="brand block w-[270px] [&_img]:block [&_img]:w-full [&_img]:h-auto max-[720px]:w-[205px]" href={homeHref} ariaLabel="Harmony Med Spa home">
        <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
      </NavLink>
      <nav className="nav-right flex gap-[clamp(28px,4vw,62px)] items-center pt-[12px] justify-end max-[1050px]:p-0 max-[1050px]:gap-[22px] max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:text-[length:12px]" aria-label="Primary right">
        <NavLink href="/shop">shop</NavLink>
        <PatientCenterDropdown />
        <NavLink href={contactHref}>contact us</NavLink>
      </nav>
    </header>
  );
}
