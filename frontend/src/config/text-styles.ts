"use client";

export const TEXT_COLORS = {
  primary: 'text-foreground',
  secondary: 'text-muted-foreground',
  tertiary: 'text-muted-foreground/70',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400',
  link: 'text-primary hover:text-primary/80 underline-offset-4 hover:underline',
  linkSubtle: 'text-primary hover:text-primary/80',
  muted: 'text-muted-foreground',
  disabled: 'text-muted-foreground/50',
  placeholder: 'text-muted-foreground/60',
  brand: 'text-primary',
  brandAccent: 'text-accent',
  brandSecondary: 'text-secondary',
  inverse: 'text-primary-foreground',
} as const;

export const HEADING_STYLES = {
  h1: 'text-4xl sm:text-5xl font-bold tracking-tight text-foreground',
  h2: 'text-3xl sm:text-4xl font-bold tracking-tight text-foreground',
  h3: 'text-2xl sm:text-3xl font-semibold tracking-tight text-foreground',
  h4: 'text-xl sm:text-2xl font-semibold tracking-tight text-foreground',
  h5: 'text-lg sm:text-xl font-semibold text-foreground',
  h6: 'text-base sm:text-lg font-semibold text-foreground',
} as const;

export const BODY_TEXT_STYLES = {
  large: 'text-lg text-foreground',
  largeMuted: 'text-lg text-muted-foreground',
  base: 'text-base text-foreground',
  baseMuted: 'text-base text-muted-foreground',
  small: 'text-sm text-foreground',
  smallMuted: 'text-sm text-muted-foreground',
  xs: 'text-xs text-foreground',
  xsMuted: 'text-xs text-muted-foreground',
  lead: 'text-xl text-muted-foreground',
} as const;

export const GLASS_STYLES = {
  base: 'backdrop-blur-xl bg-background/70 border border-white/20 dark:border-white/10',
  card: 'backdrop-blur-xl bg-card/60 dark:bg-card/40 border border-black/5 dark:border-white/10 rounded-xl shadow-lg',
  cardHover: 'backdrop-blur-xl bg-card/70 dark:bg-card/50 border border-black/10 dark:border-white/20 rounded-xl shadow-xl transition-all duration-300',
  menuItem: {
    base: 'backdrop-blur-sm transition-all duration-300 ease-in-out',
    default: 'bg-transparent hover:bg-white/30 dark:hover:bg-white/5 hover:backdrop-blur-md',
    active: 'bg-white/90 dark:bg-white/10 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] border border-white/40 dark:border-white/20 transform scale-[1.02]',
  },
} as const;

export const TAB_STYLES = {
  list: {
    base: 'inline-flex h-auto items-center justify-start lg:justify-center gap-1 rounded-xl bg-muted/50 p-1.5 backdrop-blur-sm',
    responsive: 'min-w-full lg:min-w-0 lg:w-auto',
    scroll: 'overflow-x-auto scrollbar-hide',
    wrapper: 'mb-6 overflow-x-auto',
  },
  trigger: {
    base: 'flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    default: 'text-muted-foreground',
    active: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md',
  },
  content: 'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
} as const;
