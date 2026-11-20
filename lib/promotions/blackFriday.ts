import { BF_PHASE_BOUNDARIES, type BlackFridayPhase } from "@/lib/data/blackFriday2026";

export type { BlackFridayPhase };

const PHASES: readonly BlackFridayPhase[] = ["pre", "early", "public", "ended"];
const EARLY = Date.parse(BF_PHASE_BOUNDARIES.early);
const PUBLIC = Date.parse(BF_PHASE_BOUNDARIES.public);
const ENDED = Date.parse(BF_PHASE_BOUNDARIES.ended);

export function isBlackFridayPhase(value: unknown): value is BlackFridayPhase {
  return typeof value === "string" && (PHASES as readonly string[]).includes(value);
}

/** The phase for a moment in time. A valid override (the ?bf_phase= QA param) wins. */
export function getBlackFridayPhase(now: Date = new Date(), override?: string | null): BlackFridayPhase {
  if (isBlackFridayPhase(override)) return override;
  const t = now.getTime();
  if (t < EARLY) return "pre";
  if (t < PUBLIC) return "early";
  if (t < ENDED) return "public";
  return "ended";
}

/** The next boundary after `now` for the countdown, or null once the promotion has ended. */
export function nextBoundary(phase: BlackFridayPhase): number | null {
  if (phase === "pre") return EARLY;
  if (phase === "early") return PUBLIC;
  if (phase === "public") return ENDED;
  return null;
}

/** Reads ?bf_phase= from the current URL. Never persisted anywhere. */
export function phaseOverride(): string | null {
  if (typeof window === "undefined") return null;
  try { return new URLSearchParams(window.location.search).get("bf_phase"); } catch { return null; }
}

export function clientBlackFridayPhase(): BlackFridayPhase {
  return getBlackFridayPhase(new Date(), phaseOverride());
}

/**
 * Inline script for the top of a phase scope. It runs before first paint and sets
 * data-bf-phase on its parent, so phase-specific blocks never flash the wrong copy,
 * even when a cached page was rendered in an earlier phase.
 */
export function phaseScopeScript(): string {
  return `(function(){try{var s=document.currentScript,e=s&&s.parentElement;if(!e)return;var o=new URLSearchParams(location.search).get("bf_phase"),t=Date.now(),p=["pre","early","public","ended"].indexOf(o)>-1?o:t<${EARLY}?"pre":t<${PUBLIC}?"early":t<${ENDED}?"public":"ended";e.setAttribute("data-bf-phase",p)}catch(_){}})();`;
}
