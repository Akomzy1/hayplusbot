const STEPS = [
  {
    num: "01",
    title: "Open an HFM account",
    body: "Open an HFM account through our referral link. Required for copy trading to work.",
  },
  {
    num: "02",
    title: "Sign the risk disclosure",
    body: "Quick acknowledgment of what copy trading involves. Takes 5 minutes.",
  },
  {
    num: "03",
    title: "Subscribe on HFcopy",
    body: "Complete your subscription on HFM’s platform. Trades mirror automatically from that point.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-white/[0.06] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          How it works
        </h2>
        <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <li
              key={s.num}
              className="rounded-xl border border-white/[0.06] bg-card p-6"
            >
              <span className="font-mono text-xs tracking-wider text-teal">
                {s.num}
              </span>
              <h3 className="mt-3 font-sans text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
