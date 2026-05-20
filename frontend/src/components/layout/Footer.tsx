"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function Footer() {
  return (
    <footer className="hidden md:flex fixed bottom-0 left-0 right-0 h-8 items-center justify-between px-4 bg-background/50 backdrop-blur border-t border-border/20 z-40">
      <Breadcrumbs />
      <div className="text-[10px] text-muted-foreground/50 font-mono select-none">
        v1.0.0
      </div>
    </footer>
  );
}
