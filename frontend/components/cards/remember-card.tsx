"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import BaseCard from "./base-card";
import { theme } from "@/lib/theme";
import { api } from "@/lib/api";

export default function RememberCard() {
  const [memory, setMemory] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleRemember() {
    if (!memory.trim() || loading) return;

    setLoading(true);
    setSaved(false);

    try {
      const result = await api.remember(memory);

      if (result.success) {
        setSaved(true);
        setMemory("");

        setTimeout(() => {
          setSaved(false);
        }, 2500);
      } else {
        alert(result.message || "Unable to save memory.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save memory.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseCard
      title="Remember"
      subtitle="Store a new memory"
      icon={BrainCircuit}
    >
      <textarea
        rows={8}
        value={memory}
        onChange={(e) => setMemory(e.target.value)}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            handleRemember();
          }
        }}
        placeholder="Write something you want MemoryForge to remember..."
        className={theme.textarea}
      />

      <div className="mt-2 text-xs text-zinc-500">
        Tip: Press <span className="font-medium">Ctrl + Enter</span> to save
      </div>

      {saved && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-800 bg-emerald-950/40 p-3 text-sm text-emerald-400">
          <CheckCircle2 size={18} />
          Memory saved successfully.
        </div>
      )}

      <button
        onClick={handleRemember}
        disabled={loading}
        className={`${theme.button} mt-5 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2
              className="animate-spin"
              size={18}
            />
            Saving...
          </div>
        ) : (
          "Save Memory"
        )}
      </button>
    </BaseCard>
  );
}