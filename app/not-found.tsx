import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[var(--black)] px-6 py-24 text-center text-white">
      <div className="mx-auto w-[min(560px,100%)]">
        <p className="mb-4 text-[length:14px] uppercase tracking-[0.28em] text-[var(--gold)]">
          Error 404
        </p>
        <h1 className="mb-5 text-[length:clamp(34px,5vw,52px)] leading-[1.05] font-thin">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mb-9 max-w-[420px] text-[length:17px] leading-[1.7] text-white/75">
          The page you&apos;re looking for may have moved or no longer exists.
          Let&apos;s get you back to Harmony Med Spa.
        </p>
        <Link
          href="/"
          className="inline-flex min-w-[140px] justify-center border-y border-[var(--gold)] px-[22px] py-[13px] text-[length:16px]"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
