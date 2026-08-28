"use client";

import { useState } from "react";
import { RXPHOTO_GALLERY_URL } from "@/lib/constants";
import styles from "./RxPhotoGalleryEmbed.module.css";

export default function RxPhotoGalleryEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className={styles.section} aria-label="Before and after results">
      <div className={styles.embed} aria-busy={!loaded}>
        {!loaded ? (
          <div className={styles.loading} role="status" aria-live="polite">
            <span className={styles.spinner} aria-hidden="true" />
            <span>Loading Harmony&apos;s live gallery…</span>
          </div>
        ) : null}
        <iframe
          className={styles.frame}
          src={RXPHOTO_GALLERY_URL}
          title="Harmony Med Spa live before-and-after gallery"
          loading="eager"
          allow="fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <p className={styles.fallback}>
        Having trouble viewing the gallery?{" "}
        <a href={RXPHOTO_GALLERY_URL} target="_blank" rel="noopener noreferrer">
          Open it in a new tab
        </a>
        .
      </p>
    </section>
  );
}