"use client";

import { usePathname } from "next/navigation";

const pages: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "/": {
    title: "Dashboard",
    description: "Overview of your AI memory platform",
  },

  "/remember": {
    title: "Remember",
    description: "Store new memories",
  },

  "/recall": {
    title: "Recall",
    description: "Search your knowledge graph",
  },

  "/forget": {
    title: "Forget",
    description: "Delete stored memories",
  },

  "/history": {
    title: "History",
    description: "Browse saved memories",
  },

  "/settings": {
    title: "Settings",
    description: "Manage MemoryForge",
  },
};

export default function PageHeader() {
  const pathname = usePathname();

  const page = pages[pathname] || {
    title: "MemoryForge",
    description: "AI Memory Platform",
  };

  return (
    <div className="hidden lg:block min-w-[180px]">
      <h1 className="text-xl font-bold leading-none">
        {page.title}
      </h1>

      <p className="mt-1 text-xs text-zinc-500 whitespace-nowrap">
        {page.description}
      </p>
    </div>
  );
}