"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "./mock-data";

type Theme = "light" | "dark";

type AppCtx = {
  role: Role;
  setRole: (r: Role) => void;
  theme: Theme;
  toggleTheme: () => void;
  user: { name: string; email: string; avatar: string };
};

const Ctx = createContext<AppCtx | null>(null);

const USERS_BY_ROLE: Record<Role, AppCtx["user"]> = {
  student: { name: "Aarav Sharma", email: "aarav@flowlearn.ai", avatar: "AS" },
  instructor: { name: "Dr. Anika Rao", email: "anika@flowlearn.ai", avatar: "AR" },
  admin: { name: "Maya Chen", email: "maya@flowlearn.ai", avatar: "MC" },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("student");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedRole = localStorage.getItem("efl-role") as Role | null;
    const savedTheme = localStorage.getItem("efl-theme") as Theme | null;
    if (savedRole) setRoleState(savedRole);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof window !== "undefined") localStorage.setItem("efl-theme", theme);
  }, [theme]);

  const setRole = (r: Role) => {
    setRoleState(r);
    if (typeof window !== "undefined") localStorage.setItem("efl-role", r);
  };

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <Ctx.Provider value={{ role, setRole, theme, toggleTheme, user: USERS_BY_ROLE[role] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used within AppProvider");
  return c;
}
