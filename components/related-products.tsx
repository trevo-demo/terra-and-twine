import Link from "next/link";
import { formatPrice, relatedProducts } from "@/lib/products";

/** Shipped after pdp-related-products won. */
export default function RelatedProducts({ slug }: { slug: string }) {
  const products = relatedProducts(slug);
  if (products.length === 0) return null;
  return (
    <section className="mt-14">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Goes well with</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group rounded-xl border border-stone-200 bg-white p-3 transition hover:shadow-md"
          >
            <div
              className={`flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br text-4xl ${product.gradient}`}
            >
              {product.emoji}
            </div>
            <p className="mt-2 text-sm font-medium group-hover:text-emerald-700">{product.name}</p>
            <p className="text-sm text-stone-500">{formatPrice(product.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
