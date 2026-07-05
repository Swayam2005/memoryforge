"use client";

import { useState } from "react";
import {
  Search,
  Loader2,
  Database,
} from "lucide-react";

import BaseCard from "./base-card";
import { theme } from "@/lib/theme";
import { api } from "@/lib/api";

export default function RecallCard() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRecall() {
    if (!query.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setSource("");

    try {
      const result = await api.recall(query);

      if (result.success) {
        setAnswer(result.answer ?? "No memories found.");
        setSource(result.source ?? "");
      } else {
        setAnswer(result.message || "Unable to recall memory.");
      }
    } catch (error) {
      console.error(error);
      setAnswer("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseCard
      title="Recall"
      subtitle="Search stored memories"
      icon={Search}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" ||
            (e.ctrlKey && e.key === "Enter")
          ) {
            handleRecall();
          }
        }}
        placeholder="Ask MemoryForge..."
        className={theme.input}
      />

      <div className="mt-2 text-xs text-zinc-500">
        Press <span className="font-medium">Enter</span> to search
      </div>

      <div className="mt-5 min-h-[190px] rounded-2xl border border-zinc-800 bg-[#111113] p-5">

        {loading ? (

          <div className="flex h-full flex-col items-center justify-center gap-3">

            <Loader2
              className="animate-spin text-emerald-400"
              size={28}
            />

            <p className="text-sm text-zinc-500">
              Searching MemoryForge...
            </p>

          </div>

        ) : answer ? (

          <div>

            <div className="mb-4 flex items-center justify-between">

              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Search Result
              </p>

              {source && (
                <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
                  <Database size={14} />
                  {source}
                </div>
              )}

            </div>

            <div className="whitespace-pre-wrap rounded-xl bg-[#18181B] p-4 text-sm leading-7 text-zinc-200">
              {answer}
            </div>

          </div>

        ) : (

          <div className="flex h-full items-center justify-center">

            <p className="text-center text-sm text-zinc-500">
              Search results will appear here.
            </p>

          </div>

        )}

      </div>

      <button
        onClick={handleRecall}
        disabled={loading}
        className={`${theme.button} mt-5 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2
              className="animate-spin"
              size={18}
            />
            Searching...
          </div>
        ) : (
          "Search Memory"
        )}
      </button>
    </BaseCard>
  );
}