import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

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

export default function InjectablesPage() {
  return (
    <main className="service-detail-page">
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

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

      <SiteFooter address="linked-name" copyright="plain" />
    </main>
  );
}
