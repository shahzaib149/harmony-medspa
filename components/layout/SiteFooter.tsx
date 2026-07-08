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
      <a className="footer-address hover:text-[var(--gold)] focus-visible:text-[var(--gold)]" href={GOOGLE_MAPS_LOCATION_URL} target="_blank" rel="noreferrer">
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
    <footer className={`footer ${variant ?? ""}`}>
      <div className="footer-inner grid grid-cols-[220px_230px_310px_180px] gap-[34px] [align-items:start] justify-center max-w-[1080px] mt-0 mb-[78px] mx-auto max-[1050px]:grid-cols-[repeat(2,minmax(220px,1fr))] max-[720px]:[justify-items:center] max-[720px]:text-left">
        <div className="awards">
          <div className="award-circle block w-[170px] h-[170px] overflow-hidden [background:url('/images/footer/main.png')_center_/_contain_no-repeat] text-[transparent] text-[length:0] [&_strong]:hidden [&_span]:hidden">2024<br /><strong>BNS</strong><span>Best in Business</span></div>
          <div className="bbb block w-[205px] h-[43px] mt-[18px] overflow-hidden [background:url('/images/footer/bbb.png')_center_/_contain_no-repeat] text-[transparent] text-[length:0]">BBB Accredited Business</div>
        </div>
        <div className="footer-contact [&_p]:grid [&_p]:grid-cols-[32px_1fr] [&_p]:gap-[12px] [&_p]:mt-0 [&_p]:mb-[28px] [&_p]:mx-0 [&_p]:font-bold [&_p]:leading-[1.35] [&_svg]:row-[span_2] [&_svg]:p-[8px] [&_svg]:w-[34px] [&_svg]:h-[34px] [&_svg]:rounded-full [&_svg]:bg-[#383838]">
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
          <p className="powered-by max-w-[960px] mt-[-18px] mb-0 mx-auto text-[#6f6f6f] text-right text-[length:14px] font-bold max-[720px]:mt-[18px] max-[720px]:text-left">
            Powered by: <span className="roya-logo inline-flex items-baseline gap-[1px] ml-[6px] text-[length:19px] leading-[1] font-extrabold [&_span:nth-child(1)]:text-[#18b9d4] [&_span:nth-child(2)]:text-[#e73358] [&_span:nth-child(3)]:text-[#72bf44] [&_span:nth-child(4)]:text-[#f4b321] [&_span:nth-child(5)]:text-[#8d8d8d] [&_span:nth-child(5)]:text-[length:18px]"><span>r</span><span>o</span><span>y</span><span>a</span><span>.com</span></span>
          </p>
        </>
      ) : null}
    </footer>
  );
}
