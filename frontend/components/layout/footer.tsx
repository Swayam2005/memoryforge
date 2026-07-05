"use client";

import {
  Cpu,
  Database,
  Code2,
} from "lucide-react";

const tech = [
  {
    name: "Next.js",
    icon: Code2,
  },
  {
    name: "FastAPI",
    icon: Cpu,
  },
  {
    name: "Cognee",
    icon: Database,
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-800 pt-10">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold text-white">
            MemoryForge
          </h2>

          <p className="mt-2 max-w-md text-sm text-zinc-500">
            AI-powered long-term memory assistant.
          </p>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          {tech.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-[#18181B]
                  px-4
                  py-3
                  transition
                  hover:border-emerald-500
                  hover:bg-[#202024]
                "
              >
                <Icon
                  size={18}
                  className="text-emerald-400"
                />

                <span className="text-sm text-zinc-300">
                  {item.name}
                </span>

              </div>
            );
          })}

        </div>

      </div>

      <div className="mt-8 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-600">
        © 2026 MemoryForge. All rights reserved.
      </div>

    </footer>
  );
}