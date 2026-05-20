"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface InnerContainerCardProps extends ComponentProps<typeof Card> {
    noHover?: boolean;
}

export function InnerContainerCard({ className, children, noHover, ...props }: InnerContainerCardProps) {
    return (
        <Card
            className={cn(
                "flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 min-h-[64px] sm:min-h-[72px] transition-all group shadow-none",
                "bg-transparent dark:bg-white/5",
                "border border-border/50 dark:border-border/20",
                !noHover && "cursor-pointer hover:bg-black/5 dark:hover:bg-white/10",
                className
            )}
            {...props}
        >
            {children}
        </Card>
    );
}

export function InnerContainerCardTitle({ className, children, ...props }: ComponentProps<"p">) {
    return (
        <p className={cn("text-sm font-semibold text-foreground truncate leading-none mb-1", className)} {...props}>
            {children}
        </p>
    );
}

export function InnerContainerCardSubtitle({ className, children, ...props }: ComponentProps<"p">) {
    return (
        <p className={cn("text-xs text-muted-foreground line-clamp-1", className)} {...props}>
            {children}
        </p>
    );
}

export function InnerContainerCardContent({ className, children, ...props }: ComponentProps<"div">) {
    return (
        <div className={cn("flex-1 min-w-0 flex flex-col justify-center", className)} {...props}>
            {children}
        </div>
    );
}
