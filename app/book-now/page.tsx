import Link from "next/link";

const businessHours = [
  ["Sunday", "Closed"],
  ["Monday", "9:00 AM to 5:00 PM"],
  ["Tuesday", "9:00 AM to 5:00 PM"],
  ["Wednesday", "9:00 AM to 5:00 PM"],
  ["Thursday", "9:00 AM to 5:00 PM"],
  ["Friday", "9:00 AM to 5:00 PM"],
  ["Saturday", "Closed"]
];

const services = [
  "Botox / Daxxify",
  "Dermal Fillers",
  "Facials",
  "Laser Hair Removal",
  "Medical Weight Loss",
  "RF Microneedling"
];

const providers = [
  "Jessica Simone, APRN",
  "Elizabeth Emery",
  "Harmony Med Spa Team"
];

export default function BookNowPage() {
  return (
    <main className="booking-page">
      <header className="booking-header">
        <Link className="booking-logo" href="/" aria-label="Harmony Med Spa home">
          <img src="/images/logo-transparent.png" alt="Harmony Med Spa" />
        </Link>
        <nav className="booking-nav" aria-label="Booking navigation">
          <Link href="/">Home</Link>
          <Link href="/book-now">Online Booking</Link>
        </nav>
      </header>

      <section className="booking-content" aria-labelledby="booking-title">
        <div className="booking-form-panel">
          <h1 id="booking-title">Book Appointment</h1>
          <p>Type a few letters to help narrow your selection</p>

          <form className="booking-form">
            <label>
              <span>Select a Service:</span>
              <select name="service" defaultValue="">
                <option value="" aria-label="No service selected" />
                {services.map((service) => (
                  <option value={service} key={service}>{service}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Select a Provider:</span>
              <select name="provider" defaultValue="">
                <option value="" aria-label="No provider selected" />
                {providers.map((provider) => (
                  <option value={provider} key={provider}>{provider}</option>
                ))}
              </select>
            </label>

            <button type="button">Show Available Appointments</button>
          </form>
        </div>

        <aside className="business-hours" aria-labelledby="business-hours-title">
          <h2 id="business-hours-title">Business Hours</h2>
          <dl>
            {businessHours.map(([day, hours]) => (
              <div key={day}>
                <dt>{day}:</dt>
                <dd>{hours}</dd>
              </div>
            ))}
          </dl>
          <a className="booking-call-button" href="tel:9419238990">Call Us</a>
          <a className="booking-email-button" href="mailto:management@harmonymedspafl.com">E-mail Us</a>
        </aside>
      </section>

      <footer className="booking-footer">
        <div className="booking-footer-inner">
          <div>
            <h2>Address</h2>
            <p>Harmony Med Spa</p>
            <p>2184 Gulf Gate Dr. Unit B</p>
            <p>Sarasota, FL 34231</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>Email: <a href="mailto:management@harmonymedspafl.com">management@harmonymedspafl.com</a></p>
            <p>Phone: <a href="tel:9419238990">9419238990</a></p>
            <div className="booking-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
            </div>
          </div>
          <div>
            <h2>Pages</h2>
            <Link href="/book-now">Online Booking</Link>
            <a href="#">Booking Terms</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <p className="booking-credit">Website Made by PatientNow. Copyright (c) 2026 All rights reserved.</p>
      </footer>
    </main>
  );
}
