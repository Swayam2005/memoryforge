import json
import os
import re
import string
import uuid
from datetime import datetime

CACHE_FILE = "backend/data/memory_store.json"


class MemoryCache:

    def __init__(self):
        os.makedirs("backend/data", exist_ok=True)

        if not os.path.exists(CACHE_FILE):
            with open(CACHE_FILE, "w") as f:
                json.dump([], f)

    # ==========================
    # Internal
    # ==========================

    def _load(self):
        with open(CACHE_FILE, "r") as f:
            return json.load(f)

    def _save(self, data):
        with open(CACHE_FILE, "w") as f:
            json.dump(data, f, indent=4)

    def normalize(self, text: str):
        text = text.lower().strip()

        text = text.translate(
            str.maketrans("", "", string.punctuation)
        )

        text = re.sub(r"\s+", " ", text)

        return text

    # ==========================
    # Save
    # ==========================

    def save(self, text: str):

        text = " ".join(text.strip().split())

        if not text:
            return

        data = self._load()

        normalized = self.normalize(text)

        for memory in data:

            if self.normalize(memory["text"]) == normalized:
                return

        data.append(
            {
                "id": str(uuid.uuid4()),
                "text": text,
                "favorite": False,
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat(),
            }
        )

        self._save(data)

    # ==========================
    # Search
    # ==========================

    def search(self, query: str):

        query = self.normalize(query)

        if not query:
            return []

        data = self._load()

        results = []

        query_words = query.split()

        for memory in reversed(data):

            normalized = self.normalize(memory["text"])

            if query in normalized:
                results.append(memory)
                continue

            if any(word in normalized for word in query_words):
                results.append(memory)

        return results

    # ==========================
    # Read
    # ==========================

    def get_all(self):
        return self._load()

    def count(self):
        return len(self._load())

    # ==========================
    # Delete by ID
    # ==========================

    def delete(self, memory_id: str):

        data = self._load()

        new_data = [
            memory
            for memory in data
            if memory["id"] != memory_id
        ]

        self._save(new_data)

    # ==========================
    # Update
    # ==========================

    def update(self, memory_id: str, text: str):

        data = self._load()

        for memory in data:

            if memory["id"] == memory_id:

                memory["text"] = text

                memory["updated_at"] = datetime.now().isoformat()

        self._save(data)

    # ==========================
    # Favorite
    # ==========================

    def toggle_favorite(self, memory_id: str):

        data = self._load()

        for memory in data:

            if memory["id"] == memory_id:

                memory["favorite"] = not memory.get(
                    "favorite",
                    False,
                )

        self._save(data)

    # ==========================
    # Clear
    # ==========================

    def clear(self):
        self._save([])