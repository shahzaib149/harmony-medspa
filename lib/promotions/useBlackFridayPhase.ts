import { useSyncExternalStore } from "react";
import { clientBlackFridayPhase, getBlackFridayPhase, type BlackFridayPhase } from "./blackFriday";

// Re-check every minute and on history changes, so a page left open crosses a boundary
// without a reload and a client-side navigation picks up a new ?bf_phase.
function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  window.addEventListener("popstate", onChange);
  return () => { window.clearInterval(timer); window.removeEventListener("popstate", onChange); };
}

/**
 * The current phase in a client component. The server snapshot uses the real date (no
 * override), so hydration matches the server HTML; the client value follows right after.
 */
export function useBlackFridayPhase(): BlackFridayPhase {
  return useSyncExternalStore(subscribe, clientBlackFridayPhase, () => getBlackFridayPhase());
}
