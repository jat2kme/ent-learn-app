"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/common/PageHeader";
import { COURSES, SIMULATIONS, FORUM_THREADS } from "@/backend/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Flame, Trophy, Clock, ArrowRight, FlaskConical, Bot, Zap, LayoutDashboard } from "lucide-react";

const learningData = [
  { day: "Mon", min: 32 }, { day: "Tue", min: 48 }, { day: "Wed", min: 25 },
  { day: "Thu", min: 60 }, { day: "Fri", min: 42 }, { day: "Sat", min: 80 }, { day: "Sun", min: 55 },
];

export default function Dashboard() {
  const { user } = useApp();
  const inProgress = COURSES.filter((c) => c.progress && c.progress > 0 && c.progress < 100);
  const recommended = COURSES.filter((c) => !c.progress).slice(0, 3);

  return (
    <AppShell>
      <PageHeader
        icon={LayoutDashboard}
        title={`Hello, ${user.name.split(" ")[0]} 👋`}
        subtitle="You're 38% through your weekly learning goal."
      />

      <div className="space-y-8">
        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Streak", value: "12 days", icon: Flame, accent: "text-warning" },
            { label: "XP earned", value: "2,840", icon: Zap, accent: "text-accent" },
            { label: "Hours learned", value: "47.5h", icon: Clock, accent: "text-success" },
            { label: "Rank", value: "#412", icon: Trophy, accent: "text-primary" },
          ].map((s) => (
            <Card key={s.label} className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                  <s.icon className={`size-4 ${s.accent}`} />
                </div>
                <div className="text-2xl font-bold font-display mt-2">{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue learning */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Continue learning</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/courses">All courses <ArrowRight className="size-3.5 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {inProgress.map((c) => (
                <Link
                  key={c.id} href={`/courses/${c.slug}`}
                  className="flex items-center gap-4 p-3 rounded-xl border border-border hover:border-accent/50 transition-colors group"
                >
                  <div className="size-14 rounded-lg bg-accent/10 grid place-items-center text-2xl shrink-0">
                    {c.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{c.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.instructor} · {c.lessons} lessons</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={c.progress} className="h-1.5 flex-1" />
                      <span className="text-xs font-mono text-muted-foreground">{c.progress}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Activity chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">This week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={learningData}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="min" stroke="var(--accent)" strokeWidth={2} fill="url(#g1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="text-xs text-muted-foreground mt-2">Total: <span className="text-foreground font-medium">5h 42m</span> this week</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { href: "/simulations", title: "Open simulation lab", desc: "Run a 2D channel flow", icon: FlaskConical },
            { href: "/tutor", title: "Ask the AI tutor", desc: "Debug your last run", icon: Bot },
            { href: "/courses", title: "Browse new courses", desc: "Multiphase, compressible, more", icon: Zap },
          ].map((q) => (
            <Link
              key={q.href} href={q.href}
              className="p-5 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-cyan transition-all group"
            >
              <q.icon className="size-5 text-accent mb-3" />
              <div className="font-medium">{q.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{q.desc}</div>
            </Link>
          ))}
        </div>

        {/* Recommended + Forum */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border">
            <CardHeader><CardTitle className="text-base">Recommended for you</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4">
              {recommended.map((c) => (
                <Link key={c.id} href={`/courses/${c.slug}`} className="block group">
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 grid place-items-center text-4xl">
                    {c.thumbnail}
                  </div>
                  <div className="mt-3">
                    <Badge variant="outline" className="text-[10px] mb-1.5">{c.level}</Badge>
                    <div className="text-sm font-medium leading-snug group-hover:text-accent transition-colors">{c.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">★ {c.rating} · {c.durationHours}h</div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Community</CardTitle>
              <Button asChild variant="ghost" size="sm"><Link href="/community">All</Link></Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {FORUM_THREADS.slice(0, 3).map((t) => (
                <div key={t.id} className="text-sm">
                  <div className="font-medium leading-snug">{t.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.replies} replies · {t.lastActivity}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent simulations */}
        <Card className="border-border">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Your simulations</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link href="/simulations">Open lab</Link></Button>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SIMULATIONS.map((s) => (
                <Link key={s.id} href={`/simulations/${s.id}`} className="p-4 rounded-xl border border-border hover:border-accent/50 transition-colors block">
                  <div className="flex items-start justify-between">
                    <div className="text-2xl">{s.thumbnail}</div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        s.status === "completed" ? "border-success/40 text-success" :
                        s.status === "running" ? "border-accent/40 text-accent" :
                        s.status === "diverged" ? "border-destructive/40 text-destructive" :
                        ""
                      }`}
                    >
                      {s.status}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium mt-2 leading-snug">{s.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">{s.solver}</div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
