"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to the browser console for debugging/monitoring.
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[70vh] place-items-center bg-[var(--black)] px-6 py-24 text-center text-white">
      <div className="mx-auto w-[min(560px,100%)]">
        <p className="mb-4 text-[length:14px] uppercase tracking-[0.28em] text-[var(--gold)]">
          Something went wrong
        </p>
        <h1 className="mb-5 text-[length:clamp(30px,4.5vw,46px)] leading-[1.05] font-thin">
          We hit an unexpected error
        </h1>
        <p className="mx-auto mb-9 max-w-[420px] text-[length:17px] leading-[1.7] text-white/75">
          Please try again. If the problem continues, contact us directly and
          we&apos;ll help you out.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-w-[140px] cursor-pointer justify-center border-y border-[var(--gold)] bg-transparent px-[22px] py-[13px] text-[length:16px] text-white"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-w-[140px] justify-center border-y border-white/40 px-[22px] py-[13px] text-[length:16px]"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
