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
        className="bg-[#f7f5f0] px-[28px] pb-[112px] pt-[68px] max-[720px]:px-[12px] max-[720px]:pb-[64px] max-[720px]:pt-[46px]"
        aria-labelledby="before-after-title"
      >
        <div className="mx-auto w-[min(1480px,100%)]">
          <div className="mx-auto mb-[42px] max-w-[880px] text-center max-[720px]:mb-[28px]">
            <p className="mb-[13px] text-[12px] font-bold uppercase tracking-[0.28em] text-[#9d7000]">
              Real Harmony results
            </p>
            <h2
              id="before-after-title"
              className="m-0 text-[length:clamp(34px,3.6vw,54px)] font-light leading-[1.08] tracking-[-0.025em] text-[#152131]"
            >
              Before &amp; After Gallery
            </h2>
            <p className="mx-auto mb-0 mt-[20px] max-w-[720px] text-[16px] leading-[1.75] text-[#5e6268]">
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