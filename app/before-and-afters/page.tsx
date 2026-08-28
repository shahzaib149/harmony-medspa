import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import RxPhotoGalleryEmbed from "@/components/before-after/RxPhotoGalleryEmbed";

const canonicalUrl = "https://www.harmonymedspafl.com/before-and-afters";

export const metadata: Metadata = {
  title: "Before & After Gallery",
  description:
    "Explore live before-and-after treatment results from Harmony Med Spa in Sarasota, Florida.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Before & After Gallery | Harmony Med Spa",
    description:
      "Explore live before-and-after treatment results from Harmony Med Spa in Sarasota, Florida.",
    url: canonicalUrl,
    type: "website",
  },
};

export default function BeforeAndAftersPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader className="contact-page-header" />
      <h1 className="sr-only">Harmony Med Spa Before &amp; After Gallery</h1>
      <RxPhotoGalleryEmbed />
      <SiteFooter variant="before-after-footer" />
    </main>
  );
}