import { attributionFields, referrerSource } from "./analytics/attribution";
import { confirmLeadResponse } from "./analytics";
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
      ...attributionFields(),
      referrerSource: referrerSource(),
      "Page URL": window.location.href,
      "Lead Created At": new Date().toISOString(),
      "Email Sent Status": "Pending",
      "SMS Sent Status": "Pending"
    })
  });

  return confirmLeadResponse(response);
}

export async function submitLeadPayload(payload: Record<string, unknown>) {
  const response = await fetch(CONTACT_WEBHOOK_URL, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, ...attributionFields(), referrerSource: referrerSource() }),
  });
  return confirmLeadResponse(response);
}
