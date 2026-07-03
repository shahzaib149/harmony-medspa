import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone, Search } from "lucide-react";
import AboutDropdown from "../ui/AboutDropdown";
import PatientCenterDropdown from "../ui/PatientCenterDropdown";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

const galleryImages = [
  "about_1.jpg",
  "about_2.jpg",
  "about_3.jpg",
  "about_4.jpg",
  "about_5.jpg",
  "about_6.jpg",
  "about_7.jpg",
  "about_8.jpg",
  "about_9.jpg",
  "about_10.jpg"
];

export default function AboutUsPage() {
  return (
    <main className="about-page">
      <header className="team-header">
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

      <section className="about-hero">
        <h1>about us</h1>
      </section>

      <section className="about-content">
        <article className="about-story">
          <h2>Our Story</h2>
          <p>
            Harmony Med Spa is a full-service medical spa in Sarasota, Florida. Board-certified nurse practitioner Jessica Simone, APRN,
            and her team take a natural approach to beauty that provides men and women of all ages the most effective and innovative
            aesthetic treatments available in a relaxed and welcoming setting.
          </p>
          <p>
            Treatments available at Harmony Med Spa include Bio Identical Hormone Optimization, laser treatments, dermal fillers,
            Neuromodulators (Daxxify injections), customized facials, and medically supervised [GLP-1] weight loss programs. Injectable
            product lines available include RHA fillers, Daxxify, and Sculptra.
          </p>
          <p>
            Jessica and her team also provide regenerative medicine treatments such as Biocellulose recovery masks and RF microneedling
            that repair and rejuvenate the skin and body at the cellular level.
          </p>
          <p>
            As part of its commitment to overall health and well-being, Harmony Med Spa offers bioidentical hormone replacement therapy.
            Jessica is a certified Evexipel provider and works closely with her patients to design a customized plan that provides
            exceptional results.
          </p>
          <p>
            Clients appreciate the team&apos;s professional attitude and commitment to ensuring that treatment goals and expectations are
            fully understood before any procedure is undertaken.
          </p>
          <p>Schedule a visit at Harmony Med Spa by calling the office or requesting an appointment online today!</p>

          <a className="about-listing" href="#" aria-label="View Harmony Med Spa Sarasota Chamber listing">
            <Image
              src="/images/about-us/view_image/view our listing image.jpg"
              alt="Proud member of Sarasota Chamber 2026"
              width={740}
              height={370}
            />
          </a>

          <div className="about-gallery" aria-label="Harmony Med Spa office gallery">
            {galleryImages.map((file, index) => (
              <Image
                src={`/images/about-us/below_several_images/${file}`}
                alt={`Harmony Med Spa office view ${index + 1}`}
                width={410}
                height={274}
                key={file}
              />
            ))}
          </div>
        </article>

        <aside className="about-sidebar" aria-label="About page links">
          <label className="about-search">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={18} />
          </label>

          <Link className="about-side-card" href="/services">
            <Image src="/images/about-us/img_1.png" alt="" fill sizes="320px" />
            <span>All<br />Services</span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card" href="/contact-us">
            <Image src="/images/about-us/Img_2.png" alt="" fill sizes="320px" />
            <span>Keep<br />In Touch</span>
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
                Harmony Med Spa<br />2184 Gulf Gate Dr.<br />Sarasota, FL 34231
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
        <div className="copyright">© 2026 Harmony Med Spa. All rights reserved.</div>
        <p className="powered-by">
          Powered by: <span className="roya-logo"><span>r</span><span>o</span><span>y</span><span>a</span><span>.com</span></span>
        </p>
      </footer>
    </main>
  );
}
