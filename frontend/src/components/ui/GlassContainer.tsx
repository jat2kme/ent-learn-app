"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Blur strength - controls the backdrop blur effect
     * @default "xl"
     */
    blur?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    /**
     * Whether to add border
     * @default true
     */
    border?: boolean;
    /**
     * Whether to add shadow
     * @default true
     */
    shadow?: boolean;
}

/**
 * GlassContainer - A fully transparent container with backdrop blur effect
 */
export const GlassContainer = React.forwardRef<HTMLDivElement, GlassContainerProps>(
    ({
        className,
        blur = "xl",
        border = true,
        shadow = true,
        children,
        ...props
    }, ref) => {
        const blurClasses = {
            sm: "backdrop-blur-sm",
            md: "backdrop-blur-md",
            lg: "backdrop-blur-lg",
            xl: "backdrop-blur-xl",
            "2xl": "backdrop-blur-2xl",
            "3xl": "backdrop-blur-3xl",
        };

        return (
            <div
                ref={ref}
                className={cn(
                    blurClasses[blur],
                    border && "border border-border/40",
                    shadow && "shadow-md",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

GlassContainer.displayName = "GlassContainer";
