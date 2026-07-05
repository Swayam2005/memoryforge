"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface NavigationItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

export default function NavigationItem({
  title,
  href,
  icon: Icon,
  active,
  collapsed,
  onClick,
}: NavigationItemProps) {
  return (
    <Link href={href}>
      <motion.div
        onClick={onClick}
        whileHover={{
          x: collapsed ? 0 : 4,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.2,
        }}
        className={`group relative mb-2 flex cursor-pointer items-center rounded-2xl transition-all duration-200 ${
          collapsed
            ? "justify-center px-3 py-4"
            : "gap-4 px-5 py-4"
        } ${
          active
            ? "border border-zinc-700 bg-[#18181B] text-white"
            : "text-zinc-400 hover:bg-[#18181B] hover:text-white"
        }`}
      >
        {/* Icon */}

        <Icon
          size={20}
          className="shrink-0"
        />

        {/* Title */}

        {!collapsed && (
          <span className="whitespace-nowrap font-medium">
            {title}
          </span>
        )}

        {/* Tooltip */}

        {collapsed && (
          <div
            className="
              pointer-events-none
              absolute
              left-full
              z-50
              ml-4
              hidden
              whitespace-nowrap
              rounded-lg
              border
              border-zinc-700
              bg-zinc-900
              px-3
              py-2
              text-sm
              text-white
              shadow-xl
              group-hover:block
            "
          >
            {title}
          </div>
        )}
      </motion.div>
    </Link>
  );
}