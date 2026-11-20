"use client";

import { useLayoutEffect, useRef } from "react";
import { useBlackFridayPhase } from "@/lib/promotions/useBlackFridayPhase";

/** Keeps its phase scope's data-bf-phase current after hydration and client navigation. */
export default function PhaseSync() {
  const marker = useRef<HTMLSpanElement>(null);
  const phase = useBlackFridayPhase();
  useLayoutEffect(() => {
    const scope = marker.current?.closest<HTMLElement>("[data-bf-scope]");
    if (scope && scope.getAttribute("data-bf-phase") !== phase) scope.setAttribute("data-bf-phase", phase);
  }, [phase]);
  return <span ref={marker} hidden />;
}
