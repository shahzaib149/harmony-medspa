// Reactivation emails link here. The CRM owns the signing secret and the patient
// records, so this site only asks it to check a link and to record the opt-out.
const CRM_ORIGIN = (process.env.HARMONY_CRM_URL || "https://crm.harmonymedspafl.com").replace(/\/$/, "");

function endpoint(patientId: string, token: string) {
  return `${CRM_ORIGIN}/api/reactivation/unsubscribe?${new URLSearchParams({ p: patientId, t: token })}`;
}

export function isWellFormed(patientId: unknown, token: unknown): patientId is string {
  return typeof patientId === "string" && typeof token === "string" && /^rec[a-zA-Z0-9]{14}$/.test(patientId) && /^[a-f0-9]{64}$/i.test(token);
}

export async function checkUnsubscribeLink(patientId: string, token: string): Promise<"valid" | "invalid" | "unavailable"> {
  try {
    const response = await fetch(endpoint(patientId, token), { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!response.ok) return "unavailable";
    const body = (await response.json()) as { valid?: boolean };
    return body.valid ? "valid" : "invalid";
  } catch {
    return "unavailable";
  }
}

export async function confirmUnsubscribe(patientId: string, token: string): Promise<"done" | "invalid" | "error"> {
  try {
    const response = await fetch(endpoint(patientId, token), { method: "POST", cache: "no-store", signal: AbortSignal.timeout(20000) });
    if (response.ok) return "done";
    return response.status === 400 ? "invalid" : "error";
  } catch {
    return "error";
  }
}
