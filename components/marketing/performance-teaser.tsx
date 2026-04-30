import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { EquityCurve, type EquityPoint } from "./equity-curve";

/**
 * 90-day equity curve teaser. Reads master_account_metrics (currently
 * auth+disclosure RLS — anon reads return empty until a public RPC is
 * added; same situation as SubscriberCount). Shows a placeholder card
 * while empty.
 */
export async function PerformanceTeaser() {
  const supabase = createClient();
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const { data: metrics } = await supabase
    .from("master_account_metrics")
    .select("captured_at, equity")
    .gte("captured_at", ninetyDaysAgo.toISOString())
    .order("captured_at", { ascending: true });

  const points: EquityPoint[] = (metrics ?? []).map((m) => ({
    t: m.captured_at,
    equity: Number(m.equity),
  }));

  // Stats — placeholders if no signal data yet (Phase 2 will populate later)
  const { count: aPlusCount } = await supabase
    .from("signals")
    .select("id", { count: "exact", head: true })
    .eq("classification", "a_plus")
    .gte("evaluated_at", ninetyDaysAgo.toISOString());

  const { data: subscribers } = await supabase
    .from("hfm_sync_state")
    .select("subscribers_count")
    .eq("id", true)
    .maybeSingle();

  return (
    <section
      id="performance"
      className="border-b border-white/[0.06] bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Live performance
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              90-day equity curve from the master account.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="hidden items-center gap-1 text-sm text-teal hover:underline-offset-4 hover:underline sm:inline-flex"
          >
            View full performance
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-white/[0.06] bg-card p-6">
          {points.length > 0 ? (
            <EquityCurve data={points} />
          ) : (
            <div className="flex h-56 items-center justify-center rounded-md border border-dashed border-white/[0.08] bg-secondary/40 px-6 text-center">
              <p className="text-sm text-muted-foreground">
                Performance data will appear once the master account begins
                trading.
              </p>
            </div>
          )}
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-6">
            <Stat label="Total A+ signals (90d)" value={aPlusCount ?? "—"} />
            <Stat label="Win rate" value={"—"} />
            <Stat
              label="Active subscribers"
              value={subscribers?.subscribers_count ?? "—"}
            />
          </dl>
        </div>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-1 text-sm text-teal hover:underline-offset-4 hover:underline sm:hidden"
        >
          View full performance <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground/70">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-xl font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}
