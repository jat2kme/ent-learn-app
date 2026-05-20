"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter(x => x);

  if (pathname === '/' || pathnames.length === 0) {
    return null;
  }

  const formatName = (name: string): string => {
    return name
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="flex items-center text-[10px] text-muted-foreground/60 gap-1" aria-label="Breadcrumb">
      <Link href="/dashboard" className="hover:text-foreground transition-colors flex items-center opacity-70 hover:opacity-100">
        <Home className="size-3" />
      </Link>

      {pathnames.map((name, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center gap-1">
            <ChevronRight className="size-3 flex-shrink-0 opacity-50" />
            {isLast ? (
              <span className="capitalize font-medium text-foreground/80 truncate max-w-[120px]" aria-current="page">
                {formatName(name)}
              </span>
            ) : (
              <Link href={to} className="hover:text-foreground transition-colors capitalize truncate max-w-[80px] opacity-60 hover:opacity-100">
                {formatName(name)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
