import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export default function LearnMorePage() {
  return (
    <main className="learn-more-page">
      <section className="learn-more-card" aria-labelledby="learn-more-title">
        <Image
          className="learn-more-image"
          src="/images/learn-more/newsletter-rewards.jpg"
          alt="Newsletter Rewards. Opt-in and get fifty dollars off first purchase."
          width={720}
          height={315}
          priority
        />

        <h1 id="learn-more-title" className="sr-only">Join the Harmony Med Spa newsletter</h1>

        <form className="learn-more-form">
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
            <div className="learn-more-phone-input">
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

        <div className="learn-more-social" aria-label="Social links">
          <a className="learn-more-facebook" href="#" aria-label="Facebook"><Facebook size={28} fill="currentColor" /></a>
          <a className="learn-more-instagram" href="#" aria-label="Instagram"><Instagram size={28} /></a>
          <a className="learn-more-tiktok" href="#" aria-label="TikTok">♪</a>
        </div>
      </section>
    </main>
  );
}
