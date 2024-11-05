import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get("origin") || "";

  // Get hostname of the current request
  const hostname = request.nextUrl.hostname;

  // Create response object
  const response = NextResponse.next();

  // Only allow requests from same origin
  if (origin === `https://${hostname}` || origin === `http://${hostname}`) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: "/api/:path*",
};
