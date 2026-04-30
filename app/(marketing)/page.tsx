export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-sans text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          HayPlusbot
        </h1>
        <p className="mt-4 font-sans text-base text-muted-foreground md:text-lg">
          coming soon
        </p>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground/60">
          v0.1.0 · phase 1
        </p>
      </div>
    </main>
  );
}
