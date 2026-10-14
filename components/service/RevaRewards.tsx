import type { ReactNode } from "react";

// REVA Rewards (Revance Rewards) — an ongoing manufacturer loyalty program, shown on
// eligible treatment pages (Daxxify, Dermal Fillers). Single source for the program copy
// so both pages stay in sync. Deliberately describes only the permanent program, its
// welcome incentive and ongoing earning — never a limited-time promotion.
//
// Signup buttons link straight to REVA's registration/wallet so a patient lands on the
// enrollment page, not a marketing page. This is a separate Revance program, not a
// Harmony membership, so copy never says whether it combines with Harmony offers.

const REVA_SIGNUP_URL = "https://app.revarewards.com/welcome";
const REVA_SITE_URL = "https://www.revarewards.com/";
const REVA_TERMS_URL = "https://www.revarewards.com/terms-and-conditions";

type RevaVariant = "daxxify" | "dermal-fillers";

type RevaCopy = {
  treatLabel: string;
  headline: string;
  subheadline: string;
  body: ReactNode[];
  tagline: string;
  earning: string[];
  ctaNote: string;
  disclaimer: string;
};

// Separate program wording: say what REVA is, never whether it combines with Harmony offers.
const SEPARATE_PROGRAM =
  "REVA Rewards is a separate manufacturer loyalty program from Revance and is not part of Harmony Med Spa memberships or specials. REVA program rules and eligibility requirements apply.";

const MORE_WAYS_TO_EARN = [
  "50 points ($5) for consecutive treatments with the same provider and product brand",
  "25 points ($2.50) for returning for treatment within the program's eligible timeframe",
  "25 birthday points ($2.50) each year with a verified birth date",
  "Redeem points in $5 increments toward eligible treatments",
];

const COPY: Record<RevaVariant, RevaCopy> = {
  daxxify: {
    treatLabel: "an eligible Daxxify treatment",
    headline: "Get Rewarded for Your Daxxify Treatments!",
    subheadline: "Join REVA Rewards and receive $25 in welcome savings!",
    body: [
      "At Harmony Med Spa, your beauty routine can be even more rewarding.",
      <>
        When you join REVA Rewards, you&apos;ll receive <strong>250 welcome points ($25 value)</strong> and can
        continue earning another <strong>250 points ($25 value)</strong> with every qualifying Daxxify treatment.
      </>,
      "Plus, enjoy opportunities to earn additional points for returning to your favorite provider, maintaining your treatment routine, and celebrating your birthday!",
    ],
    tagline: "Treat. Earn. Save.",
    earning: [
      "250 welcome points ($25) just for joining",
      "250 points ($25) per eligible Daxxify treatment, earned once every 90 days",
    ],
    ctaNote: "Eligibility and program terms apply.",
    disclaimer: `Daxxify rewards are available to patients 18 and older. ${SEPARATE_PROGRAM}`,
  },
  "dermal-fillers": {
    treatLabel: "a qualifying RHA treatment",
    headline: "Love Your Look. Earn Rewards!",
    subheadline: "Get $25 in welcome savings with REVA Rewards!",
    body: [
      "Beautiful, natural-looking results are even more rewarding at Harmony Med Spa.",
      <>
        Join REVA Rewards and receive <strong>250 welcome points ($25 value)</strong> toward an eligible treatment.
        Then earn <strong>200 points ($20 value)</strong> for every qualifying Teoxane RHA&reg; filler syringe, up to
        five syringes per eligible treatment.
      </>,
      "Keep earning additional rewards for staying consistent with your treatments, returning to your provider, and celebrating your birthday.",
    ],
    tagline: "Your favorite treatments deserve rewarding benefits!",
    earning: [
      "250 welcome points ($25) just for joining",
      "200 points ($20) per qualifying RHA syringe (RHA 2, RHA 3, RHA 4 and RHA Redensity), up to five syringes per treatment, earned once every 30 days",
    ],
    ctaNote: "Available for qualifying RHA Collection treatments. Eligibility and program terms apply.",
    disclaimer: `Rewards apply only to qualifying Teoxane RHA® Collection fillers (RHA 2, RHA 3, RHA 4 and RHA Redensity), not every dermal filler brand. RHA treatment rewards are available to patients 22 and older. ${SEPARATE_PROGRAM}`,
  },
};

const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function JoinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  );
}

function TreatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 3c1.6 2.3 4 4.2 4 7a4 4 0 1 1-8 0c0-2.8 2.4-4.7 4-7Z" />
      <path d="M12 14v4" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M12 8V6a2 2 0 0 1 2-2c1.5 0 2.5 1 2.5 2.2 0 1-.8 1.8-1.8 1.8H12Z" />
      <path d="M12 8V6a2 2 0 0 0-2-2C8.5 4 7.5 5 7.5 6.2 7.5 7.2 8.3 8 9.3 8H12Z" />
      <path d="M12 8v12" />
    </svg>
  );
}

const STEP_ICONS = [<JoinIcon key="join" />, <TreatIcon key="treat" />, <SaveIcon key="save" />];

export default function RevaRewards({ variant }: { variant: RevaVariant }) {
  const copy = COPY[variant];
  const steps = [
    { title: "Join", text: "Sign up for REVA Rewards and receive 250 welcome points." },
    { title: "Treat", text: `Receive ${copy.treatLabel} at Harmony Med Spa.` },
    { title: "Earn & Save", text: "Collect points and redeem eligible rewards toward future treatments." },
  ];

  return (
    <section
      aria-labelledby="reva-rewards-heading"
      className="reva-rewards [background:linear-gradient(180deg,#f6efe2,#efe5d3)] text-[#2c2620]"
    >
      <div className="w-[min(100%_-_48px,1180px)] my-0 mx-auto py-[84px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:py-[56px]">
        <div className="grid grid-cols-[minmax(0,1fr)_380px] gap-[0] rounded-[24px] overflow-hidden [border:1px_solid_#e0d2b4] shadow-[0_26px_70px_rgba(60,45,20,0.12)] bg-[#fbf7ef] max-[900px]:grid-cols-[1fr]">
          {/* Program details */}
          <div className="p-[48px] max-[720px]:p-[30px]">
            <span className="inline-flex items-center gap-[10px] text-[length:13px] font-semibold uppercase tracking-[0.18em] text-[#9a7530]">
              <span className="inline-block px-[11px] py-[5px] rounded-full bg-[#16130f] text-[#e9d4a7] tracking-[0.22em]">REVA</span>
              Rewards · Loyalty Program
            </span>
            <h2
              id="reva-rewards-heading"
              className="mt-[18px] mb-[16px] text-[#16130f] text-[length:clamp(30px,3.4vw,44px)] leading-[1.06] font-thin"
            >
              {copy.headline}
            </h2>
            <p className="mt-0 mb-[16px] text-[length:20px] leading-[1.4] font-semibold text-[#9a7530] max-[720px]:text-[length:18px]">{copy.subheadline}</p>
            <div className="mb-[18px] max-w-[640px] text-[length:17px] leading-[1.55] text-[#514a40] max-[720px]:text-[length:16px]">
              {copy.body.map((paragraph, index) => (
                <p key={index} className="mt-0 mb-[12px]">{paragraph}</p>
              ))}
            </div>
            <p className="mt-0 mb-[30px] text-[length:18px] italic text-[#16130f]">{copy.tagline}</p>

            {/* Three-step process */}
            <ol className="grid grid-cols-3 gap-[18px] list-none p-0 m-0 mb-[36px] max-[560px]:grid-cols-1">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-[10px] p-[20px] rounded-[16px] bg-[#f4ecdc] [border:1px_solid_#e6d9bd] text-center max-[560px]:text-left max-[560px]:grid-cols-[auto_1fr] max-[560px]:items-center"
                >
                  <span className="justify-self-center grid place-items-center w-[52px] h-[52px] rounded-full bg-[#16130f] text-[#e4bd6c] max-[560px]:justify-self-start">
                    {STEP_ICONS[index]}
                  </span>
                  <div>
                    <strong className="block text-[length:15px] uppercase tracking-[0.12em] text-[#16130f]">
                      {index + 1}. {step.title}
                    </strong>
                    <span className="block mt-[6px] text-[length:14px] leading-[1.45] text-[#6b6151]">{step.text}</span>
                  </div>
                </li>
              ))}
            </ol>

            {/* Earning details */}
            <ul className="grid gap-[12px] list-none p-0 m-0">
              {copy.earning.map((item) => (
                <li key={item} className="grid grid-cols-[22px_1fr] gap-[12px] items-start text-[length:16px] leading-[1.5] text-[#433d34]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-[1px]">
                    <circle cx="12" cy="12" r="11" fill="#16130f" />
                    <path d="M7.5 12.5l3 3 6-6.5" stroke="#e4bd6c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-[30px] mb-[12px] text-[length:13px] font-bold uppercase tracking-[0.16em] text-[#9a7530]">More ways to earn</h3>
            <ul className="grid gap-[8px] list-none p-0 m-0">
              {MORE_WAYS_TO_EARN.map((item) => (
                <li key={item} className="grid grid-cols-[14px_1fr] gap-[10px] items-baseline text-[length:15px] leading-[1.5] text-[#514a40]">
                  <span aria-hidden="true" className="text-[#c99b13]">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA panel */}
          <aside className="grid [align-content:center] gap-[18px] p-[44px] text-center text-[#f6efe1] [background:radial-gradient(circle_at_30%_20%,#2a2319,transparent_60%),linear-gradient(160deg,#1b1711,#0d0b08)] max-[900px]:p-[36px]">
            <span className="text-[length:13px] font-semibold uppercase tracking-[0.2em] text-[#d9b977]">New member bonus</span>
            <strong className="text-[length:clamp(26px,3vw,34px)] leading-[1.08] font-thin uppercase tracking-[0.04em]">Get $25 in Welcome Rewards</strong>
            <p className="m-0 text-[length:15px] leading-[1.5] text-[#c9c0b0]">
              Enroll with your phone number through REVA&apos;s online wallet in minutes.
            </p>
            <a
              href={REVA_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center mt-[6px] py-[15px] px-[26px] rounded-full bg-[var(--gold)] text-[#16130f] text-[length:16px] font-semibold no-underline [transition:transform_200ms_ease,background_200ms_ease] hover:bg-[#e4bd6c] hover:-translate-y-[1px]"
            >
              Join REVA Rewards – Get $25
            </a>
            <p className="m-0 text-[length:13px] leading-[1.5] text-[#a99f8e]">{copy.ctaNote}</p>
            <a
              href={REVA_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[length:14px] text-[#cfc6b6] underline underline-offset-4 hover:text-[#fff]"
            >
              Learn about REVA Rewards
            </a>
          </aside>
        </div>

        {/* Eligibility disclaimer */}
        <p className="mt-[22px] mb-0 max-w-[1180px] text-[length:13px] leading-[1.6] text-[#6f6757]">
          {copy.disclaimer}{" "}
          <a href={REVA_TERMS_URL} target="_blank" rel="noopener noreferrer" className="text-[#9a7530] underline underline-offset-2">
            View REVA Rewards terms &amp; conditions
          </a>
          .
        </p>
      </div>
    </section>
  );
}
