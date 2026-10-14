export const metadata = {
  title: "IV Therapy in Sarasota, FL",
  description:
    "Clinical IV vitamin infusions at Harmony Med Spa in Sarasota, FL: Immunity IV $147.90, Athlete's Edge IV $168.30, and Radiance IV $188.70. View ingredients and book online.",
  alternates: { canonical: "/iv-therapy" },
  openGraph: openGraphFor("/iv-therapy"),
};

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import HeroMedia from "@/components/layout/HeroMedia";
import SiteFooter from "@/components/layout/SiteFooter";
import faqData from "@/Images/Services/IV therapy/iv_therapy_faqs.json";
import IvFaqAccordion from "./IvFaqAccordion";
import TypewriterText from "@/components/ui/TypewriterText";
import RouteSchema from "@/components/seo/RouteSchema";
import IvTherapyMenu from "@/components/pricing/IvTherapyMenu";
import MenuImages from "@/components/pricing/MenuImages";
import ServicePricing from "@/components/pricing/ServicePricing";
import { openGraphFor } from "@/lib/seo/metadata";
import { IV_INFUSIONS, IV_MENU_IMAGE } from "@/lib/data/pricing";

export default function IvTherapyPage() {
  return (
    <main className="iv-therapy-page min-h-[100vh] bg-[#fff] text-[#000]">
      <RouteSchema path="/iv-therapy" prices={IV_INFUSIONS.map(({ name, price }) => ({ name, price }))} />
      <SiteHeader className="team-header" servicesHref="/#services" contactHref="/#contact" />

      <section className="service-detail-hero has-media grid [place-items:center] min-h-[320px] [background:linear-gradient(rgba(0,0,0,0.64),rgba(0,0,0,0.64)),radial-gradient(circle_at_28%_32%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_72%_46%,rgba(255,255,255,0.07),transparent_26%),repeating-linear-gradient(18deg,rgba(255,255,255,0.022)_0_2px,transparent_2px_8px),linear-gradient(135deg,#292929,#111_54%,#262626)] [&_h1]:m-0 [&_h1]:text-[var(--gold)] [&_h1]:text-[length:clamp(42px,4vw,58px)] [&_h1]:leading-[1.05] [&_h1]:font-thin max-[720px]:min-h-[230px] max-[720px]:px-[20px] max-[720px]:text-center">
        <HeroMedia path="/iv-therapy" />
        <h1><TypewriterText text="iv therapy" letterDelay={110} caret ignoreReducedMotion /></h1>
      </section>

      <section className="grid grid-cols-[minmax(0,820px)_390px] gap-[78px] w-[min(100%_-_48px,1280px)] my-0 mx-auto pt-[92px] pb-[126px] px-0 max-[1050px]:grid-cols-[minmax(0,820px)] max-[1050px]:justify-center max-[1050px]:gap-[48px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:pt-[58px] max-[720px]:pb-[86px]">
        <article className="min-w-0 text-[length:20px] leading-[1.45] font-normal max-[720px]:text-[length:17px]">
          <h2 className="mt-0 mb-[14px] text-[#ebb35a] text-[length:29px] leading-[1.1] font-bold max-[720px]:text-[length:25px]">IV Therapy Pricing in Sarasota, FL</h2>
          <h3 className="mt-0 mb-[10px] text-[length:21px] leading-[1.3] font-bold">Clinical IV Therapy at Harmony Med Spa</h3>
          <p className="mt-0 mb-[30px] max-w-[850px]">
            Explore our selection of IV nutrient infusions designed to support individualized wellness goals. Each infusion is
            administered following a clinical assessment and an active provider order at our Gulf Gate office in Sarasota.
          </p>

          <div className="mb-[44px]">
            <IvTherapyMenu columns={1} />
            <MenuImages images={[IV_MENU_IMAGE]} className="mt-[28px] max-w-[580px]" />
            <Link href="/pricing#iv-therapy" className="inline-flex mt-[18px] text-[length:17px] text-[#9a7530] underline underline-offset-4">
              Compare IV therapy prices with our full treatment price list
            </Link>
          </div>

          <IvFaqAccordion categories={faqData.faq_categories} />
        </article>

        <aside className="service-side-sticky grid [align-content:start] gap-[35px] pt-[16px] [&_.about-side-card]:min-h-[269px] [&_.about-side-card]:rounded-[18px] [&_.about-side-card_span]:text-[length:30px] [&_.about-side-card_small]:text-[length:22px] max-[1050px]:grid-cols-[repeat(2,minmax(240px,390px))] max-[1050px]:justify-center max-[720px]:grid-cols-[1fr] max-[720px]:gap-[22px] max-[720px]:[&_.about-side-card]:min-h-[220px]" aria-label="IV therapy links">
          <label className="about-search flex items-center h-[70px] mb-0 py-0 pr-[24px] pl-[30px] [border:1px_solid_#c8d2dd] rounded-[8px] text-[var(--gold)] bg-[#fff] [&_input]:min-w-[0] [&_input]:flex-1 [&_input]:border-0 [&_input]:[outline:0] [&_input]:text-[#344356] [&_input]:bg-[transparent] [&_input]:[font:inherit] [&_input::placeholder]:text-[#425263] [&_input::placeholder]:opacity-[0.9] max-[1050px]:col-[1_/_-1]">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={22} />
          </label>

          <Link className="about-side-card relative grid [place-items:center] overflow-hidden text-[#fff] text-center isolate before:content-[''] before:absolute before:inset-0 before:z-[-1] before:[background:rgba(0,0,0,0.36)] [&_img]:z-[-2] [&_img]:object-cover [&_img]:[transition:transform_420ms_ease] [&_span]:text-[length:25px] [&_span]:leading-[1.1] [&_span]:font-normal [&_small]:inline-flex [&_small]:min-w-[146px] [&_small]:justify-center [&_small]:mt-[10px] [&_small]:py-[12px] [&_small]:px-[18px] [&_small]:[border-top:1px_solid_var(--gold)] [&_small]:[border-bottom:1px_solid_var(--gold)] [&_small]:text-[length:16px]" href="/services">
            <Image src="/images/about-us/img_1.png" alt="" fill sizes="390px" />
            <span>All<br />Services</span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card relative grid [place-items:center] overflow-hidden text-[#fff] text-center isolate before:content-[''] before:absolute before:inset-0 before:z-[-1] before:[background:rgba(0,0,0,0.36)] [&_img]:z-[-2] [&_img]:object-cover [&_img]:[transition:transform_420ms_ease] [&_span]:text-[length:25px] [&_span]:leading-[1.1] [&_span]:font-normal [&_small]:inline-flex [&_small]:min-w-[146px] [&_small]:justify-center [&_small]:mt-[10px] [&_small]:py-[12px] [&_small]:px-[18px] [&_small]:[border-top:1px_solid_var(--gold)] [&_small]:[border-bottom:1px_solid_var(--gold)] [&_small]:text-[length:16px]" href="/contact-us">
            <Image src="/images/about-us/Img_2.png" alt="" fill sizes="390px" />
            <span>Keep<br />In Touch</span>
            <small>Contact Us</small>
          </Link>
        </aside>
      </section>

      <ServicePricing path="/iv-therapy" heading="Book IV Therapy in Sarasota" intro="Ready for your next infusion? Book online, see IV therapy alongside every Harmony Med Spa treatment price, or ask for pricing on a personalized plan." />

      <SiteFooter address="linked-name" copyright="plain" />
    </main>
  );
}
