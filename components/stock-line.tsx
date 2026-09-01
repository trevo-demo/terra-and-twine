"use client";

import { useExperiment } from "@trevosdk/react";

/** Experiment: stock-urgency-threshold. The number is always the real stock. */
export default function StockLine({ stock }: { stock: number }) {
  const variant = useExperiment("stock-urgency-threshold");
  const threshold = variant === "from-40" ? 40 : 25;
  return (
    <p className="mt-3 text-sm text-stone-500">
      {stock > threshold ? "In stock" : `Only ${stock} left in stock`}
    </p>
  );
}
