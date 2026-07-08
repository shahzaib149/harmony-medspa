import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export default function LearnMorePage() {
  return (
    <main className="learn-more-page min-h-[100vh] pt-[47px] pb-0 px-[18px] bg-[#f4f4f4] text-[#000] [font-family:Arial,'Helvetica_Neue',sans-serif] font-normal max-[720px]:pt-[24px]">
      <section className="learn-more-card w-[min(702px,100%)] min-h-[100vh] my-0 mx-auto pt-[55px] pb-[15px] px-[16px] bg-[#fff] max-[720px]:pt-[28px]" aria-labelledby="learn-more-title">
        <Image
          className="learn-more-image block w-full h-auto shadow-[0_18px_24px_rgba(0,0,0,0.28)]"
          src="/images/learn-more/newsletter-rewards.jpg"
          alt="Newsletter Rewards. Opt-in and get fifty dollars off first purchase."
          width={720}
          height={315}
          priority
        />

        <h1 id="learn-more-title" className="sr-only">Join the Harmony Med Spa newsletter</h1>

        <form className="learn-more-form grid gap-[21px] w-[min(320px,100%)] mt-[23px] mb-0 mx-auto [&_label]:grid [&_label]:gap-[8px] [&_label]:text-[length:14px] [&_label]:font-bold [&_input]:h-[33px] [&_input]:[border:1px_solid_#c9c9c9] [&_input]:bg-[#fff] [&_input]:text-[#333] [&_input]:[font:inherit] [&_input]:text-[length:14px]! [&_select]:h-[33px] [&_select]:[border:1px_solid_#c9c9c9] [&_select]:bg-[#fff] [&_select]:text-[#333] [&_select]:[font:inherit] [&_select]:text-[length:14px]! [&_input]:w-full [&_input]:py-0 [&_input]:px-[9px] [&_p]:mt-[-13px] [&_p]:mb-0 [&_p]:mx-0 [&_p]:text-[#566274] [&_p]:text-[length:10px] [&_p]:leading-[1.35] [&_p_a]:text-[#008ad8] [&_p_a]:underline [&_button]:min-h-[48px] [&_button]:mt-[1px] [&_button]:border-0 [&_button]:rounded-[14px] [&_button]:bg-[#242424] [&_button]:text-[#fff] [&_button]:[font:inherit] [&_button]:text-[length:16px]! [&_button]:font-normal! [&_button]:cursor-pointer">
          <label>
            <span>First Name</span>
            <input type="text" name="firstName" />
          </label>
          <label>
            <span>Last Name</span>
            <input type="text" name="lastName" />
          </label>
          <label>
            <span>Email Address</span>
            <input type="email" name="email" />
          </label>
          <label>
            <span>SMS Phone Number</span>
            <div className="learn-more-phone-input grid grid-cols-[55px_1fr] [&_select]:[border-right:0] [&_select]:pl-[8px]">
              <select name="country" aria-label="Country code" defaultValue="US">
                <option value="US">US</option>
              </select>
              <input type="tel" name="phone" placeholder="+1" aria-label="SMS phone number" />
            </div>
          </label>
          <p>
            Harmony Med Spa - By providing your phone number, you agree to receive promotional and marketing messages, notifications, and customer service communications from Harmony Med Spa. Message and data rates may apply. Consent is not a condition of purchase. Message frequency varies. Text HELP for help. Text STOP to cancel. <a href="#">See terms</a>, <a href="#">See Privacy Policy</a>.
          </p>
          <button type="submit">Join our Newsletter</button>
        </form>

        <div className="learn-more-social flex justify-center gap-[17px] mt-[25px] [&_a]:grid [&_a]:[place-items:center] [&_a]:w-[44px] [&_a]:h-[44px] [&_a]:rounded-full [&_a]:text-[#fff]" aria-label="Social links">
          <a className="learn-more-facebook bg-[#5b84c9]" href="#" aria-label="Facebook"><Facebook size={28} fill="currentColor" /></a>
          <a className="learn-more-instagram bg-[#ef476f]" href="#" aria-label="Instagram"><Instagram size={28} /></a>
          <a className="learn-more-tiktok bg-[#000] text-[length:30px] font-bold" href="#" aria-label="TikTok">♪</a>
        </div>
      </section>
    </main>
  );
}
