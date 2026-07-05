from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.cache.memory_cache import MemoryCache
from backend.api.dashboard import add_activity

router = APIRouter(
    prefix="/memory",
    tags=["Memory"],
)

cache = MemoryCache()


class UpdateMemoryRequest(BaseModel):
    text: str


@router.get("")
async def get_memories():
    memories = cache.get_all()

    memories = sorted(
        memories,
        key=lambda memory: memory["created_at"],
        reverse=True,
    )

    return memories


@router.put("/{memory_id}")
async def update_memory(
    memory_id: str,
    request: UpdateMemoryRequest,
):
    memories = cache.get_all()

    exists = False

    for memory in memories:

        if memory["id"] == memory_id:

            exists = True

            break

    if not exists:

        raise HTTPException(
            status_code=404,
            detail="Memory not found.",
        )

    cache.update(
        memory_id,
        request.text,
    )

    add_activity(
        "Memory Updated",
        request.text[:80],
    )

    return {
        "success": True,
        "message": "Memory updated successfully.",
    }


@router.delete("/{memory_id}")
async def delete_memory(memory_id: str):

    memories = cache.get_all()

    exists = False

    for memory in memories:

        if memory["id"] == memory_id:

            exists = True

            break

    if not exists:

        raise HTTPException(
            status_code=404,
            detail="Memory not found.",
        )

    cache.delete(memory_id)

    add_activity(
        "Memory Deleted",
        memory_id,
    )

    return {
        "success": True,
        "message": "Memory deleted successfully.",
    }


@router.patch("/{memory_id}/favorite")
async def toggle_favorite(memory_id: str):

    memories = cache.get_all()

    exists = False

    for memory in memories:

        if memory["id"] == memory_id:

            exists = True

            break

    if not exists:

        raise HTTPException(
            status_code=404,
            detail="Memory not found.",
        )

    cache.toggle_favorite(memory_id)

    add_activity(
        "Favorite Updated",
        memory_id,
    )

    return {
        "success": True,
        "message": "Favorite updated.",
    }