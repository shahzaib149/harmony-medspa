import { BF_PHASE_BOUNDARIES } from "@/lib/data/blackFriday2026";

export type PopupCta = { label: string; href: string; action: string };
export type PromotionPopupPhase = {
  /** Also the sessionStorage dismissal key suffix and the analytics item id. */
  id: string;
  /** Inclusive start / exclusive end (ISO with offset). The ?bf_phase override picks a phase by `bfPhase`. */
  startsAt: string;
  endsAt: string;
  bfPhase: "pre" | "early" | "public";
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: PopupCta;
  secondaryCta: PopupCta;
  note?: string;
  theme: "noir";
};

/** Black Friday 2026 popup, one entry per phase. No popup after Nov 30. */
export const promotionPopupPhases: PromotionPopupPhase[] = [
  {
    id: "black_friday_2026_pre", bfPhase: "pre", theme: "noir",
    startsAt: "2026-11-19T00:00:00-05:00", endsAt: BF_PHASE_BOUNDARIES.early,
    eyebrow: "Coming Soon",
    title: "Black Friday Beauty Event",
    body: "Member early access begins November 23, with the public sale November 27–30. Be first to receive our biggest savings of the year.",
    primaryCta: { label: "Request the Specials", href: "/black-friday#request", action: "request_specials" },
    secondaryCta: { label: "View Memberships", href: "/membership", action: "view_memberships" },
    note: "Or DM us “BLACK FRIDAY” on Instagram.",
  },
  {
    id: "black_friday_2026_early", bfPhase: "early", theme: "noir",
    startsAt: BF_PHASE_BOUNDARIES.early, endsAt: BF_PHASE_BOUNDARIES.public,
    eyebrow: "Member Early Access",
    title: "Early Access Is Open",
    body: "Harmony members shop Black Friday first, through November 26. New patients can join a membership and unlock member pricing after their first payment.",
    primaryCta: { label: "Shop Early Access", href: "/black-friday", action: "shop_early_access" },
    secondaryCta: { label: "Join a Membership", href: "/membership", action: "join_membership" },
  },
  {
    id: "black_friday_2026_public", bfPhase: "public", theme: "noir",
    startsAt: BF_PHASE_BOUNDARIES.public, endsAt: BF_PHASE_BOUNDARIES.ended,
    eyebrow: "Black Friday Sale",
    title: "Our Biggest Savings Are Live",
    body: "Black Friday specials on injectables, facials, laser and more, through November 30. Plus: buy a $100+ gift card, get 10% back.",
    primaryCta: { label: "View All Specials", href: "/black-friday", action: "view_all_specials" },
    secondaryCta: { label: "Request a Gift Card", href: "/gift-cards", action: "request_gift_card" },
  },
];

/** Paths where no promotion popup shows. Matched by whole segment, so "/landing" does not cover "/landing-v1". */
export const POPUP_EXCLUDED_PATHS = [
  "/landing", "/landing-v1", "/offer-test-fixture", "/unsubscribe", "/patient-forms", "/contact-us", "/black-friday", "/gift-cards",
];

export function popupExcluded(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return POPUP_EXCLUDED_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
}
