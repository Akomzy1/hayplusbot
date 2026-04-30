import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 block text-center font-sans text-2xl font-semibold tracking-tight text-foreground"
        >
          HayPlusbot
        </Link>
        <div className="rounded-lg border border-border bg-card p-8 shadow-lg">
          {children}
        </div>
      </div>
    </main>
  );
}
