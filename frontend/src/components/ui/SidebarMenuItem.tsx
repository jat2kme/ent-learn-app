"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  item: {
    title: string;
    url: string;
    icon: LucideIcon;
  };
  itemKey: string;
  isOpen: boolean;
  onRef: (el: HTMLAnchorElement | null) => void;
}

export function SidebarMenuItem({
  item,
  itemKey,
  isOpen,
  onRef,
}: SidebarMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.url || pathname.startsWith(item.url + '/');

  return (
    <Tooltip key={isOpen ? "open" : "closed"} open={isOpen ? false : undefined} delayDuration={0}>
      <TooltipTrigger asChild>
        <div className="px-2 py-0.5 my-0.5 relative">
          <Link
            ref={onRef}
            href={item.url}
            className={cn(
              "flex items-center gap-3 min-h-[40px] px-3 rounded-lg transition-all duration-300 relative z-10 group",
              isActive 
                ? "text-primary font-semibold" 
                : "text-sidebar-foreground hover:bg-blue-50/30 dark:hover:bg-white/5 hover:backdrop-blur-md text-sidebar-foreground hover:text-primary font-normal hover:font-medium hover:translate-x-1"
            )}
          >
            {/* 
                NOTE: The active 'card' background is provided by the GlassSelectionIndicator 
                in the SidebarLayout for a smoother, synchronized sliding animation.
            */}
            
            <item.icon className={cn(
              "size-5 shrink-0 transition-transform duration-300",
              isActive ? "scale-110" : "group-hover:scale-110"
            )} />
            
            {isOpen && (
              <span className={cn(
                "text-sm font-medium truncate transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0"
              )}>
                {item.title}
              </span>
            )}
          </Link>
        </div>
      </TooltipTrigger>
      {!isOpen && (
        <TooltipContent
          side="right"
          className="font-medium bg-popover text-popover-foreground shadow-xl border border-border/50 backdrop-blur-md"
        >
          {item.title}
        </TooltipContent>
      )}
    </Tooltip>
  );
}
