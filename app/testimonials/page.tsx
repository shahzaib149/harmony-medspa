import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone, Search } from "lucide-react";
import AboutDropdown from "../ui/AboutDropdown";
import PatientCenterDropdown from "../ui/PatientCenterDropdown";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

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
