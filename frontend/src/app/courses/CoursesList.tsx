"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Star, Clock, Users, Loader2, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Course } from "@/backend/types";

export default function CoursesList() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<string>("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  const filtered = courses.filter(
    (c) =>
      (level === "all" || c.level.toLowerCase() === level) &&
      (c.title.toLowerCase().includes(q.toLowerCase()) || (c.category?.toLowerCase() || "").includes(q.toLowerCase())),
  );

  return (
    <AppShell>
      <PageHeader
        icon={BookOpen}
        title="Course catalog"
        subtitle={`${loading ? "..." : courses.length} expert-led CFD courses`}
        actions={
          <div className="relative max-w-sm w-full">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…" className="pl-9 h-10 w-64" />
          </div>
        }
      />

      <div className="space-y-8">
        <Tabs value={level} onValueChange={setLevel}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value={level} className="mt-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
                <Loader2 className="size-8 animate-spin text-accent" />
                <p>Loading catalog...</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((c) => (
                    <Link
                      key={c.id} href={`/courses/${c.slug}`}
                      className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-accent/50 hover:shadow-cyan transition-all"
                    >
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary/15 to-accent/20 grid place-items-center text-6xl relative">
                        {c.thumbnail}
                        {c.price === 0 && (
                          <Badge className="absolute top-3 left-3 bg-success text-success-foreground border-0">Free</Badge>
                        )}
                        <Badge variant="outline" className="absolute top-3 right-3 bg-background/80 backdrop-blur">
                          {c.level}
                        </Badge>
                      </div>
                      <div className="p-5">
                        <div className="text-[10px] uppercase tracking-widest text-accent font-medium">{c.category}</div>
                        <h3 className="font-display font-bold text-lg mt-1 leading-snug group-hover:text-accent transition-colors">{c.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.description}</p>
                        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Star className="size-3 fill-warning text-warning" /> {c.rating}</span>
                          <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {c.durationHours}h</span>
                          <span className="inline-flex items-center gap-1"><Users className="size-3" /> {c.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <div className="text-xs text-muted-foreground">{c.instructor}</div>
                          <div className="font-bold font-display">{c.price === 0 ? "Free" : `$${c.price}`}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">No courses match.</div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        <div className="text-center pt-8">
          <Button asChild variant="outline" className="rounded-full"><Link href="/pricing">See all plans</Link></Button>
        </div>
      </div>
    </AppShell>
  );
}
