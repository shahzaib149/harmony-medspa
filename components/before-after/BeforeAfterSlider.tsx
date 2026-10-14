"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  width: number;
  height: number;
  /** What the photos show, e.g. "Dermal filler result". */
  label: string;
  /** Frame ratio. Defaults to the photos' own ratio; grids pass one shared ratio so rows line up. */
  aspectRatio?: string;
  sizes?: string;
};

const KEY_STEP = 5;

/**
 * Before and after photos stacked under a draggable divider. Drag or swipe sideways to
 * compare (vertical swipes still scroll the page), or use the arrow keys on the handle.
 * The first time it scrolls into view the divider sweeps once to show it can move.
 */
export default function BeforeAfterSlider({
  before,
  after,
  width,
  height,
  label,
  aspectRatio,
  sizes = "(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 380px",
}: BeforeAfterSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [position, setPosition] = useState(50);
  const [hinting, setHinting] = useState(false);

  const moveTo = useCallback((percent: number, commit: boolean) => {
    const clamped = Math.min(100, Math.max(0, percent));
    rootRef.current?.style.setProperty("--pos", `${clamped}%`);
    if (commit) setPosition(Math.round(clamped));
  }, []);

  const percentAt = (clientX: number) => {
    const box = rootRef.current?.getBoundingClientRect();
    return box ? ((clientX - box.left) / box.width) * 100 : 50;
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setHinting(true);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const stopHint = () => setHinting(false);

  return (
    <div
      ref={rootRef}
      className={`ba-slider${hinting ? " is-hinting" : ""}`}
      style={{ aspectRatio: aspectRatio ?? `${width} / ${height}` }}
      onAnimationEnd={stopHint}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        stopHint();
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        // A touch may turn out to be a scroll, so only mouse and pen jump on press.
        if (event.pointerType !== "touch") moveTo(percentAt(event.clientX), false);
      }}
      onPointerMove={(event) => {
        if (dragging.current) moveTo(percentAt(event.clientX), false);
      }}
      onPointerUp={(event) => {
        if (!dragging.current) return;
        dragging.current = false;
        moveTo(percentAt(event.clientX), true);
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <Image className="ba-image" src={after} alt={`${label}, after treatment`} fill sizes={sizes} />
      <div className="ba-before">
        <Image className="ba-image" src={before} alt={`${label}, before treatment`} fill sizes={sizes} />
      </div>

      <span className="ba-tag ba-tag-before" aria-hidden="true">Before</span>
      <span className="ba-tag ba-tag-after" aria-hidden="true">After</span>

      <div className="ba-divider" aria-hidden="true" />
      <div
        className="ba-handle"
        role="slider"
        tabIndex={0}
        aria-label={`${label}: drag to compare before and after`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={position}
        aria-valuetext={`${position}% before`}
        onKeyDown={(event) => {
          const keys: Record<string, number> = {
            ArrowLeft: position - KEY_STEP,
            ArrowDown: position - KEY_STEP,
            ArrowRight: position + KEY_STEP,
            ArrowUp: position + KEY_STEP,
            Home: 0,
            End: 100,
          };
          if (!(event.key in keys)) return;
          event.preventDefault();
          stopHint();
          moveTo(keys[event.key], true);
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
