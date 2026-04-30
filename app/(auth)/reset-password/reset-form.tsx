"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  requestPasswordResetAction,
  type FormState,
} from "../actions";

const initialState: FormState = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Sending…" : "Send reset link"}
    </Button>
  );
}

export function ResetForm() {
  const [state, formAction] = useFormState(
    requestPasswordResetAction,
    initialState,
  );

  if (state?.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-md border border-border bg-secondary px-4 py-3 text-sm text-muted-foreground"
      >
        {state.success}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby={state?.error ? "form-error" : undefined}
        />
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
