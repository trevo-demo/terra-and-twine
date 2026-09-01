import { cookies } from "next/headers";
import { getProduct, type Product } from "./products";
import { trevoServer } from "./trevo-server";

const BUNDLE_DISCOUNT = 0.2; // Experiment: cart-bundle-offer-server

export const CART_COOKIE = "cart";

export type Cart = Record<string, number>; // slug -> quantity

export interface CartLine {
  product: Product;
  quantity: number;
}

export function parseCart(raw: string | undefined): Cart {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const cart: Cart = {};
    for (const [slug, qty] of Object.entries(parsed)) {
      if (typeof qty === "number" && qty > 0 && getProduct(slug)) {
        cart[slug] = Math.min(Math.floor(qty), 99);
      }
    }
    return cart;
  } catch {
    return {};
  }
}

export async function readCart(): Promise<Cart> {
  const jar = await cookies();
  return parseCart(jar.get(CART_COOKIE)?.value);
}

export function cartLines(cart: Cart): CartLine[] {
  return Object.entries(cart).flatMap(([slug, quantity]) => {
    const product = getProduct(slug);
    return product ? [{ product, quantity }] : [];
  });
}

export interface BundleOffer {
  product: Product;
  discountCents: number;
}

// Potting mix at 20% off while a planter is in the cart, for the variant arm.
export function bundleOffer(cart: Cart, anonymousId: string | undefined): BundleOffer | null {
  const trevo = trevoServer();
  if (!trevo || !anonymousId) return null;
  if (trevo.getVariant("cart-bundle-offer-server", { anonymousId }) !== "bundle") return null;
  const hasPlanter = cartLines(cart).some((l) => l.product.category === "planters");
  const mix = getProduct("potting-mix");
  if (!hasPlanter || !mix || cart[mix.slug]) return null;
  return { product: mix, discountCents: Math.round(mix.price * BUNDLE_DISCOUNT) };
}

export function cartTotal(cart: Cart): number {
  return cartLines(cart).reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
}

export function cartCount(cart: Cart): number {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}
