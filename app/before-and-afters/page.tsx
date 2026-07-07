import Image from "next/image";
import Link from "next/link";
import { beforeAfterGalleries } from "@/lib/data/beforeAfterGalleries";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

export default function BeforeAndAftersPage() {
  return (
    <main className="before-after-page">
      <SiteHeader className="contact-page-header" />

      <section className="before-after-hero">
        <h1>gallery</h1>
      </section>

      <section className="before-after-content" aria-labelledby="before-after-title">
        <div className="before-after-scroll">
          <h2 id="before-after-title">BEFORE &amp; AFTER GALLERY</h2>
          <div className="before-after-grid">
            {beforeAfterGalleries.map((item) => (
              <article className="before-after-card" key={item.title}>
                <Link href={`/before-and-afters/${item.slug}`} aria-label={`Open ${item.title} before and after preview gallery`}>
                  <Image src={item.coverImage} alt={item.title} width={560} height={265} />
                </Link>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
          <div className="before-after-logo">
            <Image src="/images/before-and-afters/rxphoto-logo.png" alt="RxPhoto by PatientNow" width={190} height={82} />
          </div>
        </div>
      </section>

      <SiteFooter variant="before-after-footer" />
    </main>
  );
}
