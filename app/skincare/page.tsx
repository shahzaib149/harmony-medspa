import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const treatments = [
  {
    title: "Skincare Products",
    image: "/images/services/skincare/skincareproducts_thumbnail_1.jpg"
  },
  {
    title: "Facials",
    image: "/images/services/skincare/srvcsimg_facials2.jpg"
  },
  {
    title: "Glo2Facials",
    image: "/images/services/skincare/Glo2Facial_Service_Page_Image_3.jpg"
  },
  {
    title: "Chemical Peels",
    image: "/images/services/skincare/shutterstock_1991398268.jpg"
  },
  {
    title: "RF Microneedling",
    image: "/images/services/skincare/rfmicroneedling_thumbnail_1.jpg"
  },
  {
    title: "Fractional CO2 Laser Treatments",
    image: "/images/services/skincare/ServiceImg_FCO2.jpg"
  },
  {
    title: "Revivamask (Exosome Recovery Mask)",
    image: "/images/services/skincare/mask.jpg"
  }
];

export default function SkincarePage() {
  return (
    <main className="service-detail-page">
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

      <section className="service-detail-hero">
        <h1>skin</h1>
      </section>

      <section className="service-detail-content">
        <div className="service-detail-intro">
          <h2>Unlock Your Skin&apos;s Potential: Beauty Begins Here.</h2>
          <p>
            Pamper your skin from head to toe. From rejuvenating facials to body treatments and advanced laser therapies, we offer a range of
            solutions to help you achieve your skincare goals.
          </p>
        </div>

        <div className="treatment-card-grid treatment-card-grid-skincare">
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
