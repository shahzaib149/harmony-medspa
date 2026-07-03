import Link from "next/link";
import { Building2, Facebook, Instagram, Mail, MapPin, Phone, Search } from "lucide-react";
import AboutDropdown from "../ui/AboutDropdown";
import ContactForm from "../ui/ContactForm";
import PatientCenterDropdown from "../ui/PatientCenterDropdown";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function ContactUsPage() {
  return (
    <main className="contact-page">
      <header className="contact-page-header">
        <nav className="nav-left" aria-label="Primary left">
          <Link href="/">home</Link>
          <AboutDropdown />
          <Link href="/services">services</Link>
        </nav>
        <Link className="brand" href="/" aria-label="Harmony Med Spa home">
          <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
        </Link>
        <nav className="nav-right" aria-label="Primary right">
          <Link href="/shop">shop</Link>
          <PatientCenterDropdown />
          <Link href="/contact-us">contact us</Link>
        </nav>
      </header>

      <section className="contact-page-hero">
        <h1>contact us</h1>
      </section>

      <section className="contact-page-main" aria-labelledby="contact-page-title">
        <div className="contact-page-form-panel">
          <h2 id="contact-page-title">Contact Us</h2>
          <p>For non-urgent questions or to learn more about our services, contact us today!</p>
          <ContactForm variant="page" />
        </div>

        <aside className="contact-info-panel" aria-label="Harmony Med Spa contact details">
          <a
            className="contact-map-card"
            href={googleMapsLocationUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Harmony Med Spa location in Google Maps"
          >
            <div className="contact-map-roads" />
            <div className="contact-map-pin">
              <MapPin size={70} />
              <span>H</span>
            </div>
            <span className="contact-map-label">Google</span>
          </a>

          <div className="contact-info-list">
            <p>
              <span className="contact-info-icon"><MapPin size={20} fill="currentColor" /></span>
              <span>2184 Gulf Gate Dr.<br />Sarasota, FL 34231</span>
            </p>
            <p>
              <span className="contact-info-icon"><Phone size={19} fill="currentColor" /></span>
              <span><small>Call</small><a href="tel:9419238990">(941) 923-8990</a></span>
            </p>
            <p>
              <span className="contact-info-icon"><Building2 size={18} /></span>
              <span><small>Fax</small><a href="tel:9419239024">(941) 923-9024</a></span>
            </p>
          </div>

          <div className="contact-page-social">
            <p>Follow Us:</p>
            <div>
              <a href="#" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
              <a href="#" aria-label="Google"><Search size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="Yelp">Y</a>
            </div>
          </div>
        </aside>
      </section>

      <footer className="footer contact-page-footer">
        <div className="footer-inner">
          <div className="awards">
            <div className="award-circle">2024<br /><strong>BNS</strong><span>Best in Business</span></div>
            <div className="bbb">BBB Accredited Business</div>
          </div>
          <div className="footer-contact">
            <p>
              <MapPin size={18} />
              <a className="footer-address" href={googleMapsLocationUrl} target="_blank" rel="noreferrer">
                2184 Gulf Gate Dr.<br />Sarasota, FL 34231
              </a>
            </p>
            <p><Phone size={18} />Phone:<br />(941) 923-8990</p>
            <p><Building2 size={18} />Fax:<br />(941) 923-9024</p>
          </div>
          <div className="hours">
            {weekdays.map((day) => (
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
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
