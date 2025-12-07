import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface ExtendedToken {
	role?: string;
	isBlocked?: boolean;
	profileCompleted?: boolean;
}

export async function middleware(req: NextRequest) {
	const token = await getToken({
		req,
		secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
		secureCookie: process.env.NODE_ENV === "production",
	});

	const isAuthenticated = !!token;
	const userRole = (token as ExtendedToken)?.role || "user";
	const isAdmin = userRole === "admin";
	const isBlocked = (token as ExtendedToken)?.isBlocked || false;
	const profileCompleted = (token as ExtendedToken)?.profileCompleted || false;

	const pathname = req.nextUrl.pathname;

	// Check if authenticated user is blocked
	if (isAuthenticated && !isAdmin) {
		// If user is blocked, redirect to signin and clear session
		if (isBlocked) {
			const response = NextResponse.redirect(new URL("/signin?blocked=true", req.url));
			// Clear the session cookie
			response.cookies.delete("next-auth.session-token");
			response.cookies.delete("__Secure-next-auth.session-token");
			return response;
		}

		// If profile not completed and not on profile-setup page, redirect there
		if (!profileCompleted && pathname !== "/profile-setup") {
			return NextResponse.redirect(new URL("/profile-setup", req.url));
		}
	}

	// Protect profile-setup - require authentication
	if (pathname === "/profile-setup" && !isAuthenticated) {
		return NextResponse.redirect(new URL("/signin", req.url));
	}

	// Routes only for regular users (not admins)
	const userOnlyRoutes = ["/jobs", "/postJob", "/dashboard", "/apply-job", "/edit-job"];
	const isUserOnlyRoute = userOnlyRoutes.some((route) =>
		pathname.startsWith(route)
	);

	// Routes only for admins
	const adminRoutes = ["/admin"];
	const isAdminRoute = adminRoutes.some((route) =>
		pathname.startsWith(route)
	);

	const isLoginPage = pathname === "/signin";
	const isAdminLoginPage = pathname === "/admin/login";

	// Redirect admins away from user-only routes
	if (isUserOnlyRoute && isAdmin) {
		return NextResponse.redirect(new URL("/admin", req.url));
	}

	// Redirect regular users away from admin routes (except admin login)
	if (isAdminRoute && !isAdminLoginPage && !isAdmin && isAuthenticated) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	// Protect user routes - require authentication
	if (isUserOnlyRoute && !isAuthenticated) {
		return NextResponse.redirect(new URL("/signin", req.url));
	}

	// Redirect authenticated users away from signin page
	if (isLoginPage && isAuthenticated) {
		if (isAdmin) {
			return NextResponse.redirect(new URL("/admin", req.url));
		}
		return NextResponse.redirect(new URL("/", req.url));
	}

	// Redirect authenticated admins away from admin login
	if (isAdminLoginPage && isAuthenticated && isAdmin) {
		return NextResponse.redirect(new URL("/admin", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/jobs/:path*", 
		"/dashboard/:path*", 
		"/postJob", 
		"/apply-job/:path*",
		"/edit-job/:path*",
		"/signin",
		"/admin/:path*",
		"/profile-setup"
	],
};
