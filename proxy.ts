import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const destination = request.nextUrl.clone();
  const normalized = destination.pathname.toLowerCase();
  if (normalized === destination.pathname) return NextResponse.next();
  destination.pathname = normalized;
  // Clone the complete URL: every click ID and arbitrary UTM survives the hop.
  return NextResponse.redirect(destination, 308);
}

// Document routes only. File and API paths can legitimately be case-sensitive.
export const config = { matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\.).*)"] };
