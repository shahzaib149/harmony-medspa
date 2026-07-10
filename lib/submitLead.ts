import { CONTACT_WEBHOOK_URL } from "@/lib/constants";

export type LeadFields = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: string;
  treatmentInterest?: string;
};

export function formatUsPhoneE164(value: string) {
  const digits = value.replace(/\D/g, "");
  const nationalNumber = digits.startsWith("1") && digits.length >= 11 ? digits.slice(1) : digits;

  if (!nationalNumber) {
    return "";
  }

  return `+1${nationalNumber.slice(-10)}`;
}

export async function submitLead(fields: LeadFields) {
  const params = new URLSearchParams(window.location.search);

  const response = await fetch(CONTACT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Name: fields.name.trim(),
      Email: fields.email.trim(),
      Phone: formatUsPhoneE164(fields.phone),
      Message: fields.message?.trim() ?? "",
      Source: fields.source,
      Status: "New",
      "Treatment Interest": fields.treatmentInterest ?? "",
      "UTM Source": params.get("utm_source") ?? "",
      "UTM Campaign": params.get("utm_campaign") ?? "",
      "UTM Medium": params.get("utm_medium") ?? "",
      "Page URL": window.location.href,
      "Lead Created At": new Date().toISOString(),
      "Email Sent Status": "Pending",
      "SMS Sent Status": "Pending"
    })
  });

  if (!response.ok) {
    throw new Error("Webhook request failed");
  }
}
