import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { beforeAfterGalleries } from "../data/beforeAfterGalleries";
import AboutDropdown from "../ui/AboutDropdown";
import PatientCenterDropdown from "../ui/PatientCenterDropdown";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

export default function BeforeAndAftersPage() {
  return (
    <main className="before-after-page">
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

      <section className="before-after-hero">
        <h1>gallery</h1>
      </section>

      <section className="before-after-content" aria-labelledby="before-after-title">
        <div className="before-after-scroll">
          <h2 id="before-after-title">BEFORE &amp; AFTER GALLERY</h2>
          <div className="before-after-grid">
            {beforeAfterGalleries.map((item) => (
              <article className="before-after-card" key={item.title}>
                <Link href={`/before-and-afters/${item.slug}`} aria-label={`Open ${item.title} before and after preview gallery`}>
                  <Image src={item.coverImage} alt={item.title} width={560} height={265} />
                </Link>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
          <div className="before-after-logo">
            <Image src="/images/before-and-afters/rxphoto-logo.png" alt="RxPhoto by PatientNow" width={190} height={82} />
          </div>
        </div>
      </section>

      <footer className="footer before-after-footer">
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
      </footer>
    </main>
  );
}
