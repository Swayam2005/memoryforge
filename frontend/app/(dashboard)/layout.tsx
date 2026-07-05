"use client";

import { SidebarProvider } from "@/context/sidebar-context";

import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>

      <div className="flex h-screen overflow-hidden bg-[#09090B] text-white">

        {/* Sidebar */}

        <Sidebar />

        {/* Main Content */}

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

          {/* Topbar */}

          <Topbar />

          {/* Page Content */}

          <main className="flex-1 overflow-y-auto">

            <div className="mx-auto w-full max-w-7xl px-6 py-8">

              {children}

            </div>

          </main>

        </div>

      </div>

    </SidebarProvider>
  );
}