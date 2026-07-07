"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const services = [
  { file: "services_1.jpg", title: "lasers +\nlights", href: "/lasers-and-lights" },
  { file: "services_2.jpg", title: "injectables", href: "/injectables" },
  { file: "services_3.jpg", title: "facials +\npeels", href: "/facials-and-peels" },
  { file: "services_4.jpg", title: "body", href: "/body" },
  { file: "services_5.jpg", title: "skincare", href: "/skincare" },
  { file: "services_6.jpg", title: "wellness", href: "/wellness" }
];

export default function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    observer.observe(grid);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`service-grid ${isVisible ? "is-visible" : ""}`} ref={gridRef}>
      {services.map((service, index) => (
        <a className="service-card" href={service.href} key={service.file} style={{ "--flip-delay": `${index * 95}ms` } as React.CSSProperties}>
          <span className="service-card-face service-card-back" aria-hidden="true" />
          <span className="service-card-face service-card-front">
            <Image src={`/images/services/${service.file}`} alt="" fill sizes="(max-width: 768px) 82vw, 300px" />
            <span className="service-title">{service.title}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
