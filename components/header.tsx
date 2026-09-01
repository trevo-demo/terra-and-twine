import Link from "next/link";
import { cartCount, readCart } from "@/lib/cart";
import MiniCart from "./mini-cart";

export default async function Header() {
  const cart = await readCart();
  const count = cartCount(cart);

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          🌿 Terra &amp; Twine
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-emerald-700">
            Shop
          </Link>
          <MiniCart count={count} />
        </nav>
      </div>
    </header>
  );
}
