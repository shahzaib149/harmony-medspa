import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const treatments = [
  {
    title: "Fractional CO2 Laser Treatments",
    image: "/images/services/lasers-and-lights/laser_new.jpg"
  },
  {
    title: "Laser Hair Removal",
    image: "/images/services/lasers-and-lights/Laser_Hair_Removal.jpg"
  }
];

export default function LasersAndLightsPage() {
  return (
    <main className="service-detail-page">
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

      <section className="service-detail-hero">
        <h1>lasers and lights</h1>
      </section>

      <section className="service-detail-content">
        <div className="service-detail-intro">
          <h2>Smooth, Brighten &amp; Rejuvenate</h2>
          <p>
            Transform your skin with cutting-edge laser and light treatments at Harmony Med Spa. Whether you want to remove unwanted hair,
            improve skin texture, or reduce pigmentation, our advanced technology delivers real results with minimal downtime. Our treatments
            are designed to target a variety of skin concerns, helping you achieve a smoother, more radiant complexion.
          </p>
        </div>

        <div className="treatment-card-grid">
          {treatments.map((treatment) => (
            <a className="treatment-card" href="/#contact" key={treatment.title}>
              <Image src={treatment.image} alt="" fill sizes="(max-width: 720px) 82vw, 244px" />
              <span>{treatment.title}</span>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter address="linked-name" copyright="plain" />
    </main>
  );
}
