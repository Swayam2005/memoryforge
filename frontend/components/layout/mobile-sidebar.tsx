"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  BrainCircuit,
  LayoutDashboard,
  Plus,
  Search,
  History,
  Settings,
} from "lucide-react";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Remember",
    href: "/remember",
    icon: Plus,
  },
  {
    title: "Recall",
    href: "/recall",
    icon: Search,
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

export default function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />

          {/* Drawer */}

          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col justify-between border-r border-zinc-800 bg-[#111113] lg:hidden"
          >
            {/* Top */}

            <div>
              {/* Header */}

              <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-700 bg-[#18181B]">
                    <BrainCircuit
                      size={22}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <h1 className="text-xl font-bold">
                      MemoryForge
                    </h1>

                    <p className="text-xs text-zinc-500">
                      AI Memory Platform
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl p-2 hover:bg-zinc-800"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation */}

              <nav className="mt-6 px-4">
                {navigation.map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={onClose}
                    >
                      <motion.div
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ x: 4 }}
                        className={`mb-2 flex items-center gap-4 rounded-2xl px-5 py-4 transition-all ${
                          active
                            ? "border border-zinc-700 bg-[#18181B] text-white"
                            : "text-zinc-400 hover:bg-[#18181B] hover:text-white"
                        }`}
                      >
                        <Icon size={20} />

                        <span className="font-medium">
                          {item.title}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom */}

            <div className="p-5">
              <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-800 bg-emerald-950/20">
                    <BrainCircuit
                      size={20}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Memory Engine
                    </h3>

                    <p className="text-sm text-emerald-400">
                      Online
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-zinc-800 pt-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />

                    All systems operational
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}