"use client";

import { useState } from "react";

type Field = { name: string; label: string; type?: string; placeholder: string; inputMode?: "numeric" };

const GROUPS: Array<{ title: string; fields: Field[] }> = [
  {
    title: "Where should we send the receipt?",
    fields: [{ name: "email", label: "Email", type: "email", placeholder: "you@example.com" }],
  },
  {
    title: "Where is it going?",
    fields: [
      { name: "name", label: "Full name", placeholder: "Fern Enthusiast" },
      { name: "address", label: "Shipping address", placeholder: "123 Greenhouse Lane" },
    ],
  },
  {
    title: "How would you like to pay?",
    fields: [{ name: "card", label: "Card number", placeholder: "4242 4242 4242 4242", inputMode: "numeric" }],
  },
];

/**
 * Shipped after checkout-progressive-disclosure won. Reveals one field group
 * at a time; fields not yet revealed render hidden so the POST payload is
 * unchanged.
 */
export default function StepwiseFields({ fieldClassName }: { fieldClassName: string }) {
  const [revealed, setRevealed] = useState(1);
  return (
    <>
      {GROUPS.slice(0, revealed).map((group, i) => (
        <fieldset key={group.title} className="space-y-3">
          <legend className="text-sm font-medium">{group.title}</legend>
          {group.fields.map((f) => (
            <label key={f.name} className="block text-sm font-medium">
              {f.label}
              <input
                name={f.name}
                type={f.type}
                inputMode={f.inputMode}
                required
                placeholder={f.placeholder}
                className={fieldClassName}
              />
            </label>
          ))}
          {i === revealed - 1 && revealed < GROUPS.length && (
            <button
              type="button"
              onClick={() => setRevealed(revealed + 1)}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              Continue →
            </button>
          )}
        </fieldset>
      ))}
      {GROUPS.slice(revealed)
        .flatMap((g) => g.fields)
        .map((f) => (
          <input key={f.name} name={f.name} type="hidden" />
        ))}
    </>
  );
}
