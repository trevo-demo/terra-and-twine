import { PRODUCTS, type Product } from "./products";
import { recentAddToCartCounts } from "./orders";

// Popularity, discounted when stock is low enough that a sale is a risk.
export async function rankedProducts(): Promise<Product[]> {
  const counts = await recentAddToCartCounts(14);
  return [...PRODUCTS].sort((a, b) => score(b, counts) - score(a, counts));
}

function score(product: Product, counts: Record<string, number>): number {
  const popularity = counts[product.slug] ?? 0;
  const stockPenalty = product.stock < 10 ? 0.5 : 1;
  return popularity * stockPenalty;
}
