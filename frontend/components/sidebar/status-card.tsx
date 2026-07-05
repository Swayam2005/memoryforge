"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

interface StatusCardProps {
  collapsed: boolean;
}

export default function StatusCard({
  collapsed,
}: StatusCardProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.25 }}
      className="p-4 pt-2"
    >
      <div
        className={`rounded-2xl border border-zinc-800 bg-[#18181B] ${
          collapsed ? "p-3" : "p-4"
        }`}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
            <BrainCircuit
              size={20}
              className="text-emerald-400"
            />
          </div>

          {!collapsed && (
            <motion.div layout>
              <h3 className="text-sm font-semibold">
                Memory Engine
              </h3>

              <p className="text-xs text-emerald-400">
                Online
              </p>
            </motion.div>
          )}
        </div>

        {!collapsed && (
          <div className="mt-4 border-t border-zinc-800 pt-3">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              All systems operational
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}