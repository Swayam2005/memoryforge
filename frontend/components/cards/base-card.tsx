"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { theme } from "@/lib/theme";

interface BaseCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  children: ReactNode;
}

export default function BaseCard({
  title,
  subtitle,
  icon: Icon,
  children,
}: BaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`${theme.card} overflow-hidden`}
    >
      <div className="p-7">
        <div className="mb-7 flex items-center gap-4">
          <div className={theme.icon}>
            <Icon size={22} />
          </div>

          <div>
            <h2 className={theme.title}>
              {title}
            </h2>

            <p className={theme.subtitle}>
              {subtitle}
            </p>
          </div>
        </div>

        {children}
      </div>
    </motion.div>
  );
}