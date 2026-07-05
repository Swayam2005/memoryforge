"use client";

import { useEffect, useState } from "react";
import {
  Database,
  Search,
  Activity,
  Clock3,
} from "lucide-react";

import { api } from "@/lib/api";

interface DashboardData {
  stored_memories: number;
  total_searches: number;
  knowledge_graph: string;
  graph_integrity: string;
  last_sync: string;
}

export default function HistoryStats() {
  const [stats, setStats] = useState<DashboardData>({
    stored_memories: 0,
    total_searches: 0,
    knowledge_graph: "Healthy",
    graph_integrity: "100%",
    last_sync: "--:--:--",
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await api.dashboard();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  const cards = [
    {
      title: "Stored Memories",
      value: stats.stored_memories,
      subtitle: "Saved locally",
      icon: Database,
      color: "text-emerald-400",
    },
    {
      title: "Total Searches",
      value: stats.total_searches,
      subtitle: "Successful recalls",
      icon: Search,
      color: "text-cyan-400",
    },
    {
      title: "Knowledge Graph",
      value: stats.graph_integrity,
      subtitle: stats.knowledge_graph,
      icon: Activity,
      color: "text-violet-400",
    },
    {
      title: "Last Sync",
      value: stats.last_sync,
      subtitle: "Memory Engine",
      icon: Clock3,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 transition hover:border-zinc-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  {card.title}
                </p>

                <h2 className="mt-4 text-4xl font-bold">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {card.subtitle}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700">
                <Icon
                  size={24}
                  className={card.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}