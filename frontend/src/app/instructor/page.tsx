"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/backend/mock-data";
import { Plus, Users, Star, DollarSign, BookOpen, LayoutDashboard } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PageHeader } from "@/components/common/PageHeader";

const enrollments = [
  { week: "W1", enrolled: 42 }, { week: "W2", enrolled: 58 }, { week: "W3", enrolled: 71 },
  { week: "W4", enrolled: 64 }, { week: "W5", enrolled: 89 }, { week: "W6", enrolled: 102 },
];

export default function InstructorOverviewPage() {
  const myCourses = COURSES.slice(0, 3);
  return (
    <AppShell>
      <PageHeader
        icon={LayoutDashboard}
        title="Instructor overview"
        subtitle="Your courses, students and earnings."
        actions={
          <Button className="gradient-cyan text-primary-foreground border-0 rounded-full h-10">
            <Plus className="size-4" /> New course
          </Button>
        }
      />

      <div className="space-y-8 text-left">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total students", value: "8,420", icon: Users },
            { label: "Avg rating", value: "4.82", icon: Star },
            { label: "Active courses", value: "3", icon: BookOpen },
            { label: "MTD earnings", value: "$3,840", icon: DollarSign },
          ].map((s) => (
            <Card key={s.label} className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider text-left">{s.label}</div>
                  <s.icon className="size-4 text-accent" />
                </div>
                <div className="text-2xl font-bold font-display mt-2 text-left">{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border">
            <CardContent className="p-5 text-left">
              <div className="font-display font-bold mb-3">Weekly enrollments</div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enrollments}>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={11} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="enrolled" fill="var(--accent)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-5 text-left">
              <div className="font-display font-bold mb-3">Recent activity</div>
              <ul className="space-y-3 text-sm">
                <li><span className="text-accent">●</span> 12 new enrollments in <span className="font-medium">Intro to CFD</span></li>
                <li><span className="text-success">●</span> 4 assignments submitted</li>
                <li><span className="text-warning">●</span> 2 questions awaiting answer</li>
                <li><span className="text-accent">●</span> New 5★ review on <span className="font-medium">Meshing</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardContent className="p-5 text-left">
            <div className="font-display font-bold mb-4">My courses</div>
            <div className="space-y-3">
              {myCourses.map((c) => (
                <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                  <div className="size-12 rounded-lg bg-accent/15 grid place-items-center text-2xl">{c.thumbnail}</div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.students.toLocaleString()} students · ★ {c.rating}</div>
                  </div>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
