import Link from "next/link";
import { ONLINE_BOOKING_URL } from "@/lib/constants";
import { PRICING_GENERAL_DISCLAIMER, PRICING_PATH, SERVICE_PRICING, requestPricingHref } from "@/lib/data/pricing";
import PriceList from "./PriceList";

const buttonBase =
  "inline-flex justify-center items-center min-h-[50px] py-[13px] px-[24px] rounded-full text-[length:15px] font-semibold no-underline [transition:background_200ms_ease,transform_200ms_ease] hover:-translate-y-[1px] max-[560px]:w-full";
const goldButton = `${buttonBase} bg-[var(--gold)] text-[#16130f] hover:bg-[#e4bd6c]`;
const darkButton = `${buttonBase} bg-[#16130f] text-[#f6efe1]`;
const outlineButton = `${buttonBase} [border:1px_solid_#cdb98f] bg-[#fff] text-[#16130f] hover:bg-[#f4ecdc]`;

/**
 * Pricing and conversion block for a service page: the treatment's published prices (when it
 * has any), then View Treatment Pricing, Book Online and Request Personalized Pricing. The
 * request link carries the treatment name so the lead is tagged with the page it came from.
 */
export default function ServicePricing({ path, heading, intro }: { path: string; heading?: string; intro?: string }) {
  const entry = SERVICE_PRICING[path];
  if (!entry) throw new Error(`No service pricing registered for ${path}`);
  const hasPrices = entry.groups.length > 0;
  const leadWithBooking = hasPrices || entry.pricesOnPage;
  const pricingHref = entry.pricingAnchor ? `${PRICING_PATH}#${entry.pricingAnchor}` : PRICING_PATH;

  const viewPricing = (
    <Link href={pricingHref} className={outlineButton}>
      View Treatment Pricing
    </Link>
  );
  const bookOnline = (
    <a href={ONLINE_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={leadWithBooking ? goldButton : darkButton}>
      Book Online
    </a>
  );
  const requestPricing = (
    <Link href={requestPricingHref(entry.service)} className={leadWithBooking ? darkButton : goldButton}>
      Request Personalized Pricing
    </Link>
  );

  const groupCards = entry.groups.map((group) => (
    <article key={group.title} className="p-[26px] rounded-[18px] bg-[#fff] [border:1px_solid_#ece0c8] shadow-[0_12px_34px_rgba(60,45,20,0.06)] max-[720px]:p-[20px]">
      <h3 className="mt-0 mb-[6px] text-[#16130f] text-[length:20px] leading-[1.2] font-medium">{group.title}</h3>
      <PriceList items={group.items} linkItems={false} />
      {group.footnote ? <p className="mt-[12px] mb-0 text-[length:14px] leading-[1.5] italic text-[#6b6151]">{group.footnote}</p> : null}
    </article>
  ));
  // One price card sits beside the copy; several get their own row of columns.
  const sideCard = entry.groups.length === 1;

  return (
    <section aria-labelledby="service-pricing-heading" className="service-pricing [background:linear-gradient(180deg,#fbf7ef,#f4ecdc)] [border-top:1px_solid_#ece0c8] text-[#3a342b]">
      <div
        className={`w-[min(100%_-_48px,1180px)] my-0 mx-auto py-[76px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:py-[54px] ${
          sideCard
            ? "grid grid-cols-[minmax(0,1fr)_minmax(0,500px)] [grid-template-areas:'copy_card'_'actions_card'] content-center gap-x-[56px] gap-y-[30px] max-[960px]:grid-cols-1 max-[960px]:[grid-template-areas:'copy'_'card'_'actions'] max-[960px]:gap-y-[28px]"
            : ""
        }`}
      >
        <div className="[grid-area:copy] self-end">
          <p className="m-0 mb-[12px] text-[length:12px] font-bold uppercase tracking-[0.18em] text-[#9a7530]">Pricing</p>
          <h2 id="service-pricing-heading" className="mt-0 mb-[14px] text-[#16130f] text-[length:clamp(28px,3vw,38px)] leading-[1.08] font-thin">
            {heading ?? `${entry.service} Pricing in Sarasota, FL`}
          </h2>
          <p className={`mt-0 ${sideCard ? "mb-0" : "mb-[30px]"} max-w-[760px] text-[length:17px] leading-[1.6] text-[#514a40] max-[720px]:text-[length:16px]`}>
            {intro ??
              (hasPrices
                ? `Here is our regular pricing for ${entry.service} at Harmony Med Spa in Sarasota's Gulf Gate area. Review your options, then book online or ask for a quote built around your goals.`
                : `${entry.service} at Harmony Med Spa is planned around your goals, so pricing is confirmed after a consultation. Request personalized pricing and our Sarasota team will follow up, or book your visit online.`)}
          </p>

          {hasPrices && !sideCard ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[22px] mb-[34px]">{groupCards}</div>
          ) : null}
        </div>

        {sideCard ? <div className="[grid-area:card] self-center">{groupCards}</div> : null}

        <div className="[grid-area:actions] self-start">
          <div className="flex flex-wrap gap-[12px]">
            {leadWithBooking ? (
              <>
                {bookOnline}
                {viewPricing}
                {requestPricing}
              </>
            ) : (
              <>
                {requestPricing}
                {bookOnline}
                {viewPricing}
              </>
            )}
          </div>

          <p className="mt-[24px] mb-0 max-w-[760px] text-[length:13px] leading-[1.6] text-[#7a705f]">{PRICING_GENERAL_DISCLAIMER}</p>
        </div>
      </div>
    </section>
  );
}
