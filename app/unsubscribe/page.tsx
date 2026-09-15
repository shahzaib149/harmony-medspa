import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { checkUnsubscribeLink, confirmUnsubscribe, isWellFormed } from "@/lib/unsubscribe";

export const metadata: Metadata = {
  title: "Email Preferences",
  robots: { index: false, follow: false },
};

type Search = Promise<{ p?: string | string[]; t?: string | string[]; status?: string | string[] }>;

// Opening the link never unsubscribes on its own: mail scanners follow links,
// so the change only happens when the patient presses the button.
async function unsubscribe(formData: FormData) {
  "use server";
  const patientId = formData.get("p");
  const token = formData.get("t");
  if (!isWellFormed(patientId, token)) redirect("/unsubscribe?status=invalid");
  const result = await confirmUnsubscribe(patientId, token as string);
  if (result === "done") redirect("/unsubscribe?status=done");
  if (result === "invalid") redirect("/unsubscribe?status=invalid");
  redirect(`/unsubscribe?${new URLSearchParams({ p: patientId, t: token as string, status: "error" })}`);
}

export default async function UnsubscribePage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const one = (value: string | string[] | undefined) => (typeof value === "string" ? value : undefined);
  const patientId = one(params.p);
  const token = one(params.t);
  const status = one(params.status);

  const link = status === "done" || !isWellFormed(patientId, token) ? null : await checkUnsubscribeLink(patientId, token as string);
  const canConfirm = link === "valid";

  let eyebrow = "Email preferences";
  let title = "Unsubscribe from Harmony Med Spa emails";
  let body = "You'll stop receiving follow-up and promotional emails from us. Appointment confirmations and reminders from our booking system are not affected.";
  if (status === "done") {
    eyebrow = "All set";
    title = "You're unsubscribed";
    body = "We won't send you any more follow-up or promotional emails. If this was a mistake, give us a call and we'll add you back.";
  } else if (link === "unavailable") {
    title = "We couldn't load your preferences";
    body = "Please try this link again in a few minutes, or call us and we'll remove you from our emails right away.";
  } else if (!canConfirm) {
    title = "This link has expired or is incomplete";
    body = "Please use the unsubscribe link from your most recent email, or call us and we'll remove you from our emails right away.";
  }

  return (
    <main className="min-h-[100vh] bg-[#fff] text-[#111]">
      <SiteHeader className="contact-page-header" />

      <section className="grid [place-items:center] min-h-[210px] px-6 text-center [background:linear-gradient(rgba(0,0,0,0.62),rgba(0,0,0,0.62)),repeating-linear-gradient(26deg,rgba(255,255,255,0.035)_0_2px,transparent_2px_9px),linear-gradient(135deg,#252525,#111_52%,#242424)] max-[720px]:min-h-[170px]">
        <p className="m-0 text-[var(--gold)] text-[length:clamp(34px,3vw,48px)] leading-[1] font-thin lowercase">{eyebrow}</p>
      </section>

      <section className="w-[min(680px,calc(100%_-_48px))] mx-auto my-[76px] max-[720px]:w-[calc(100%_-_32px)] max-[720px]:my-[48px]" aria-labelledby="unsubscribe-title">
        <div className="bg-[#f4f4f4] px-[64px] py-[60px] text-center max-[720px]:px-[24px] max-[720px]:py-[42px]">
          <h1 id="unsubscribe-title" className="mt-0 mb-[18px] text-[#111] text-[length:clamp(28px,3vw,36px)] leading-[1.15] font-thin">{title}</h1>
          <p className="mx-auto mt-0 mb-0 max-w-[480px] text-[#3e3e3e] text-[length:16px] leading-[1.75]">{body}</p>

          {status === "error" && (
            <p role="alert" className="mx-auto mt-[24px] mb-0 max-w-[480px] border border-[#e7c3bd] bg-[#fbeeec] px-[16px] py-[12px] text-[#8a2f22] text-[length:14px] leading-[1.6]">
              We couldn&apos;t save your preference just now. Please try again in a moment.
            </p>
          )}

          {canConfirm && status !== "done" && (
            <form action={unsubscribe} className="mt-[34px]">
              <input type="hidden" name="p" value={patientId} />
              <input type="hidden" name="t" value={token} />
              <button type="submit" className="inline-flex min-w-[200px] justify-center border-y border-[var(--gold)] bg-transparent px-[26px] py-[14px] text-[#111] text-[length:15px] uppercase tracking-[0.22em] cursor-pointer transition-colors hover:bg-[var(--gold)] hover:text-[#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]">
                Unsubscribe
              </button>
            </form>
          )}

          <div className="mt-[34px] flex flex-wrap justify-center gap-x-[28px] gap-y-[10px] text-[length:14px] text-[#3e3e3e]">
            <a href="tel:9419238990" className="underline decoration-[var(--gold)] underline-offset-4 hover:text-[var(--gold)]">(941) 923-8990</a>
            <Link href="/" className="underline decoration-[var(--gold)] underline-offset-4 hover:text-[var(--gold)]">Return to Harmony Med Spa</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
