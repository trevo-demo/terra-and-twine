// Server-side shipping rules. The storefront intentionally does NOT show
// these numbers before checkout — shipping is revealed on the checkout page.
import { trevoServer } from "./trevo-server";

const THRESHOLDS_CENTS = { control: 5000, "threshold-40": 4000 } as const;
export type ShippingVariant = keyof typeof THRESHOLDS_CENTS;
export const FLAT_SHIPPING_FEE_CENTS = 599; // otherwise $5.99 flat

// Experiment: free-shipping-threshold-40. Resolved once per request from the
// visitor identity so the cart copy and the checkout quote always agree.
export function shippingVariant(anonymousId: string | undefined): ShippingVariant {
  const trevo = trevoServer();
  if (!trevo || !anonymousId) return "control";
  const v = trevo.getVariant("free-shipping-threshold-40", { anonymousId });
  return v in THRESHOLDS_CENTS ? (v as ShippingVariant) : "control";
}

export interface ShippingQuote {
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  freeShippingApplied: boolean;
  centsToFreeShipping: number; // 0 when free shipping applies
}

export function quoteShipping(
  subtotalCents: number,
  variant: ShippingVariant = "control",
): ShippingQuote {
  const threshold = THRESHOLDS_CENTS[variant];
  const freeShippingApplied = subtotalCents >= threshold;
  const shippingCents = freeShippingApplied ? 0 : FLAT_SHIPPING_FEE_CENTS;
  return {
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
    freeShippingApplied,
    centsToFreeShipping: freeShippingApplied ? 0 : threshold - subtotalCents,
  };
}
