import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";

export async function RecentSignals() {
  const supabase = createClient();
  const { data: signals } = await supabase
    .from("signals")
    .select(
      "id, pair, direction, evaluated_at, confluence_score, narrative, entry_price, stop_loss, take_profit_2",
    )
    .eq("classification", "a_plus")
    .order("evaluated_at", { ascending: false })
    .limit(3);

  const list = signals ?? [];

  return (
    <section className="border-b border-white/[0.06] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Recent A+ signals
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Real signals from our master account, with the reasoning.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {list.length > 0
            ? list.map((s) => (
                <article
                  key={s.id}
                  className="flex flex-col rounded-xl border border-white/[0.06] bg-card p-6"
                >
                  <p className="font-mono text-xs text-muted-foreground/80">
                    {format(new Date(s.evaluated_at), "MMM d, HH:mm 'UTC'")}
                  </p>
                  <p className="mt-2 font-sans text-lg font-semibold text-foreground">
                    {s.pair}{" "}
                    <span className="text-muted-foreground">&middot;</span>{" "}
                    <span
                      className={
                        s.direction === "long" ? "text-teal" : "text-coral"
                      }
                    >
                      {s.direction.toUpperCase()}
                    </span>
                  </p>
                  <span className="mt-2 inline-flex w-fit items-center rounded-md bg-teal/10 px-2 py-0.5 font-mono text-xs text-teal">
                    {s.confluence_score}/7 confluence passed
                  </span>
                  {s.narrative ? (
                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                      {s.narrative}
                    </p>
                  ) : null}
                </article>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <article
                  key={i}
                  className="flex flex-col rounded-xl border border-dashed border-white/[0.08] bg-secondary/40 p-6"
                >
                  <div className="font-mono text-xs text-muted-foreground/50">
                    awaiting first signal
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Live signals will appear here once the master account fires
                    its first A+ setup.
                  </p>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
}
