"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import NavDropdown, { type NavDropdownLink } from "@/components/layout/NavDropdown";
import styles from "./SiteHeader.module.css";
import { ONLINE_BOOKING_URL, PHONE_TEL } from "@/lib/constants";

type SiteHeaderProps = {
  /** Header style variant class (site-header | team-header | contact-page-header) plus utilities. */
  className: string;
  homeHref?: string;
};

const aboutLinks: NavDropdownLink[] = [
  { label: "Our Practice", href: "/about-us" },
  { label: "Meet the Team", href: "/our-team" },
  { label: "Before & After", href: "/before-and-afters" }
];

const patientCenterLinks: NavDropdownLink[] = [
  { label: "Patient Forms", href: "/patient-forms" },
  { label: "Payment Plans", href: "/payment-plans" },
  { label: "Gift Cards", href: "https://mailchi.mp/harmonymedspafl/gift_cards", newTab: true },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Specials", href: "/specials" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Newsletter", href: "https://mailchi.mp/harmonymedspafl/newsletter-opt-in", newTab: true },
  { label: "Membership", href: "/membership" }
];

/** Treatment pages, which sit under "Services" in the header. */
const serviceRoutes = [
  "/services",
  "/body",
  "/chemical-peels",
  "/daxxify",
  "/dermal-fillers",
  "/facials",
  "/facials-and-peels",
  "/fractional-co2-laser-treatments",
  "/glo2facials",
  "/hair-restoration",
  "/hormone-replacement-therapy",
  "/injectables",
  "/ipl-photofacial",
  "/iv-therapy",
  "/jeuveau",
  "/laser-hair-removal",
  "/lasers-and-lights",
  "/medical-weight-loss",
  "/peptide-therapy",
  "/rf-microneedling",
  "/sculptra",
  "/semaglutide",
  "/skincare",
  "/skincare-products",
  "/tirzepatide",
  "/wellness"
];

type NavSection = "home" | "about" | "services" | "pricing" | "shop" | "patient" | "contact";

/** The header item the current page belongs to, so it can be marked as open. */
function sectionFor(pathname: string): NavSection | null {
  const within = (route: string) => pathname === route || pathname.startsWith(`${route}/`);
  if (pathname === "/") return "home";
  if (aboutLinks.some((item) => within(item.href))) return "about";
  if (within("/specials") || patientCenterLinks.some((item) => item.href.startsWith("/") && within(item.href))) return "patient";
  if (within("/pricing")) return "pricing";
  if (within("/shop")) return "shop";
  if (within("/contact-us")) return "contact";
  if (serviceRoutes.some(within)) return "services";
  return null;
}

function NavLink({
  href,
  className,
  ariaLabel,
  onClick,
  newTab,
  active,
  children
}: {
  href: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  newTab?: boolean;
  /** Marks the link as the header item for the page that is open. */
  active?: boolean;
  children: React.ReactNode;
}) {
  if (active) className = className ? `${className} is-active` : "is-active";

  if (href.startsWith("#")) {
    return (
      <a className={className} href={href} aria-label={ariaLabel} aria-current={active ? "page" : undefined} onClick={onClick}>
        {children}
      </a>
    );
  }

  if (!href.startsWith("/")) {
    return (
      <a className={className} href={href} aria-label={ariaLabel} target={newTab ? "_blank" : undefined} rel={newTab ? "noreferrer" : undefined} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} aria-label={ariaLabel} aria-current={active ? "page" : undefined} onClick={onClick}>
      {children}
    </Link>
  );
}

// The header turns to frosted glass once the page scrolls (see "Sticky glass header" in globals.css).
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const isPageScrolled = () => window.scrollY > 12;
const isPageScrolledOnServer = () => false;

export default function SiteHeader({ className, homeHref = "/" }: SiteHeaderProps) {
  const pathname = usePathname() ?? "";
  const section = sectionFor(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"about" | "patient" | null>(null);

  const isScrolled = useSyncExternalStore(subscribeToScroll, isPageScrolled, isPageScrolledOnServer);
  const headerRef = useRef<HTMLElement>(null);

  // Publish the header's height as --site-header-h: the hero under it, sticky sidebars and
  // anchor scrolling all offset by it.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const publish = () => root.style.setProperty("--site-header-h", `${Math.round(header.getBoundingClientRect().height)}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--site-header-h");
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobilePanel(null);
  };

  return (
    <header ref={headerRef} className={`${className} ${styles.premiumHeader}${isScrolled ? " is-scrolled" : ""}`}>
      <div className={`mobile-menu hidden ${isMobileMenuOpen ? "is-open" : ""}`}>
        <button className="mobile-menu-trigger" type="button" aria-label="Open navigation" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={32} strokeWidth={2.4} />
        </button>
        {isMobileMenuOpen ? (
          <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            {mobilePanel ? (
              <>
                <div className="mobile-drawer-heading">
                  <button type="button" aria-label="Back to menu" onClick={() => setMobilePanel(null)}>
                    <ChevronLeft size={24} />
                  </button>
                  <span>{mobilePanel === "about" ? "About" : "Patient Center"}</span>
                </div>
                <nav className="mobile-drawer-links" aria-label={mobilePanel === "about" ? "About navigation" : "Patient center navigation"}>
                  {(mobilePanel === "about" ? aboutLinks : patientCenterLinks).map((item) => (
                    <NavLink href={item.href} key={item.label} newTab={item.newTab} active={pathname === item.href} onClick={closeMobileMenu}>
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </>
            ) : (
              <>
                <button className="mobile-drawer-close" type="button" aria-label="Close navigation" onClick={closeMobileMenu}>
                  <X size={25} />
                </button>
                <nav className="mobile-drawer-links mobile-drawer-main" aria-label="Mobile navigation">
                  <NavLink href={homeHref} active={section === "home"} onClick={closeMobileMenu}>Home</NavLink>
                  <button type="button" className={section === "about" ? "is-active" : undefined} onClick={() => setMobilePanel("about")}>
                    About
                    <ChevronRight size={22} />
                  </button>
                  <NavLink href="/services" active={section === "services"} onClick={closeMobileMenu}>Services</NavLink>
                  <NavLink href="/pricing" active={section === "pricing"} onClick={closeMobileMenu}>Pricing</NavLink>
                  <NavLink href="/shop" active={section === "shop"} onClick={closeMobileMenu}>Shop</NavLink>
                  <button type="button" className={section === "patient" ? "is-active" : undefined} onClick={() => setMobilePanel("patient")}>
                    Patient Center
                    <ChevronRight size={22} />
                  </button>
                  <NavLink href="/contact-us" active={section === "contact"} onClick={closeMobileMenu}>Contact Us</NavLink>
                </nav>
              </>
            )}
          </div>
        ) : null}
      </div>
      <nav className="nav-left flex gap-[clamp(28px,4vw,62px)] items-center pt-[12px] justify-start max-[1050px]:p-0 max-[1050px]:gap-[22px] max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:gap-x-[18px] max-[720px]:gap-y-[8px] max-[720px]:text-[length:12px] max-[430px]:gap-x-[13px] max-[430px]:text-[length:11px]" aria-label="Primary left">
        <NavLink href={homeHref} active={section === "home"}>Home</NavLink>
        <NavDropdown label="About" links={aboutLinks} active={section === "about"} pathname={pathname} />
        <NavLink href="/services" active={section === "services"}>Services</NavLink>
        <NavLink href="/pricing" active={section === "pricing"}>Pricing</NavLink>
      </nav>
      <NavLink className="brand block w-[270px] [&_img]:block [&_img]:w-full [&_img]:h-auto max-[720px]:w-[205px] max-[430px]:w-[178px]" href={homeHref} ariaLabel="Harmony Med Spa home">
        <Image src="/images/logo-transparent.png" alt="Harmony Med Spa" width={270} height={111} priority />
      </NavLink>
      <nav className="nav-right flex gap-[clamp(28px,4vw,62px)] items-center pt-[12px] justify-end max-[1050px]:p-0 max-[1050px]:gap-[22px] max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:gap-x-[18px] max-[720px]:gap-y-[8px] max-[720px]:text-[length:12px] max-[430px]:gap-x-[13px] max-[430px]:text-[length:11px]" aria-label="Primary right">
        <NavLink href="/shop" active={section === "shop"}>Shop</NavLink>
        <NavDropdown label="Patient Center" links={patientCenterLinks} active={section === "patient"} pathname={pathname} />
        <NavLink href="/contact-us" active={section === "contact"}>Contact Us</NavLink>
      </nav>
      <div className="mobile-actions hidden">
        <a href={`tel:${PHONE_TEL}`} aria-label="Call Harmony Med Spa">
          <Phone size={18} fill="currentColor" />
        </a>
        <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Book an appointment">
          <CalendarDays size={18} />
        </a>
      </div>
    </header>
  );
}
