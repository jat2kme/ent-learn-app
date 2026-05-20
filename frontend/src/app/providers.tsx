"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { AppProvider } from "@/lib/app-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <SidebarProvider defaultOpen={true}>
          <TooltipProvider delayDuration={0}>
            {children}
          </TooltipProvider>
        </SidebarProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
