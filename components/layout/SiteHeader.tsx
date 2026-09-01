"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import AboutDropdown from "@/components/layout/AboutDropdown";
import PatientCenterDropdown from "@/components/layout/PatientCenterDropdown";
import styles from "./SiteHeader.module.css";
import { ONLINE_BOOKING_URL, PHONE_TEL } from "@/lib/constants";

type SiteHeaderProps = {
  /** Header style variant class (site-header | team-header | contact-page-header) plus utilities. */
  className: string;
  homeHref?: string;
  servicesHref?: string;
  contactHref?: string;
};

const patientCenterLinks = [
  { label: "Patient Forms", href: "/patient-forms" },
  { label: "Payment Plans", href: "/payment-plans" },
  { label: "Gift Cards", href: "https://mailchi.mp/harmonymedspafl/gift_cards" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Specials", href: "https://mailchi.mp/harmonymedspafl/monthly-specials", newTab: true },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Newsletter", href: "https://mailchi.mp/harmonymedspafl/newsletter-opt-in", newTab: true },
  { label: "Membership", href: "/membership" }
];

function NavLink({
  href,
  className,
  ariaLabel,
  onClick,
  newTab,
  children
}: {
  href: string;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  newTab?: boolean;
  children: React.ReactNode;
}) {
  if (href.startsWith("#")) {
    return (
      <a className={className} href={href} aria-label={ariaLabel} onClick={onClick}>
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
    <Link className={className} href={href} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function SiteHeader({ className, homeHref = "/", servicesHref = "/services", contactHref = "/contact-us" }: SiteHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"about" | "patient" | null>(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobilePanel(null);
  };

  return (
    <header className={`${className} ${styles.premiumHeader}`}>
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
                  {mobilePanel === "about" ? (
                    <>
                      <NavLink href="/about-us" onClick={closeMobileMenu}>Our Practice</NavLink>
                      <NavLink href="/our-team" onClick={closeMobileMenu}>Meet the Team</NavLink>
                      <NavLink href="/before-and-afters" onClick={closeMobileMenu}>Before &amp; After</NavLink>
                    </>
                  ) : (
                    patientCenterLinks.map((item) => (
                      <NavLink href={item.href} key={item.label} newTab={item.newTab} onClick={closeMobileMenu}>
                        {item.label}
                      </NavLink>
                    ))
                  )}
                </nav>
              </>
            ) : (
              <>
                <button className="mobile-drawer-close" type="button" aria-label="Close navigation" onClick={closeMobileMenu}>
                  <X size={25} />
                </button>
                <nav className="mobile-drawer-links mobile-drawer-main" aria-label="Mobile navigation">
                  <NavLink href={homeHref} onClick={closeMobileMenu}>Home</NavLink>
                  <button type="button" onClick={() => setMobilePanel("about")}>
                    About
                    <ChevronRight size={22} />
                  </button>
                  <NavLink href={servicesHref} onClick={closeMobileMenu}>Services</NavLink>
                  <NavLink href="/shop" onClick={closeMobileMenu}>Shop</NavLink>
                  <button type="button" onClick={() => setMobilePanel("patient")}>
                    Patient Center
                    <ChevronRight size={22} />
                  </button>
                  <NavLink href={contactHref} onClick={closeMobileMenu}>Contact Us</NavLink>
                </nav>
              </>
            )}
          </div>
        ) : null}
      </div>
      <nav className="nav-left flex gap-[clamp(28px,4vw,62px)] items-center pt-[12px] justify-start max-[1050px]:p-0 max-[1050px]:gap-[22px] max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:gap-x-[18px] max-[720px]:gap-y-[8px] max-[720px]:text-[length:12px] max-[430px]:gap-x-[13px] max-[430px]:text-[length:11px]" aria-label="Primary left">
        <NavLink href={homeHref}>Home</NavLink>
        <AboutDropdown />
        <NavLink href={servicesHref}>Services</NavLink>
      </nav>
      <NavLink className="brand block w-[270px] [&_img]:block [&_img]:w-full [&_img]:h-auto max-[720px]:w-[205px] max-[430px]:w-[178px]" href={homeHref} ariaLabel="Harmony Med Spa home">
        <Image src="/images/logo-transparent.png" alt="Harmony Med Spa" width={270} height={111} priority />
      </NavLink>
      <nav className="nav-right flex gap-[clamp(28px,4vw,62px)] items-center pt-[12px] justify-end max-[1050px]:p-0 max-[1050px]:gap-[22px] max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:gap-x-[18px] max-[720px]:gap-y-[8px] max-[720px]:text-[length:12px] max-[430px]:gap-x-[13px] max-[430px]:text-[length:11px]" aria-label="Primary right">
        <NavLink href="/shop">Shop</NavLink>
        <PatientCenterDropdown />
        <NavLink href={contactHref}>Contact Us</NavLink>
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
