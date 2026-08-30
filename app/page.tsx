import { PRODUCTS } from "@/lib/products";
import CatalogCard from "@/components/catalog-card";

export default function Home() {
  return (
    <div>
      <section className="mb-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-100 p-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Thoughtful goods for people who talk to their plants.
        </h1>
        <p className="mt-3 max-w-xl text-stone-600">
          Planters, tools, and care essentials — small-batch, sturdy, and
          shipped with too much paper tape.
        </p>
        <a
          href="#catalog"
          className="mt-6 inline-block rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Browse the shop
        </a>
      </section>

      <section id="catalog">
        <h2 className="mb-4 text-lg font-medium text-stone-700">
          The catalog
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <CatalogCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
