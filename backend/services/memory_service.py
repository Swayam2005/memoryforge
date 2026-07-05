import os
import re

import httpx
from dotenv import load_dotenv

from backend.cache.memory_cache import MemoryCache
from backend.api.dashboard import (
    add_activity,
    increase_search,
)

load_dotenv()

BASE_URL = os.getenv("COGNEE_BASE_URL")
API_KEY = os.getenv("COGNEE_API_KEY")
DATASET = os.getenv(
    "COGNEE_DATASET",
    "memoryforge-demo-final",
)


class MemoryService:

    def __init__(self):
        self.cache = MemoryCache()

    def _json_headers(self):
        return {
            "X-Api-Key": API_KEY,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

    # =====================================================
    # SMART QUERY
    # =====================================================

    def _extract_keywords(self, query: str):

        query = query.lower()

        query = re.sub(r"[^\w\s]", " ", query)

        stop_words = {
            "what",
            "where",
            "when",
            "who",
            "which",
            "why",
            "how",
            "is",
            "are",
            "was",
            "were",
            "do",
            "does",
            "did",
            "am",
            "i",
            "my",
            "me",
            "the",
            "a",
            "an",
            "please",
            "tell",
            "about",
            "can",
            "could",
            "would",
            "should",
        }

        words = [
            word
            for word in query.split()
            if word not in stop_words
        ]

        return " ".join(words)

    # =====================================================
    # REMEMBER
    # =====================================================

    async def remember(self, text: str):

        text = " ".join(text.strip().split())

        if not text:
            return {
                "success": False,
                "message": "Memory cannot be empty.",
            }

        self.cache.save(text)

        add_activity(
            "Memory Saved",
            text[:80],
        )

        try:

            payload = {
                "textData": [text],
                "datasetName": DATASET,
            }

            url = f"{BASE_URL}/api/v1/add_text"

            async with httpx.AsyncClient(
                timeout=120
            ) as client:

                response = await client.post(
                    url,
                    json=payload,
                    headers=self._json_headers(),
                )

            if response.status_code == 200:

                return {
                    "success": True,
                    "message": "Memory stored successfully.",
                    "source": "Cognee + Local Cache",
                }

            return {
                "success": True,
                "message": "Stored locally.",
                "source": "Local Cache",
            }

        except Exception:

            return {
                "success": True,
                "message": "Stored locally.",
                "source": "Local Cache",
            }

    # =====================================================
    # RECALL
    # =====================================================

    async def recall(self, query: str):

        query = " ".join(query.strip().split())

        if not query:
            return {
                "success": False,
                "answer": "Please enter something to search.",
            }

        increase_search()

        try:

            payload = {
                "searchType": "GRAPH_COMPLETION",
                "datasets": [DATASET],
                "query": query,
            }

            url = f"{BASE_URL}/api/v1/search"

            async with httpx.AsyncClient(
                timeout=120
            ) as client:

                response = await client.post(
                    url,
                    json=payload,
                    headers=self._json_headers(),
                )

            if response.status_code == 200:

                results = response.json()

                if results:

                    answer = results[0].get(
                        "search_result",
                        "",
                    )

                    if isinstance(answer, list):
                        answer = "\n".join(answer)

                    if (
                        answer.strip()
                        and "The Matrix" not in answer
                    ):

                        add_activity(
                            "Memory Recalled",
                            query,
                        )

                        return {
                            "success": True,
                            "answer": answer,
                            "source": "Cognee",
                        }

        except Exception:
            pass

        smart_query = self._extract_keywords(query)

        matches = self.cache.search(smart_query)

        if not matches:
            matches = self.cache.search(query)

        if matches:

            add_activity(
                "Memory Recalled",
                query,
            )

            return {
                "success": True,
                "answer": "\n\n".join(
                    memory["text"]
                    for memory in matches[:5]
                ),
                "source": "Local Cache",
            }

        return {
            "success": True,
            "answer": "No matching memory found.",
            "source": "MemoryForge",
        }
    # =====================================================
    # DELETE MEMORY BY ID
    # =====================================================

    async def delete_memory(self, memory_id: str):

        memories = self.cache.get_all()

        exists = any(
            memory["id"] == memory_id
            for memory in memories
        )

        if not exists:
            return {
                "success": False,
                "message": "Memory not found.",
            }

        self.cache.delete(memory_id)

        add_activity(
            "Memory Deleted",
            memory_id,
        )

        return {
            "success": True,
            "message": "Memory deleted successfully.",
        }

    # =====================================================
    # UPDATE MEMORY
    # =====================================================

    async def update_memory(
        self,
        memory_id: str,
        text: str,
    ):

        text = " ".join(text.strip().split())

        if not text:

            return {
                "success": False,
                "message": "Memory cannot be empty.",
            }

        self.cache.update(
            memory_id,
            text,
        )

        add_activity(
            "Memory Updated",
            text[:80],
        )

        return {
            "success": True,
            "message": "Memory updated successfully.",
        }

    # =====================================================
    # FAVORITE
    # =====================================================

    async def toggle_favorite(
        self,
        memory_id: str,
    ):

        self.cache.toggle_favorite(memory_id)

        add_activity(
            "Favorite Updated",
            memory_id,
        )

        return {
            "success": True,
            "message": "Favorite updated.",
        }

    # =====================================================
    # LEGACY FORGET (TEXT SEARCH)
    # =====================================================

    async def forget(
        self,
        query: str,
    ):

        query = query.strip().lower()

        memories = self.cache.get_all()

        if query == "":

            total = len(memories)

            self.cache.clear()

            add_activity(
                "All Memories Deleted",
                f"{total} memories removed",
            )

            return {
                "success": True,
                "message": f"Deleted {total} memories.",
            }

        removed = 0

        for memory in memories:

            if query in memory["text"].lower():

                self.cache.delete(memory["id"])

                removed += 1

        add_activity(
            "Memory Deleted",
            query,
        )

        return {
            "success": True,
            "message": f"Deleted {removed} memories.",
        }

    # =====================================================
    # IMPROVE
    # =====================================================

    async def improve(self):

        return {
            "success": True,
            "message": "AI memory improvement coming soon.",
        }