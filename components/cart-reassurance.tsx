"use client";

import { useExperiment } from "@trevosdk/react";
import { formatPrice } from "@/lib/products";
import type { ShippingQuote } from "@/lib/shipping";

/** Experiment: cart-reassurance. The quote comes from the server rule. */
export default function CartReassurance({ quote }: { quote: ShippingQuote }) {
  const variant = useExperiment("cart-reassurance");
  if (variant !== "reassurance") {
    return (
      <p className="mt-1 text-right text-sm text-stone-400">
        Shipping calculated at checkout
      </p>
    );
  }
  const threshold = quote.subtotalCents + quote.centsToFreeShipping;
  const progress = threshold > 0 ? Math.min(1, quote.subtotalCents / threshold) : 1;
  return (
    <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm">
      <p className="font-medium text-emerald-800">
        {quote.freeShippingApplied
          ? "You've unlocked free shipping"
          : `${formatPrice(quote.centsToFreeShipping)} away from free shipping`}
      </p>
      <div className="mt-2 h-2 rounded-full bg-emerald-100">
        <div
          className="h-2 rounded-full bg-emerald-600"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <ul className="mt-3 space-y-1 text-stone-600">
        <li>✓ 30-day returns, no questions asked</li>
        <li>✓ Carbon-neutral delivery</li>
        <li>✓ Secure checkout</li>
      </ul>
    </div>
  );
}
