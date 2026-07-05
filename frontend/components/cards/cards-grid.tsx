"use client";

import RememberCard from "./remember-card";
import RecallCard from "./recall-card";
import ForgetCard from "./forget-card";

export default function CardsGrid() {
  return (
    <section className="mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Memory Workspace
        </h2>

        <p className="mt-2 text-zinc-500">
          Store, search and manage your memories from one place.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <RememberCard />

        <RecallCard />

        <ForgetCard />
      </div>
    </section>
  );
}