import type { Metadata } from "next";
import { NewPasswordForm } from "./new-password-form";

export const metadata: Metadata = {
  title: "Set a new password",
  robots: { index: false, follow: false },
};

export default function ResetConfirmPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
          Set a new password
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose a new password for your HayPlusbot account.
        </p>
      </div>
      <NewPasswordForm />
    </div>
  );
}
