/**
 * BUSINESS CONFIGURATION
 * ----------------------------------------------------------------------------
 * Every business fact shown on the website comes from this file.
 *
 * Conventions:
 *   - `null` means UNKNOWN. The site hides anything that is null.
 *   - `false` means CONFIRMED NOT OFFERED.
 *   - `true` means CONFIRMED OFFERED.
 *
 * Do not set anything to `true` or fill in a value until the owner confirms it.
 * Items marked TODO(owner) are waiting on the owner discovery questionnaire.
 */

export type WeekdayHours = {
  /** Schema.org day name, e.g. "Monday" */
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  /** 24h "HH:MM", or null when closed / by appointment */
  opens: string | null;
  closes: string | null;
  byAppointment?: boolean;
};

export const business = {
  businessName: "Affordable Restaurant Equipment",

  /** TODO(owner): legal entity name (LLC, Inc., DBA) if different from the trade name. */
  legalName: null as string | null,

  /**
   * Address provided in the project brief.
   * TODO(owner): The business's 2025 Facebook flyers list "3350 E Belt Line Rd,
   * Dallas, TX 75234". Confirm the exact mailing/USPS address and make it match
   * the Google Business Profile exactly (important for local SEO).
   */
  address: {
    street: "3350 Belt Line Rd.",
    suite: "Suite B",
    city: "Farmers Branch",
    state: "TX",
    zip: "75234",
    country: "US",
  },

  /** Office phone, confirmed by the site builder's client on 2026-09-30. */
  phone: {
    display: "(214) 710-4873",
    /** E.164 format for tel: links and structured data */
    e164: "+12147104873",
  },

  /**
   * TODO(owner): a domain-based email (e.g. sales@yourdomain.com) looks more
   * credible than a free mailbox once the domain is purchased.
   */
  email: "are.dfwtx@mail.com",

  /** Logo used in structured data and share images. Provided by the client on 2026-09-30. */
  logo: "/images/logo/are-badge.png",

  /** Set automatically from NEXT_PUBLIC_SITE_URL. See config/site.ts. */
  website: null as string | null,

  /**
   * Hours as published on the business's Facebook flyers (early 2025):
   * Monday to Friday 10:00 AM to 6:00 PM, weekends by appointment.
   *
   * They are NOT shown on the site until `hoursConfirmed` is true, because
   * they may be out of date. While false, the site says
   * "Contact us for current showroom hours".
   * TODO(owner): confirm current hours, then set hoursConfirmed to true.
   */
  hoursConfirmed: false,
  hours: [
    { day: "Monday", opens: "10:00", closes: "18:00" },
    { day: "Tuesday", opens: "10:00", closes: "18:00" },
    { day: "Wednesday", opens: "10:00", closes: "18:00" },
    { day: "Thursday", opens: "10:00", closes: "18:00" },
    { day: "Friday", opens: "10:00", closes: "18:00" },
    { day: "Saturday", opens: null, closes: null, byAppointment: true },
    { day: "Sunday", opens: null, closes: null, byAppointment: true },
  ] satisfies WeekdayHours[],

  /**
   * Spanish-speaking staff. Source: business Facebook flyers ("Se Habla Español").
   * TODO(owner): confirm this is still true. Set to null to hide.
   */
  spanishSpoken: true as boolean | null,

  /** Social profiles. Links render only when a real URL is set. */
  social: {
    /** TODO(owner): the business Facebook page URL (photos came from it). */
    facebook: null as string | null,
    instagram: null as string | null,
    /** TODO(owner): Google Business Profile URL (share link from Google Maps). */
    googleBusinessProfile: null as string | null,
    youtube: null as string | null,
    tiktok: null as string | null,
  },

  /** Cities used in copy and structured data (areaServed). */
  serviceArea: ["Farmers Branch", "Dallas", "Carrollton", "Addison", "Irving", "Dallas-Fort Worth"],

  /**
   * What the business sells. Confirmed by client: new and used, primarily used.
   * Controls the hero headline ("Used & New ...").
   *   "used-and-new" | "new-and-used" | "used" | "new"
   */
  inventoryConditions: "used-and-new" as "used-and-new" | "new-and-used" | "used" | "new",

  /* ---------------------------------------------------------------------------
   * SERVICES: all unknown until the owner confirms. null = hidden.
   * ------------------------------------------------------------------------- */
  financingAvailable: null as boolean | null,
  deliveryAvailable: null as boolean | null,
  shippingAvailable: null as boolean | null,
  installationAvailable: null as boolean | null,
  repairAvailable: null as boolean | null,
  /** TODO(owner): e.g. "30-day parts warranty on used refrigeration". null hides warranty sections. */
  warrantyDescription: null as string | null,
  /** Whether the business buys used equipment. The Sell page never promises a purchase. */
  buysEquipment: null as boolean | null,
} as const;

export type Business = typeof business;

export const fullAddressLine = () => {
  const a = business.address;
  return `${a.street}${a.suite ? `, ${a.suite}` : ""}, ${a.city}, ${a.state} ${a.zip}`;
};

/** Google Maps search / directions links (no API key needed). */
export const mapsQuery = () =>
  encodeURIComponent(`${business.businessName}, ${fullAddressLine()}`);
export const directionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery()}`;
export const mapEmbedUrl = () => `https://www.google.com/maps?q=${mapsQuery()}&output=embed`;
export const telHref = () => (business.phone ? `tel:${business.phone.e164}` : null);
