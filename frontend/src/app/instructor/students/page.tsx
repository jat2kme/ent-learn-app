"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const STUDENTS = [
  { name: "Aarav Sharma", course: "Intro to CFD", progress: 62, grade: "A" },
  { name: "Hannah Klein", course: "Turbulence Modeling", progress: 88, grade: "A+" },
  { name: "Diego Moreno", course: "Heat Transfer Simulations", progress: 41, grade: "B+" },
  { name: "Yuki Tanaka", course: "Aerodynamics Analysis", progress: 100, grade: "A" },
  { name: "Marco Rossi", course: "Meshing Fundamentals", progress: 28, grade: "B" },
];

export default function InstructorStudentsPage() {
  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground mt-1">Track progress, grade assignments, give feedback.</p>
        </div>
        <Input placeholder="Search students…" className="h-11 max-w-sm rounded-full" />
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-border text-xs uppercase tracking-wider text-muted-foreground text-left">
              <div className="col-span-3">Student</div>
              <div className="col-span-4">Course</div>
              <div className="col-span-3">Progress</div>
              <div className="col-span-2">Grade</div>
            </div>
            {STUDENTS.map((s) => (
              <div key={s.name} className="grid grid-cols-12 px-5 py-4 border-b border-border last:border-0 items-center text-left">
                <div className="col-span-3 flex items-center gap-3 text-left">
                  <div className="size-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold">
                    {s.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="text-sm font-medium">{s.name}</div>
                </div>
                <div className="col-span-4 text-sm text-muted-foreground text-left">{s.course}</div>
                <div className="col-span-3 flex items-center gap-2 text-left">
                  <Progress value={s.progress} className="h-1.5 flex-1" />
                  <span className="text-xs font-mono w-8">{s.progress}%</span>
                </div>
                <div className="col-span-2 text-left"><Badge variant="outline">{s.grade}</Badge></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
