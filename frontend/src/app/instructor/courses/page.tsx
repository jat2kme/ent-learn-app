"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COURSES } from "@/backend/mock-data";
import { Plus } from "lucide-react";

export default function InstructorCoursesPage() {
  return (
    <AppShell>
      <div className="space-y-8 text-left">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course studio</h1>
          <p className="text-muted-foreground mt-1">Build, edit and publish your CFD courses.</p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6 space-y-4 text-left">
            <div className="font-display font-bold">Create new course</div>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-2"><Label>Title</Label><Input placeholder="e.g. Advanced Heat Transfer" /></div>
              <div className="space-y-2"><Label>Category</Label><Input placeholder="Physics" /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Short, learner-friendly description…" rows={3} /></div>
            <div className="grid sm:grid-cols-3 gap-4 text-left">
              <div className="space-y-2"><Label>Level</Label><Input defaultValue="Intermediate" /></div>
              <div className="space-y-2"><Label>Duration (h)</Label><Input type="number" defaultValue={10} /></div>
              <div className="space-y-2"><Label>Price (USD)</Label><Input type="number" defaultValue={49} /></div>
            </div>
            <Button className="gradient-cyan text-primary-foreground border-0"><Plus className="size-4" /> Create draft</Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-5 text-left">
            <div className="font-display font-bold mb-4">Existing courses</div>
            <div className="space-y-2 text-left">
              {COURSES.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                  <div className="size-10 rounded-md bg-accent/15 grid place-items-center text-xl">{c.thumbnail}</div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.lessons} lessons · {c.students.toLocaleString()} students</div>
                  </div>
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Analytics</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
