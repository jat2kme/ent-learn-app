"use client";

import { AppShell } from "@/components/app-shell";
import { CERTIFICATES } from "@/backend/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2 } from "lucide-react";

export default function CertificatesPage() {
  return (
    <AppShell>
      <div className="space-y-8 text-left">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your certificates</h1>
          <p className="text-muted-foreground mt-1">Industry-grade credentials, ready to share on LinkedIn.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {CERTIFICATES.map((c) => (
            <Card key={c.id} className="overflow-hidden border-border">
              <div className="aspect-[16/10] bg-primary text-primary-foreground p-8 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest opacity-70">Certificate of completion</div>
                      <div className="font-display font-bold mt-1">ENT Flow Learn</div>
                    </div>
                    <Award className="size-8 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs opacity-70 uppercase tracking-widest">Awarded to</div>
                    <div className="text-2xl font-display font-bold mt-1">Aarav Sharma</div>
                    <div className="text-sm opacity-90 mt-3">for successfully completing</div>
                    <div className="text-xl font-display font-bold mt-1">{c.courseTitle}</div>
                  </div>
                  <div className="flex items-end justify-between text-xs">
                    <div>
                      <div className="opacity-70">Issued</div>
                      <div className="font-mono">{c.issued}</div>
                    </div>
                    <div className="text-right">
                      <div className="opacity-70">Credential ID</div>
                      <div className="font-mono">{c.credentialId}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-sm font-medium">{c.courseTitle}</div>
                  <div className="text-xs text-muted-foreground">{c.level} · {c.issued}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><Share2 className="size-3.5" /></Button>
                  <Button size="sm" variant="outline"><Download className="size-3.5" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
