import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone, Search } from "lucide-react";
import AboutDropdown from "../../ui/AboutDropdown";
import PatientCenterDropdown from "../../ui/PatientCenterDropdown";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

const posts = [
  {
    title: "Unlock the Benefits of Thermal Treatments for Skin Rejuvenation",
    image: "/images/blogs/blog-2/1.jpg",
    excerpt:
      "In the world of modern aesthetics, advanced thermal treatments are transforming the way we care for our skin. We offer a curated selection of thermal-based skin rejuvenation procedures designed to restore youthful vitality, improve skin texture, and promote collagen production."
  },
  {
    title: "How Jeuveau® Fits Into Your Anti-Aging Skincare Routine",
    image: "/images/blogs/blog-2/2.jpg",
    excerpt:
      "When it comes to aging gracefully, a consistent skincare routine is only part of the equation. While high-quality products can improve skin tone and texture, they often fall short in addressing deeper expression lines caused by repetitive facial movements."
  },
  {
    title: "The Collagen Comeback: How Sculptra Rebuilds Your Skin from Within",
    image: "/images/blogs/blog-2/3.jpg",
    excerpt:
      "As the years pass, subtle changes in our skin begin to appear. Fine lines become more noticeable, cheeks lose volume, and the smooth texture we once had starts to diminish. At Harmony Med Spa, we provide a solution that addresses more than just the surface. Sculptra is a specialized injectable treatment designed to work deep within the skin, stimulating your body's natural collagen production."
  },
  {
    title: "Restore Confidence After Weight Loss: How Dermal Fillers Help Rebuild Volume",
    image: "/images/blogs/blog-2/4.jpg",
    excerpt:
      "Losing weight is an incredible achievement, one that reflects dedication and commitment to better health. However, for many people, dramatic weight loss can result in an unintended consequence such as volume loss in the face. Hollow cheeks, sagging skin, and a tired appearance are common post-weight-loss concerns that may affect your self-confidence."
  },
  {
    title: "Unlocking the Power of Nutraceuticals: Why HRT-Complete T & E Are Essential for Optimized BHRT",
    image: "/images/blogs/blog-2/5.jpg",
    excerpt:
      "Not all supplements are created equal, and not all hormone therapies deliver the same results. At Harmony Med Spa, we believe in using only the highest-quality, medically backed solutions to support your health. We offer HRT-Complete T & E, not as ordinary supplements, but as nutraceuticals."
  },
  {
    title: "The Power of Vitamins A, D, & K: Benefits of ADK-10 for Your Health",
    image: "/images/blogs/blog-2/6.jpg",
    excerpt:
      "At Harmony Med Spa, we know that health isn't just about looking good-it's about feeling your best from the inside out. We offer Evexias Nutraceuticals, a high-quality line of supplements designed to support optimal wellness. One of our most recommended supplements is ADK-10, a powerhouse blend of Vitamins A, D, and K."
  },
  {
    title: "Feel the Love This Valentine's Day: Reignite Your Passion with Hormone Replacement Therapy",
    image: "/images/blogs/blog-2/7.jpg",
    excerpt:
      "Valentine's Day is a time to celebrate love, connection, and intimacy. But if you've been feeling a lack of energy, reduced libido, or a shift in mood that's affecting your relationships, it might not just be stress or aging-it could be a hormonal imbalance."
  },
  {
    title: "Unlocking Radiant Skin: What is RF Micro-Needling and How It Transforms Your Complexion",
    image: "/images/blogs/blog-2/8.jpg",
    excerpt:
      "Are you looking for a way to revitalize your skin and restore a youthful, radiant glow? RF (Radiofrequency) Micro-Needling may be the answer. This innovative treatment combines the power of micro-needling and radiofrequency energy, creating a transformative skin rejuvenation method."
  },
  {
    title: "Breaking Down Barriers: Addressing Common Misconceptions About GLP-1 Medications",
    image: "/images/blogs/blog-2/9.jpg",
    excerpt:
      "Medical weight loss is transforming lives by providing safe and effective tools to support individuals in their weight management journey. Among these innovations, GLP-1 medications have garnered significant attention for their ability to help with weight loss and overall health improvement."
  },
  {
    title: "Get Radiant Skin This Holiday Season with Skinbetter's Best-Selling Products",
    image: "/images/blogs/blog-2/10.jpg",
    excerpt:
      "The holiday season is around the corner, and at Harmony Med Spa, we're here to help you shine brighter than ever! Whether it's prepping for festive gatherings, pampering yourself as the year ends, or finding the perfect gift set, now is the perfect time to invest in skin."
  }
];

export default function BlogPageTwo() {
  return (
    <main className="blog-page">
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
                  <a className="blog-read-more" href="#">
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>

          <nav className="blog-pagination" aria-label="Blog pages">
            <Link href="/blog" aria-label="Page 1">1</Link>
            <span aria-current="page">2</span>
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
            <Image src="/images/blogs/blog-2/img_1.png" alt="" fill sizes="390px" />
            <span>
              All
              <br />
              Services
            </span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card" href="/contact-us" target="_blank" rel="noopener noreferrer">
            <Image src="/images/blogs/blog-2/Img_2.png" alt="" fill sizes="390px" />
            <span>
              Keep
              <br />
              In Touch
            </span>
            <small>Contact Us</small>
          </Link>
        </aside>
      </section>

      <footer className="footer">
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
