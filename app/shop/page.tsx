import Image from "next/image";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const shopItems = [
  {
    title: "Skinbetter Science",
    image: "/images/shop/shop_skinbetter.jpg",
    href: "https://www.skinbetter.com/?businessPartner_id=0000249391&replika_param=eyJtZXJjaGlkIjoiZjM2MzI1ZDU3MDAxYWI2ZTI4ZWNjZTMxNTY1MmY3OWQiLCJ1c2VyaWQiOiIyNTAwNCIsImJvYXJkaWQiOiIyMTk0NjEwIiwidHJhY2tpZCI6IjczMTQwMyIsImlzc2hvcHVybCI6InRydWUifQ%3d%3d#PageName=harmonymedspafl"
  },
  {
    title: "Nutraceuticals",
    image: "/images/shop/shop_nutraceuticals.jpg",
    href: "https://onboarding.evexias.com/welcome/0090b3c0-17d6-4c75-919b-77f8958cf1ed/patient"
  },
  {
    title: "Revision Skincare",
    image: "/images/shop/shop_revision_skincare_thumbnail.jpg",
    href: "https://revisionskincare.com/?scpid=184249"
  }
];

export default function ShopPage() {
  return (
    <main className="shop-page">
      <SiteHeader className="team-header" />

      <section className="shop-hero">
        <h1>shop</h1>
      </section>

      <section className="shop-content" aria-labelledby="shop-intro">
        <p id="shop-intro">Explore Our Range of Skincare and Supplements - Elevate Your Beauty and Wellness Routine Today!</p>

        <div className="shop-card-grid">
          {shopItems.map((item) => (
            <a className="shop-card" href={item.href} key={item.title} target="_blank" rel="noreferrer">
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 720px) 82vw, 244px" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter address="linked-name" copyright="plain" />
    </main>
  );
}
