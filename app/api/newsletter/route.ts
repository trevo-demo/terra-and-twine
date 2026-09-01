import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  // Demo store: we don't actually store the address anywhere, but we remember
  // it on this browser so the checkout can offer it back.
  const res = NextResponse.json({ ok: true });
  res.cookies.set("tt_subscriber", email, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
}
