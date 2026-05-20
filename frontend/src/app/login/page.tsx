"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useApp } from "@/lib/app-context";

export default function LoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useApp();
  const [loading, setLoading] = useState(false);

  void theme; void toggleTheme;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative bg-primary text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <Link href="/" className="relative flex items-center gap-2">
          <img src="/ENT_LOGO.png" alt="ENT Logo" className="size-9 rounded-lg object-contain bg-white p-0.5" />
          <div>
            <div className="font-display font-bold leading-none">ENT Flow Learn</div>
            <div className="text-[10px] uppercase tracking-widest opacity-70 mt-0.5">CFD Academy</div>
          </div>
        </Link>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">Engineered for outcomes.</h2>
          <p className="mt-4 opacity-80 max-w-md">
            Pick up where you left off — your residual plot is waiting.
          </p>
          <div className="mt-10 flex items-center gap-4 text-xs opacity-70">
            <span>★ 4.8 average rating</span>
            <span>·</span>
            <span>12,000+ engineers</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <img src="/ENT_LOGO.png" alt="ENT Logo" className="size-8 rounded-lg object-contain bg-white p-0.5" />
              <span className="font-display font-bold">ENT Flow Learn</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to continue learning.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => router.push("/dashboard"), 600);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="aarav@flowlearn.ai" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="demo1234" required />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 gradient-cyan text-primary-foreground border-0">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            New here? <Link href="/signup" className="text-accent font-medium">Create account</Link>
          </p>
          <p className="text-[11px] text-center text-muted-foreground mt-4">
            Demo only — any credentials work.
          </p>
        </div>
      </div>
    </div>
  );
}
