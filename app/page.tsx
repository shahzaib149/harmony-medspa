import { MapPin, Star } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProvidersSection from "@/components/home/ProvidersSection";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { GOOGLE_MAPS_LOCATION_URL } from "@/lib/constants";

const monthlySpecialsUrl = "https://mailchi.mp/harmonymedspafl/monthly-specials";
const newsletterOptInUrl = "https://mailchi.mp/harmonymedspafl/newsletter-opt-in";

export default function Home() {
  return (
    <main>
      <SiteHeader className="site-header" homeHref="#home" />

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
          href={GOOGLE_MAPS_LOCATION_URL}
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

      <SiteFooter address="linked-name" copyright="symbol" />
    </main>
  );
}
