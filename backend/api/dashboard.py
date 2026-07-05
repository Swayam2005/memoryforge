from datetime import datetime

from fastapi import APIRouter

from backend.cache.memory_cache import MemoryCache

router = APIRouter(tags=["Dashboard"])

cache = MemoryCache()

dashboard_data = {
    "searches": 0,
    "last_sync": datetime.now().strftime("%H:%M:%S"),
    "activities": [],
}


@router.get("/dashboard")
async def dashboard():
    return {
        "stored_memories": cache.count(),
        "total_searches": dashboard_data["searches"],
        "knowledge_graph": "Healthy",
        "graph_integrity": "100%",
        "last_sync": dashboard_data["last_sync"],
        "recent_activity": dashboard_data["activities"][:10],
    }


def add_activity(action: str, description: str):
    dashboard_data["last_sync"] = datetime.now().strftime("%H:%M:%S")

    dashboard_data["activities"].insert(
        0,
        {
            "title": action,
            "description": description,
            "time": datetime.now().strftime("%I:%M %p"),
        },
    )

    dashboard_data["activities"] = dashboard_data["activities"][:20]


def increase_search():
    dashboard_data["searches"] += 1
    dashboard_data["last_sync"] = datetime.now().strftime("%H:%M:%S")


@router.get("/history")
async def history():
    memories = cache.get_all()

    memories = sorted(
        memories,
        key=lambda memory: memory["created_at"],
        reverse=True,
    )

    return memories