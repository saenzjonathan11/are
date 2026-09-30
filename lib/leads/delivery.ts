import "server-only";
import { business } from "@/config/business";
import type { LeadMeta, LeadType } from "./schema";

/**
 * Where form submissions go. Each adapter runs only when its env vars are set.
 *
 *   Email (Resend):  RESEND_API_KEY, LEAD_TO_EMAIL, optional LEAD_FROM_EMAIL
 *   Webhook:         LEAD_WEBHOOK_URL (Zapier, Make, n8n, a CRM, Google Sheets via Apps Script)
 *
 * With nothing configured, leads are logged to the server console and the
 * visitor is told the form isn't connected yet, so no lead is silently lost.
 */

export type Lead = {
  type: LeadType;
  fields: Record<string, string>;
  meta: LeadMeta;
  receivedAt: string;
};

const typeLabels: Record<LeadType, string> = {
  inquiry: "Equipment inquiry",
  request: "Equipment request",
  sell: "Sell equipment",
};

export function leadSubject(lead: Lead) {
  const what =
    lead.meta.itemTitle || lead.fields.equipment || lead.fields.equipmentType || "website message";
  return `[Website] ${typeLabels[lead.type]}: ${what}`.slice(0, 180);
}

export function leadText(lead: Lead) {
  const lines = [
    `${typeLabels[lead.type]} from the ${business.businessName} website`,
    `Received: ${lead.receivedAt}`,
    "",
    ...Object.entries(lead.fields)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`),
    "",
    lead.meta.itemId ? `Listing ID: ${lead.meta.itemId}` : null,
    lead.meta.itemSku ? `SKU: ${lead.meta.itemSku}` : null,
    lead.meta.itemTitle ? `Listing: ${lead.meta.itemTitle}` : null,
    lead.meta.pagePath ? `Page: ${lead.meta.pagePath}` : null,
    lead.meta.lang ? `Language: ${lead.meta.lang}` : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

async function sendResend(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!key || !to) return null;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "Website Leads <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.fields.email || undefined,
      subject: leadSubject(lead),
      text: leadText(lead),
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${await res.text()}`);
  return true;
}

async function sendWebhook(lead: Lead) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, subject: leadSubject(lead) }),
  });
  if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
  return true;
}

/** Returns true if at least one adapter delivered the lead. Throws if all configured adapters failed. */
export async function deliverLead(lead: Lead): Promise<boolean> {
  const adapters = [sendResend, sendWebhook];
  const results = await Promise.allSettled(adapters.map((a) => a(lead)));
  const configured = results.filter((r) => !(r.status === "fulfilled" && r.value === null));
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

  for (const r of results) if (r.status === "rejected") console.error("[leads]", r.reason);

  if (configured.length === 0) {
    console.info("[leads] No delivery configured. Lead logged only:\n" + leadText(lead));
    return false;
  }
  if (!delivered) throw new Error("All lead delivery adapters failed");
  return true;
}
