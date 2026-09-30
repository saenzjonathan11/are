import type { InventoryRepository } from "./repository";
import { StaticInventoryRepository } from "./static-repository";

/**
 * Swap this line to change where inventory comes from, e.g.
 *   export const inventoryRepo: InventoryRepository = new SupabaseInventoryRepository();
 */
export const inventoryRepo: InventoryRepository = new StaticInventoryRepository();

export type { InventoryRepository } from "./repository";
export * from "./types";
