import { Building2, Facebook, Instagram, MapPin, Phone, Search } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { GOOGLE_MAPS_LOCATION_URL } from "@/lib/constants";

export default function ContactUsPage() {
  return (
    <main className="contact-page min-h-[100vh] bg-[#fff] text-[#111]">
      <SiteHeader className="contact-page-header" />

      <section className="contact-page-hero grid [place-items:center] min-h-[255px] [background:linear-gradient(rgba(0,0,0,0.62),rgba(0,0,0,0.62)),radial-gradient(circle_at_22%_38%,rgba(255,255,255,0.09),transparent_15%),radial-gradient(circle_at_58%_30%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_78%_70%,rgba(255,255,255,0.06),transparent_18%),repeating-linear-gradient(26deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_9px),linear-gradient(135deg,#252525,#111_52%,#242424)] [&_h1]:m-0 [&_h1]:text-[#d49d19] [&_h1]:text-[length:clamp(40px,3vw,52px)] [&_h1]:leading-[1] [&_h1]:font-thin max-[720px]:min-h-[210px]">
        <h1>contact us</h1>
      </section>

      <section className="contact-page-main grid grid-cols-[minmax(520px,660px)_313px] justify-center items-stretch w-[min(980px,calc(100%_-_48px))] mt-[75px] mb-[76px] mx-auto max-[1050px]:grid-cols-[minmax(0,660px)] max-[720px]:w-[min(100%_-_32px,560px)] max-[720px]:mt-[48px] max-[720px]:mb-[58px] max-[720px]:mx-auto" aria-labelledby="contact-page-title">
        <div className="contact-page-form-panel pt-[74px] pb-[82px] px-[78px] bg-[#f4f4f4] [&_h2]:mt-0 [&_h2]:mb-[8px] [&_h2]:mx-0 [&_h2]:text-[#ebb13d] [&_h2]:text-[length:38px] [&_h2]:leading-[1] [&_h2]:font-thin [&_p]:max-w-[500px] [&_p]:mt-0 [&_p]:mb-[27px] [&_p]:mx-0 [&_p]:uppercase [&_p]:text-[#000] [&_p]:text-[length:15px] [&_p]:leading-[1.38] [&_p]:font-normal [&_p]:tracking-[0.46em] max-[720px]:pt-[44px] max-[720px]:pb-[50px] max-[720px]:px-[24px] max-[720px]:[&_p]:tracking-[0.22em]">
          <h2 id="contact-page-title">Contact Us</h2>
          <p>For non-urgent questions or to learn more about our services, contact us today!</p>
          <ContactForm variant="page" />
        </div>

        <aside className="contact-info-panel grid grid-rows-[313px_auto_1fr] [border:1px_solid_#e2e2e2] [border-left:0] bg-[#fff] max-[1050px]:grid-rows-[290px_auto_auto] max-[1050px]:[border-left:1px_solid_#e2e2e2] max-[1050px]:[border-top:0] max-[720px]:grid-rows-[250px_auto_auto]" aria-label="Harmony Med Spa contact details">
          <a
            className="contact-map-card relative block overflow-hidden [background:linear-gradient(rgba(34,34,34,0.88),rgba(34,34,34,0.88)),linear-gradient(90deg,transparent_0_47%,#cfd6df_47%_49%,transparent_49%_100%),linear-gradient(0deg,transparent_0_58%,#cfd6df_58%_60%,transparent_60%_100%),#2f3338]"
            href={GOOGLE_MAPS_LOCATION_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Harmony Med Spa location in Google Maps"
          >
            <div className="contact-map-roads absolute inset-0 [background:linear-gradient(90deg,transparent_5%,#dce4ee_5%_7%,transparent_7%_100%),linear-gradient(90deg,transparent_30%,#dce4ee_30%_32%,transparent_32%_100%),linear-gradient(90deg,transparent_62%,#dce4ee_62%_64%,transparent_64%_100%),linear-gradient(0deg,transparent_12%,#dce4ee_12%_14%,transparent_14%_100%),linear-gradient(0deg,transparent_36%,#dce4ee_36%_39%,transparent_39%_100%),linear-gradient(0deg,transparent_63%,#dce4ee_63%_66%,transparent_66%_100%)] opacity-[0.78] before:content-[''] before:absolute before:w-[120%] before:h-[14px] before:left-[-10%] before:bg-[#dce4ee] before:[transform:rotate(28deg)] after:content-[''] after:absolute after:w-[120%] after:h-[14px] after:left-[-10%] after:bg-[#dce4ee] before:top-[58%] after:top-[72%] after:[transform:rotate(-2deg)]" />
            <div className="contact-map-pin absolute left-[19%] top-[31%] text-[#d49d19] [&_span]:absolute [&_span]:left-[22px] [&_span]:top-[13px] [&_span]:grid [&_span]:[place-items:center] [&_span]:w-[24px] [&_span]:h-[24px] [&_span]:[border:1px_solid_currentColor] [&_span]:rounded-full [&_span]:text-[#d49d19] [&_span]:[font-family:Georgia,serif] [&_span]:italic [&_span]:font-bold">
              <MapPin size={70} />
              <span>H</span>
            </div>
            <span className="contact-map-label absolute left-[8px] bottom-[6px] text-[#fff] text-[length:13px] [text-shadow:0_1px_2px_#000]">Google</span>
          </a>

          <div className="contact-info-list pt-[36px] pb-[31px] px-[37px] [&_p]:grid [&_p]:grid-cols-[34px_1fr] [&_p]:gap-[15px] [&_p]:items-center [&_p]:mt-0 [&_p]:mb-[30px] [&_p]:mx-0 [&_p]:text-[#3e3e3e] [&_p]:text-[length:14px] [&_p]:leading-[1.45] [&_p]:font-normal [&_small]:block [&_small]:mb-[4px] [&_small]:uppercase [&_small]:text-[#3d3d3d] [&_small]:text-[length:11px] [&_small]:leading-[1] [&_small]:font-bold [&_a]:block [&_a]:text-[#3d3d3d] [&_a]:text-[length:19px] [&_a]:leading-[1] [&_a]:font-bold max-[720px]:pl-[24px] max-[720px]:pr-[24px] max-[720px]:ml-0 max-[720px]:mr-0">
            <p>
              <span className="contact-info-icon grid [place-items:center] w-[34px] h-[34px] rounded-full bg-[#333] text-[#fff]"><MapPin size={20} fill="currentColor" /></span>
              <span>2184 Gulf Gate Dr.<br />Sarasota, FL 34231</span>
            </p>
            <p>
              <span className="contact-info-icon grid [place-items:center] w-[34px] h-[34px] rounded-full bg-[#333] text-[#fff]"><Phone size={19} fill="currentColor" /></span>
              <span><small>Call</small><a href="tel:9419238990">(941) 923-8990</a></span>
            </p>
            <p>
              <span className="contact-info-icon grid [place-items:center] w-[34px] h-[34px] rounded-full bg-[#333] text-[#fff]"><Building2 size={18} /></span>
              <span><small>Fax</small><a href="tel:9419239024">(941) 923-9024</a></span>
            </p>
          </div>

          <div className="contact-page-social my-0 mx-[37px] pt-[34px] pb-0 px-0 [border-top:1px_solid_#e3e3e3] [&_p]:mt-0 [&_p]:mb-[18px] [&_p]:mx-0 [&_p]:uppercase [&_p]:text-[#222] [&_p]:text-[length:12px] [&_p]:font-normal [&_div]:flex [&_div]:flex-wrap [&_div]:gap-[6px] [&_a]:grid [&_a]:[place-items:center] [&_a]:w-[37px] [&_a]:h-[37px] [&_a]:rounded-full [&_a]:bg-[#333] [&_a]:text-[#fff] [&_a]:text-[length:14px] [&_a]:font-bold max-[720px]:pl-[24px] max-[720px]:pr-[24px] max-[720px]:ml-0 max-[720px]:mr-0">
            <p>Follow Us:</p>
            <div>
              <a href="#" aria-label="Facebook"><Facebook size={18} fill="currentColor" /></a>
              <a href="#" aria-label="Google"><Search size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="Yelp">Y</a>
            </div>
          </div>
        </aside>
      </section>

      <SiteFooter variant="contact-page-footer" social="compact" />
    </main>
  );
}
