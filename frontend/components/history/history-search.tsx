"use client";

import { Search, X } from "lucide-react";

interface HistorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HistorySearch({
  value,
  onChange,
}: HistorySearchProps) {
  return (
    <div className="mt-8">
      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search memories..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-zinc-800
            bg-[#18181B]
            pl-11
            pr-12
            text-sm
            outline-none
            transition
            focus:border-zinc-600
          "
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
          >
            <X size={18} />
          </button>
        )}

      </div>
    </div>
  );
}