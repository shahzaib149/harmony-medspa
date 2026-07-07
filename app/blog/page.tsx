import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const posts = [
  {
    title: "Who is a Good Candidate for Injectables?",
    image: "/images/blogs/blog-1/2.jpg",
    href: "/blog/summer-ready-glp-1-bhrt",
    excerpt:
      "Injectables have revolutionized the cosmetic industry, offering a minimally invasive way to enhance your appearance, smooth wrinkles, and rejuvenate the skin. Whether you're looking to add volume, reduce the appearance of fine lines, or prevent the onset of aging, injectables may be an ideal option for you."
  },
  {
    title: "What is Medical Weight Loss?",
    image: "/images/blogs/blog-1/4.jpg",
    excerpt:
      "Are you struggling to lose weight and keep it off despite your best efforts? You're not alone. Millions of people around the world face similar challenges when it comes to achieving sustainable weight loss. The good news is that there's a solution that can help you reach your goals - medical weight loss."
  },
  {
    title: "What Areas Can Be Treated with Dermal Fillers?",
    image: "/images/blogs/blog-1/9.jpg",
    excerpt:
      "Dermal fillers have become increasingly popular in the world of aesthetic treatments, offering a non-surgical solution to address a variety of concerns. These versatile injectables can help restore volume, smooth wrinkles, and enhance facial features, providing a natural-looking and rejuvenated appearance."
  },
  {
    title: "Who is a Good Candidate for RF Microneedling?",
    image: "/images/blogs/blog-1/3.jpg",
    excerpt:
      "RF (radiofrequency) microneedling is a revolutionary cosmetic treatment that combines the power of radiofrequency energy with the precision of microneedling. This innovative technique has gained popularity in recent years due to its ability to address a wide range of skin concerns, from fine lines and wrinkles to acne scars and uneven skin tone."
  },
  {
    title: "What Causes Collagen to Decrease?",
    image: "/images/blogs/blog-1/10.jpg",
    excerpt:
      "Collagen, a structural protein, plays a pivotal role in maintaining the integrity and youthful appearance of your skin. It forms an intricate network of fibers that provide strength, elasticity, and support to the skin's structure. However, as time passes, collagen levels naturally decline, leading to visible signs of aging."
  },
  {
    title: "Benefits of Regular Facials: How They Improve Skin Health and Appearance",
    image: "/images/blogs/blog-1/6.jpg",
    excerpt:
      "Facials are specialized skincare treatments that focus on cleansing, exfoliating, and nourishing the skin on your face. These treatments are designed to address various skin concerns, ranging from dullness and dehydration to acne and signs of aging. Facials can be customized to meet your individual needs."
  },
  {
    title: "Unlocking Radiant Skin: The Science Behind RF Microneedling",
    image: "/images/blogs/blog-1/7.jpg",
    excerpt:
      "Achieving radiant skin is a goal for many individuals seeking to enhance their appearance and boost their confidence. With the advancements in aesthetic technology, there are various treatments available to address common skin concerns. One such treatment that has gained popularity in recent years is RF Microneedling."
  },
  {
    title: "Understanding Semaglutide: How it Works to Aid Weight Loss",
    image: "/images/blogs/blog-1/5.jpg",
    excerpt:
      "Weight management is a complex and often frustrating journey for many. Amidst the myriad of solutions, medical weight loss has emerged as a promising avenue for those seeking sustainable results. Semaglutide has garnered significant attention due to its efficacy."
  }
];

export default function BlogPage() {
  return (
    <main className="blog-page">
      <SiteHeader className="contact-page-header" />

      <section className="blog-hero">
        <h1>blog list</h1>
      </section>

      <section className="blog-content">
        <div className="blog-main">
          <div className="blog-intro">
            <h2>Harmony Med Spa Blog</h2>
            <p>Learn more about med spa care in our blog!</p>
          </div>

          <div className="blog-post-list">
            {posts.map((post) => (
              <article className="blog-post" key={post.title}>
                <div className="blog-post-image">
                  <img src={post.image} alt="" />
                </div>
                <div className="blog-post-copy">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link className="blog-read-more" href={post.href ?? "#"}>
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <nav className="blog-pagination" aria-label="Blog pages">
            <span aria-current="page">1</span>
            <Link href="/blog/page-2" aria-label="Page 2">2</Link>
            <Link href="/blog/page-3" aria-label="Page 3">3</Link>
          </nav>
        </div>

        <aside className="blog-sidebar" aria-label="Blog links">
          <label className="about-search">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={18} />
          </label>

          <Link className="about-side-card" href="/services" target="_blank" rel="noopener noreferrer">
            <Image src="/images/blogs/blog-1/img_1.png" alt="" fill sizes="390px" />
            <span>
              All
              <br />
              Services
            </span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card" href="/contact-us" target="_blank" rel="noopener noreferrer">
            <Image src="/images/blogs/blog-1/Img_2.png" alt="" fill sizes="390px" />
            <span>
              Keep
              <br />
              In Touch
            </span>
            <small>Contact Us</small>
          </Link>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
