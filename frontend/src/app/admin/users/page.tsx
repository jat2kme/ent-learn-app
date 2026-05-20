"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const USERS = [
  { name: "Aarav Sharma", email: "aarav@flowlearn.ai", role: "Student", plan: "Pro", status: "active" },
  { name: "Hannah Klein", email: "hannah@example.com", role: "Student", plan: "Free", status: "active" },
  { name: "Dr. Anika Rao", email: "anika@flowlearn.ai", role: "Instructor", plan: "—", status: "active" },
  { name: "Diego Moreno", email: "diego@example.com", role: "Student", plan: "Pro", status: "active" },
  { name: "Maya Chen", email: "maya@flowlearn.ai", role: "Admin", plan: "—", status: "active" },
  { name: "Marco Rossi", email: "marco@example.com", role: "Student", plan: "Free", status: "suspended" },
];

export default function AdminUsersPage() {
  return (
    <AppShell>
      <div className="space-y-6 text-left">
        <div className="flex items-end justify-between flex-wrap gap-4 text-left">
          <div className="text-left">
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground mt-1">Manage accounts, roles and subscriptions.</p>
          </div>
          <Input placeholder="Search users…" className="h-11 max-w-xs rounded-full" />
        </div>
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="grid grid-cols-12 px-5 py-3 border-b border-border text-xs uppercase tracking-wider text-muted-foreground text-left">
              <div className="col-span-4">User</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Plan</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {USERS.map((u) => (
              <div key={u.email} className="grid grid-cols-12 px-5 py-4 border-b border-border last:border-0 items-center text-left">
                <div className="col-span-4 flex items-center gap-3 text-left">
                  <div className="size-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold">
                    {u.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-left">{u.role}</div>
                <div className="col-span-2 text-sm text-left">{u.plan}</div>
                <div className="col-span-2 text-left">
                  <Badge variant="outline" className={u.status === "active" ? "border-success/40 text-success" : "border-destructive/40 text-destructive"}>
                    {u.status}
                  </Badge>
                </div>
                <div className="col-span-2 text-right"><Button size="sm" variant="outline">Manage</Button></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
