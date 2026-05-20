"use client";

import Link from "next/link";
import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { PRICING_PLANS } from "@/backend/mock-data";

export default function PricingPage() {
  return (
    <MarketingShell>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-xs font-medium mb-5">
          <Sparkles className="size-3 text-accent" /> Pricing
        </div>
        <h1 className="text-5xl font-bold tracking-tight">Plans that scale with your craft.</h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Start free, upgrade when you need cloud compute and certification.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                plan.popular ? "border-accent bg-card shadow-glow" : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest gradient-cyan text-primary-foreground">
                  Most popular
                </div>
              )}
              <div className="text-sm font-medium text-muted-foreground">{plan.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                {plan.price === null ? (
                  <span className="text-4xl font-bold font-display">Custom</span>
                ) : (
                  <>
                    <span className="text-5xl font-bold font-display">${plan.price}</span>
                    <span className="text-muted-foreground text-sm">/{plan.period}</span>
                  </>
                )}
              </div>
              <ul className="mt-7 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-accent mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-7 rounded-full h-11 ${plan.popular ? "gradient-cyan text-primary-foreground border-0" : ""}`}
                variant={plan.popular ? "default" : "outline"}
              >
                <Link href={plan.name === "Enterprise" ? "/" : "/signup"}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-sm">
          {[
            { q: "Can I switch plans anytime?", a: "Yes — upgrade or downgrade in one click. We prorate any difference automatically." },
            { q: "What CFD solvers do you support?", a: "OpenFOAM is included on all paid plans. Fluent and SimScale workflows are available with Pro." },
            { q: "Do you offer student discounts?", a: "50% off Pro with a verified .edu email. Free for accredited university programmes." },
          ].map((f) => (
            <div key={f.q} className="p-5 rounded-xl bg-muted/50 border border-border">
              <div className="font-medium mb-1">{f.q}</div>
              <div className="text-muted-foreground text-xs leading-relaxed">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
