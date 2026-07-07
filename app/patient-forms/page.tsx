import Image from "next/image";
import Link from "next/link";
import { FileText, Search } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const forms = [
  {
    title: "Terms of Service Agreement",
    href: "#"
  },
  {
    title: "Pre and Post Care Instructions",
    href: "#"
  }
];

export default function PatientFormsPage() {
  return (
    <main className="patient-forms-page">
      <SiteHeader className="contact-page-header" />

      <section className="patient-forms-hero">
        <h1>patient forms</h1>
      </section>

      <section className="patient-forms-content" aria-labelledby="patient-forms-title">
        <div className="patient-forms-list">
          <h2 id="patient-forms-title" className="sr-only">Patient forms</h2>
          {forms.map((form) => (
            <article className="patient-form-row" key={form.title}>
              <div className="patient-form-name">
                <FileText size={16} strokeWidth={1.8} />
                <span>{form.title}</span>
              </div>
              <a className="patient-form-link" href={form.href}>
                Read Now
              </a>
            </article>
          ))}
        </div>

        <aside className="patient-forms-sidebar" aria-label="Patient forms links">
          <label className="about-search">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={18} />
          </label>

          <Link className="about-side-card" href="/services">
            <Image src="/images/about-us/img_1.png" alt="" fill sizes="390px" />
            <span>All<br />Services</span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card" href="/contact-us">
            <Image src="/images/about-us/Img_2.png" alt="" fill sizes="390px" />
            <span>Keep<br />In Touch</span>
            <small>Contact Us</small>
          </Link>
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
