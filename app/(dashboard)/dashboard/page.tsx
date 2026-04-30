import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/get-user";
import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await requireUser();
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-6 py-12">
      <div className="space-y-1">
        <h1 className="font-sans text-3xl font-semibold tracking-tight text-foreground">
          Welcome
        </h1>
        <p className="text-muted-foreground">
          Signed in as <span className="font-mono text-foreground">{user.email}</span>
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        The real dashboard (master account performance, signals archive,
        subscription status) lands in a later prompt. This is a placeholder so
        we can verify auth + disclosure gating end-to-end.
      </p>
      <form action={logoutAction}>
        <Button type="submit" variant="secondary">
          Log out
        </Button>
      </form>
    </div>
  );
}
