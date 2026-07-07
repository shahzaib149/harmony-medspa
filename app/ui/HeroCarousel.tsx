"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import TypewriterText from "./TypewriterText";

const slides = ["/images/carousel/heroimage_1.jpg", "/images/carousel/heroimage_2.jpg"];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero" aria-label="Harmony Med Spa image carousel">
      {slides.map((slide, index) => (
        <div className={`hero-slide ${index === active ? "is-active" : ""}`} key={slide}>
          <Image src={slide} alt="" fill priority={index === 0} sizes="100vw" />
        </div>
      ))}
      <div className="hero-shade" />
      <div className="hero-content">
        <h1>
          <TypewriterText text="harmony med spa" />
        </h1>
        <a className="line-button" href="https://na02.patientnow.com/a/harmonymedspa/OnlineBooking.aspx"target="_blank" rel="noopener noreferrer">book now</a>
      </div>
      <div className="hero-dots" aria-label="Carousel slides">
        {slides.map((_, index) => (
          <button
            className={index === active ? "is-active" : ""}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActive(index)}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
