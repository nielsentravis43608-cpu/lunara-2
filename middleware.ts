import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken } from "./lib/admin-auth";

export async function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  const protectedPage = (p === "/admin" || p.startsWith("/admin/")) && p !== "/admin/login";
  const protectedApi = (p === "/api/leads" || p === "/api/orders") && req.method === "GET";

  if (protectedPage || protectedApi) {
    const expected = await adminToken();
    if (req.cookies.get(ADMIN_COOKIE)?.value !== expected) {
      if (protectedApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
      }
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", p);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/leads", "/api/orders"] };
