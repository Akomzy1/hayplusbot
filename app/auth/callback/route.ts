import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Auth callback for email confirmation, magic links, password reset, and
 * email change. Supabase sends the user here after they click a link in
 * their email. We exchange the code for a session and redirect onward.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const errorParam = searchParams.get("error");

  if (errorParam) {
    const url = new URL("/login", origin);
    url.searchParams.set("error", "auth_callback_failed");
    return NextResponse.redirect(url);
  }

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  const url = new URL("/login", origin);
  url.searchParams.set("error", "auth_callback_failed");
  return NextResponse.redirect(url);
}
