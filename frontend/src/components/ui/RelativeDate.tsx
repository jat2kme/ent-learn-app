"use client";

import { format, isToday, isTomorrow, isYesterday, isThisWeek, isThisYear } from "date-fns";
import { cn } from "@/lib/utils";

export interface RelativeDateProps {
    /**
     * Date to display (Date object or ISO string)
     */
    date: Date | string;
    /**
     * Format string for dates (uses date-fns format)
     * @default "MMM d, yyyy"
     */
    formatString?: string;
    /**
     * Whether to show time for recent dates
     * @default false
     */
    showTime?: boolean;
    /**
     * Additional className
     */
    className?: string;
    /**
     * Whether to show relative text (Today, Tomorrow, etc.)
     * @default true
     */
    relative?: boolean;
}

/**
 * RelativeDate - Smart date display component
 */
export function RelativeDate({
    date,
    formatString = "MMM d, yyyy",
    showTime = false,
    className,
    relative = true,
}: RelativeDateProps) {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        return <span className={cn("text-muted-foreground", className)}>Invalid date</span>;
    }

    const getDisplayText = (): string => {
        if (!relative) {
            return format(dateObj, formatString);
        }

        if (isToday(dateObj)) {
            if (showTime) {
                return `Today at ${format(dateObj, "h:mm a")}`;
            }
            return "Today";
        }

        if (isTomorrow(dateObj)) {
            if (showTime) {
                return `Tomorrow at ${format(dateObj, "h:mm a")}`;
            }
            return "Tomorrow";
        }

        if (isYesterday(dateObj)) {
            if (showTime) {
                return `Yesterday at ${format(dateObj, "h:mm a")}`;
            }
            return "Yesterday";
        }

        if (isThisWeek(dateObj)) {
            if (showTime) {
                return `${format(dateObj, "EEEE")} at ${format(dateObj, "h:mm a")}`;
            }
            return format(dateObj, "EEEE");
        }

        if (isThisYear(dateObj)) {
            if (showTime) {
                return format(dateObj, "MMM d 'at' h:mm a");
            }
            return format(dateObj, "MMM d");
        }

        if (showTime) {
            return format(dateObj, `${formatString} 'at' h:mm a`);
        }
        return format(dateObj, formatString);
    };

    return (
        <span className={cn("text-sm", className)} title={format(dateObj, "PPpp")}>
            {getDisplayText()}
        </span>
    );
}

export function RelativeDateShort({
    date,
    className,
}: {
    date: Date | string;
    className?: string;
}) {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        return <span className={cn("text-muted-foreground text-xs", className)}>-</span>;
    }

    const getShortText = (): string => {
        if (isToday(dateObj)) return "Today";
        if (isTomorrow(dateObj)) return "Tomorrow";
        if (isYesterday(dateObj)) return "Yesterday";
        if (isThisWeek(dateObj)) return format(dateObj, "EEE");
        if (isThisYear(dateObj)) return format(dateObj, "MMM d");
        return format(dateObj, "M/d/yy");
    };

    return (
        <span className={cn("text-xs text-muted-foreground", className)} title={format(dateObj, "PPpp")}>
            {getShortText()}
        </span>
    );
}
