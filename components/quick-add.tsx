"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrevo } from "@trevosdk/react";

export default function QuickAdd({ slug, priceCents }: { slug: string; priceCents: number }) {
  const trevo = useTrevo();
  const router = useRouter();
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");

  async function add(event: React.MouseEvent) {
    event.preventDefault(); // the card is a link; keep the shopper on the grid
    setState("adding");
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, quantity: 1 }),
    });
    if (res.ok) {
      trevo?.track("add_to_cart", { product: slug, value: priceCents / 100, source: "catalog" });
      setState("added");
      router.refresh();
      setTimeout(() => setState("idle"), 1500);
    } else {
      setState("idle");
    }
  }

  return (
    <button
      onClick={add}
      disabled={state === "adding"}
      className="mt-3 w-full rounded-full border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-60"
    >
      {state === "added" ? "Added ✓" : state === "adding" ? "Adding…" : "Add to cart"}
    </button>
  );
}
