"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-6 lg:p-12 order-2 lg:order-1">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <img src="/ENT_LOGO.png" alt="ENT Logo" className="size-8 rounded-lg object-contain bg-white p-0.5" />
              <span className="font-display font-bold">ENT Flow Learn</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Free forever, no credit card required.</p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => router.push("/dashboard"), 700);
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="first">First name</Label>
                <Input id="first" defaultValue="Aarav" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" defaultValue="Sharma" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="aarav@flowlearn.ai" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="demo1234" required />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 gradient-cyan text-primary-foreground border-0">
              {loading ? "Creating account…" : "Create free account"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Already have an account? <Link href="/login" className="text-accent font-medium">Log in</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex relative bg-primary text-primary-foreground p-12 flex-col justify-between overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <Link href="/" className="relative flex items-center gap-2">
          <img src="/ENT_LOGO.png" alt="ENT Logo" className="size-9 rounded-lg object-contain bg-white p-0.5" />
          <div>
            <div className="font-display font-bold leading-none">ENT Flow Learn</div>
            <div className="text-[10px] uppercase tracking-widest opacity-70 mt-0.5">CFD Academy</div>
          </div>
        </Link>
        <div className="relative space-y-6">
          <h2 className="text-4xl font-bold leading-tight">From theory to your first solver run — in one platform.</h2>
          <ul className="space-y-3 text-sm opacity-90">
            {[
              "20+ structured CFD courses",
              "Browser-based OpenFOAM lab",
              "AI tutor for debugging & guidance",
              "Industry-recognised certificates",
            ].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />{s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
