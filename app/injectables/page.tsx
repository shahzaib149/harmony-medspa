import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import AboutDropdown from "../ui/AboutDropdown";
import PatientCenterDropdown from "../ui/PatientCenterDropdown";

const treatments = [
  {
    title: "Dermal Fillers",
    image: "/images/services/injectables/df1.jpg"
  },
  {
    title: "Daxxify",
    image: "/images/services/injectables/shutterstock_1109564774.jpg"
  },
  {
    title: "Sculptra",
    image: "/images/services/injectables/sculptura_thumbnail_1.jpg"
  }
];

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

export default function InjectablesPage() {
  return (
    <main className="service-detail-page">
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

      <section className="service-detail-hero">
        <h1>injectables</h1>
      </section>

      <section className="service-detail-content">
        <div className="service-detail-intro">
          <h2>Dermal Fillers &amp; More In Sarasota, FL</h2>
          <p>
            Looking for the best injectables in Sarasota, FL? At Harmony Med Spa, we specialize in non-surgical aesthetic treatments that
            restore youthful volume, smooth fine lines, and enhance natural beauty. Whether you want to reduce wrinkles, plump your lips,
            or contour your face, our expert team provides dermal fillers and other advanced injectable treatments tailored to your goals.
          </p>
        </div>

        <div className="treatment-card-grid treatment-card-grid-three">
          {treatments.map((treatment) => (
            <a className="treatment-card" href="/#contact" key={treatment.title}>
              <Image src={treatment.image} alt="" fill sizes="(max-width: 720px) 82vw, 244px" />
              <span>{treatment.title}</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="awards">
            <div className="award-circle">2024<br /><strong>BNS</strong><span>Best in Business</span></div>
            <div className="bbb">BBB Accredited Business</div>
          </div>
          <div className="footer-contact">
            <p>
              <MapPin size={18} />
              <a className="footer-address" href={googleMapsLocationUrl} target="_blank" rel="noreferrer">
                Harmony Med Spa<br />2184 Gulf Gate Dr.<br />Sarasota, FL 34231
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
        <div className="copyright">Copyright 2026 Harmony Med Spa. All rights reserved.</div>
        <p className="powered-by">
          Powered by: <span className="roya-logo"><span>r</span><span>o</span><span>y</span><span>a</span><span>.com</span></span>
        </p>
      </footer>
    </main>
  );
}
