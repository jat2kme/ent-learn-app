import { cn } from "@/lib/utils";
import { memo, forwardRef } from "react";

interface GlassSelectionIndicatorProps {
    width: number;
    height: number;
    top: number;
    left: number;
    isVisible?: boolean;
    className?: string;
}

export const GlassSelectionIndicator = memo(forwardRef<HTMLDivElement, GlassSelectionIndicatorProps>(({
    width,
    height,
    top,
    left,
    isVisible = true,
    className,
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "absolute transition-all duration-500 ease-out z-0 pointer-events-none",
                "backdrop-blur-2xl bg-gradient-to-b from-slate-200/90 via-slate-100/80 to-white/70",
                "dark:bg-gradient-to-b dark:from-white/10 dark:via-white/5 dark:to-white/5",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-2xl shadow-primary/30 dark:shadow-primary/20",
                "border-2 border-slate-300/80 dark:border-primary/30",
                "ring-2 ring-slate-200/80 dark:ring-white/20",
                "rounded-lg",
                "before:absolute before:inset-x-0 before:bottom-0 before:h-[2px]",
                "before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent",
                "before:opacity-90 before:blur-[2px]",
                "after:absolute after:inset-x-0 after:bottom-0 after:h-[1px]",
                "after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent",
                "after:shadow-[0_0_16px_4px_rgba(var(--primary),0.9)]",
                !isVisible && "opacity-0",
                className
            )}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `translateY(${top}px)`,
                left: `${left}px`,
            }}
        />
    );
}));
