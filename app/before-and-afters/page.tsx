import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import HeroMedia from "@/components/layout/HeroMedia";
import SiteFooter from "@/components/layout/SiteFooter";
import BeforeAfterGallery from "@/components/before-after/BeforeAfterGallery";
import TypewriterText from "@/components/ui/TypewriterText";
import { ONLINE_BOOKING_URL, RXPHOTO_GALLERY_URL } from "@/lib/constants";
import { requestPricingHref } from "@/lib/data/pricing";
import { sharedOpenGraph } from "@/lib/seo/metadata";

const canonicalUrl = "https://www.harmonymedspafl.com/before-and-afters";

export const metadata: Metadata = {
  title: "Before & After Gallery",
  description:
    "Compare real before-and-after results from Harmony Med Spa in Sarasota, Florida: neuromodulators, dermal filler, RF microneedling, fractional CO2 and IPL.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    ...sharedOpenGraph,
    title: "Before & After Gallery | Harmony Med Spa",
    description:
      "Compare real before-and-after results from Harmony Med Spa in Sarasota, Florida: neuromodulators, dermal filler, RF microneedling, fractional CO2 and IPL.",
    url: canonicalUrl,
    type: "website",
  },
};

export default function BeforeAndAftersPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader className="contact-page-header" />

      <section className="testimonials-hero has-media grid [place-items:center] min-h-[341px] [background:linear-gradient(rgba(0,0,0,0.62),rgba(0,0,0,0.62)),linear-gradient(135deg,#252525,#101010_52%,#242424)] [&_h1]:m-0 [&_h1]:text-[var(--gold)] [&_h1]:text-[length:clamp(44px,3.5vw,58px)] [&_h1]:leading-[1] [&_h1]:font-thin max-[720px]:min-h-[230px]">
        <HeroMedia path="/before-and-afters" />
        <h1>
          <TypewriterText text="before & after" letterDelay={110} caret ignoreReducedMotion />
        </h1>
      </section>

      <section className="w-[min(100%_-_48px,1180px)] mx-auto pt-[72px] pb-[96px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:pt-[48px] max-[720px]:pb-[72px]">
        <header className="max-w-[760px] mb-[34px]">
          <p className="m-0 mb-[12px] text-[length:12px] font-bold uppercase tracking-[0.18em] text-[#9a7530]">Real results</p>
          <h2 className="m-0 mb-[14px] text-[#16130f] text-[length:clamp(30px,3.2vw,42px)] leading-[1.08] font-thin">
            See what treatment at Harmony looks like
          </h2>
          <p className="m-0 text-[length:17px] leading-[1.6] text-[#514a40]">
            Every photo pair below comes from Harmony Med Spa&apos;s own patient gallery. Pick a treatment, then drag the gold handle to compare
            before and after.
          </p>
        </header>

        <BeforeAfterGallery />

        <div className="mt-[56px] grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[24px] p-[30px] rounded-[20px] [background:linear-gradient(135deg,#17140f,#2a2318)] text-[#f6efe1] max-[820px]:grid-cols-1">
          <div>
            <h2 className="m-0 mb-[8px] text-[length:26px] leading-[1.15] font-light text-[#f2d58a]">Picture your own results</h2>
            <p className="m-0 text-[length:15px] leading-[1.6] text-[rgba(246,239,225,0.78)]">
              Individual results vary. A consultation is the best way to see which treatment fits your goals.
            </p>
          </div>
          <div className="flex flex-wrap gap-[12px]">
            <a
              href={ONLINE_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center min-h-[50px] py-[13px] px-[26px] rounded-full bg-[var(--gold)] text-[#16130f] text-[length:15px] font-semibold no-underline [transition:background_200ms_ease,transform_200ms_ease] hover:bg-[#e4bd6c] hover:-translate-y-[1px] max-[560px]:w-full"
            >
              Book Online
            </a>
            <Link
              href={requestPricingHref()}
              className="inline-flex justify-center items-center min-h-[50px] py-[13px] px-[26px] rounded-full [border:1px_solid_rgba(242,213,138,0.6)] text-[#f6efe1] text-[length:15px] font-semibold no-underline [transition:background_200ms_ease,transform_200ms_ease] hover:bg-[rgba(242,213,138,0.12)] hover:-translate-y-[1px] max-[560px]:w-full"
            >
              Request a Consultation
            </Link>
          </div>
        </div>

        <p className="mt-[22px] mb-0 text-[length:14px] text-[#7a705f]">
          Looking for a specific photo?{" "}
          <a className="text-[#9a7530] underline underline-offset-[3px]" href={RXPHOTO_GALLERY_URL} target="_blank" rel="noopener noreferrer">
            Open the full live gallery
          </a>
          .
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
