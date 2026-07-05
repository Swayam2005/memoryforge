import json
from pathlib import Path

DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "memory_store.json"


class MemoryStorage:

    def __init__(self):
        DATA_FILE.parent.mkdir(parents=True, exist_ok=True)

        if not DATA_FILE.exists():
            DATA_FILE.write_text("[]", encoding="utf-8")

    def load(self):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)

    def save(self, memories):
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(memories, f, indent=4)

    def add(self, text):
        memories = self.load()
        memories.append(text)
        self.save(memories)

    def delete(self, text):
        memories = self.load()

        memories = [m for m in memories if m != text]

        self.save(memories)