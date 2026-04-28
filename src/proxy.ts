import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const handler = withAuth(
  function proxy(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export default handler;

// Only protect /assets and /admin — all other pages are public
export const config = {
  matcher: ["/assets/:path*", "/admin/:path*"],
};
