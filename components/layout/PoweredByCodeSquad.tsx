import Image from "next/image";

type PoweredByCodeSquadProps = {
  className?: string;
};

export default function PoweredByCodeSquad({ className = "" }: PoweredByCodeSquadProps) {
  return (
    <a
      href="https://codesquad.ai"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Managed by CodeSquad — visit codesquad.ai"
      className={`group inline-flex w-fit items-center gap-2.5 no-underline ${className}`}
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#858585] transition-colors group-hover:text-[#b5b5b5]">
        Managed by
      </span>
      <Image
        src="/images/footer/codesquad-logo.png"
        alt="CodeSquad"
        width={135}
        height={25}
        className="h-[22px] w-auto opacity-100"
      />
    </a>
  );
}
