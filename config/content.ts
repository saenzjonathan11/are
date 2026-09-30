/**
 * MARKETING CONTENT SWITCHES
 * ----------------------------------------------------------------------------
 * Trust signals render ONLY when real data is entered here.
 * Never enter estimates or placeholders. Leave null until verified.
 */

export const trust = {
  /** e.g. { rating: 4.8, reviewCount: 57, url: "https://g.page/..." } from Google Business Profile */
  googleReviews: null as null | { rating: number; reviewCount: number; url: string },

  /** Real customer quotes with permission to publish. */
  testimonials: [] as { quote: string; name: string; business?: string }[],

  /** e.g. 2012. Years in business is calculated from this. */
  foundedYear: null as number | null,

  /** e.g. "1,200+". Only use a number the owner can back up. */
  customersServed: null as string | null,

  /** Plain-language description of how used equipment is tested before sale. */
  inspectionProcess: null as string | null,
};

/**
 * "Why buy from us" points. Each one maps to copy in the dictionaries
 * (lib/i18n/dictionaries/*.ts, key `whyBuy.points`).
 *
 * These are limited to facts already known: a physical Farmers Branch location,
 * new and used stock, and a phone line. Set `enabled: false` to hide one.
 */
export const whyBuyPoints = [
  { key: "local", enabled: true },
  { key: "inPerson", enabled: true },
  { key: "newUsed", enabled: true },
  { key: "direct", enabled: true },
] as const;

/** Category slugs featured on the homepage, in order. */
export const featuredCategorySlugs = [
  "refrigeration",
  "freezers",
  "cooking-equipment",
  "meat-processing",
  "food-preparation",
  "prep-tables",
  "ice-machines",
  "stainless-steel",
];

/**
 * Optional "Our story" paragraph for the About page, per language.
 * Hidden while null. TODO(owner): a few sentences on when and why the business started.
 */
export const aboutStory: { en: string | null; es: string | null } = { en: null, es: null };
