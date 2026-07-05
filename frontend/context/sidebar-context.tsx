"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SidebarContextType {
  collapsed: boolean;
  mobileOpen: boolean;
  isMobile: boolean;

  toggleSidebar: () => void;
  openMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext =
  createContext<SidebarContextType | null>(null);

export function SidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem(
      "sidebar-collapsed"
    );

    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem(
      "sidebar-collapsed",
      String(collapsed)
    );
  }, [collapsed]);

  // Detect screen size
  useEffect(() => {
    function update() {
      setIsMobile(window.innerWidth < 1024);
    }

    update();

    window.addEventListener("resize", update);

    return () =>
      window.removeEventListener(
        "resize",
        update
      );
  }, []);

  // Ctrl+B
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "b"
      ) {
        e.preventDefault();

        if (isMobile) {
          setMobileOpen((v) => !v);
        } else {
          setCollapsed((v) => !v);
        }
      }
    }

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, [isMobile]);

  function toggleSidebar() {
    if (isMobile) {
      setMobileOpen((v) => !v);
    } else {
      setCollapsed((v) => !v);
    }
  }

  function openMobile() {
    setMobileOpen(true);
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        mobileOpen,
        isMobile,
        toggleSidebar,
        openMobile,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context =
    useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider"
    );
  }

  return context;
}