"use client";

import { motion, AnimatePresence } from "framer-motion";

import Logo from "@/components/sidebar/logo";
import Navigation from "@/components/sidebar/navigation";
import StatusCard from "@/components/sidebar/status-card";

import { useSidebar } from "@/context/sidebar-context";

export default function Sidebar() {
  const {
    collapsed,
    mobileOpen,
    isMobile,
    closeMobile,
  } = useSidebar();

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#111113]">

      {/* Scrollable Area */}

      <div className="flex-1 overflow-y-auto">

        <Logo collapsed={collapsed && !isMobile} />

        <Navigation
          collapsed={collapsed && !isMobile}
          onNavigate={() => {
            if (isMobile) {
              closeMobile();
            }
          }}
        />

      </div>

      {/* Bottom Status */}
      {(!collapsed || isMobile) && (
        <div className="border-t border-zinc-800">
          <StatusCard
            collapsed={collapsed && !isMobile}
          />
        </div>
      )}

    </div>
  );

  return (
    <>
      {/* Desktop */}

      {!isMobile && (
        <motion.aside
          layout
          transition={{ duration: 0.25 }}
          animate={{
            width: collapsed ? 80 : 280,
          }}
          className="
            hidden
            h-screen
            shrink-0
            overflow-hidden
            border-r
            border-zinc-800
            bg-[#111113]
            lg:flex
          "
        >
          {sidebarContent}
        </motion.aside>
      )}

      {/* Mobile */}

      <AnimatePresence>

        {isMobile && mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.25 }}
              className="
                fixed
                left-0
                top-0
                z-50
                h-screen
                w-72
                overflow-hidden
                border-r
                border-zinc-800
                bg-[#111113]
              "
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}

      </AnimatePresence>
    </>
  );
}