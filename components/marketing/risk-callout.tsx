import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";

export function RiskCallout() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div
          role="note"
          className="flex flex-col gap-3 rounded-xl border p-6 sm:flex-row sm:items-start"
          style={{
            background: "rgba(186, 117, 23, 0.12)",
            borderColor: "hsl(var(--brand-amber))",
          }}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-amber"
            style={{ background: "rgba(186, 117, 23, 0.2)" }}
          >
            <AlertTriangle className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm text-foreground">
              Subscribing to copy-trading strategies involves real capital at
              real risk. Past performance does not guarantee future results.
            </p>
            <Link
              href="/risk-disclosure"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber hover:underline-offset-4 hover:underline"
            >
              Read our risk disclosure
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
