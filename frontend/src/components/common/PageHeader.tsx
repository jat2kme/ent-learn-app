"use client";

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { LucideIcon, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
  className?: string;
  backTo?: string;
}

/**
 * PageHeader Component
 * 
 * Reusable page header with icon, title, subtitle, and action buttons
 */
export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  actions,
  className,
  backTo
}: PageHeaderProps) {
  const router = useRouter();
  return (
    <div className={cn("mb-6 sm:mb-8", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {backTo && (
            <Button variant="ghost" size="icon" onClick={() => router.push(backTo)} className="-ml-2 shrink-0">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          )}
          <div className="p-2.5 sm:p-3 bg-primary rounded-xl shadow-lg shrink-0">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex flex-wrap gap-2 w-full sm:w-auto">{actions}</div>}
      </div>
    </div>
  );
}
