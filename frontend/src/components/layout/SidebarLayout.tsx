"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem as ShadcnSidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-context";
import { SidebarHeader } from "@/components/ui/SidebarHeader";
import { SidebarFooter } from "@/components/ui/SidebarFooter";
import { SidebarMenuItem as CustomSidebarMenuItem } from "@/components/ui/SidebarMenuItem";
import { useApp } from "@/lib/app-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, FlaskConical, Bot, FolderKanban, Award, Users,
  GraduationCap, BarChart3, Settings,
} from "lucide-react";
import { motion } from "framer-motion";

export function SidebarLayout() {
  const { open, isMobile } = useSidebar();
  const { theme, role } = useApp();
  const pathname = usePathname();

  const isDark = theme === 'dark';

  const menuSections = useMemo(() => {
    const nav: any = {
      student: [
        { label: "Main", items: [
          { url: "/dashboard", title: "Dashboard", icon: LayoutDashboard },
          { url: "/courses", title: "Courses", icon: BookOpen },
          { url: "/simulations", title: "Simulation Lab", icon: FlaskConical },
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

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible={isMobile ? "offcanvas" : "icon"}
      className="hidden md:flex shadow-sm"
    >
      <SidebarHeader isOpen={open} isDark={isDark} />

      <div className="flex-1 relative overflow-hidden">
        <SidebarContent className="bg-transparent !overflow-y-auto h-full relative">
          {menuSections.map((section: any, sectionIndex: number) => (
            <SidebarGroup key={section.label} className={sectionIndex === 0 ? "py-4" : "pb-4"}>
              {open && (
                <SidebarGroupLabel className="text-sidebar-foreground/60 px-2 mb-2 text-xs font-semibold uppercase tracking-wider">
                  {section.label}
                </SidebarGroupLabel>
              )}

              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items?.map((item: any) => {
                    const itemKey = `${item.url}-${item.title}`;
                    const isActive = pathname === item.url || pathname.startsWith(item.url + '/');
                    
                    return (
                      <ShadcnSidebarMenuItem key={itemKey} className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active-indicator"
                            className={cn(
                              "absolute inset-x-2 inset-y-0.5 z-0 rounded-lg",
                              "backdrop-blur-2xl bg-gradient-to-b from-slate-200/90 via-slate-100/80 to-white/70",
                              "dark:bg-gradient-to-b dark:from-white/10 dark:via-white/5 dark:to-white/5",
                              "shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] dark:shadow-2xl shadow-primary/20",
                              "border border-border/30 dark:border-primary/30",
                              "ring-1 ring-slate-200/50 dark:ring-white/10",
                              "before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-80",
                              "after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-primary after:to-transparent after:shadow-[0_0_12px_2px_rgba(var(--primary),0.6)]"
                            )}
                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                        <CustomSidebarMenuItem
                          item={item}
                          itemKey={itemKey}
                          isOpen={open}
                          onRef={() => {}}
                        />
                      </ShadcnSidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </div>

      <SidebarFooter isOpen={open} isDark={isDark} onLogout={() => {}} />
    </Sidebar>
  );
}
