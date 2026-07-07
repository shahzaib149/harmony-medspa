import TeamList from "@/components/team/TeamList";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const teamTitleLetters = [
  { character: "o", offset: "132px" },
  { character: "u", offset: "92px" },
  { character: "r", offset: "54px" },
  { character: " ", offset: "0px" },
  { character: "t", offset: "-28px" },
  { character: "e", offset: "-68px" },
  { character: "a", offset: "-108px" },
  { character: "m", offset: "-150px" }
];

export default function OurTeamPage() {
  return (
    <main className="team-page">
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

      <section className="team-hero">
        <h1 aria-label="our team">
          {teamTitleLetters.map((letter, index) => (
            <span
              aria-hidden="true"
              className={letter.character === " " ? "team-title-space" : undefined}
              key={`${letter.character}-${index}`}
              style={
                {
                  "--letter-delay": `${index * 0.2}s`,
                  "--letter-start": letter.offset
                } as React.CSSProperties
              }
            >
              {letter.character === " " ? "\u00A0" : letter.character}
            </span>
          ))}
        </h1>
      </section>

      <TeamList />

      <SiteFooter address="plain" copyright="plain" />
    </main>
  );
}
