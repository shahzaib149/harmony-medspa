import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const treatments = [
  {
    title: "Hormone Replacement Therapy (HRT)",
    image: "/images/services/wellness/hormonereplacement_thumbnail_1.jpg"
  },
  {
    title: "Medical Weight Loss",
    image: "/images/services/wellness/medicalweightloss_thumbnail_1.pn.jpg"
  }
];

export default function WellnessPage() {
  return (
    <main className="service-detail-page">
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

      <section className="service-detail-hero">
        <h1>wellness</h1>
      </section>

      <section className="service-detail-content">
        <div className="service-detail-intro">
          <h2>Restore Balance &amp; Vitality At Harmony Med Spa</h2>
          <p>
            Prioritize your health and well-being with comprehensive wellness treatments at Harmony Med Spa. Our services are designed to help
            you feel your best by addressing hormonal balance, energy levels, and overall vitality.
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
