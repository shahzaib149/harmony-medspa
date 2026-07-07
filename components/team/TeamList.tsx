"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { providers } from "@/lib/data/providers";

type Provider = (typeof providers)[number];

export default function TeamList() {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  useEffect(() => {
    if (!selectedProvider) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProvider(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProvider]);

  return (
    <>
      <section className="team-list">
        {providers.map((member) => (
          <article className="team-card" key={member.file}>
            <div className="team-photo">
              <Image src={`/images/providers/${member.file}`} alt={member.name} fill sizes="250px" />
            </div>
            <h2>{member.name}</h2>
            {member.title ? <p className="team-role">{member.title}</p> : null}
            <p className="team-excerpt">{member.bio}[..]</p>
            <button className="line-button team-read-more" type="button" onClick={() => setSelectedProvider(member)}>
              Read More
            </button>
          </article>
        ))}
      </section>

      {selectedProvider ? (
        <div className="team-modal-backdrop" role="presentation" onMouseDown={() => setSelectedProvider(null)}>
          <section
            className="team-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="team-modal-close" type="button" aria-label="Close provider details" onClick={() => setSelectedProvider(null)}>
              <X size={34} strokeWidth={1.5} />
            </button>
            <div className="team-modal-photo">
              <Image src={`/images/providers/${selectedProvider.file}`} alt={selectedProvider.name} fill sizes="360px" />
            </div>
            <div className="team-modal-copy">
              <h2 id="team-modal-title">{selectedProvider.name}</h2>
              {selectedProvider.title ? <p className="team-modal-role">{selectedProvider.title}</p> : null}
              <div className="team-modal-scroll">
                {selectedProvider.fullBio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
