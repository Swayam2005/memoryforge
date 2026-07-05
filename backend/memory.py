import json
import os
from typing import Any, Dict, List, Optional
from uuid import uuid4


class MemoryStore:
    def __init__(self, storage_path: Optional[str] = None):
        self.storage_path = storage_path or os.path.join(os.getcwd(), "data", "memories.json")
        os.makedirs(os.path.dirname(self.storage_path), exist_ok=True)
        self._memories: Dict[str, Dict[str, Any]] = {}
        self._load()

    def _load(self) -> None:
        if not os.path.exists(self.storage_path):
            return
        with open(self.storage_path, "r", encoding="utf-8") as handle:
            data = json.load(handle)
            if isinstance(data, dict):
                self._memories = data

    def _save(self) -> None:
        with open(self.storage_path, "w", encoding="utf-8") as handle:
            json.dump(self._memories, handle, indent=2)

    def create_memory(self, content: str, tags: Optional[List[str]] = None) -> Dict[str, Any]:
        memory_id = str(uuid4())
        memory = {
            "id": memory_id,
            "content": content,
            "tags": tags or [],
        }
        self._memories[memory_id] = memory
        self._save()
        return memory

    def get_memory(self, memory_id: str) -> Optional[Dict[str, Any]]:
        return self._memories.get(memory_id)

    def list_memories(self) -> List[str]:
        return list(self._memories.keys())

    def delete_memory(self, memory_id: str) -> bool:
        if memory_id in self._memories:
            del self._memories[memory_id]
            self._save()
            return True
        return False
