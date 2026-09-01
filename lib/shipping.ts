// Server-side shipping rules. The storefront intentionally does NOT show
// these numbers before checkout — shipping is revealed on the checkout page.
import { trevoServer } from "./trevo-server";

export const FREE_SHIPPING_THRESHOLD_CENTS = 5000; // free shipping over $50
const FLAT_FEES_CENTS = { control: 599, "fee-449": 449 } as const; // Experiment: flat-shipping-fee-449-server
export type FeeVariant = keyof typeof FLAT_FEES_CENTS;

export function feeVariant(anonymousId: string | undefined): FeeVariant {
  const trevo = trevoServer();
  if (!trevo || !anonymousId) return "control";
  const v = trevo.getVariant("flat-shipping-fee-449-server", { anonymousId });
  return v in FLAT_FEES_CENTS ? (v as FeeVariant) : "control";
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
  variant: FeeVariant = "control",
): ShippingQuote {
  const freeShippingApplied = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
  const shippingCents = freeShippingApplied ? 0 : FLAT_FEES_CENTS[variant];
  return {
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
    freeShippingApplied,
    centsToFreeShipping: freeShippingApplied
      ? 0
      : FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents,
  };
}
