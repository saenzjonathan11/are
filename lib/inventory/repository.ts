import type { Locale } from "@/lib/i18n/config";
import type { Category, InventoryQuery, LocalizedEquipment } from "./types";

/**
 * The only way pages read inventory.
 *
 * To move off the static file, write a new class that implements this interface
 * (Supabase, Postgres, Airtable, Google Sheets, Shopify, Odoo, etc.) and export
 * it from lib/inventory/index.ts. No page or component needs to change.
 */
export interface InventoryRepository {
  getInventory(lang: Locale): Promise<LocalizedEquipment[]>;
  getFeaturedInventory(lang: Locale, limit?: number): Promise<LocalizedEquipment[]>;
  getEquipmentBySlug(lang: Locale, slug: string): Promise<LocalizedEquipment | null>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getInventoryByCategory(lang: Locale, categorySlug: string): Promise<LocalizedEquipment[]>;
  searchInventory(lang: Locale, query: InventoryQuery): Promise<LocalizedEquipment[]>;
  getCategoryCounts(): Promise<Record<string, number>>;
}
