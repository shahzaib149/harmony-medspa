import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const services = [
  {
    title: "RF Microneedling",
    image: "/images/services/catalog/rf-microneedling.jpg",
    href: "/body"
  },
  {
    title: "Laser Hair Removal",
    image: "/images/services/catalog/laser-hair-removal.jpg",
    href: "/lasers-and-lights"
  },
  {
    title: "Daxxify",
    image: "/images/services/catalog/daxxify.jpg",
    href: "/injectables"
  },
  {
    title: "Sculptra",
    image: "/images/services/catalog/sculptra.jpg",
    href: "/injectables"
  },
  {
    title: "Dermal Fillers",
    image: "/images/services/catalog/dermal-fillers.jpg",
    href: "/injectables"
  },
  {
    title: "Glo2Facials",
    image: "/images/services/catalog/glo2facials.jpg",
    href: "/facials-and-peels"
  },
  {
    title: "Chemical Peels",
    image: "/images/services/catalog/chemical-peels.jpg",
    href: "/facials-and-peels"
  },
  {
    title: "Hormone Replacement Therapy",
    image: "/images/services/catalog/hormone-replacement-therapy.jpg",
    href: "/wellness"
  },
  {
    title: "Skincare Products",
    image: "/images/services/catalog/skincare-products.jpg",
    href: "/skincare"
  },
  {
    title: "Facials",
    image: "/images/services/catalog/facials.jpg",
    href: "/facials-and-peels"
  },
  {
    title: "Fractional CO2 Laser Treatments",
    image: "/images/services/catalog/fractional-co2-laser-treatments.jpg",
    href: "/lasers-and-lights"
  },
  {
    title: "RevivaMask(TM)",
    image: "/images/services/catalog/revivamask.jpg",
    href: "/skincare"
  },
  {
    title: "Medical Weight Loss",
    image: "/images/services/catalog/medical-weight-loss.jpg",
    href: "/wellness"
  },
  {
    title: "Hair Restoration",
    image: "/images/services/catalog/hair-restoration.jpg",
    href: "/skincare"
  },
  {
    title: "IV Therapy",
    image: "/images/services/catalog/iv-therapy.jpg",
    href: "/wellness"
  }
];

export default function ServicesPage() {
  return (
    <main className="service-detail-page">
      <SiteHeader className="team-header" contactHref="/#contact" />

      <section className="service-detail-hero">
        <h1>services</h1>
      </section>

      <section className="service-detail-content services-catalog-content">
        <div className="service-detail-intro">
          <h2>Aesthetic &amp; Wellness Services In Sarasota</h2>
          <p>
            We pride ourselves on offering a wide range of rejuvenating and revitalizing treatments tailored to meet your unique needs. Our
            team of experienced professionals is dedicated to providing you with the highest quality of care in a relaxing and luxurious
            environment.
          </p>
        </div>

        <div className="treatment-card-grid services-catalog-grid">
          {services.map((service) => (
            <Link className="treatment-card" href={service.href} key={service.title}>
              <Image src={service.image} alt="" fill sizes="(max-width: 720px) 82vw, 244px" />
              <span>{service.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter address="linked-name" copyright="plain" />
    </main>
  );
}
