"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";

export default function AdminSettingsPage() {
  return (
    <AppShell>
      <div className="max-w-3xl space-y-6 text-left mx-auto">
        <PageHeader
          icon={Settings}
          title="Platform settings"
          subtitle="Branding, billing and feature flags."
        />
        <Card className="border-border">
          <CardContent className="p-6 space-y-5 text-left">
            <div className="space-y-2 text-left"><Label>Platform name</Label><Input defaultValue="ENT Flow Learn" /></div>
            <div className="space-y-2 text-left"><Label>Support email</Label><Input defaultValue="support@flowlearn.ai" /></div>
            <div className="flex items-center justify-between pt-2 text-left">
              <div className="text-left">
                <Label>Allow public signups</Label>
                <p className="text-xs text-muted-foreground mt-1">Anyone can create a free account.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between text-left">
              <div className="text-left">
                <Label>AI tutor enabled</Label>
                <p className="text-xs text-muted-foreground mt-1">Surface the AI tutor to all users.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between text-left">
              <div className="text-left">
                <Label>Cloud simulations queue</Label>
                <p className="text-xs text-muted-foreground mt-1">Throttle GPU compute for fair-use.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="gradient-cyan text-primary-foreground border-0">Save changes</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
