import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { beforeAfterGalleries } from "@/lib/data/beforeAfterGalleries";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export function generateStaticParams() {
  return beforeAfterGalleries.map((gallery) => ({ gallery: gallery.slug }));
}

function getGalleryImages(slug: string) {
  const galleryPath = path.join(process.cwd(), "public", "images", "before-and-afters", "galleries", slug);

  if (!fs.existsSync(galleryPath)) {
    return [];
  }

  return fs
    .readdirSync(galleryPath)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      file,
      src: `/images/before-and-afters/galleries/${slug}/${encodeURIComponent(file)}`
    }));
}

export default async function BeforeAfterGalleryPreviewPage({
  params
}: {
  params: Promise<{ gallery: string }>;
}) {
  const { gallery: gallerySlug } = await params;
  const gallery = beforeAfterGalleries.find((item) => item.slug === gallerySlug);

  if (!gallery) {
    notFound();
  }

  const images = getGalleryImages(gallery.slug);

  return (
    <main className="before-after-page">
      <SiteHeader className="contact-page-header" />

      <section className="before-after-hero">
        <h1>gallery</h1>
      </section>

      <section className="before-after-preview-content" aria-labelledby="before-after-preview-title">
        <div className="before-after-preview-scroll">
          <h2 id="before-after-preview-title">{gallery.previewTitle}</h2>

          <div className="before-after-preview-grid">
            {images.map((image, index) => (
              <article className="before-after-preview-card" key={image.file}>
                <a href={image.src} target="_blank" rel="noreferrer" aria-label={`Open ${gallery.previewTitle} before and after image ${index + 1}`}>
                  <Image src={image.src} alt={`${gallery.previewTitle} before and after ${index + 1}`} width={520} height={390} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter variant="before-after-footer" />
    </main>
  );
}
