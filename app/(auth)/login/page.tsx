import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; next?: string };
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
          Log in
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your HayPlusbot account.
        </p>
      </div>

      {searchParams.error === "auth_callback_failed" ? (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground"
        >
          That link couldn&rsquo;t be verified. Please log in or request a new one.
        </div>
      ) : null}

      <LoginForm />

      <div className="space-y-2 text-sm text-muted-foreground">
        <Link
          href="/reset-password"
          className="block underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
        <p>
          Don&rsquo;t have an account?{" "}
          <Link href="/signup" className="text-foreground underline-offset-4 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
