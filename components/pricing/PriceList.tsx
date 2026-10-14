import Link from "next/link";
import type { PriceItem } from "@/lib/data/pricing";

/**
 * Treatment name / price rows as indexable text. With `linkItems`, an item that has its own
 * service page links to it with the treatment name as the link text.
 */
export default function PriceList({ items, linkItems = true }: { items: PriceItem[]; linkItems?: boolean }) {
  return (
    <dl className="grid gap-0 m-0">
      {items.map((item, index) => (
        <div
          key={item.name}
          className={`grid grid-cols-[1fr_auto] items-baseline gap-[16px] py-[12px] ${index > 0 ? "[border-top:1px_solid_#efe6d3]" : ""}`}
        >
          <dt className="text-[length:16px] leading-[1.35] text-[#3a342b]">
            {linkItems && item.href ? (
              <Link href={item.href} className="text-inherit underline decoration-[#d9c497] underline-offset-[3px] hover:text-[#9a7530]">
                {item.name}
              </Link>
            ) : (
              item.name
            )}
            {item.note ? <span className="block text-[length:13px] text-[#8a8071]">{item.note}</span> : null}
          </dt>
          <dd className="m-0 text-[length:17px] font-semibold text-[#16130f] whitespace-nowrap">{item.price}</dd>
        </div>
      ))}
    </dl>
  );
}
