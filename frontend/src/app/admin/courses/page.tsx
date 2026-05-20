"use client";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/common/PageHeader";
import { COURSES } from "@/backend/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

export default function AdminCoursesPage() {
  return (
    <AppShell>
      <PageHeader
        icon={BookOpen}
        title="All courses"
        subtitle="Manage the platform course catalog and student enrollments."
        actions={
          <Button className="gradient-cyan text-primary-foreground border-0 rounded-full h-10">
            <Plus className="size-4" /> Create course
          </Button>
        }
      />

      <div className="space-y-6">
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-border text-xs uppercase tracking-wider text-muted-foreground text-left">
              <div className="col-span-5">Course</div>
              <div className="col-span-2">Level</div>
              <div className="col-span-2">Students</div>
              <div className="col-span-1">Rating</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {COURSES.map((c) => (
              <div key={c.id} className="grid grid-cols-12 px-5 py-4 border-b border-border last:border-0 items-center text-left">
                <div className="col-span-5 flex items-center gap-3 text-left">
                  <div className="size-9 rounded-md bg-accent/15 grid place-items-center text-lg">{c.thumbnail}</div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.instructor}</div>
                  </div>
                </div>
                <div className="col-span-2 text-left"><Badge variant="outline">{c.level}</Badge></div>
                <div className="col-span-2 text-sm text-left">{c.students.toLocaleString()}</div>
                <div className="col-span-1 text-sm text-left">★ {c.rating}</div>
                <div className="col-span-2 text-right"><Button size="sm" variant="outline">Review</Button></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
