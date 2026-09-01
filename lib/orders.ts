/**
 * Recent add-to-cart volume by product. The demo store has no order database;
 * in production this is a query against the last N days of orders.
 */
const RECENT_ADD_TO_CART: Record<string, number> = {
  "potting-mix": 412,
  "terracotta-planter": 388,
  "pruning-shears": 301,
  "hanging-macrame": 244,
  "ceramic-planter-white": 197,
  "grow-light": 163,
  "watering-can-copper": 121,
  "moss-pole": 88,
};

export async function recentAddToCartCounts(days: number): Promise<Record<string, number>> {
  if (days <= 0) return {};
  return RECENT_ADD_TO_CART;
}
