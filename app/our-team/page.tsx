export const metadata = { title: "Our Team", alternates: { canonical: "/our-team" }, openGraph: openGraphFor("/our-team") };

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import TeamList from "@/components/team/TeamList";
import styles from "@/components/team/Team.module.css";
import SiteHeader from "@/components/layout/SiteHeader";
import HeroMedia from "@/components/layout/HeroMedia";
import SiteFooter from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { providers } from "@/lib/data/providers";
import { ONLINE_BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import { displayFont } from "@/lib/fonts";
import { buildBreadcrumbSchema, buildPersonSchema } from "@/lib/schema";
import { openGraphFor } from "@/lib/seo/metadata";

// Jessica's card on this page: name, credential, title and the visible card bio
// (not fullBio, which sits behind the modal).
const jessica = providers.find((provider) => provider.file === "clear_team_1.jpg");
const [jessicaName, jessicaCredential] = jessica ? jessica.name.split(", ") : [];
const teamSchema = [
  buildBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Our Team", url: "/our-team" }]),
  ...(jessica
    ? [buildPersonSchema({
      slug: "jessica-simone",
      name: jessicaName,
      honorificSuffix: jessicaCredential,
      jobTitle: jessica.title,
      description: jessica.bio,
      image: `/images/providers/${jessica.file}`,
    })]
    : []),
];

const teamTitleLetters = [
  { character: "O", offset: "132px" },
  { character: "u", offset: "92px" },
  { character: "r", offset: "54px" },
  { character: " ", offset: "0px" },
  { character: "T", offset: "-28px" },
  { character: "e", offset: "-68px" },
  { character: "a", offset: "-108px" },
  { character: "m", offset: "-150px" }
];

export default function OurTeamPage() {
  return (
    <main className={`team-page ${displayFont.variable} ${styles.page}`}>
      <JsonLd data={teamSchema} />
      <SiteHeader className="team-header" />

      <section className="team-hero has-media grid [place-items:center] min-h-[272px] overflow-hidden [background:linear-gradient(rgba(0,0,0,0.52),rgba(0,0,0,0.52)),radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.1),transparent_18%),radial-gradient(circle_at_42%_58%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.09),transparent_20%),linear-gradient(135deg,#202020,#111_48%,#252525)] [&_h1]:m-0 [&_h1]:text-[var(--gold)] [&_h1]:text-[length:clamp(42px,3.4vw,58px)] [&_h1]:leading-[1] [&_h1]:font-thin [&_h1]:[transform:scaleX(0)] [&_h1]:origin-[center] [&_h1]:opacity-0 [&_h1]:[animation:teamTitleReveal_200ms_ease-out_120ms_forwards] max-[720px]:min-h-[220px]">
        <HeroMedia path="/our-team" />
        <h1 aria-label="Our Team">
          {teamTitleLetters.map((letter, index) => (
            <span
              aria-hidden="true"
              className={letter.character === " " ? "team-title-space" : undefined}
              key={`${letter.character}-${index}`}
              style={
                {
                  "--letter-delay": `${index * 0.08}s`,
                  "--letter-start": letter.offset
                } as React.CSSProperties
              }
            >
              {letter.character === " " ? "\u00A0" : letter.character}
            </span>
          ))}
        </h1>
      </section>

      <section className={`${styles.wrap} ${styles.intro}`} aria-labelledby="team-intro-title">
        <p className={styles.eyebrow}>Our team</p>
        <h2 id="team-intro-title" className={styles.title}>
          Meet your <em>care team</em>
        </h2>
        <p>
          Harmony Med Spa provides the highest quality service to ensure that you are healthy and happy. Meet our caring and
          compassionate team, committed to providing exceptional service to you.
        </p>
      </section>

      <figure className={`${styles.wrap} ${styles.groupPhoto}`}>
        <Image
          src="/images/team/harmony-care-team.jpg"
          alt="The Harmony Med Spa care team standing together at the clinic's skincare display"
          width={1535}
          height={1024}
          sizes="(max-width: 1244px) 92vw, 1180px"
          priority
        />
      </figure>

      <TeamList />

      <section className={styles.cta} aria-labelledby="team-cta-title">
        <div className={`${styles.wrap} ${styles.ctaCard}`}>
          <div>
            <h2 id="team-cta-title" className={styles.title}>
              Ready to meet us <em>in person</em>?
            </h2>
            <p>Book online, or call our Gulf Gate office and we will help plan your visit.</p>
          </div>
          <div className={styles.actions}>
            <a className={styles.btnGold} href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book Online
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className={styles.btnGlass} href={`tel:${PHONE_TEL}`}>
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
