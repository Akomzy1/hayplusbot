"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setNewPasswordAction, type FormState } from "../../actions";

const initialState: FormState = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Updating…" : "Update password"}
    </Button>
  );
}

export function NewPasswordForm() {
  const [state, formAction] = useFormState(setNewPasswordAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          aria-describedby={state?.error ? "form-error" : "password-hint"}
        />
        <p id="password-hint" className="text-xs text-muted-foreground">
          At least 8 characters.
        </p>
      </div>
      {state?.error ? (
        <p
          id="form-error"
          role="alert"
          aria-live="polite"
          className="text-sm text-destructive"
        >
          {state.error}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}
