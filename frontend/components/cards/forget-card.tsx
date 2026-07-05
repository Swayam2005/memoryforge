"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Trash2,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import BaseCard from "./base-card";
import { theme } from "@/lib/theme";
import { api } from "@/lib/api";

export default function ForgetCard() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function deleteMemory() {
    if (!query.trim()) {
      toast.error("Please enter what to delete.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const response = await api.forget(query);

      if (response.success) {
        toast.success(
          response.message || "Memory deleted successfully."
        );

        setQuery("");
      } else {
        toast.error(
          response.message || "Unable to delete memory."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseCard
      title="Forget"
      subtitle="Delete stored memories"
      icon={Trash2}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" ||
            (e.ctrlKey && e.key === "Enter")
          ) {
            deleteMemory();
          }
        }}
        placeholder="What should MemoryForge forget?"
        className={theme.input}
      />

      <div className="mt-2 text-xs text-zinc-500">
        Press <span className="font-medium">Enter</span> to delete matching memories.
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-900 bg-red-950/20 p-5">
        <AlertTriangle
          size={20}
          className="mt-0.5 text-red-400"
        />

        <div>
          <p className="font-medium text-red-300">
            Warning
          </p>

          <p className="mt-1 text-sm text-red-400">
            Deleted memories cannot be recovered.
          </p>
        </div>
      </div>

      <button
        onClick={deleteMemory}
        disabled={loading}
        className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-red-600 font-medium transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2
              className="animate-spin"
              size={18}
            />
            Deleting...
          </div>
        ) : (
          "Delete Memory"
        )}
      </button>
    </BaseCard>
  );
}