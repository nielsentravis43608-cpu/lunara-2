import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminPassword, adminToken } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = String(body.password || "");
  if (password !== adminPassword()) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const r = NextResponse.json({ ok: true });
  r.cookies.set(ADMIN_COOKIE, await adminToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return r;
}
