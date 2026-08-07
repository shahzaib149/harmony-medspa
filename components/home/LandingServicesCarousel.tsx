"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type LandingService = {
  title: string;
  text: string;
  image: string;
  href: string;
  fit?: "cover" | "contain";
};

const services: LandingService[] = [
  {
    title: "Kerafactor Hair Restoration",
    text: "Real clients, real results with in-office red light therapy, scalp microneedling, growth factor serum, and home care.",
    image: "/images/services/catalog/hair-restoration.jpg",
    href: "/hair-restoration"
  },
  {
    title: "IV Therapy",
    text: "Immunity, Athlete's Edge, and Radiance drips for hydration, vitamins, energy, recovery, and glow.",
    image: "/images/services/catalog/iv-therapy.jpg",
    href: "/iv-therapy"
  },
  {
    title: "Spectra Skin Analysis",
    text: "Unlock your skin's secrets with personalized analysis, a free consult, and new patient in-office credit.",
    image: "/images/services/catalog/skincare-products.jpg",
    href: "/skincare"
  },
  {
    title: "Refer-A-Friend",
    text: "Share the glow. You and your friend each receive $25 when they complete their first visit.",
    image: "/images/landing/refer-a-friend.jpg",
    href: "/specials",
    fit: "contain"
  },
  {
    title: "VIP Ultimate Membership",
    text: "$349/month with VIP Elite benefits, monthly IV, monthly nutraceutical, 10% off nutraceuticals, and quarterly Spectra Scan.",
    image: "/images/landing/vip-ultimate.jpg",
    href: "/membership",
    fit: "contain"
  },
  {
    title: "Peptide Therapy",
    text: "Personalized peptides for fat loss, energy, recovery, and wellness with virtual visits and monthly shipments.",
    image: "/images/services/catalog/peptide-therapy.jpg",
    href: "/peptide-therapy"
  }
];

export default function LandingServicesCarousel() {
  const [page, setPage] = useState(0);

  return (
    <div className="landing-services-carousel">
      <div className="landing-service-window">
        <div
          className="landing-service-track"
          style={{ transform: `translateX(calc(-${page * 2} * (((100% - 90px) / 4) + 30px)))` }}
        >
          {services.map((service) => (
            <Link className="landing-service-card" href={service.href} key={service.title}>
              <div className={`landing-service-image ${service.fit === "contain" ? "landing-service-image-contain" : ""}`}>
                <Image src={service.image} alt="" fill sizes="(max-width: 760px) 80vw, 22vw" quality={service.fit === "contain" ? 100 : 85} />
              </div>
              <div className="landing-service-caption">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="landing-service-controls" aria-label="Services carousel controls">
        {[0, 1].map((dot) => (
          <button
            className={dot === page ? "is-active" : ""}
            type="button"
            onClick={() => setPage(dot)}
            aria-label={`Show service set ${dot + 1}`}
            aria-current={dot === page ? "true" : undefined}
            key={dot}
          />
        ))}
      </div>
    </div>
  );
}
