"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import { ONLINE_BOOKING_URL } from "@/lib/constants";
import styles from "./Home.module.css";

// Real portrait photography (not generated), shown as a slow crossfading slideshow.
const slides = ["/images/carousel/heroimage_1.jpg", "/images/carousel/heroimage_2.jpg", "/images/landing/1-v1.jpg"];
const SLIDE_MS = 6000;

// The end of the line under the title types, erases and retypes through these.
const phrases = [
  "natural-looking results",
  "Daxxify & dermal fillers",
  "glowing, refreshed skin",
  "RF microneedling",
  "hormone balance",
  "medical weight loss",
  "IV therapy",
];

const TYPE_MS = 70;
const ERASE_MS = 35;
const HOLD_MS = 1900;
const GAP_MS = 350;

/** Types a phrase letter by letter, holds it, erases it, then moves on to the next one. */
function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(phrases[0].length);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const phrase = phrases[index];
    // With reduced motion, swap whole phrases instead of typing them.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => {
        const nextIndex = (index + 1) % phrases.length;
        setIndex(nextIndex);
        setShown(phrases[nextIndex].length);
      }, HOLD_MS + 800);
      return () => window.clearTimeout(timer);
    }

    let delay: number;
    let next: () => void;
    if (!erasing && shown < phrase.length) {
      delay = TYPE_MS;
      next = () => setShown(shown + 1);
    } else if (!erasing) {
      delay = HOLD_MS;
      next = () => setErasing(true);
    } else if (shown > 0) {
      delay = ERASE_MS;
      next = () => setShown(shown - 1);
    } else {
      delay = GAP_MS;
      next = () => {
        setErasing(false);
        setIndex((current) => (current + 1) % phrases.length);
      };
    }
    const timer = window.setTimeout(next, delay);
    return () => window.clearTimeout(timer);
  }, [index, shown, erasing]);

  return <span className={styles.typed}>{phrases[index].slice(0, shown)}</span>;
}

export default function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <section id="home" className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroSlides} aria-hidden="true">
        {slides.map((src, index) => (
          <figure key={src} className={`${styles.heroSlide}${index === active ? ` ${styles.isActive}` : ""}`}>
            <Image src={src} alt="" fill preload={index === 0} sizes="100vw" />
          </figure>
        ))}
      </div>
      <div className={styles.heroShade} aria-hidden="true" />

      <div className={styles.heroContent}>
        <h1 id="home-title" className={styles.heroTitle}>
          <TypewriterText text="harmony med spa" letterDelay={110} ignoreReducedMotion />
        </h1>
        <p className={styles.heroLine}>
          <span aria-hidden="true">
            Sarasota&apos;s med spa for <RotatingPhrase />
          </span>
          <span className="sr-only">
            Sarasota&apos;s med spa for natural-looking results, injectables, skin treatments, hormone therapy, medical weight loss and IV
            therapy.
          </span>
        </p>
        <div className={styles.heroActions}>
          <a className={styles.btnGold} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book Now
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <Link className={styles.btnGlass} href="#services">
            Explore Treatments
          </Link>
        </div>
      </div>

      <div className={styles.heroDots} role="group" aria-label="Choose a photo">
        {slides.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Show photo ${index + 1}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            style={{ "--slide-ms": `${SLIDE_MS}ms` } as React.CSSProperties}
          >
            <span key={index === active ? `on-${active}` : "off"} />
          </button>
        ))}
      </div>
    </section>
  );
}
