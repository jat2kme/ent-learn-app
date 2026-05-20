"use client";

import { cn } from '@/lib/utils';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useMemo } from "react";
import { MoreHorizontal, X, LayoutDashboard, BookOpen, FlaskConical, Bot, FolderKanban, Award, Users, GraduationCap, BarChart3, Settings } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerDescription
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/lib/app-context";
import { motion } from "framer-motion";

interface NavItemProps {
  item: { title: string; icon: React.ElementType; url: string };
  isActive: boolean;
  showActiveBackground?: boolean;
}

const getColorForRoute = (url: string): string => {
  const u = url.toLowerCase();
  if (u.includes('dashboard')) return 'bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700';
  if (u.includes('courses')) return 'bg-gradient-to-br from-indigo-400 to-indigo-600 dark:from-indigo-500 dark:to-indigo-700';
  if (u.includes('simulations')) return 'bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700';
  if (u.includes('tutor')) return 'bg-gradient-to-br from-lime-400 to-lime-600';
  if (u.includes('projects')) return 'bg-gradient-to-br from-emerald-400 to-emerald-600';
  if (u.includes('community')) return 'bg-gradient-to-br from-teal-400 to-teal-600';
  if (u.includes('admin')) return 'bg-gradient-to-br from-zinc-600 to-zinc-800';
  return 'bg-gradient-to-br from-primary/80 to-primary';
};

const NavItem = ({ item, isActive, showActiveBackground }: NavItemProps) => {
  if (showActiveBackground) {
    return (
      <div className={cn(
        "relative flex flex-col items-center justify-center gap-2 transition-all duration-300 w-full group",
        isActive ? "text-primary font-medium" : "text-muted-foreground"
      )}>
        <div className={cn(
          "w-14 h-14 flex items-center justify-center transition-all duration-500",
          "rounded-[22%] relative overflow-hidden shadow-md group-hover:shadow-lg",
          getColorForRoute(item.url),
          isActive && "ring-2 ring-offset-2 ring-primary dark:ring-offset-background"
        )}>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/5 to-transparent pointer-events-none" />
          <item.icon className={cn(
            "h-7 w-7 text-white drop-shadow-sm transition-transform duration-500 relative z-10",
            isActive ? "scale-110" : "group-hover:scale-110"
          )} />
        </div>
        <span className="text-[10px] font-medium transition-colors text-center line-clamp-1">{item.title}</span>
      </div >
    );
  }

  return (
    <div className={cn(
      "relative flex flex-col items-center justify-center gap-1 transition-all duration-300 w-full",
      isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
    )}>
      <item.icon className={cn(
        "h-5 w-5 transition-transform duration-300",
        isActive && "scale-110"
      )} />
      <span className="text-[10px] whitespace-nowrap transition-colors">{item.title}</span>
    </div>
  );
};

export function MobileNav() {
  const pathname = usePathname();
  const { role } = useApp();
  const [isSheetOpen, setSheetOpen] = useState(false);
  
  const menuSections = useMemo(() => {
    const nav: any = {
      student: [
        { label: "Main", items: [
          { url: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
          { url: "/courses", title: "Courses", icon: BookOpen },
          { url: "/simulations", title: "Sim Lab", icon: FlaskConical },
        ]},
        { label: "Tools", items: [
          { url: "/tutor", title: "AI Tutor", icon: Bot },
          { url: "/projects", title: "Projects", icon: FolderKanban },
        ]},
        { label: "Community", items: [
          { url: "/certificates", title: "Certificates", icon: Award },
          { url: "/community", title: "Community", icon: Users },
        ]}
      ],
      instructor: [
        { label: "Management", items: [
          { url: "/instructor", title: "Overview", icon: LayoutDashboard },
          { url: "/instructor/courses", title: "My Courses", icon: BookOpen },
          { url: "/instructor/students", title: "Students", icon: GraduationCap },
        ]},
        { label: "Community", items: [
          { url: "/community", title: "Community", icon: Users },
        ]}
      ],
      admin: [
        { label: "System", items: [
          { url: "/admin", title: "Analytics", icon: BarChart3 },
          { url: "/admin/users", title: "Users", icon: Users },
          { url: "/admin/courses", title: "Courses", icon: BookOpen },
          { url: "/admin/settings", title: "Settings", icon: Settings },
        ]}
      ]
    };
    return nav[role] || [];
  }, [role]);

  const pinnedItems = useMemo(() => {
    const all = menuSections.flatMap((s: any) => s.items);
    return all.slice(0, 4);
  }, [menuSections]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-border pb-safe">
      <div className="relative flex justify-around items-center h-16 px-2">
        
        {pinnedItems.map((item: any) => {
          const isActive = pathname === item.url || pathname.startsWith(item.url + '/');
          return (
            <Link 
              key={item.title} href={item.url} 
              className="relative z-10 flex-1 flex flex-col items-center justify-center p-1"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className={cn(
                    "absolute z-0 rounded-lg size-[50px]", // FIXED SIZE 50x50 matching source
                    "backdrop-blur-2xl bg-gradient-to-b from-slate-200/90 via-slate-100/80 to-white/70",
                    "dark:bg-gradient-to-b dark:from-white/10 dark:via-white/5 dark:to-white/5",
                    "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-2xl shadow-primary/30 dark:shadow-primary/20",
                    "border-2 border-border/30 dark:border-primary/30",
                    "ring-2 ring-slate-200/80 dark:ring-white/20",
                    "before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-90 before:blur-[2px]",
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent after:shadow-[0_0_16px_4px_rgba(var(--primary),0.9)]"
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <NavItem item={item} isActive={isActive} />
            </Link>
          );
        })}

        <Drawer open={isSheetOpen} onOpenChange={setSheetOpen}>
          <DrawerTrigger asChild>
            <button 
              className={cn(
                "relative z-10 flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300",
                isSheetOpen ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-[10px]">More</span>
            </button>
          </DrawerTrigger>

          <DrawerContent className="max-h-[85vh] rounded-t-[32px] glass-card border-b-0 overflow-hidden">
            <div className="w-16 h-1.5 bg-primary/20 rounded-full mx-auto mt-3 mb-2 shrink-0" />
            <DrawerHeader className="px-6 pb-2 text-left shrink-0">
              <DrawerTitle className="text-xl font-bold">Menu</DrawerTitle>
              <DrawerDescription className="sr-only">Mobile navigation menu</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-6 pt-2 pb-12 scrollbar-hide overscroll-contain">
              {menuSections.map((section: any) => (
                <div key={section.label} className="mt-6 first:mt-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4 px-1">{section.label}</h3>
                  <div className="grid grid-cols-4 gap-y-8 gap-x-2">
                    {section.items.map((item: any) => {
                      const isActive = pathname === item.url || pathname.startsWith(item.url + '/');
                      return (
                        <DrawerClose asChild key={item.url}>
                          <Link href={item.url} className="flex flex-col items-center justify-center p-1">
                            <NavItem item={item} isActive={isActive} showActiveBackground />
                          </Link>
                        </DrawerClose>
                      );
                    })}
                  </div>
                  <Separator className="mt-8 opacity-50" />
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}
