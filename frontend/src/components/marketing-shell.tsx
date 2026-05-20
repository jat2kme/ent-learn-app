"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

export function MarketingShell({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useApp();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="h-16 border-b border-border/60 sticky top-0 bg-background/80 backdrop-blur z-30">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/ENT_LOGO.png" alt="ENT Logo" className="size-8 rounded-lg object-contain bg-white p-0.5" />
            <div>
              <div className="font-display font-bold leading-none text-sm">ENT Flow</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Learn</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</Link>
            <Link href="/simulations" className="text-muted-foreground hover:text-foreground transition-colors">Simulations</Link>
            <Link href="/tutor" className="text-muted-foreground hover:text-foreground transition-colors">AI Tutor</Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </Button>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full">
              <Link href="/signup">Start free</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/ENT_LOGO.png" alt="ENT Logo" className="size-7 rounded-md object-contain bg-white p-0.5" />
              <span className="font-display font-bold">ENT Flow Learn</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              The AI-powered CFD learning ecosystem for engineers worldwide.
            </p>
          </div>
          <div>
            <div className="font-medium mb-3">Learn</div>
            <ul className="space-y-2 text-muted-foreground text-xs">
              <li><Link href="/courses">Course catalog</Link></li>
              <li><Link href="/simulations">Simulation lab</Link></li>
              <li><Link href="/tutor">AI tutor</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3">Platform</div>
            <ul className="space-y-2 text-muted-foreground text-xs">
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/certificates">Certifications</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground text-xs">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 text-xs text-muted-foreground">
          © 2026 ENT Flow Learn. Built for engineers.
        </div>
      </footer>
    </div>
  );
}
