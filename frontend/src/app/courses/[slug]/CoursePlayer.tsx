"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { COURSES } from "@/backend/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, FileQuestion, FlaskConical, Star, Clock, Users, ChevronRight, CheckCircle2 } from "lucide-react";
import { useState, use } from "react";

export default function CoursePlayer() {
  const params = useParams();
  const slug = params.slug as string;
  
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) {
    return (
      <AppShell>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Course not found</h1>
        </div>
      </AppShell>
    );
  }

  const flatLessons = course.modules.flatMap((m: any) => m.lessons.map((l: any) => ({ ...l, module: m.title as string })));
  const [activeIdx, setActiveIdx] = useState(0);
  const active = flatLessons[activeIdx];

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground">
          <Link href="/courses" className="hover:text-foreground">Courses</Link>
          <ChevronRight className="size-3 inline mx-1" /> {course.title}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Player */}
            <div className="aspect-video rounded-2xl border border-border overflow-hidden relative bg-primary text-primary-foreground">
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute inset-0 grid place-items-center">
                <button className="size-20 rounded-full gradient-cyan grid place-items-center hover:scale-105 transition-transform">
                  <Play className="size-7 ml-1 text-primary" fill="currentColor" />
                </button>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-xs opacity-70 uppercase tracking-widest">{active.module}</div>
                <div className="font-medium">{active.title}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Badge variant="outline">{course.level}</Badge>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Star className="size-3.5 fill-warning text-warning" /> {course.rating}</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="size-3.5" /> {course.durationHours}h</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground"><Users className="size-3.5" /> {course.students.toLocaleString()}</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>

            {course.progress !== undefined && (
              <div className="p-4 rounded-xl border border-border bg-muted/40">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Your progress</span>
                  <span className="font-mono">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            )}

            <div className="flex gap-3">
              <Button className="gradient-cyan text-primary-foreground border-0">Resume learning</Button>
              <Button variant="outline">Download resources</Button>
            </div>
          </div>

          {/* Curriculum */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card">
              <div className="p-4 border-b border-border">
                <div className="font-display font-bold">Course content</div>
                <div className="text-xs text-muted-foreground mt-1">{flatLessons.length} lessons · {course.durationHours}h total</div>
              </div>
              <div className="max-h-[560px] overflow-y-auto">
                {course.modules.map((m: any, mi: number) => (
                  <div key={m.title} className="border-b border-border last:border-b-0">
                    <div className="px-4 py-3 bg-muted/30 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Module {mi + 1} · {m.title}
                    </div>
                    {m.lessons.map((l: any) => {
                      const idx = flatLessons.findIndex((fl: any) => fl.title === l.title && fl.module === m.title);
                      const isActive = idx === activeIdx;
                      const Icon = l.type === "video" ? Play : l.type === "quiz" ? FileQuestion : FlaskConical;
                      return (
                        <button
                          key={l.title}
                          onClick={() => setActiveIdx(idx)}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm border-l-2 transition-colors ${
                            isActive ? "border-accent bg-accent/5" : "border-transparent hover:bg-muted/40"
                          }`}
                        >
                          <Icon className={`size-4 shrink-0 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="truncate">{l.title}</div>
                            <div className="text-[11px] text-muted-foreground font-mono">{l.duration}</div>
                          </div>
                          {idx < (course.progress ? Math.floor((course.progress / 100) * flatLessons.length) : 0) && (
                            <CheckCircle2 className="size-3.5 text-success shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Instructor</div>
              <div className="flex items-center gap-3 mt-2">
                <div className="size-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold text-sm">
                  {course.instructor.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium text-sm">{course.instructor}</div>
                  <div className="text-xs text-muted-foreground">CFD Lead Instructor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
