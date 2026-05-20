"use client";

/**
 * PageContainer Component
 * Centralized/global layout wrapper for all pages
 * Provides consistent responsive padding and max-width across mobile/tablet/desktop
 */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  noPadding?: boolean;
}

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
} as const;

/**
 * Standardized page container with responsive padding:
 * - Mobile: p-4 (16px)
 * - Tablet: p-6 (24px) 
 * - Desktop: p-8 (32px)
 * 
 * Center-aligned with max-width constraint
 */
export function PageContainer({
  children,
  className,
  maxWidth = '7xl',
  noPadding = false,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'animate-fade-in will-change-smooth',
        !noPadding && 'p-4 md:p-6 lg:p-8',
        className
      )}
      style={{
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      <div className={cn('mx-auto space-y-6 transition-smooth', MAX_WIDTH_CLASSES[maxWidth])}>
        {children}
      </div>
    </div>
  );
}

/**
 * Alternative container for compact layouts (like settings)
 * Narrower max-width and consistent padding
 */
export function CompactPageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <PageContainer maxWidth="4xl" className={className}>
      {children}
    </PageContainer>
  );
}

/**
 * Container for full-width layouts (like dashboards)
 */
export function FullWidthPageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <PageContainer maxWidth="full" className={className}>
      {children}
    </PageContainer>
  );
}
