"use client";

import { AppShell } from "@/components/app-shell";
import { PROJECTS } from "@/backend/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Files, Users, Clock, FolderKanban } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

export default function ProjectsPage() {
  return (
    <AppShell>
      <PageHeader
        icon={FolderKanban}
        title="Project workspace"
        subtitle="CAD files, simulations and team collaboration in one place."
        actions={
          <Button className="gradient-cyan text-primary-foreground border-0 rounded-full h-10">
            <Plus className="size-4" /> New project
          </Button>
        }
      />

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <Card key={p.id} className="border-border hover:border-accent/50 transition-all text-left">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-12 rounded-xl bg-accent/15 grid place-items-center text-accent">
                    <Files className="size-5" />
                  </div>
                  <Badge variant="outline" className={
                    p.status === "active" ? "border-success/40 text-success" :
                    p.status === "shared" ? "border-accent/40 text-accent" : ""
                  }>{p.status}</Badge>
                </div>
                <div className="font-display font-bold">{p.name}</div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Users className="size-3" /> {p.team.length}</span>
                  <span className="inline-flex items-center gap-1"><Files className="size-3" /> {p.files} files</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {p.updated}</span>
                </div>
                <div className="flex -space-x-2 mt-3">
                  {p.team.map((m, i) => (
                    <div key={i} className="size-7 rounded-full bg-primary text-primary-foreground border-2 border-card grid place-items-center text-[10px] font-bold">
                      {m.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
