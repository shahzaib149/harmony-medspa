import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import TypewriterText from "@/components/ui/TypewriterText";
import RxPhotoGalleryEmbed from "@/components/before-after/RxPhotoGalleryEmbed";

export const metadata: Metadata = {
  title: "Before & After Gallery",
  description:
    "Explore before-and-after treatment results from Harmony Med Spa in Sarasota, Florida.",
  alternates: { canonical: "/before-and-afters" },
};

export default function BeforeAndAftersPage() {
  return (
    <main className="before-after-page min-h-[100vh] bg-[#fff] text-[#000]">
      <SiteHeader className="contact-page-header" />

      <section className="before-after-hero grid min-h-[306px] [place-items:center] [background:linear-gradient(rgba(0,0,0,0.66),rgba(0,0,0,0.66)),radial-gradient(circle_at_22%_38%,rgba(255,255,255,0.09),transparent_15%),radial-gradient(circle_at_58%_30%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_78%_70%,rgba(255,255,255,0.06),transparent_18%),repeating-linear-gradient(26deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_9px),linear-gradient(135deg,#262626,#101010_52%,#242424)] [&_h1]:m-0 [&_h1]:text-[length:clamp(42px,3.2vw,54px)] [&_h1]:font-thin [&_h1]:leading-[1] [&_h1]:text-[#d49d19] max-[720px]:min-h-[210px]">
        <h1>
          <TypewriterText
            text="gallery"
            letterDelay={110}
            caret
            ignoreReducedMotion
          />
        </h1>
      </section>

      <section
        className="px-[24px] pb-[124px] pt-[86px] max-[720px]:px-[12px] max-[720px]:pb-[70px] max-[720px]:pt-[52px]"
        aria-labelledby="before-after-title"
      >
        <div className="mx-auto w-[min(1320px,100%)]">
          <div className="mx-auto mb-[44px] max-w-[760px] text-center max-[720px]:mb-[30px]">
            <p className="mb-[14px] text-[12px] font-bold uppercase tracking-[0.24em] text-[#b17d00]">
              Real Harmony results
            </p>
            <h2
              id="before-after-title"
              className="m-0 text-[length:clamp(27px,3vw,42px)] font-light leading-[1.12] text-[#152131]"
            >
              Before &amp; After Gallery
            </h2>
            <p className="mx-auto mb-0 mt-[18px] max-w-[650px] text-[15px] leading-[1.75] text-[#5e6268]">
              Browse Harmony Med Spa&apos;s live treatment gallery. Results vary by
              patient, treatment plan, and individual response.
            </p>
          </div>

          <RxPhotoGalleryEmbed />
        </div>
      </section>

      <SiteFooter variant="before-after-footer" />
    </main>
  );
}