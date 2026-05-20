"use client";

import { AppShell } from "@/components/app-shell";
import { FORUM_THREADS } from "@/backend/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye, Plus, Trophy } from "lucide-react";

export default function CommunityPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="text-left">
            <h1 className="text-3xl font-bold tracking-tight">Community</h1>
            <p className="text-muted-foreground mt-1">Discuss, debate and learn from 12,000+ CFD engineers.</p>
          </div>
          <Button className="gradient-cyan text-primary-foreground border-0 rounded-full">
            <Plus className="size-4" /> New thread
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <Input placeholder="Search threads…" className="h-11 rounded-full" />
            {FORUM_THREADS.map((t) => (
              <Card key={t.id} className="p-4 border-border hover:border-accent/50 transition-colors cursor-pointer text-left">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-secondary text-secondary-foreground grid place-items-center font-bold text-xs shrink-0">
                    {t.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium leading-snug">{t.title}</div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px]">#{t.tag}</Badge>
                      <span>by {t.author}</span>
                      <span>· {t.lastActivity}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MessageSquare className="size-3" /> {t.replies}</span>
                    <span className="inline-flex items-center gap-1"><Eye className="size-3" /> {t.views}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="p-5 border-border text-left">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Top contributors</div>
              <div className="space-y-3">
                {[
                  { name: "Yuki Tanaka", points: 4820, avatar: "YT" },
                  { name: "Diego Moreno", points: 3640, avatar: "DM" },
                  { name: "Hannah Klein", points: 2980, avatar: "HK" },
                ].map((u, i) => (
                  <div key={u.name} className="flex items-center gap-3">
                    <div className="font-display font-bold text-muted-foreground w-4">#{i + 1}</div>
                    <div className="size-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold">{u.avatar}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{u.name}</div>
                      <div className="text-xs text-muted-foreground">{u.points.toLocaleString()} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5 border-border bg-gradient-to-br from-primary/5 to-accent/10 text-left">
              <Trophy className="size-6 text-accent mb-3" />
              <div className="font-display font-bold">Spring CFD Challenge</div>
              <p className="text-xs text-muted-foreground mt-2">Optimise a heat exchanger design. $2,000 prize pool.</p>
              <Button size="sm" variant="outline" className="mt-3 w-full">View challenge</Button>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
