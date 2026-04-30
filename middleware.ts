import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Route gating per CLAUDE.md v3:
 *
 *   /admin/*                       — auth + is_admin (404 for non-admins,
 *                                    NOT 403 — don't leak the routes' existence)
 *   /onboarding/disclosure         — auth only (this is where users sign)
 *   /dashboard, /signals, /subscribe, /settings
 *                                  — auth + has_signed_disclosure()
 *   /login, /signup, /reset-password (and confirm)
 *                                  — public; if already authenticated,
 *                                    redirect to /dashboard
 *   everything else (landing, FAQ, etc.) — public, no enforcement
 */

const DISCLOSURE_GATED = ["/dashboard", "/signals", "/subscribe", "/settings"];
const AUTH_ROUTES = ["/login", "/signup", "/reset-password"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[],
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session if needed and read the user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // /admin: 404 for everyone except authenticated admins
  if (path.startsWith("/admin")) {
    if (!user) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return response;
  }

  // /onboarding/disclosure: auth only
  if (path.startsWith("/onboarding")) {
    if (!user) {
      const redirect = new URL("/login", request.url);
      redirect.searchParams.set("next", path);
      return NextResponse.redirect(redirect);
    }
    return response;
  }

  // disclosure-gated routes: auth + has_signed_disclosure
  if (DISCLOSURE_GATED.some((p) => path.startsWith(p))) {
    if (!user) {
      const redirect = new URL("/login", request.url);
      redirect.searchParams.set("next", path);
      return NextResponse.redirect(redirect);
    }
    const { data: signed } = await supabase.rpc("has_signed_disclosure");
    if (!signed) {
      return NextResponse.redirect(
        new URL("/onboarding/disclosure", request.url),
      );
    }
    return response;
  }

  // auth pages: redirect already-authenticated users to /dashboard
  if (AUTH_ROUTES.some((p) => path === p || path.startsWith(`${p}/`))) {
    if (user) {
      const next = request.nextUrl.searchParams.get("next") ?? "/dashboard";
      return NextResponse.redirect(new URL(next, request.url));
    }
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    // run on all paths except static assets and the auth callback handler
    "/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
