"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { SIMULATIONS } from "@/backend/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Download, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function SimLab() {
  const params = useParams();
  const id = params.id as string;
  
  const sim = SIMULATIONS.find((s) => s.id === id);

  if (!sim) {
    return (
      <AppShell>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Simulation not found</h1>
        </div>
      </AppShell>
    );
  }

  const [running, setRunning] = useState(sim.status === "running");
  const [iter, setIter] = useState(sim.iterations);
  const [residuals, setResiduals] = useState<{ iter: number; Ux: number; Uy: number; p: number }[]>(() => {
    const seed = Math.max(50, sim.iterations);
    return Array.from({ length: 60 }, (_: unknown, i: number) => {
      const x = (i + 1) * (seed / 60);
      return {
        iter: Math.round(x),
        Ux: Math.exp(-x / 600) * 0.1 + Math.random() * 1e-3,
        Uy: Math.exp(-x / 700) * 0.08 + Math.random() * 1e-3,
        p: Math.exp(-x / 500) * 0.15 + Math.random() * 1e-3,
      };
    });
  });

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setIter((i: number) => i + 5);
      setResiduals((r) => {
        const last = r[r.length - 1];
        const next = {
          iter: last.iter + 5,
          Ux: Math.max(1e-7, last.Ux * 0.97 + Math.random() * 1e-5),
          Uy: Math.max(1e-7, last.Uy * 0.97 + Math.random() * 1e-5),
          p: Math.max(1e-7, last.p * 0.96 + Math.random() * 1e-5),
        };
        return [...r.slice(-80), next];
      });
    }, 400);
    return () => clearInterval(t);
  }, [running]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground text-left">
          <Link href="/simulations" className="hover:text-foreground">Simulations</Link>
          <ChevronRight className="size-3 inline mx-1" /> {sim.title}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{sim.type}</Badge>
              <span className="text-xs font-mono text-muted-foreground">{sim.solver}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-2">{sim.title}</h1>
            <p className="text-muted-foreground mt-1">{sim.description}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setRunning(!running)} className="gradient-cyan text-primary-foreground border-0">
              {running ? <><Pause className="size-4" /> Pause</> : <><Play className="size-4" /> Run</>}
            </Button>
            <Button variant="outline" onClick={() => { setIter(0); setRunning(false); }}>
              <RotateCcw className="size-4" />
            </Button>
            <Button variant="outline"><Download className="size-4" /></Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Viewport */}
          <Card className="lg:col-span-2 border-border overflow-hidden">
            <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between text-xs">
              <span className="font-mono">viewport · velocity magnitude</span>
              <span className={`font-mono ${running ? "text-accent animate-pulse" : ""}`}>{running ? "● solving" : "○ idle"}</span>
            </div>
            <div className="aspect-[16/10] grid-bg relative overflow-hidden">
              {/* fake flow visualisation */}
              <svg viewBox="0 0 800 500" className="w-full h-full">
                <defs>
                  <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="oklch(0.4 0.18 260)" />
                    <stop offset="50%" stopColor="oklch(0.7 0.18 200)" />
                    <stop offset="100%" stopColor="oklch(0.85 0.2 80)" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 14 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M0 ${60 + i * 28} Q 200 ${50 + i * 28 + Math.sin(i) * 10}, 400 ${60 + i * 28} T 800 ${60 + i * 28}`}
                    stroke="url(#flow)" strokeWidth="2" fill="none" opacity={0.7}
                  >
                    {running && (
                      <animate attributeName="stroke-dashoffset" values="0;40" dur="1.2s" repeatCount="indefinite" />
                    )}
                  </path>
                ))}
                <circle cx="400" cy="250" r="40" fill="oklch(0.235 0.10 256)" stroke="oklch(0.78 0.165 220)" strokeWidth="2" />
              </svg>
            </div>
            <div className="grid grid-cols-4 border-t border-border text-xs">
              {[
                { l: "Iteration", v: iter.toLocaleString() },
                { l: "Cells", v: sim.meshCells.toLocaleString() },
                { l: "Residual (p)", v: residuals[residuals.length - 1].p.toExponential(2) },
                { l: "Wall time", v: `${Math.round(iter * 0.05)}s` },
              ].map((s) => (
                <div key={s.l} className="px-4 py-3 border-r border-border last:border-r-0 text-left">
                  <div className="text-muted-foreground">{s.l}</div>
                  <div className="font-mono font-semibold mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Settings */}
          <div className="space-y-4">
            <Card className="border-border">
              <CardContent className="p-5 space-y-4 text-left">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Solver</div>
                  <div className="font-mono text-sm bg-muted rounded-md px-3 py-2">{sim.solver === "OpenFOAM" ? "simpleFoam" : "pressure-based"}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Turbulence</div>
                  <div className="font-mono text-sm bg-muted rounded-md px-3 py-2">k-omega SST</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Inlet velocity</div>
                  <div className="font-mono text-sm bg-muted rounded-md px-3 py-2">10 m/s · uniform</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Outlet</div>
                  <div className="font-mono text-sm bg-muted rounded-md px-3 py-2">pressureOutlet · 0 Pa</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-5 text-left">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">AI suggestions</div>
                <ul className="text-sm space-y-2">
                  <li className="flex gap-2"><span className="text-accent">●</span> y+ looks high — refine first cell to 0.001</li>
                  <li className="flex gap-2"><span className="text-accent">●</span> Consider lowering relaxation factor for pressure</li>
                  <li className="flex gap-2"><span className="text-accent">●</span> Mesh skewness 0.62 — within acceptable range</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Residual chart */}
        <Card className="border-border">
          <CardContent className="p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <div className="font-display font-bold">Residual monitor</div>
              <span className="text-xs text-muted-foreground font-mono">log scale</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={residuals}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="iter" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis scale="log" domain={["auto", "auto"]} stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => v.toExponential(0)} />
                  <Tooltip
                    contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                    formatter={(v: number) => v.toExponential(3)}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Ux" stroke="var(--chart-1)" dot={false} strokeWidth={1.5} />
                  <Line type="monotone" dataKey="Uy" stroke="var(--chart-2)" dot={false} strokeWidth={1.5} />
                  <Line type="monotone" dataKey="p" stroke="var(--chart-3)" dot={false} strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
