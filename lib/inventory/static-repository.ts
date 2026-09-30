import { categories } from "@/data/categories";
import { inventory } from "@/data/inventory";
import type { Locale } from "@/lib/i18n/config";
import type { InventoryRepository } from "./repository";
import { categoryFamily, filterInventory, sortInventory } from "./search";
import type { EquipmentItem, InventoryQuery, LocalizedEquipment } from "./types";

/** Merge translated fields and drop internal-only fields. */
export function localize(item: EquipmentItem, lang: Locale): LocalizedEquipment {
  const { translations, serialNumber: _serial, ...base } = item;
  void _serial;
  const t = lang === "en" ? undefined : translations?.[lang];
  if (!t) return base;
  return {
    ...base,
    title: t.title ?? base.title,
    shortDescription: t.shortDescription ?? base.shortDescription,
    description: t.description ?? base.description,
    features: t.features ?? base.features,
    conditionNotes: t.conditionNotes ?? base.conditionNotes,
    // If only the title was translated, drop the English SEO strings so pages
    // fall back to the translated title instead of mixing languages.
    seoTitle: t.seoTitle ?? (t.title ? null : base.seoTitle),
    seoDescription: t.seoDescription ?? (t.title ? null : base.seoDescription),
  };
}

/** Reads from data/inventory.ts. Replace with a database-backed repository later. */
export class StaticInventoryRepository implements InventoryRepository {
  async getInventory(lang: Locale) {
    return sortInventory(
      inventory.map((i) => localize(i, lang)),
      "newest",
      categories,
    );
  }

  async getFeaturedInventory(lang: Locale, limit = 6) {
    const all = await this.getInventory(lang);
    const visible = all.filter((i) => i.availability !== "sold");
    const featured = visible.filter((i) => i.featured);
    const rest = visible.filter((i) => !i.featured);
    return [...featured, ...rest].slice(0, limit);
  }

  async getEquipmentBySlug(lang: Locale, slug: string) {
    const item = inventory.find((i) => i.slug === slug);
    return item ? localize(item, lang) : null;
  }

  async getCategories() {
    return categories;
  }

  async getCategoryBySlug(slug: string) {
    return categories.find((c) => c.slug === slug) ?? null;
  }

  async getInventoryByCategory(lang: Locale, categorySlug: string) {
    const family = categoryFamily(categorySlug, categories);
    return (await this.getInventory(lang)).filter((i) => family.includes(i.category));
  }

  async searchInventory(lang: Locale, query: InventoryQuery) {
    return filterInventory(await this.getInventory(lang), query, categories);
  }

  async getCategoryCounts() {
    const counts: Record<string, number> = {};
    for (const c of categories) {
      const family = categoryFamily(c.slug, categories);
      counts[c.slug] = inventory.filter((i) => family.includes(i.category) && i.availability !== "sold").length;
    }
    return counts;
  }
}
