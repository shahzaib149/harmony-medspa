import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { ONLINE_BOOKING_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tirzepatide Weight Loss in Sarasota, FL",
  description:
    "Tirzepatide is a dual GIP/GLP-1 medication offered as part of the medical weight loss program at Harmony Med Spa in Sarasota, Florida.",
};

const benefits = [
  "Reduced appetite and better portion control",
  "Improved feelings of fullness after meals",
  "Support for blood sugar regulation",
  "Meaningful, sustained weight loss for many patients",
  "A structured plan with ongoing provider guidance",
];

const considerations = [
  {
    label: "Gradual Dosing:",
    text: "Tirzepatide is typically started low and titrated upward over time so your body can adjust and side effects stay manageable.",
  },
  {
    label: "Medication Interactions:",
    text: "Because Tirzepatide slows gastric emptying, it can affect absorption of some oral medications. Share your full medication list with your provider.",
  },
  {
    label: "Lifestyle Support:",
    text: "Outcomes are strongest when treatment is combined with nutrition support, activity, and regular follow-up visits.",
  },
];

const faqs = [
  {
    question: "What is Tirzepatide?",
    answer:
      "Tirzepatide is a dual GIP and GLP-1 receptor agonist. By acting on two gut hormone pathways, it helps regulate appetite and blood sugar to support weight loss.",
  },
  {
    question: "How is Tirzepatide different from Semaglutide?",
    answer:
      "Semaglutide targets the GLP-1 pathway, while Tirzepatide targets both GIP and GLP-1. Your provider will help determine which option best fits your goals and health history.",
  },
  {
    question: "How is Tirzepatide taken?",
    answer:
      "At Harmony Med Spa, Tirzepatide is provided as a weekly injection within a supervised medical weight loss plan.",
  },
  {
    question: "Is Tirzepatide safe?",
    answer:
      "Tirzepatide is considered safe when prescribed and monitored by a qualified provider, who will confirm it is appropriate based on your medical history.",
  },
];

export default function TirzepatidePage() {
  return (
    <main className="tirzepatide-page min-h-[100vh] bg-[#fff] text-[#4f5b68]">
      <SiteHeader
        className="team-header"
        servicesHref="/#services"
        contactHref="/#contact"
      />

      <section className="service-detail-hero grid [place-items:center] min-h-[320px] [background:linear-gradient(rgba(0,0,0,0.64),rgba(0,0,0,0.64)),radial-gradient(circle_at_28%_32%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_72%_46%,rgba(255,255,255,0.07),transparent_26%),repeating-linear-gradient(18deg,rgba(255,255,255,0.022)_0_2px,transparent_2px_8px),linear-gradient(135deg,#292929,#111_54%,#262626)] [&_h1]:m-0 [&_h1]:text-[var(--gold)] [&_h1]:text-[length:clamp(40px,4vw,58px)] [&_h1]:leading-[1.05] [&_h1]:font-thin max-[720px]:min-h-[230px] max-[720px]:px-[20px] max-[720px]:text-center">
        <h1>tirzepatide in sarasota, fl</h1>
      </section>

      <section className="grid grid-cols-[minmax(0,820px)_390px] gap-[78px] w-[min(100%_-_48px,1280px)] my-0 mx-auto pt-[92px] pb-[126px] px-0 max-[1050px]:grid-cols-[minmax(0,820px)] max-[1050px]:justify-center max-[1050px]:gap-[48px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:pt-[58px] max-[720px]:pb-[86px]">
        <article className="min-w-0 text-[length:20px] leading-[1.75] font-normal max-[720px]:text-[length:17px]">
          <section className="mb-[42px]">
            <h2 className="mt-0 mb-[22px] text-[#ebb35a] text-[length:29px] leading-[1.1] font-thin max-[720px]:text-[length:25px]">
              Dual-Action GLP-1 Support At Harmony Med Spa
            </h2>
            <p className="mt-0 mb-[34px] max-w-[840px]">
              Tirzepatide is a GLP-1 medication offered as part of a medically
              supervised weight loss program at Harmony Med Spa in Sarasota.
            </p>
            <p className="m-0 max-w-[840px]">
              It acts on both the GIP and GLP-1 hormone pathways &mdash; slowing
              gastric emptying, curbing appetite, and improving satiety &mdash;
              to help patients reduce food intake and reach their weight loss
              goals within a structured plan.
            </p>
          </section>

          <Image
            className="w-[min(808px,100%)] h-auto rounded-[14px] mb-[46px]"
            src="/images/services/catalog/medical-weight-loss.jpg"
            alt="Tirzepatide weight loss program at Harmony Med Spa"
            width={818}
            height={460}
            priority
          />

          <section className="mb-[52px]">
            <h2 className="mt-0 mb-[20px] text-[#ebb35a] text-[length:29px] leading-[1.1] font-thin max-[720px]:text-[length:25px]">
              Why Patients Choose Tirzepatide
            </h2>
            <p className="mt-0 mb-[4px] max-w-[840px]">
              Benefits of Tirzepatide within a structured plan may include:
            </p>
            <ul className="mt-0 mb-0 pl-[30px]">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="mb-[44px]">
            <h2 className="mt-0 mb-[20px] text-[#ebb35a] text-[length:29px] leading-[1.1] font-thin max-[720px]:text-[length:25px]">
              Important Considerations
            </h2>
            <ul className="mt-0 mb-0 pl-[30px]">
              {considerations.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong> {item.text}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-[74px]">
            <h2 className="mt-0 mb-[24px] text-[#ebb35a] text-[length:29px] leading-[1.1] font-thin max-[720px]:text-[length:25px]">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq) => (
              <p
                className="mt-0 mb-[28px] max-w-[840px] last:mb-0"
                key={faq.question}
              >
                <strong>{faq.question}</strong> {faq.answer}
              </p>
            ))}
          </section>

          <section>
            <h2 className="mt-0 mb-[34px] text-[#ebb35a] text-[length:29px] leading-[1.1] font-thin max-[720px]:text-[length:25px]">
              Ready To Get Started?
            </h2>
            <p className="mt-0 mb-[34px] max-w-[840px]">
              Contact Harmony Med Spa in Sarasota to schedule a consultation and
              find out whether Tirzepatide is right for your weight loss goals.
            </p>
            <p className="mt-0 mb-[68px] max-w-[840px]">
              Call (941) 923-8990 to book your appointment.
            </p>
            <div className="text-center">
              <a
                className="inline-flex min-w-[146px] justify-center py-[14px] px-[24px] [border-top:1px_solid_var(--gold)] [border-bottom:1px_solid_var(--gold)] text-[#000] text-[length:18px]"
                href={ONLINE_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Now
              </a>
            </div>
          </section>
        </article>

        <aside className="grid [align-content:start] gap-[35px] pt-[16px] [&_.about-side-card]:min-h-[269px] [&_.about-side-card]:rounded-[18px] [&_.about-side-card_span]:text-[length:30px] [&_.about-side-card_small]:text-[length:22px] max-[1050px]:grid-cols-[repeat(2,minmax(240px,390px))] max-[1050px]:justify-center max-[720px]:grid-cols-[1fr] max-[720px]:gap-[22px] max-[720px]:[&_.about-side-card]:min-h-[220px]" aria-label="Tirzepatide links">
          <label className="about-search flex items-center h-[70px] mb-0 py-0 pr-[24px] pl-[30px] [border:1px_solid_#c8d2dd] rounded-[8px] text-[var(--gold)] bg-[#fff] [&_input]:min-w-[0] [&_input]:flex-1 [&_input]:border-0 [&_input]:[outline:0] [&_input]:text-[#344356] [&_input]:bg-[transparent] [&_input]:[font:inherit] [&_input::placeholder]:text-[#425263] [&_input::placeholder]:opacity-[0.9] max-[1050px]:col-[1_/_-1]">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={22} />
          </label>

          <Link
            className="about-side-card relative grid [place-items:center] overflow-hidden text-[#fff] text-center isolate before:content-[''] before:absolute before:inset-0 before:z-[-1] before:[background:rgba(0,0,0,0.36)] [&_img]:z-[-2] [&_img]:object-cover [&_img]:[transition:transform_420ms_ease] [&_span]:text-[length:25px] [&_span]:leading-[1.1] [&_span]:font-normal [&_small]:inline-flex [&_small]:min-w-[146px] [&_small]:justify-center [&_small]:mt-[10px] [&_small]:py-[12px] [&_small]:px-[18px] [&_small]:[border-top:1px_solid_var(--gold)] [&_small]:[border-bottom:1px_solid_var(--gold)] [&_small]:text-[length:16px]"
            href="/medical-weight-loss"
          >
            <Image
              src="/images/about-us/img_1.png"
              alt=""
              fill
              sizes="390px"
            />
            <span>
              Weight
              <br />
              Loss
            </span>
            <small>Learn More</small>
          </Link>

          <Link
            className="about-side-card relative grid [place-items:center] overflow-hidden text-[#fff] text-center isolate before:content-[''] before:absolute before:inset-0 before:z-[-1] before:[background:rgba(0,0,0,0.36)] [&_img]:z-[-2] [&_img]:object-cover [&_img]:[transition:transform_420ms_ease] [&_span]:text-[length:25px] [&_span]:leading-[1.1] [&_span]:font-normal [&_small]:inline-flex [&_small]:min-w-[146px] [&_small]:justify-center [&_small]:mt-[10px] [&_small]:py-[12px] [&_small]:px-[18px] [&_small]:[border-top:1px_solid_var(--gold)] [&_small]:[border-bottom:1px_solid_var(--gold)] [&_small]:text-[length:16px]"
            href="/contact-us"
          >
            <Image
              src="/images/about-us/Img_2.png"
              alt=""
              fill
              sizes="390px"
            />
            <span>
              Keep
              <br />
              In Touch
            </span>
            <small>Contact Us</small>
          </Link>
        </aside>
      </section>

      <SiteFooter address="linked-name" copyright="plain" />
    </main>
  );
}
