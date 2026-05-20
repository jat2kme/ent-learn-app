"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TAB_STYLES } from "@/config/text-styles";

interface ResponsiveTabsListProps extends React.ComponentPropsWithoutRef<typeof TabsList> {
  variant?: 'centered' | 'start' | 'scrollable';
}

export const ResponsiveTabsList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  ResponsiveTabsListProps
>(({ className, variant = 'scrollable', children, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = React.useState(false);
  const [showRightIndicator, setShowRightIndicator] = React.useState(false);

  const variantStyles = {
    centered: 'justify-center',
    start: 'justify-start',
    scrollable: 'justify-start',
  };

  const checkScroll = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftIndicator(scrollLeft > 5);
    setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  return (
    <div className="mb-6">
      <div className="relative">
        {showLeftIndicator && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none sm:hidden">
            <div className="w-6 h-6 rounded-full bg-background/90 backdrop-blur-sm shadow-md flex items-center justify-center animate-pulse">
              <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
        )}

        {showRightIndicator && (
          <>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-muted/80 to-transparent z-0 pointer-events-none rounded-r-xl sm:hidden transition-opacity duration-300" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none sm:hidden">
              <div className="w-6 h-6 rounded-full bg-background/90 backdrop-blur-sm shadow-md flex items-center justify-center animate-pulse">
                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </>
        )}

        <div className="rounded-xl bg-muted/50 backdrop-blur-sm">
          <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
            <TabsList
              ref={ref}
              className={cn(
                "flex h-auto w-max min-w-full items-center gap-1 bg-transparent p-1.5",
                variantStyles[variant],
                className
              )}
              {...props}
            >
              {children}
            </TabsList>
          </div>
        </div>
      </div>
    </div>
  );
});
ResponsiveTabsList.displayName = "ResponsiveTabsList";

interface ResponsiveTabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsTrigger> {
  icon?: React.ReactNode;
  minWidth?: string;
  status?: 'complete' | 'incomplete' | 'none';
}

export const ResponsiveTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  ResponsiveTabsTriggerProps
>(({ className, icon, minWidth = "min-w-[100px]", status = 'none', children, ...props }, ref) => {
  return (
    <TabsTrigger
      ref={ref}
      className={cn(
        "flex items-center justify-center whitespace-nowrap flex-shrink-0 rounded-lg px-4 py-2.5 gap-2 relative transition-all duration-200 border border-transparent",
        status === 'complete' && "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400 data-[state=active]:bg-green-500/20 data-[state=active]:border-green-500/30",
        minWidth,
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative">
        {children}
        {status !== 'none' && (
          <span className={cn(
            "absolute -top-1 -right-3 w-2 h-2 rounded-full",
            status === 'complete' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"
          )} />
        )}
      </span>
    </TabsTrigger>
  );
});
ResponsiveTabsTrigger.displayName = "ResponsiveTabsTrigger";

export const ResponsiveTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent>
>(({ className, ...props }, ref) => {
  return (
    <TabsContent
      ref={ref}
      className={cn(TAB_STYLES.content, className)}
      {...props}
    />
  );
});
ResponsiveTabsContent.displayName = "ResponsiveTabsContent";

export { Tabs };
