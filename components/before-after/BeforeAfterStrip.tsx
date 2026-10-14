import Link from "next/link";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { BEFORE_AFTER_CATEGORIES, beforeAfterImages, casesFor, type BeforeAfterCategoryId } from "@/lib/data/beforeAfter";

/** Three comparison sliders from one treatment, with a link to the rest of the gallery. */
export default function BeforeAfterStrip({ category, heading }: { category: BeforeAfterCategoryId; heading?: string }) {
  const meta = BEFORE_AFTER_CATEGORIES.find((item) => item.id === category);
  const cases = casesFor(category).slice(0, 3);
  if (!meta || cases.length === 0) return null;

  return (
    <section aria-labelledby={`results-${category}`} className="bg-[#fff] [border-top:1px_solid_#ece0c8]">
      <div className="w-[min(100%_-_48px,1180px)] mx-auto py-[76px] max-[720px]:w-[min(100%_-_32px,640px)] max-[720px]:py-[54px]">
        <div className="flex flex-wrap items-end justify-between gap-x-[32px] gap-y-[18px] mb-[30px]">
          <div className="max-w-[640px]">
            <p className="m-0 mb-[12px] text-[length:12px] font-bold uppercase tracking-[0.18em] text-[#9a7530]">Real results</p>
            <h2 id={`results-${category}`} className="m-0 mb-[12px] text-[#16130f] text-[length:clamp(28px,3vw,38px)] leading-[1.08] font-thin">
              {heading ?? `${meta.label} Before & After`}
            </h2>
            <p className="m-0 text-[length:16px] leading-[1.6] text-[#514a40]">
              Harmony Med Spa patients, photographed before and after treatment. Drag the handle to compare. Individual results vary.
            </p>
          </div>
          <Link
            href={`/before-and-afters#${category}`}
            className="inline-flex items-center justify-center min-h-[48px] py-[12px] px-[24px] rounded-full [border:1px_solid_#c99b13] text-[#16130f] text-[length:15px] font-semibold no-underline [transition:background_200ms_ease,transform_200ms_ease] hover:bg-[#f6eedc] hover:-translate-y-[1px] max-[560px]:w-full"
          >
            See all {meta.label} results
          </Link>
        </div>

        <ul className="ba-grid">
          {cases.map((item) => {
            const images = beforeAfterImages(item);
            return (
              <li key={item.id} className="ba-card">
                <BeforeAfterSlider before={images.before} after={images.after} width={item.width} height={item.height} aspectRatio="4 / 5" label={`${meta.label} result`} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
