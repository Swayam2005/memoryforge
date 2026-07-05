"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  Settings,
} from "lucide-react";

import NavigationItem from "./navigation-item";

interface NavigationProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Navigation({
  collapsed,
  onNavigate,
}: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="mt-6 flex flex-col gap-1 px-3">
      {navigation.map((item) => (
        <NavigationItem
          key={item.href}
          title={item.title}
          href={item.href}
          icon={item.icon}
          active={pathname === item.href}
          collapsed={collapsed}
          onClick={onNavigate}
        />
      ))}
    </nav>
  );
}