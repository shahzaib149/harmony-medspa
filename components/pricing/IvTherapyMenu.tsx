import { IV_CLINICAL_DISCLAIMER, IV_INFUSIONS } from "@/lib/data/pricing";

/** The clinical IV menu as text: each infusion's price, delivery, ingredients and add-on, then the clinical disclaimer. */
export default function IvTherapyMenu({ columns = 3 }: { columns?: 1 | 3 }) {
  return (
    <>
      <div className={`grid gap-[20px] ${columns === 3 ? "grid-cols-3 max-[900px]:grid-cols-1" : "grid-cols-1"}`}>
        {IV_INFUSIONS.map((infusion) => (
          <article key={infusion.name} className="grid [align-content:start] p-[24px] rounded-[16px] bg-[#fbf7ef] [border:1px_solid_#ece0c8]">
            <div className="flex items-baseline justify-between gap-[12px]">
              <h3 className="m-0 text-[length:19px] leading-[1.2] font-semibold text-[#16130f]">{infusion.name}</h3>
              <span className="text-[length:18px] font-semibold text-[#16130f] whitespace-nowrap">{infusion.price}</span>
            </div>
            <p className="mt-[8px] mb-[2px] text-[length:15px] leading-[1.45] text-[#5b513f]">{infusion.summary}</p>
            <p className="mt-0 mb-[14px] text-[length:13px] text-[#8a8071]">{infusion.delivery}</p>
            <p className="mt-0 mb-[8px] text-[length:12px] font-bold uppercase tracking-[0.14em] text-[#9a7530]">Ingredients</p>
            <ul className="grid gap-[10px] list-none p-0 m-0">
              {infusion.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="text-[length:14px] leading-[1.45] text-[#4f4738]">
                  <strong className="font-semibold text-[#16130f]">{ingredient.name}:</strong> {ingredient.benefit}
                </li>
              ))}
            </ul>
            {infusion.addOn ? <p className="mt-[14px] mb-0 text-[length:13px] italic text-[#6b6151]">{infusion.addOn}</p> : null}
          </article>
        ))}
      </div>
      <p className="mt-[22px] mb-0 text-[length:13px] leading-[1.6] text-[#6f6757]">{IV_CLINICAL_DISCLAIMER}</p>
    </>
  );
}
