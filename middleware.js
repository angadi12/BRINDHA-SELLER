import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/earnings",
  "/",
  "/Order-Management",
  "/Product-management",
  "/revenue",
  "/messages",
  "/customer-service",
];

const authRoutes = ["/Signin"];
const notVerifiedRoute = "/notverified";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isVerified = request.cookies.get("isCompanyVerified")?.value;

  const unverifiedStatuses = ["Pending", "Requestsend","Reverify","Rejected"];

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check for dynamic route protection for Viewdetails
  const isProductViewDetailsRoute = pathname.startsWith("/Product-management/Viewdetails/");

  const isNotVerifiedPage = pathname === notVerifiedRoute;

  // 🔐 If not logged in, block access to protected + notverified routes
  if ((isProtected || isNotVerifiedPage || isProductViewDetailsRoute) && !token) {
    return NextResponse.redirect(new URL("/Signin", request.url));
  }

  // ⛔ If verified user tries to access /notverified, redirect to dashboard
  if (token && !unverifiedStatuses.includes(isVerified) && isNotVerifiedPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🚫 If logged in + unverified (pending or requestsend), redirect to /notverified
  if (token && unverifiedStatuses.includes(isVerified) && isProtected && !isNotVerifiedPage) {
    return NextResponse.redirect(new URL(notVerifiedRoute, request.url));
  }

  // 🔁 If logged in and tries to access /Signin, redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/profile",
    "/products/:path*",
    "/Signin",
    "/Product-management",
    "/Order-Management",
    "/earnings",
    "/messages",
    "/customer-service",
    "/notverified",
    "/Product-management/Viewdetails/:id", // Add dynamic route matcher
  ],
};
