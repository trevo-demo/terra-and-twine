import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProduct } from "@/lib/products";
import AddToCart from "@/components/add-to-cart";
import ProductDetails from "@/components/product-details";
import TrackView from "@/components/track-view";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div>
      <TrackView product={product.slug} />
      <Link href="/" className="text-sm text-stone-500 hover:text-emerald-700">
        ← Back to shop
      </Link>
      <div className="mt-4 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div
          className={`flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br text-9xl ${product.gradient}`}
        >
          {product.emoji}
        </div>
        <ProductDetails product={product}>
          <AddToCart slug={product.slug} priceCents={product.price} />
        </ProductDetails>
      </div>
    </div>
  );
}
