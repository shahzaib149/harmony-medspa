import Image from "next/image";
import type { ReactNode } from "react";

// REVA Rewards (Revance Rewards) — an ongoing manufacturer loyalty program, shown on
// eligible treatment pages (Daxxify, Dermal Fillers). Single source for the program copy
// so both pages stay in sync. Deliberately describes only the permanent program, its
// welcome incentive and ongoing earning — never a limited-time promotion.
//
// Signup buttons link straight to REVA's registration/wallet so a patient lands on the
// enrollment page, not a marketing page. This is a separate Revance program, not a
// Harmony membership, so copy never says whether it combines with Harmony offers.
// The logo is Revance's own REVA Rewards mark, taken from the REVA patient portal.
//
// Kept compact so it supports the treatment page rather than competing with it: the
// $25 offer and three steps are always visible, the bonus rules sit in a closed
// "More ways to earn" panel (still in the HTML for search engines).

const REVA_SIGNUP_URL = "https://app.revarewards.com/welcome";
const REVA_SITE_URL = "https://www.revarewards.com/";
const REVA_TERMS_URL = "https://www.revarewards.com/terms-and-conditions";
// Official product safety pages. Linked rather than copied so the wording stays current.
const DAXXIFY_SAFETY_URL = "https://www.daxxify.com/#isi";
const RHA_SAFETY_URL = "https://www.rhacollection.com/";
const TEOXANE_PATIENT_SAFETY_URL = "https://eifu.teoxane.com/";

type RevaVariant = "daxxify" | "dermal-fillers";

type RevaCopy = {
  headline: string;
  intro: ReactNode;
  treatStep: string;
  earnStep: string;
  ctaNote: string;
  disclaimer: string;
  safety: ReactNode;
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
    headline: "Get Rewarded for Your Daxxify Treatments!",
    intro: (
      <>
        Join REVA Rewards for <strong>250 welcome points ($25)</strong>, then earn another{" "}
        <strong>250 points ($25)</strong> with every qualifying Daxxify treatment.
      </>
    ),
    treatStep: "Get an eligible Daxxify treatment at Harmony Med Spa.",
    earnStep: "Earn 250 points ($25) per treatment, once every 90 days.",
    ctaNote: "Eligibility and program terms apply.",
    disclaimer: `Daxxify rewards are available to patients 18 and older. ${SEPARATE_PROGRAM}`,
    safety: (
      <>
        Read the full{" "}
        <a href={DAXXIFY_SAFETY_URL} target="_blank" rel="noopener noreferrer" className="text-[#9a7530] underline underline-offset-2">
          DAXXIFY&reg; Important Safety Information, including Boxed Warning, and Medication Guide
        </a>
        .
      </>
    ),
  },
  "dermal-fillers": {
    headline: "Love Your Look. Earn Rewards!",
    intro: (
      <>
        Join REVA Rewards for <strong>250 welcome points ($25)</strong>, then earn <strong>200 points ($20)</strong> for
        every qualifying Teoxane RHA&reg; syringe, up to five per treatment.
      </>
    ),
    treatStep: "Get a qualifying RHA filler treatment (RHA 2, 3, 4 or Redensity).",
    earnStep: "Earn 200 points ($20) per RHA syringe, once every 30 days.",
    ctaNote: "Available for qualifying RHA Collection treatments. Eligibility and program terms apply.",
    disclaimer: `Rewards apply only to qualifying Teoxane RHA® Collection fillers (RHA 2, RHA 3, RHA 4 and RHA Redensity), not every dermal filler brand. RHA treatment rewards are available to patients 22 and older. ${SEPARATE_PROGRAM}`,
    safety: (
      <>
        Read the{" "}
        <a href={RHA_SAFETY_URL} target="_blank" rel="noopener noreferrer" className="text-[#9a7530] underline underline-offset-2">
          Teoxane RHA&reg; Collection Important Safety Information
        </a>{" "}
        and{" "}
        <a href={TEOXANE_PATIENT_SAFETY_URL} target="_blank" rel="noopener noreferrer" className="text-[#9a7530] underline underline-offset-2">
          patient safety information
        </a>
        .
      </>
    ),
  },
};

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
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

export default function RevaRewards({ variant }: { variant: RevaVariant }) {
  const copy = COPY[variant];
  const steps = [
    { title: "Join", text: "Sign up and get 250 welcome points ($25).", icon: <JoinIcon /> },
    { title: "Treat", text: copy.treatStep, icon: <TreatIcon /> },
    { title: "Earn & Save", text: copy.earnStep, icon: <SaveIcon /> },
  ];

  return (
    <section
      aria-labelledby="reva-rewards-heading"
      className="reva-rewards [background:linear-gradient(180deg,#f6efe2,#efe5d3)] text-[#2c2620]"
    >
      <div className="w-[min(100%_-_48px,1080px)] my-0 mx-auto py-[56px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:py-[40px]">
        <div className="grid grid-cols-[320px_minmax(0,1fr)] rounded-[22px] overflow-hidden [border:1px_solid_#e0d2b4] shadow-[0_20px_50px_rgba(60,45,20,0.1)] bg-[#fbf7ef] max-[860px]:grid-cols-[1fr]">
          {/* Signup panel */}
          <div className="grid [align-content:center] justify-items-center gap-[12px] p-[32px_28px] text-center text-[#f6efe1] [background:radial-gradient(circle_at_30%_20%,#2a2319,transparent_60%),linear-gradient(160deg,#1b1711,#0d0b08)] max-[720px]:p-[28px]">
            <Image
              src="/images/brands/reva-rewards-logo.svg"
              alt="REVA Rewards by Revance"
              width={667}
              height={250}
              unoptimized
              className="w-[132px] h-auto mb-[6px]"
            />
            <span className="text-[length:12px] font-semibold uppercase tracking-[0.2em] text-[#d9b977]">New member bonus</span>
            <strong className="text-[length:clamp(24px,2.4vw,28px)] leading-[1.1] font-thin uppercase tracking-[0.04em]">
              Get $25 in Welcome Rewards
            </strong>
            <a
              href={REVA_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center mt-[6px] py-[13px] px-[22px] rounded-full bg-[var(--gold)] text-[#16130f] text-[length:15px] font-semibold whitespace-nowrap no-underline [transition:transform_200ms_ease,background_200ms_ease] hover:bg-[#e4bd6c] hover:-translate-y-[1px]"
            >
              Join REVA Rewards – Get $25
            </a>
            <p className="m-0 text-[length:12px] leading-[1.5] text-[#a99f8e]">{copy.ctaNote}</p>
          </div>

          {/* Program details */}
          <div className="p-[34px_38px] max-[720px]:p-[26px_22px]">
            <span className="text-[length:12px] font-semibold uppercase tracking-[0.18em] text-[#9a7530]">Revance loyalty program</span>
            <h2
              id="reva-rewards-heading"
              className="mt-[10px] mb-[10px] text-[#16130f] text-[length:clamp(24px,2.4vw,32px)] leading-[1.12] font-thin"
            >
              {copy.headline}
            </h2>
            <p className="mt-0 mb-[22px] max-w-[600px] text-[length:16px] leading-[1.55] text-[#514a40]">{copy.intro}</p>

            {/* Three-step process */}
            <ol className="grid grid-cols-3 gap-[12px] list-none p-0 m-0 max-[620px]:grid-cols-1 max-[620px]:gap-[8px]">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[auto_1fr] gap-[12px] items-start p-[14px] rounded-[14px] bg-[#f4ecdc] [border:1px_solid_#e6d9bd] max-[620px]:items-center max-[620px]:py-[10px] max-[620px]:px-[12px]"
                >
                  <span className="grid place-items-center w-[38px] h-[38px] rounded-full bg-[#16130f] text-[#e4bd6c]">
                    {step.icon}
                  </span>
                  <div>
                    <strong className="block text-[length:13px] uppercase tracking-[0.12em] text-[#16130f]">
                      {index + 1}. {step.title}
                    </strong>
                    <span className="block mt-[4px] text-[length:13px] leading-[1.45] text-[#6b6151]">{step.text}</span>
                  </div>
                </li>
              ))}
            </ol>

            <details className="group mt-[16px] rounded-[12px] [border:1px_solid_#e6d9bd] bg-[#fffdf8]">
              <summary className="flex items-center justify-between gap-[12px] py-[12px] px-[16px] cursor-pointer list-none text-[length:13px] font-semibold uppercase tracking-[0.14em] text-[#9a7530] [&::-webkit-details-marker]:hidden">
                More ways to earn
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="[transition:transform_240ms_ease] group-open:rotate-180">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <ul className="grid gap-[6px] list-none m-0 pt-0 px-[16px] pb-[14px]">
                {MORE_WAYS_TO_EARN.map((item) => (
                  <li key={item} className="grid grid-cols-[12px_1fr] gap-[8px] items-baseline text-[length:14px] leading-[1.5] text-[#514a40]">
                    <span aria-hidden="true" className="text-[#c99b13]">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>

        {/* Eligibility disclaimer */}
        <p className="mt-[16px] mb-0 text-[length:12px] leading-[1.6] text-[#6f6757]">
          {copy.disclaimer}{" "}
          <a href={REVA_TERMS_URL} target="_blank" rel="noopener noreferrer" className="text-[#9a7530] underline underline-offset-2">
            View REVA Rewards terms &amp; conditions
          </a>{" "}
          ·{" "}
          <a href={REVA_SITE_URL} target="_blank" rel="noopener noreferrer" className="text-[#9a7530] underline underline-offset-2">
            Learn about REVA Rewards
          </a>
        </p>
        <p className="mt-[6px] mb-0 text-[length:12px] leading-[1.6] text-[#6f6757]">
          <strong className="font-semibold text-[#514a40]">Product safety:</strong> {copy.safety}
        </p>
      </div>
    </section>
  );
}
