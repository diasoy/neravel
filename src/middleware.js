import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Jika user sudah login dan mencoba akses halaman auth, redirect ke dashboard
    if (
      token &&
      (pathname === "/auth/login" || pathname === "/auth/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Additional middleware logic can be added here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to public pages
        const publicPages = ["/", "/auth/login", "/auth/register"];
        if (publicPages.includes(pathname)) {
          return true;
        }

        // For protected routes, check if user is authenticated
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - manifest.json, robots.txt, sitemap.xml
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public/|manifest.json|robots.txt|sitemap.xml).*)",
  ],
};
