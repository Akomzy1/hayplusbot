"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type FormState } from "../actions";

const initialState: FormState = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in…" : "Log in"}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);
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
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
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
