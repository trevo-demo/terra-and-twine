import { formatPrice, type Product } from "@/lib/products";

/** Buy block first: shipped after product-buy-block-first won. */
export default function ProductDetails({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm uppercase tracking-wide text-emerald-700">{product.category}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
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
      <p className="mt-4 leading-relaxed text-stone-600">{product.description}</p>
    </div>
  );
}
