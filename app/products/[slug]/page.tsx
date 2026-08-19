import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { PRODUCTS, getProduct } from "@/lib/products";
import { trevoServer } from "@/lib/trevo-server";
import AddToCart from "@/components/add-to-cart";
import ProductDetails from "@/components/product-details";
import RelatedProducts from "@/components/related-products";
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

  // Experiment: pdp-related-products. Resolved per request from the visitor
  // identity so the same shopper sees the same page across visits.
  const anonymousId = (await cookies()).get("trevo_id")?.value;
  const variant = anonymousId
    ? trevoServer()?.getVariant("pdp-related-products", { anonymousId })
    : "control";

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
      {variant === "related" && <RelatedProducts slug={product.slug} />}
    </div>
  );
}
