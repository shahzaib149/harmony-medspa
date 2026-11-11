"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Laser.module.css";

// The "Two depths, one plan" cross-section and the concern selector share state:
// picking a concern lights the layer where it is treated.

type Layer = "surface" | "upper" | "deep";
type Concern = { id: string; label: string; layers: Layer[]; line: string };

const CONCERNS: Concern[] = [
  {
    id: "lines",
    label: "Fine lines & wrinkles",
    layers: ["upper", "deep"],
    line: "RF microneedling supports collagen below the surface, while CO2 helps improve the appearance of fine lines on top.",
  },
  {
    id: "texture",
    label: "Uneven texture & acne scars",
    layers: ["surface", "upper"],
    line: "Fractional CO2 resurfaces the outer layers, and RF microneedling works just beneath them, so both levels of texture are planned for.",
  },
  {
    id: "spots",
    label: "Dark spots & sun damage",
    layers: ["surface"],
    line: "Fractional CO2 helps improve the appearance of sun damage and uneven tone in the outer layers of skin.",
  },
  {
    id: "firmness",
    label: "Loss of firmness",
    layers: ["deep"],
    line: "RF microneedling delivers energy deeper to support collagen and firmness.",
  },
];

const CAPTIONS = [
  "Fractional CO2 resurfaces the outer layers: texture, tone and sun damage.",
  "RF microneedling delivers energy deeper to support collagen and firmness.",
  "Together: one plan for surface and depth.",
];

const DESCRIPTION =
  "Illustrated cross-section of skin with three layers: surface, upper dermis and deeper dermis. " +
  "First, fine fractional CO2 columns appear in the surface layer: " + CAPTIONS[0] + " " +
  "Then energy pulses travel into the deeper dermis: " + CAPTIONS[1] + " " +
  "Finally both are shown together: " + CAPTIONS[2];

// Columns stop short of the right-hand labels.
const COLUMNS = Array.from({ length: 16 }, (_, i) => 30 + i * 28);
const NEEDLES = [40, 130, 220, 310, 400];

function SkinSvg({ stage, active, idPrefix }: { stage: number; active: Layer[] | null; idPrefix: string }) {
  const dim = (layer: Layer) => (active && !active.includes(layer) ? styles.dim : "");
  return (
    <svg viewBox="0 0 600 340" className={styles.svg} data-stage={stage} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${idPrefix}-surface`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf4ee" />
          <stop offset="1" stopColor="#f3e3dc" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-upper`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efd6d2" />
          <stop offset="1" stopColor="#e6c4c3" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-deep`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ddb9bf" />
          <stop offset="1" stopColor="#cfa7b2" />
        </linearGradient>
        <radialGradient id={`${idPrefix}-pulse`}>
          <stop offset="0" stopColor="#f6e3b4" stopOpacity=".95" />
          <stop offset="1" stopColor="#b08a3e" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Layers: soft wavy tops so it reads as tissue, not a chart. */}
      <path className={`${styles.layer} ${dim("deep")}`} d="M0 170 C120 160 220 182 320 172 S520 162 600 172 V340 H0Z" fill={`url(#${idPrefix}-deep)`} />
      <path className={`${styles.layer} ${dim("upper")}`} d="M0 82 C110 74 230 92 330 84 S520 76 600 84 V176 C520 166 420 178 320 176 S120 164 0 174Z" fill={`url(#${idPrefix}-upper)`} />
      <path className={`${styles.layer} ${dim("surface")}`} d="M0 30 C100 22 230 38 330 30 S520 22 600 30 V88 C510 80 420 92 330 88 S110 78 0 86Z" fill={`url(#${idPrefix}-surface)`} />
      {/* Fractional CO2: fine columns in the surface layer. */}
      <g className={`${styles.columns} ${dim("surface")}`}>
        {COLUMNS.map((x, i) => (
          <rect key={x} x={x} y="32" width="3" height="46" rx="1.5" style={{ transitionDelay: `${i * 28}ms` }} />
        ))}
      </g>
      {/* RF microneedling: needles into the dermis with pulses at depth. */}
      <g className={`${styles.needles} ${dim("deep")}`}>
        {NEEDLES.map((x, i) => (
          <g key={x} style={{ transitionDelay: `${i * 90}ms` }}>
            <line x1={x + 22} y1="34" x2={x + 22} y2="214" />
            <circle cx={x + 22} cy="214" r="34" fill={`url(#${idPrefix}-pulse)`} className={styles.pulse} style={{ animationDelay: `${i * 160}ms` }} />
          </g>
        ))}
      </g>
      {/* Hairline labels, like a medical illustration. */}
      <g className={styles.labels}>
        <text x="590" y="60" textAnchor="end">SURFACE</text>
        <text x="590" y="132" textAnchor="end">UPPER DERMIS</text>
        <text x="590" y="262" textAnchor="end">DEEPER DERMIS</text>
      </g>
    </svg>
  );
}

export default function SkinPlan() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(3); // server/no-JS: everything visible
  const [concern, setConcern] = useState<Concern | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setStage(0);
    const timers: number[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      timers.push(window.setTimeout(() => setStage(1), 150));
      timers.push(window.setTimeout(() => setStage(2), 1700));
      timers.push(window.setTimeout(() => setStage(3), 3300));
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => { observer.disconnect(); timers.forEach(window.clearTimeout); };
  }, []);

  const caption = stage === 0 ? "" : CAPTIONS[Math.min(stage, 3) - 1];
  const pick = (next: Concern) => {
    setConcern((current) => (current?.id === next.id ? null : next));
    setStage(3);
  };

  return (
    <>
      <section className={styles.graphicSection} aria-labelledby="depths-title">
        <div className={styles.graphicHead} data-reveal>
          <p className={styles.eyebrow}>How the combination works</p>
          <h2 id="depths-title">Two depths, one plan.</h2>
          <p className={styles.intro}>Most skin concerns live at more than one depth. This combination addresses the outer layers and the deeper dermis in one plan, matched to your skin at your consultation.</p>
        </div>

        <div ref={ref} className={styles.graphicCard}>
          <figure className={styles.animated} role="img" aria-label="How RF microneedling and fractional CO2 work at two depths" aria-describedby="skin-graphic-desc">
            <SkinSvg stage={stage} active={concern?.layers ?? null} idPrefix="sk" />
            <figcaption className={styles.caption} aria-live="polite">
              {concern ? concern.line : caption || " "}
            </figcaption>
            <ol className={styles.stageDots} aria-hidden="true">
              {[1, 2, 3].map((n) => <li key={n} className={stage >= n ? styles.dotOn : ""} />)}
            </ol>
          </figure>
          <p id="skin-graphic-desc" className={styles.srOnly}>{DESCRIPTION}</p>

          {/* Reduced motion: the same story as three still panels. */}
          <div className={styles.staticPanels}>
            {CAPTIONS.map((text, index) => (
              <figure key={text} className={styles.staticPanel}>
                <SkinSvg stage={index + 1} active={null} idPrefix={`st${index}`} />
                <figcaption>{text}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.concernSection} aria-labelledby="concern-title">
        <div data-reveal>
          <p className={styles.eyebrow}>Your goals</p>
          <h2 id="concern-title">What are you hoping to change?</h2>
        </div>
        <div className={styles.concernChips} role="group" aria-label="Choose a skin concern">
          {CONCERNS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={concern?.id === item.id ? `${styles.chip} ${styles.chipOn}` : styles.chip}
              aria-pressed={concern?.id === item.id}
              onClick={() => pick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.concernAnswer} aria-live="polite">
          {concern ? (
            <>
              <p>{concern.line} Results vary.</p>
              <a href="#consultation" className={styles.answerLink}>Book a consult <ArrowRight size={16} aria-hidden="true" /></a>
            </>
          ) : (
            <p className={styles.answerHint}>Pick one to see where it is treated in the illustration above.</p>
          )}
        </div>
      </section>
    </>
  );
}
