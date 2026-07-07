import Image from "next/image";
import Link from "next/link";
import { Building2, CalendarDays, Facebook, Instagram, Mail, MapPin, Phone, Search } from "lucide-react";
import AboutDropdown from "../../ui/AboutDropdown";
import PatientCenterDropdown from "../../ui/PatientCenterDropdown";

const googleMapsLocationUrl =
  "https://www.google.com/maps/search/?api=1&query=Harmony%20Med%20Spa%2C%202184%20Gulf%20Gate%20Dr%2C%20Sarasota%2C%20FL%2034231";

export default function SummerReadyGlpBhrtPage() {
  return (
    <main className="blog-page blog-detail-page">
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

      <section className="blog-hero blog-detail-hero">
        <h1>summer-ready from the inside out: how glp-1 weight loss and bhrt work together to help you look and feel your best</h1>
      </section>

      <section className="blog-content blog-detail-content">
        <article className="blog-article">
          <div className="blog-article-lede">
            <div>
              <p>
                Beach season in Sarasota, FL often inspires people to focus on how they look in summer clothes, swimsuits, and vacation photos. But for many adults, especially those dealing with midlife hormone changes, feeling truly summer-ready is about more than just losing a few pounds. Fatigue, poor sleep, stubborn weight gain, brain fog, and low motivation can make it harder to feel confident and energized even when you are trying to make healthy choices.
              </p>
              <p>
                At Harmony Med Spa, medically supervised weight loss and hormone optimization can work together to support a more complete summer wellness plan. GLP-1 medications such as Semaglutide and Tirzepatide help regulate appetite and support weight loss, while Bio-Identical Hormone Replacement Therapy, or BHRT, may help address hormonal symptoms that can affect energy, mood, sleep, and metabolism.
              </p>
            </div>
            <div className="blog-article-feature-image">
              <Image src="/images/services/wellness/hormonereplacement_thumbnail_1.jpg" alt="" fill sizes="300px" />
              <span>Bio-Identical<br />Hormone Replacement Therapy<br /><strong>+</strong><br />GLP-1</span>
            </div>
          </div>

          <p>
            Together, these treatments may offer a more personalized strategy for looking and feeling your best this summer. Instead of chasing a quick fix, this approach can help support body confidence, energy, sleep, and consistency so patients can enjoy beach days, boating weekends, and active summer plans with more ease.
          </p>

          <h2>Table Of Contents</h2>
          <ul>
            <li>Why Summer Goals Can Feel Harder in Midlife</li>
            <li>How GLP-1 Supports Summer Weight-Loss Goals</li>
            <li>How BHRT Supports Energy, Mood, and Metabolism</li>
            <li>Why GLP-1 and BHRT Can Be a Powerful Summer Combination</li>
            <li>What to Expect Before Starting Treatment</li>
            <li>FAQs About GLP-1 and BHRT</li>
            <li>Schedule a Summer Wellness Consultation in Sarasota, FL</li>
          </ul>

          <h2>Why Summer Goals Can Feel Harder In Midlife</h2>
          <p>
            For many women and men, summer can bring extra motivation to focus on health and appearance. At the same time, hormonal changes can make progress feel frustrating. Patients may notice stubborn weight gain, increased belly fat, lower energy, disrupted sleep, irritability, brain fog, and decreased libido, all of which can affect confidence and make it harder to stay consistent with nutrition, movement, and self-care routines.
          </p>
          <p>
            This is one reason a standard diet-only approach often feels disappointing. If appetite is difficult to control or hormones are contributing to fatigue and poor recovery, it is much harder to stay on track. A more personalized plan can help address both the metabolic and hormonal factors that influence how patients look and feel during the summer months.
          </p>

          <h2>How GLP-1 Supports Summer Weight-Loss Goals</h2>
          <p>
            GLP-1 medications such as Semaglutide and Tirzepatide are designed to support medical weight loss by helping regulate appetite and food intake. These medications mimic the effects of GLP-1, a hormone involved in hunger regulation, which can help patients feel fuller sooner and reduce cravings.
          </p>
          <p>
            For patients who have struggled with repeated dieting, GLP-1 support can make it easier to build sustainable habits. The goal is not only to lose weight, but to create a plan that supports long-term health, steady progress, and confidence in daily life.
          </p>

          <h2>How BHRT Supports Energy, Mood, And Metabolism</h2>
          <p>
            Hormone imbalance can affect much more than mood. Low or fluctuating hormone levels may contribute to fatigue, sleep disruption, hot flashes, changes in body composition, and reduced motivation. BHRT is designed to help restore hormone balance using bio-identical hormones that are carefully evaluated for each patient.
          </p>
          <p>
            When hormones are better supported, some patients may find it easier to sleep, recover, maintain energy, and stay consistent with healthy habits. That support can be especially valuable when combined with a medically supervised weight-loss plan.
          </p>

          <h2>Why GLP-1 And BHRT Can Be A Powerful Summer Combination</h2>
          <p>
            GLP-1 medications and BHRT address different parts of the wellness picture. GLP-1 support can help with appetite and weight-management challenges, while BHRT may help address hormone-related symptoms that interfere with energy, sleep, mood, and metabolism. A medically supervised approach can help uncover whether both metabolic support and hormone optimization should be part of the plan.
          </p>

          <h2>What To Expect Before Starting Treatment</h2>
          <p>
            Before recommending GLP-1 medications, BHRT, or a combination of the two, the team at Harmony Med Spa will review your goals, symptoms, health history, and treatment priorities. Medical weight loss visits include an exam and ongoing progress monitoring, while BHRT planning may include hormone-focused evaluation and discussion of personalized treatment options.
          </p>
          <p>
            This step is important because not every patient needs the same treatment path. Some patients may benefit most from GLP-1 support, while others may discover that hormone imbalance is playing a major role in how they feel. For some, the most effective plan may involve both.
          </p>

          <h2>FAQs About GLP-1 And BHRT</h2>
          <h3>Can I Do GLP-1 And BHRT At The Same Time?</h3>
          <p>
            Possibly. Some patients may be candidates for both treatments when weight concerns and hormone-related symptoms are happening at the same time. The best way to know is through a consultation and individualized assessment at Harmony Med Spa.
          </p>
          <h3>Is This Combination Only For Women?</h3>
          <p>
            No. BHRT can support both women and men, and GLP-1 medications are also used across eligible adult patients in medically supervised weight-loss programs. The right plan depends on symptoms, health status, and treatment goals.
          </p>
          <h3>Will BHRT Help Me Lose Weight On Its Own?</h3>
          <p>
            BHRT is not simply a weight-loss treatment. Its main role is to help address hormone-related symptoms such as fatigue, sleep disruption, mood changes, and other imbalances that may affect overall wellness and make healthy habits harder to maintain.
          </p>
          <h3>How Long Does It Take To Notice Results?</h3>
          <p>
            Timing varies by patient and by treatment. GLP-1 progress typically develops over time with consistent follow-up, while BHRT improvements may be noticed in areas such as energy, sleep, or mood on an individual timeline. During your consultation, Harmony Med Spa can explain what may be realistic for your goals.
          </p>
          <h3>How Do I Know If I Am A Good Candidate?</h3>
          <p>
            If you are struggling with stubborn weight, appetite control, fatigue, sleep changes, brain fog, low motivation, or other signs of possible hormone imbalance, an evaluation can help determine which treatment options make sense. A personalized consultation is the best place to start.
          </p>

          <h2>Schedule A Summer Wellness Consultation In Sarasota, FL</h2>
          <p>
            Getting summer-ready is not only about fitting into different clothes. It is also about feeling energized, balanced, and comfortable in your own body. At Harmony Med Spa, GLP-1 medical weight loss and BHRT can be part of a personalized strategy to help patients approach summer with more confidence and support.
          </p>
          <p>
            To learn whether GLP-1, BHRT, or a combination approach may be right for you, schedule a consultation with Harmony Med Spa in Sarasota, FL by calling 941-923-8990 today.
          </p>
        </article>

        <aside className="blog-sidebar" aria-label="Blog links">
          <label className="about-search">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={18} />
          </label>

          <Link className="about-side-card" href="/services" target="_blank" rel="noopener noreferrer">
            <Image src="/images/blogs/blog-3/img_1.png" alt="" fill sizes="390px" />
            <span>
              All
              <br />
              Services
            </span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card" href="/contact-us" target="_blank" rel="noopener noreferrer">
            <Image src="/images/blogs/blog-3/Img_2.png" alt="" fill sizes="390px" />
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
