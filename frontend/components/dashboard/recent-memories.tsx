"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Star,
} from "lucide-react";

import { api } from "@/lib/api";

interface Memory {
  id: string;
  text: string;
  favorite: boolean;
  created_at: string;
}

export default function RecentMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMemories() {
    try {
      const data = await api.getMemories();

      const latest = [...data]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
        .slice(0, 5);

      setMemories(latest);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMemories();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">
        <p className="text-zinc-500">
          Loading recent memories...
        </p>
      </div>
    );
  }

  if (!memories.length) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-10 text-center">
        <h3 className="text-xl font-semibold">
          No memories yet
        </h3>

        <p className="mt-2 text-zinc-500">
          Save your first memory to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#18181B]">

      <div className="flex items-center justify-between border-b border-zinc-800 px-8 py-6">

        <div>

          <h3 className="text-2xl font-bold">
            Recent Memories
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Your latest saved memories.
          </p>

        </div>

        <Link
          href="/history"
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:border-emerald-500 hover:text-emerald-400"
        >
          View All

          <ArrowRight size={16} />
        </Link>

      </div>

      <div className="divide-y divide-zinc-800">

        {memories.map((memory) => (

          <div
            key={memory.id}
            className="flex items-start justify-between gap-6 px-8 py-6 transition hover:bg-zinc-900/40"
          >

            <div className="flex-1">

              <p className="line-clamp-2 text-zinc-200">
                {memory.text}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-zinc-500">

                <div className="flex items-center gap-2">
                  <CalendarDays size={15} />

                  {new Date(memory.created_at).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={15} />

                  {new Date(memory.created_at).toLocaleTimeString()}
                </div>

              </div>

            </div>

            {memory.favorite && (
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
            )}

          </div>

        ))}

      </div>

    </div>
  );
}