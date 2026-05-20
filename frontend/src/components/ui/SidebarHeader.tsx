"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarHeaderProps {
    isOpen: boolean;
    isDark: boolean;
}

export function SidebarHeader({ isOpen, isDark }: SidebarHeaderProps) {
  return (
    <div className={cn(
      "h-16 shrink-0 flex items-center transition-colors px-4",
      isOpen ? "justify-start" : "justify-center"
    )}>
      <Link href="/" className="flex items-center gap-2">
        <img src="/ENT_LOGO.png" alt="ENT Logo" className="size-8 rounded-lg object-contain bg-white p-0.5 shrink-0" />
        {isOpen && (
          <div className="overflow-hidden whitespace-nowrap">
            <div className="font-bold leading-none">ENT Flow</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Learn</div>
          </div>
        )}
      </Link>
    </div>
  );
}
