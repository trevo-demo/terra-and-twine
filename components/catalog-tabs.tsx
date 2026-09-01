"use client";

import { useState } from "react";
import { useExperiment } from "@trevosdk/react";
import type { Product } from "@/lib/products";

const TABS = ["all", "planters", "tools", "care", "decor"] as const;
type Tab = (typeof TABS)[number];

/** Experiment: catalog-category-tabs. Filters the products already on the page. */
export default function CatalogTabs({
  products,
  children,
}: {
  products: Product[];
  children: (visible: Product[]) => React.ReactNode;
}) {
  const variant = useExperiment("catalog-category-tabs");
  const [tab, setTab] = useState<Tab>("all");
  if (variant !== "tabs") return <>{children(products)}</>;
  const visible = tab === "all" ? products : products.filter((p) => p.category === tab);
  return (
    <>
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm capitalize ${
              tab === t ? "bg-emerald-700 text-white" : "bg-stone-100 hover:bg-stone-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {children(visible)}
    </>
  );
}
