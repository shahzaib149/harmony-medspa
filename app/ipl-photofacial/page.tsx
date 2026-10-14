export const metadata = {
  title: "IPL Photofacial in Sarasota, FL",
  description:
    "IPL photofacial treatments for sun spots, redness and uneven tone at Harmony Med Spa in Sarasota's Gulf Gate area. Request personalized pricing or book online.",
  alternates: { canonical: "/ipl-photofacial" },
  openGraph: openGraphFor("/ipl-photofacial"),
};

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import HeroMedia from "@/components/layout/HeroMedia";
import SiteFooter from "@/components/layout/SiteFooter";
import ServicePricing from "@/components/pricing/ServicePricing";
import BeforeAfterStrip from "@/components/before-after/BeforeAfterStrip";
import TypewriterText from "@/components/ui/TypewriterText";
import RouteSchema from "@/components/seo/RouteSchema";
import { openGraphFor } from "@/lib/seo/metadata";

const concerns = [
  "Sun spots, age spots and freckling",
  "Facial redness and visible broken capillaries",
  "Small spider veins",
  "Uneven, blotchy skin tone",
  "Sun damage on the face, neck, chest and hands"
];

const faqs = [
  {
    question: "How many IPL sessions will I need?",
    answer:
      "Most patients see the best results from a series of treatments spaced a few weeks apart. Your provider will recommend a plan based on your skin and goals during your consultation.",
  },
  {
    question: "Is there downtime after an IPL photofacial?",
    answer:
      "Downtime is usually minimal. Treated areas can look pink for a short time, and dark spots often look darker for a week or so before they fade or flake away.",
  },
  {
    question: "Who is a good candidate for IPL?",
    answer:
      "IPL works best on lighter, untanned skin with pigment or redness concerns. Recent sun exposure, tanning and some medications can affect eligibility, so every treatment starts with a skin assessment.",
  },
];

export default function IplPhotofacialPage() {
  return (
    <main className="ipl-photofacial-page min-h-[100vh] bg-[#fff] text-[#000]">
      <RouteSchema path="/ipl-photofacial" faqs={faqs} />
      <SiteHeader className="team-header" />

      <section className="service-detail-hero has-media grid [place-items:center] min-h-[320px] [background:linear-gradient(rgba(0,0,0,0.64),rgba(0,0,0,0.64)),radial-gradient(circle_at_28%_32%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_72%_46%,rgba(255,255,255,0.07),transparent_26%),repeating-linear-gradient(18deg,rgba(255,255,255,0.022)_0_2px,transparent_2px_8px),linear-gradient(135deg,#292929,#111_54%,#262626)] [&_h1]:m-0 [&_h1]:text-[var(--gold)] [&_h1]:text-[length:clamp(40px,4vw,58px)] [&_h1]:leading-[1.05] [&_h1]:font-thin max-[720px]:min-h-[230px] max-[720px]:px-[20px] max-[720px]:text-center">
        <HeroMedia path="/ipl-photofacial" />
        <h1><TypewriterText text="ipl photofacial" letterDelay={110} caret ignoreReducedMotion /></h1>
      </section>

      <section className="grid grid-cols-[minmax(0,820px)_390px] gap-[78px] w-[min(100%_-_48px,1280px)] my-0 mx-auto pt-[92px] pb-[126px] px-0 max-[1050px]:grid-cols-[minmax(0,820px)] max-[1050px]:justify-center max-[1050px]:gap-[48px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:pt-[58px] max-[720px]:pb-[86px]">
        <article className="min-w-0 text-[length:20px] leading-[1.6] font-normal max-[720px]:text-[length:17px]">
          <h2 className="mt-0 mb-[22px] text-[#ebb35a] text-[length:29px] leading-[1.1] font-thin max-[720px]:text-[length:25px]"><TypewriterText text="IPL Photofacial At Harmony Med Spa In Sarasota, FL" startOnView /></h2>
          <p className="mt-0 mb-[48px] max-w-[840px]">
            Sun spots, redness and uneven tone can make skin look older and tired. An IPL photofacial uses gentle pulses of light to
            fade these concerns and leave your complexion clearer and more even, with little time away from your day. Treatments are
            performed at our Gulf Gate office in Sarasota after a skin assessment with our team.
          </p>

          <section className="mb-[48px]">
            <h2 className="mt-0 mb-[24px] text-[#ebb35a] text-[length:27px] leading-[1.12] font-thin max-[720px]:text-[length:24px]"><TypewriterText text="What Is IPL?" startOnView /></h2>
            <p className="m-0 max-w-[840px]">
              IPL (intense pulsed light) delivers broad-spectrum light into the skin. The light is absorbed by brown pigment and by the
              red of small blood vessels, which breaks them down so your body can clear them over the following weeks. Unlike a
              resurfacing laser, IPL works beneath an intact skin surface, so most people return to normal activities right away.
            </p>
          </section>

          <section className="mb-[48px]">
            <h2 className="mt-0 mb-[20px] text-[#ebb35a] text-[length:27px] leading-[1.12] font-thin max-[720px]:text-[length:24px]"><TypewriterText text="What IPL Can Treat" startOnView /></h2>
            <ul className="mt-0 mb-0 pl-[30px]">
              {concerns.map((concern) => (
                <li key={concern}>{concern}</li>
              ))}
            </ul>
          </section>

          <section className="mb-[48px]">
            <h2 className="mt-0 mb-[24px] text-[#ebb35a] text-[length:27px] leading-[1.12] font-thin max-[720px]:text-[length:24px]"><TypewriterText text="What To Expect" startOnView /></h2>
            <p className="mt-0 mb-[20px] max-w-[840px]">
              Each session usually takes about 20 to 30 minutes, depending on the area. Many patients describe the pulses as a quick snap,
              similar to a rubber band. Afterward, skin may look pink, and spots usually darken before they fade.
            </p>
            <p className="m-0 max-w-[840px]">
              Protecting your skin from the sun before and after treatment helps you get the best result. Results vary from person to
              person, and your provider will tell you how many sessions to plan for. For deeper texture concerns, ask about{" "}
              <Link className="text-[var(--gold)]" href="/fractional-co2-laser-treatments">fractional CO2 laser resurfacing</Link> or{" "}
              <Link className="text-[var(--gold)]" href="/rf-microneedling">RF microneedling</Link>.
            </p>
          </section>

          <section className="mb-[48px]">
            <h2 className="mt-0 mb-[24px] text-[#ebb35a] text-[length:27px] leading-[1.12] font-thin max-[720px]:text-[length:24px]"><TypewriterText text="IPL Photofacial FAQs" startOnView /></h2>
            {faqs.map((faq) => (
              <p className="mt-0 mb-[24px] max-w-[840px] last:mb-0" key={faq.question}>
                <strong>{faq.question}</strong> {faq.answer}
              </p>
            ))}
          </section>

          <section>
            <h2 className="mt-0 mb-[24px] text-[#ebb35a] text-[length:27px] leading-[1.12] font-thin max-[720px]:text-[length:24px]"><TypewriterText text="Book Your IPL Consultation" startOnView /></h2>
            <p className="m-0 max-w-[840px]">
              Ready for clearer, more even skin? Book online or request personalized pricing, and our team will help you plan your IPL
              treatments at Harmony Med Spa in Sarasota.
            </p>
          </section>
        </article>

        <aside className="service-side-sticky grid [align-content:start] gap-[35px] pt-[16px] [&_.about-side-card]:min-h-[269px] [&_.about-side-card]:rounded-[18px] [&_.about-side-card_span]:text-[length:30px] [&_.about-side-card_small]:text-[length:22px] max-[1050px]:grid-cols-[repeat(2,minmax(240px,390px))] max-[1050px]:justify-center max-[720px]:grid-cols-[1fr] max-[720px]:gap-[22px] max-[720px]:[&_.about-side-card]:min-h-[220px]" aria-label="IPL photofacial links">
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

      <BeforeAfterStrip category="photofacial-ipl-for-face" />

      <ServicePricing path="/ipl-photofacial" />

      <SiteFooter />
    </main>
  );
}
