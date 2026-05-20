"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { PageContainer } from "@/components/layout/PageContainer";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Determine if sidebar should be hidden (e.g. login, signup)
  const isHeadless = pathname === "/login" || pathname === "/signup" || pathname === "/";

  if (isHeadless) {
    return <>{children}</>;
  }

  // Use full width for dashboard, standard for others
  const isDashboard = pathname.includes("/dashboard");

  return (
    <>
      <SidebarLayout />
      <SidebarInset className="h-full overflow-hidden flex flex-col">
        {/* Scrollable content area */}
        <div id="main-scroll-container" className="flex-1 overflow-y-auto scroll-smooth w-full h-full relative">
          {/* Header - Sticky at top */}
          <Header />

          {/* Main content area */}
          <main className="w-full min-h-[calc(100vh-4rem)]">
            <PageContainer maxWidth={isDashboard ? "full" : "7xl"}>
              {children}
            </PageContainer>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SidebarInset>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  );
}
