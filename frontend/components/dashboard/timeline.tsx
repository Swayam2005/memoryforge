"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Search,
  Trash2,
 Clock3,
} from "lucide-react";

type Activity = {
  title: string;
  description: string;
  time: string;
};

export default function Timeline() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    loadActivity();

    const interval = setInterval(loadActivity, 3000);

    return () => clearInterval(interval);
  }, []);

  async function loadActivity() {
    try {
      const res = await fetch("http://127.0.0.1:8000/dashboard");

      const data = await res.json();

      setActivities(data.recent_activity || []);
    } catch (err) {
      console.error(err);
    }
  }

  function getIcon(title: string) {
    if (title.includes("Saved")) return BrainCircuit;
    if (title.includes("Recalled")) return Search;
    if (title.includes("Deleted")) return Trash2;

    return BrainCircuit;
  }

  return (
    <section className="mt-12">
      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <div className="mb-8">

          <h2 className="text-2xl font-semibold">
            Recent Activity
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Latest actions performed by MemoryForge
          </p>

        </div>

        <div className="space-y-6">

          {activities.length === 0 && (
            <div className="text-zinc-500">
              No activity yet.
            </div>
          )}

          {activities.map((item, index) => {

            const Icon = getIcon(item.title);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                }}
                className="flex items-start justify-between rounded-2xl border border-zinc-800 bg-[#111113] p-5"
              >
                <div className="flex gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-700 bg-[#18181B]">

                    <Icon size={20} />

                  </div>

                  <div>

                    <h3 className="font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {item.description}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500">

                  <Clock3 size={15} />

                  {item.time}

                </div>

              </motion.div>
            );

          })}

        </div>

      </div>
    </section>
  );
}