"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import styles from "./Specials.module.css";

/** Moves its children up to `max` px with scroll. Off for reduced motion. transform only. */
export function Parallax({ children, speed = 0.06, max = 30, className }: { children: ReactNode; speed?: number; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = Math.max(-max, Math.min(max, window.scrollY * speed));
      element.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [max, speed]);
  return <div ref={ref} className={className}>{children}</div>;
}

export type FinderGoal = {
  id: string;
  label: string;
  /** Treatment Interest sent with the form (a site service name). */
  interest: string;
  offer: { title: string; detail: string; href: string; linkLabel: string };
};

/**
 * "Not sure where to start?" Three steps, client-only, nothing stored. The result pre-selects
 * the form's Treatment Interest via the "harmony:set-interest" event and scrolls to the form.
 */
export function OfferFinder({ goals, consultTitle, consultDetail, formId }: {
  goals: FinderGoal[]; consultTitle: string; consultDetail: string; formId: string;
}) {
  const [goal, setGoal] = useState<FinderGoal | null>(null);
  const [timing, setTiming] = useState<"now" | "exploring" | null>(null);
  const step = !goal ? 1 : !timing ? 2 : 3;

  const choose = () => {
    if (!goal) return;
    window.dispatchEvent(new CustomEvent("harmony:set-interest", { detail: goal.interest }));
    const form = document.getElementById(formId);
    if (form) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => form.querySelector<HTMLInputElement>("input:not([tabindex='-1'])")?.focus({ preventScroll: true }), reduce ? 0 : 600);
    }
  };
  const reset = () => { setGoal(null); setTiming(null); };

  return (
    <div className={styles.finder}>
      <ol className={styles.finderSteps} aria-label="Progress">
        {["Your goal", "Timing", "Your match"].map((label, index) => (
          <li key={label} className={step > index ? styles.stepOn : ""} aria-current={step === index + 1 ? "step" : undefined}>
            <span>{index + 1}</span>{label}
          </li>
        ))}
      </ol>

      <div className={styles.finderBody} aria-live="polite">
        {step === 1 && (
          <fieldset key="goal" className={styles.finderPanel}>
            <legend>What&apos;s your main goal?</legend>
            <div className={styles.finderOptions}>
              {goals.map((item) => (
                <button key={item.id} type="button" className={styles.finderOption} onClick={() => setGoal(item)}>{item.label}</button>
              ))}
            </div>
          </fieldset>
        )}
        {step === 2 && goal && (
          <fieldset key="timing" className={styles.finderPanel}>
            <legend>How soon are you thinking?</legend>
            <div className={styles.finderOptions}>
              <button type="button" className={styles.finderOption} onClick={() => setTiming("now")}>This month</button>
              <button type="button" className={styles.finderOption} onClick={() => setTiming("exploring")}>Just exploring</button>
            </div>
            <button type="button" className={styles.finderBack} onClick={reset}><RotateCcw size={14} aria-hidden="true" /> Start over</button>
          </fieldset>
        )}
        {step === 3 && goal && (
          <div key="result" className={`${styles.finderPanel} ${styles.finderResult}`}>
            <p className={styles.finderKicker}>Your match</p>
            {timing === "now" ? (
              <>
                <h3>{goal.offer.title}</h3>
                <p>{goal.offer.detail}</p>
                <div className={styles.finderActions}>
                  <button type="button" className={styles.finderCta} onClick={choose}>Request this offer <ArrowRight size={16} aria-hidden="true" /></button>
                  <a className={styles.finderLink} href={goal.offer.href}>{goal.offer.linkLabel}</a>
                </div>
              </>
            ) : (
              <>
                <h3>{consultTitle}</h3>
                <p>{consultDetail}</p>
                <div className={styles.finderActions}>
                  <button type="button" className={styles.finderCta} onClick={choose}>Request a consultation <ArrowRight size={16} aria-hidden="true" /></button>
                </div>
              </>
            )}
            <button type="button" className={styles.finderBack} onClick={reset}><RotateCcw size={14} aria-hidden="true" /> Start over</button>
          </div>
        )}
      </div>
    </div>
  );
}
