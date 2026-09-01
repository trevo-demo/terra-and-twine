"use client";

import { useEffect } from "react";
import { useTrevo } from "@trevosdk/react";

/** Fires `product_viewed` once per product page mount. */
export default function TrackView({ product }: { product: string }) {
  const trevo = useTrevo();
  useEffect(() => {
    trevo?.track("product_viewed", { product });
  }, [trevo, product]);
  return null;
}
