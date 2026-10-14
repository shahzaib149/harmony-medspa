import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import TypewriterText from "@/components/ui/TypewriterText";
import RouteSchema from "@/components/seo/RouteSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import PriceList from "@/components/pricing/PriceList";
import IvTherapyMenu from "@/components/pricing/IvTherapyMenu";
import MenuImages, { availableMenuImages } from "@/components/pricing/MenuImages";
import { openGraphFor } from "@/lib/seo/metadata";
import { buildPriceCatalogSchema } from "@/lib/schema";
import { ONLINE_BOOKING_URL } from "@/lib/constants";
import {
  PRICING_CATEGORIES,
  PRICING_GENERAL_DISCLAIMER,
  PRICE_MENU_IMAGES,
  IV_MENU_IMAGE,
} from "@/lib/data/pricing";

export const metadata: Metadata = {
  title: "Med Spa Pricing in Sarasota, FL",
  description:
    "Explore Harmony Med Spa pricing in Sarasota, FL: injectables, medical weight loss, hormone therapy, RF microneedling, CO2 laser, facials, IV therapy, and memberships. View treatment costs and book online.",
  alternates: { canonical: "/pricing" },
  openGraph: openGraphFor("/pricing"),
};

const navItems = [
  ...PRICING_CATEGORIES.map((category) => ({ id: category.id, title: category.title })),
  { id: "iv-therapy", title: "Clinical IV Therapy" },
];

function PrimaryCtas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-[14px] ${className}`}>
      <Link
        href="/contact-us"
        className="inline-flex justify-center items-center py-[14px] px-[24px] rounded-full bg-[var(--gold)] text-[#16130f] text-[length:15px] font-semibold no-underline [transition:background_200ms_ease] hover:bg-[#e4bd6c]"
      >
        Request Personalized Pricing
      </Link>
      <a
        href={ONLINE_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex justify-center items-center py-[14px] px-[24px] rounded-full bg-[#16130f] text-[#f6efe1] text-[length:15px] font-semibold no-underline [transition:transform_200ms_ease] hover:-translate-y-[1px]"
      >
        Book Online
      </a>
    </div>
  );
}

export default function PricingPage() {
  const menuImages = availableMenuImages(PRICE_MENU_IMAGES);
  return (
    <main className="pricing-page min-h-[100vh] bg-[#fff] text-[#4b5663]">
      <RouteSchema path="/pricing" />
      <JsonLd data={buildPriceCatalogSchema()} />
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

      <section className="service-detail-hero grid [place-items:center] min-h-[320px] [background:linear-gradient(rgba(0,0,0,0.62),rgba(0,0,0,0.62)),radial-gradient(circle_at_28%_32%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_72%_46%,rgba(255,255,255,0.07),transparent_26%),repeating-linear-gradient(18deg,rgba(255,255,255,0.022)_0_2px,transparent_2px_8px),linear-gradient(135deg,#292929,#111_54%,#262626)] [&_h1]:m-0 [&_h1]:text-[var(--gold)] [&_h1]:text-[length:clamp(44px,4vw,60px)] [&_h1]:leading-[1.05] [&_h1]:font-thin max-[720px]:min-h-[230px] max-[720px]:px-[20px] max-[720px]:text-center">
        <h1><TypewriterText text="pricing" letterDelay={120} caret ignoreReducedMotion /></h1>
      </section>

      {/* Intro */}
      <section className="w-[min(100%_-_48px,1180px)] my-0 mx-auto pt-[76px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:pt-[52px]">
        <h2 className="mt-0 mb-[22px] text-[#16130f] text-[length:clamp(28px,3.2vw,40px)] leading-[1.08] font-thin">
          Harmony Med Spa Pricing in Sarasota, FL
        </h2>
        <div className="max-w-[860px] text-[length:19px] leading-[1.6] text-[#4f5966] max-[720px]:text-[length:16px]">
          <p className="mt-0 mb-[18px]">
            At Harmony Med Spa, we believe in making high-quality aesthetic and wellness treatments
            accessible, transparent, and personalized.
          </p>
          <p className="mt-0 mb-[18px]">
            Explore our pricing for injectable treatments, medical weight loss, hormone
            optimization, advanced skin resurfacing, IV therapy, facials, and memberships.
          </p>
          <p className="mt-0 mb-[18px]">
            Our Sarasota medical spa, located in Gulf Gate, offers a variety of treatments designed
            to help you look and feel your best, with individualized care based on your goals.
          </p>
          <p className="mt-0 mb-0">
            Browse our treatment prices below, request a personalized quote, or book your next
            appointment online.
          </p>
        </div>
        <PrimaryCtas className="mt-[30px]" />
      </section>

      {/* Category quick-nav */}
      <nav aria-label="Pricing categories" className="w-[min(100%_-_48px,1180px)] my-0 mx-auto mt-[44px] max-[720px]:w-[min(100%_-_32px,640px)]">
        <p className="m-0 mb-[14px] text-[length:12px] font-bold uppercase tracking-[0.18em] text-[#9a7530]">Jump to a category</p>
        <ul className="flex flex-wrap gap-[10px] list-none p-0 m-0">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="inline-flex py-[9px] px-[16px] rounded-full bg-[#f4ecdc] [border:1px_solid_#e6d9bd] text-[length:14px] text-[#5b513f] no-underline [transition:background_160ms_ease] hover:bg-[#ece0c7]"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Pricing categories */}
      <section className="w-[min(100%_-_48px,1180px)] my-0 mx-auto mt-[46px] grid grid-cols-2 gap-[26px] max-[900px]:grid-cols-1 max-[720px]:w-[min(100%_-_32px,640px)]">
        {PRICING_CATEGORIES.map((category) => (
          <article
            key={category.id}
            id={category.id}
            className="grid [align-content:start] p-[30px] rounded-[20px] bg-[#fbf7ef] [border:1px_solid_#ece0c8] shadow-[0_14px_40px_rgba(60,45,20,0.06)] max-[720px]:p-[22px]"
          >
            <h2 className="mt-0 mb-[8px] text-[#16130f] text-[length:23px] leading-[1.15] font-medium">{category.title}</h2>
            {category.blurb ? (
              <p className="mt-0 mb-[20px] text-[length:15px] leading-[1.5] text-[#6b6151]">{category.blurb}</p>
            ) : null}
            <PriceList items={category.items} />
            {category.footnote ? (
              <p className="mt-[16px] mb-0 text-[length:14px] leading-[1.5] text-[#6b6151] italic">{category.footnote}</p>
            ) : null}
            {category.serviceHref ? (
              <Link
                href={category.serviceHref}
                className="inline-flex items-center gap-[6px] mt-[18px] text-[length:15px] font-medium text-[#9a7530] no-underline hover:underline underline-offset-4"
              >
                {category.serviceLinkText ?? "Learn more"} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </article>
        ))}
      </section>

      {/* Printed menu graphics, shown once the clinic's approved files are in public/ */}
      {menuImages.length ? (
        <section aria-labelledby="price-menu-heading" className="w-[min(100%_-_48px,1180px)] my-0 mx-auto mt-[56px] max-[720px]:w-[min(100%_-_32px,640px)]">
          <h2 id="price-menu-heading" className="mt-0 mb-[20px] text-[#16130f] text-[length:clamp(24px,2.6vw,32px)] leading-[1.1] font-thin">
            Harmony Med Spa 2026 Price Menu
          </h2>
          <MenuImages images={menuImages} />
        </section>
      ) : null}

      {/* Clinical IV Therapy */}
      <section id="iv-therapy" className="w-[min(100%_-_48px,1180px)] my-0 mx-auto mt-[56px] max-[720px]:w-[min(100%_-_32px,640px)]">
        <div className="p-[34px] rounded-[22px] [background:linear-gradient(180deg,#f6efe2,#efe5d3)] [border:1px_solid_#e6d9bd] max-[720px]:p-[24px]">
          <h2 className="mt-0 mb-[8px] text-[#16130f] text-[length:clamp(24px,2.6vw,32px)] leading-[1.1] font-thin">
            Clinical IV Therapy Pricing in Sarasota, FL
          </h2>
          <p className="mt-0 mb-[26px] max-w-[820px] text-[length:17px] leading-[1.55] text-[#514a40]">
            Explore our selection of IV nutrient infusions designed to support individualized
            wellness goals. Each infusion is administered following a clinical assessment and an
            active provider order.
          </p>

          <IvTherapyMenu />
          <MenuImages images={[IV_MENU_IMAGE]} className="mt-[26px] max-w-[580px]" />
          <Link
            href="/iv-therapy"
            className="inline-flex items-center gap-[6px] mt-[16px] text-[length:15px] font-medium text-[#9a7530] no-underline hover:underline underline-offset-4"
          >
            Learn more about IV therapy in Sarasota <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-[min(100%_-_48px,1180px)] my-0 mx-auto mt-[56px] p-[40px] rounded-[24px] text-center text-[#f6efe1] [background:radial-gradient(circle_at_30%_20%,#2a2319,transparent_60%),linear-gradient(160deg,#1b1711,#0d0b08)] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:p-[28px]">
        <h2 className="mt-0 mb-[12px] text-[length:clamp(24px,3vw,34px)] leading-[1.1] font-thin">Ready to plan your treatment?</h2>
        <p className="mt-0 mb-[26px] max-w-[640px] mx-auto text-[length:16px] leading-[1.55] text-[#c9c0b0]">
          Request a personalized quote based on your goals, or book your appointment online with our
          Sarasota team.
        </p>
        <PrimaryCtas className="justify-center" />
      </section>

      {/* General disclaimer */}
      <section className="w-[min(100%_-_48px,1180px)] my-0 mx-auto mt-[36px] pb-[90px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:pb-[64px]">
        <p className="m-0 text-[length:13px] leading-[1.6] text-[#8a8071]">{PRICING_GENERAL_DISCLAIMER}</p>
      </section>

      <SiteFooter address="linked-name" copyright="plain" />
    </main>
  );
}
