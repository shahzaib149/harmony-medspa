import { Search } from "lucide-react";

const searchClassName = "about-search flex items-center h-[56px] mb-[12px] py-0 pr-[20px] pl-[24px] [border:1px_solid_#c8d2dd] rounded-[8px] text-[var(--gold)] bg-[#fff] [&_input]:min-w-[0] [&_input]:flex-1 [&_input]:border-0 [&_input]:[outline:0] [&_input]:text-[#344356] [&_input]:bg-[transparent] [&_input]:[font:inherit] [&_input::placeholder]:text-[#425263] [&_input::placeholder]:opacity-[0.9] max-[1050px]:col-[1_/_-1]";

export default function BlogSearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/blog" method="get" role="search" className={searchClassName}>
      <label className="contents">
        <span className="sr-only">Search blog articles</span>
        <input name="search" type="search" defaultValue={defaultValue} placeholder="Enter search keyword" />
      </label>
      <button type="submit" aria-label="Search blog articles" className="grid shrink-0 place-items-center border-0 bg-transparent p-0 text-[var(--gold)]">
        <Search size={18} />
      </button>
    </form>
  );
}
