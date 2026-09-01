"use client";

import { useExperiment } from "@trevosdk/react";

/**
 * Experiment: trust-strip-under-header. The guarantees today live below the
 * fold on product pages only; this puts them under the header on every page.
 */
export default function TrustStrip() {
  const variant = useExperiment("trust-strip-under-header");
  if (variant !== "strip") return null;
  return (
    <div className="border-b border-emerald-100 bg-emerald-50 text-emerald-900">
      <ul className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-x-8 gap-y-1 px-4 py-2 text-xs sm:text-sm">
        <li>✓ Free shipping over $50</li>
        <li>✓ 30-day returns, no questions asked</li>
        <li>✓ Carbon-neutral delivery</li>
      </ul>
    </div>
  );
}
