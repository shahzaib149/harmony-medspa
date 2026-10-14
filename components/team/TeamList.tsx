"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ONLINE_BOOKING_URL } from "@/lib/constants";
import { providers } from "@/lib/data/providers";
import styles from "./Team.module.css";

type Provider = (typeof providers)[number];

// Services Jessica is certified in or offers, from her full bio.
const ownerSpecialties = [
  "Dermal fillers & neurotoxins",
  "PDO thread lifts",
  "Bioidentical hormone therapy",
  "Certified EvexiPEL provider",
  "RF microneedling",
  "Medical weight loss",
];

/** Keeps credentials like "AGNP-C" on one line. */
const noBreakHyphens = (text: string) => text.replace(/-/g, "\u2011");

export default function TeamList() {
  const [selected, setSelected] = useState<Provider | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [owner, ...team] = providers;

  const open = (provider: Provider, opener: HTMLElement) => {
    openerRef.current = opener;
    setSelected(provider);
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      openerRef.current?.focus();
    };
  }, [selected]);

  return (
    <>
      <section className={styles.wrap} aria-label={`${owner.name}, owner`}>
        <article className={styles.feature}>
          <div className={styles.featurePhoto}>
            <Image src={`/images/providers/${owner.file}`} alt={owner.name} fill preload sizes="(max-width: 900px) 90vw, 460px" />
            <span className={styles.badge}>Owner</span>
          </div>
          <div className={styles.featureBody}>
            <h2>{noBreakHyphens(owner.name)}</h2>
            {owner.title ? <p className={styles.role}>{owner.title}</p> : null}
            <p className={styles.bio}>{owner.fullBio[0]}</p>
            <ul className={styles.chips} aria-label="Specialties">
              {ownerSpecialties.map((specialty) => (
                <li key={specialty}>{specialty}</li>
              ))}
            </ul>
            <div className={styles.actions}>
              <button className={styles.btnGold} type="button" onClick={(event) => open(owner, event.currentTarget)}>
                Read Full Bio
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a className={styles.btnLine} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book an Appointment
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.team} aria-label="Harmony Med Spa team">
        <ul className={`${styles.wrap} ${styles.grid}`}>
          {team.map((member) => (
            <li key={member.file}>
              <article className={styles.card}>
                <div className={styles.cardPhoto}>
                  <Image src={`/images/providers/${member.file}`} alt={member.name} fill sizes="(max-width: 420px) 90vw, (max-width: 1100px) 45vw, 280px" />
                </div>
                <div className={styles.cardBody}>
                  <h3>{noBreakHyphens(member.name)}</h3>
                  {member.title ? <p className={styles.role}>{member.title}</p> : null}
                  <p className={styles.bio}>{member.bio}</p>
                  <button className={styles.readMore} type="button" onClick={(event) => open(member, event.currentTarget)}>
                    Read bio
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {selected ? (
        <div className={styles.backdrop} role="presentation" onMouseDown={() => setSelected(null)}>
          <section
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button ref={closeRef} className={styles.close} type="button" aria-label="Close bio" onClick={() => setSelected(null)}>
              <X size={22} strokeWidth={1.8} />
            </button>
            <div className={styles.dialogPhoto}>
              <Image src={`/images/providers/${selected.file}`} alt={selected.name} fill sizes="320px" />
            </div>
            <div className={styles.dialogBody}>
              <h2 id="team-dialog-title">{noBreakHyphens(selected.name)}</h2>
              {selected.title ? <p className={styles.role}>{selected.title}</p> : <span />}
              <div className={styles.dialogScroll}>
                {selected.fullBio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className={styles.actions}>
                <a className={styles.btnGold} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book an Appointment
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
