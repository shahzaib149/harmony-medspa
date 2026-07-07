import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone, Search } from "lucide-react";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  FAX_DISPLAY,
  GOOGLE_MAPS_LOCATION_URL,
  PHONE_DISPLAY,
  SITE_NAME,
  WEEKDAYS
} from "@/lib/constants";

type SiteFooterProps = {
  /** Extra class appended to the base "footer" class. */
  variant?: "before-after-footer" | "contact-page-footer" | "membership-footer";
  /** "linked-name" prefixes the spa name, "plain" renders unlinked text. */
  address?: "linked" | "linked-name" | "plain";
  /** Renders the copyright line (and Roya credit) when set. */
  copyright?: "symbol" | "plain";
  social?: "default" | "compact" | "membership";
};

function FooterAddress({ address }: { address: NonNullable<SiteFooterProps["address"]> }) {
  if (address === "plain") {
    return (
      <p><MapPin size={18} />{ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}</p>
    );
  }

  return (
    <p>
      <MapPin size={18} />
      <a className="footer-address" href={GOOGLE_MAPS_LOCATION_URL} target="_blank" rel="noreferrer">
        {address === "linked-name" ? <>{SITE_NAME}<br /></> : null}
        {ADDRESS_LINE_1}<br />{ADDRESS_LINE_2}
      </a>
    </p>
  );
}

function FooterSocial({ social }: { social: NonNullable<SiteFooterProps["social"]> }) {
  if (social === "membership") {
    return (
      <div>
        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
        <a href="#" aria-label="Google"><Search size={20} /></a>
        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
        <a href="#" aria-label="X">X</a>
        <a href="#" aria-label="Yelp"><Mail size={20} /></a>
      </div>
    );
  }

  return (
    <div>
      <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
      <a href="#" aria-label="Google"><Mail size={20} /></a>
      <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
      {social === "default" ? <a href="#" aria-label="Book"><CalendarDays size={20} /></a> : null}
    </div>
  );
}

export default function SiteFooter({ variant, address = "linked", copyright, social = "default" }: SiteFooterProps) {
  return (
    <footer className={variant ? `footer ${variant}` : "footer"}>
      <div className="footer-inner">
        <div className="awards">
          <div className="award-circle">2024<br /><strong>BNS</strong><span>Best in Business</span></div>
          <div className="bbb">BBB Accredited Business</div>
        </div>
        <div className="footer-contact">
          <FooterAddress address={address} />
          <p><Phone size={18} />Phone:<br />{PHONE_DISPLAY}</p>
          <p><Building2 size={18} />Fax:<br />{FAX_DISPLAY}</p>
        </div>
        <div className="hours">
          {WEEKDAYS.map((day) => (
            <p key={day}><span>{day}</span><strong>9:00am to 5:00pm</strong></p>
          ))}
          <p><span>Saturday</span><strong>Closed</strong></p>
          <p><span>Sunday</span><strong>Closed</strong></p>
        </div>
        <div className="social">
          <p>Follow Us On</p>
          <FooterSocial social={social} />
        </div>
      </div>
      {copyright ? (
        <>
          <div className="copyright">
            {copyright === "symbol" ? "© 2026 Harmony Med Spa. All rights reserved." : "Copyright 2026 Harmony Med Spa. All rights reserved."}
          </div>
          <p className="powered-by">
            Powered by: <span className="roya-logo"><span>r</span><span>o</span><span>y</span><span>a</span><span>.com</span></span>
          </p>
        </>
      ) : null}
    </footer>
  );
}
