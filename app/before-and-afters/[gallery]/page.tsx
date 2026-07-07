import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { beforeAfterGalleries } from "../../data/beforeAfterGalleries";
import AboutDropdown from "../../ui/AboutDropdown";
import PatientCenterDropdown from "../../ui/PatientCenterDropdown";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

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
      <header className="contact-page-header">
        <nav className="nav-left" aria-label="Primary left">
          <Link href="/">home</Link>
          <AboutDropdown />
          <Link href="/services">services</Link>
        </nav>
        <Link className="brand" href="/" aria-label="Harmony Med Spa home">
          <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
        </Link>
        <nav className="nav-right" aria-label="Primary right">
          <Link href="/shop">shop</Link>
          <PatientCenterDropdown />
          <Link href="/contact-us">contact us</Link>
        </nav>
      </header>

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

      <footer className="footer before-after-footer">
        <div className="footer-inner">
          <div className="awards">
            <div className="award-circle">2024<br /><strong>BNS</strong><span>Best in Business</span></div>
            <div className="bbb">BBB Accredited Business</div>
          </div>
          <div className="footer-contact">
            <p>
              <MapPin size={18} />
              <a className="footer-address" href={googleMapsLocationUrl} target="_blank" rel="noreferrer">
                2184 Gulf Gate Dr.<br />Sarasota, FL 34231
              </a>
            </p>
            <p><Phone size={18} />Phone:<br />(941) 923-8990</p>
            <p><Building2 size={18} />Fax:<br />(941) 923-9024</p>
          </div>
          <div className="hours">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <p key={day}><span>{day}</span><strong>9:00am to 5:00pm</strong></p>
            ))}
            <p><span>Saturday</span><strong>Closed</strong></p>
            <p><span>Sunday</span><strong>Closed</strong></p>
          </div>
          <div className="social">
            <p>Follow Us On</p>
            <div>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Google"><Mail size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Book"><CalendarDays size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
