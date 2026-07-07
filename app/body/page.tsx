import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const treatments = [
  {
    title: "RF Microneedling",
    image: "/images/services/body/rfmicroneedling_thumbnail_1.jpg"
  },
  {
    title: "Fractional CO2 Laser Treatments",
    image: "/images/services/body/ServiceImg_FCO2.jpg"
  },
  {
    title: "Laser Hair Removal",
    image: "/images/services/body/Laser_Hair_Removal.jpg"
  },
  {
    title: "Facials",
    image: "/images/services/body/facials_img_1.jpg"
  },
  {
    title: "Glo2Facial",
    image: "/images/services/body/Glo2Facial_Service_Page_Image_1.jpg"
  },
  {
    title: "Chemical Peels",
    image: "/images/services/body/shutterstock_1991398268.jpg"
  },
  {
    title: "Sculptra",
    image: "/images/services/body/sculptura_thumbnail_1.jpg"
  },
  {
    title: "Medical Weight Loss",
    image: "/images/services/body/medicalweightloss_thumbnail_1.pn.jpg"
  }
];

export default function BodyPage() {
  return (
    <main className="service-detail-page">
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

      <section className="service-detail-hero">
        <h1>body</h1>
      </section>

      <section className="service-detail-content">
        <div className="service-detail-intro">
          <h2>Transform Your Body, Transform Your Life.</h2>
          <p>
            At Harmony Med Spa in Sarasota, FL, we offer a range of treatments to address your body&apos;s unique needs, including facials,
            laser hair removal, and laser treatments.
          </p>
        </div>

        <div className="treatment-card-grid treatment-card-grid-four">
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
