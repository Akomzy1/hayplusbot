// Per v3.2 commercial-silence policy: no fee percentages on this page.
// These three card titles + bodies come directly from the prototype and
// must not be reworded to mention "40%", "60%", "performance fee", etc.

const CARDS = [
  {
    title: "No charge on losses",
    body: "Fee is only assessed on trades that close green.",
  },
  {
    title: "No monthly subscription",
    body: "No card on file. No upfront. No cancellation friction.",
  },
  {
    title: "Administered by HFM",
    body: "Stop or pause the subscription from inside HFM at any time.",
  },
];

export function SimplicityCards() {
  return (
    <section className="border-b border-white/[0.06] bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          What makes this simple
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Fewer things to think about.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {CARDS.map(({ title, body }) => (
            <article
              key={title}
              className="rounded-xl border border-white/[0.06] bg-card p-6"
            >
              <h3 className="font-sans text-lg font-semibold text-foreground">
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
