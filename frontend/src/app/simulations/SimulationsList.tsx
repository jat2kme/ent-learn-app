"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/common/PageHeader";
import { SIMULATIONS } from "@/backend/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, FlaskConical } from "lucide-react";

export default function SimulationsList() {
  return (
    <AppShell>
      <PageHeader
        icon={FlaskConical}
        title="Simulation lab"
        subtitle="Browser-based OpenFOAM, Fluent and SimScale workflows."
        actions={
          <Button className="gradient-cyan text-primary-foreground border-0 rounded-full h-10">
            <Plus className="size-4" /> New simulation
          </Button>
        }
      />

      <div className="space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SIMULATIONS.map((s) => (
            <Link key={s.id} href={`/simulations/${s.id}`}>
              <Card className="border-border hover:border-accent/50 hover:shadow-cyan transition-all overflow-hidden text-left">
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/15 to-accent/15 grid place-items-center text-6xl relative">
                  {s.thumbnail}
                  <Badge
                    className={`absolute top-3 right-3 ${
                      s.status === "completed" ? "bg-success text-success-foreground" :
                      s.status === "running" ? "bg-accent text-accent-foreground" :
                      s.status === "diverged" ? "bg-destructive text-destructive-foreground" :
                      "bg-muted text-muted-foreground"
                    } border-0`}
                  >
                    {s.status}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="text-[10px] uppercase tracking-widest text-accent font-medium">{s.type}</div>
                  <div className="font-display font-bold text-lg mt-1">{s.title}</div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{s.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs">
                    <span className="font-mono text-muted-foreground">{s.solver}</span>
                    <span className="font-mono">{s.meshCells.toLocaleString()} cells</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="border-dashed border-2 border-border bg-transparent">
          <CardContent className="p-10 text-center">
            <FlaskConical className="size-8 mx-auto text-accent mb-3" />
            <div className="font-display font-bold">Simulation templates</div>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Start from a verified case: airfoils, heat sinks, mixers, HVAC diffusers and more.
            </p>
            <Button variant="outline" className="mt-4 rounded-full">Browse templates</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
