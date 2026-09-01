"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useExperiment, useTrevo } from "@trevosdk/react";
import { formatPrice, getProduct } from "@/lib/products";

type Line = { name: string; price: number; quantity: number };

/** Experiment: header-mini-cart. Reads GET /api/cart; control keeps the plain link. */
export default function MiniCart({ count }: { count: number }) {
  const variant = useExperiment("header-mini-cart");
  const trevo = useTrevo();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    if (!open) return;
    fetch("/api/cart")
      .then((r) => r.json())
      .then((json: { cart: Record<string, number> }) =>
        setLines(
          Object.entries(json.cart).flatMap(([slug, quantity]) => {
            const p = getProduct(slug);
            return p ? [{ name: p.name, price: p.price, quantity }] : [];
          }),
        ),
      )
      .catch(() => setLines([]));
  }, [open]);

  const link = (
    <Link
      href="/cart"
      className="relative rounded-full bg-stone-900 px-4 py-2 text-stone-50 hover:bg-stone-700"
    >
      Cart
      {count > 0 && (
        <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-xs font-semibold">
          {count}
        </span>
      )}
    </Link>
  );
  if (variant !== "mini-cart") return link;

  return (
    <span
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {link}
      {open && count > 0 && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-stone-200 bg-white p-4 text-left shadow-lg">
          {lines.map((l) => (
            <p key={l.name} className="text-sm">
              {l.name} × {l.quantity} · {formatPrice(l.price * l.quantity)}
            </p>
          ))}
          <Link
            href="/checkout"
            onClick={() => trevo?.track("checkout_started", { source: "mini-cart" })}
            className="mt-3 block rounded-full bg-emerald-700 py-2 text-center text-sm font-medium text-white hover:bg-emerald-800"
          >
            Checkout
          </Link>
        </div>
      )}
    </span>
  );
}
