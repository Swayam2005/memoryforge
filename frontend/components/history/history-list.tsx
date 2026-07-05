"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Pencil,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { api } from "@/lib/api";

interface Memory {
  id: string;
  text: string;
  favorite: boolean;
  created_at: string;
  updated_at: string;
}

interface Props {
  search: string;
}

export default function HistoryList({ search }: Props) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    loadMemories();
  }, []);

  async function loadMemories() {
    try {
      const data = await api.getMemories();
      setMemories(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteMemory(id: string) {
    if (!confirm("Delete this memory?")) return;

    await api.deleteMemory(id);

    setMemories((prev) =>
      prev.filter((memory) => memory.id !== id)
    );
  }

  async function toggleFavorite(id: string) {
    await api.toggleFavorite(id);

    setMemories((prev) =>
      prev.map((memory) =>
        memory.id === id
          ? {
              ...memory,
              favorite: !memory.favorite,
            }
          : memory
      )
    );
  }

  function edit(memory: Memory) {
    setEditingId(memory.id);
    setEditText(memory.text);
  }

  async function save() {
    if (!editingId) return;

    await api.updateMemory(
      editingId,
      editText
    );

    setMemories((prev) =>
      prev.map((memory) =>
        memory.id === editingId
          ? {
              ...memory,
              text: editText,
            }
          : memory
      )
    );

    setEditingId(null);
  }

  const filtered = useMemo(() => {
    let list = memories;

    if (search.trim()) {
      list = list.filter((memory) =>
        memory.text
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return [...list].sort((a, b) => {
      if (a.favorite !== b.favorite) {
        return a.favorite ? -1 : 1;
      }

      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });
  }, [memories, search]);

  if (!filtered.length) {
    return (
      <div className="mt-8 rounded-3xl border border-zinc-800 bg-[#111113] p-16 text-center">
        <h2 className="text-xl font-semibold">
          No memories found
        </h2>

        <p className="mt-3 text-zinc-500">
          Save a memory from the Dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {filtered.map((memory) => (
        <div
          key={memory.id}
          className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6 transition hover:border-zinc-700"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              {editingId === memory.id ? (
                <textarea
                  rows={4}
                  value={editText}
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                  className="w-full rounded-2xl border border-zinc-700 bg-[#111113] p-4 outline-none"
                />
              ) : (
                <p className="whitespace-pre-wrap leading-7 text-zinc-200">
                  {memory.text}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-6 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {new Date(
                    memory.created_at
                  ).toLocaleString()}
                </div>

                {memory.favorite && (
                  <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
                    ★ Favorite
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  toggleFavorite(memory.id)
                }
                className={`rounded-xl p-3 ${
                  memory.favorite
                    ? "bg-yellow-500 text-black"
                    : "border border-zinc-700 hover:bg-zinc-800"
                }`}
              >
                <Star size={18} />
              </button>

              {editingId === memory.id ? (
                <>
                  <button
                    onClick={save}
                    className="rounded-xl bg-emerald-600 p-3"
                  >
                    <Save size={18} />
                  </button>

                  <button
                    onClick={() =>
                      setEditingId(null)
                    }
                    className="rounded-xl bg-zinc-700 p-3"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => edit(memory)}
                  className="rounded-xl border border-zinc-700 p-3 hover:bg-zinc-800"
                >
                  <Pencil size={18} />
                </button>
              )}

              <button
                onClick={() =>
                  deleteMemory(memory.id)
                }
                className="rounded-xl bg-red-600 p-3 hover:bg-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}