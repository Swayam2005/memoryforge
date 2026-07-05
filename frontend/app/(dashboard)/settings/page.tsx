"use client";

import { useEffect, useState } from "react";
import {
  Database,
  Server,
  Trash2,
  BrainCircuit,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await fetch("http://127.0.0.1:8000/dashboard");
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function clearMemories() {
    if (!confirm("Delete all locally stored memories?")) return;

    setLoading(true);

    try {
      await fetch("http://127.0.0.1:8000/forget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "",
        }),
      });

      alert("Memories cleared.");
      loadDashboard();
    } catch (e) {
      alert("Unable to clear memories.");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-5xl p-10 text-white">
      <h1 className="text-4xl font-bold">
        Settings
      </h1>

      <p className="mt-2 text-zinc-500">
        Manage your MemoryForge workspace.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6">
          <div className="flex items-center gap-3">

            <BrainCircuit className="text-violet-400" />

            <h2 className="text-lg font-semibold">
              Memory Engine
            </h2>

          </div>

          <div className="mt-6 flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={18} />
            Online
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6">
          <div className="flex items-center gap-3">

            <Database className="text-cyan-400" />

            <h2 className="text-lg font-semibold">
              Dataset
            </h2>

          </div>

          <p className="mt-6 text-zinc-400">
            memoryforge-demo-final
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6">
          <div className="flex items-center gap-3">

            <Server className="text-orange-400" />

            <h2 className="text-lg font-semibold">
              Backend
            </h2>

          </div>

          <p className="mt-6 text-zinc-400">
            http://127.0.0.1:8000
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6">
          <h2 className="text-lg font-semibold">
            Statistics
          </h2>

          <div className="mt-6 space-y-2 text-zinc-400">

            <div>
              Stored Memories :
              <span className="ml-2 font-semibold text-white">
                {stats?.stored_memories ?? 0}
              </span>
            </div>

            <div>
              Searches :
              <span className="ml-2 font-semibold text-white">
                {stats?.total_searches ?? 0}
              </span>
            </div>

            <div>
              Graph :
              <span className="ml-2 font-semibold text-emerald-400">
                {stats?.knowledge_graph}
              </span>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-10 rounded-3xl border border-red-900 bg-red-950/20 p-6">

        <h2 className="text-xl font-semibold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-2 text-zinc-400">
          Remove all locally stored memories.
        </p>

        <button
          onClick={clearMemories}
          disabled={loading}
          className="mt-6 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 transition hover:bg-red-700 disabled:opacity-50"
        >
          <Trash2 size={18} />

          {loading ? "Clearing..." : "Clear Memories"}
        </button>

      </div>
    </div>
  );
}