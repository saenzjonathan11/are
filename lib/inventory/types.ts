import type { Locale } from "@/lib/i18n/config";

export type Condition = "new" | "used" | "refurbished" | "scratch-and-dent";

/**
 * "call-to-confirm" is used when a listing exists but current availability
 * has not been verified (for example, items pulled from older Facebook posts).
 */
export type Availability = "available" | "reserved" | "sold" | "call-to-confirm";

export type GasType = "natural" | "propane" | "dual" | null;

export type EquipmentImage = {
  /** Path under /public, or an absolute URL whose host is allowed in next.config.ts */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Dimensions = {
  width: number | null;
  depth: number | null;
  height: number | null;
  unit: "in" | "cm";
};

export type Specification = { label: string; value: string };

/** Fields that can be translated per locale. English lives on the item itself. */
export type TranslatableFields = {
  title: string;
  shortDescription: string | null;
  description: string | null;
  features: string[];
  conditionNotes: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type EquipmentItem = TranslatableFields & {
  id: string;
  slug: string;
  sku: string | null;
  /** Category slug from data/categories.ts */
  category: string;
  subcategory: string | null;
  brand: string | null;
  model: string | null;
  /** Internal. Never rendered publicly. */
  serialNumber: string | null;
  condition: Condition;
  /** Price in US dollars. null shows "Call for price". */
  price: number | null;
  /** Optional override text, e.g. "$1,200 each" or "Make an offer". */
  priceDisplay: string | null;
  specifications: Specification[];
  dimensions: Dimensions | null;
  powerRequirements: string | null;
  gasType: GasType;
  images: EquipmentImage[];
  videoUrl: string | null;
  availability: Availability;
  quantity: number | null;
  /** Defaults to the business city when null. */
  location: string | null;
  /** null = unknown, falls back to business config. */
  deliveryAvailable: boolean | null;
  shippingAvailable: boolean | null;
  warranty: string | null;
  featured: boolean;
  /** ISO date the listing was added to the website */
  dateAdded: string;
  dateUpdated: string;
  tags: string[];
  translations?: Partial<Record<Exclude<Locale, "en">, Partial<TranslatableFields>>>;
};

/** Item with translatable fields resolved for one locale. Safe to send to the client. */
export type LocalizedEquipment = Omit<EquipmentItem, "translations" | "serialNumber">;

export type Category = {
  slug: string;
  /** Parent category slug. Items in a child also appear on the parent's page. */
  parent: string | null;
  icon: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
};

export type InventoryQuery = {
  q?: string;
  category?: string;
  condition?: Condition[];
  brand?: string[];
  availability?: Availability[];
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
};

export type SortKey = "newest" | "price-asc" | "price-desc" | "category";
