/**
 * SITE CONFIGURATION
 * Environment-driven settings. Nothing here is required to run the site locally.
 * See .env.example for every variable.
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  // Vercel sets these automatically, so previews get correct absolute URLs.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const site = {
  url: resolveSiteUrl(),

  /**
   * Search engines are told NOT to index the site until this is "true".
   * Keep it off while the site lives on a temporary vercel.app preview URL,
   * then turn it on after the real domain is connected.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",

  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || null,
    googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || null,
    /** Map of conversion event name to Google Ads conversion label, as JSON. */
    googleAdsLabels: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABELS || null,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
  },

  spam: {
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null,
  },
} as const;
