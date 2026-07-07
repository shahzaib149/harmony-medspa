import { Building2, Facebook, Instagram, MapPin, Phone, Search } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { GOOGLE_MAPS_LOCATION_URL } from "@/lib/constants";

export default function ContactUsPage() {
  return (
    <main className="contact-page">
      <SiteHeader className="contact-page-header" />

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
            href={GOOGLE_MAPS_LOCATION_URL}
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

      <SiteFooter variant="contact-page-footer" social="compact" />
    </main>
  );
}
