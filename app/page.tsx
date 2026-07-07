import { Building2, CalendarDays, Facebook, Instagram, MapPin, Phone, Star, Mail } from "lucide-react";
import AboutDropdown from "./ui/AboutDropdown";
import ContactForm from "./ui/ContactForm";
import HeroCarousel from "./ui/HeroCarousel";
import PatientCenterDropdown from "./ui/PatientCenterDropdown";
import ServicesGrid from "./ui/ServicesGrid";
import ProvidersSection from "./ui/ProvidersSection";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";
const monthlySpecialsUrl = "https://mailchi.mp/harmonymedspafl/monthly-specials";
const newsletterOptInUrl = "https://mailchi.mp/harmonymedspafl/newsletter-opt-in";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <nav className="nav-left" aria-label="Primary left">
          <a href="#home">home</a>
          <AboutDropdown />
          <a href="/services">services</a>
        </nav>
        <a className="brand" href="#home" aria-label="Harmony Med Spa home">
          <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
        </a>
        <nav className="nav-right" aria-label="Primary right">
          <a href="/shop">shop</a>
          <PatientCenterDropdown />
          <a href="/contact-us">contact us</a>
        </nav>
      </header>

      <HeroCarousel />

      <section id="about" className="intro section-dark">
        <div className="section-inner narrow">
          <h2>
            harmony med spa is a
            <span>full-service medical spa</span>
            in sarasota, florida.
          </h2>
          <p>
            Board-certified nurse practitioner Jessica Simone, APRN, and her team take a natural approach to beauty that provides men and women
            of all ages the most effective and innovative aesthetic treatments available in a relaxed and welcoming setting.
          </p>
          <a className="line-button" href={monthlySpecialsUrl}>Specials</a>
        </div>
      </section>

      <section id="services" className="services section-light">
        <div className="section-inner">
          <h2>our services</h2>
          <ServicesGrid />
        </div>
      </section>

      <section className="experience section-dark">
        <div className="section-inner narrow">
          <h2>the harmony experience</h2>
          <p>
            At Harmony Med Spa, our mission is to elevate the well-being and confidence of every patient through personalized,
            natural-looking aesthetic and wellness care in a warm, welcoming environment, guided by advanced, evidence-based treatments
            and a holistic, integrative approach.
          </p>
        </div>
      </section>

      <ProvidersSection />

      <section id="specials" className="newsletter section-dark">
        <div className="section-inner narrow">
          <h2>stay in the know</h2>
          <p>Opt into our newsletter and be the first to know about upcoming specials, exclusive events, and more.</p>
          <a className="line-button" href={newsletterOptInUrl} target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
      </section>

      <section className="testimonial">
        <div className="quote-mark">“</div>
        <div className="quote-content">
          <p>
            I’ve been to a few Med Spas in Sarasota, and Jessica is absolutely the best. She truly cares about providing exceptional service
            and I am thrilled to have finally found a practitioner I can trust.
          </p>
          <div className="stars" aria-label="Five star review">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} fill="currentColor" size={22} />
            ))}
            <span>by Ariel F.</span>
          </div>
        </div>
        <div className="slider-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section id="contact" className="contact">
        <a
          className="map-panel"
          href={googleMapsLocationUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Harmony Med Spa, 2184 Gulf Gate Drive, Sarasota, Florida in Google Maps"
        >
          <div className="map-grid" />
          <div className="map-pin">
            <MapPin size={42} fill="currentColor" />
          </div>
          <span className="map-address">Harmony Med Spa<br />2184 Gulf Gate Dr, Sarasota, FL 34231</span>
        </a>
        <ContactForm variant="home" />
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
        <div className="copyright">© 2026 Harmony Med Spa. All rights reserved.</div>
        <p className="powered-by">
          Powered by: <span className="roya-logo"><span>r</span><span>o</span><span>y</span><span>a</span><span>.com</span></span>
        </p>
      </footer>
    </main>
  );
}
