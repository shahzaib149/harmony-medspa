"use client";

import { useState } from "react";
import styles from "./RxPhotoGalleryEmbed.module.css";

const RXPHOTO_GALLERY_URL = "https://harmonymedfl.wpenginepowered.com/";

export default function RxPhotoGalleryEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.galleryBlock}>
      <div className={styles.frameShell} aria-busy={!loaded}>
        {!loaded ? (
          <div className={styles.loading} role="status" aria-live="polite">
            <span className={styles.spinner} aria-hidden="true" />
            <span>Loading the live gallery…</span>
          </div>
        ) : null}

        <iframe
          className={styles.frame}
          src={RXPHOTO_GALLERY_URL}
          title="Harmony Med Spa live before-and-after gallery"
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
        />
      </div>

      <p className={styles.fallback}>
        Having trouble viewing the gallery?{" "}
        <a href={RXPHOTO_GALLERY_URL} target="_blank" rel="noopener noreferrer">
          Open the live gallery in a new window
        </a>
        .
      </p>
    </div>
  );
}