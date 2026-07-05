"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Database,
  Search,
  Clock,
} from "lucide-react";

import { api } from "@/lib/api";

interface DashboardData {
  stored_memories: number;
  total_searches: number;
  knowledge_graph: string;
  graph_integrity: string;
  last_sync: string;
}

export default function Stats() {
  const [data, setData] = useState<DashboardData>({
    stored_memories: 0,
    total_searches: 0,
    knowledge_graph: "Healthy",
    graph_integrity: "100%",
    last_sync: "--",
  });

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const json = await api.dashboard();

        if (mounted) {
          setData(json);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();

    const interval = setInterval(loadDashboard, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const cards = [
    {
      title: "Stored Memories",
      value: data.stored_memories,
      subtitle: "Saved locally",
      icon: Database,
    },
    {
      title: "Total Searches",
      value: data.total_searches,
      subtitle: "Successful recalls",
      icon: Search,
    },
    {
      title: "Knowledge Graph",
      value: data.graph_integrity,
      subtitle: data.knowledge_graph,
      icon: BrainCircuit,
    },
    {
      title: "Last Sync",
      value: data.last_sync,
      subtitle: "Memory Engine",
      icon: Clock,
    },
  ];

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {card.subtitle}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-700 bg-[#111113] p-4">
                <Icon
                  size={24}
                  className="text-emerald-400"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}