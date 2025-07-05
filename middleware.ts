import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET, // Make sure this is correct!
    secureCookie: true, // 👈 Force secure cookies in production
  });
  // console.log("TOKEN IN MIDDLEWARE:", token); // Check Vercel logs
  const isAuthenticated = !!token;

  const pathname = req.nextUrl.pathname;

  // ✅ Add all protected routes here
  const protectedRoutes = ["/jobs", "/postJob", "/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isLoginPage = pathname === "/signin";

  if (isProtectedRoute && !isAuthenticated) {
    console.log("this signin is working ??")
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*", "/dashboard/:path*", "/postJob", "/signin"],
};
