import Link from "next/link";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import TeamList from "../ui/TeamList";
import AboutDropdown from "../ui/AboutDropdown";
import PatientCenterDropdown from "../ui/PatientCenterDropdown";

const teamTitleLetters = [
  { character: "o", offset: "132px" },
  { character: "u", offset: "92px" },
  { character: "r", offset: "54px" },
  { character: " ", offset: "0px" },
  { character: "t", offset: "-28px" },
  { character: "e", offset: "-68px" },
  { character: "a", offset: "-108px" },
  { character: "m", offset: "-150px" }
];

export default function OurTeamPage() {
  return (
    <main className="team-page">
      <header className="team-header">
        <nav className="nav-left" aria-label="Primary left">
          <Link href="/">home</Link>
          <AboutDropdown />
          <Link href="/#services">services</Link>
        </nav>
        <Link className="brand" href="/" aria-label="Harmony Med Spa home">
          <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
        </Link>
        <nav className="nav-right" aria-label="Primary right">
          <Link href="/shop">shop</Link>
          <PatientCenterDropdown />
          <Link href="/#contact">contact us</Link>
        </nav>
      </header>

      <section className="team-hero">
        <h1 aria-label="our team">
          {teamTitleLetters.map((letter, index) => (
            <span
              aria-hidden="true"
              className={letter.character === " " ? "team-title-space" : undefined}
              key={`${letter.character}-${index}`}
              style={
                {
                  "--letter-delay": `${index * 0.2}s`,
                  "--letter-start": letter.offset
                } as React.CSSProperties
              }
            >
              {letter.character === " " ? "\u00A0" : letter.character}
            </span>
          ))}
        </h1>
      </section>

      <TeamList />

      <footer className="footer">
        <div className="footer-inner">
          <div className="awards">
            <div className="award-circle">2024<br /><strong>BNS</strong><span>Best in Business</span></div>
            <div className="bbb">BBB Accredited Business</div>
          </div>
          <div className="footer-contact">
            <p><MapPin size={18} />2184 Gulf Gate Dr.<br />Sarasota, FL 34231</p>
            <p><Phone size={18} />Phone:<br />(941) 923-8990</p>
            <p><Building2 size={18} />Fax:<br />(941) 923-9024</p>
          </div>
          <div className="hours">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <p key={day}><span>{day}</span><strong>9:00am to 5:00pm</strong></p>
            ))}
            <p><span>Saturday</span><strong>Closed</strong></p>
            <p><span>Sunday</span><strong>Closed</strong></p>
          </div>
          <div className="social">
            <p>Follow Us On</p>
            <div>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Google"><Mail size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Book"><CalendarDays size={20} /></a>
            </div>
          </div>
        </div>
        <div className="copyright">Copyright 2026 Harmony Med Spa. All rights reserved.</div>
        <p className="powered-by">
          Powered by: <span className="roya-logo"><span>r</span><span>o</span><span>y</span><span>a</span><span>.com</span></span>
        </p>
      </footer>
    </main>
  );
}
