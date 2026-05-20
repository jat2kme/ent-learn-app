"use client";

import { GLASS_EFFECTS } from './glassmorphism.config';

export const BUTTON_CONFIG = {
  glass: {
    base: `${GLASS_EFFECTS.classes.xl} bg-background/60 border border-white/20 dark:border-white/10 rounded-lg transition-all duration-300`,
    icon: {
      base: `${GLASS_EFFECTS.classes.xl} bg-background/60 border border-white/20 dark:border-white/10 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg`,
      active: `${GLASS_EFFECTS.classes['2xl']} bg-gradient-to-b from-slate-200/90 via-slate-100/80 to-white/70 dark:bg-gradient-to-b dark:from-white/10 dark:via-white/5 dark:to-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-2xl shadow-primary/30 dark:shadow-primary/20 border-2 border-slate-300/80 dark:border-primary/30 ring-2 ring-slate-200/80 dark:ring-white/20`,
      hover: 'hover:bg-background/70 hover:border-white/30 dark:hover:border-white/20',
    },
    nav: {
      base: 'relative z-10 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-300',
      active: 'text-primary font-medium',
      inactive: 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
    },
    menu: {
      base: `relative overflow-hidden transition-all duration-300 ease-in-out ${GLASS_EFFECTS.classes.sm} w-full rounded-lg`,
      active: `bg-transparent text-primary font-semibold ${GLASS_EFFECTS.classes.md}`,
      inactive: `bg-transparent hover:bg-blue-50/30 dark:hover:bg-white/5 hover:${GLASS_EFFECTS.classes.md} text-sidebar-foreground hover:text-primary font-normal hover:font-medium`,
    },
  },
  dropdown: {
    content: `${GLASS_EFFECTS.classes.xl} bg-background/90 border border-white/20 dark:border-white/10 rounded-xl shadow-lg`,
    item: {
      base: `cursor-pointer transition-all duration-200 ${GLASS_EFFECTS.classes.sm}`,
      hover: `hover:bg-white/50 dark:hover:bg-white/10 hover:${GLASS_EFFECTS.classes.md}`,
      active: 'bg-white/70 dark:bg-white/15',
    },
  },
  size: {
    icon: 'h-9 w-9 p-2',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  },
} as const;
