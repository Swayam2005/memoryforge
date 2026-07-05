"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-[#111113] to-black p-10"
      >
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-800 bg-emerald-950/40 px-4 py-2">
              <ShieldCheck
                size={16}
                className="text-emerald-400"
              />

              <span className="text-sm font-medium text-emerald-400">
                Memory Engine Online
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              MemoryForge
            </h1>

            <p className="mt-4 max-w-2xl text-base lg:text-lg leading-8 text-zinc-400">
              Forge Knowledge. Recall Anything.
            </p>

            <p className="mt-3 max-w-2xl text-zinc-500">
              MemoryForge transforms conversations, notes, and ideas into an
              intelligent knowledge graph, allowing you to store, search, and
              recall information naturally using AI.
            </p>
          </div>

          {/* Right */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                <BrainCircuit
                  size={22}
                  className="text-violet-400"
                />
              </div>

              <h3 className="font-semibold">
                AI Memory
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Build a persistent memory using Cognee Knowledge Graph and
                FastAPI.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                <Sparkles
                  size={22}
                  className="text-cyan-400"
                />
              </div>

              <h3 className="font-semibold">
                Smart Recall
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Search memories naturally using semantic search with intelligent
                retrieval and local fallback.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}