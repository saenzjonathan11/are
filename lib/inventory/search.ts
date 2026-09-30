import { normalize } from "@/lib/utils";
import type { Category, InventoryQuery, LocalizedEquipment } from "./types";

/**
 * Pure filter/sort logic. Shared by the server repository and the
 * client-side inventory browser so results always match.
 */

/** Category slug plus all child slugs. */
export function categoryFamily(slug: string, categories: Category[]): string[] {
  return [slug, ...categories.filter((c) => c.parent === slug).map((c) => c.slug)];
}

function haystack(item: LocalizedEquipment, categories: Category[]) {
  const cat = categories.find((c) => c.slug === item.category);
  return normalize(
    [
      item.title,
      item.brand,
      item.model,
      item.sku,
      item.id,
      item.subcategory,
      item.shortDescription,
      cat?.name.en,
      cat?.name.es,
      ...item.tags,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function tokenMatches(hay: string, token: string) {
  if (hay.includes(token)) return true;
  // Simple plural handling: "fryers" -> "fryer", "refrigeradores" -> "refrigerador"
  if (token.length > 4 && token.endsWith("es") && hay.includes(token.slice(0, -2))) return true;
  if (token.length > 3 && token.endsWith("s") && hay.includes(token.slice(0, -1))) return true;
  return false;
}

export function filterInventory(
  items: LocalizedEquipment[],
  query: InventoryQuery,
  categories: Category[],
): LocalizedEquipment[] {
  const tokens = query.q ? normalize(query.q).split(/\s+/).filter(Boolean) : [];
  const family = query.category ? categoryFamily(query.category, categories) : null;

  const result = items.filter((item) => {
    if (family && !family.includes(item.category)) return false;
    if (query.condition?.length && !query.condition.includes(item.condition)) return false;
    if (query.brand?.length && (!item.brand || !query.brand.includes(item.brand))) return false;
    if (query.availability?.length && !query.availability.includes(item.availability)) return false;
    if (query.minPrice != null && (item.price == null || item.price < query.minPrice)) return false;
    if (query.maxPrice != null && (item.price == null || item.price > query.maxPrice)) return false;
    if (tokens.length) {
      const hay = haystack(item, categories);
      if (!tokens.every((t) => tokenMatches(hay, t))) return false;
    }
    return true;
  });

  return sortInventory(result, query.sort ?? "newest", categories);
}

export function sortInventory(
  items: LocalizedEquipment[],
  sort: NonNullable<InventoryQuery["sort"]>,
  categories: Category[],
) {
  const copy = [...items];
  const byNewest = (a: LocalizedEquipment, b: LocalizedEquipment) =>
    b.dateAdded.localeCompare(a.dateAdded) || a.id.localeCompare(b.id);
  switch (sort) {
    case "price-asc":
    case "price-desc": {
      const dir = sort === "price-asc" ? 1 : -1;
      // Items without a price always sort last
      return copy.sort((a, b) => {
        if (a.price == null && b.price == null) return byNewest(a, b);
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return (a.price - b.price) * dir;
      });
    }
    case "category": {
      const order = (slug: string) => categories.findIndex((c) => c.slug === slug);
      return copy.sort((a, b) => order(a.category) - order(b.category) || byNewest(a, b));
    }
    default:
      return copy.sort(byNewest);
  }
}
