"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { ANALYTICS_DATA } from "@/backend/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { Users, DollarSign, TrendingUp, Activity } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-8 text-left">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform analytics</h1>
          <p className="text-muted-foreground mt-1">Real-time view of users, revenue and engagement.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active users", value: "6,840", trend: "+12%", icon: Users },
            { label: "MRR", value: "$122k", trend: "+29%", icon: DollarSign },
            { label: "Course completion", value: "34%", trend: "+4pt", icon: TrendingUp },
            { label: "Sims today", value: "1,420", trend: "+8%", icon: Activity },
          ].map((s) => (
            <Card key={s.label} className="border-border">
              <CardContent className="p-5 text-left">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                  <s.icon className="size-4 text-accent" />
                </div>
                <div className="text-2xl font-bold font-display mt-2">{s.value}</div>
                <div className="text-xs text-success mt-1">{s.trend}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardContent className="p-5 text-left">
              <div className="font-display font-bold mb-3">User growth</div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ANALYTICS_DATA.enrollmentTrend}>
                    <defs>
                      <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="users" stroke="var(--accent)" fill="url(#ug)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-5 text-left">
              <div className="font-display font-bold mb-3">MRR (k$)</div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ANALYTICS_DATA.revenueTrend}>
                    <defs>
                      <linearGradient id="mrr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="mrr" stroke="var(--primary)" fill="url(#mrr)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardContent className="p-5 text-left">
            <div className="font-display font-bold mb-3">Course popularity</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ANALYTICS_DATA.coursePopularity} layout="vertical">
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} width={120} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="enrolled" fill="var(--accent)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
