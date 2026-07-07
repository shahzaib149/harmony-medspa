import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const treatments = [
  {
    title: "Facials",
    image: "/images/services/facials-and-peels/facials_img_1.jpg"
  },
  {
    title: "Glo2Facial",
    image: "/images/services/facials-and-peels/Glo2Facial_Service_Page_Image_1.jpg"
  },
  {
    title: "Chemical Peels",
    image: "/images/services/facials-and-peels/shutterstock_1991398268.jpg"
  }
];

export default function FacialsAndPeelsPage() {
  return (
    <main className="service-detail-page">
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

      <section className="service-detail-hero">
        <h1>facial</h1>
      </section>

      <section className="service-detail-content">
        <div className="service-detail-intro">
          <h2>Facials &amp; Peels - Hydrate, Brighten &amp; Renew</h2>
          <p>
            Give your skin the care it deserves with our luxurious facials and advanced chemical peels at Harmony Med Spa. Designed to deeply
            cleanse, hydrate, and rejuvenate, our treatments target everything from dullness and fine lines to acne and uneven skin tone.
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
