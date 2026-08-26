import { redirect } from "next/navigation";
import { ONLINE_BOOKING_URL } from "@/lib/constants";

// The former /book-now page was a non-functional mock of the PatientNow
// booking widget. Every booking CTA now points at the official PatientNow
// URL; this route redirects there so any bookmarked/external /book-now links
// still reach the real booking flow.
export default function BookNowPage() {
  redirect(ONLINE_BOOKING_URL);
}
