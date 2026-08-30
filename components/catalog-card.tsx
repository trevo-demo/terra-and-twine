"use client";

import Link from "next/link";
import { useExperiment } from "@trevosdk/react";
import { formatPrice, type Product } from "@/lib/products";
import QuickAdd from "./quick-add";

/** Experiment: catalog-inline-add-to-cart. */
export default function CatalogCard({ product }: { product: Product }) {
  const variant = useExperiment("catalog-inline-add-to-cart");
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group rounded-xl border border-stone-200 bg-white p-4 transition hover:shadow-md"
    >
      <div
        className={`mb-3 flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br text-6xl ${product.gradient}`}
      >
        {product.emoji}
      </div>
      <h3 className="font-medium group-hover:text-emerald-700">{product.name}</h3>
      <p className="text-sm text-stone-500">{product.tagline}</p>
      <p className="mt-2 font-semibold">{formatPrice(product.price)}</p>
      {variant === "inline-add" && <QuickAdd slug={product.slug} priceCents={product.price} />}
    </Link>
  );
}
