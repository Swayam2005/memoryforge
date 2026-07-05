"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Loader2,
  Menu,
} from "lucide-react";

import { api } from "@/lib/api";
import { useSidebar } from "@/context/sidebar-context";
import PageHeader from "./page-header";

export default function Topbar() {
  const { toggleSidebar } = useSidebar();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleSearch() {
    if (!query.trim() || loading) return;

    setLoading(true);
    setResult("");

    try {
      const response = await api.recall(query);

      if (response.success) {
        setResult(response.answer || "No memory found.");
      } else {
        setResult(response.message || "No memory found.");
      }
    } catch {
      setResult("Unable to connect to Memory Engine.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="sticky top-0 z-30 border-b border-zinc-800 bg-[#111113]/95 backdrop-blur"
      >
        <div className="flex h-16 items-center gap-6 px-6">

          {/* Menu */}

          <button
            onClick={toggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-[#18181B] hover:border-zinc-700 transition"
          >
            <Menu size={18} />
          </button>

          {/* Page */}

          <PageHeader />

          {/* Search */}

          <div className="ml-auto hidden w-full max-w-xl xl:block">

            <div className="relative">

              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search memories..."
                className="h-11 w-full rounded-2xl border border-zinc-800 bg-[#18181B] pl-11 pr-20 text-sm outline-none transition focus:border-emerald-500"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-zinc-700 px-2 py-1 text-xs text-zinc-500">
                Enter
              </div>

            </div>

          </div>

        </div>
      </motion.header>

      {(loading || result) && (
        <div className="border-b border-zinc-800 bg-[#18181B] px-6 py-4">

          {loading ? (

            <div className="flex items-center gap-2 text-zinc-400">

              <Loader2
                size={18}
                className="animate-spin"
              />

              Searching MemoryForge...

            </div>

          ) : (

            <div>

              <p className="text-sm font-semibold text-emerald-400">
                Search Result
              </p>

              <div className="mt-3 rounded-2xl border border-zinc-800 bg-[#111113] p-4 whitespace-pre-wrap text-zinc-300">
                {result}
              </div>

            </div>

          )}

        </div>
      )}
    </>
  );
}