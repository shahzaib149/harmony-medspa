export const metadata = {
  title: "Med Spa Memberships in Sarasota, FL",
  description:
    "Facial, Glo2Facial, and VIP Beauty Bank memberships at Harmony Med Spa in Sarasota, FL. Compare monthly, six-month, and annual pricing and member benefits.",
  alternates: { canonical: "/membership" },
  openGraph: openGraphFor("/membership"),
};

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import MembershipForm from "@/components/forms/MembershipForm";
import SiteHeader from "@/components/layout/SiteHeader";
import HeroMedia from "@/components/layout/HeroMedia";
import SiteFooter from "@/components/layout/SiteFooter";
import TypewriterText from "@/components/ui/TypewriterText";
import { ONLINE_BOOKING_URL } from "@/lib/constants";
import { openGraphFor } from "@/lib/seo/metadata";
import { priceOf, requestPricingHref } from "@/lib/data/pricing";

// Membership prices come from lib/data/pricing.ts so this page and /pricing never disagree.
const amount = (price: string) => Number(price.replace(/[^0-9.]/g, ""));
const savings = (monthly: string, months: number, total: string) =>
  `Save $${(amount(monthly) * months - amount(total)).toLocaleString("en-US")}`;
const monthlyBank = (tier: string) => priceOf("vip-beauty-bank-memberships", tier).split(" ")[0];

function plans(categoryId: string) {
  const monthly = priceOf(categoryId, "Monthly");
  const semiAnnual = priceOf(categoryId, "6 Months");
  const annual = priceOf(categoryId, "12 Months");
  return [
    { term: "Monthly", price: monthly, note: "Billed monthly" },
    { term: "6 Months", price: semiAnnual, note: savings(monthly, 6, semiAnnual) },
    { term: "12 Months", price: annual, note: savings(monthly, 12, annual) },
  ];
}

const facialMemberships = [
  {
    name: "Facial Membership",
    summary: "Your Signature Facial every month, with an enhancement each visit.",
    benefits: ["1 monthly facial (60 minutes)", "1 enhancement with every facial", "$10/unit tox while a member", "10% off skincare while a member"],
    plans: plans("facial-memberships"),
  },
  {
    name: "Glo2Facial Membership",
    summary: "The advanced Glo2Facial every month, finished with lymphatic massage.",
    benefits: ["1 monthly Glo2Facial (45 minutes)", "Red-light lymphatic massage", "$10/unit tox while a member", "10% off skincare while a member"],
    plans: plans("glo2facial-memberships"),
  },
];

const vipMemberships = [
  {
    name: "VIP",
    title: "VIP Membership",
    bank: monthlyBank("VIP Membership"),
    benefits: ["+1 free vitamin shot every month"],
    discounts: { injectables: "10%", skincare: "10%", devices: "10%" },
    finish: "pearl",
  },
  {
    name: "VIP Elite",
    title: "VIP Elite Membership",
    bank: monthlyBank("VIP Elite Membership"),
    benefits: ["+1 free vitamin shot every month", "1 free device or laser treatment per year"],
    discounts: { injectables: "10%", skincare: "10%", devices: "15%" },
    finish: "gold",
  },
  {
    // Benefits as described on the homepage VIP Ultimate card; awaiting the clinic's full write-up.
    name: "VIP Ultimate",
    title: "VIP Ultimate Membership",
    bank: monthlyBank("VIP Ultimate Membership"),
    benefits: ["All VIP Elite benefits", "+1 IV and +1 nutraceutical every month", "10% off nutraceuticals", "Quarterly Spectra Scan"],
    discounts: { injectables: "10%", skincare: "10%", devices: "15%" },
    finish: "black",
  },
] as const;

const discountLabels = [
  ["injectables", "Injectables & facials"],
  ["skincare", "Medical-grade skincare"],
  ["devices", "Device & laser treatments"],
] as const;

// The membership card face: the one graphic flourish on the page.
const cardFaces = {
  pearl: "[background:linear-gradient(135deg,#fffdf8_0%,#efe6d4_48%,#fbf6ec_100%)] text-[#2b241a] [border:1px_solid_#e6d9bd]",
  gold: "[background:linear-gradient(135deg,#f3dc9c_0%,#c99b13_46%,#e9c873_72%,#b98a10_100%)] text-[#1b1508]",
  black: "[background:radial-gradient(circle_at_85%_15%,rgba(228,189,108,0.32),transparent_45%),linear-gradient(135deg,#2a2722_0%,#0d0c0a_60%,#1c1a16_100%)] text-[#f3e3b8] [border:1px_solid_rgba(228,189,108,0.45)]",
} as const;

const primaryButton =
  "inline-flex min-h-[48px] items-center justify-center gap-[8px] rounded-full bg-[var(--gold)] px-[24px] text-[length:15px] font-semibold text-[#16130f] [transition:background_200ms_ease,transform_200ms_ease] hover:-translate-y-[1px] hover:bg-[#e4bd6c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16130f]";
const secondaryButton =
  "inline-flex min-h-[48px] items-center justify-center gap-[8px] rounded-full [border:1px_solid_#cdb98f] bg-[#fff] px-[24px] text-[length:15px] font-semibold text-[#16130f] [transition:background_200ms_ease,transform_200ms_ease] hover:-translate-y-[1px] hover:bg-[#f4ecdc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16130f]";

function CheckList({ items, tone = "light" }: { items: readonly string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="m-0 grid list-none gap-[10px] p-0">
      {items.map((item) => (
        <li key={item} className={`grid grid-cols-[20px_1fr] items-start gap-[10px] text-[length:15px] leading-[1.5] ${tone === "dark" ? "text-[#e9e2d3]" : "text-[#433d34]"}`}>
          <Check size={18} strokeWidth={2.2} className="mt-[2px] text-[var(--gold)]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MembershipPage() {
  return (
    <main className="membership-page min-h-[100vh] bg-[#fff] text-[#2c2620]">
      <SiteHeader className="contact-page-header" />

      <section className="membership-hero has-media grid [place-items:center] min-h-[272px] [background:linear-gradient(rgba(0,0,0,0.66),rgba(0,0,0,0.66)),radial-gradient(circle_at_22%_38%,rgba(255,255,255,0.09),transparent_15%),radial-gradient(circle_at_58%_30%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_78%_70%,rgba(255,255,255,0.06),transparent_18%),repeating-linear-gradient(26deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_9px),linear-gradient(135deg,#262626,#101010_52%,#242424)] [&_h1]:m-0 [&_h1]:text-[#d49d19] [&_h1]:text-[length:clamp(40px,3vw,52px)] [&_h1]:leading-[1] [&_h1]:font-thin max-[720px]:min-h-[210px]">
        <HeroMedia path="/membership" />
        <h1><TypewriterText text="membership" letterDelay={110} caret ignoreReducedMotion /></h1>
      </section>

      {/* Intro */}
      <section className="mx-auto w-[min(100%_-_48px,1180px)] pt-[80px] text-center max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:pt-[56px]">
        <p className="m-0 text-[length:12px] font-bold uppercase tracking-[0.2em] text-[#9a7530]">Harmony memberships</p>
        <h2 className="mx-auto mb-[16px] mt-[14px] max-w-[760px] text-[length:clamp(30px,3.4vw,44px)] font-thin leading-[1.1] text-[#16130f]">
          Year-round care, planned and rewarded
        </h2>
        <p className="mx-auto mb-[30px] mt-0 max-w-[660px] text-[length:17px] leading-[1.6] text-[#5b5348]">
          Choose a monthly facial membership, or a VIP Beauty Bank membership that sets aside value for any service or product at our
          Sarasota med spa.
        </p>
        <nav aria-label="Membership types" className="flex flex-wrap justify-center gap-[10px]">
          {[
            ["#facial-memberships", "Facial memberships"],
            ["#vip-memberships", "VIP Beauty Bank memberships"],
            ["#request-membership", "Request a membership"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="inline-flex min-h-[44px] items-center rounded-full [border:1px_solid_#e6d9bd] bg-[#f8f2e6] px-[18px] text-[length:14px] text-[#5b513f] [transition:background_160ms_ease] hover:bg-[#ece0c7]">
              {label}
            </a>
          ))}
        </nav>
      </section>

      {/* Facial memberships */}
      <section id="facial-memberships" aria-labelledby="facial-memberships-heading" className="mx-auto w-[min(100%_-_48px,1180px)] pt-[84px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:pt-[60px]">
        <div className="mb-[30px] flex flex-wrap items-end justify-between gap-[16px]">
          <div>
            <h2 id="facial-memberships-heading" className="m-0 text-[length:clamp(28px,2.8vw,38px)] font-thin leading-[1.1] text-[#16130f]">Facial memberships</h2>
            <p className="mb-0 mt-[10px] text-[length:16px] leading-[1.55] text-[#5b5348]">Choose our Signature Facial or the advanced Glo2Facial, then pick how you pay.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[24px] max-[900px]:grid-cols-1">
          {facialMemberships.map((membership) => (
            <article key={membership.name} className="grid [align-content:start] gap-[24px] rounded-[22px] [border:1px_solid_#ece0c8] bg-[#fbf7ef] p-[32px] shadow-[0_18px_44px_rgba(60,45,20,0.07)] max-[720px]:p-[22px]">
              <div>
                <h3 className="m-0 text-[length:26px] font-light leading-[1.15] text-[#16130f]">{membership.name}</h3>
                <p className="mb-0 mt-[8px] text-[length:15px] leading-[1.5] text-[#6b6151]">{membership.summary}</p>
              </div>
              <CheckList items={membership.benefits} />
              <dl className="m-0 grid grid-cols-3 overflow-hidden rounded-[16px] [border:1px_solid_#e6d9bd] bg-[#fff] max-[340px]:grid-cols-1">
                {membership.plans.map((plan, index) => (
                  <div key={plan.term} className={`grid content-start gap-[4px] px-[10px] py-[18px] text-center ${index > 0 ? "[border-left:1px_solid_#efe6d3] max-[340px]:[border-left:0] max-[340px]:[border-top:1px_solid_#efe6d3]" : ""}`}>
                    <dt className="whitespace-nowrap text-[length:12px] font-bold uppercase tracking-[0.12em] text-[#9a7530] max-[480px]:text-[length:11px] max-[480px]:tracking-[0.06em]">{plan.term}</dt>
                    <dd className="m-0 text-[length:clamp(24px,2.2vw,30px)] font-light leading-[1.1] text-[#16130f]">{plan.price}</dd>
                    <dd className="m-0 text-[length:13px] text-[#7a705f]">{plan.note}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-[12px]">
                <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                  Book Online
                </a>
                <Link href={requestPricingHref("Memberships")} className={secondaryButton}>
                  Ask About This Membership
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VIP Beauty Bank memberships */}
      <section id="vip-memberships" aria-labelledby="vip-memberships-heading" className="mt-[96px] bg-[#f6f0e4] py-[84px] max-[720px]:mt-[64px] max-[720px]:py-[60px]">
        <div className="mx-auto w-[min(100%_-_48px,1180px)] max-[720px]:w-[min(100%_-_32px,640px)]">
          <div className="mb-[36px] grid grid-cols-[minmax(0,1fr)_minmax(0,440px)] items-end gap-[40px] max-[900px]:grid-cols-1 max-[900px]:gap-[18px]">
            <div>
              <h2 id="vip-memberships-heading" className="m-0 text-[length:clamp(28px,2.8vw,38px)] font-thin leading-[1.1] text-[#16130f]">VIP Beauty Bank memberships</h2>
              <p className="mb-0 mt-[10px] text-[length:16px] leading-[1.55] text-[#5b5348]">Member pricing all year, plus a monthly Beauty Bank deposit.</p>
            </div>
            <div className="rounded-[18px] bg-[#fff] p-[22px] [border:1px_solid_#e6d9bd]">
              <h3 className="m-0 text-[length:13px] font-bold uppercase tracking-[0.14em] text-[#9a7530]">What is a Beauty Bank?</h3>
              <p className="mb-0 mt-[8px] text-[length:15px] leading-[1.55] text-[#514a40]">
                A flexible savings account for your care: your monthly contribution builds up over time and can be used for any service or product.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[24px] max-[1050px]:grid-cols-2 max-[720px]:grid-cols-1">
            {vipMemberships.map((tier) => (
              <article key={tier.name} className="flex flex-col gap-[22px] rounded-[24px] bg-[#fff] p-[18px] pb-[26px] shadow-[0_18px_44px_rgba(60,45,20,0.08)] [border:1px_solid_#ece0c8]">
                <div className={`relative grid aspect-[1.586] content-between overflow-hidden rounded-[16px] p-[20px] shadow-[0_14px_30px_rgba(30,22,8,0.22)] ${cardFaces[tier.finish]}`}>
                  <div className="flex items-start justify-between gap-[12px]">
                    <span className="text-[length:11px] font-bold uppercase tracking-[0.24em] opacity-80">Harmony Med Spa</span>
                    <span aria-hidden="true" className="h-[26px] w-[34px] rounded-[5px] [background:linear-gradient(135deg,rgba(255,255,255,0.65),rgba(255,255,255,0.15))] [border:1px_solid_rgba(0,0,0,0.12)]" />
                  </div>
                  <div>
                    <h3 className="m-0 text-[length:28px] font-light leading-[1] tracking-[0.01em]">{tier.name}</h3>
                    <p className="mb-0 mt-[8px] text-[length:15px]">
                      <strong className="text-[length:22px] font-semibold">{tier.bank}</strong>
                      <span className="opacity-80">/month Beauty Bank</span>
                    </p>
                  </div>
                </div>

                <div className="px-[6px]">
                  <h4 className="m-0 mb-[12px] text-[length:12px] font-bold uppercase tracking-[0.14em] text-[#9a7530]">Member benefits</h4>
                  <CheckList items={tier.benefits} />
                </div>

                <dl className="m-0 mx-[6px] grid gap-0 rounded-[14px] bg-[#fbf7ef] px-[16px] py-[6px] [border:1px_solid_#efe6d3]">
                  {discountLabels.map(([key, label], index) => (
                    <div key={key} className={`flex items-baseline justify-between gap-[12px] py-[10px] ${index > 0 ? "[border-top:1px_solid_#efe6d3]" : ""}`}>
                      <dt className="text-[length:14px] text-[#5b5348]">{label}</dt>
                      <dd className="m-0 text-[length:16px] font-semibold text-[#16130f]">{tier.discounts[key]} off</dd>
                    </div>
                  ))}
                </dl>

                <a href="#request-membership" className={`${secondaryButton} mx-[6px] mt-auto`}>
                  Request {tier.name}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Request forms */}
      <section id="request-membership" aria-labelledby="request-membership-heading" className="mx-auto w-[min(100%_-_48px,1180px)] py-[90px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:py-[60px]">
        <div className="mb-[34px] flex flex-wrap items-end justify-between gap-[20px]">
          <div>
            <h2 id="request-membership-heading" className="m-0 text-[length:clamp(28px,2.8vw,38px)] font-thin leading-[1.1] text-[#16130f]">Start your membership</h2>
            <p className="mb-0 mt-[10px] max-w-[620px] text-[length:16px] leading-[1.55] text-[#5b5348]">
              Send a request and a staff member will reply within 24 hours, or book your first visit online.
            </p>
          </div>
          <div className="flex flex-wrap gap-[12px]">
            <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>
              Book Online
            </a>
            <Link href="/pricing#facial-memberships" className={secondaryButton}>
              Compare with our price list <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="membership-forms grid grid-cols-2 gap-[24px] max-[1050px]:grid-cols-1 [&_.membership-form-card]:min-h-0 [&_.membership-form-card]:rounded-[22px] [&_.membership-form-card]:[border:1px_solid_#ece0c8] [&_.membership-form-card]:bg-[#fbf7ef] [&_.membership-form-card]:px-[40px] [&_.membership-form-card]:py-[40px] max-[720px]:[&_.membership-form-card]:px-[22px] max-[720px]:[&_.membership-form-card]:py-[30px] [&_.membership-form-card_button]:mt-[24px] [&_.membership-form-card_button]:min-h-[48px] [&_.membership-form-card_button]:min-w-[180px] [&_.membership-form-card_button]:rounded-full [&_.membership-form-card_button]:border-0 [&_.membership-form-card_button]:bg-[var(--gold)] [&_.membership-form-card_button]:px-[28px] [&_.membership-form-card_button]:text-[length:15px] [&_.membership-form-card_button]:font-semibold [&_.membership-form-card_button]:text-[#16130f] [&_.membership-form-card_button:hover]:bg-[#e4bd6c]">
          <MembershipForm kind="membership" />
          <MembershipForm kind="pricing" />
        </div>
      </section>

      <SiteFooter variant="membership-footer" social="membership" />
    </main>
  );
}
