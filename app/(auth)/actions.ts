"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  LoginSchema,
  NewPasswordSchema,
  PasswordResetRequestSchema,
  SignupSchema,
} from "@/lib/auth/schemas";

export type FormState = { error?: string; success?: string } | null;

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

function flatten(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = LoginSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: "Incorrect email or password." };
  }
  redirect("/dashboard");
}

export async function signupAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = SignupSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback?next=/onboarding/disclosure`,
    },
  });
  if (error) {
    return { error: error.message };
  }
  return {
    success:
      "Check your email for a verification link. The link will sign you in and take you to the disclosure step.",
  };
}

export async function requestPasswordResetAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = PasswordResetRequestSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    {
      redirectTo: `${siteUrl()}/auth/callback?next=/reset-password/confirm`,
    },
  );
  if (error) {
    return { error: error.message };
  }
  return {
    success:
      "If an account exists for that email, we've sent a password reset link.",
  };
}

export async function setNewPasswordAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = NewPasswordSchema.safeParse(flatten(formData));
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) {
    return { error: error.message };
  }
  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
