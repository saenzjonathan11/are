import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing.
 *   /equipment      -> rendered by app/[lang] with lang = "en" (rewrite, URL unchanged)
 *   /es/equipment   -> rendered with lang = "es"
 *   /en/equipment   -> 308 redirect to /equipment so English has one canonical URL
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Everything except API routes, Next internals, and files with an extension
    "/((?!api|_next/static|_next/image|images|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
