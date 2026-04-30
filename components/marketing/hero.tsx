import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SubscriberCount } from "./subscriber-count";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      {/* soft teal gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(29,158,117,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <SubscriberCount />
          <h1 className="mt-6 font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Trade only A+ setups.
            <br className="hidden sm:inline" />{" "}
            <span className="text-teal">Copy our master strategy.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            An AI-driven SMC/ICT strategy running 9 forex pairs across London
            and NY sessions. Subscribe via HFM&rsquo;s HFcopy platform &mdash;
            disciplined, rule-based, transparent.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-teal hover:bg-teal/90">
              <Link href="/signup">
                Subscribe on HFcopy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#performance">
                See live performance
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground/70">
            HFM-authorised strategy provider &nbsp;&middot;&nbsp; Regulated
            broker partner &nbsp;&middot;&nbsp; Master account runs 24/5
          </p>
        </div>
      </div>
    </section>
  );
}
