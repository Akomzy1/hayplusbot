import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Read the current authenticated user from cookies. Returns null if no session.
 * Use in Server Components / Server Actions where unauthenticated access is OK.
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Like getCurrentUser but redirects to /login when there's no session.
 * Use in Server Components / Server Actions that require authentication.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Requires authentication AND admin status. Renders a 404 (not 403) for
 * non-admins to avoid leaking the existence of admin routes. Mirrors the
 * middleware behaviour for /admin/*.
 */
export async function requireAdmin() {
  const user = await requireUser();
  const supabase = createClient();
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    notFound();
  }
  return user;
}

/**
 * Requires authentication AND a signed risk disclosure. Redirects unsigned
 * users to /onboarding/disclosure. Mirrors middleware behaviour for
 * /dashboard, /signals, /subscribe, /settings.
 */
export async function requireDisclosureSigned() {
  const user = await requireUser();
  const supabase = createClient();
  const { data: signed } = await supabase.rpc("has_signed_disclosure");
  if (!signed) {
    redirect("/onboarding/disclosure");
  }
  return user;
}
