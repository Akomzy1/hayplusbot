import { requireDisclosureSigned } from "@/lib/auth/get-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // belt-and-braces: middleware already enforces this, but server components
  // depending on disclosure-signed access should re-check.
  await requireDisclosureSigned();
  return <main className="min-h-screen bg-background">{children}</main>;
}
