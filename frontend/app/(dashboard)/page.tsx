"use client";

import Footer from "@/components/layout/footer";

import Hero from "@/components/dashboard/hero";
import Stats from "@/components/dashboard/stats";
import MemoryHealth from "@/components/dashboard/memory-health";

import CardsGrid from "@/components/cards/cards-grid";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8 xl:px-10">

      {/* Hero */}

      <Hero />

      {/* Statistics */}

      <Stats />

      {/* Memory Workspace */}

      <section className="mt-16">

        <CardsGrid />

      </section>

      {/* Memory Health */}

      <section className="mt-16">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-white">
            Memory Health
          </h2>

          <p className="mt-2 text-zinc-400">
            Live status of your MemoryForge engine.
          </p>

        </div>

        <MemoryHealth />

      </section>

      {/* Footer */}

      <Footer />

    </div>
  );
}