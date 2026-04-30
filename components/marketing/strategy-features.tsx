import { TrendingUp, BarChart2, Zap } from "lucide-react";

const TILES = [
  {
    icon: TrendingUp,
    title: "Smart Money Concepts",
    body: "Structural analysis of liquidity pools and institutional order flow across multiple timeframes.",
  },
  {
    icon: BarChart2,
    title: "Fundamental filters",
    body: "Interest rate differentials, economic calendar, and DXY correlation filter every potential setup.",
  },
  {
    icon: Zap,
    title: "Disciplined execution",
    body: "3–7 A+ signals per week. London and NY AM sessions only. Circuit breakers prevent overtrading.",
  },
];

export function StrategyFeatures() {
  return (
    <section className="border-b border-white/[0.06] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          What our strategy does
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TILES.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-xl border border-white/[0.06] bg-card p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal/10 text-teal">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-sans text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
