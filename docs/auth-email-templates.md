# Supabase auth email templates — HayPlusbot branding

Supabase doesn't yet support managing email templates programmatically — they live in the dashboard and have to be edited by hand. This document gives you the four templates HayPlusbot uses, branded and ready to paste.

## Where to paste

1. Sign in at https://supabase.com/dashboard
2. Pick the HayPlusbot project (`vtysrykuftdknetuhevw`)
3. Sidebar → **Authentication → Email Templates**
4. For each template below, replace the **Subject** and **Body (HTML)** fields with the values shown
5. Click **Save** under each template

## Site URL & redirects (set these too)

In **Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000` for development, your deployed domain in production (e.g. `https://hayplusbot.com`)
- **Redirect URLs**: add both forms, one per line:
  - `http://localhost:3000/auth/callback`
  - `https://hayplusbot.com/auth/callback` *(when you have a real domain)*

Without these in the allowlist, the verification links return errors.

## The four templates we use

The Supabase variable `{{ .ConfirmationURL }}` already includes the right `code` query param and lands users on `/auth/callback?code=...&next=...`. Don't add a separate `next` param manually — set it on the server side via the `emailRedirectTo` option in the Server Action (already wired up in `app/(auth)/actions.ts`).

---

### 1. Confirm signup

**Subject:**

```
Verify your HayPlusbot email
```

**Body:**

```html
<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:'Outfit',system-ui,Arial,sans-serif;background:#0A0B0F;color:#e5e7eb;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="padding:48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:#1A1D26;border-radius:8px;border:1px solid #2a2f3c;">
          <tr><td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#ffffff;">Confirm your email</h1>
            <p style="margin:0 0 16px;line-height:1.5;color:#9ca3af;">
              You're one step away from accessing HayPlusbot. Click the button below to verify your email and continue.
            </p>
            <p style="margin:24px 0;">
              <a href="{{ .ConfirmationURL }}"
                 style="display:inline-block;padding:12px 20px;background:#1D9E75;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">
                Verify email
              </a>
            </p>
            <p style="margin:0;line-height:1.5;color:#6b7280;font-size:13px;">
              If the button doesn't work, copy this link into your browser:<br>
              <span style="word-break:break-all;">{{ .ConfirmationURL }}</span>
            </p>
            <p style="margin:24px 0 0;line-height:1.5;color:#6b7280;font-size:13px;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </td></tr>
        </table>
        <p style="margin:24px 0 0;color:#6b7280;font-size:12px;">HayPlusbot · managed copy-trading strategy on HFM HFcopy</p>
      </td></tr>
    </table>
  </body>
</html>
```

---

### 2. Magic link

> We don't currently use magic-link login (email + password only). Either disable magic links in **Authentication → Providers → Email** or leave Supabase's default template — it will only fire if someone is sent a magic link manually.

If you want it on-brand anyway:

**Subject:**

```
Your HayPlusbot sign-in link
```

**Body:** (same shell as above, replace heading + copy)

```html
<h1>...">Sign in to HayPlusbot</h1>
<p>Click the button below to sign in. The link expires in 60 minutes.</p>
<p><a href="{{ .ConfirmationURL }}" style="...">Sign in</a></p>
```

---

### 3. Change email address

**Subject:**

```
Confirm your new HayPlusbot email
```

**Body:**

```html
<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:'Outfit',system-ui,Arial,sans-serif;background:#0A0B0F;color:#e5e7eb;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="padding:48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:#1A1D26;border-radius:8px;border:1px solid #2a2f3c;">
          <tr><td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#ffffff;">Confirm email change</h1>
            <p style="margin:0 0 16px;line-height:1.5;color:#9ca3af;">
              Your HayPlusbot email is being changed from <strong style="color:#ffffff;">{{ .Email }}</strong> to <strong style="color:#ffffff;">{{ .NewEmail }}</strong>. Click below to confirm.
            </p>
            <p style="margin:24px 0;">
              <a href="{{ .ConfirmationURL }}"
                 style="display:inline-block;padding:12px 20px;background:#1D9E75;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">
                Confirm change
              </a>
            </p>
            <p style="margin:24px 0 0;line-height:1.5;color:#6b7280;font-size:13px;">
              If you didn't request this, your account may be compromised — log in and reset your password immediately.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>
```

---

### 4. Reset password

**Subject:**

```
Reset your HayPlusbot password
```

**Body:**

```html
<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:'Outfit',system-ui,Arial,sans-serif;background:#0A0B0F;color:#e5e7eb;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="padding:48px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background:#1A1D26;border-radius:8px;border:1px solid #2a2f3c;">
          <tr><td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#ffffff;">Reset your password</h1>
            <p style="margin:0 0 16px;line-height:1.5;color:#9ca3af;">
              We received a request to reset your HayPlusbot password. Click the button below to choose a new one.
            </p>
            <p style="margin:24px 0;">
              <a href="{{ .ConfirmationURL }}"
                 style="display:inline-block;padding:12px 20px;background:#1D9E75;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;">
                Set new password
              </a>
            </p>
            <p style="margin:0;line-height:1.5;color:#6b7280;font-size:13px;">
              The link expires in 1 hour. If you didn't request a reset, you can safely ignore this email — your password won't change.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>
```

---

### 5. Invite user (optional)

We don't currently invite users via Supabase — invitations come from the IB referral funnel through HFM. Either disable in **Authentication → Providers** or leave Supabase's default.

---

## Quick checklist

- [ ] Site URL set to `http://localhost:3000` (dev) or production domain
- [ ] Redirect URLs include `<your-domain>/auth/callback`
- [ ] Confirm signup template branded
- [ ] Reset password template branded
- [ ] Email change template branded (if you'll use the change-email flow)
- [ ] Magic link disabled or branded
- [ ] Test: sign up with a real address → email arrives in inbox (not spam) → click → lands on `/auth/callback` → exchanges code → redirects to `/onboarding/disclosure`

If emails are landing in spam: that's Supabase's default `noreply@mail.app.supabase.io` sender. To improve deliverability for production, configure a custom SMTP provider (Resend, Mailgun) under **Project Settings → Authentication → SMTP Settings**.
