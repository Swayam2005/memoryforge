"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

interface LogoProps {
  collapsed: boolean;
}

export default function Logo({
  collapsed,
}: LogoProps) {
  return (
    <div className="border-b border-zinc-800 p-5">
      <div
        className={`flex items-center ${
          collapsed
            ? "justify-center"
            : "gap-4"
        }`}
      >
        {/* Logo Icon */}

        <motion.div
          layout
          transition={{
            duration: 0.25,
          }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-700 bg-[#18181B]"
        >
          <BrainCircuit
            size={24}
            className="text-emerald-400"
          />
        </motion.div>

        {/* Logo Text */}

        <motion.div
          layout
          initial={false}
          animate={{
            opacity: collapsed ? 0 : 1,
            width: collapsed ? 0 : "auto",
          }}
          transition={{
            duration: 0.2,
          }}
          className={`overflow-hidden ${
            collapsed ? "hidden" : "block"
          }`}
        >
          <h1 className="whitespace-nowrap text-xl font-bold tracking-tight">
            MemoryForge
          </h1>

          <p className="whitespace-nowrap text-sm text-zinc-500">
            AI Memory Platform
          </p>
        </motion.div>
      </div>
    </div>
  );
}