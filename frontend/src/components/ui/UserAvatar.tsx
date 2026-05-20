"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export interface UserAvatarProps {
    /**
     * User object with avatar_url, first_name, last_name, etc.
     */
    user?: {
        avatar_url?: string | null;
        first_name?: string | null;
        last_name?: string | null;
        name?: string | null;
        display_name?: string | null;
        email?: string | null;
        gender?: string | null;
        photo?: string | null;
    } | null;
    /**
     * Avatar size
     * @default "md"
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
    /**
     * Additional className for the Avatar container
     */
    className?: string;
    /**
     * Fallback text (overrides auto-generated initials)
     */
    fallback?: string;
    /**
     * Show fallback icon instead of initials
     */
    showIcon?: boolean;
    /**
     * Gender for default avatar (overrides user.gender)
     */
    gender?: string | null;
}

const sizeClasses = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
    "2xl": "h-20 w-20 text-xl",
    "none": "",
};

const iconSizes = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
    "2xl": "h-10 w-10",
    "none": "h-1/2 w-1/2",
};

/**
 * UserAvatar - Smart avatar component with automatic fallback
 */
export function UserAvatar({
    user,
    size = "md",
    className,
    fallback,
    showIcon = false,
    gender,
}: UserAvatarProps) {
    const getInitials = (): string => {
        if (fallback) return fallback;
        if (!user) return "U";

        if (user.first_name || user.last_name) {
            const first = user.first_name?.[0] || "";
            const last = user.last_name?.[0] || "";
            const initials = (first + last).toUpperCase();
            return initials || "U";
        }

        const fullName = user.name || user.display_name;
        if (fullName) {
            const parts = fullName.trim().split(/\s+/);
            if (parts.length >= 2) {
                return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
            }
            return fullName.substring(0, 2).toUpperCase();
        }

        if (user.email) {
            return user.email.substring(0, 2).toUpperCase();
        }

        return "U";
    };

    const getName = (): string => {
        if (user?.first_name || user?.last_name) {
            return `${user.first_name || ''} ${user.last_name || ''}`.trim();
        }
        return user?.name || user?.display_name || user?.email || "User";
    };

    const getGenderColor = (): string => {
        const userGender = (gender || user?.gender || '').toLowerCase();
        if (userGender === 'male' || userGender === 'm') return 'bg-blue-500';
        if (userGender === 'female' || userGender === 'f') return 'bg-pink-500';
        if (userGender === 'other') return 'bg-purple-500';
        return 'bg-primary';
    };

    const avatarUrl = user?.avatar_url || user?.photo;

    return (
        <Avatar className={cn(sizeClasses[size], "border border-border/10 shadow-sm", className)}>
            <AvatarImage src={avatarUrl || undefined} alt={getName()} className="object-cover" />
            <AvatarFallback className={cn(getGenderColor(), "text-white font-semibold")}>
                {showIcon ? (
                    <User className={iconSizes[size]} />
                ) : (
                    getInitials()
                )}
            </AvatarFallback>
        </Avatar>
    );
}
