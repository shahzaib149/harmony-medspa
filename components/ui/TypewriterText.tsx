"use client";

import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/** useLayoutEffect warns during SSR; fall back to useEffect on the server. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const systemPrefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const smallTitleWords = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "with"]);
const titleAcronyms: Record<string, string> = {
  "adk-10": "ADK-10",
  daxxify: "DAXXIFY",
  e: "E",
  glo2facial: "Glo2Facial",
  glo2facials: "Glo2Facials",
  bhrt: "BHRT",
  co2: "CO2",
  fl: "FL",
  "glp-1": "GLP-1",
  hrt: "HRT",
  kerafactor: "KeraFactor",
  ipl: "IPL",
  iv: "IV",
  rf: "RF",
  t: "T",
  tm: "TM",
};

function formatHeading(text: string): string {
  return text.replace(/[a-z0-9]+(?:[-'][a-z0-9]+)*/gi, (word, offset) => {
    const lower = word.toLocaleLowerCase("en-US");
    const acronym = titleAcronyms[lower];
    if (acronym) return acronym;

    const followsColon = text.slice(0, offset).trimEnd().endsWith(":");
    if (offset > 0 && !followsColon && smallTitleWords.has(lower)) return lower;

    return lower
      .split("-")
      .map((part) => part.charAt(0).toLocaleUpperCase("en-US") + part.slice(1))
      .join("-");
  });
}

type TypewriterTextProps = {
  text: string;
  className?: string;
  initialDelay?: number;
  letterDelay?: number;
  /** Wait until the heading scrolls into view before typing. */
  startOnView?: boolean;
  /** Show a blinking caret trailing the typed characters. */
  caret?: boolean;
  /** Type even when the OS asks for reduced motion. Use only for the hero headline. */
  ignoreReducedMotion?: boolean;
};

export default function TypewriterText({
  text,
  className,
  initialDelay = 260,
  letterDelay = 55,
  startOnView = false,
  caret = false,
  ignoreReducedMotion = false
}: TypewriterTextProps) {
  const skipAnimation = useCallback(() => !ignoreReducedMotion && systemPrefersReducedMotion(), [ignoreReducedMotion]);
  const displayText = formatHeading(text);
  const characters = Array.from(displayText);
  const total = characters.length;
  const hostRef = useRef<HTMLSpanElement>(null);

  // Seed with the full string so SSR and no-JS render readable text.
  const [revealed, setRevealed] = useState(total);

  // Blank it before the browser paints, otherwise hydration flashes the whole heading.
  useIsomorphicLayoutEffect(() => {
    if (!skipAnimation()) {
      setRevealed(0);
    }
  }, [skipAnimation, text]);

  useEffect(() => {
    if (skipAnimation()) {
      const frame = window.requestAnimationFrame(() => setRevealed(total));
      return () => window.cancelAnimationFrame(frame);
    }

    let startTimer: number | undefined;
    let interval: number | undefined;

    const stop = () => {
      window.clearTimeout(startTimer);
      window.clearInterval(interval);
    };

    const start = () => {
      startTimer = window.setTimeout(() => {
        interval = window.setInterval(() => {
          setRevealed((count) => {
            if (count >= total) {
              window.clearInterval(interval);
              return count;
            }

            return count + 1;
          });
        }, letterDelay);
      }, initialDelay);
    };

    if (!startOnView) {
      start();
      return stop;
    }

    const host = hostRef.current;

    if (!host) {
      setRevealed(total);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          start();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(host);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [initialDelay, letterDelay, skipAnimation, startOnView, text, total]);

  return (
    <span className={className} ref={hostRef} aria-label={displayText}>
      {/*
        Every character stays in flow and only toggles `visibility`, so the heading
        reserves its final size from the first frame and nothing below it reflows.
      */}
      <span aria-hidden="true">
        {characters.map((character, index) => (
          <Fragment key={`${character}-${index}`}>
            {/* Caret sits just before the first not-yet-typed character, so it
                trails the cursor. It is rendered exactly once either way, so the
                heading's total width never changes. */}
            {caret && index === revealed ? <span className="typewriter-caret" /> : null}
            <span className={index < revealed ? "visible" : "invisible"}>{character}</span>
          </Fragment>
        ))}
        {caret && revealed >= total ? <span className="typewriter-caret" /> : null}
      </span>
    </span>
  );
}
