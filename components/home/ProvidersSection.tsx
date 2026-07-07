"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { providers } from "@/lib/data/providers";

export default function ProvidersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
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
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`providers section-light ${isVisible ? "is-visible" : ""}`} ref={sectionRef}>
      <div className="section-inner">
        <div className="provider-heading-motion">
          <h2>meet our providers</h2>
          <p className="provider-copy">
            Harmony Med Spa provides the highest quality service to ensure that you are healthy and happy. Meet our caring and compassionate
            team committed to providing exceptional service to you.
          </p>
        </div>
        <div className="provider-grid">
          <Link className="provider-large provider-card provider-motion-left" href="/our-team">
            <Image src={`/images/providers/${providers[0].file}`} alt={providers[0].name} fill sizes="390px" />
            <div className="provider-overlay">
              <h3>{providers[0].name}</h3>
              <p>{providers[0].title}</p>
            </div>
          </Link>
          {providers.slice(1).map((provider, index) => (
            <Link
              className="provider-small provider-card provider-motion-right"
              href="/our-team"
              key={provider.file}
              style={{ "--provider-delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <Image src={`/images/providers/${provider.file}`} alt={provider.name} fill sizes="300px" />
              <div className="provider-overlay">
                <h3>{provider.name}</h3>
                {provider.title ? <p>{provider.title}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
