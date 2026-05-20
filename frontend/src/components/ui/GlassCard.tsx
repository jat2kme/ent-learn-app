"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Intensity of the glass effect
     * @default "medium"
     */
    intensity?: "light" | "medium" | "strong";
    /**
     * Whether to add shadow
     * @default true
     */
    shadow?: boolean;
}

/**
 * GlassCard - A card with glassmorphism effect
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, intensity = "medium", shadow = true, ...props }, ref) => {
        const intensityClasses = {
            light: "from-white/30 via-white/20 to-white/10 dark:from-white/[0.03] dark:via-white/[0.02] dark:to-transparent",
            medium: "from-white/40 via-white/30 to-white/20 dark:from-white/5 dark:via-white/[0.02] dark:to-transparent",
            strong: "from-white/50 via-white/40 to-white/30 dark:from-white/10 dark:via-white/5 dark:to-white/[0.02]",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl text-card-foreground bg-transparent border border-border/40 dark:border-border/20 bg-gradient-to-br",
                    intensityClasses[intensity],
                    "backdrop-blur-xl",
                    shadow && "shadow-2xl",
                    className
                )}
                {...props}
            />
        );
    }
);

GlassCard.displayName = "GlassCard";
