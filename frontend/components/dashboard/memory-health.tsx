"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  BrainCircuit,
  Database,
  Search,
} from "lucide-react";

import { api } from "@/lib/api";

interface DashboardData {
  stored_memories: number;
  total_searches: number;
  knowledge_graph: string;
  graph_integrity: string;
  last_sync: string;
}

interface Memory {
  id: string;
  favorite: boolean;
}

export default function MemoryHealth() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    stored_memories: 0,
    total_searches: 0,
    knowledge_graph: "Healthy",
    graph_integrity: "100%",
    last_sync: "--",
  });

  const [favoriteCount, setFavoriteCount] = useState(0);

  async function loadData() {
    try {
      const [dashboardData, memories] = await Promise.all([
        api.dashboard(),
        api.getMemories(),
      ]);

      setDashboard(dashboardData);

      const favorites = (memories as Memory[]).filter(
        (memory) => memory.favorite
      ).length;

      setFavoriteCount(favorites);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const cards = [
    {
      title: "Stored Memories",
      value: dashboard.stored_memories,
      subtitle: "Saved locally",
      icon: Database,
      color: "text-emerald-400",
    },
    {
      title: "Favorite Memories",
      value: favoriteCount,
      subtitle: "Pinned memories",
      icon: BrainCircuit,
      color: "text-yellow-400",
    },
    {
      title: "Searches",
      value: dashboard.total_searches,
      subtitle: "Successful recalls",
      icon: Search,
      color: "text-cyan-400",
    },
    {
      title: "Engine Status",
      value: dashboard.knowledge_graph,
      subtitle: dashboard.last_sync,
      icon: Activity,
      color: "text-violet-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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