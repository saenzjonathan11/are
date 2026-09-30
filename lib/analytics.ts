/**
 * Analytics + conversion tracking. Safe to call anywhere on the client.
 * Every integration is a no-op until its ID is set (see .env.example).
 *
 *   GTM / GA4:   events are pushed to dataLayer and sent via gtag
 *   Google Ads:  conversions fire when NEXT_PUBLIC_GOOGLE_ADS_ID and a label exist
 *   Meta Pixel:  standard Lead / Contact events
 *   CRM:         lead submissions reach a CRM server-side via LEAD_WEBHOOK_URL
 */

export type AnalyticsEvent =
  | "click_phone"
  | "click_directions"
  | "click_email"
  | "view_equipment"
  | "search_inventory"
  | "submit_quote_request"
  | "submit_equipment_request"
  | "submit_sell_equipment";

type Params = Record<string, string | number | boolean | undefined>;

type TrackingWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

const conversionEvents: AnalyticsEvent[] = [
  "click_phone",
  "submit_quote_request",
  "submit_equipment_request",
  "submit_sell_equipment",
];

const metaEventMap: Partial<Record<AnalyticsEvent, string>> = {
  click_phone: "Contact",
  click_email: "Contact",
  submit_quote_request: "Lead",
  submit_equipment_request: "Lead",
  submit_sell_equipment: "Lead",
  view_equipment: "ViewContent",
  search_inventory: "Search",
};

function adsLabels(): Record<string, string> {
  try {
    return JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_ADS_LABELS || "{}");
  } catch {
    return {};
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  w.gtag?.("event", event, params);

  const metaEvent = metaEventMap[event];
  if (metaEvent) w.fbq?.("track", metaEvent, params);

  if (conversionEvents.includes(event)) {
    const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
    const label = adsLabels()[event];
    if (adsId && label) w.gtag?.("event", "conversion", { send_to: `${adsId}/${label}` });
  }

  if (process.env.NODE_ENV === "development") console.debug("[track]", event, params);
}
