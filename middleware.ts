import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(process.env.SESSION_KEY);
  if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/post/:path*", "/api/graphql/:path*"],
};
