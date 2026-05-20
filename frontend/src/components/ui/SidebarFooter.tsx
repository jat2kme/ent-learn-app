"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
    isOpen: boolean;
    isDark: boolean;
    onLogout: () => void;
}

export function SidebarFooter({ isOpen, isDark, onLogout }: SidebarFooterProps) {
    return (
        <div className="flex-shrink-0 p-3 sticky bottom-0 bg-sidebar z-10">
            <Tooltip key={isOpen ? "open" : "closed"}>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size={isOpen ? "default" : "icon"}
                        onClick={onLogout}
                        className={cn(
                            "transition-all duration-200",
                            isOpen ? "w-full justify-start gap-3 px-3" : "w-10 h-10 justify-center rounded-md",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <LogOut className="h-4 w-4" />
                        {isOpen && <span className="text-sm font-medium">Logout</span>}
                    </Button>
                </TooltipTrigger>
                {!isOpen && (
                    <TooltipContent side="right">
                        Logout
                    </TooltipContent>
                )}
            </Tooltip>
        </div>
    );
}
