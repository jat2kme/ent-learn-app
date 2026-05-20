"use client";

import { Search, Bell, Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-context";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import type { Role } from "@/backend/types";

export function Header() {
  const { theme, toggleTheme, user, role, setRole } = useApp();
  const { setOpenMobile } = useSidebar();

  const ROLE_LABEL: Record<Role, string> = { student: "Student", instructor: "Instructor", admin: "Admin" };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 bg-background/80 backdrop-blur z-30">
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>
        <div className="text-sm text-muted-foreground hidden sm:block">
          Welcome back, <span className="text-foreground font-medium">{user.name.split(" ")[0]}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <span className="hidden sm:inline">{ROLE_LABEL[role]}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Preview as role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={role} onValueChange={(v) => setRole(v as Role)}>
              <DropdownMenuRadioItem value="student">Student</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="instructor">Instructor</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 ml-1">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground font-normal">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/">Home</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
