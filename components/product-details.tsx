"use client";

import { useExperiment } from "@trevosdk/react";
import { formatPrice, type Product } from "@/lib/products";

/**
 * Experiment: product-buy-block-first. The variant leads with price, stock,
 * the button and the guarantees; control keeps the description first.
 */
export default function ProductDetails({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const variant = useExperiment("product-buy-block-first");
  const description = (
    <p className="mt-4 leading-relaxed text-stone-600">{product.description}</p>
  );
  const buyBlock = (
    <>
      <p className="mt-2 text-2xl font-semibold">{formatPrice(product.price)}</p>
      <p className="mt-3 text-sm text-stone-500">
        {product.stock > 25 ? "In stock" : `Only ${product.stock} left in stock`}
      </p>
      {children}
      <ul className="mt-6 space-y-1 text-sm text-stone-500">
        <li>✓ Free shipping over $50</li>
        <li>✓ 30-day returns, no questions asked</li>
        <li>✓ Carbon-neutral delivery</li>
      </ul>
    </>
  );
  return (
    <div>
      <p className="text-sm uppercase tracking-wide text-emerald-700">{product.category}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
      {variant === "buy-block-first" ? (
        <>
          {buyBlock}
          {description}
        </>
      ) : (
        <>
          {description}
          {buyBlock}
        </>
      )}
    </div>
  );
}
