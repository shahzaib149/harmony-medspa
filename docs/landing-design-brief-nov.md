# November landing pages — design brief

Two paid-traffic pages built on the existing November landing system (`components/landing/november/*`,
`lib/data/novemberOffers.ts`). Same form, attribution (`harmony_attribution_v1`), conversion
(`NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO` + GA4 `generate_lead`) and slim header/footer as
`/landing/hormone-optimization`. Every price and term reads from the offer config. Both pages are
`noindex, follow`.

Shared direction, "quiet luxury clinic": warm ivory base, deep plum-ink type (`--ink #241d29`), one
accent for buttons, gold only as hairlines and focus rings, Playfair Display for display type at the
existing scale. Motion is CSS + IntersectionObserver (no new library). It animates only
`transform`/`opacity`, and with `prefers-reduced-motion` everything is static and visible.

---

## Page 1 — `/landing/laser-skin` (tint: porcelain + soft rose)

### 1. Who arrives, and what they searched
They searched "rf microneedling sarasota", "co2 laser near me", "wrinkle treatment sarasota" and "skin
resurfacing" (CS4 ad group *RF Microneedling + CO2*). They already know they want a skin result and
are comparing clinics and devices. Their worries, in order: *will it work on my skin*, *how much
downtime*, *what does it cost*, *can I trust this clinic*.

### 2. The one decision and the one action
Decision: "Is Harmony the right place to plan my resurfacing?" Not "which device", since that is
decided at the consult. Action: **book a skin consultation** (form) or **call**. Nothing else
competes. The only exits are the form, call, booking link and a small "Also offered" row.

### 3. Question order → section order
| Visitor's question | Section that answers it |
|---|---|
| Is this the thing I searched for? | Hero repeats the ad: "RF Microneedling + CO2", wrinkles, texture, dark spots, November pricing pill |
| How does it actually work? | **Signature graphic "Two depths, one plan"**: surface vs. depth, in plain language |
| Will it help *my* concern? | Concern selector (4 chips) lights up the matching part of the graphic |
| Why both, not one? | Three cards: surface + depth, personalised at consult, planned around your downtime |
| What happens, step by step? | StepTimeline: consult → plan → treatment day → recovery & follow-up |
| Does it work on real people? | Gallery card to `/before-and-afters` (no consented laser photos yet) |
| What does it cost? | Pricing note: packages exist, November combo pricing "ask our team" |
| Who will treat me? | Providers |
| Okay — how do I start? | Lead form, FAQ, final CTA with map, address and hours |

### 4. Visual concept
**"A cross-section, not a close-up."** Laser pages usually lean on glossy face close-ups, which read
as stock and invite comparison with unrealistic results. This page explains the treatment instead:
a calm, illustrated cross-section of skin is the hero object of the page. It is honest (no faces, no
implied results) and it explains why two devices are paired.
- **Palette:** porcelain `#f1eeee` / blush `#e7dadb` tint on ivory, with the skin layers drawn in three
  warm translucent bands (surface ivory → rose → deeper mauve). Energy is a single soft gold line.
- **Imagery:** real photos only. The laser treatment room (`laser-treatment-room.jpg`) is the hero
  image on mobile and the final CTA. The skin-analysis device (`skin-analysis-imaging.jpg`) sits beside
  the "Consultation & skin assessment" step. Providers' real portraits. No lip or face stock; the AI
  lip image (`landing/injectables.jpg`) is never used.
- **Type:** display serif at 56–68px desktop / 38–42px mobile with tight tracking; labels in the sans at
  13px caps, like annotations in a medical illustration.

### 5. Motion plan (every animation explains something)
| What moves | When | What it explains |
|---|---|---|
| Hero words rise in sequence; form card fades in | load, ≤ 800ms | Reading order: headline → offer → form |
| Skin graphic, state 1: fine vertical columns draw down into the surface band | graphic 30% in view | "Fractional CO2 works at the surface" |
| State 2: soft pulses travel deeper into the dermis | after state 1 | "RF microneedling delivers energy deeper" |
| State 3: both states shown together, caption changes to "Together: one plan for surface and depth" | after state 2 | Why the combination exists |
| Concern chip selected → matching layer brightens, others dim to 40% | on click/keyboard | Connects the visitor's concern to where it is treated |
| Timeline line draws left→right, steps follow | in view | Sequence and time |
| Cards lift 2px on hover; primary button soft shine | hover/focus | Affordance |

The graphic plays once (no loop), uses CSS transitions on `opacity`/`transform` only and is lazy
below the fold. Reduced motion shows a **static three-panel version** (surface / depth / together)
with the same captions. The SVG has `role="img"`, a title and a full `aria-describedby` text.

### 6. Message match (above the fold)
| Ad headline | Where it appears |
|---|---|
| RF Microneedling + CO2 Laser | Eyebrow "RF Microneedling + Fractional CO2 · Sarasota" + H1 |
| Turn Back Signs of Aging | H1 "Turn Back Signs of Aging With RF Microneedling + CO2" |
| Wrinkles, Texture & Dark Spots | Sub-headline |
| Our Most Advanced Skin Combo | Sub-headline ("Our most advanced combination…") |
| Ask About November Pricing | Pill "November: ask about combo pricing" + form heading |
| See Real Before & Afters | Gallery card link, also listed in the hero trust row |

### 7. Risks and how the page handles them
- **No confirmed November price** (`laserOffer.confirmed: false`, `price: null`): no price, no discount
  and no percentage anywhere. Regular CO2 package prices exist on `/pricing` but stay off this page.
- **No consented laser before/afters:** gallery card only, captioned "Real Harmony patients. Results vary."
- **Downtime / sessions / pain:** not stated on the service pages, so the answers say "We'll go over
  this at your consultation." No "pain-free" or "no downtime".
- **Claims:** "helps improve the appearance of" and "supports" only. No cure, guarantee or permanent claims.
- **Lead routing:** Source `Laser Skin Landing Page`, Treatment Interest "RF Microneedling + CO2 Laser",
  Offer Code `RFCO2-NOV`. Make's Source allow-list must include the new Source before launch, or
  leads save as "Landing Pages".

---

## Page 2 — `/landing/november-specials` (tint: champagne + soft blush)

### 1. Who arrives, and what they searched
Two groups. **Generic** (CS4 *Med Spa Sarasota*): "med spa sarasota", "med spa near me". They are
shopping for a clinic and have no treatment in mind yet. **Brand** (CS5): "harmony med spa
sarasota", "$150 hormone exam". They know Harmony and want this month's offers or the phone number.

### 2. The one decision and the one action
Decision: "Which of this month's offers is for me?" Action: **pick an offer → book or call.** Each
offer card has one CTA. The offer finder ends in the form with the interest pre-selected.

### 3. Question order → section order
| Visitor's question | Section |
|---|---|
| Is this a real med spa, and what's on this month? | Hero: "Sarasota's MD & NP-Led Med Spa" + countdown + editorial photo collage |
| Can I trust them? | Trust strip (BBB A+, 2024 Best in Business, MD & NP-led, Gulf Gate) |
| What are the offers? | **Offer grid (centrepiece)**: six cards + slim $299 skincare-gift band |
| I'm not sure which one fits me | Offer finder (3 steps) → result card → form pre-filled |
| What else do you do? | Full service grid linking to existing pages |
| Do results look natural? | Six consent-confirmed RHA filler before/afters |
| What do patients say? | Reviews band: real quotes from `/testimonials` |
| Who treats me? | Providers |
| How do I start / where are you? | Lead form (no pre-selection), Visit us (map link, address, hours) |

### 4. Visual concept
**"The November edit."** The page is laid out like a magazine's monthly offers spread: an
asymmetric hero collage of real clinic photos, then a grid of offer cards with clear price
typography. Each card has a small custom line icon (vial, syringe outline, membership card, layered
skin, droplet, three-shot set), drawn in one 1.5px stroke style. Champagne `#f5ecdc` / blush tint,
gold hairlines between cards, and prices in the display serif so they read as editorial rather than
discount-store.
- **Imagery:** hero collage of `harmony-storefront-sunny`, `harmony-lounge-logo-wall` and `iv-lounge-recliners`
  (with parallax of 30px or less). There are no November office photos in the repo, so October 2026 photos are used.
- **Before/afters:** the six RHA filler images from `fillerBeforeAfters`, already ordered younger/older.

### 5. Motion plan
| What moves | When | What it explains |
|---|---|---|
| Collage layers settle with ≤ 30px parallax | load + scroll | Depth: a real place, not a flat banner |
| Countdown pill fills its reserved slot after hydration | load | Urgency without layout shift |
| Offer cards reveal with a 70ms stagger | grid in view | "There are six; scan them" |
| Prices count up from 70% (whole dollars only: $150, $100, $149, 25%) | card in view | Draws the eye to the number, ends on the real value |
| Finder steps slide 16px between steps; result card rises | on choice | Progress through a short decision |
| Card lift and button shine | hover/focus | Affordance |
| Sticky mobile Call/Book bar hides while the form is visible | scroll | Never covers the form |

Reduced motion: no parallax and no count-up (final values render server-side), and steps swap instantly.

### 6. Message match (above the fold)
| Ad headline | Where it appears |
|---|---|
| Med Spa in Sarasota / MD & NP-Led Med Spa | H1 "Sarasota's MD & NP-Led Med Spa" |
| November Specials Are Live | Eyebrow "November at Harmony Med Spa" + countdown pill |
| Harmony Med Spa Sarasota | Logo, eyebrow, page title |
| $150 Hormone Exam / Memberships From $149/Month / $100 Off Filler for Members / 25% Off IV Therapy / RF Microneedling + CO2 Laser | Sub-headline names all five; the offer grid starts at the bottom of the fold on desktop, and a "See This Month's Offers" CTA scrolls to it |

### 7. Risks and how the page handles them
- **Hormone exam:** "$150 (reg. $306)", "Save $156". Never a percentage. A grep for "50%" must return zero hits.
- **Filler:** "For new and current members". IV: "Add-ons not included" printed next to the price on the card.
- **Skincare gift** (`skincareGift.confirmed: false`): band reads "$299 skincare gift: ask in clinic
  for details." No terms invented.
- **RF + CO2 card:** no price, "Ask about November pricing", links to `/landing/laser-skin`.
- **Offers can't be combined unless stated**: in the footer compliance line.
- **Black Friday (Nov 23–27):** not mentioned. Copy, codes and dates live in config so a BF variant
  is a config swap later.
- **Reviews:** only the existing named quotes, unedited, first name + last initial.
- **Lead routing:** Source `November Specials Landing Page`, Offer Code `NOV`. The finder sets the
  interest to the site's service names (Hormone Optimization, Dermal Fillers, Memberships, IV Therapy,
  RF Microneedling, Fractional CO2 Laser). Same Make allow-list dependency as page 1.
- **`landing/injectables.jpg` (AI lip image)** is currently used on `/landing/injectables` (hero image +
  OG image) and `/landing-v1` (`components/landing-v1/LandingV1.tsx`). It is not used on either new page.
