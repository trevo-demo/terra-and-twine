"use client";

import { useExperiment } from "@trevosdk/react";

/** Experiment: free-shipping-sticky-banner. */
export default function ShippingBanner() {
  const variant = useExperiment("free-shipping-sticky-banner");
  if (variant !== "sticky") return null;
  return (
    <div className="sticky top-0 z-10 bg-emerald-700 px-4 py-2 text-center text-sm font-medium text-white">
      Free shipping on every order over $50
    </div>
  );
}
