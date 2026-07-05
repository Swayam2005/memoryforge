"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  History,
  Database,
  Clock3,
} from "lucide-react";

import HistoryStats from "@/components/history/history-stats";
import HistorySearch from "@/components/history/history-search";
import HistoryList from "@/components/history/history-list";

export default function HistoryPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 xl:px-10">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-[#111113] to-black p-8"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-900 bg-cyan-950/30 px-4 py-2">

              <History
                size={16}
                className="text-cyan-400"
              />

              <span className="text-sm font-medium text-cyan-400">
                Memory Timeline
              </span>

            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              History
            </h1>

            <p className="mt-4 leading-7 text-zinc-400">
              Browse, search and manage every memory stored inside
              MemoryForge.
            </p>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">

                <Database
                  size={22}
                  className="text-cyan-400"
                />

              </div>

              <h3 className="font-semibold">
                Memory Vault
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Every saved memory in one place.
              </p>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">

                <Clock3
                  size={22}
                  className="text-emerald-400"
                />

              </div>

              <h3 className="font-semibold">
                Activity
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Review every saved memory.
              </p>

            </div>

          </div>

        </div>

      </motion.div>

      {/* Stats */}

      <HistoryStats />

      {/* Search */}

      <HistorySearch
        value={search}
        onChange={setSearch}
      />

      {/* Memories */}

      <HistoryList
        search={search}
      />

    </div>
  );
}