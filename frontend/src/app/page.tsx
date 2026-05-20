"use client";

import Link from "next/link";
import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bot, FlaskConical, BookOpen, Zap, GraduationCap, Cloud, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <MarketingShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-12 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-xs font-medium text-foreground mb-6">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              ENT ACADEMY · CFD Learning Platform
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Master <span className="gradient-text">CFD</span><br />
              with AI by your side.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Structured courses, browser-based OpenFOAM &amp; Fluent labs, and an AI tutor that
              actually understands meshing, turbulence and convergence. Cultivating the next
              generation of CFD engineers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full h-12 px-6 gradient-cyan text-primary-foreground border-0 hover:opacity-90">
                <Link href="/signup">Start learning free <ArrowRight className="size-4 ml-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6">
                <Link href="/courses">Explore courses</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {["No credit card", "OpenFOAM ready", "AI debugging", "Industry certificates"].map((f) => (
                <span key={f} className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" />{f}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-4 gradient-cyan opacity-20 blur-3xl rounded-full" />
              <div className="relative rounded-2xl border border-border bg-card shadow-glow overflow-hidden">
                <div className="bg-primary text-primary-foreground px-4 py-2.5 flex items-center gap-2 text-xs">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-destructive/70" />
                    <span className="size-2.5 rounded-full bg-warning/70" />
                    <span className="size-2.5 rounded-full bg-success/70" />
                  </div>
                  <span className="ml-2 font-mono opacity-80">simulation://channel-flow</span>
                </div>
                <div className="aspect-[4/3] grid-bg relative">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div className="text-7xl mb-4">🌊</div>
                      <div className="font-mono text-xs text-muted-foreground">solving Navier–Stokes…</div>
                      <div className="mt-3 mx-auto w-48 h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full gradient-cyan"
                          initial={{ width: "10%" }} animate={{ width: "92%" }}
                          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-t border-border text-xs">
                  {[
                    { l: "Cells", v: "84.5k" }, { l: "Iter", v: "2,400" }, { l: "Residual", v: "1.2e⁻⁵" },
                  ].map((s) => (
                    <div key={s.l} className="px-3 py-3 border-r border-border last:border-r-0">
                      <div className="text-muted-foreground">{s.l}</div>
                      <div className="font-mono font-semibold mt-0.5">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border/60 py-6 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span>Trusted at</span>
          {["IIT Bombay", "TU Delft", "ETH Zürich", "MIT AeroAstro", "Stanford ME"].map((s) => (
            <span key={s} className="font-display font-bold text-sm tracking-tight text-foreground/70">{s}</span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <Badge variant="outline" className="mb-3">PLATFORM</Badge>
          <h2 className="text-4xl font-bold tracking-tight">Engineered for outcomes.</h2>
          <p className="mt-4 text-muted-foreground">
            Theory, hands-on simulation, and AI feedback in one workflow. Stop juggling tutorials
            and licences — learn CFD the way it's actually practised.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: BookOpen, title: "Structured CFD courses", desc: "Beginner to advanced learning paths covering meshing, turbulence, multiphase and HPC.", tag: "20+ courses" },
            { icon: FlaskConical, title: "Browser simulation lab", desc: "Run 2D and 3D OpenFOAM cases without installing anything. Real solver, real residuals.", tag: "OpenFOAM · Fluent" },
            { icon: Bot, title: "AI CFD tutor", desc: "Ask why your run diverged, which turbulence model to pick, or to explain the SIMPLE algorithm.", tag: "Context-aware" },
            { icon: GraduationCap, title: "Verified certificates", desc: "Industry-grade credentials with QR verification, sharable to LinkedIn in one click.", tag: "Recognised" },
            { icon: Cloud, title: "Project workspace", desc: "Upload CAD, version your cases, collaborate with your team and showcase your portfolio.", tag: "Team ready" },
            { icon: Zap, title: "Adaptive learning", desc: "Quizzes adapt to you. The platform recommends the next lesson based on what you struggled with.", tag: "AI-powered" },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-cyan transition-all"
            >
              <div className="size-10 rounded-lg bg-accent/15 grid place-items-center mb-4 group-hover:gradient-cyan transition-all">
                <f.icon className="size-5 text-accent group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-display font-bold">{f.title}</h3>
                <span className="text-[10px] uppercase tracking-wider text-accent font-medium">{f.tag}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { v: "12,000+", l: "Active learners" },
            { v: "50,000+", l: "Simulations run" },
            { v: "20+", l: "Expert instructors" },
            { v: "4.8 / 5", l: "Average course rating" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-4xl font-bold font-display">{s.v}</div>
              <div className="text-sm opacity-70 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <Sparkles className="size-8 text-accent mx-auto mb-4" />
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Ready to ship your first simulation?</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Join thousands of mechanical, aerospace, automotive and chemical engineers learning the
          modern way.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg" className="rounded-full h-12 px-6 gradient-cyan text-primary-foreground border-0">
            <Link href="/signup">Create free account</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-6">
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>
      </section>
    </MarketingShell>
  );
}
