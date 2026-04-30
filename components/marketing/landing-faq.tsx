"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS: { q: string; a: string }[] = [
  {
    q: "Can I lose money?",
    a: "Yes. Copy trading involves real risk — you can lose some or all of your capital. Past performance doesn't guarantee future results. Trade only with money you can afford to lose. Review our risk disclosure for the full picture before subscribing.",
  },
  {
    q: "Do I need to know about forex?",
    a: "No MT5 expertise required. You need an HFM account — standard KYC — and a basic understanding that you're copying a trading strategy with real risk. HFM's interface walks you through copy configuration (copy ratio, leverage limits, etc.) when you subscribe.",
  },
  {
    q: "Which brokers do you work with?",
    a: "HFM only at launch. HFcopy is where our master account runs and where mirroring happens. We may expand to other brokers later, but for now subscribers must hold their account at HFM under our IB code.",
  },
  {
    q: "How do I subscribe?",
    a: "Sign up here, sign the risk disclosure, open an HFM account through our referral link, then complete the HFcopy subscription on HFM's platform. Total time is typically 30–60 minutes — most of it is HFM's KYC verification.",
  },
];

export function LandingFaq() {
  return (
    <section className="border-b border-white/[0.06] bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Common questions
        </h2>
        <ul className="mt-10 space-y-3">
          {QUESTIONS.map(({ q, a }) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 text-sm text-teal hover:underline-offset-4 hover:underline"
          >
            See all FAQs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="overflow-hidden rounded-xl border border-white/[0.06] bg-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
      >
        <span className="font-sans text-base font-medium text-foreground">
          {q}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <p className="px-6 pb-5 text-sm text-muted-foreground">{a}</p>
        </div>
      </div>
    </li>
  );
}
