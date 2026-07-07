import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const testimonials = [
  {
    quote:
      "I've been to a few Med Spas in Sarasota, and Jessica is absolutely the best. She truly cares about providing exceptional service and I am thrilled to have finally found a practitioner I can trust. Her staff is fantastic and I couldn't be happier with my decision.",
    author: "Ariel F."
  },
  {
    quote:
      "I was so pleased with my visit to Harmony Med Spa. Jessica and Haydon could not be more welcoming and professional. I felt an immediate rapport with Jessica. She is very knowledgeable and able to ask probing questions that helped me focus on the results I want to achieve. I highly recommend Harmony Med Spa.",
    author: "Leigh W."
  },
  {
    quote:
      "I absolutely love Harmony Med Spa! The staff is friendly, kind, professional and attentive. The ambiance is welcoming and beautiful. Jessica is very knowledgeable and explains everything in detail and honestly. I highly recommend them.",
    author: "Wanda A."
  },
  {
    quote:
      "I love detailed attention I get from Jessica on my weight loss journey. I am a 30 year nurse practitioner myself and feels she addresses all of my questions and concerns thoughtfully. I'm down almost 15 pounds. I highly recommend her and her delightful staff",
    author: "Debi D."
  },
  {
    quote:
      "Absolutely amazing services! The staff is always wonderful and so kind. I was very impressed with Jessica and her team's ability to get to the root cause of issues, which you'll find is a very rare thing these days! They are masters of their craft and show great integrity. For this reason, I would never go anywhere else!",
    author: "Michael L."
  },
  {
    quote:
      "Jessica and her staff are all very professional with a deep knowledge of their respective jobs and many that can fill in other places when needed. I have always been treated like family and their hormone therapy has helped me immensely.",
    author: "Richard L."
  }
];

export default function TestimonialsPage() {
  return (
    <main className="testimonials-page">
      <SiteHeader className="contact-page-header" />

      <section className="testimonials-hero">
        <h1>testimonials</h1>
      </section>

      <section className="testimonials-content">
        <article className="testimonials-main" aria-labelledby="testimonials-title">
          <h2 id="testimonials-title">Hear From Our Clients</h2>
          <p className="testimonials-intro">
            Read what our clients say about our office and patient care. We're proud of our 5 star reviews and the reputation we've
            established in the community.
          </p>

          <Image
            className="testimonials-feature-image"
            src="/images/about-us/Img_4.jpg"
            alt="Five star review on a phone"
            width={800}
            height={350}
            priority
          />

          <div className="testimonials-list">
            {testimonials.map((testimonial) => (
              <figure className="testimonial-entry" key={testimonial.author}>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>By {testimonial.author}</figcaption>
              </figure>
            ))}
          </div>
        </article>

        <aside className="testimonials-sidebar" aria-label="Testimonials links">
          <label className="about-search">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={18} />
          </label>

          <Link className="about-side-card" href="/services">
            <Image src="/images/about-us/img_1.png" alt="" fill sizes="390px" />
            <span>
              All
              <br />
              Services
            </span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card" href="/contact-us">
            <Image src="/images/about-us/Img_2.png" alt="" fill sizes="390px" />
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
