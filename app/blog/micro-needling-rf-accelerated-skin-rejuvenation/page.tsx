import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import TypewriterText from "@/components/ui/TypewriterText";

export default function MicroNeedlingRfBlogPage() {
  return (
    <main className="blog-page blog-detail-page min-h-[100vh] bg-[#fff] text-[#000]">
      <SiteHeader className="contact-page-header" />

      <section className="blog-hero blog-detail-hero grid [place-items:center] [background:linear-gradient(rgba(0,0,0,0.62),rgba(0,0,0,0.62)),radial-gradient(circle_at_22%_38%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_70%_42%,rgba(255,255,255,0.06),transparent_24%),repeating-linear-gradient(29deg,rgba(255,255,255,0.025)_0_2px,transparent_2px_9px),linear-gradient(135deg,#252525,#101010_52%,#242424)] [&_h1]:m-0 [&_h1]:text-[var(--gold)] [&_h1]:font-thin min-h-[341px] py-[48px] px-[24px] text-center [&_h1]:w-[min(100%,1120px)] [&_h1]:text-[length:clamp(42px,3.25vw,58px)] [&_h1]:leading-[1.08] max-[720px]:min-h-[230px]">
        <h1><TypewriterText text="micro-needling + rf: the power duo for accelerated skin rejuvenation" letterDelay={110} caret ignoreReducedMotion /></h1>
      </section>

      <section className="blog-content blog-detail-content grid gap-[90px] w-[min(100%_-_48px,1300px)] my-0 mx-auto pb-[142px] px-0 [align-items:start] grid-cols-[minmax(0,820px)_390px] pt-[100px] max-[1050px]:grid-cols-[minmax(0,680px)] max-[1050px]:justify-center max-[1050px]:gap-[46px] max-[1050px]:pt-[76px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:grid-cols-[1fr] max-[720px]:gap-[46px] max-[720px]:pt-[56px] max-[720px]:pb-[76px] max-[720px]:px-0">
        <article className="blog-article min-w-[0] text-[#4f5966] text-[length:19px] leading-[1.82] [&_p]:mt-0 [&_p]:mb-[18px] [&_p]:mx-0 [&_h2]:mt-[44px] [&_h2]:mb-[17px] [&_h2]:mx-0 [&_h2]:text-[#ebb35a] [&_h2]:text-[length:30px] [&_h2]:leading-[1.2] [&_h2]:font-thin [&_h3]:mt-[18px] [&_h3]:mb-[2px] [&_h3]:mx-0 [&_h3]:text-[#4f5966] [&_h3]:text-[length:19px] [&_h3]:leading-[1.45] [&_h3]:font-extrabold [&_ol]:mt-0 [&_ol]:mb-[26px] [&_ol]:mr-0 [&_ol]:ml-[24px] [&_ol]:p-0 [&_ul]:mt-0 [&_ul]:mb-[20px] [&_ul]:mr-0 [&_ul]:ml-[22px] [&_ul]:p-0 [&_li]:pl-[4px] [&_li]:leading-[1.7]">
          <div className="blog-article-lede grid grid-cols-[minmax(0,1fr)_300px] gap-[28px] [align-items:start] max-[720px]:grid-cols-[1fr] max-[720px]:gap-[22px]">
            <div>
              <p>
                Healthy, youthful-looking skin starts with treatments that work beneath the surface - where real rejuvenation happens. At
                Harmony Med Spa, we&apos;re proud to offer one of the most effective solutions for skin renewal: Micro-Needling combined with
                Radiofrequency (RF).
              </p>
              <p>
                Whether your goal is to soften fine lines, improve texture, or restore elasticity, this powerful combination helps your skin look
                naturally refreshed and revitalized.
              </p>
            </div>
            <div className="blog-article-feature-image relative min-h-[200px] overflow-hidden rounded-[14px] bg-[#eee] [&_img]:object-cover">
              <Image src="/images/blogs/blog-3/4.jpg" alt="RF micro-needling treatment technology" fill sizes="300px" />
            </div>
          </div>

          <h2><TypewriterText text="Table Of Contents" startOnView /></h2>
          <ol>
            <li>What Is Micro-Needling with RF?</li>
            <li>How the Combination Works</li>
            <li>Benefits of RF Micro-Needling</li>
            <li>Why Choose Harmony Med Spa</li>
            <li>Frequently Asked Questions</li>
            <li>Schedule Your Consultation</li>
          </ol>

          <h2><TypewriterText text="What Is Micro-Needling With RF?" startOnView /></h2>
          <p>
            Micro-needling with Radiofrequency (RF) is a revolutionary skin rejuvenation treatment that combines two of the most effective
            aesthetic technologies available today. Traditional micro-needling uses ultra-fine needles to create controlled micro-injuries on the
            skin&apos;s surface, stimulating the body&apos;s natural healing response and encouraging collagen and elastin production.
          </p>
          <p>
            When enhanced with radiofrequency energy, the treatment penetrates deeper layers of the skin, delivering heat to tighten and remodel
            from within.
          </p>

          <h2><TypewriterText text="How The Combination Works" startOnView /></h2>
          <p>This advanced treatment works in two synergistic phases:</p>
          <ul>
            <li>
              <strong>Micro-Needling:</strong> The tiny needles create microchannels in the skin, triggering the body&apos;s natural repair process.
              This controlled injury promotes the formation of new collagen and elastin - the essential proteins responsible for keeping skin
              firm and elastic.
            </li>
            <li>
              <strong>Radiofrequency (RF) Energy:</strong> Once the needles penetrate the skin, RF energy is delivered into the dermis, generating
              gentle heat. This process tightens existing collagen fibers and further stimulates the production of new ones, resulting in more
              lifted, rejuvenated skin over time.
            </li>
          </ul>
          <p>
            By combining these two powerful modalities, micro-needling with RF addresses both surface-level and deep tissue concerns, offering a
            level of rejuvenation that surpasses what either treatment can achieve alone.
          </p>

          <h2><TypewriterText text="Benefits Of RF Micro-Needling" startOnView /></h2>
          <p>Patients choose micro-needling with RF for its versatility and minimal downtime. Key benefits include:</p>
          <ul>
            <li><strong>Improved Skin Texture and Tone:</strong> Smooths roughness and refines pores.</li>
            <li><strong>Reduction in Fine Lines and Wrinkles:</strong> Tightens skin and softens expression lines.</li>
            <li><strong>Acne Scar and Stretch Mark Reduction:</strong> Promotes collagen remodeling to diminish scars and uneven texture.</li>
            <li><strong>Tightened, Lifted Appearance:</strong> RF energy firms sagging skin for a more youthful contour.</li>
            <li><strong>Safe for Most Skin Types:</strong> Gentle enough for various skin tones and textures.</li>
            <li><strong>Minimal Downtime:</strong> Redness typically subsides within a day or two, allowing for a quick return to normal activities.</li>
          </ul>

          <h2><TypewriterText text="Why Choose Harmony Med Spa" startOnView /></h2>
          <p>
            Our skilled providers use the latest RF micro-needling technology to deliver precise, consistent, and effective results tailored to
            your skin&apos;s unique needs. Whether you&apos;re targeting signs of aging, scars, or skin laxity, we customize each treatment plan to
            help you look and feel your best.
          </p>

          <h2><TypewriterText text="Frequently Asked Questions" startOnView /></h2>
          <h3>How many RF Micro-Needling sessions will I need?</h3>
          <p>
            Most patients see visible improvements after just one treatment, but a series of 3-4 sessions spaced 4-6 weeks apart typically
            delivers optimal collagen remodeling and skin tightening.
          </p>
          <h3>Is RF Micro-Needling painful?</h3>
          <p>
            Discomfort is minimal. A topical numbing cream is applied before treatment, and most patients describe the sensation as light pressure
            or warmth rather than pain.
          </p>
          <h3>What is the downtime after RF Micro-Needling?</h3>
          <p>
            Expect mild redness for 24-48 hours - similar to a light sunburn. You can resume most normal activities the next day, avoiding makeup
            or active skincare until the skin calms.
          </p>
          <h3>What areas can RF Micro-Needling treat?</h3>
          <p>
            RF Micro-Needling effectively rejuvenates the face, neck, decollete, and even stretch marks on the body, making it a versatile option
            for overall skin improvement.
          </p>
          <h3>Who is a good candidate for RF Micro-Needling?</h3>
          <p>
            It&apos;s safe for most skin types and ideal for anyone looking to improve texture, elasticity, fine lines, or mild skin laxity without
            surgery.
          </p>

          <h2><TypewriterText text="Schedule Your Consultation At Harmony Med Spa Today" startOnView /></h2>
          <p>
            If you&apos;re ready to experience smoother, tighter, and more radiant skin, schedule your consultation today at Harmony Med Spa in
            Sarasota. Call (941) 923-8990 to book an appointment today.
          </p>
        </article>

        <aside className="blog-sidebar grid [align-content:start] gap-[20px] [&_.about-search]:h-[70px] [&_.about-search]:mb-[15px] [&_.about-side-card]:min-h-[269px] [&_.about-side-card]:rounded-[18px] [&_.about-side-card_span]:text-[length:30px] [&_.about-side-card_small]:text-[length:22px] max-[1050px]:grid-cols-[repeat(2,minmax(240px,390px))] max-[1050px]:justify-center max-[1050px]:[&_.about-search]:col-[1_/_-1] max-[720px]:grid-cols-[1fr] max-[720px]:[&_.about-side-card]:min-h-[220px]" aria-label="Blog links">
          <label className="about-search flex items-center h-[56px] mb-[12px] py-0 pr-[20px] pl-[24px] [border:1px_solid_#c8d2dd] rounded-[8px] text-[var(--gold)] bg-[#fff] [&_input]:min-w-[0] [&_input]:flex-1 [&_input]:border-0 [&_input]:[outline:0] [&_input]:text-[#344356] [&_input]:bg-[transparent] [&_input]:[font:inherit] [&_input::placeholder]:text-[#425263] [&_input::placeholder]:opacity-[0.9] max-[1050px]:col-[1_/_-1]">
            <span className="sr-only">Search keyword</span>
            <input type="search" placeholder="Enter search keyword" />
            <Search size={18} />
          </label>

          <Link className="about-side-card relative grid [place-items:center] min-h-[184px] overflow-hidden rounded-[10px] text-[#fff] text-center isolate before:content-[''] before:absolute before:inset-0 before:z-[-1] before:[background:rgba(0,0,0,0.34)] [&_img]:z-[-2] [&_img]:object-cover [&_img]:[transition:transform_420ms_ease] [&_span]:text-[length:25px] [&_span]:leading-[1.1] [&_span]:font-normal [&_small]:inline-flex [&_small]:min-w-[146px] [&_small]:justify-center [&_small]:mt-[10px] [&_small]:py-[12px] [&_small]:px-[18px] [&_small]:[border-top:1px_solid_var(--gold)] [&_small]:[border-bottom:1px_solid_var(--gold)] [&_small]:text-[length:16px]" href="/services" target="_blank" rel="noopener noreferrer">
            <Image src="/images/blogs/blog-3/img_1.png" alt="" fill sizes="390px" />
            <span>
              All
              <br />
              Services
            </span>
            <small>Learn More</small>
          </Link>

          <Link className="about-side-card relative grid [place-items:center] min-h-[184px] overflow-hidden rounded-[10px] text-[#fff] text-center isolate before:content-[''] before:absolute before:inset-0 before:z-[-1] before:[background:rgba(0,0,0,0.34)] [&_img]:z-[-2] [&_img]:object-cover [&_img]:[transition:transform_420ms_ease] [&_span]:text-[length:25px] [&_span]:leading-[1.1] [&_span]:font-normal [&_small]:inline-flex [&_small]:min-w-[146px] [&_small]:justify-center [&_small]:mt-[10px] [&_small]:py-[12px] [&_small]:px-[18px] [&_small]:[border-top:1px_solid_var(--gold)] [&_small]:[border-bottom:1px_solid_var(--gold)] [&_small]:text-[length:16px]" href="/contact-us" target="_blank" rel="noopener noreferrer">
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

      <SiteFooter />
    </main>
  );
}
