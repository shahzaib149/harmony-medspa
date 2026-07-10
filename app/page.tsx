import { MapPin } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import HeroCarousel from "@/components/home/HeroCarousel";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProvidersSection from "@/components/home/ProvidersSection";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { GOOGLE_MAPS_LOCATION_URL } from "@/lib/constants";
import TypewriterText from "@/components/ui/TypewriterText";

const monthlySpecialsUrl = "https://mailchi.mp/harmonymedspafl/monthly-specials";
const newsletterOptInUrl = "https://mailchi.mp/harmonymedspafl/newsletter-opt-in";

export default function Home() {
  return (
    <main>
      <SiteHeader className="site-header" homeHref="#home" />

      <HeroCarousel />

      <section id="about" className="intro section-dark bg-[var(--black)] text-[#fff] pt-[150px] pb-[180px] px-0 [&_h2]:text-[length:clamp(48px,4.6vw,70px)] [&_h2]:leading-[1.03] [&_h2_span]:block [&_h2_span]:text-[var(--gold)]">
        <div className="section-inner narrow w-[min(1060px,calc(100%_-_42px))] my-0 mx-auto text-center">
          <h2>
            harmony med spa is a
            <span>full-service medical spa</span>
            in sarasota, florida.
          </h2>
          <p>
            Board-certified nurse practitioner Jessica Simone, APRN, and her team take a natural approach to beauty that provides men and women
            of all ages the most effective and innovative aesthetic treatments available in a relaxed and welcoming setting.
          </p>
          <a className="line-button inline-flex justify-center min-w-[116px] py-[13px] px-[18px] [border-top:1px_solid_var(--gold)] [border-bottom:1px_solid_var(--gold)] text-[inherit] text-[length:16px] font-normal bg-[transparent] [border-left:0] [border-right:0] cursor-pointer" href={monthlySpecialsUrl}>Specials</a>
        </div>
      </section>

      <section id="services" className="services section-light bg-[var(--paper)] text-[var(--ink)]">
        <div className="section-inner w-[min(1060px,calc(100%_-_42px))] my-0 mx-auto text-center">
          <h2><TypewriterText text="our services" startOnView /></h2>
          <ServicesGrid />
        </div>
      </section>

      <section className="experience section-dark bg-[var(--black)] text-[#fff]">
        <div className="section-inner narrow w-[min(1060px,calc(100%_-_42px))] my-0 mx-auto text-center">
          <h2><TypewriterText text="the harmony experience" startOnView /></h2>
          <p>
            At Harmony Med Spa, our mission is to elevate the well-being and confidence of every patient through personalized,
            natural-looking aesthetic and wellness care in a warm, welcoming environment, guided by advanced, evidence-based treatments
            and a holistic, integrative approach.
          </p>
        </div>
      </section>

      <ProvidersSection />

      <section id="specials" className="newsletter section-dark bg-[var(--black)] text-[#fff]">
        <div className="section-inner narrow w-[min(1060px,calc(100%_-_42px))] my-0 mx-auto text-center">
          <h2><TypewriterText text="stay in the know" startOnView /></h2>
          <p>Opt into our newsletter and be the first to know about upcoming specials, exclusive events, and more.</p>
          <a className="line-button inline-flex justify-center min-w-[116px] py-[13px] px-[18px] [border-top:1px_solid_var(--gold)] [border-bottom:1px_solid_var(--gold)] text-[inherit] text-[length:16px] font-normal bg-[transparent] [border-left:0] [border-right:0] cursor-pointer" href={newsletterOptInUrl} target="_blank" rel="noopener noreferrer">Learn More</a>
        </div>
      </section>

      <TestimonialCarousel />

      <section id="contact" className="contact">
        <a
          className="map-panel relative block overflow-hidden text-[inherit] [background:linear-gradient(rgba(0,0,0,0.78),rgba(0,0,0,0.78)),radial-gradient(circle_at_22%_35%,rgba(255,255,255,0.16),transparent_18%),radial-gradient(circle_at_56%_48%,rgba(255,255,255,0.14),transparent_20%),#303030] cursor-pointer focus-visible:[outline:2px_solid_var(--gold)] focus-visible:[outline-offset:-6px] max-[720px]:min-h-[360px]"
          href={GOOGLE_MAPS_LOCATION_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Harmony Med Spa, 2184 Gulf Gate Drive, Sarasota, Florida in Google Maps"
        >
          <div className="map-grid absolute inset-0 bg-[image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:190px_190px] opacity-[0.55]" />
          <div className="map-pin absolute left-[53%] top-[46%] text-[var(--gold)] [transform:translate(-50%,-50%)] [filter:drop-shadow(0_0_0_#000)]">
            <MapPin size={42} fill="currentColor" />
          </div>
          <span className="map-address absolute left-[53%] top-[calc(46%_+_52px)] w-[min(320px,80%)] text-[#fff] text-center text-[length:16px] leading-[1.35] font-bold [transform:translateX(-50%)] opacity-0 [transition:opacity_220ms_ease,transform_220ms_ease]">Harmony Med Spa<br />2184 Gulf Gate Dr, Sarasota, FL 34231</span>
        </a>
        <ContactForm variant="home" />
      </section>

      <SiteFooter address="linked-name" copyright="symbol" />
    </main>
  );
}
