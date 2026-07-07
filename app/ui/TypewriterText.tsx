"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  className?: string;
  initialDelay?: number;
  letterDelay?: number;
};

export default function TypewriterText({
  text,
  className,
  initialDelay = 260,
  letterDelay = 95
}: TypewriterTextProps) {
  const [visibleText, setVisibleText] = useState(text);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setVisibleText(text);
      return;
    }

    const timers: number[] = [];
    setVisibleText("");

    for (let index = 0; index <= text.length; index += 1) {
      timers.push(
        window.setTimeout(() => {
          setVisibleText(text.slice(0, index));
        }, initialDelay + index * letterDelay)
      );
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [initialDelay, letterDelay, text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{visibleText}</span>
    </span>
  );
}
