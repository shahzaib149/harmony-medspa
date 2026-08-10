"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 28) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check on initial load
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.location.hash = "contact";
    }
  };

  return (
    <header className={`landing-navbar ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="landing-navbar-inner">
        <Link className="landing-logo" href="#home" aria-label="Harmony Med Spa home">
          <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
        </Link>

        <div className="landing-hero-actions">
          <a
            className="landing-phone-link"
            href={`tel:${PHONE_TEL}`}
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone className="landing-phone-icon" size={17} aria-hidden="true" />
            <span className="landing-phone-text">{PHONE_TEL}</span>
          </a>
          <a
            className="landing-nav-cta"
            href="#contact"
            onClick={handleCtaClick}
            aria-label="Request an Appointment"
          >
            Request an Appointment
          </a>
        </div>
      </div>
    </header>
  );
}
