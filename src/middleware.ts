import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const isAdmin = req.cookies.get("role")?.value === "admin";

  if (req.nextUrl.pathname.startsWith("/dashboard") && (!token || !isAdmin)) {
    return NextResponse.redirect(new URL("/admin-signin", req.url));
  }

  return NextResponse.next();
}

// ✅ Correct way to define `matcher`
export const config = {
  matcher: ["/dashboard/:path*"], // Applies only to /dashboard and its subroutes
};
